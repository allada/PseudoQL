import { COMPARITOR } from './comparitor.js';
import { CONSTANT } from './../constant.js';

export class LIKE extends COMPARITOR {
    static set comparitors (v) {}
    static get comparitors () {
        return ['~'];
    }
    get right () {
        return this._right;
    }
    set right (v) {
        if (v instanceof CONSTANT) {
            v.setValue(v.getValue() + '%');
        }
        return this._right = v;
    }
    getSQL (query_object) {
        return this.left.getSQL(query_object) + ' LIKE ' + this.right.getSQL(query_object);
    }
}
