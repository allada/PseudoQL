'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _comparitorJs = require('./comparitor.js');

var _nullJs = require('./../null.js');

var _constantJs = require('./../constant.js');

var _constants_arrayJs = require('./../constants_array.js');

var NOT_LIKE = (function (_COMPARITOR) {
    _inherits(NOT_LIKE, _COMPARITOR);

    function NOT_LIKE() {
        _classCallCheck(this, NOT_LIKE);

        _get(Object.getPrototypeOf(NOT_LIKE.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(NOT_LIKE, [{
        key: 'getSQL',
        value: function getSQL(query_object) {
            var _this = this;

            if (this.right.isInstanceOf(_constants_arrayJs.CONSTANTS_ARRAY)) {
                var _ret = (function () {
                    var right_values = _this.right.getValue();
                    var sql_safe_values = [];
                    var left_sql = _this.left.getSQL(query_object);
                    right_values.forEach(function (v) {
                        sql_safe_values.push(_this.constructor._getSQLHelper(query_object, left_sql, v));
                    });

                    return {
                        v: '(' + sql_safe_values.join(' AND ') + ')'
                    };
                })();

                if (typeof _ret === 'object') return _ret.v;
            } else {
                return this.constructor._getSQLHelper(query_object, this.left, this.right);
            }
        }
    }], [{
        key: '_getSQLHelper',
        value: function _getSQLHelper(query_object, left, right) {
            var val;
            var left_sql;
            if (typeof left === 'string') {
                left_sql = left;
            } else {
                left_sql = left.getSQL(query_object);
            }
            // Hack used to add the wild card char
            if (right.isInstanceOf(_constantJs.CONSTANT)) {
                val = right.getValue();
                right.setValue(val + '%');
            }
            var ret_val;
            if (right.isInstanceOf(_nullJs.NULL)) {
                ret_val = left_sql + ' IS NOT NULL';
            } else {
                ret_val = left_sql + ' NOT LIKE ' + right.getSQL(query_object);
            }
            // Continue hack from above hack
            if (right.isInstanceOf(_constantJs.CONSTANT)) {
                right.setValue(val);
            }
            return ret_val;
        }
    }, {
        key: 'comparitors',
        set: function set(v) {},
        get: function get() {
            return ['!~', '!'];
        }
    }]);

    return NOT_LIKE;
})(_comparitorJs.COMPARITOR);

exports.NOT_LIKE = NOT_LIKE;