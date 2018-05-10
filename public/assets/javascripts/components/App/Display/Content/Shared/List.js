import React from 'react';

/*
Displays a vertical list of one of two components:

  - Comment (represnts a comment made by a user)
  - ThingSummary(summary info about a thing)

Relies on no stores

Has no user interactions.

Handles the entrance animation of every component in the list:

  - regardless of the specific component type, they al float in from the bottom of the screen
*/

import ThingSummary from './List/ThingSummary';
import Comment from './List/Comment';

export default class List extends React.Component {

  // +-------------------------------------------------------------------+
  //                              RENDERING
  // +-------------------------------------------------------------------+

  /**
  * INPUT: NONE
  * DOES: creates a bunch of either ThingSummary or Comment components depending on what props says and adds them to an array
  * OUTPUT: that array dawg
  */
  children() {
    return this.props.things ? this.things() : this.comments();
  }

  things() {
    return this.props.allThings.map(function(thingInfo) {
      return <ThingSummary info={thingInfo} key={thingInfo.id} />
    })
  }

  render() {
    return (
      <div className="container-fluid" id="list">
        { this.children() }
      </div>
    );
  }
}
