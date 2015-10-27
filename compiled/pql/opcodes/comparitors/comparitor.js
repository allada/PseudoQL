'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _opcodeJs = require('./../opcode.js');

var COMPARITOR = (function (_OPCODE) {
    _inherits(COMPARITOR, _OPCODE);

    function COMPARITOR() {
        _classCallCheck(this, COMPARITOR);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(COMPARITOR.prototype), 'constructor', this).apply(this, args);
        this._needs_group_cache = null;
    }

    _createClass(COMPARITOR, [{
        key: 'setLeft',
        value: function setLeft(v) {
            this.left = v;
            return this;
        }
    }, {
        key: 'setRight',
        value: function setRight(v) {
            this.right = v;
            return this;
        }
    }, {
        key: 'needsGroup',
        value: function needsGroup() {
            if (this._needs_group_cache !== null) {
                return this._needs_group_cache;
            }
            if (this.left) {
                if (this.left.needsGroup()) {
                    return this._needs_group_cache = true;
                }
            }
            if (this.right) {
                if (this.right.needsGroup()) {
                    return this._needs_group_cache = true;
                }
            }
            return this._needs_group_cache = false;
        }
    }, {
        key: 'left',
        get: function get() {
            return this._left;
        },
        set: function set(v) {
            return this._left = v;
        }
    }, {
        key: 'right',
        get: function get() {
            return this._right;
        },
        set: function set(v) {
            return this._right = v;
        }
    }]);

    return COMPARITOR;
})(_opcodeJs.OPCODE);

exports.COMPARITOR = COMPARITOR;