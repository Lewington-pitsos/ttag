import React from 'react';

/*
Displays one of two components:

  - ThingDisplay (a layout representing all the information about a given thing)
  - CommentList (a list of all comments associated with that thing)

Relies on one store:

  - ThingStore: gathers all the information about the current Thing being displayed
  -

Has no user interactions.

Handles no animations.
*/

import thingStore from '../../../../stores/ThingStore';
import CommentList from './Thing/CommentList';
import ThingDisplay from './Thing/ThingDisplay';

export default class Thing extends React.Component {
  constructor() {
    super();
    // innitially sets the current state according to the state of the aboutStore
    // we also want to keep track of the listener on the aboutStore so that we can get rid of it when we un-mount App

    this.state = thingStore.getThingInfo();
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
    this.setState(thingStore.getThingInfo());
  }

  render() {
    return (
      <div id="thing">
        <ThingDisplay info={this.state.thing}/>
        <CommentList />
      </div>
    );
  }
}
