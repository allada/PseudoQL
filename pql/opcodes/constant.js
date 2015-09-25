import { OPCODE } from './opcode.js';

export class CONSTANT extends OPCODE {
    constructor (pql_obj, val) {
        super(pql_obj, val);

        this.setValue(val);
    }
    setValue (val) {
        this._value = val;
        return this;
    }
    getValue () {
        return this._value;
    }
    getSQL () {
        return "'" + this.getValue().replace(/([\\'])/, '\\$1') + "'";
    }
}
