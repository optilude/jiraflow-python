"use strict";

var Immutable = require('immutable');
var Marty = require('marty');

/**
 * HTTP API for user operations.
 */
var UserAPI = Marty.createStateSource({
    type: 'http',

    getUser: function() {
        return this.get('/api/user')
        .then(res => {
            return Immutable.fromJS(res.body);
        });
    },

    login: function(username, password) {
        var req = {
            url: '/api/user/login',
            body: {
                username: username,
                password: password
            }
        };

        return this.post(req)
        .then(res => {
            return Immutable.fromJS(res.body);
        });
    },

    logout: function() {
        return this.post('/api/user/logout')
        .then(res => {
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

        return this.post(req)
        .then(res => {
            return Immutable.fromJS(res.body);
        });
    },

    changePreferences: function(user) {
        var req = {
            url: '/api/user',
            body: user.toJS()
        };

        return this.put(req)
        .then(res => {
            return Immutable.fromJS(res.body);
        });
    }

});

module.exports = UserAPI;