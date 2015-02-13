/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react/addons');
var BS = require('react-bootstrap');

var { Grid, Row, Col } = BS;

var InstanceNoneSelected = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render: function() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={9} smOffset={3} md={10} mdOffset={2}>
                        <h1>No instance selected</h1>
                    </Col>
                </Row>
          </Grid>
        );

    }
});

module.exports = InstanceNoneSelected;