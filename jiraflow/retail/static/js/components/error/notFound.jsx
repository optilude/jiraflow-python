/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react/addons');
var BS = require('react-bootstrap');

var { Grid, Row, Col, Alert } = BS;

var NotFound = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render: function() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={6} smOffset={3} md={8} mdOffset={2}>
                        <h1>Not found</h1>
                        <Alert bsStyle="danger">The page you requested could not be found</Alert>
                    </Col>
                </Row>
          </Grid>
        );

    }
});

module.exports = NotFound;