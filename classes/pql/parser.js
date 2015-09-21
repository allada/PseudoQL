"use strict"
var PQL = window.PQL;
PQL.PARSER = function (psudoql, allow_seperator, ref_table, db_map){
    if(!psudoql.length){
        this.setError('PsudoQL must have a string length of >= 1', true);
    }
    if(db_map){
        this.db_map = db_map.DB_MAP;
        this.function_map = db_map.FUNCTION_MAP;
    }
    if(ref_table){
        this.ref_table = ref_table;
    }
    var general;
    try{
        general = this.T_GENERAL(psudoql, allow_seperator);
        if(general !== false && general[0] != psudoql.length){
            throw ["Unknown character", psudoql.length - general[0]];
        }
        if(general[1] instanceof PQL.OPCODES.GROUP){
            general[1].setNeedWrap(false)
        }
        this.setCodes(general[1]);
    }catch(e){
        if(e instanceof Array){
            this.setError([e[0] + ' at character ' + (psudoql.length - e[1]).toString(), psudoql.length - e[1]], true);
        }
        this.setError(e.message || e, true);
    }
};

PQL.PARSER.prototype._hasError = false;
PQL.PARSER.prototype._error = null;
PQL.PARSER.prototype._codes = null;

PQL.PARSER.prototype.setCodes = function (codes){
    this._codes = codes;
};
PQL.PARSER.prototype.getCodes = function (){
    return this._codes;
};
PQL.PARSER.prototype.setError = function (error, noThrow){
    this._error = error;
    this._hasError = true;
    if(!noThrow){
        throw error;
    }
};
PQL.PARSER.prototype.getError = function (){
    return this._error;
};
PQL.PARSER.prototype.hasError = function (){
    return this._hasError;
};
PQL.PARSER.getSelectSQL = function (pql_ary){
    if(pql_ary instanceof PQL.OPCODES.OPCODE){
        return pql_ary.getSQL();
    }else{
        throw "First argument in getSelectSQL() was not instance of PQL.OPCODES.OPCODE";
    }
};
/*
 * Matches any of the following: :~!<>#^;
 */
PQL.PARSER.prototype.T_COMPARITOR = function (str){
    var chr = str.substr(0, 1);
    switch(chr){
        case '=':
        case ':':
            return [1, new PQL.OPCODES.EQUAL(this)];
        case '~':
            return [1, new PQL.OPCODES.LIKE(this)];
        case '!':
            switch(str.substr(1, 1)){
                case '~':
                    return [2, new PQL.OPCODES.NOT_LIKE(this)];
                case '#':
                    return [2, new PQL.OPCODES.NOT_IN(this)];
                case ':':
                case '=':
                    return [2, new PQL.OPCODES.NOT_EQUAL(this)];
            }
            return [1, new PQL.OPCODES.NOT_EQUAL(this)];
        case '<':
            return [1, new PQL.OPCODES.LESS_THAN(this)];
        case '>':
            return [1, new PQL.OPCODES.GREATER_THAN(this)];
        case '#':
            return [1, new PQL.OPCODES.IN(this)];
        case ';':
            return [1, new PQL.OPCODES.NO_VALUE(this)];
        default:
            return false;
    }
};

/*
 * When a table reference is specified.
 */
PQL.PARSER.prototype.T_TABLE_REF = function (str, table_ref){
    var match = str.match(/^([a-zA-Z0-9_]+)\./);
    if(!match){
        return false;
    }
    str = str.substring(match[0].length);
    if(!table_ref){
        table_ref = new PQL.PARSER.TABLE_REF(this, match[1]);
    }else{
        table_ref.appendRef(match[1]);
    }
    // table_ref will be modified by ref
    var sub_ref = this.T_TABLE_REF(str, table_ref);
    if(!sub_ref){
        var field = this.T_FIELD(str, table_ref);
        if(!field){
            throw ["Expected T_FIELD", str.length];
        }
        return [
            match[0].length + field[0],
            field[1]
        ];
    }
    return [
        match[0].length + sub_ref[0] + field[0],
        sub_ref
    ];
};

/*
 * Is the value that comes after a comparitor.
 */
