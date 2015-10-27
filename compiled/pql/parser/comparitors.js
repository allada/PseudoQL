"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COMPARITORS = (function () {
    function COMPARITORS(comparitors) {
        _classCallCheck(this, COMPARITORS);

        this._comparitors = new Map();
        this._comparitorMaxLength = 0;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = comparitors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var comparitor = _step.value;

                this.addComparitor(comparitor.comparitors, comparitor);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    _createClass(COMPARITORS, [{
        key: "clearComparitors",
        value: function clearComparitors() {
            this._comparitors = new Map();
            this._comparitorMaxLength = 0;
            return this;
        }
    }, {
        key: "addComparitor",
        value: function addComparitor(comparitors, cls) {
            var _this = this;

            // Add each item into a multi-dimentional array for faster? processing in the parser
            if (!Array.isArray(comparitors)) {
                comparitors = [comparitors];
            }
            comparitors.forEach(function (item) {
                if (!_this._comparitors.has(item.length)) {
                    if (_this._comparitorMaxLength < item.length) {
                        _this._comparitorMaxLength = item.length;
                    }
                    _this._comparitors.set(item.length, new Map());
                }
                _this._comparitors.get(item.length).set(item, cls);
            });
            return this;
        }
    }, {
        key: "getComparitorMaxLength",
        value: function getComparitorMaxLength() {
            return this._comparitorMaxLength;
        }
    }, {
        key: "comparitors",
        get: function get() {
            return this._comparitors;
        },
        set: function set(v) {}
    }]);

    return COMPARITORS;
})();

exports.COMPARITORS = COMPARITORS;