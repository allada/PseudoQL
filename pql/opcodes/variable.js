import { CONSTANT } from './constant.js';
import { NULL } from './null.js';

export class VARIABLE extends CONSTANT {
    constructor (pql_obj, var_name) {
        super(pql_obj, null);

        pql_obj.addVariable(var_name, this);

        this._force_numeric = false;
        this.setVarName(var_name);
    }
    setVarName (var_name) {
        this._var_name = var_name;
    }
    getVarName () {
        return this._var_name;
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
        if (value === null || value === undefined) {
            return (new NULL(query_object)).getSQL(query_object);
        } else if ((this._force_numeric || (type_ref && type_ref.is_numeric)) && this.constructor.canBeNumeric(value)) {
            return value.toString().replace(/[^0-9.\-]+/g, '');
        } else {
            return query_object.constructor.escapeDBString(value.toString(), true);
        }
    }
    isInstanceOf (class_obj) {
        let value = this.getValue();
        if (value === null || value === undefined) {
            return class_obj === NULL;
        }
        return this instanceof class_obj;
    }
    isConstant () {
        return true;
    }
    static canBeNumeric (value) {
        if (value === null || value === undefined) {
            return false;
        }
        return /^-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/.test(value);
    }
}
