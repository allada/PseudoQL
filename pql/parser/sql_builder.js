export class SQL_BUILDER {
    constructor (query_object) {
        this._query_object = query_object;
        this._table_refs = {};
        this._next_i = 0;
    }
    getQueryObject () {
        return this._query_object;
    }
    toString () {
        return this.getQueryObject().getCodes().getSQL(this);
    }
    setJoin (table_ary) {
        // Join on null character just because it's almost never going to be in a table name or field name
        let table_str = table_ary.join("\0");

        if (this._table_refs[table_str]) {
            return this._table_refs[table_str];
        }

        // Using base 36 just because it will recude the total size of the query... Really it's just for the hell of it.
        // Using 'a' because.... Why not?
        return this._table_refs[table_str] = 'a' + this._next_i.toString(36);
    }
}