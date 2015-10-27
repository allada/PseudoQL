/*
 * Interface class to all OPCODES
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OPCODE = (function () {
    function OPCODE(pql_obj) {
        _classCallCheck(this, OPCODE);

        this.setPqlObj(pql_obj);
    }

    _createClass(OPCODE, [{
        key: "setPqlObj",
        value: function setPqlObj(v) {
            this._pql_obj = v;
            return this;
        }
    }, {
        key: "getPqlObj",
        value: function getPqlObj() {
            return this._pql_obj;
        }
    }, {
        key: "isConstant",
        value: function isConstant() {
            return false;
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return null;
        }
    }, {
        key: "needsGroup",
        value: function needsGroup() {
            return false;
        }
    }, {
        key: "isInstanceOf",
        value: function isInstanceOf(chk_class) {
            return this instanceof chk_class;
        }
    }]);

    return OPCODE;
})();

exports.OPCODE = OPCODE;