/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react/addons');
var Marty = require('marty');
var Router = require('react-router');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var InstanceStore = require('../../instance/instanceStore');

var { Grid, Row, Col, Nav } = BS;
var { NavItemLink } = RBS;
var { Link } = Router;

var InstanceState = Marty.createStateMixin({
    listenTo: [InstanceStore],
    getState: function() {
        return {
            selectedInstance: InstanceStore.getSelectedInstance(),
        };
    }
});

var InstanceOverview = React.createClass({
    mixins: [InstanceState],

    render: function() {

        var instance = this.state.selectedInstance;

        // XXX: This is annoying. It is needed because for a brief moment
        // during navigation the view re-renders and we get errors if we assume
        // analysis is never null.
        if(!instance) {
            return (
                <div></div>
            );
        }

        var instanceId = instance.get('id');

        return (
            <div>
                <Nav bsStyle="tabs">
                    <li className="active"><Link to="instance" params={{instanceId: instanceId}}>View</Link></li>
                    <li><Link to="editInstance" params={{instanceId: instanceId}}>Manage</Link></li>
                </Nav>
                <h1>JIRA Instance: {instance.get('title')}</h1>
                <p>
                    <em><a href={instance.get('url')} target="_new">{instance.get('url')}</a></em>
                </p>
                <p>
                    Please choose an analysis from the list on the left, or
                    click <em>New analys</em> to configure a new one.
                </p>
            </div>
        );
    }

});

module.exports = InstanceOverview;