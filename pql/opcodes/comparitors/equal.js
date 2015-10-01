import { COMPARITOR } from './comparitor.js';
import { NULL } from './../null.js';

export class EQUAL extends COMPARITOR {
    static set comparitors (v) {}
    static get comparitors () {
        return ['=', ':'];
    }
    getSQL (query_object) {
        let left_type;
        let right_type;
        if (this.left.getType) {
            left_type = this.left.getType();
        }
        if (this.right.getType) {
            right_type = this.right.getType();
        }
        if (this.right instanceof NULL) {
            return this.left.getSQL(query_object, right_type) + ' IS NULL';
        } else {
            return this.left.getSQL(query_object, right_type) + ' = ' + this.right.getSQL(query_object, left_type);
        }
    }
}
