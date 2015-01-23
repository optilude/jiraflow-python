/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react'),
    Cursor = require('react-cursor').Cursor,
    ImmutableOptimizations = require('react-cursor').ImmutableOptimizations,

    u = require('./utils'),

    TopNav = require('./navigation').TopNav,
    AnalysisPane = require('./analysis').AnalysisPane;

var App = React.createClass({

    getInitialState: function () {
        return window.initialState;
    },

    render: function() {
        var cursor = Cursor.build(this);

        // TODO: Handle case where there is no instance selected
        var selectedInstance = u.find(cursor.refine('jiraInstances'), i => i.refine('selected').value);

        return (
            <div className="main">
                <TopNav jiraInstances={cursor.refine('jiraInstances')} user={cursor.refine('user')} />
                <AnalysisPane jiraInstance={selectedInstance} analysis={cursor.refine('analysis')} />
            </div>
        );

    }
});

React.render(<App />, document.body);