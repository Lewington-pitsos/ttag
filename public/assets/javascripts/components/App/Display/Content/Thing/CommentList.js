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

import Dimmer from './CommentList/Dimmer';
import CommentHeader from './CommentList/CommentHeader';
import List from '../Shared/List';

export default class CommentList extends React.Component {
    render() {
      return (
        <div className="container-fluid spread">
          <div className="row">
            <div className="col">
            CommentList
            <CommentHeader />
            <Dimmer />
            <List thing={false}/>
            </div>
          </div>
        </div>
      );
    }
}
