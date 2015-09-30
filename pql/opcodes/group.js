import { OPCODE } from './opcode.js';

export class GROUP extends OPCODE {
    constructor (pql_obj, op_codes) {
        super(pql_obj, op_codes);

        this._needs_group_cache = null;
        this._needs_wrap = true;
        this.setOpCodes(op_codes);
    }
    setNeedWrap (val) {
        this._needs_group_cache = null;
        this._needs_wrap = !!val;
        return this;
    }
    setOpCodes (op_codes) {
        this._needs_group_cache = null;
        this._op_codes = op_codes;
        return this;
    }
    getOpCodes () {
        return this._op_codes;
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

    needsGroup () {
        if (this._needs_group_cache !== null) {
            return this._needs_group_cache;
        }
        for (let op_code of this._op_codes) {
            if (op_code.needsGroup()) {
                return this._needs_group_cache = true;
            }
        }
        return this._needs_group_cache = false;
    }
}
