/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react/addons');
var Marty = require('marty');
var ReactForms = require('react-forms');
var BS = require('react-bootstrap');

var InstanceActionCreators = require('../../instance/instanceActionCreators');
var InstanceStore = require('../../instance/instanceStore');
var NavigationActionCreators = require('../../navigation/navigationActionCreators');
var schema = require('./instanceSchema');

var { Grid, Row, Col, Button, Alert } = BS;
var { Form } = ReactForms;

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

        return (
            <Col sm={10} md={8}>
                {this.state.invalid? <Alert bsStyle="danger">Please fill in all required fields</Alert> : ""}
                {this.state.error? <Alert bsStyle="danger">An unexpected error occurred saving the instance. Please try again later.</Alert> : ""}

                <h1>Edit instance</h1>
                <p className="help-block">
                    Edit the name and connection details for a remote JIRA instance.
                </p>
                <form onSubmit={this.onSubmit}>
                    <Form defaultValue={instance} ref="form" schema={schema} component="div" />
                    <Button type="submit" bsStyle="primary">Save</Button>
                </form>
            </Col>
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
    }

});

module.exports = InstanceEdit;