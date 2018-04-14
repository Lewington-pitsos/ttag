import React from 'react';

/*
Displays two components:

  - Nav (fixed, page top navigation bar)
  - Content (the actual substantive content the user is interested in)

Relies on 1 store:

  - NavStore: tracks whether or not the nav needs to be displayed at all


This pretty much just a wrapepr to keep everything logically distinct.

*/
export default class Display extends React.Component {
   render() {
      return (
        <div id="display">
          <div className="row justify-content-center">
            <div className="col-8 d-flex align-items-center flex-column">
              DISPLAY
            </div>
          </div>
        </div>
      );
   }
}
