import React from 'react';

/*
Basically it's a small form for udpating small bits of info on the current thing.

Displays no further components

Relies on no store, but does rely on props:

  - Expects an id to be passed in.

Has a number of user intercations:

  - if the user clicks the approve button, an update action is sent to the thingStore

Handles no animations
*/

import thingActions from '../../../../../../actions/thingActions';

export default class ThingInteraction extends React.Component {

  approve() {
    // TODO: impliment a user system
    thingActions.approve(this.props.info.id);
  }

  disapprove() {
    // TODO: impliment a user system
    thingActions.disapprove(this.props.info.id);
  }


  render() {
    return (
      <div className="container-fluid p-0 spread">
        <div className="row">
          <div className="col">
            <button onClick={ this.approve.bind(this) }>Approve</button>
            <button onClick={ this.disapprove.bind(this) }>Disapprove</button>
          </div>
        </div>
      </div>
    );
  }
}
