/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react');
var BS = require('react-bootstrap');

var { Modal, Button } = BS;

var ConfirmModal = React.createClass({

    propTypes: {
        title: React.PropTypes.node.isRequired,
        text: React.PropTypes.node.isRequired,
        onRequestHide: React.PropTypes.func.isRequired,
        onYes: React.PropTypes.func.isRequired,
        onNo: React.PropTypes.func.isRequired
    },

    render: function() {
        return (
            <Modal title={this.props.title} onRequestHide={this.props.onRequestHide}>
                <div className="modal-body">
                    {this.props.text}
                </div>
                <div className="modal-footer">
                    <Button bsStyle="primary" onClick={this.props.onYes}>Yes</Button>
                    <Button bsStyle="default" onClick={this.props.onNo}>No</Button>
                </div>
            </Modal>
        );
    }

});

module.exports = ConfirmModal;