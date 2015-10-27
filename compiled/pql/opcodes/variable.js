'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constantJs = require('./constant.js');

var _nullJs = require('./null.js');

var VARIABLE = (function (_CONSTANT) {
    _inherits(VARIABLE, _CONSTANT);

    function VARIABLE(pql_obj, var_name) {
        _classCallCheck(this, VARIABLE);

        _get(Object.getPrototypeOf(VARIABLE.prototype), 'constructor', this).call(this, pql_obj, null);

        pql_obj.addVariable(var_name, this);

        this._force_numeric = false;
        this.setVarName(var_name);
    }

    _createClass(VARIABLE, [{
        key: 'setVarName',
        value: function setVarName(var_name) {
            this._var_name = var_name;
        }
    }, {
        key: 'getVarName',
        value: function getVarName() {
            return this._var_name;
        }
    }, {
        key: 'setValue',
        value: function setValue(val) {
            this._value = val;
            return this;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this._value;
        }
    }, {
        key: 'getSQL',
        value: function getSQL(query_object, type_ref) {
            var value = this.getValue();
            if (value === null || value === undefined) {
                return new _nullJs.NULL(query_object).getSQL(query_object);
            } else if ((this._force_numeric || type_ref && type_ref.is_numeric) && this.constructor.canBeNumeric(value)) {
                return value.toString().replace(/[^0-9.\-]+/g, '');
            } else {
                return query_object.constructor.escapeDBString(value.toString(), true);
            }
        }
    }, {
        key: 'isInstanceOf',
        value: function isInstanceOf(class_obj) {
            var value = this.getValue();
            if (value === null || value === undefined) {
                return class_obj === _nullJs.NULL;
            }
            return this instanceof class_obj;
        }
    }, {
        key: 'isConstant',
        value: function isConstant() {
            return true;
        }
    }], [{
        key: 'canBeNumeric',
        value: function canBeNumeric(value) {
            if (value === null || value === undefined) {
                return false;
            }
            return (/^-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/.test(value)
            );
        }
    }]);

    return VARIABLE;
})(_constantJs.CONSTANT);

exports.VARIABLE = VARIABLE;