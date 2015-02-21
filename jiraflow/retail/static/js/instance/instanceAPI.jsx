"use strict";

var Immutable = require('immutable');
var Marty = require('marty');

/**
 * HTTP API for instance operations.
 */
var InstanceAPI = Marty.createStateSource({
    type: 'http',

    fetchAll: function() {
        return this.get('/api/instances')
        .then(res => {
            return Immutable.fromJS(res.body);
        });
    },

    create: function(instance) {
        var req = {
            url: '/api/instances',
            body: instance.toJS()
        };

        return this.post(req)
        .then(res => {
            return Immutable.fromJS(res.body);
        });
    },

    update: function(id, instance) {
        var req = {
            url: '/api/instances/' + id,
            body: instance.toJS()
        };

        return this.put(req)
        .then(res => {
            return Immutable.fromJS(res.body);
        });
    },

    deleteInstance: function(id) {
        return this.delete('/api/instances/' + id)
        .then(res => {
            return id;
        });
    }

});

module.exports = InstanceAPI;