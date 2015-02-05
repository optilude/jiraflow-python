/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var Immutable = require('immutable');
var Marty = require('marty');

/**
 * HTTP API for instance operations.
 */
var InstanceAPI = Marty.createStateSource({
    type: 'http',

    // TODO: Implement correct API

    fetchAll: function() {
        return this.get('/api/instances').then(function(res) {
            return Immutable.fromJS(res.body);
        });
    },

    create: function(instance) {
        var req = {
            url: '/api/instances',
            body: instance.toJS()
        };

        return this.post(req).then(function(res) {
            return Immutable.fromJS(res.body);
        });
    },

    update: function(id, instance) {
        var req = {
            url: '/api/instances/' + id,
            body: instance.toJS()
        };

        return this.put(req).then(function(res) {
            return Immutable.fromJS(res.body);
        });
    },

    delete: function(id) {
        return this.delete('/api/instances/' + id);
    }

});

module.exports = InstanceAPI;