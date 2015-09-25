import { COMPARITOR } from './comparitor.js';

export class IN extends COMPARITOR {
    static set comparitors (v) {}
    static get comparitors () {
        return ['|'];
    }
    getSQL (query_object) {
        //TODO: FIX!
        return this.left.getSQL(query_object) + ' > ' + this.right.getSQL(query_object);
    }
}
