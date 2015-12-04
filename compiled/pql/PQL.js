'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _parserJs = require('./parser.js');

var _parserSql_builderJs = require('./parser/sql_builder.js');

var PQL = (function () {
    function PQL() {
        _classCallCheck(this, PQL);
    }

    _createClass(PQL, null, [{
        key: 'getSQL',
        value: function getSQL(_ref) {
            var _this = this;

            var query = _ref.query;
            var table = _ref.table;
            var group = _ref.group;
            var selects = _ref.selects;
            var orderBys = _ref.orderBys;
            var variables = _ref.variables;
            var limit = _ref.limit;
            var offset = _ref.offset;

            var query_parser = new _parserJs.PARSER(query, table, false, this.defaultConfig, [], variables, true);
            if (query_parser.hasError()) {
                throw query_parser.getError();
            }

            if (group === undefined) {
                group = 'id';
            }
            var group_parser = new _parserJs.PARSER(group, table, true, this.defaultConfig, [], variables, false);
            if (group_parser.hasError()) {
                throw group_parser.getError();
            }

            var select_parsers = new Map();
            if (selects instanceof Map) {
                selects.forEach(function (v, k) {
                    var val = new _parserJs.PARSER(v, table, false, _this.defaultConfig, [], variables, false);
                    if (val.hasError()) {
                        throw val.getError();
                    }
                    select_parsers.set(k, val);
                });
            } else {
                for (var k in selects) {
                    if (selects.hasOwnProperty(k)) {
                        var v = new _parserJs.PARSER(selects[k], table, false, this.defaultConfig, [], variables, false);
                        if (v.hasError()) {
                            throw v.getError();
                        }
                        select_parsers.set(k, v);
                    }
                }
            }

            var order_by_parsers = new Map();
            if (orderBys instanceof Map) {
                orderBys.forEach(function (v, k) {
                    // This one is backwards... be warned that k is the string v is the [desc, asc]
                    var val = new _parserJs.PARSER(k, table, false, _this.defaultConfig, [], variables, false);
                    if (val.hasError()) {
                        throw val.getError();
                    }
                    order_by_parsers.set(val, v);
                });
            } else {
                for (var k in orderBys) {
                    if (orderBys.hasOwnProperty(k)) {
                        var v = new _parserJs.PARSER(k, table, false, this.defaultConfig, [], variables, false);
                        if (v.hasError()) {
                            throw v.getError();
                        }
                        order_by_parsers.set(v, orderBys[k]);
                    }
                }
            }

            var sb = new _parserSql_builderJs.SQL_BUILDER({
                query: query_parser,
                table: table,
                group: group_parser,
                selects: select_parsers,
                orderBys: order_by_parsers,
                limit: limit,
                offset: offset,
                variables: variables
            });
            return sb.toString();
        }
    }, {
        key: 'setDefaultConfig',
        value: function setDefaultConfig(config) {
            PQL._defaultConfig = config;
        }
    }, {
        key: 'defaultConfig',
        get: function get() {
            return PQL._defaultConfig;
        },
        set: function set(v) {
            PQL._defaultConfig = v;
        }
    }]);

    return PQL;
})();

exports.PQL = PQL;