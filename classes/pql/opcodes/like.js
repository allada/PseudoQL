"use strict"
var PQL = window.PQL;
PQL.OPCODES.LIKE = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.LIKE, PQL.OPCODES.COMPARITOR);
PQL.OPCODES.LIKE.prototype.getSQL = function (query_object){
    return this._left.getSQL(query_object) + ' LIKE ' + this._right.getSQL(query_object);
};