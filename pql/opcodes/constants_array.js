import { CONSTANT } from './constant.js';

export class CONSTANTS_ARRAY extends CONSTANT {
    getSQL (query_object, type_ref) {
        throw 'Cannot call getSQL of CONSTANTS_ARRAY';
    }
}
