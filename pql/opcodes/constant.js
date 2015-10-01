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
    getSQL (query_object, type_ref) {
        let value = this.getValue();
        if (type_ref && type_ref.is_numeric && /^-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/.test(value)) {
            return this.getValue().replace(/[^0-9.\-]+/, '');
        } else {
            return "'" + this.getValue().replace(/([\\'])/, '\\$1').replace("\r", "\\r").replace("\n", "\\n").replace("\t", "\\t") + "'";
        }
    }
    isConstant () {
        return true;
    }
}
