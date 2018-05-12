import React from 'react';

/*
Displays one of two possible components:

  - Thing (a display represenitng all the information about a given thing)
  - Category (A single category. The display will be a menu containing links to all of the categories, or things within that category)

Relies on one store:

  - ThingStore: which tracks the current category or thing to be displayed, and all its children

Has no user interactions.

Handles no animations.
*/

import thingStore from '../../../stores/ThingStore';

import Thing from './Content/Thing';
import Category  from './Content/Category';

export default class App extends React.Component {
    constructor() {
      super();
      // innitially sets the current state according to the state of the aboutStore
      // we also want to keep track of the listener on the aboutStore so that we can get rid of it when we un-mount App

      this.state = thingStore.getTypeInfo();
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
      this.setState(thingStore.getTypeInfo());
    }

    // +-------------------------------------------------------------------+
    //                              RENDERING
    // +-------------------------------------------------------------------+

    content() {
      // returns a Thing or Category component dependind on whether we are currently at a thing or a category
      return this.state.atThing ? <Thing /> : <Category /> ;
    }

    render() {
      return (
        <div id="content">
          { this.content() }
        </div>
      );
    }
}
