'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _parserComparitorsJs = require('./parser/comparitors.js');

var _opcodesAndJs = require('./opcodes/and.js');

var _opcodesConstantJs = require('./opcodes/constant.js');

var _opcodesFieldJs = require('./opcodes/field.js');

var _opcodesFunctionJs = require('./opcodes/function.js');

var _opcodesGroupJs = require('./opcodes/group.js');

var _opcodesNullJs = require('./opcodes/null.js');

var _opcodesOrJs = require('./opcodes/or.js');

var _opcodesSeperatorJs = require('./opcodes/seperator.js');

var _opcodesSeperatorsJs = require('./opcodes/seperators.js');

var _opcodesComparitorsNo_valueJs = require('./opcodes/comparitors/no_value.js');

var _opcodesVariableJs = require('./opcodes/variable.js');

var _opcodesConstants_arrayJs = require('./opcodes/constants_array.js');

var _parserTable_refJs = require('./parser/table_ref.js');

var PARSER = (function () {
    function PARSER(query, ref_table) {
        var allow_seperator = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var config = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
        var table_refs = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
        var variables = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];

        _classCallCheck(this, PARSER);

        this._hasError = false;
        this._error = null;
        this._codes = [];
        this._comparitors = new _parserComparitorsJs.COMPARITORS(config.COMPARITORS);
        this._table_refs = table_refs;
        this._variables = {};

        // Defaults to false
        allow_seperator = !!allow_seperator;

        if (config !== undefined) {
            this._config = config;
        } else {
            this._config = PARSER.getDefaultConfig();
        }

        this._ref_table = ref_table;

        if (query === null || query === undefined || !query.length) {
            var group = new _opcodesGroupJs.GROUP(this, []);
            group.setNeedWrap(false);
            this.setCodes(group);
            this.assignVariables(variables);
        } else {
            try {
                var general = this.T_GENERAL(query, allow_seperator);
                if (general === false) {
                    throw ["Unknown character", query.length];
                }
                if (general[0] != query.length) {
                    throw ["Unknown character", query.length - general[0]];
                }
                if (general[1].isInstanceOf(_opcodesGroupJs.GROUP)) {
                    general[1].setNeedWrap(false);
                }
                this.setCodes(general[1]);
            } catch (e) {
                if (e instanceof Array) {
                    this.setError([e[0] + ' at character ' + (query.length - e[1]).toString(), query.length - e[1], query], true);
                } else {
                    this.setError(e.message || e, true);
                }
            } finally {
                this.assignVariables(variables);
            }
        }
    }

    _createClass(PARSER, [{
        key: 'assignVariables',
        value: function assignVariables(var_list_obj) {
            for (var var_name in var_list_obj) {
                if (var_list_obj.hasOwnProperty(var_name)) {
                    this.assignVariable(var_name, var_list_obj[var_name]);
                }
            }
        }
    }, {
        key: 'assignVariable',
        value: function assignVariable(var_name, val) {
            if (this._variables[var_name]) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this._variables[var_name][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var obj = _step.value;

                        obj.setValue(val);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }, {
        key: 'addVariable',
        value: function addVariable(var_name, obj) {
            if (this._variables[var_name] === undefined) {
                this._variables[var_name] = [];
            }
            this._variables[var_name].push(obj);
        }
    }, {
        key: 'getRefTable',
        value: function getRefTable() {
            return this._ref_table;
        }
    }, {
        key: '_getCodesOfGroup',
        value: function _getCodesOfGroup(need_group) {
            var codes = this._codes;

            if (codes && codes.isInstanceOf(_opcodesGroupJs.GROUP)) {
                var group_codes = codes.getOpCodes();
                var new_codes = [];
                var has_or = false;
                var has_needs_group = false;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = group_codes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var code = _step2.value;

                        // If it has an OR just return all of them if in where
                        if (code.isInstanceOf(_opcodesOrJs.OR)) {
                            has_or = true;
                        }
                        if (code.needsGroup()) {
                            has_needs_group = true;
                        }
                        if (has_or && has_needs_group) {
                            if (need_group) {
                                return codes;
                            } else {
                                return new _opcodesGroupJs.GROUP(this, []).setNeedWrap(false);
                            }
                        }
                        if (!!need_group === code.needsGroup()) {
                            new_codes.push(code);
                        }
                    }
                    // Trims off any comparitors (ANDs and ORs) from beginning and end of codes
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                while (new_codes.length) {
                    if (new_codes[0] && new_codes[0].isInstanceOf(_opcodesSeperatorsJs.SEPERATORS)) {
                        new_codes.shift();
                    } else {
                        break;
                    }
                }
                while (new_codes.length) {
                    if (new_codes[new_codes.length - 1] && new_codes[new_codes.length - 1].isInstanceOf(_opcodesSeperatorsJs.SEPERATORS)) {
                        new_codes.pop();
                    } else {
                        break;
                    }
                }
                return new _opcodesGroupJs.GROUP(this, new_codes).setNeedWrap(false);
            } else {
                if (need_group !== codes.needsGroup()) {
                    return new _opcodesGroupJs.GROUP(this, []).setNeedWrap(false);
                } else {
                    return codes;
                }
            }
        }
    }, {
        key: 'getWhereCodes',
        value: function getWhereCodes() {
            return this._getCodesOfGroup(false);
        }
    }, {
        key: 'getHavingCodes',
        value: function getHavingCodes() {
            return this._getCodesOfGroup(true);
        }
    }, {
        key: 'getCodes',
        value: function getCodes() {
            return this._codes;
        }
    }, {
        key: 'setCodes',
        value: function setCodes(v) {
            this._codes = v;
            return this;
        }
    }, {
        key: 'setError',
        value: function setError(error, noThrow) {
            this._error = error;
            this._hasError = true;
            if (!noThrow) {
                throw error;
            }
        }
    }, {
        key: 'getError',
        value: function getError() {
            return this._error;
        }
    }, {
        key: 'hasError',
        value: function hasError() {
            return this._hasError;
        }
    }, {
        key: 'getConfig',
        value: function getConfig() {
            return this._config;
        }
    }, {
        key: 'T_COMPARITOR',

        // Checks if any of the comparitor operators persist here
        value: function T_COMPARITOR(str) {
            var start_pos = 0;
            var next_char;
            while ((next_char = str.substr(start_pos, 1)) && (next_char === ' ' || next_char === "\r" || next_char === "\n" || next_char === "\t")) {
                // Ignore spaces
                start_pos++;
            }
            var max_comp_len = this._comparitors.getComparitorMaxLength();

            // 0 because it 0 is not to be counted... 1 is the max
            for (var i = max_comp_len; i > 0; i--) {
                if (this._comparitors.comparitors.has(i)) {
                    var chrs = str.substr(start_pos, i);
                    var cmps = this._comparitors.comparitors.get(i);
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = cmps[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var c = _step3.value;

                            if (c[0] === chrs) {
                                return [i + start_pos, new c[1](this)];
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                                _iterator3['return']();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                }
            }
            return false;
        }

        /*
         * When a table reference is specified.
         */
    }, {
        key: 'T_TABLE_REF',
        value: function T_TABLE_REF(str, table_ref) {
            var match = str.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\./);
            if (!match) {
                return false;
            }
            str = str.substring(match[0].length);
            if (!table_ref) {
                var refs = this._table_refs.slice(0);
                refs.push(match[1]);
                table_ref = new _parserTable_refJs.TABLE_REF(this, refs[0]);
                // Start at one because first one already done
                for (var i = 1; i < refs.length; i++) {
                    table_ref.appendRef(refs[i]);
                }
            } else {
                table_ref.appendRef(match[1]);
            }

            // Will recrusively loop until no more table refs exist
            // Will also modify the table_ref with any additional tables in this
            var sub_ref = this.T_TABLE_REF(str, table_ref);
            if (!sub_ref) {
                var field = this.T_FIELD(str, table_ref);
                if (!field) {
                    throw ["Expected T_FIELD", str.length, [_opcodesFieldJs.FIELD]];
                }
                return [match[0].length + field[0], field[1]];
            }
            return [match[0].length + sub_ref[0], sub_ref[1]];
        }

        /*
         * Is the value that comes after a comparitor.
         */
    }, {
        key: 'T_COMPARE_VALUE',
        value: function T_COMPARE_VALUE(str) {
            var ret_const = this.T_CONSTANT(str);
            if (ret_const) {
                return ret_const;
            }
            var match = str.match(/^\s*([a-zA-Z0-9_\-.]+)/);
            if (match) {
                return [match[0].length, new _opcodesConstantJs.CONSTANT(this, match[1])];
            }
            var ret_array = this.T_ARRAY_VALUE(str);
            if (ret_array) {
                return ret_array;
            }
            return false;
        }
    }, {
        key: 'T_ARRAY_VALUE',
        value: function T_ARRAY_VALUE(str) {
            var tries = 0;
            var next_char = undefined;
            // Ignore spaces
            while ((next_char = str.substr(tries, 1)) && (next_char === ' ' || next_char === "\r" || next_char === "\n" || next_char === "\t")) {
                tries++;
            }
            if (next_char === '[') {
                var array_values = [];
                var s = str.substr(tries + 1);
                do {
                    var c = this.T_COMPARE_VALUE(s);
                    if (!c) {
                        throw ['Expected T_COMPARE_VALUE', s.length];
                    }
                    s = s.substr(c[0]);
                    array_values.push(c[1]);
                    var sep = this.T_SEPERATOR(s);
                    if (!sep) {
                        var term = s.match(/^\s*\]/);
                        if (term) {
                            return [str.length - s.length + term[0].length, new _opcodesConstants_arrayJs.CONSTANTS_ARRAY(this, array_values)];
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
    }, {
        key: 'T_FIELD',
        value: function T_FIELD(str, table_ref) {
            var match = str.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)/);
            if (!match) {
                return false;
            }
            if (!table_ref) {
                if (this._table_refs.length) {
                    table_ref = new _parserTable_refJs.TABLE_REF(this, this._table_refs[0]);
                    // Start at one because first one already done
                    for (var i = 1; i < this._table_refs.length; i++) {
                        table_ref.appendRef(this._table_refs[i]);
                    }
                }
            }

            try {
                var field = new _opcodesFieldJs.FIELD(this, match[1], table_ref);
            } catch (e) {
                throw [e, str.length, [_opcodesFieldJs.FIELD]];
            }
            str = str.substring(match[0].length);

            var comparitor = this.T_COMPARITOR(str);
            if (!comparitor) {
                return [match[0].length, field];
                //throw ["Expected T_COMPARITOR", str.length];
            }
            if (comparitor[1].isInstanceOf(_opcodesComparitorsNo_valueJs.NO_VALUE)) {
                return [match[0].length + comparitor[0], field];
            }

            str = str.substring(comparitor[0]);
            var value = this.T_COMPARE_VALUE(str);
            if (!value) {
                throw ["Expected T_COMPARE_VALUE", str.length, [_opcodesConstantJs.CONSTANT, _opcodesNullJs.NULL]];
            }
            comparitor[1].setLeft(field).setRight(value[1]);

            return [match[0].length + comparitor[0] + value[0], comparitor[1]];
        }

        /*
         * Is a function in sql
         */
    }, {
        key: 'T_FUNCTION',
        value: function T_FUNCTION(str) {
            var match = str.match(/^\s*([a-zA-Z0-9_]+)\(/);
            if (!match) {
                return false;
            }
            try {
                var func = new _opcodesFunctionJs.FUNCTION(this, match[1]);
            } catch (e) {
                throw [e, str.length, [_opcodesFunctionJs.FUNCTION]];
            }
            var max_args = func.getMaxArgs();
            var min_args = func.getMinArgs();
            var sum_length = 0;
            var found_args = [];

            str = str.substring(match[0].length);
            for (var i = 0; true; i++) {
                if (found_args.length >= max_args) {
                    throw ['Function \'' + func.getFuncName() + '\' cannot have more than ' + max_args.toString() + ' args', str.length, []];
                }
                var general = this.T_GENERAL(str);
                if (!general && found_args.length < min_args) {
                    throw ['Function \'' + func.getFuncName() + '\' expected ' + min_args.toString() + ' but got ' + found_args.length.toString() + ' args', str.length, []];
                }
                if (!general) {
                    break;
                }
                sum_length += general[0];
                if (general[1].isInstanceOf(_opcodesGroupJs.GROUP)) {
                    general.setNeedWrap(false);
                }
                found_args.push(general[1]);
                str = str.substring(general[0]);

                var seperator = this.T_SEPERATOR(str);
                if (!seperator) {
                    break;
                }
                str = str.substring(seperator[0]);
                sum_length += seperator[0];
            }
            var closer = this.T_FUNCTION_CLOSER(str);
            if (!closer) {
                throw ["Open function group tag without close tag", str.length];
            }
            func.setArgs(found_args);
            str = str.substring(closer[0]);

            var comparitor = this.T_COMPARITOR(str);
            if (!comparitor) {
                return [match[0].length + sum_length + closer[0], func];
                //throw ["Expected T_COMPARITOR", str.length];
            }
            if (comparitor[1].isInstanceOf(_opcodesComparitorsNo_valueJs.NO_VALUE)) {
                return [match[0].length + sum_length + closer[0] + comparitor[0], func];
            }
            str = str.substring(comparitor[0]);
            var value = this.T_COMPARE_VALUE(str);
            comparitor[1].setLeft(func);
            comparitor[1].setRight(value[1]);

            return [match[0].length + sum_length + closer[0] + comparitor[0] + value[0], comparitor[1]];
        }

        /*
         * Is a string constant. The matching string will be exactly sent as is. Also good for binary data.
         */
    }, {
        key: 'T_CONSTANT',
        value: function T_CONSTANT(str) {
            var tries = 0;
            var next_char = undefined;
            // Ignore spaces
            while ((next_char = str.substr(tries, 1)) && (next_char === ' ' || next_char === "\r" || next_char === "\n" || next_char === "\t")) {
                tries++;
            }
            var match = undefined;
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
                        return [match[0].length, new _opcodesVariableJs.VARIABLE(this, match[1])];
                    }
                    break;
                case '-':
                    if (!/[0-9]/.test(str.substr(tries + 1, 1))) {
                        return [1 + tries, new _opcodesNullJs.NULL(this)];
                    }
            }
            if (!match) {
                // see if it's a constant numeric
                match = str.match(/^\s*(-?[0-9]+(\.[0-9]+)?)/);
                if (!match) {
                    return false;
                }
            }
            return [match[0].length, new _opcodesConstantJs.CONSTANT(this, match[1])];
        }
    }, {
        key: 'T_GENERAL',
        value: function T_GENERAL(str, allow_seperator) {
            var op_order = [this.T_TABLE_REF, this.T_FUNCTION, this.T_CONSTANT, this.T_FIELD, this.T_GROUP_OPENER];

            /*this.T_SUBQUERY_OPENER*/
            var op_len = op_order.length;
            var used_str_len = 0;
            var op_codes = [];
            var found = undefined;

            do {
                for (var i = 0; i < op_len; i++) {
                    found = op_order[i].call(this, str);
                    if (found) {
                        break;
                    }
                }
                if (found) {
                    var sep = undefined;
                    str = str.substring(found[0]);
                    used_str_len += found[0];
                    if (op_codes.length && !op_codes[op_codes.length - 1].isInstanceOf(_opcodesSeperatorsJs.SEPERATORS)) {
                        throw ['Expected space, "|"' + (allow_seperator ? ' or ","' : ''), str.length + found[0]];
                    }
                    op_codes.push(found[1]);

                    // This is a simple trick to keep from many ifs from being needed.
                    switch (allow_seperator) {
                        case true:
                            if (sep = this.T_SEPERATOR(str)) {
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
                if (op_codes[op_codes.length - 1] && op_codes[op_codes.length - 1].isInstanceOf(_opcodesAndJs.AND)) {
                    op_codes.pop();
                } else {
                    break;
                }
            }

            if (op_codes.length && op_codes[op_codes.length - 1].isInstanceOf(_opcodesSeperatorsJs.SEPERATORS)) {
                throw ["Cannot terminate this section with a seperator", str.length];
            }

            if (op_codes.length && op_codes.length > 1) {
                return [used_str_len, new _opcodesGroupJs.GROUP(this, op_codes)];
            } else if (op_codes.length == 1) {
                return [used_str_len, op_codes[0]];
            }
            return false;
        }

        /*
         * Represents an open prenthesis "("
         */
    }, {
        key: 'T_GROUP_OPENER',
        value: function T_GROUP_OPENER(str) {
            var match = str.match(/^\s*\(\s*/);
            if (!match) {
                return false;
            }
            str = str.substring(match[0].length);
            var general = this.T_GENERAL(str);
            if (!general) {
                throw ["Group cannot be empty", str.length];
            }
            str = str.substring(general[0]);
            var closer = this.T_GROUP_CLOSER(str);
            if (!closer) {
                throw ["Open group tag without close tag", str.length];
            }
            return [match[0].length + general[0] + closer[0], general[1]];
        }
    }, {
        key: 'T_FUNCTION_CLOSER',
        value: function T_FUNCTION_CLOSER(str) {
            var match = str.match(/^\s*\)/);
            if (!match) {
                return false;
            }
            return [match[0].length, true];
        }

        /*
         * Represents a closed prenthesis ")"
         */
    }, {
        key: 'T_GROUP_CLOSER',
        value: function T_GROUP_CLOSER(str) {
            var match = str.match(/^\s*\)/);
            if (!match) {
                return false;
            }
            return [match[0].length, true];
        }

        /*
         * Represents an open prenthesis "{". The data inside will be parsed as a subquery.
         */
    }, {
        key: 'T_SUBQUERY_OPENER',
        value: function T_SUBQUERY_OPENER(str) {}
        // TODO: this

        /*
         * Represents a closed prenthesis "}"
         */

    }, {
        key: 'T_SUBQUERY_CLOSER',
        value: function T_SUBQUERY_CLOSER(str) {}
        // TODO: this

        /*
         * Is the space character
         */

    }, {
        key: 'T_AND',
        value: function T_AND(str) {
            var match = str.match(/^\s+/);
            if (!match) {
                return false;
            }
            return [match[0].length, new _opcodesAndJs.AND(this)];
        }

        /*
         * Is the pipe "|" character
         */
    }, {
        key: 'T_OR',
        value: function T_OR(str) {
            var match = str.match(/^\s*\|/);
            if (!match) {
                return false;
            }
            return [match[0].length, new _opcodesOrJs.OR(this)];
        }

        /*
         * Is the comma "," character
         */
    }, {
        key: 'T_SEPERATOR',
        value: function T_SEPERATOR(str) {
            var match = str.match(/^\s*,/);
            if (!match) {
                return false;
            }
            return [match[0].length, new _opcodesSeperatorJs.SEPERATOR(this)];
        }
    }], [{
        key: 'setDefaultConfig',
        value: function setDefaultConfig(config) {
            PARSER._config = config;
            return this;
        }
    }, {
        key: 'getDefaultConfig',
        value: function getDefaultConfig() {
            return PARSER._config;
        }
    }]);

    return PARSER;
})();

exports.PARSER = PARSER;