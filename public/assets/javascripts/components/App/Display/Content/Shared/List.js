import React from 'react';

/*
Displays two of 3 possible components:

  - Title (a simple display representing the title of the current category)

  And one of either:

  - Spread (a tableux-like list of all current subcategories)

  - List (a list like list of all the things within the current category)

Relies on one store:

  - ThingStore: which provides a list of the current category's children as well as its title

Has no user interactions.

Handles no animations.
*/

import thingStore from '../../../../stores/ThingStore';

export default class Category extends React.Component {
    constructor() {
      super();
      // innitially sets the current state according to the state of the aboutStore
      // we also want to keep track of the listener on the aboutStore so that we can get rid of it when we un-mount App

      this.state = thingStore.getCategoryInfo();
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
      this.setState(thingStore.getCategoryInfo());
    }

    render() {
      return (
        <div className="container-fluid" id="app">
          Category
        </div>
      );
    }
}
