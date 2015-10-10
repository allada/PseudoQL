import { COMPARITORS }  from './parser/comparitors.js';
import { AND }          from './opcodes/and.js';
import { CONSTANT }     from './opcodes/constant.js';
import { FIELD }        from './opcodes/field.js';
import { FUNCTION }     from './opcodes/function.js';
import { GROUP }        from './opcodes/group.js';
import { NULL }         from './opcodes/null.js';
import { OR }           from './opcodes/or.js';
import { SEPERATOR }    from './opcodes/seperator.js';
import { SEPERATORS }   from './opcodes/seperators.js';
import { NO_VALUE }     from './opcodes/comparitors/no_value.js';
import { VARIABLE }     from './opcodes/variable.js';
import { CONSTANTS_ARRAY } from './opcodes/constants_array.js';
import { TABLE_REF }    from './parser/table_ref.js';

export class PARSER {
    constructor (query, ref_table, allow_seperator = false, config = null, table_refs = [], variables = {}) {
        this._hasError      = false;
        this._error         = null;
        this._codes         = [];
        this._comparitors   = new COMPARITORS(config.COMPARITORS);
        this._table_refs    = table_refs;
        this._variables     = {};

        // Defaults to false
        allow_seperator     = !!allow_seperator;

        if (config !== undefined) {
            this._config = config;
        } else {
            this._config = PARSER.getDefaultConfig();
        }

        this._ref_table = ref_table;

        if (query === null || query === undefined || !query.length) {
            let group = new GROUP(this, []);
            group.setNeedWrap(false);
            this.setCodes(group);
            this.assignVariables(variables);
        } else {
            try {
                let general = this.T_GENERAL(query, allow_seperator);
                if (general === false) {
                    throw ["Unknown character", query.length];
                }
                if (general[0] != query.length) {
                    throw ["Unknown character", query.length - general[0]];
                }
                if (general[1].isInstanceOf(GROUP)) {
                    general[1].setNeedWrap(false)
                }
                this.setCodes(general[1]);
            } catch (e) {
                if (e instanceof Array) {
                    this.setError([`${e[0]} at character ${(query.length - e[1]).toString()}`, query.length - e[1], query], true);
                } else {
                    this.setError(e.message || e, true);
                }
            } finally {
                this.assignVariables(variables);
            }
        }
    }
    assignVariables (var_list_obj) {
        for (let var_name in var_list_obj) {
            if (var_list_obj.hasOwnProperty(var_name)) {
                this.assignVariable(var_name, var_list_obj[var_name]);
            }
        }
    }
    assignVariable (var_name, val) {
        if (this._variables[var_name]) {
            for (let obj of this._variables[var_name]) {
                obj.setValue(val);
            }
        }
    }
    addVariable (var_name, obj) {
        if (this._variables[var_name] === undefined) {
            this._variables[var_name] = [];
        }
        this._variables[var_name].push(obj);
    }
    getRefTable () {
        return this._ref_table;
    }
    _getCodesOfGroup (need_group) {
        let codes = this._codes;

        if (codes && (codes.isInstanceOf(GROUP))) {
            let group_codes = codes.getOpCodes();
            let new_codes = [];
            let has_or = false;
            let has_needs_group = false;
            for (let code of group_codes) {
                // If it has an OR just return all of them if in where
                if (code.isInstanceOf(OR)) {
                    has_or = true;
                }
                if (code.needsGroup()) {
                    has_needs_group = true;
                }
                if (has_or && has_needs_group) {
                    if (need_group) {
                        return codes;
                    } else {
                        return (new GROUP(this, [])).setNeedWrap(false);
                    }
                }
                if (!!need_group === code.needsGroup()) {
                    new_codes.push(code);
                }
            }
            // Trims off any comparitors (ANDs and ORs) from beginning and end of codes
            while (new_codes.length) {
                if (new_codes[0] && (new_codes[0].isInstanceOf(SEPERATORS))) {
                    new_codes.shift();
                } else {
                    break;
                }
            }
            while (new_codes.length) {
                if (new_codes[new_codes.length - 1] && (new_codes[new_codes.length - 1].isInstanceOf(SEPERATORS))) {
                    new_codes.pop();
                } else {
                    break;
                }
            }
            return (new GROUP(this, new_codes)).setNeedWrap(false);
        } else {
            if (need_group !== codes.needsGroup()) {
                return (new GROUP(this, [])).setNeedWrap(false);
            } else {
                return codes;
            }
        }
    }

    getWhereCodes () {
        return this._getCodesOfGroup(false);
    }

    getHavingCodes () {
        return this._getCodesOfGroup(true);
    }

    getCodes () {
        return this._codes;
    }
    setCodes (v) {
        this._codes = v;
        return this;
    }

