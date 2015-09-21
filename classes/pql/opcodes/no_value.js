"use strict"
var PQL = window.PQL;
PQL.OPCODES.NO_VALUE = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.NO_VALUE, PQL.OPCODES.COMPARITOR);
PQL.OPCODES.NO_VALUE.prototype.getSQL = function (query_object){
    return this._left.getSQL(query_object);
};