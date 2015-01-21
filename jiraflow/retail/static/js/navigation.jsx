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
        this.props.jiraInstances.forEach((i, idx) => {
            if(i.selected.val() && idx !== selectedIndex) {
                i.selected.set(false);
            } else if(!i.selected.val() && idx === selectedIndex) {
                i.selected.set(true);
            }
        });
    },

    // TODO: Handle new, edit, delete, prefs, logout

    render: function() {
        return (
            <Navbar inverse={true} fixedTop={true} fluid={true} brand="JIRA Flow">
                <Nav>
                    <DropdownButton title="JIRA Instance">
                        <MenuItem>New</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem divider />
                        {this.props.jiraInstances.map((i, idx) => <NavItem key={idx} onSelect={this.handleSelectInstance.bind(this, idx)} active={i.selected.val()}>{i.title.val()}</NavItem>)}
                    </DropdownButton>
                </Nav>
                <Nav right={true}>
                    <DropdownButton eventKey={1} title={this.props.user.name.val()}>
                        <MenuItem>Preferences</MenuItem>
                        <MenuItem>Log out</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    }
});

module.exports = {
  TopNav: TopNav
};
