export class COMPARITORS {
    constructor (comparitors) {
        this._comparitors = new Map();
        this._comparitorMaxLength = 0;

        for (let comparitor of comparitors) {
            this.addComparitor(comparitor.comparitors, comparitor);
        }
    }

    get comparitors () {
        return this._comparitors;
    }
    set comparitors (v) {}
    clearComparitors () {
        this._comparitors = new Map();
        this._comparitorMaxLength = 0;
        return this;
    }
    addComparitor (comparitors, cls) {
        // Add each item into a multi-dimentional array for faster? processing in the parser
        if (!Array.isArray(comparitors)) {
            comparitors = [comparitors];
        }
        comparitors.forEach(( item ) => {
            if (!this._comparitors.has(item.length)) {
                if (this._comparitorMaxLength < item.length) {
                    this._comparitorMaxLength = item.length;
                }
                this._comparitors.set(item.length, new Map());
            }
            this._comparitors.get(item.length).set(item, cls);
        });
        return this;
    }
    getComparitorMaxLength () {
        return this._comparitorMaxLength;
    }
}
