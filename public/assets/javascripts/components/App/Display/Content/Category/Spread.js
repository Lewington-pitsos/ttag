import React from 'react';

/*
Displays a number of components depending on props

  - Card (a square box representing a category of things)

Relies on no store, but does rely on props:

  - Expects an array of objects, each represneting a category, to be passed in

Has no user interactions.

Handles the entry animation of all the Cards:

  - each Card will fly in swiftly fomr the screen bottom, with earlier/higher cards travelling faster

*/

import thingStore from '../../../../stores/ThingStore';

export default class Category extends React.Component {
    render() {
      return (
        <div className="container-fluid spread">
          <div className="row">
            <div className="col">
            </div>
          </div>
        </div>
      );
    }
}
