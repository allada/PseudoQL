"use strict"
var PQL = window.PQL;
PQL.OPCODES.GREATER_THAN = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.GREATER_THAN, PQL.OPCODES.COMPARITOR);
PQL.OPCODES.GREATER_THAN.prototype.getSQL = function (query_object){
    return this._left.getSQL(query_object) + ' > ' + this._right.getSQL(query_object);
};