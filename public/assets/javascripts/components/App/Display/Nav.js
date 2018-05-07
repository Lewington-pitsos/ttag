import React from 'react';

/*
Displays a number of Arrow components:

  - Arrow: a small arrow graphic that gets passed in a callback to props and executes it when clicked.

No Store interactions.

Has a number of user interactions equal to the Arrows it displayes.

  - All the user interactions of Nav update the ThingStore

Handles its own animations

  - On hovering at the top of the screen the Nav will descend. Once the mouse leaves the nav it ascends again.

This is a very standard, fixed-top page navigation bar. It allows the user to navigate back up the tree of nested categories and things. It gets displayed no matter where the user is in this tree, except for the very first (root) category (although whether or not it gets displayed is managed by Display).

*/

import navActions from '../../../actions/navActions';
import thingStore from '../../../stores/ThingStore';

import Arrow from './Nav/Arrow';

export default class Nav extends React.Component {
  constructor() {
    super();
    // innitially sets the current state according to the state of the aboutStore
    // we also want to keep track of the listener on the aboutStore so that we can get rid of it when we un-mount App

    this.state = thingStore.getRootDistance();
    this.updateState = this.updateState.bind(this);
  }

  // +-------------------------------------------------------------------+
  //                       GENERIC STORE LISTENING
  // +-------------------------------------------------------------------+

  componentWillMount() {
    // when this component is first mounted we want to add a listener to the aboutStore
    thingStore.on('change', this.updateState);
  }

  componentWillUnmount() {
    // when this component gets removed from the dom we want to remove the listener to the store.
    thingStore.removeListener('change', this.updateState);
  }

  updateState() {
    // this is a listener to the aboutStore. Whenever the latter undergoes a change we want to update the state of App to match.
    this.setState(thingStore.getRootDistance());
  }

  // +-------------------------------------------------------------------+
  //                       ACTION WRAPPERS
  // +-------------------------------------------------------------------+

  up() {
    // a wrapper that just triggers the up action on navActions
    navActions.up();
  }

  root() {
    navActions.root();
    // a wrapper that just triggers the root action on navActions
  }


  // +-------------------------------------------------------------------+
  //                              RENDERING
  // +-------------------------------------------------------------------+

  upButton() {
    return this.state.rootDistance >= 1 ? <Arrow method={this.up.bind(this)} />: '';
  }

  rootButton() {
    return this.state.rootDistance >= 2 ? <Arrow method={this.root.bind(this)} /> : '';
  }

  render() {
    return (
      <div className="d-flex justify-content-around" id="nav">
        { this.upButton() }
        { this.rootButton() }
      </div>
    );
  }
}
