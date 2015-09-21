"use strict"
var PQL = window.PQL;
PQL.OPCODES.GROUP = function (pql_obj, op_codes){
    this.pql_obj = pql_obj;
    this.setOpCodes(op_codes);
};
    PQL.extend(PQL.OPCODES.GROUP, PQL.OPCODES.OPCODE);

PQL.OPCODES.GROUP.prototype._needs_wrap = true;
PQL.OPCODES.GROUP.prototype.setNeedWrap = function (val){
    this._needs_wrap = !!val;
    return this;
};
PQL.OPCODES.GROUP.prototype.setOpCodes = function (op_codes){
    this._op_codes = op_codes;
    return this;
};
PQL.OPCODES.GROUP.prototype.getOpCodeLen = function (){
    return this._op_codes.length;
};
PQL.OPCODES.GROUP.prototype.getSQL = function (query_object){
    var outs = [];
    if(this._needs_wrap){
        outs.push('(');
    }
    for(var i=0;i<this._op_codes.length;i++){
        outs.push(this._op_codes[i].getSQL(query_object));
    }
    if(this._needs_wrap){
        outs.push(')');
    }
    return outs.join(' ');
};