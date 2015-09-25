import { COMPARITOR } from './comparitor.js';

export class LESS_THAN extends COMPARITOR {
    static set comparitors (v) {}
    static get comparitors () {
        return ['<'];
    }
    getSQL (query_object) {
        return this.left.getSQL(query_object) + ' < ' + this.right.getSQL(query_object);
    }
}
