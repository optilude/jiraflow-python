/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Marty = require('marty');

var Exception = require('../exception');
var UserConstants = require('./userConstants');
var UserAPI = require('./userAPI');

/**
 * First order actions for user management: log in, log out, change password and
 * change preferences. Delegates to UserAPI.
 */
var UserActionCreators = Marty.createActionCreators({

    login: UserConstants.LOGIN_USER(function(username, password) {
        return UserAPI.login(username, password)
        .then(result => {
            // inform stores a user has been received
            this.receiveUser(result);

            // dispatch the higher order login action
            this.dispatch(username);

            return result;
        })
        .catch(error => {
            throw new Exception(error.status, "Server request failed", error);
        });
    }),

    logout: UserConstants.LOGOUT_USER(function() {
        return UserAPI.logout()
        .then(result => {
            // inform stores a user has been received
            this.receiveUser(null);

            // dispatch the higher order logout action
            this.dispatch();

            return result;
        })
        .catch(error => {
            throw new Exception(error.status, "Server request failed", error);
        });
    }),

    changePassword: UserConstants.CHANGE_USER_PASSWORD(function(oldPassword, newPassword) {
        return UserAPI.changePassword(oldPassword, newPassword)
        .then(result => {
            this.dispatch();
            return result;
        })
        .catch(error => {
            throw new Exception(error.status, "Server request failed", error);
        });
    }),

    changePreferences: UserConstants.CHANGE_USER_PREFS(function(newUser) {
        return UserAPI.changePreferences(newUser)
        .then(result => {
            // inform stores a user has been received
            this.receiveUser(result);

            // dispatch the higher order change preferences action
            this.dispatch(result);

            return result;
        })
        .catch(error => {
            throw new Exception(error.status, "Server request failed", error);
        });
    }),

    receiveUser: UserConstants.RECEIVE_USER()

});

module.exports = UserActionCreators;