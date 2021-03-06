'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comparitorJs = require('./comparitor.js');

var _constants_arrayJs = require('./../constants_array.js');

var GREATER_THAN = (function (_COMPARITOR) {
    _inherits(GREATER_THAN, _COMPARITOR);

    function GREATER_THAN() {
        _classCallCheck(this, GREATER_THAN);

        _get(Object.getPrototypeOf(GREATER_THAN.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(GREATER_THAN, [{
        key: 'getSQL',
        value: function getSQL(query_object) {
            var _this = this;

            var left_type = undefined;
            var right_type = undefined;
            if (this.left.getType) {
                left_type = this.left.getType();
            }
            if (this.right.getType) {
                right_type = this.right.getType();
            }
            if (this.right.isInstanceOf(_constants_arrayJs.CONSTANTS_ARRAY)) {
                var _ret = (function () {
                    var right_values = _this.right.getValue();
                    var sql_safe_values = [];
                    var left_sql = _this.left.getSQL(query_object, right_type);
                    right_values.forEach(function (v) {
                        sql_safe_values.push(left_sql + ' > ' + v.getSQL(query_object, left_type));
                    });

                    return {
                        v: '(' + sql_safe_values.join(' AND ') + ')'
                    };
                })();

                if (typeof _ret === 'object') return _ret.v;
            } else {
                return this.left.getSQL(query_object, right_type) + ' > ' + this.right.getSQL(query_object, left_type);
            }
        }
    }], [{
        key: 'comparitors',
        set: function set(v) {},
        get: function get() {
            return ['>'];
        }
    }]);

    return GREATER_THAN;
})(_comparitorJs.COMPARITOR);

exports.GREATER_THAN = GREATER_THAN;