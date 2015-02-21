"use strict";

var React = require('react/addons');
var ReactForms = require('react-forms');
var BS = require('react-bootstrap');

var InstanceActionCreators = require('../../instance/instanceActionCreators');
var NavigationActionCreators = require('../../navigation/navigationActionCreators');
var schema = require('./instanceSchema');

var { Grid, Row, Col, Button, Alert } = BS;
var { Form } = ReactForms;

var InstanceNew = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState: function() {
        return {
            invalid: false,
            exists: false,
            error: false
        };
    },

    render: function() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={9} smOffset={3} md={10} mdOffset={2}>
                        {this.state.invalid? <Alert bsStyle="danger">Please fill in all required fields</Alert> : ""}
                        {this.state.exists? <Alert bsStyle="danger">You have already configured an instance with this short name (the first part of the URL).</Alert> : ""}
                        {this.state.error? <Alert bsStyle="danger">An unexpected error occurred saving the new instance. Please try again later.</Alert> : ""}

                        <h1>Create new instance</h1>
                        <p className="help-block">
                            Enter a name and the connection details for a
                            remote JIRA instance.
                        </p>
                        <form onSubmit={this.onSubmit}>
                            <Form ref="form" schema={schema} component="div" />
                            <Button type="submit" bsStyle="primary">Create</Button>
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
            this.setState({invalid: true, exists: false, error: false});
            return;
        } else {
            this.setState({invalid: false, exists: false, error: false});
        }

        var value = this.refs.form.getValue();

        InstanceActionCreators.createInstance(value)
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
    }

});

module.exports = InstanceNew;