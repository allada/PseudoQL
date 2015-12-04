'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _opcodeJs = require('./opcode.js');

var _data_typesJs = require('../data_types.js');

var FUNCTION = (function (_OPCODE) {
    _inherits(FUNCTION, _OPCODE);

    function FUNCTION(pql_obj, fn_name) {
        _classCallCheck(this, FUNCTION);

        _get(Object.getPrototypeOf(FUNCTION.prototype), 'constructor', this).call(this, pql_obj, fn_name);

        this._needs_group_cache = null;
        this._return_type = null;
        this.setFunctionName(fn_name);
    }

    _createClass(FUNCTION, [{
        key: 'setArgs',
        value: function setArgs(args) {
            this._needs_group_cache = null;
            this._arguments = args;
            return this;
        }
    }, {
        key: 'getMinArgs',
        value: function getMinArgs() {
            return this._fn_settings.min_args;
        }
    }, {
        key: 'getMaxArgs',
        value: function getMaxArgs() {
            return this._fn_settings.max_args;
        }
    }, {
        key: 'getFuncName',
        value: function getFuncName() {
            return this._fn_name;
        }
    }, {
        key: 'getFormat',
        value: function getFormat() {
            return this._fn_settings.format;
        }
    }, {
        key: 'setFunctionName',
        value: function setFunctionName(fn_name) {
            this._needs_group_cache = null;
            fn_name = fn_name.toLowerCase();
            if (!this.getPqlObj().getConfig().FUNCTION_MAP || !this.getPqlObj().getConfig().FUNCTION_MAP[fn_name]) {
                throw 'Function \'' + fn_name + '\' is not allowed or not defined';
            }
            this._fn_settings = this.getPqlObj().getConfig().FUNCTION_MAP[fn_name];
            this.setType(this._fn_settings.return_type || _data_typesJs.DATA_TYPES.ANY);
            this._fn_name = fn_name;
        }
    }, {
        key: 'getFunctionSettings',
        value: function getFunctionSettings() {
            return this._fn_settings;
        }
    }, {
        key: 'getSQL',
        value: function getSQL(query_obj) {
            var args = [];

            this._arguments.forEach(function (v) {
                args.push(v.getSQL(query_obj));
            });
            return this.buildFromFormat(this.getFormat(), args, this._arguments, query_obj);
        }
    }, {
        key: 'setType',
        value: function setType(type) {
            this._return_type = type;
            return this;
        }
    }, {
        key: 'getType',
        value: function getType() {
            return this._return_type;
        }
    }, {
        key: 'needsGroup',
        value: function needsGroup() {
            if (this._needs_group_cache !== null) {
                return this._needs_group_cache;
            }
            if (this.getFunctionSettings().is_group_function) {
                return this._needs_group_cache = true;
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var op_code = _step.value;

                    if (op_code.needsGroup()) {
                        return this._needs_group_cache = true;
                    }
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

            return this._needs_group_cache = false;
        }
    }, {
        key: 'buildFromFormat',
        value: function buildFromFormat(format_arg, args, orig_args, query_obj) {
            var out = [];

            switch (typeof format_arg) {
                case 'function':
                    return format_arg.call(this, args, orig_args, query_obj);
                    break;
                case 'string':
                    // Break does not need to go here because it needs to continue to 'object' section
                    format_arg = [format_arg];
                case 'object':
                    // Check if is not array type
                    if (!(format_arg instanceof Array)) {
                        if (format_arg[args.length] !== undefined) {
                            return this.buildFromFormat(format_arg[args.length], args, orig_args, query_obj);
                        } else {
                            throw 'Could not find ' + format_arg[args.length] + ' in format config for function';
                        }
                    }

                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = format_arg[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var format = _step2.value;

                            switch (typeof format) {
                                case 'string':
                                    out.push(format);
                                    break;
                                case 'number':
                                    if (args.length > format && format >= 0) {
                                        out.push(args[format]);
                                    } else {
                                        throw 'Format \'' + format.join('') + '\' tried to use argument with number out of range';
                                    }
                                    break;
                                case 'function':
                                    out.push(format.call(this, args, orig_args, query_obj));
                                    break;
                                case 'object':
                                    if (format[args.length]) {
                                        return this.buildFromFormat(format[args.length], args, orig_args, query_obj);
                                    } else {
                                        throw 'Format \'' + JSON.stringify(format) + '\' does not have key of \'' + args.length + '\'';
                                    }
                                    break;
                                default:
                                    throw 'Format \'' + JSON.stringify(format) + '\' does not have a valid type';
                            }
                        }
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

                    return out.join('');
                default:
                    throw 'Format \'' + JSON.stringify(format_arg) + '\' is of unhandleable type';
            }
        }
    }]);

    return FUNCTION;
})(_opcodeJs.OPCODE);

exports.FUNCTION = FUNCTION;