import { PARSER } from './parser.js';
import { SQL_BUILDER } from './parser/sql_builder.js';

export class PQL {
    static get defaultConfig () {
        return PQL._defaultConfig;
    }
    static set defaultConfig (v) {
        PQL._defaultConfig = v;
    }

    static getSQL ({ query, table, group, selects, orderBy }) {
        let query_parser = new PARSER(query, table, false, this.defaultConfig);
        if (query_parser.hasError()) {
            throw query_parser.getError();
        }

        let group_parser = new PARSER(group, table, true, this.defaultConfig);
        if (group_parser.hasError()) {
            throw group_parser.getError();
        }

        let select_parsers = new Map();
        for (let k in selects) {
            if (selects.hasOwnProperty(k)) {
                let v = new PARSER(selects[k], table, false, this.defaultConfig);
                if (v.hasError()) {
                    throw v.getError();
                }
                select_parsers.set(k, v);
            }
        }

        let order_by_parser = new PARSER(orderBy, table, false, this.defaultConfig);
        if (order_by_parser.hasError()) {
            throw order_by_parser.getError();
        }

        let sb = new SQL_BUILDER({
            query: query_parser,
            table: table,
            group: group_parser,
            selects: select_parsers,
            orderBy: order_by_parser,
        });
        return sb.toString();
    }
    static setDefaultConfig (config) {
        PQL._defaultConfig = config;
    }
}
