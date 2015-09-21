"use strict"
PQL.PARSER.TABLE_REF = function (pql_obj, table){
    this._pql_obj = pql_obj;
    this._refs = [];
    this._cur_table_obj = this._pql_obj.db_map[this._pql_obj.ref_table];
    this.appendRef(table);
};
PQL.PARSER.TABLE_REF.prototype.appendRef = function (table){
    this._refs.push(table);
    var ref,
        cur_table_obj = this._cur_table_obj;
    for(var i=0;i<this._refs.length;i++){
        ref = this._refs[i];
        
    }
    return this;
};
PQL.PARSER.TABLE_REF.prototype.getSQL = function (query_object){
    return query_object.setJoin(this._refs);
};
PQL.PARSER.TABLE_REF.prototype.getMapObj = function (){
    if (this._refs){
        throw "No refs in TABLE_REF";
    }
};