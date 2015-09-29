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
            map_obj = table_ref.getCurTableObj();
        } else {
            map_obj = config.DB_MAP[pql_obj.getRefTable()];
        }
        
        if (!map_obj.fields[field]) {
            throw `Could not find field '${field}' in table '${map_obj.name}'`;
        }
        this._field = field;
        this.setFieldConfig(map_obj.fields[field]);
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
    setFieldConfig (v) {
        this._field_config = v;
        return this;
    }
    getFieldConfig () {
        return this._field_config;
    }
    getType () {
        return this.getFieldConfig().type;
    }
    getSQL (query_obj) {
        return (this.getTableRef() ? this.getTableRef().getSQL(query_obj) : this.getPqlObj().getConfig().DB_MAP[this.getPqlObj().getRefTable()].name) + '.' + this.getField();
    }
}
