"use strict";

var React = require('react/addons');
var BS = require('react-bootstrap');

var UserActionCreators = require('../../user/userActionCreators');
var NavigationActionCreators = require('../../navigation/navigationActionCreators');

var { Input, Button, Alert } = BS;

/**
 * Document body handler, rendering nav and main body area
 */
var Login = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
        return {
            username: "",
            password: "",
            invalid: false,
            error: false
        };
    },

    render: function() {
        return (
            <div className="container">

                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h2 className="form-signin-heading">Please sign in</h2>

                    {this.state.invalid? <Alert bsStyle="danger">Please enter both email and password</Alert> : ""}
                    {this.state.error? <Alert bsStyle="danger">Login unsuccessful. Please try again.</Alert> : ""}

                    <Input type="email" labelClassName="sr-only" label="Email address" required autofocus placeholder="Email address" valueLink={this.linkState('email')} />
                    <Input type="password" labelClassName="sr-only" label="Email address" required placeholder="Password" valueLink={this.linkState('password')} />

                    <Button bsStyle="primary" block type="submit">Sign in</Button>
                </form>
            </div>
        );
    },

    onSubmit: function(e) {
        e.preventDefault();

        if(!this.state.email || !this.state.password) {
            this.setState({invalid: true, error: false});
            return;
        } else {
            this.setState({invalid: false, error: false});
        }

        UserActionCreators.login(this.state.email, this.state.password)
        .then(username => {
            NavigationActionCreators.navigateHome();
        })
        .catch(error => {
            console.error(error);
            this.setState({invalid: false, error: true});
        });
    }

});

module.exports = Login;