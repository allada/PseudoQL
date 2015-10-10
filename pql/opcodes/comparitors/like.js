import { COMPARITOR } from './comparitor.js';
import { NULL } from './../null.js';
import { CONSTANT } from './../constant.js';
import { CONSTANTS_ARRAY } from './../constants_array.js';

export class LIKE extends COMPARITOR {
    static set comparitors (v) {}
    static get comparitors () {
        return ['~'];
    }
    static _getSQLHelper (query_object, left, right) {
        var val;
        var left_sql;
        if (typeof left === 'string') {
            left_sql = left;
        } else {
            left_sql = left.getSQL(query_object);
        }
        // Hack used to add the wild card char
        if (right.isInstanceOf(CONSTANT)) {
            val = right.getValue();
            right.setValue(val + '%');
        }
        var ret_val;
        if (right.isInstanceOf(NULL)) {
            ret_val = left_sql + ' IS NULL';
        } else {
            ret_val = left_sql + ' LIKE ' + right.getSQL(query_object);
        }
        // Continue hack from above hack
        if (right.isInstanceOf(CONSTANT)) {
            right.setValue(val);
        }
        return ret_val;
    }
    getSQL (query_object) {
        if (this.right.isInstanceOf(CONSTANTS_ARRAY)) {
            let right_values = this.right.getValue();
            let sql_safe_values = [];
            let left_sql = this.left.getSQL(query_object);
            right_values.forEach((v) => {
                sql_safe_values.push(this.constructor._getSQLHelper(query_object, left_sql, v));
            });
            
            return `(${ sql_safe_values.join(' OR ') })`;
        } else {
            return this.constructor._getSQLHelper(query_object, this.left, this.right);
        }
    }
}
