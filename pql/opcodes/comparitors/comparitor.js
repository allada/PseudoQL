import { OPCODE } from './../opcode.js';

export class COMPARITOR extends OPCODE {
    constructor (...args) {
        super(...args);
        this._needs_group_cache = null;
    }
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
    setNeedsWrapped (val) {
        this._needs_wrapped = val;
        return this;
    }
    needsGroup () {
        if (this._needs_group_cache !== null) {
            return this._needs_group_cache;
        }
        if (this.left) {
            if (this.left.needsGroup()) {
                return this._needs_group_cache = true;
            }
        }
        if (this.right) {
            if (this.right.needsGroup()) {
                return this._needs_group_cache = true;
            }
        }
        return this._needs_group_cache = false;
    }
}
