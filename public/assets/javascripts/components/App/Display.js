import React from 'react';

/*
Displays two components:

  - Nav (fixed, page top navigation bar)
  - Content (the actual substantive content the user is interested in)

Relies on 1 store:

  - NavStore: tracks whether or not the nav needs to be displayed at all

Has 1 User Interaction:

  - when the about button near the bottom of the page is clicked, an action is tiggered causing the aboutStore to switch it's stance on whether the about page is showing.

Handles no animations.

This pretty much just a wrapepr to keep everything logically distinct.

*/

import aboutActions from '../../actions/aboutActions';
import Content from './Display/Content';

export default class Display extends React.Component {

  displayAbout() {
    // a simple wrapper function that triggers an action.
    aboutActions.switchAbout();
  }

   render() {
      return (
        <div id="display">
          <div className="row justify-content-center">
            <div className="col-8 d-flex align-items-center flex-column">
              DISPLAY
              <button onClick={this.displayAbout.bind(this)}>Eh?</button>
            </div>
          </div>
        </div>
      );
   }
}
