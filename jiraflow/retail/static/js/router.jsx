"use strict";

var React = require('react'); // must be in scope to allow the use of JSX!
var Router = require('react-router');

var { Route, DefaultRoute, NotFoundRoute } = Router;

// TODO: Create analysis
// TODO: Edit analysis

var routes = [
    <Route name="login" path="/login" handler={require('./components/user/login')} />,
    <Route name="home"  path="/"      handler={require('./components/app')}>

        <NotFoundRoute                           handler={require('./components/error/notFound')} />
        <Route        name="notFound" path="404" handler={require('./components/error/notFound')} />
        <Route        name="error"    path="500" handler={require('./components/error/error')} />

        <DefaultRoute name="frontPage"                                handler={require('./components/frontPage')} />
        <Route        name="newInstance"  path="new-instance"         handler={require('./components/instance/instanceNew')} />
        <Route        name="userDetails"  path="user-details"         handler={require('./components/user/userDetails')} />
        <Route        name="userPassword" path="change-password"      handler={require('./components/user/userChangePassword')} />

        <Route        name="instance"    path="instances/:instanceId" handler={require('./components/instance/instanceView')}>

            <DefaultRoute name="viewInstance"                             handler={require('./components/instance/instanceOverview')} />
            <Route        name="editInstance" path="edit"                 handler={require('./components/instance/instanceEdit')} />
            <Route        name="analysis"     path="analysis/:analysisId" handler={require('./components/analysis/analysisView')} />

        </Route>

    </Route>
];

module.exports = Router.create({
  routes: routes,
  // location: Router.HistoryLocation
});