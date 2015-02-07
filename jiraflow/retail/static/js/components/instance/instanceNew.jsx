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
            invalid: false
        };
    },

    render: function() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={3} md={2}>
                    </Col>
                    <Col sm={9} md={6}>
                        <h1>Create new instance</h1>
                        {this.state.invalid? <Alert bsStyle="danger">Please fill in all required fields</Alert> : ""}
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
            this.setState({invalid: true});
            return;
        } else {
            this.setState({invalid: false});
        }

        var value = this.refs.form.getValue();

        // TODO: Handle error scenario if create operation fails
        InstanceActionCreators.createInstance(value);
    }

});

module.exports = InstanceNew;