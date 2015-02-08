/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

// TODO: NotFoundRoute(s)
// TODO: Log in
// TODO: Preferences
// TODO: Edit instance
// TODO: Create analysis
// TODO: Edit analysis

// TODO: Mixin for ensuring routes are authenticated, instance/analysis exists,
// and forms are saved using willTransitionTo()/willTransitionFrom()
// see https://github.com/rackt/react-router/blob/master/docs/api/components/RouteHandler.md

var routes = [
    <Route name="login" path="/login" handler={require('./components/user/login')} />,
    <Route name="home" path="/" handler={require('./components/app')}>

        <DefaultRoute name="noInstance"                               handler={require('./components/instance/instanceNoneSelected')} />
        <Route        name="newInstance" path="new-instance"          handler={require('./components/instance/instanceNew')} />
        <Route        name="instance"    path="instances/:instanceId" handler={require('./components/instance/instanceView')}>

            <DefaultRoute name="noAnalysis"                             handler={require('./components/analysis/analysisNoneSelected')} />
            <Route        name="analysis"   path="analysis/:analysisId" handler={require('./components/analysis/analysisView')} />

        </Route>

    </Route>
];

module.exports = Router.create({
  routes: routes,
  // location: Router.HistoryLocation
});