PQL.PARSER.prototype.T_COMPARE_VALUE = function(str){
    if(str.substr(0, 1) == '-'){
        return [
            1,
            new PQL.OPCODES.NULL()
        ];
    }
    var match, data;
    switch(str.substr(0,1)){
        case '"':
            match = str.match(/^(?:"((?:[^"\\]*|\\[\x00-\xFF])*)"|([a-zA-Z0-9_]+))/);
            data = match[1].replace(/\\([\x00-\xFF])/, '$1');
            break;
        case "'":
            match = str.match(/^(?:'((?:[^'\\]*|\\[\x00-\xFF])*)')/);
            data = match[1].replace(/\\([\x00-\xFF])/, '$1');
            break;
        default:
            match = str.match(/([a-zA-Z0-9_]+)/);
            data = match[1];
            break;
    }
    if(!match){
        return false;
    }
    return [
        match[0].length,
        new PQL.OPCODES.CONSTANT(this, data)
    ];
};

/*
 * Is a field in a table
 */
PQL.PARSER.prototype.T_FIELD = function (str, table_ref){
    var match = str.match(/^[a-zA-Z0-9_]+/);
    if(!match){
        return false;
    }
    var field = new PQL.OPCODES.FIELD(this, match[0], table_ref);
    str = str.substring(match[0].length);
    var comparitor = this.T_COMPARITOR(str);
    if (!comparitor) {
        throw ["Expected T_COMPARITOR", str.length];
    }
    if(comparitor[1] instanceof PQL.OPCODES.NO_VALUE){
        return [
            match[0].length + comparitor[0],
            field
        ];
    }
    str = str.substring(comparitor[0]);
    var value = this.T_COMPARE_VALUE(str);
    if(!value){
        throw ["Expected T_COMPARE_VALUE", str.length];
    }
    comparitor[1].setLeft(field);
    comparitor[1].setRight(value[1]);
    return [
        match[0].length + comparitor[0] + value[0],
        comparitor[1]
    ];
};

/*
 * Is a function in sql
 */
PQL.PARSER.prototype.T_FUNCTION = function (str){
    var match = str.match(/^([a-zA-Z0-9_]+)\(/);
    if(!match){
        return false;
    }
    var func = new PQL.OPCODES.FUNCTION(this, match[1]),
        max_args= func.getMaxArgs(),
        min_args = func.getMinArgs(),
        general, seperator, sum_length = 0, found_args = [];

    str = str.substring(match[0].length);
    for(var i = 0; true; i++){
        if(found_args.length >= max_args){
            throw ["Function '" + func.getFuncName() + "' cannot have more than " + max_args.toString() + " args", str.length];
        }
        general = this.T_GENERAL(str);
        if(!general && found_args.length < min_args){
            throw ["Function '" + func.getFuncName() + "' expected " + min_args.toString() + " but got " + found_args.length.toString() + " args", str.length]; 
        }
        if(!general){
            break;
        }
        sum_length += general[0];
        if(general instanceof PQL.OPCODES.GROUP){
            general.setNeedWrap(false);
        }
        found_args.push(general[1]);
        str = str.substring(general[0]);

        seperator = this.T_SEPERATOR(str);
        if(!seperator){
            break;
        }
        str = str.substring(seperator[0]);
        sum_length += seperator[0];
    }
    var closer = this.T_GROUP_CLOSER(str);
    if(!closer){
        throw ["Open function group tag without close tag", str.length];
    }
    func.setArgs(found_args);
    str = str.substring(closer[0]);

    var comparitor = this.T_COMPARITOR(str);
    if (!comparitor) {
        throw ["Expected T_COMPARITOR", str.length];
    }
    if(comparitor[1] instanceof PQL.OPCODES.NO_VALUE){
        return [
            match[0].length + sum_length + closer[0] + comparitor[0],
            func
        ];
    }
    str = str.substring(comparitor[0]);
    var value = this.T_COMPARE_VALUE(str);
    if(!value){
        throw ["Expected T_COMPARE_VALUE", str.length];
    }
    comparitor[1].setLeft(func);
    comparitor[1].setRight(value[1]);

    return [
        match[0].length + sum_length + closer[0] + comparitor[0] + value[0],
        comparitor[1]
    ];
};

/*
 * Is a null literal. "-" character.
 */
PQL.PARSER.prototype.T_NULL = function (str){
    if(str.substr(0, 1) == '-'){
        return [1, new PQL.OPCODES.NULL(this)];
    }
    return false;
};

/*
 * Is a string constant. The matching string will be exactly sent as is. Also good for binary data.
 */
PQL.PARSER.prototype.T_CONSTANT = function (str){
    var chr = str.substr(0, 1);
    if(chr == '@'){
        var match;
        switch(str.substr(1, 1)){
            case '"':
                match = str.match(/^@"((?:[^"\\]*|\\[\x00-\xFF])*)"/);
                // Make sure we have data
                if(match && match.length && match[1].length){
                    match[1] = match[1].replace(/\\([\x00-\xFF])/, '$1');
                }
                break;
            case "'":
                match = str.match(/^@'((?:[^'\\]*|\\[\x00-\xFF])*)'/);
                // Make sure we have data
                if(match && match.length && match[1].length){
                    match[1] = match[1].replace(/\\([\x00-\xFF])/, '$1');
                }
                break;
            case '-':
                return [2, new PQL.OPCODES.NULL(this)];
            default:
                match = str.match(/^(?:@)([a-zA-Z0-9_]*)/);
        }
        if(!match){
            throw ["Got T_CONSTANT but no content", str.length + 1];
        }
        return [
            match[0].length,
            new PQL.OPCODES.CONSTANT(this, match[1])
        ];
    }
    return false;
};

