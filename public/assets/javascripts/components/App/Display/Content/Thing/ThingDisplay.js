import React from 'react';

/*
Displays two components:

  - ThingContent (a layout of infromation regarding the current thing)
  - ThingInteraction ( some buttons for interacting with the thing )

Relies on no store, but does rely on props:

  -

Has no user interactions.

Handles the entry animation of all ThingContent.

  - 

*/

import ThingContent from './ThingDisplay/ThingContent';
import ThingInteraction from './ThingDisplay/ThingInteraction';

export default class ThingDisplay extends React.Component {
    render() {
      return (
        <div className="container-fluid spread">
          <div className="row">
            <div className="col">
            ThingDisplay
            <ThingContent />
            <ThingInteraction />
            </div>
          </div>
        </div>
      );
    }
}
