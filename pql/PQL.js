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
        let parser = new PARSER(query, table, false, this.defaultConfig);
        if (parser.hasError()) {
            throw parser.getError();
        }
        let sb = new SQL_BUILDER(parser);
        return sb.toString();
    }
    static setDefaultConfig (config) {
        PQL._defaultConfig = config;
    }
}
