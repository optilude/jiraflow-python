"use strict";

var types = {
    burnup: new (require('./burnup'))()
};

types[null] = new (require('./common'))();
module.exports = types;