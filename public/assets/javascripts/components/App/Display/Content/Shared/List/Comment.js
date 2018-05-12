import React from 'react';

/*
Displays a number of components depending on props

  - CategoryCard (a square box representing a category of things)

Relies on no store, but does rely on props:

  - Expects an array of objects, each represneting a category, to be passed in

Has no user interactions.

Handles the entry animation of all the Cards:

  - each Card will fly in swiftly fomr the screen bottom, with earlier/higher cards travelling faster

*/

export default class Comment extends React.Component {
    render() {
      return (
        <div className="container-fluid spread">
          <div className="row">
            <div className="col-5 d-flex flex-column align-items-center">
              { this.props.info.image }
              <h4>{ this.props.info.username }</h4>
            </div>
            <div className="col-7">
              <p>{ this.props.info.text }</p>
            </div>
          </div>
        </div>
      );
    }
}
