/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react/addons');
var Marty = require('marty');
var ReactForms = require('react-forms');
var BS = require('react-bootstrap');

var UserActionCreators = require('../../user/userActionCreators');
var UserStore = require('../../user/userStore');
var NavigationActionCreators = require('../../navigation/navigationActionCreators');
var schema = require('./userSchema');

var { Grid, Row, Col, Button, Alert } = BS;
var { Form } = ReactForms;

var UserState = Marty.createStateMixin({
    listenTo: [UserStore],
    getState: function() {
        return {
            user: UserStore.getUser()
        };
    }
});

var DUMMY_PASSWORD = "*****";

var UserDetails = React.createClass({
    mixins: [UserState],

    getInitialState: function() {
        return {
            saved: false,
            invalid: false,
            notUnique: false,
            error: false
        };
    },

    render: function() {

        var user = this.state.user.delete('roles');

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={7} smOffset={3} md={6} mdOffset={2}>
                        {this.state.saved? <Alert bsStyle="success">Changes saved</Alert> : ""}
                        {this.state.invalid? <Alert bsStyle="danger">Please fill in all required fields</Alert> : ""}
                        {this.state.notUnique? <Alert bsStyle="danger">The email address you entered is already in use. Please use a different one.</Alert> : ""}
                        {this.state.error? <Alert bsStyle="danger">An unexpected error occurred saving your details. Please try again later.</Alert> : ""}

                        <h1>Edit details</h1>
                        <p className="help-block">
                            Edit your user details.
                        </p>
                        <form onSubmit={this.onSubmit}>
                            <Form defaultValue={user} ref="form" schema={schema} component="div" />
                            <Button type="submit" bsStyle="primary">Save</Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );

    },

    onSubmit: function(e) {
        e.preventDefault();

        var form = this.refs.form;
        if(!form.isValid()) {
            this.setState({saved: false, invalid: true, notUnique: false, error: false});
            return;
        } else {
            this.setState({saved: false, invalid: false, notUnique: false, error: false});
        }

        var value = this.refs.form.getValue();

        UserActionCreators.changePreferences(value)
        .then(instance => {
            this.setState({saved: true, invalid: false, notUnique: false, error: false});
        })
        .catch(error => {
            if(error.status === 409) {
                this.setState({saved: false, invalid: false, notUnique: true, error: false});
            } else {
                console.error(error);
                this.setState({saved: false, invalid: false, notUnique: false, error: true});
            }
        });
    }

});

module.exports = UserDetails;