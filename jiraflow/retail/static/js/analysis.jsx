/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),
    Cursor = require('react-cursor').Cursor,
    ImmutableOptimizations = require('react-cursor').ImmutableOptimizations,

    Router = require('react-router'),

    u = require('./utils'),

    BS              = require('react-bootstrap'),
    Nav             = BS.Nav,
    NavItem         = BS.NavItem;

var Analysis = React.createClass({
    mixins: [
        Router.State,
        // ImmutableOptimizations(['jiraInstance', 'analysis'])
    ],

    propTypes: {
        jiraInstance: React.PropTypes.instanceOf(Cursor).isRequired,
        analysis: React.PropTypes.instanceOf(Cursor).isRequired
    },

    getInitialState: function() {
        return {
            selectedAnalysis: u.find(this.props.analysis, i => i.refine('id').value === this.getParams().analysisId)
        };
    },

    componentWillReceiveProps: function() {
        this.setState({
            selectedAnalysis: u.find(this.props.analysis, i => i.refine('id').value === this.getParams().analysisId)
        });
    },

    shouldComponentUpdate: function (nextProps) {
        if(this.props.jiraInstance !== nextProps.jiraInstance) return true;
        if(this.props.analysis !== nextProps.analysis) return true;
        if(this.selectedAnalysis && this.selectedAnalysis.refine('id') !== this.getParams().analysisId) return true;
        if(!this.selectedAnalysis && this.getParams().analysisId) return true;
        return false;
    },

    render: function () {

        if(!this.state.selectedAnalysis) {
            return (<h1>Analysis not found</h1>);
        }

        return (
            <div>
                <Nav bsStyle="tabs">
                    <NavItem active={true} eventKey="view">View</NavItem>
                    <NavItem eventKey="manage">Manage</NavItem>
                </Nav>
                <h1>Analysis &mdash; {this.state.selectedAnalysis.refine('title').value}</h1>
                <p>Lorem ipsum</p>
            </div>
        );
    }
});

module.exports = Analysis;