"use strict"
var PQL = window.PQL;
PQL.OPCODES.COMPARITOR = function (pql_obj){
    this.pql_obj = pql_obj;
};
    PQL.extend(PQL.OPCODES.COMPARITOR, PQL.OPCODES.OPCODE);

PQL.OPCODES.COMPARITOR.prototype.setLeft = function (val){
    this._left = val;
    return this;
};
PQL.OPCODES.COMPARITOR.prototype.setRight = function (val){
    this._right = val;
    return this;
};