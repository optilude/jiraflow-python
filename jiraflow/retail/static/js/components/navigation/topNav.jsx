/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react');
var Marty = require('marty');
var Router = require('react-router');
var BS = require('react-bootstrap');
var RBS = require('react-router-bootstrap');

var NavigationActionCreators = require('../../navigation/navigationActionCreators');
var UserStore = require('../../user/userStore');
var UserActionCreators = require('../../user/userActionCreators');
var InstanceStore = require('../../instance/instanceStore');
var InstanceActionCreators = require('../../instance/instanceActionCreators');
var ConfirmModal = require('../utilities/confirm');

var Link = Router.Link;

var Navbar = BS.Navbar;
var Nav = BS.Nav;
var NavItem = BS.NavItem;
var DropdownButton = BS.DropdownButton;
var MenuItem = BS.MenuItem;
var ModalTrigger = BS.ModalTrigger;
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

    // TODO: Handle edit, prefs

    render: function() {

        var deleteConfirmModal = (
            <ConfirmModal
                title="Delete instance"
                text="Are you sure you want to delete this instance? This action cannot be undone."
                onRequestHide={this.cancelDelete}
                onYes={this.confirmDelete}
                onNo={this.cancelDelete}
                />
        );

        var haveInstance = this.state.selectedInstance !== null;

        return (
            <Navbar inverse={true} fixedTop={true} fluid={true} brand={<Link to="home">JIRA Flow</Link>} ref="navbar">
                <Nav ref="mainNav">
                    <DropdownButton title="JIRA Instance" ref="instanceMenu">
                        <MenuItemLink to="newInstance" onClick={this.linkClick}>New</MenuItemLink>
                        {haveInstance? <MenuItem>Edit</MenuItem> : ""}
                        {haveInstance? <MenuItem>
                            <ModalTrigger ref="deleteConfirmModalTrigger" modal={deleteConfirmModal}>
                                <div onClick={this.deleteLinkClick}>Delete</div>
                            </ModalTrigger>
                        </MenuItem> : ""}
                        <MenuItem divider />
                        {this.state.instances.map((i, idx) => <MenuItemLink key={idx} to="instance" params={{instanceId: i.get('id')}} onClick={this.linkClick}>{i.get('title')}</MenuItemLink>).toArray()}
                    </DropdownButton>
                </Nav>
                <Nav right={true}>
                    <DropdownButton eventKey={1} title={this.state.user? this.state.user.get('name') : "Unknown user"}>
                        <MenuItem>Preferences</MenuItem>
                        <MenuItem onSelect={this.logout}>Log out</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    },

    logout: function(event) {
        event.preventDefault();

        UserActionCreators.logout()
        .then(() => {
            NavigationActionCreators.navigateToLogin();
        })
        .catch(error => {
            console.error(error);
            alert("An unexpected error occurred logging out.");
        });
    },

    deleteLinkClick: function(event) {
        event.preventDefault();
        this.refs.navbar.refs.mainNav.refs.instanceMenu.setDropdownState(false);
    },

    cancelDelete: function(event) {
        event.preventDefault();
        this.refs.deleteConfirmModalTrigger.hide();
    },

    confirmDelete: function(event) {
        event.preventDefault();
        this.refs.deleteConfirmModalTrigger.hide();

        InstanceActionCreators.deleteInstance(this.state.selectedInstance.get('id'))
        .then(id => {
           NavigationActionCreators.navigateHome();
        })
        .catch(error => {
           console.error(error);
           alert("An unexpected error occurred deleting an instance.");
        });
    },

    linkClick: function(event) {
        // This is something of a hack. For an explanation, see
        // https://github.com/react-bootstrap/react-bootstrap/issues/202
        this.refs.navbar.refs.mainNav.refs.instanceMenu.setDropdownState(false);
    }

});

module.exports = TopNav;
