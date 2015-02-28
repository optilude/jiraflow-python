"use strict";

var Immutable = require('immutable');
var React = require('react/addons');
var ReactForms = require('react-forms');
var BS = require('react-bootstrap');

var Exception = require('../../exception');
var ConfirmModal = require('../utilities/confirm');
var InstanceActionCreators = require('../../instance/instanceActionCreators');
var NavigationActionCreators = require('../../navigation/navigationActionCreators');

var schema = require('./instanceSchema');
var InstanceToolbar = require('./instanceToolbar');

var { Button, ButtonToolbar, ModalTrigger, Alert } = BS;
var { Form } = ReactForms;

var DUMMY_PASSWORD = "*****";

var InstanceEdit = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        instance: React.PropTypes.instanceOf(Immutable.Map)
    },

    getInitialState: function() {
        return {
            invalid: false,
            exists: false,
            error: false
        };
    },

    render: function() {

        var instance = this.props.instance.delete('id').merge({
            password: DUMMY_PASSWORD
        });

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
                {this.state.invalid? <Alert bsStyle="danger">Please fill in all required fields</Alert> : ""}
                {this.state.exists? <Alert bsStyle="danger">You have already configured an instance with this URL.</Alert> : ""}
                {this.state.error? <Alert bsStyle="danger">An unexpected error occurred saving the instance. Please try again later.</Alert> : ""}

                <InstanceToolbar instance={this.props.instance} />
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
            this.setState({invalid: true, exists: false, error: false});
            return;
        } else {
            this.setState({invalid: false, exists: false, error: false});
        }

        var value = this.refs.form.getValue();

        if(value.get('password') === DUMMY_PASSWORD) {
            value = value.delete('password');
        }

        InstanceActionCreators.updateInstance(this.props.instance.get('id'), value)
        .then(instance => {
            NavigationActionCreators.navigateToInstance(instance.get('id'));
        })
        .catch(error => {
            if(error.status === 409) {
                this.setState({invalid: false, exists: true, error: false});
            } else {
                console.error(error);
                this.setState({invalid: false, exists: false, error: true});
            }
        });
    },

    cancelDelete: function(event) {
        event.preventDefault();
        this.refs.deleteConfirmModalTrigger.hide();
    },

    confirmDelete: function(event) {
        event.preventDefault();
        this.refs.deleteConfirmModalTrigger.hide();

        InstanceActionCreators.deleteInstance(this.props.instance.get('id'))
        .then(id => {
           NavigationActionCreators.navigateHome();
        })
        .catch(error => {
           throw new Exception(500, "Unable to delete instance", error);
        });
    },

});

module.exports = InstanceEdit;