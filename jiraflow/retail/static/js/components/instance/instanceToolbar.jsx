"use strict";

var Immutable = require('immutable');
var React = require('react/addons');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var { Nav } = BS;
var { NavItemLink } = RBS;

var InstanceToolbar = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        instance: React.PropTypes.instanceOf(Immutable.Map)
    },

    render: function() {

        var instance = this.props.instance;
        var instanceId = instance.get('id');

        return (
            <Nav bsStyle="tabs">
                <NavItemLink to="viewInstance" params={{instanceId: instanceId}}>View</NavItemLink>
                <NavItemLink to="editInstance" params={{instanceId: instanceId}}>Manage</NavItemLink>
            </Nav>
        );
    }

});

module.exports = InstanceToolbar;