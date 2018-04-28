import React from 'react';

/*
Displays one of two possible components:

  - Thing (a display represneitng all the information about a given thing)
  - Category (A single category. The display will be a menu containing links to all of the categories, or things within that category)

Relies on one store:

  - ThingStore: which tracks the current category or thing to be displayed, and all its children

Has no user interactions.

Handles no animations.
*/

import thingStore from '../../../../stores/ThingStore';

export default class Thing extends React.Component {
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

    render() {
      return (
        <div className="container-fluid" id="app">
          Thing
        </div>
      );
    }
}
