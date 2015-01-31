/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react');
var Router = require('react-router');
var BS = require('react-bootstrap');

var Link = Router.Link;

var Navbar = BS.Navbar;
var Nav = BS.Nav;
var NavItem = BS.NavItem;
var DropdownButton = BS.DropdownButton;
var MenuItem = BS.MenuItem;

var TopNav = React.createClass({
    mixins: [Router.State],

    propTypes: {
        jiraInstances: React.PropTypes.instanceOf(Cursor).isRequired,
        user: React.PropTypes.instanceOf(Cursor).isRequired
    },

    // TODO: Handle new, edit, delete, prefs, logout

    linkClick: function(event) {
        // This is something of a hack. For an explanation, see
        // https://github.com/react-bootstrap/react-bootstrap/issues/202
        this.refs.navbar.refs.mainNav.refs.instanceMenu.setDropdownState(false);
    },

    render: function() {

        var activeInstanceId = this.getParams().instanceId;

        return (
            <Navbar inverse={true} fixedTop={true} fluid={true} brand="JIRA Flow" ref="navbar">
                <Nav ref="mainNav">
                    <DropdownButton title="JIRA Instance" ref="instanceMenu">
                        <MenuItem>New</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem divider />
                        {this.props.jiraInstances.value.map((i, idx) => <li key={idx}><Link onClick={this.linkClick} to="instance" params={{instanceId: i.id}}>{i.title}</Link></li>)}
                    </DropdownButton>
                </Nav>
                <Nav right={true}>
                    <DropdownButton eventKey={1} title={this.props.user.refine('name').value}>
                        <MenuItem>Preferences</MenuItem>
                        <MenuItem>Log out</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    }
});

module.exports = TopNav;