PQL.PARSER.prototype.T_GENERAL = function (str, allow_seperator){
    var op_order = [
            this.T_TABLE_REF,
            this.T_FUNCTION,
            this.T_FIELD,
            this.T_GROUP_OPENER,
            this.T_CONSTANT/*,
            this.T_SUBQUERY_OPENER*/
        ],
        op_len = op_order.length,
        found, i, sep, used_str_len = 0, op_codes = [];
    do{
        for(i = 0; i < op_len; i++){
            found = op_order[i].call(this, str);
            if(found){
                break;
            }
        }
        if(found){
            str = str.substring(found[0]);
            used_str_len += found[0];
            op_codes.push(found[1]);
            // This is a simple trick to keep from many ifs from being needed.
            switch(allow_seperator){
                case true:
                    if((sep = this.T_SEPERATOR(str))){
                        break;
                    }
                default:
                    if((sep = this.T_AND(str))){
                        break;
                    }
                    if((sep = this.T_OR(str))){
                        break;
                    }
            }
            if(sep){
                str = str.substring(sep[0]);
                used_str_len += sep[0];
                op_codes.push(sep[1]);
            }
        }
    }while(found && str.length != 0);

    if(op_codes.length && op_codes[op_codes.length-1] instanceof PQL.OPCODES.SEPERATORS){
        throw ["Cannot termincate this section with a seperator", str.length];
    }

    if(op_codes.length && op_codes.length > 1){
        return [
            used_str_len,
            new PQL.OPCODES.GROUP(this, op_codes)
        ];
    }else if(op_codes.length == 1){
        return [
            used_str_len,
            op_codes[0]
        ];
    }
    return false;
};

/*
 * Represents an open prenthesis "("
 */
PQL.PARSER.prototype.T_GROUP_OPENER = function (str){
    var match = str.match(/^\s*\(\s*/);
    if(!match){
        return false;
    }
    str = str.substring(match[0].length);
    var general = this.T_GENERAL(str);
    if(!general){
        throw ["Group cannot be empty", str.length];
    }
    str = str.substring(general[0]);
    var closer = this.T_GROUP_CLOSER(str);
    if(!closer){
        throw ["Open group tag without close tag", str.length];
    }
    return [
        match[0].length + general[0] + closer[0],
        general[1]
    ];
};

/*
 * Represents a closed prenthesis ")"
 */
PQL.PARSER.prototype.T_GROUP_CLOSER = function (str){
    var match = str.match(/^\s*\)/);
    if(!match){
        return false;
    }
    return [
        match[0].length,
        true
    ];
};

/*
 * Represents an open prenthesis "{". The data inside will be parsed as a subquery.
 */
PQL.PARSER.prototype.T_SUBQUERY_OPENER = function (str){
    // TODO: this
};

/*
 * Represents a closed prenthesis "}"
 */
PQL.PARSER.prototype.T_SUBQUERY_CLOSER = function (str){
    // TODO: this
};

/*
 * Is the space character
 */
PQL.PARSER.prototype.T_AND = function (str){
    var match = str.match(/^\s+/);
    if(!match){
        return false;
    }
    return [
        match[0].length,
        new PQL.OPCODES.AND(this)
    ];
};

/*
 * Is the pipe "|" character
 */
PQL.PARSER.prototype.T_OR = function (str){
    var match = str.match(/^\s*\|\s*/);
    if(!match){
        return false;
    }
    return [
        match[0].length,
        new PQL.OPCODES.OR(this)
    ];
};

/*
 * Is the comma "," character
 */
PQL.PARSER.prototype.T_SEPERATOR = function (str){
    var match = str.match(/^\s*,\s*/);
    if(!match){
        return false;
    }
    return [
        match[0].length,
        new PQL.OPCODES.SEPERATOR(this)
    ];
};