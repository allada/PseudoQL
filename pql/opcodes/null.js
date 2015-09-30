import { OPCODE } from './opcode.js';

export class NULL extends OPCODE {
    getSQL () {
        return 'NULL';
    }
}
