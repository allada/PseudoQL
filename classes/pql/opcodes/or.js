"use strict"
var PQL = window.PQL;
PQL.OPCODES.OR = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.OR, PQL.OPCODES.SEPERATORS);
PQL.OPCODES.OR.prototype.getSQL = function (){
    return 'OR';
};