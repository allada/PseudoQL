export class TABLE_REF {
    constructor (pql_obj, table = null) {
        this._refs = [];
        this._pql_obj = pql_obj;
        this._cur_table_obj = null;
        if (table) {
            this.appendRef(table);
        }
    }
    appendRef (table) {
        let db_map = this._pql_obj.getConfig().DB_MAP;
        if (!this._cur_table_obj) {
            this._cur_table_obj = db_map[this._pql_obj.getRefTable()];
        }
        if (this._cur_table_obj.linkTo[table]) {
            this._cur_table_obj = db_map[this._cur_table_obj.linkTo[table].table];
        } else if (this._cur_table_obj.linkFrom[table]) {
            this._cur_table_obj = db_map[this._cur_table_obj.linkFrom[table].table];
        } else {
            throw `Link "${ table }" does not exist in table "${ this._cur_table_obj.name }"`;
        }
        this._refs.push(table);
        return this;
    }
    getCurTableObj () {
        return this._cur_table_obj;
    }
    getRefs () {
        return this._refs;
    }
    getSQL (query_obj) {
        return query_obj.constructor.escapeDBIdentifier(query_obj.setJoin(this.getRefs()), true);
    }
}
