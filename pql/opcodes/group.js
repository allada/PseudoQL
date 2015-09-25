import { OPCODE } from './opcode.js';

export class GROUP extends OPCODE {
    constructor (pql_obj, op_codes) {
        super(pql_obj, op_codes);

        this._needs_wrap = true;
        this.setOpCodes(op_codes);
    }
    setNeedWrap (val) {
        this._needs_wrap = !!val;
        return this;
    }
    setOpCodes (op_codes) {
        this._op_codes = op_codes;
        return this;
    }
    getOpCodeLen () {
        return this._op_codes.length;
    }
    getSQL (query_obj) {
        let outs = [];
        if (this._needs_wrap) {
            outs.push('(');
        }
        for (let op_code of this._op_codes) {
            outs.push(op_code.getSQL(query_obj));
        }
        if (this._needs_wrap) {
            outs.push(')');
        }
        return outs.join(' ');
    }
}
