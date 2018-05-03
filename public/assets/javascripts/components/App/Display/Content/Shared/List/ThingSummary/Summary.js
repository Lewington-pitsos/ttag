import React from 'react';

/*
Displays no further components

Relies on no store, but does rely on props:

  - Expects an strign representing the explenation text of a thing to be passed in

Has no user interactions.

Handles no animations.
*/

export default class Summary extends React.Component {
    render() {
      return (
        <div className="container-fluid spread">
          <div className="row">
            <div className="col">
            <p>{this.props.text}</p>
            </div>
          </div>
        </div>
      );
    }
}
