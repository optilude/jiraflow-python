"use strict";

var React = require('react'); // jshint unused:false

var types = {
    burnup: new (require('./burnup'))()
};

types[null] = new (require('./common'))();
module.exports = types;