"use strict"
var PQL = window.PQL;
PQL.OPCODES.EQUAL = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.EQUAL, PQL.OPCODES.COMPARITOR);
PQL.OPCODES.EQUAL.prototype.getSQL = function (query_object){
    return this._left.getSQL(query_object) + ' = ' + this._right.getSQL(query_object);
};