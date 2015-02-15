"use strict";

var Immutable = require('immutable');
var React = require('react/addons');
var Router = require('react-router');
var BS = require('react-bootstrap');

var { Nav } = BS;
var { Link } = Router;

var InstanceView = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        instance: React.PropTypes.instanceOf(Immutable.Map)
    },

    render: function() {

        var instance = this.props.instance;
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

module.exports = InstanceView;