import React from 'react';

/*
Displays two of 3 possible components:

  - Title (a simple display representing the title of the current category)

  And one of either:

  - Spread (a tableux-like list of all current subcategories)

  - List (a list like list of all the things within the current category)

Relies on one store:

  - ThingStore: which provides a list of the current category's children as well as its title

Has one user interaction:

  - whenever one of the spread items or list entries is clicked, a navigation method on the Category componrnt is triggered.

Handles no animations.
*/
import navActions from '../../../../actions/navActions';
import thingStore from '../../../../stores/ThingStore';

import CategoryTitle from './Category/CategoryTitle';
import Spread from './Category/Spread';
import List from './Shared/List';

export default class Category extends React.Component {
    constructor() {
      super();
      // innitially sets the current state according to the state of the aboutStore
      // we also want to keep track of the listener on the aboutStore so that we can get rid of it when we un-mount App

      this.state = thingStore.getCategoryInfo();
      this.updateState = this.updateState.bind(this);
    }

    // +-------------------------------------------------------------------+
    //                       NAVIGATION METHODS
    // +-------------------------------------------------------------------+

    /**
    * INPUT: id (integer, representing the id of the node)
    * INPUT: thing (boolean, representing whether or not the node is a thing)
    * DOES: triggers an action on navActions, passing in the values.
    */
    goToNode(id, thing) {
      this.navActions.goToNode(id, thing);
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

    // +-------------------------------------------------------------------+
    //                              RENDERING
    // +-------------------------------------------------------------------+

    displayType() {
      // returns a spread or a list depending on whether the current category is a thing category or a category category
      return this.state.thingCategory ? <List things={true} allThings={ this.state.children } /> : <Spread subcategories={ this.state.children } />
    }

    render() {
      return (
        <div className="container-fluid" id="app">
          <CategoryTitle title={ this.state.category.title } />
          { this.displayType() }
        </div>
      );
    }
}
