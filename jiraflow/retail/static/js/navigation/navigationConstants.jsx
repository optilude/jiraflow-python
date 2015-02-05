/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Marty = require('marty');

var NavigationConstants = Marty.createConstants([
    'NAVIGATE'               // e.g. a user navigates to a new page
]);

module.exports = NavigationConstants;