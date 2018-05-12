import React from 'react';

/*
Displays no further components

Relies on no store, but does rely on props:

  - Expects an object represneting all the infromation assocaited with a thing to be passed in

Has one user interaction:

  - when clicked on a bunch of animations trigger to redirect the user to a page represnting in more detail the information of this thing PLUS its comments

Handles no animations.

*/
import navActions from '../../../../../../actions/navActions';
import Summary from './ThingSummary/Summary';

export default class ThingSummary extends React.Component {

  visit(id) {
    navActions.visitThing(id);
  }

  render() {
    return (
      <div className="thing-summary" onClick={this.visit.bind(this, this.props.info.id)}>
        <div className="row">
          <div className="col">
          <h1>{this.props.info.name}</h1>
          <Summary text={ this.props.info.text } />
          <p>{this.props.info.image}</p>
          </div>
        </div>
      </div>
    );
  }
}
