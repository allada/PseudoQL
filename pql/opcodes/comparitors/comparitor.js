import { OPCODE } from './../opcode.js';

export class COMPARITOR extends OPCODE {
    get left () {
        return this._left;
    }
    set left (v) {
        return this._left = v;
    }

    get right () {
        return this._right;
    }
    set right (v) {
        return this._right = v;
    }
    setLeft (v) {
        this.left = v;
        return this;
    }
    setRight (v) {
        this.right = v;
        return this;
    }
}
