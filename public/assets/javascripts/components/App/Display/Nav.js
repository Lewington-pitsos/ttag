import React from 'react';

/*
Displays a number of NavButton components:

  - NavButton: a small arrow graphic that gets passed in a callback to props and executes it when clicked.

No Store interactions.

Has a number of user interactions equal to the NavButtons it displayes.

  - All the user interactions of Nav update the NavStore

Handles its own animations

  - On hovering at the top of the screen the Nav will descend. Once the mouse leaves the nav it ascends again.

This is a very standard, fixed-top page navigation bar. It allows the user to navigate back up the tree of nested categories and things. It gets displayed no matter where the user is in this tree, except for the very first (root) category (although whether or not it gets displayed is managed by Display).

*/

import navActions from '../../../actions/navActions'

export default class Nav extends React.Component {

  up() {
    // a wrapper that just triggers the up action on navActions
    navActions.up();
  }

  root() {
    navActions.root();
    // a wrapper that just triggers the root action on navActions
  }

  render() {
    return (
      <div className="d-flex justify-content-around" id="nav">
        Nav
      </div>
    );
  }
}
