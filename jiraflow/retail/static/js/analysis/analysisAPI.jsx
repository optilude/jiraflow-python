"use strict";

var Immutable = require('immutable');
var Marty = require('marty');

/**
 * HTTP API for instance operations.
 */
var AnalysisAPI = Marty.createStateSource({
    type: 'http',

    fetchAll: function(instanceId) {
        // TODO: Remove faked implementation
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(Immutable.fromJS([
                    {
                        id: "cfd",
                        title: "Cumulative flow",
                        type: "cfd",
                    }, {
                        id: "control-chart",
                        title: "Control chart",
                        type: "control_chart",
                    }, {
                        id: "delivery-forecast",
                        title: "Delivery forecast",
                        type: "delivery_forecast",
                    },
                ]));
            }, 1000);
        });

        // return this.get('/api/instances/' + instanceId + '/analyses')
        // .then(res => {
        //     return Immutable.fromJS(res.body);
        // });
    },

    create: function(instanceId, analysis) {
        var req = {
            url: '/api/instances/' + instanceId + '/analyses',
            body: analysis.toJS()
        };

        return this.post(req)
        .then(res => {
            return Immutable.fromJS(res.body);
        });
    },

    update: function(instanceId, id, analysis) {
        var req = {
            url: '/api/instances/' + instanceId + '/analyses/' + id,
            body: analysis.toJS()
        };

        return this.put(req)
        .then(res => {
            return Immutable.fromJS(res.body);
        });
    },

    deleteAnalysis: function(instanceId, id) {
        return this.delete('/api/instances/' + instanceId + '/analyses/' + id);
    }

});

module.exports = AnalysisAPI;