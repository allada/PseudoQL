export class TABLE_REF {
    constructor (pql_obj, table) {
        this._refs = [];
        this._pql_obj = pql_obj;
        this._cur_table_obj = this._pql_obj.getConfig().DB_MAP[table];
        this.appendRef(table);
    }
    appendRef (table) {
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
        return query_obj.setJoin(this.getRefs());
    }
}
