"use strict"
var PQL = window.PQL;
PQL.OPCODES.SEPERATOR = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.SEPERATOR, PQL.OPCODES.SEPERATORS);
PQL.OPCODES.SEPERATOR.prototype.getSQL = function (){
    return ',';
};