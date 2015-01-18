/*jshint globalstrict:true, devel:true, newcap:false */
/*global require, module, exports, document */
"use strict";

var React = require('react'),

    BS              = require('react-bootstrap'),
    Navbar          = BS.Navbar,
    Nav             = BS.Nav,
    NavItem         = BS.NavItem,
    SubNav          = BS.SubNav,
    DropdownButton  = BS.DropdownButton,
    MenuItem        = BS.MenuItem;

var TopNav = React.createClass({
    render: function() {

        return (

          <Navbar inverse={true} fixedTop={true} fluid={true} brand="JIRA Flow">

              <Nav>
                <DropdownButton eventKey={1} title="Instance">
                  <MenuItem eventKey="1">New...</MenuItem>
                  <MenuItem eventKey="2">Delete</MenuItem>
                  <MenuItem eventKey="3">Edit</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="4">Instance 1</MenuItem>
                  <MenuItem eventKey="5">Instance 2</MenuItem>
                  <MenuItem eventKey="6">Instance 3</MenuItem>
                </DropdownButton>
              </Nav>

              <Nav right={true}>
                <DropdownButton eventKey={1} title="John Smith">
                  <MenuItem eventKey="1">Preferences</MenuItem>
                  <MenuItem eventKey="2">Log out</MenuItem>
                </DropdownButton>
              </Nav>
            </Navbar>

        );

    }
});

var Sidebar = React.createClass({
    displayName: '',
    render: function () {
        return (
            <Nav>
                <NavItem eventKey="1">One</NavItem>
                <NavItem eventKey="2">Two</NavItem>
                <NavItem eventKey="3">Four</NavItem>
            </Nav>
        );
    }
});

module.exports = {
  TopNav: TopNav,
  Sidebar: Sidebar
};
