/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react/addons');
var BS = require('react-bootstrap');

var Grid = BS.Grid;
var Row = BS.Row;
var Col = BS.Col;

var InstanceNoneSelected = React.createClass({
    mixins: [React.addons.PureRenderMixin],

    render: function() {

        return (
            <Grid fluid={true}>
                <Row>
                    <Col sm={3} md={2}>
                    </Col>
                    <Col sm={9} md={10}>
                        <h1>No instance selected</h1>
                    </Col>
                </Row>
          </Grid>
        );

    }
});

module.exports = InstanceNoneSelected;