/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react');
var Marty = require('marty');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var UserStore = require('user/userStore');
var InstanceStore = require('instance/instanceStore');

var Navbar = BS.Navbar;
var Nav = BS.Nav;
var NavItem = BS.NavItem;
var DropdownButton = BS.DropdownButton;
var MenuItem = BS.MenuItem;
var MenuItemLink = RBS.MenuItemLink;

var NavigationState = Marty.createStateMixin({
    listenTo: [UserStore, InstanceStore],
    getState: function() {
        return {
            user: UserStore.getUser(),
            instances: InstanceStore.getInstances(),
            selectedInstance: InstanceStore.getSelectedInstance()
        };
    }
});

/**
 * Top navigation, rendering user menu and instance list.
 *
 * Controller-view depending on the InstanceStore and the UserStore.
 */
var TopNav = React.createClass({
    mixins: [NavigationState],

    // TODO: Handle new, edit, delete, prefs, logout

    linkClick: function(event) {
        // This is something of a hack. For an explanation, see
        // https://github.com/react-bootstrap/react-bootstrap/issues/202
        this.refs.navbar.refs.mainNav.refs.instanceMenu.setDropdownState(false);
    },

    render: function() {
        return (
            <Navbar inverse={true} fixedTop={true} fluid={true} brand="JIRA Flow" ref="navbar">
                <Nav ref="mainNav">
                    <DropdownButton title="JIRA Instance" ref="instanceMenu">
                        <MenuItemLink to="newInstance" onClick={this.linkClick}>New</MenuItemLink>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem divider />
                        {this.state.instances.map((i, idx) => <MenuItemLink key={idx} to="instance" params={{instanceId: i.get('id')}} onClick={this.linkClick}>{i.get('title')}</MenuItemLink>).toArray()}
                    </DropdownButton>
                </Nav>
                <Nav right={true}>
                    <DropdownButton eventKey={1} title={this.state.user.get('name')}>
                        <MenuItem>Preferences</MenuItem>
                        <MenuItem>Log out</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    }
});

module.exports = TopNav;
