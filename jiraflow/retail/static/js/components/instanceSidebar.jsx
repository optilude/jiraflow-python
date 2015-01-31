/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react');
var Router = require('react-router');
var BS = require('react-bootstrap');

var Link = Router.Link;

var Button = BS.Button;
var Nav = BS.Nav;
var NavItem = BS.NavItem;

var Sidebar = React.createClass({
    mixins: [Router.State],

    propTypes: {
        jiraInstance: React.PropTypes.instanceOf(Cursor).isRequired,
        analysis: React.PropTypes.instanceOf(Cursor).isRequired
    },

    render: function () {

        var instanceId = this.props.jiraInstance.refine('id').value,
            activeAnalysisId = this.getParams().analysisId;

        return (
            <div className="sidebar">
                <h4>{this.props.jiraInstance.refine('title').value}</h4>
                <Nav bsStyle="pills" stacked={true}>
                    {this.props.analysis.value.map((a, idx) => <li key={idx}><Link to="analysis" params={{instanceId: instanceId, analysisId: a.id}}>{a.title}</Link></li>)}
                </Nav>
                <Button className="new-analysis-button" bsStyle="success">New analysis</Button>
            </div>
        );
    }
});

module.exports = Sidebar;