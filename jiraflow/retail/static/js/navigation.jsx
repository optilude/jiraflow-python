/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),
    Cursor = require('react-cursor').Cursor,
    ImmutableOptimizations = require('react-cursor').ImmutableOptimizations,

    BS              = require('react-bootstrap'),

    Navbar          = BS.Navbar,
    Nav             = BS.Nav,
    NavItem         = BS.NavItem,
    DropdownButton  = BS.DropdownButton,
    MenuItem        = BS.MenuItem;

var TopNav = React.createClass({
    mixins: [ImmutableOptimizations(['jiraInstances', 'user'])],

    propTypes: {
        jiraInstances: React.PropTypes.instanceOf(Cursor).isRequired,
        user: React.PropTypes.instanceOf(Cursor).isRequired
    },

    handleSelectInstance: function(selectedIndex) {
        this.props.jiraInstances.value.forEach((i, idx) => {
            var selection = this.props.jiraInstances.refine(idx).refine('selected');
            if(i.selected && idx !== selectedIndex) {
                selection.set(false);
            } else if(!i.selected && idx === selectedIndex) {
                selection.set(true);
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
                        {this.props.jiraInstances.value.map((i, idx) => <NavItem key={idx} onSelect={this.handleSelectInstance.bind(this, idx)} active={i.selected}>{i.title}</NavItem>)}
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

module.exports = {
  TopNav: TopNav
};