    setError (error, noThrow) {
        this._error = error;
        this._hasError = true;
        if (!noThrow) {
            throw error;
        }
    }
    getError () {
        return this._error;
    }
    hasError () {
        return this._hasError;
    }

    getConfig () {
        return this._config;
    }
    static setDefaultConfig (config) {
        PARSER._config = config;
        return this;
    }
    static getDefaultConfig () {
        return PARSER._config;
    }

    // Checks if any of the comparitor operators persist here
    T_COMPARITOR (str) {
        var start_pos = 0;
        var next_char;
        while ((next_char = str.substr(start_pos, 1)) && (next_char === ' ' || next_char === "\r" || next_char === "\n" || next_char === "\t")) {
            // Ignore spaces
            start_pos++;
        }
        let max_comp_len = this._comparitors.getComparitorMaxLength();

        // 0 because it 0 is not to be counted... 1 is the max
        for (let i = max_comp_len; i > 0; i--) {
            if (this._comparitors.comparitors.has(i)) {
                let chrs = str.substr(start_pos, i);
                let cmps = this._comparitors.comparitors.get(i);
                for (let c of cmps) {
                    if (c[0] === chrs) {
                        return [i + start_pos, new c[1](this)];
                    }
                }
            }
        }
        return false;
    }

    /*
     * When a table reference is specified.
     */
    T_TABLE_REF (str, table_ref) {
        let match = str.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\./);
        if (!match) {
            return false;
        }
        str = str.substring(match[0].length);
        if (!table_ref) {
            let refs = this._table_refs.slice(0);
            refs.push(match[1]);
            table_ref = new TABLE_REF(this, refs[0]);
            // Start at one because first one already done
            for (let i = 1; i < refs.length; i++) {
                table_ref.appendRef(refs[i]);
            }
        } else {
            table_ref.appendRef(match[1]);
        }

