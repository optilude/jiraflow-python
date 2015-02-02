/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var Immutable = require('immutable');
var React = require('react/addons');
var Router = require('react-router');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var Link = Router.Link;

var Button = BS.Button;
var Nav = BS.Nav;
var NavItem = BS.NavItem;
var NavItemLink = RBS.NavItemLink;

/**
 * Sidebar listing the analyses under an instance.
 */
var InstanceSidebar = React.createClass({
    mixins: [Router.State, React.addons.PureRenderMixin],

    propTypes: {
        instance: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        analyses: React.PropTypes.instanceOf(Immutable.Iterable).isRequired
    },

    render: function () {

        var instanceId = this.props.instance.get('id');

        return (
            <div className="sidebar">
                <h4>{this.props.instance.get('title').value}</h4>
                <Nav bsStyle="pills" stacked={true}>
                    {this.props.analyses.map((a, idx) => <NavItemLink key={idx} to="analysis" params={{instanceId: instanceId, analysisId: a.get('id')}}>{a.get('title')}</NavItemLink>).toArray()}
                </Nav>
                <Button className="new-analysis-button" bsStyle="success">New analysis</Button>
            </div>
        );
    }
});

module.exports = InstanceSidebar;