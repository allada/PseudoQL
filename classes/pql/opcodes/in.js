"use strict"
var PQL = window.PQL;
PQL.OPCODES.IN = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.IN, PQL.OPCODES.COMPARITOR);