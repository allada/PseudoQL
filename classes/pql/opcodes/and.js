"use strict"
var PQL = window.PQL;
PQL.OPCODES.AND = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.AND, PQL.OPCODES.SEPERATORS);
PQL.OPCODES.AND.prototype.getSQL = function (){
    return 'AND';
};