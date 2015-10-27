'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _parserJs = require('./../parser.js');

var SQL_BUILDER = (function () {
    function SQL_BUILDER(_ref) {
        var query = _ref.query;
        var table = _ref.table;
        var group = _ref.group;
        var selects = _ref.selects;
        var orderBys = _ref.orderBys;

        _classCallCheck(this, SQL_BUILDER);

        this._query = query;
        this._table = table;
        this._group = group;
        this._selects = selects;
        this._orderBys = orderBys;

        this._table_refs = new Map();
        this._linked_tables = [];
        this._next_i = 0;
    }

    _createClass(SQL_BUILDER, [{
        key: 'getQuery',
        value: function getQuery() {
            return this._query;
        }
    }, {
        key: 'getTable',
        value: function getTable() {
            return this._table;
        }
    }, {
        key: 'getGroup',
        value: function getGroup() {
            return this._group;
        }
    }, {
        key: 'getSelects',
        value: function getSelects() {
            return this._selects;
        }
    }, {
        key: 'getOrderBys',
        value: function getOrderBys() {
            return this._orderBys;
        }
    }, {
        key: 'getTableName',
        value: function getTableName() {
            return this.getQuery().getConfig().DB_MAP[this.getTable()].name;
        }
    }, {
        key: 'toString',
        value: function toString() {
            var _this = this;

            var query_str = this.getQuery().getWhereCodes().getSQL(this);
            if (query_str) {
                query_str = '\nWHERE\n\t' + query_str;
            }
            var having_str = this.getQuery().getHavingCodes().getSQL(this);
            if (having_str) {
                having_str = '\nHAVING\n\t' + having_str;
            }
            var group_str = this.getGroup().getCodes().getSQL(this);
            if (group_str) {
                group_str = '\nGROUP BY\n\t' + group_str;
            }
            var selects = [];
            this.getSelects().forEach(function (v, k) {
                var val = v.getCodes().getSQL(_this) + (k ? ' AS ' + _this.constructor.escapeDBIdentifier(k, true) : '');
                if (val) {
                    selects.push(val);
                }
            });
            if (!selects.length) {
                selects.push('*');
            }
            var orders = [];
            this.getOrderBys().forEach(function (v, k) {
                var code = k.getCodes().getSQL(_this);
                if (code) {
                    orders.push(code + (v !== null && v !== undefined && v.toLowerCase() === 'desc' ? ' DESC' : ' ASC'));
                }
            });
            var order_by_str = '';
            if (orders.length) {
                order_by_str = '\nORDER BY\n\t' + orders.join(',');
            }

            var join_str = '';
            if (this._table_refs.size) {
                var join_ary = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this._linked_tables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var table_ref = _step.value;

                        join_ary.push('LEFT JOIN ' + this.constructor.escapeDBTableName(table_ref.table_obj.name, true) + ' AS ' + this.constructor.escapeDBIdentifier(table_ref.alias, true) + ' ON ' + table_ref.parser.getCodes().getSQL(this));
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

                if (join_ary.length) {
                    join_str = '\n\t' + join_ary.join('\n\t');
                }
            }
            return 'SELECT\n\t' + selects.join(',\n\t') + '\nFROM ' + this.constructor.escapeDBTableName(this.getTableName(), true) + join_str + query_str + group_str + having_str + order_by_str;
        }
    }, {
        key: '_addTableLink',
        value: function _addTableLink(table_ary) {
            var table_str = this.constructor.tableArrayToString(table_ary);
            if (this._table_refs.has(table_str)) {
                return false;
            }

            var config = this.getQuery().getConfig();
            var start_table = this.getTable();

            var accum_table_ary = [];
            var trimmed_table_ary = table_ary.slice(0, table_ary.length - 1);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = trimmed_table_ary[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var ref = _step2.value;

                    accum_table_ary.push(ref);
                    var ary_copy = [].concat(accum_table_ary);
                    if (!this._table_refs.has(this.constructor.tableArrayToString(ary_copy))) {
                        this._addTableLink(ary_copy);
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

            var link_obj = this.getLinkObj(table_ary);
            var link_info = {
                alias: this.getNextRefName(),
                table_ary: table_ary,
                table_str: table_str,
                parser: null,
                table_obj: config.DB_MAP[link_obj.table]
            };

            // Because this function may be recusive it needs to set this field here even though
            // all fields may not be available yet.
            if (!this._table_refs.has(link_info.table_str)) {
                this._table_refs.set(link_info.table_str, link_info);
            }

            // Pop last item off the array and clone it so it doesn't count itself
            var parser = new _parserJs.PARSER(link_obj.pql, this.getTable(), false, this.getQuery().getConfig(), table_ary.slice(0, table_ary.length - 1));
            // This needs to happen here to ensure the tables get added in the proper order
            parser.getCodes().getSQL(this);

            link_info.parser = parser;

            this._linked_tables.push(link_info);

            return link_info.alias;
        }
    }, {
        key: 'getLinkObj',
        value: function getLinkObj(table_ary) {
            var tb_ary = [].concat(_toConsumableArray(table_ary));
            var db_map = this.getQuery().getConfig().DB_MAP;
            var cur_obj = db_map[this.getTable()];
            var cur_link_obj = undefined;
            table_ary.forEach(function (v) {
                if (cur_obj.linkTo && cur_obj.linkTo.hasOwnProperty(v)) {
                    cur_link_obj = cur_obj.linkTo[v];
                } else if (cur_obj.linkFrom && cur_obj.linkFrom.hasOwnProperty(v)) {
                    cur_link_obj = cur_obj.linkFrom[v];
                } else {
                    throw 'No table link from "' + cur_obj.name + '" to table "' + v + '"';
                }
                cur_obj = db_map[cur_link_obj.table];
            });
            return cur_link_obj;
        }
    }, {
        key: 'getNextRefName',
        value: function getNextRefName() {
            // Using base 36 just because it will recude the total size of the query... Really it's just for the hell of it.
            // Using 'a' because.... Why not?
            var ref = 'a' + this._next_i.toString(36);
            this._next_i++;
            return ref;
        }
    }, {
        key: 'setJoin',
        value: function setJoin(table_ary) {
            var table_str = this.constructor.tableArrayToString([].concat(_toConsumableArray(table_ary)));
            if (this._table_refs.has(table_str)) {
                return this._table_refs.get(table_str).alias;
            }
            return this._addTableLink(table_ary);
        }
    }], [{
        key: 'tableArrayToString',
        value: function tableArrayToString(table_ary) {
            return table_ary.join("\0");
        }
    }, {
        key: 'escapeDBString',
        value: function escapeDBString(value) {
            var include_wrapper = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            value = value.replace("\\", "\\\\").replace("\0", "\\0").replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t").replace("'", "\\'").replace(String.fromCharCode(26), '\\Z').replace('\b', '\\b');
            if (include_wrapper) {
                return '\'' + value + '\'';
            }
            return value;
        }
    }, {
        key: 'escapeDBTableName',
        value: function escapeDBTableName(value) {
            var include_wrapper = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            if (/[\0\\\/:*<>|."%?]/.test(value)) {
                throw "The following characters may not be used for table or column names: \\/:*<>|.\"%?";
            }
            if (include_wrapper) {
                return '"' + value.replace('"', '""') + '"';
            }
            return value.replace('"', '""');
        }
    }, {
        key: 'escapeDBColumnName',
        value: function escapeDBColumnName(value) {
            var include_wrapper = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            if (/[\0\\\/:*<>|."%?]/.test(value)) {
                throw "The following characters may not be used for table or column names: \\/:*<>|.\"%?";
            }
            if (/^-?[0-9]+$/.test(value)) {
                throw "Column name cannot match [-][0-9...]";
            }
            if (include_wrapper) {
                return '"' + value.replace('"', '""') + '"';
            }
            return value.replace('"', '""');
        }
    }, {
        key: 'escapeDBIdentifier',
        value: function escapeDBIdentifier(value) {
            var include_wrapper = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            if (include_wrapper) {
                return '"' + value.replace('"', '""') + '"';
            }
            return value.replace('"', '""');
        }
    }]);

    return SQL_BUILDER;
})();

exports.SQL_BUILDER = SQL_BUILDER;