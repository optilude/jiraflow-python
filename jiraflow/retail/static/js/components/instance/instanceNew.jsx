/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react/addons');
var ReactForms = require('react-forms');
var BS = require('react-bootstrap');

var InstanceActionCreators = require('../../instance/instanceActionCreators');
var NavigationActionCreators = require('../../navigation/navigationActionCreators');
var schema = require('./instanceSchema');

var Grid = BS.Grid;
var Row = BS.Row;
var Col = BS.Col;
var Button = BS.Button;
var Alert = BS.Alert;

var Form = ReactForms.Form;

var InstanceNew = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    getInitialState: function() {
        return {
            invalid: false,
            error: false
        };
    },

    render: function() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={3} md={2}>
                    </Col>
                    <Col sm={9} md={6}>
                        {this.state.invalid? <Alert bsStyle="danger">Please fill in all required fields</Alert> : ""}
                        {this.state.error? <Alert bsStyle="danger">An unexpected error occurred saving the new instance. Please try again later.</Alert> : ""}

                        <h1>Create new instance</h1>
                        <p className="help-block">
                            Enter a name and the connection details for a
                            remote JIRA instance.
                        </p>
                        <form onSubmit={this.onSubmit}>
                            <Form ref="form" schema={schema} component="div" />
                            <Button type="submit" bsStyle="primary">Submit</Button>
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
            this.setState({invalid: true, error: false});
            return;
        } else {
            this.setState({invalid: false, error: false});
        }

        var value = this.refs.form.getValue();

        InstanceActionCreators.createInstance(value)
        .then(instance => {
            NavigationActionCreators.navigateToInstance(instance.get('id'));
        })
        .catch(error => {
            console.error(error);
            this.setState({invalid: false, error: true});
        });
    }

});

module.exports = InstanceNew;