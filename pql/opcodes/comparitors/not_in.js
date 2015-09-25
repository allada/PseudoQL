import { COMPARITOR } from './comparitor.js';

export class NOT_IN extends COMPARITOR {
    static set comparitors (v) {}
    static get comparitors () {
        return ['!|'];
    }
    getSQL (query_object) {
        // TODO: FIX THIS
        return this.left.getSQL(query_object) + ' NOT IN ' + this.right.getSQL(query_object);
    }
}
