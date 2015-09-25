import { OPCODE } from './opcode.js';

export class FIELD extends OPCODE {
    constructor (pql_obj, field, table_ref) {
        super(pql_obj, field, table_ref);

        this.setTableRef(table_ref);
        this.setField(field);
    }
    setField (field) {
        let map_obj;
        let table_ref   = this.getTableRef();
        let pql_obj     = this.getPqlObj();
        let config      = pql_obj.getConfig();

        if (table_ref) {
            map_obj = config.DB_MAP[table_ref.getCurTableObj().name];
        } else {
            map_obj = config.DB_MAP[pql_obj.getRefTable()];
        }
        
        if (!map_obj.fields[field]) {
            throw `Could not find field '${field}' in table '${map_obj.name}'`;
        }
        this._field = field;
        return this;
    }
    getField () {
        return this._field;
    }
    getTableRef () {
        return this._table_ref;
    }
    setTableRef (table_ref) {
        this._table_ref = table_ref || null;
    }
    getSQL (query_obj) {
        return (this.getTableRef() ? this.getTableRef().getSQL(query_obj) + '.' : '') + this.getField();
    }
}
