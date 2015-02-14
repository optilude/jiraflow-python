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

var { Grid, Row, Col, Button, Alert } = BS;
var { Form } = ReactForms;
var { Mapping, Scalar } = ReactForms.schema;

var schema = Mapping({

    oldPassword: Scalar({
        label: "Current password",
        hint: "Enter your current password",
        required: true,
        input: <input type="password" />
    }),

    newPassword: Scalar({
        label: "New password",
        hint: "Enter the new password",
        required: true,
        input: <input type="password" />
    }),

    confirmPassword: Scalar({
        label: "Confirm password",
        hint: "Confirm the new password",
        required: true,
        input: <input type="password" />
    })

});

var UserDetails = React.createClass({
    mixins: [React.PureRenderMixin],

    getInitialState: function() {
        return {
            saved: false,
            invalid: false,
            unmatched: false,
            error: false
        };
    },

    render: function() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={7} smOffset={3} md={6} mdOffset={2}>
                        {this.state.saved? <Alert bsStyle="success">Changes saved</Alert> : ""}
                        {this.state.invalid? <Alert bsStyle="danger">Please fill in all required fields, including the correct current password.</Alert> : ""}
                        {this.state.unmatched? <Alert bsStyle="danger">New and confirm password do not match</Alert> : ""}
                        {this.state.error? <Alert bsStyle="danger">An unexpected error occurred changing your password. Please try again later.</Alert> : ""}

                        <h1>Change password</h1>
                        <p className="help-block">
                            Enter your old and new passwords to change your
                            password.
                        </p>
                        <form onSubmit={this.onSubmit}>
                            <Form ref="form" schema={schema} component="div" />
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
            this.setState({saved: false, invalid: true, unmatched: false, error: false});
            return;
        } else {
            this.setState({saved: false, invalid: false, unmatched: false, error: false});
        }

        var value = this.refs.form.getValue();

        if(value.get('newPassword') !== value.get('confirmPassword')) {
            this.setState({saved: false, invalid: false, unmatched: true, error: false});
            return;
        }

        UserActionCreators.changePassword(value.get('oldPassword'), value.get('newPassword'))
        .then(instance => {
            this.setState({saved: true, invalid: false, unmatched: false, error: false});
        })
        .catch(error => {
            if(error.status === 401) {
                this.setState({saved: false, invalid: true, unmatched: false, error: false});
            } else {
                console.error(error);
                this.setState({saved: false, invalid: false, unmatched: false, error: true});
            }
        });
    }

});

module.exports = UserDetails;