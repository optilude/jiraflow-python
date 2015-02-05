/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = [
    <Route name="home" path="/" handler={require('components/app')}>
        <DefaultRoute name="noInstance" handler={require('components/instance/instanceNoneSelected')} />
        <Route name="instance" path="instances/:instanceId" handler={require('components/instance/instanceView')}>
            <DefaultRoute name="noAnalysis" handler={require('components/analysis/analysisNoneSelected')} />
            <Route name="analysis" path="analysis/:analysisId" handler={require('components/analysis/analysisView')} />
        </Route>

    </Route>
];

module.exports = Router.create({
  routes: routes,
  // location: Router.HistoryLocation
});
