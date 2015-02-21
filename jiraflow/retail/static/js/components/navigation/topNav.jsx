"use strict";

var React = require('react');
var Marty = require('marty');
var Router = require('react-router');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var Exception = require('../../exception');
var NavigationActionCreators = require('../../navigation/navigationActionCreators');
var UserStore = require('../../user/userStore');
var UserActionCreators = require('../../user/userActionCreators');
var InstanceStore = require('../../instance/instanceStore');

var { Link } = Router;

var { Navbar, Nav, DropdownButton, MenuItem } = BS;
var { MenuItemLink } = RBS;

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

    render: function() {

        return (
            <Navbar inverse={true} fixedTop={true} fluid={true} brand={<Link to="home">JIRA Flow</Link>} ref="navbar">
                <Nav ref="mainNav">
                    <DropdownButton title="Instance" ref="instanceMenu">
                        <MenuItemLink to="newInstance" onClick={this.linkClick}>New</MenuItemLink>
                        {this.state.instances.size > 0? <MenuItem divider /> : ""}
                        {this.state.instances.map((i, idx) => <MenuItemLink key={idx} to="instance" params={{instanceId: i.get('id')}} onClick={this.linkClick}>{i.get('title')}</MenuItemLink>).toArray()}
                    </DropdownButton>
                </Nav>
                <Nav right={true} ref="rightNav">
                    <DropdownButton ref="userMenu" eventKey={1} title={this.state.user? this.state.user.get('name') : "Unknown user"}>
                        <MenuItemLink to="userDetails" onClick={this.linkClick}>Edit details</MenuItemLink>
                        <MenuItemLink to="userPassword" onClick={this.linkClick}>Change password</MenuItemLink>
                        <MenuItem onSelect={this.logout}>Log out</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    },

    logout: function() {
        UserActionCreators.logout()
        .then(() => {
            NavigationActionCreators.navigateToLogin();
        })
        .catch(error => {
            throw new Exception(500, "Unable to delete instance", error);
        });
    },

    linkClick: function(event) {
        // This is something of a hack. For an explanation, see
        // https://github.com/react-bootstrap/react-bootstrap/issues/202
        this.refs.navbar.refs.mainNav.refs.instanceMenu.setDropdownState(false);
        this.refs.navbar.refs.rightNav.refs.userMenu.setDropdownState(false);
    }

});

module.exports = TopNav;
