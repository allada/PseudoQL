import { COMPARITOR } from './comparitor.js';

export class NO_VALUE extends COMPARITOR {
    static set comparitors (v) {}
    static get comparitors () {
        return [';'];
    }
    getSQL (query_object) {
        return this.left.getSQL(query_object);
    }
}
