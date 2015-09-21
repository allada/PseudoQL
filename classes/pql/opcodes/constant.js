"use strict"
var PQL = window.PQL;
PQL.OPCODES.CONSTANT = function (pql_obj, val){
    this.pql_obj = pql_obj;
    this.setValue(val);
};
    PQL.extend(PQL.OPCODES.CONSTANT, PQL.OPCODES.OPCODE);
PQL.OPCODES.CONSTANT.prototype.setValue = function (val){
    this._value = val;
    return this;
};
PQL.OPCODES.CONSTANT.prototype.getValue = function (){
    return this._value;
};
PQL.OPCODES.CONSTANT.prototype.getSQL = function (){
    return "'" + this.getValue().replace(/([\\'])/, '\\$1') + "'";
};