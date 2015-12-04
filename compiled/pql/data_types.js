"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DATA_TYPES = function DATA_TYPES() {
    _classCallCheck(this, DATA_TYPES);
};

exports.DATA_TYPES = DATA_TYPES;
;
DATA_TYPES.NUMERIC = {
    is_numeric: true
};
DATA_TYPES.DATE = {
    is_numeric: false
};
DATA_TYPES.STRING = {
    is_numeric: false
};
DATA_TYPES.BOOLEAN = {
    is_numeric: true
};
DATA_TYPES.ANY = {
    is_numeric: false
};