        // Will recrusively loop until no more table refs exist
        // Will also modify the table_ref with any additional tables in this
        let sub_ref = this.T_TABLE_REF(str, table_ref);
        if (!sub_ref) {
            let field = this.T_FIELD(str, table_ref);
            if (!field) {
                throw ["Expected T_FIELD", str.length, [FIELD]];
            }
            return [
                match[0].length + field[0],
                field[1]
            ];
        }
        return [
            match[0].length + sub_ref[0],
            sub_ref[1]
        ];
    }
    /*
     * Is the value that comes after a comparitor.
     */
    T_COMPARE_VALUE (str) {
        let ret_const = this.T_CONSTANT(str);
        if (ret_const) {
            return ret_const;
        }
        let match = str.match(/^\s*([a-zA-Z0-9_\-.]+)/);
        if (match) {
            return [
                match[0].length,
                new CONSTANT(this, match[1])
            ];
        }
        let ret_array = this.T_ARRAY_VALUE(str);
        if (ret_array) {
            return ret_array;
        }
        return false;
    }
    T_ARRAY_VALUE (str) {
        let tries = 0;
        let next_char;
        // Ignore spaces
        while ((next_char = str.substr(tries, 1)) && (next_char === ' ' || next_char === "\r" || next_char === "\n" || next_char === "\t")) {
            tries++;
        }
        if (next_char === '[') {
            let array_values = [];
            let s = str.substr(tries + 1);
            do {
                let c = this.T_COMPARE_VALUE(s);
                if (!c) {
                    throw ['Expected T_COMPARE_VALUE', s.length];
                }
                s = s.substr(c[0]);
                array_values.push(c[1]);
                let sep = this.T_SEPERATOR(s);
                if (!sep) {
                    let term = s.match(/^\s*\]/);
                    if (term) {
                        return [
                            str.length - s.length + term[0].length,
                            new CONSTANTS_ARRAY(this, array_values)
                        ];
                    } else {
                        throw ['Expected T_CONSTANT, T_SEPERATOR or closing array "]" character', s.length];
                    }
                } else {
                    s = s.substr(sep[0]);
                }
            } while (true);
        }
        return false;
    }

    /*
     * Is a field in a table
     */
    T_FIELD (str, table_ref) {
        let match = str.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)/);
        if (!match) {
            return false;
        }
        if (!table_ref) {
            if (this._table_refs.length) {
                table_ref = new TABLE_REF(this, this._table_refs[0]);
                // Start at one because first one already done
                for (let i = 1; i < this._table_refs.length; i++) {
                    table_ref.appendRef(this._table_refs[i]);
                }
            }
        }

        try {
            var field = new FIELD(this, match[1], table_ref);
        } catch (e) {
            throw [e, str.length, [FIELD]];
        }
        str = str.substring(match[0].length);

        let comparitor = this.T_COMPARITOR(str);
        if (!comparitor) {
            return [
                match[0].length,
                field
            ];
            //throw ["Expected T_COMPARITOR", str.length];
        }
        if (comparitor[1].isInstanceOf(NO_VALUE)) {
            return [
                match[0].length + comparitor[0],
                field
            ];
        }

        str = str.substring(comparitor[0]);
        let value = this.T_COMPARE_VALUE(str);
        if (!value) {
            throw ["Expected T_COMPARE_VALUE", str.length, [CONSTANT, NULL]];
        }
        comparitor[1]
            .setLeft(field)
            .setRight(value[1]);

        return [
            match[0].length + comparitor[0] + value[0],
            comparitor[1]
        ];
    }

    /*
     * Is a function in sql
     */
    T_FUNCTION (str) {
        var match = str.match(/^\s*([a-zA-Z0-9_]+)\(/);
        if (!match) {
            return false;
        }
        try {
            var func        = new FUNCTION(this, match[1]);
        } catch (e) {
            throw [e, str.length, [FUNCTION]];
        }
        let max_args    = func.getMaxArgs();
        let min_args    = func.getMinArgs();
        let sum_length  = 0;
        let found_args  = [];
    
        str = str.substring(match[0].length);
        for (let i = 0; true; i++) {
            if (found_args.length >= max_args) {
                throw [`Function '${ func.getFuncName() }' cannot have more than ${ max_args.toString() } args`, str.length, []];
            }
            let general = this.T_GENERAL(str);
            if (!general && found_args.length < min_args) {
                throw [`Function '${ func.getFuncName() }' expected ${ min_args.toString() } but got ${ found_args.length.toString() } args`, str.length, []]; 
            }
            if (!general) {
                break;
            }
            sum_length += general[0];
            if (general[1].isInstanceOf(GROUP)) {
                general.setNeedWrap(false);
            }
            found_args.push(general[1]);
            str = str.substring(general[0]);
    
            let seperator = this.T_SEPERATOR(str);
            if (!seperator) {
                break;
            }
            str = str.substring(seperator[0]);
            sum_length += seperator[0];
        }
        let closer = this.T_FUNCTION_CLOSER(str);
        if (!closer) {
            throw ["Open function group tag without close tag", str.length];
        }
        func.setArgs(found_args);
        str = str.substring(closer[0]);
    
        let comparitor = this.T_COMPARITOR(str);
        if (!comparitor) {
            return [
                match[0].length + sum_length + closer[0],
                func
            ];
            //throw ["Expected T_COMPARITOR", str.length];
        }
        if (comparitor[1].isInstanceOf(NO_VALUE)) {
            return [
                match[0].length + sum_length + closer[0] + comparitor[0],
                func
            ];
        }
        str = str.substring(comparitor[0]);
        let value = this.T_COMPARE_VALUE(str);
        comparitor[1].setLeft(func);
        comparitor[1].setRight(value[1]);

        return [
            match[0].length + sum_length + closer[0] + comparitor[0] + value[0],
            comparitor[1]
        ];
    }

    /*
     * Is a string constant. The matching string will be exactly sent as is. Also good for binary data.
     */
    T_CONSTANT (str) {
        let tries = 0;
        let next_char;
        // Ignore spaces
        while ((next_char = str.substr(tries, 1)) && (next_char === ' ' || next_char === "\r" || next_char === "\n" || next_char === "\t")) {
            tries++;
        }
        let match;
        switch (next_char) {
            case '"':
                match = str.match(/^\s*"((?:[^"\\]?(?:\\[\x00-\xFF])?)*)"/);
                // Make sure we have data
                if (match && match.length && match[1].length) {
                    match[1] = match[1].replace(/((?:^|[^\\])(\\\.)*)\\n/g, "$1\n");
                    match[1] = match[1].replace(/((?:^|[^\\])(\\\\)*)\\r/g, "$1\r");
                    match[1] = match[1].replace(/((?:^|[^\\])(\\\\)*)\\t/g, "$1\t");
                    match[1] = match[1].replace(/\\([\x00-\xFF])/g, '$1');
                }
                break;
            case "'":
                match = str.match(/^\s*'((?:[^'\\]?(?:\\[\x00-\xFF])?)*)'/);
                // Make sure we have data
                if (match && match.length && match[1].length) {
                    match[1] = match[1].replace(/((?:^|[^\\])(\\\.)*)\\n/g, "$1\n");
                    match[1] = match[1].replace(/((?:^|[^\\])(\\\\)*)\\r/g, "$1\r");
                    match[1] = match[1].replace(/((?:^|[^\\])(\\\\)*)\\t/g, "$1\t");
                    match[1] = match[1].replace(/\\([\x00-\xFF])/g, '$1');
                }
                break;
            case '@':
                match = str.match(/\s*@([a-zA-Z0-9\-_]+)/);
                if (match) {
                    return [
                        match[0].length,
                        new VARIABLE(this, match[1])
                    ];
                }
                break;
            case '-':
                if (!/[0-9]/.test(str.substr(tries + 1, 1))) {
                    return [1 + tries, new NULL(this)];
                }
        }
        if (!match) {
            // see if it's a constant numeric
            match = str.match(/^\s*(-?[0-9]+(\.[0-9]+)?)/);
            if (!match) {
                return false;
            }
        }
        return [
            match[0].length,
            new CONSTANT(this, match[1])
        ];
    }
    T_GENERAL (str, allow_seperator) {
        let op_order = [
            this.T_TABLE_REF,
            this.T_FUNCTION,
            this.T_CONSTANT,
            this.T_FIELD,
            this.T_GROUP_OPENER,
            /*this.T_SUBQUERY_OPENER*/
        ];
        let op_len = op_order.length;
        let used_str_len = 0;
        let op_codes = [];
        let found;

        do {
            for (let i = 0; i < op_len; i++) {
                found = op_order[i].call(this, str);
                if(found){
                    break;
                }
            }
            if (found) {
                let sep;
                str = str.substring(found[0]);
                used_str_len += found[0];
                if (op_codes.length && !(op_codes[op_codes.length - 1].isInstanceOf(SEPERATORS))) {
                    throw [`Expected space, "|"${ (allow_seperator) ? ' or ","': '' }`, str.length + found[0]];
                }
                op_codes.push(found[1]);

                // This is a simple trick to keep from many ifs from being needed.
                switch (allow_seperator) {
                    case true:
                        if ((sep = this.T_SEPERATOR(str))) {
                            break;
                        }
                    default:
                        if ((sep = this.T_OR(str)) || (sep = this.T_AND(str))) {
                            break;
                        }
                }
                if (sep) {
                    str = str.substring(sep[0]);
                    used_str_len += sep[0];
                    op_codes.push(sep[1]);
                }
            }
        } while (found && str.length !== 0);

        // Removes any trailing ANDs
        while (op_codes.length) {
            if (op_codes[op_codes.length - 1] && (op_codes[op_codes.length - 1].isInstanceOf(AND))) {
                op_codes.pop();
            } else {
                break;
            }
        }

        if (op_codes.length && (op_codes[op_codes.length - 1].isInstanceOf(SEPERATORS))) {
            throw ["Cannot terminate this section with a seperator", str.length];
        }
    
        if (op_codes.length && op_codes.length > 1) {
            return [
                used_str_len,
                new GROUP(this, op_codes)
            ];
        } else if(op_codes.length == 1) {
            return [
                used_str_len,
                op_codes[0]
            ];
        }
        return false;
    }

    /*
     * Represents an open prenthesis "("
     */
    T_GROUP_OPENER (str) {
        let match = str.match(/^\s*\(\s*/);
        if (!match) {
            return false;
        }
        str = str.substring(match[0].length);
        let general = this.T_GENERAL(str);
        if (!general) {
            throw ["Group cannot be empty", str.length];
        }
        str = str.substring(general[0]);
        let closer = this.T_GROUP_CLOSER(str);
        if (!closer) {
            throw ["Open group tag without close tag", str.length];
        }
        return [
            match[0].length + general[0] + closer[0],
            general[1]
        ];
    }
    T_FUNCTION_CLOSER (str) {
        let match = str.match(/^\s*\)/);
        if (!match) {
            return false;
        }
        return [
            match[0].length,
            true
        ];
    }
    /*
     * Represents a closed prenthesis ")"
     */
    T_GROUP_CLOSER (str) {
        let match = str.match(/^\s*\)/);
        if (!match) {
            return false;
        }
        return [
            match[0].length,
            true
        ];
    }

    /*
     * Represents an open prenthesis "{". The data inside will be parsed as a subquery.
     */
    T_SUBQUERY_OPENER (str) {
        // TODO: this
    }

    /*
     * Represents a closed prenthesis "}"
     */
    T_SUBQUERY_CLOSER (str) {
        // TODO: this
    }

    /*
     * Is the space character
     */
    T_AND (str){
        let match = str.match(/^\s+/);
        if (!match) {
            return false;
        }
        return [
            match[0].length,
            new AND(this)
        ];
    }

    /*
     * Is the pipe "|" character
     */
    T_OR (str) {
        let match = str.match(/^\s*\|/);
        if (!match) {
            return false;
        }
        return [
            match[0].length,
            new OR(this)
        ];
    }

    /*
     * Is the comma "," character
     */
    T_SEPERATOR (str) {
        let match = str.match(/^\s*,/);
        if (!match) {
            return false;
        }
        return [
            match[0].length,
            new SEPERATOR(this)
        ];
    }
}
