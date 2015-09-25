import { OPCODE } from './opcode.js';

export class NULL extends OPCODE {
    setSQL () {
        return 'NULL';
    }
}
