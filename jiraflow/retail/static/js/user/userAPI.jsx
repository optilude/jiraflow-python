/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window, setTimeout */
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
        // TODO: Remove faked implementation
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve({
                    email: "john@example.org",
                    name: "John Smith",
                    roles: []
                });
            }, 1000);
        });

        // return this.get('/api/user')
        // .then(res => {
        //     return Immutable.fromJS(res.body);
        // });
    },

    login: function(username, password) {

        // TODO: Remove faked implementation
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                if(username === "john@example.org" && password === "secret") {
                    resolve(Immutable.fromJS({
                        email: "john@example.org",
                        name: "John Smith",
                        roles: []
                    }));
                } else {
                    reject({
                        status: 401,
                        body: {}
                    });
                }
            }, 1000);
        });

        // return this.post('/api/user/login')
        // .then(res => {
        //     return Immutable.fromJS(res.body);
        // });
    },

    logout: function() {

        // TODO: Remove faked implementation
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(null);
            }, 1000);
        });

        // return this.post('/api/user/logout')
        // .then(res => {
        //     return null;
        // });
    },

    changePassword: function(oldPassword, newPassword) {

        // TODO: Remove faked implementation
        return new Promise(function(resolve, reject) {
            setTimeout(() => {

                if(oldPassword !== 'secret') {
                    reject({
                        status: 401,
                        body: {}
                    });
                } else {
                    resolve();
                }

            }, 1000);
        });

        // var req = {
        //     url: '/api/user/password',
        //     body: {
        //         oldPassword: oldPassword,
        //         newPassword: newPassword
        //     }
        // };

        // return this.post(req)
        // .then(res => {
        //     return Immutable.fromJS(res.body);
        // });
    },

    changePreferences: function(user) {

        // TODO: Remove faked implementation
        return new Promise(function(resolve, reject) {
            setTimeout(() => {

                if(user.get('email') === 'dupe@example.org') {
                    reject({
                        status: 409,
                        body: {}
                    });
                } else {
                    resolve(user.delete('roles'));
                }

            }, 1000);
        });


        // var req = {
        //     url: '/api/user',
        //     body: user.toJS()
        // };

        // return this.post(req)
        // .then(res => {
        //     return Immutable.fromJS(res.body);
        // });
    }

});

module.exports = UserAPI;