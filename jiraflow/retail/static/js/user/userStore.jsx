/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Immutable = require('immutable');
var Marty = require('marty');

var Exception = require('../exception');
var UserConstants = require('./userConstants');

/**
 * Stores the current user as an immutable map.
 */
var UserStore = Marty.createStore({
    displayName: 'users',

    getUser: function () {
        return this.state;
    },

    // Internal state management

    getInitialState: function () {
        return null; // user object
    },

    // Action handlers

    handlers: {
        _receiveUser: UserConstants.RECEIVE_USER
    },

    _receiveUser: function(user, refresh /* default: true */) {
        if(user === null) {
            this.setState(null);
            return;
        }

        if(!(user instanceof Immutable.Map)) {
            throw new Exception(500, "User must be an Immutable.Map");
        }

        if(!user.equals(this.state)) {
            this.setState(user);
        }
    }

});

module.exports = UserStore;