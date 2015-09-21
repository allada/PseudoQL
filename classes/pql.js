"use strict"
window.PQL = {
    extend: function (child, parent){
        child.prototype = new parent();
        child.prototype.constructor = parent;
        return child;
    }
};