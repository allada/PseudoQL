import { PARSER } from './../parser.js';
export class SQL_BUILDER {
    constructor ({ query, table, group, selects, orderBy }) {
        this._query = query;
        this._table = table;
        this._group = group;
        this._selects = selects;
        this._orderBy = orderBy;

        this._table_refs = new Map;
        this._linked_tables = [];
        this._next_i = 0;
    }
    getQuery () {
        return this._query;
    }
    getTable () {
        return this._table;
    }
    getGroup () {
        return this._group;
    }
    getSelects () {
        return this._selects;
    }
    getOrderBy () {
        return this._orderBy;
    }
    getTableName () {
        return this.getQuery().getConfig().DB_MAP[this.getTable()].name;
    }
    toString () {
        let query_str = this.getQuery().getWhereCodes().getSQL(this);
        if (query_str) {
            query_str = '\nWHERE\n\t' + query_str;
        }
        let having_str = this.getQuery().getHavingCodes().getSQL(this);
        if (having_str) {
            having_str = '\nHAVING\n\t' + having_str;
        }
        let group_str = this.getGroup().getCodes().getSQL(this);
        if (group_str) {
            group_str = '\nGROUP BY\n\t' + group_str;
        }
        let selects = [];
        this.getSelects().forEach((v, k) => {
            let val = v.getCodes().getSQL(this) + ((k) ? ' AS ' + k : '');
            if (val) {
                selects.push(val);
            }
        });
        if (!selects.length) {
            selects.push('*');
        }
        let order_by_str = this.getOrderBy().getCodes().getSQL(this);
        if (order_by_str) {
            order_by_str = '\nORDER BY\n\t' + order_by_str;
        }

        let join_str = '';
        if (this._table_refs.size) {
            let join_ary = [];
            for (let table_ref of this._linked_tables) {
                join_ary.push(`LEFT JOIN ${ table_ref.table_obj.name } AS ${ table_ref.alias } ON ${ table_ref.parser.getCodes().getSQL(this) }`);
            }
            if (join_ary.length) {
                join_str = '\n\t' + join_ary.join('\n\t');
            }
        }
        return 'SELECT\n\t' + selects.join(',\n\t') + '\nFROM ' + this.getTableName() + join_str + query_str + group_str + having_str + order_by_str;
    }
    _addTableLink (table_ary) {
        let table_str = this.constructor.tableArrayToString(table_ary);
        if (this._table_refs.has(table_str)) {
            return false;
        }
        
        let config = this.getQuery().getConfig();
        let start_table = this.getTable();

        let accum_table_ary = [];
        let trimmed_table_ary = table_ary.slice(0, table_ary.length - 1);
        for (let ref of trimmed_table_ary) {
            accum_table_ary.push(ref);
            let ary_copy = [...accum_table_ary];
            if (!this._table_refs.has(this.constructor.tableArrayToString(ary_copy))) {
                this._addTableLink(ary_copy);
            }
        }
        let link_obj = this.getLinkObj(table_ary);
        let link_info = {
            alias: this.getNextRefName(),
            table_ary: table_ary,
            table_str: table_str,
            parser: null,
            table_obj: config.DB_MAP[link_obj.table],
        };

        // Because this function may be recusive it needs to set this field here even though
        // all fields may not be available yet.
        if (!this._table_refs.has(link_info.table_str)) {
            this._table_refs.set(link_info.table_str, link_info);
        }

        // Pop last item off the array and clone it so it doesn't count itself
        let parser = new PARSER(link_obj.psudoql, this.getTable(), false, this.getQuery().getConfig(), table_ary.slice(0, table_ary.length - 1));
        // This needs to happen here to ensure the tables get added in the proper order
        parser.getCodes().getSQL(this);
        
        link_info.parser = parser;

        this._linked_tables.push(link_info);

        return link_info.alias;
    }
    getLinkObj (table_ary) {
        let tb_ary = [...table_ary];
        let db_map = this.getQuery().getConfig().DB_MAP;
        let cur_obj = db_map[this.getTable()];
        let cur_link_obj;
        table_ary.forEach((v) => {
            if (cur_obj.linkTo.hasOwnProperty(v)) {
                cur_link_obj = cur_obj.linkTo[v];
            } else if (cur_obj.linkFrom.hasOwnProperty(v)) {
                cur_link_obj = cur_obj.linkFrom[v];
            } else {
                throw `No table link from "${ cur_obj.name }" to table "${ v }"`;
            }
            cur_obj = db_map[cur_link_obj.table];
        });
        return cur_link_obj;
    }
    getNextRefName () {
        // Using base 36 just because it will recude the total size of the query... Really it's just for the hell of it.
        // Using 'a' because.... Why not?
        let ref = 'a' + this._next_i.toString(36);
        this._next_i++;
        return ref;
    }
    setJoin (table_ary) {
        let table_str = this.constructor.tableArrayToString([...table_ary]);
        if (this._table_refs.has(table_str)) {
            return this._table_refs.get(table_str).alias;
        }
        return this._addTableLink(table_ary)
    }
    static tableArrayToString (table_ary) {
        return table_ary.join("\0");
    }
}