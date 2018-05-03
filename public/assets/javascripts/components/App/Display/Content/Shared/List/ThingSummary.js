import React from 'react';

/*
Displays no further components

Relies on no store, but does rely on props:

  - Expects an object represneting all the infromation assocaited with a thing to be passed in

Has one user interaction:

  - when clicked on a bunch of animations trigger to redirect the user to a page represnting in more detail the information of this thing PLUS its comments

Handles no animations.

*/
import Summary from './ThingSummary/Summary';

export default class ThingSummary extends React.Component {
  render() {
    return (
      <div className="container-fluid spread">
        <div className="row">
          <div className="col">
          <a href="{this.props.info.id}"><h1>{this.props.info.name}</h1>
          <Summary text={ this.props.info.text } />
          <p>{this.props.info.image}</p></a>
          </div>
        </div>
      </div>
    );
  }
}
