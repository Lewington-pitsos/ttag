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

import ThingCard from './List/ThingCard';
import Comment from './List/Comment';

export default class List extends React.Component {
    render() {
      return (
        <div className="container-fluid" id="list">
          <ThingCard />
          <Comment />
        </div>
      );
    }
}
