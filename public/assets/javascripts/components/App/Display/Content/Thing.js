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
    render() {
      return (
        <div className="container-fluid" id="app">
          <ThingDisplay />
          <CommentList />
        </div>
      );
    }
}
