'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _opcodeJs = require('./opcode.js');

var FIELD = (function (_OPCODE) {
    _inherits(FIELD, _OPCODE);

    function FIELD(pql_obj, field, table_ref) {
        _classCallCheck(this, FIELD);

        _get(Object.getPrototypeOf(FIELD.prototype), 'constructor', this).call(this, pql_obj, field, table_ref);

        this.setTableRef(table_ref);
        this.setField(field);
    }

    _createClass(FIELD, [{
        key: 'setField',
        value: function setField(field) {
            var map_obj = undefined;
            var table_ref = this.getTableRef();
            var pql_obj = this.getPqlObj();
            var config = pql_obj.getConfig();

            if (table_ref) {
                map_obj = table_ref.getCurTableObj();
            } else {
                map_obj = config.DB_MAP[pql_obj.getRefTable()];
            }

            if (!map_obj.fields[field]) {
                throw 'Could not find field \'' + field + '\' in table \'' + map_obj.name + '\'';
            }
            this._field = field;
            this.setFieldConfig(map_obj.fields[field]);
            return this;
        }
    }, {
        key: 'getField',
        value: function getField() {
            return this._field;
        }
    }, {
        key: 'getTableRef',
        value: function getTableRef() {
            return this._table_ref;
        }
    }, {
        key: 'setTableRef',
        value: function setTableRef(table_ref) {
            this._table_ref = table_ref || null;
        }
    }, {
        key: 'setFieldConfig',
        value: function setFieldConfig(v) {
            this._field_config = v;
            return this;
        }
    }, {
        key: 'getFieldConfig',
        value: function getFieldConfig() {
            return this._field_config;
        }
    }, {
        key: 'getType',
        value: function getType() {
            return this.getFieldConfig().type;
        }
    }, {
        key: 'getSQL',
        value: function getSQL(query_obj) {
            return (this.getTableRef() ? this.getTableRef().getSQL(query_obj) : query_obj.constructor.escapeDBIdentifier(this.getPqlObj().getConfig().DB_MAP[this.getPqlObj().getRefTable()].name, true)) + '.' + query_obj.constructor.escapeDBColumnName(this.getField(), true);
        }
    }]);

    return FIELD;
})(_opcodeJs.OPCODE);

exports.FIELD = FIELD;