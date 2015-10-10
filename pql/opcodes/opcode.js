/*
 * Interface class to all OPCODES
 */
export class OPCODE {
    constructor (pql_obj) {
        this.setPqlObj(pql_obj);
    }
    setPqlObj (v) {
        this._pql_obj = v;
        return this;
    }
    getPqlObj () {
        return this._pql_obj;
    }
    isConstant () {
        return false;
    }
    getValue () {
        return null;
    }
    needsGroup () {
        return false;
    }
    isInstanceOf (chk_class) {
        return this instanceof chk_class;
    }
}
