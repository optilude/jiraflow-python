/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React        = require('react'),
    Router       = require('react-router'),
    Route        = Router.Route,
    DefaultRoute = Router.DefaultRoute;

var routes = [
    <Route name="home" path="/" handler={require('./app')}>
        <DefaultRoute handler={require('./instance-none-selected')} />
        <Route name="instance" path="instances/:instanceId" handler={require('./instance')}>
            <DefaultRoute handler={require('./analysis-none-selected')} />
            <Route name="analysis" path="analysis/:analysisId" handler={require('./analysis')} />
        </Route>
    </Route>
];

module.exports = Router.create({
  routes: routes,
  // location: Router.HistoryLocation
});
