"use strict";

var React = require('react'); // jshint unused:false
var Router = require('react-router');

var { Route, DefaultRoute, NotFoundRoute } = Router;

var routes = [
    <Route name="login" path="/login" handler={require('./components/user/login')} />,
    <Route name="home"  path="/"      handler={require('./components/app')}>

        <NotFoundRoute                           handler={require('./components/error/notFound')} />
        <Route        name="notFound" path="404" handler={require('./components/error/notFound')} />
        <Route        name="error"    path="500" handler={require('./components/error/error')} />

        <DefaultRoute name="frontPage"                                handler={require('./components/frontPage')} />

        <Route        name="userDetails"  path="user-details"         handler={require('./components/user/userDetails')} />
        <Route        name="userPassword" path="change-password"      handler={require('./components/user/userChangePassword')} />

        <Route        name="newInstance"  path="new-instance"         handler={require('./components/instance/instanceNew')} />
        <Route        name="instance"    path="instances/:instanceId" handler={require('./components/instance/instanceContainer')}>

            <DefaultRoute name="viewInstance"                             handler={require('./components/instance/instanceView')} />
            <Route        name="editInstance" path="edit"                 handler={require('./components/instance/instanceEdit')} />

            <Route        name="newAnalysis" path="new-analysis"         handler={require('./components/analysis/analysisNew')} />
            <Route        name="analysis"    path="analysis/:analysisId" handler={require('./components/analysis/analysisContainer')}>

                <DefaultRoute name="viewAnalysis"             handler={require('./components/analysis/analysisView')} />
                <Route        name="editAnalysis" path="edit" handler={require('./components/analysis/analysisEdit')} />

            </Route>

        </Route>

    </Route>
];

module.exports = Router.create({
  routes: routes,
  // location: Router.HistoryLocation
});