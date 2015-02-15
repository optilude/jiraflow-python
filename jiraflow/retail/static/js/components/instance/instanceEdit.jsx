/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react/addons');
var Marty = require('marty');
var Router = require('react-router');
var ReactForms = require('react-forms');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var ConfirmModal = require('../utilities/confirm');
var InstanceActionCreators = require('../../instance/instanceActionCreators');
var InstanceStore = require('../../instance/instanceStore');
var NavigationActionCreators = require('../../navigation/navigationActionCreators');
var schema = require('./instanceSchema');

var { Grid, Row, Col, Button, ButtonToolbar, Alert, Nav, NavItem, ModalTrigger } = BS;
var { Link } = Router;
var { Form } = ReactForms;
var { NavItemLink } = RBS;

var InstanceState = Marty.createStateMixin({
    listenTo: [InstanceStore],
    getState: function() {
        return {
            selectedInstance: InstanceStore.getSelectedInstance(),
        };
    }
});

var DUMMY_PASSWORD = "*****";

var InstanceEdit = React.createClass({
    mixins: [InstanceState],

    getInitialState: function() {
        return {
            invalid: false,
            error: false
        };
    },

    render: function() {

        var instance = this.state.selectedInstance.delete('id').merge({
            password: DUMMY_PASSWORD
        });

        // XXX: Can happen during "delete" or "navigate away"
        if(!instance) {
            return <span></span>;
        }

        var instanceId = this.state.selectedInstance.get('id');

        var deleteConfirmModal = (
            <ConfirmModal
                title="Delete instance"
                text="Are you sure you want to delete this instance? This action cannot be undone."
                onRequestHide={this.cancelDelete}
                onYes={this.confirmDelete}
                onNo={this.cancelDelete}
                dangerous={true}
                />
        );

        return (
            <div>
                <Nav bsStyle="tabs">
                    <li><Link to="instance" params={{instanceId: instanceId}}>View</Link></li>
                    <li className="active"><Link to="editInstance" params={{instanceId: instanceId}}>Manage</Link></li>
                </Nav>
                <h1>Edit Instance: {instance.get('title')}</h1>
                <p className="help-block">
                    Edit the name and connection details for a remote JIRA instance.
                </p>
                <form onSubmit={this.onSubmit}>
                    <Form defaultValue={instance} ref="form" schema={schema} component="div" />

                    <ButtonToolbar>
                        <Button type="submit" bsStyle="primary">Save</Button>

                        <ModalTrigger ref="deleteConfirmModalTrigger" modal={deleteConfirmModal}>
                            <Button bsStyle="danger">Delete...</Button>
                        </ModalTrigger>

                    </ButtonToolbar>
                </form>
            </div>
        );

    },

    onSubmit: function(e) {
        e.preventDefault();

        var form = this.refs.form;
        if(!form.isValid()) {
            this.setState({invalid: true, error: false});
            return;
        } else {
            this.setState({invalid: false, error: false});
        }

        var value = this.refs.form.getValue();

        if(value.get('password') === DUMMY_PASSWORD) {
            value = value.delete('password');
        }

        InstanceActionCreators.updateInstance(this.state.selectedInstance.get('id'), value)
        .then(instance => {
            NavigationActionCreators.navigateToInstance(instance.get('id'));
        })
        .catch(error => {
            console.error(error);
            this.setState({invalid: false, error: true});
        });
    },

    cancelDelete: function(event) {
        event.preventDefault();
        this.refs.deleteConfirmModalTrigger.hide();
    },

    confirmDelete: function(event) {
        event.preventDefault();
        this.refs.deleteConfirmModalTrigger.hide();

        InstanceActionCreators.deleteInstance(this.state.selectedInstance.get('id'))
        .then(id => {
           NavigationActionCreators.navigateHome();
        })
        .catch(error => {
           console.error(error);
           alert("An unexpected error occurred deleting an instance.");
        });
    },

});

module.exports = InstanceEdit;