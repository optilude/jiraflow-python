/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react');
var Router = require('react-router');

var { Route, DefaultRoute, NotFoundRoute } = Router;

// TODO: Preferences
// TODO: Edit instance
// TODO: Create analysis
// TODO: Edit analysis

var routes = [
    <Route name="login" path="/login" handler={require('./components/user/login')} />,
    <Route name="home"  path="/"      handler={require('./components/app')}>

        <NotFoundRoute                           handler={require('./components/error/notFound')} />
        <Route        name="notFound" path="404" handler={require('./components/error/notFound')} />
        <Route        name="error"    path="500" handler={require('./components/error/error')} />

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