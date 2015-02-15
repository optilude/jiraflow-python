"use strict";

var Immutable = require('immutable');
var Marty = require('marty');

/**
 * HTTP API for instance operations.
 */
var InstanceAPI = Marty.createStateSource({
    type: 'http',

    fetchAll: function() {
        // TODO: Remove faked implementation
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(Immutable.fromJS([
                    {
                        id: "project-snowflake",
                        title: "Project Snowflake",
                        url: "https://snowflake.atlassian.net",
                        userName: "admin"
                    }, {
                        id: "acme-corp",
                        title: "Acme Corp",
                        url: "https://acme.atlassian.net",
                        userName: "admin"
                    }, {
                        id: "internal-projects",
                        title: "Internal projects",
                        url: "https://jira.acmecorp.com",
                        userName: "admin"
                    },
                ]));
            }, 1000);
        });

        // return this.get('/api/instances')
        // .then(res => {
        //     return Immutable.fromJS(res.body);
        // });
    },

    create: function(instance) {

        // TODO: Remove faked implementation
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(instance.set('id', 'new-cool-instance'));
            }, 1000);
        });

        // var req = {
        //     url: '/api/instances',
        //     body: instance.toJS()
        // };

        // return this.post(req)
        // .then(res => {
        //     return Immutable.fromJS(res.body);
        // });
    },

    update: function(id, instance) {
        // TODO: Remove faked implementation
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(instance.set('id', id));
            }, 1000);
        });

        // var req = {
        //     url: '/api/instances/' + id,
        //     body: instance.toJS()
        // };

        // return this.put(req)
        // .then(res => {
        //     return Immutable.fromJS(res.body);
        // });
    },

    deleteInstance: function(id) {

        // TODO: Remove faked implementation
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(id);
            }, 1000);
        });

        // return this.delete('/api/instances/' + id);
    }

});

module.exports = InstanceAPI;