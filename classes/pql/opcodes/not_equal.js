"use strict"
var PQL = window.PQL;
PQL.OPCODES.NOT_EQUAL = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.NOT_EQUAL, PQL.OPCODES.COMPARITOR);
PQL.OPCODES.NOT_EQUAL.prototype.getSQL = function (query_object){
    return this._left.getSQL(query_object) + ' != ' + this._right.getSQL(query_object);
};