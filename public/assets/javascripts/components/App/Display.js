import React from 'react';

/*
Displays two components:

  - Nav (fixed, page top navigation bar)
  - Content (the actual substantive content the user is interested in)


Relies on 1 store:

  - ThingStore: which by tracking the current position on the thing tree, tracks whether or not the nav needs to be displayed at all

Has 1 User Interaction:

  - when the about button near the bottom of the page is clicked, an action is tiggered causing the aboutStore to switch it's stance on whether the about page is showing.

  - this button is only visible when the user is at the root

Handles no animations.

This pretty much just a wrapepr to keep everything logically distinct.

*/

import thingStore from '../../stores/ThingStore';

import aboutActions from '../../actions/aboutActions';
import Content from './Display/Content';
import Nav from  './Display/Nav';

export default class Display extends React.Component {
  constructor() {
    super();

    // when we create a new instance of Display we want to set it's state (which only tracks whether or not we are at the root) according to the current state of thingStore
    this.state = thingStore.getRootInfo();
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
    this.setState(thingStore.getRootInfo());
  }

  // +-------------------------------------------------------------------+
  //                               ACTIONS
  // +-------------------------------------------------------------------+

  displayAbout() {
    // a simple wrapper function that triggers an action.
    aboutActions.switchAbout();
  }

  // +-------------------------------------------------------------------+
  //                             RENDER RELATED
  // +-------------------------------------------------------------------+

  nav() {
    // returns the nav component or an emptyt string if we are at the root
    return this.state.atRoot ? '' : <Nav />;
  }

  about() {
    // returns an empty string, or else the about button if we are at the root
    return this.state.atRoot ? <button onClick={this.displayAbout.bind(this)}>Eh?</button> : '' ;
  }

  render() {
    return (
      <div id="display">

        {/* this will display the Nav component unless we are at the root */}
        <div className="row justify-content-center">
          <div className="col-12 d-flex align-items-center flex-column">
            { this.nav() }
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8 d-flex align-items-center flex-column">
            <Content />
          </div>
        </div>

        {/* this will display nothing to the user unless we are at the root */}
        <div className="row justify-content-center">
          <div className="col-8 d-flex align-items-center flex-column">
            { this.about() }
          </div>
        </div>
      </div>

    );
  }
}
