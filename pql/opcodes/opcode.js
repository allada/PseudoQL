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
}
