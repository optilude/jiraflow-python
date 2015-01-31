var Marty = require('marty');
var Router = require('../router');

function navigateTo(route, params) {
    Router.transitionTo(route, params || {});
}

var NavigationActionCreators = Marty.createActionCreators({

    navigateHome: function() {
        navigateTo('home');
    },

    navigateToInstance: function(id) {
        navigateTo('instance', {instanceId: id});
    },

    navigateToAnalysis: function(instanceId, id) {
        navigateTo('analysis', {instanceId: instanceId, analysisId: id});
    }

});



module.exports = NavigationActionCreators;