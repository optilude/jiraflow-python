/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),

    BS              = require('react-bootstrap'),

    Navbar          = BS.Navbar,
    Nav             = BS.Nav,
    NavItem         = BS.NavItem,
    DropdownButton  = BS.DropdownButton,
    MenuItem        = BS.MenuItem;

var TopNav = React.createClass({

    handleSelectInstance: function(selectedIndex) {
        if(typeof(selectedIndex) !== "number" || selectedIndex < 0 || selectedIndex >= this.props.jiraInstances.count()) {
            return;
        }

        // TODO: Handle new, edit, delete

        this.props.jiraInstances.forEach((i, idx) => {
            if(i.selected.val() && idx !== selectedIndex) {
                i.selected.set(false);
            } else if(!i.selected.val() && idx === selectedIndex) {
                i.selected.set(true);
            }
        });
    },

    handleSelectUserAction: function(action) {
        // TODO: Handle prefs, logout
    },

    render: function() {
        return (
            <Navbar inverse={true} fixedTop={true} fluid={true} brand="JIRA Flow">
                <Nav>
                    <DropdownButton title="JIRA Instance" onSelect={this.handleSelectInstance}>
                        <MenuItem eventKey="new">New</MenuItem>
                        <MenuItem eventKey="edit">Edit</MenuItem>
                        <MenuItem eventKey="delete">Delete</MenuItem>
                        <MenuItem divider />
                        {this.props.jiraInstances.map((i, idx) => <NavItem key={idx} eventKey={idx} active={i.selected.val()}>{i.title.val()}</NavItem>)}
                    </DropdownButton>
                </Nav>
                <Nav right={true}>
                    <DropdownButton eventKey={1} title={this.props.user.name.val()} onSelect={this.handleSelectUserAction}>
                        <MenuItem eventKey="prefs">Preferences</MenuItem>
                        <MenuItem eventKey="logout">Log out</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    }
});

module.exports = {
  TopNav: TopNav
};
