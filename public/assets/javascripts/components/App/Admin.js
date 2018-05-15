import React from 'react';

/*
Displays two components:

  - About (a bit of intro text that we don't want clogging up anything else)
  - Display (the actual content of the app)

Relies on one store:

  - AboutStore: which tracks whether or not to display the About component

Has no User Interactions.

Handles the animation of:

  - About components entering and leaving the page
  - Display components entering and leaveing the page (different animations)

This pretty much just a wrrapper to keep everything logically distinct.
*/

import adminActions from '../../actions/adminActions';
import adminStore from '../../stores/AdminStore';

export default class Admin extends React.Component {
  // +-------------------------------------------------------------------+
  //                       GENERIC STORE LISTENING
  // +-------------------------------------------------------------------+

  removeThingFromCategory(categoryId, thingId) {
    console.log('asds');
    adminActions.removeFromCategory(categoryId, thingId);
  }

  render() {
    return (
      <div id="admin">
        <button onClick={this.removeThingFromCategory.bind(this, 1000, 1004)}>Remove</button>
      </div>
    );
  }
}
