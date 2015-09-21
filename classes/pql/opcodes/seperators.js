"use strict"
var PQL = window.PQL;
PQL.OPCODES.SEPERATORS = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.SEPERATORS, PQL.OPCODES.OPCODE);
PQL.OPCODES.SEPERATORS.prototype.getSQL = function (){
    return 'UNKNOWN';
};