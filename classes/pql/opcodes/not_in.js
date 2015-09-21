"use strict"
var PQL = window.PQL;
PQL.OPCODES.NOT_IN = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.NOT_IN, PQL.OPCODES.COMPARITOR);