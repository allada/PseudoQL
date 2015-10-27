'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _opcodeJs = require('./opcode.js');

var GROUP = (function (_OPCODE) {
    _inherits(GROUP, _OPCODE);

    function GROUP(pql_obj, op_codes) {
        _classCallCheck(this, GROUP);

        _get(Object.getPrototypeOf(GROUP.prototype), 'constructor', this).call(this, pql_obj, op_codes);

        this._needs_group_cache = null;
        this._needs_wrap = true;
        this.setOpCodes(op_codes);
    }

    _createClass(GROUP, [{
        key: 'setNeedWrap',
        value: function setNeedWrap(val) {
            this._needs_group_cache = null;
            this._needs_wrap = !!val;
            return this;
        }
    }, {
        key: 'setOpCodes',
        value: function setOpCodes(op_codes) {
            this._needs_group_cache = null;
            this._op_codes = op_codes;
            return this;
        }
    }, {
        key: 'getOpCodes',
        value: function getOpCodes() {
            return this._op_codes;
        }
    }, {
        key: 'getOpCodeLen',
        value: function getOpCodeLen() {
            return this._op_codes.length;
        }
    }, {
        key: 'getSQL',
        value: function getSQL(query_obj) {
            var outs = [];
            if (this._needs_wrap) {
                outs.push('(');
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._op_codes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var op_code = _step.value;

                    outs.push(op_code.getSQL(query_obj));
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

            if (this._needs_wrap) {
                outs.push(')');
            }
            return outs.join(' ');
        }
    }, {
        key: 'needsGroup',
        value: function needsGroup() {
            if (this._needs_group_cache !== null) {
                return this._needs_group_cache;
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._op_codes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var op_code = _step2.value;

                    if (op_code.needsGroup()) {
                        return this._needs_group_cache = true;
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

            return this._needs_group_cache = false;
        }
    }]);

    return GROUP;
})(_opcodeJs.OPCODE);

exports.GROUP = GROUP;