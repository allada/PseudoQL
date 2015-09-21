"use strict"
var PQL = window.PQL;
PQL.OPCODES.NOT_LIKE = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.NOT_LIKE, PQL.OPCODES.COMPARITOR);
PQL.OPCODES.NOT_LIKE.prototype.getSQL = function (query_object){
    return this._left.getSQL(query_object) + ' NOT LIKE ' + this._right.getSQL(query_object);
};