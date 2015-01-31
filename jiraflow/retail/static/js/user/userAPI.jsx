/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Immutable = require('immutable');

var Marty = require('marty');

/**
 * HTTP API for user operations.
 */
var UserAPI = Marty.createStateSource({
    type: 'http',

    // TODO: Implement correct API

    getUser: function() {
        return this.get('/api/user').then(function(res) {
            return Immutable.fromJS(res.body);
        });
    },

    login: function(username, password) {
        return this.post('/api/user/login').then(function(res) {
            return Immutable.fromJS(res.body);
        });
    },

    logout: function() {
        return this.post('/api/user/logout').then(function(res) {
            return null;
        });
    },

    changePassword: function(oldPassword, newPassword) {
        var req = {
            url: '/api/user/password',
            body: {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
        };

        return this.post(req).then(function(res) {
            return Immutable.fromJS(res.body);
        });
    },

    changePreferences: function(user) {
        var req = {
            url: '/api/user',
            body: user.toJS()
        };

        return this.post(req).then(function(res) {
            return Immutable.fromJS(res.body);
        });
    }

});

module.exports = UserAPI;