/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = [
    <Route name="home" path="/" handler={require('components/app')}>
        <DefaultRoute handler={require('components/instanceNoneSelected')} />
        <Route name="instance" path="instances/:instanceId" handler={require('components/instance')}>
            <DefaultRoute handler={require('components/analysisNoneSelected')} />
            <Route name="analysis" path="analysis/:analysisId" handler={require('components/analysis')} />
        </Route>
    </Route>
];

module.exports = Router.create({
  routes: routes,
  // location: Router.HistoryLocation
});
