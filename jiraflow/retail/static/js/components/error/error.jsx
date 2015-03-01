"use strict";

var React = require('react/addons');
var BS = require('react-bootstrap');

var { Grid, Row, Col, Alert } = BS;

var ErrorView = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render: function() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={6} smOffset={3} md={8} mdOffset={2}>
                        <h1>Error</h1>
                        <Alert bsStyle="danger">An unexpected error occurred. Go back, reload the page and hope for the best.</Alert>
                    </Col>
                </Row>
          </Grid>
        );

    }
});

module.exports = ErrorView;