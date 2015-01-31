/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Marty = require('marty');

var UserConstants = Marty.createConstants([
    'LOGIN_USER',           // e.g. to instigate login
    'LOGOUT_USER',          // e.g. to instigate logout
    'CHANGE_USER_PASSWORD', // e.g. to change user password
    'CHANGE_USER_PREFS',    // e.g. to instigate change in user preferences

    'RECEIVE_USER',         // e.g. to receive an updated user from the server (null if logged out)
]);

module.exports = UserConstants;