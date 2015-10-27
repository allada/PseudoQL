"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TABLE_REF = (function () {
    function TABLE_REF(pql_obj) {
        var table = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, TABLE_REF);

        this._refs = [];
        this._pql_obj = pql_obj;
        this._cur_table_obj = null;
        if (table) {
            this.appendRef(table);
        }
    }

    _createClass(TABLE_REF, [{
        key: "appendRef",
        value: function appendRef(table) {
            var db_map = this._pql_obj.getConfig().DB_MAP;
            if (!this._cur_table_obj) {
                this._cur_table_obj = db_map[this._pql_obj.getRefTable()];
            }
            if (this._cur_table_obj.linkTo && this._cur_table_obj.linkTo[table]) {
                this._cur_table_obj = db_map[this._cur_table_obj.linkTo[table].table];
            } else if (this._cur_table_obj.linkFrom && this._cur_table_obj.linkFrom[table]) {
                this._cur_table_obj = db_map[this._cur_table_obj.linkFrom[table].table];
            } else {
                throw "Link \"" + table + "\" does not exist in table \"" + this._cur_table_obj.name + "\"";
            }
            this._refs.push(table);
            return this;
        }
    }, {
        key: "getCurTableObj",
        value: function getCurTableObj() {
            return this._cur_table_obj;
        }
    }, {
        key: "getRefs",
        value: function getRefs() {
            return this._refs;
        }
    }, {
        key: "getSQL",
        value: function getSQL(query_obj) {
            return query_obj.constructor.escapeDBIdentifier(query_obj.setJoin(this.getRefs()), true);
        }
    }]);

    return TABLE_REF;
})();

exports.TABLE_REF = TABLE_REF;