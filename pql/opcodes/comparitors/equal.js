import { COMPARITOR } from './comparitor.js';
import { NULL } from './../null.js';
import { CONSTANTS_ARRAY } from './../constants_array.js';

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
        if (this.right.isInstanceOf(NULL)) {
            return this.left.getSQL(query_object, right_type) + ' IS NULL';
        } else if (this.right.isInstanceOf(CONSTANTS_ARRAY)) {
            let right_values = this.right.getValue();
            let sql_safe_values = [];
            right_values.forEach((v) => {
                sql_safe_values.push(v.getSQL(query_object, left_type));
            });
            return this.left.getSQL(query_object, right_type) + ' IN (' + sql_safe_values.join(', ') + ')';
        } else {
            return this.left.getSQL(query_object, right_type) + ' = ' + this.right.getSQL(query_object, left_type);
        }
    }
}
