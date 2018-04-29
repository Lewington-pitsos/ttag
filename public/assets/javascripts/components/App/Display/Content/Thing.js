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
