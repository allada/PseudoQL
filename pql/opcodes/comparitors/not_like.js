import { COMPARITOR } from './comparitor.js';

export class NOT_LIKE extends COMPARITOR {
    static set comparitors (v) {}
    static get comparitors () {
        return ['!~', '!'];
    }
    getSQL (query_object) {
        return this.left.getSQL(query_object) + ' NOT LIKE ' + this.right.getSQL(query_object);
    }
}
