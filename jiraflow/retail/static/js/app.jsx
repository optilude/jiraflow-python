/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document, window */
"use strict";

var React = require('react'),
    Cortex = require('cortexjs'),

    TopNav = require('./navigation').TopNav,
    AnalysisPane = require('./analysis').AnalysisPane;

var App = React.createClass({

    render: function() {

        // TODO: Handle case where there is no instance selected
        var selectedInstance = this.props.data.jiraInstances.find(i => i.selected.val());

        return (
            <div className="main">
                <TopNav jiraInstances={this.props.data.jiraInstances} user={this.props.data.user} />
                <AnalysisPane jiraInstance={selectedInstance} analysis={this.props.data.analysis} />
            </div>
        );

    }
});

// Get the initial state from the server (pre-rendered into the template)
// and then set up a Cortex object to track it, re-rendering the app when
// state changes.

var initialState = window.initialState,
    cortex = new Cortex(initialState);

var appComponent = React.render(
  <App data={cortex} />,
  document.body
);

cortex.on("update", function(updatedDate) {
  appComponent.setProps({data: updatedDate});
});
