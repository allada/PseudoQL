import { PARSER } from './parser.js';
import { SQL_BUILDER } from './parser/sql_builder.js';

export class PQL {
    static get defaultConfig () {
        return PQL._defaultConfig;
    }
    static set defaultConfig (v) {
        PQL._defaultConfig = v;
    }

    static getSQL ({ query, table, group, selects, orderBys }) {
        var query_parser = new PARSER(query, table, false, this.defaultConfig);
        if (query_parser.hasError()) {
            throw query_parser.getError();
        }

        var group_parser = new PARSER(group, table, true, this.defaultConfig);
        if (group_parser.hasError()) {
            throw group_parser.getError();
        }

        let select_parsers = new Map();
        if (selects instanceof Map) {
            selects.forEach((v, k) => {
                let val = new PARSER(v, table, false, this.defaultConfig);
                if (val.hasError()) {
                    throw val.getError();
                }
                select_parsers.set(k, val);
            });
        } else {
            for (let k in selects) {
                if (selects.hasOwnProperty(k)) {
                    let v = new PARSER(selects[k], table, false, this.defaultConfig);
                    if (v.hasError()) {
                        throw v.getError();
                    }
                    select_parsers.set(k, v);
                }
            }
        }

        if (!select_parsers.size) {
            throw "Must have at least 1 select";
        }

        let order_by_parsers = new Map();
        if (orderBys instanceof Map) {
            orderBys.forEach((v, k) => {
                // This one is backwards... be warned that k is the string v is the [desc, asc]
                let val = new PARSER(k, table, false, this.defaultConfig);
                if (val.hasError()) {
                    throw val.getError();
                }
                order_by_parsers.set(val, v);
            });
        } else {
            for (let k in orderBys) {
                if (orderBys.hasOwnProperty(k)) {
                    let v = new PARSER(k, table, false, this.defaultConfig);
                    if (v.hasError()) {
                        throw v.getError();
                    }
                    order_by_parsers.set(v, orderBys[k]);
                }
            }
        }

        let sb = new SQL_BUILDER({
            query: query_parser,
            table: table,
            group: group_parser,
            selects: select_parsers,
            orderBys: order_by_parsers,
        });
        return sb.toString();
    }
    static setDefaultConfig (config) {
        PQL._defaultConfig = config;
    }
}
