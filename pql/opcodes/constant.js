import { OPCODE } from './opcode.js';

export class CONSTANT extends OPCODE {
    constructor (pql_obj, val) {
        super(pql_obj, val);

        this._force_numeric = false;
        this.setValue(val);
    }
    setValue (val) {
        this._value = val;
        return this;
    }
    setForceNumeric (force) {
        this._force_numeric = !!force;
    }
    getValue () {
        return this._value;
    }
    getSQL (query_object, type_ref) {
        let value = this.getValue();
        if ((this._force_numeric || (type_ref && type_ref.is_numeric)) && this.constructor.canBeNumeric(value)) {
            return value.toString().replace(/[^0-9.\-]+/g, '');
        } else {
            return query_object.constructor.escapeDBString(value.toString(), true);
        }
    }
    isConstant () {
        return true;
    }
    static canBeNumeric (value) {
        return /^-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/.test(value);
    }
}
