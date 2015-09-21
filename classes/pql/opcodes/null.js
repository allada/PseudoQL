"use strict"
var PQL = window.PQL;
PQL.OPCODES.NULL = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.NULL, PQL.OPCODES.OPCODE);
PQL.OPCODES.NULL.prototype.getSQL = function (){
    return 'NULL';
};