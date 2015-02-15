"use strict";

var Exception = function(status, message, nestedError) {
    this.status = status;
    this.message = message;
    this.nestedError = nestedError;
};

Exception.protype = Object.create(Error.prototype);
Exception.protype.constructor = Exception;

module.exports = Exception;