"use strict"
var PQL = window.PQL;
PQL.OPCODES.FIELD = function (pql_obj, field, table_ref){
    this.pql_obj = pql_obj;
    this.setTableRef(table_ref);
    this.setField(field);
};
    PQL.extend(PQL.OPCODES.FIELD, PQL.OPCODES.OPCODE);

PQL.OPCODES.FIELD.prototype.setField = function (field){
    var map_obj;
    if(this._table_ref){
        map_obj = this._table_ref._cur_table_obj;
    }
    if(!map_obj){
        map_obj = this.pql_obj.db_map[this.pql_obj.ref_table];
    }
    if(!map_obj.fields[field]){
        throw "Could not find field '" + field + "' in table '" + map_obj.name + "'";
    }
    this._field = field;
};
PQL.OPCODES.FIELD.prototype.setTableRef = function (table_ref){
    this._table_ref = table_ref || null;
};
PQL.OPCODES.FIELD.prototype.getSQL = function (query_object){
    return (this._table_ref?this._table_ref.getSQL(query_object) + '.':'') + this._field;
};