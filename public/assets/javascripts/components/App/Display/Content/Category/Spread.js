import React from 'react';

/*
Displays a tableax of one component

  - CategoryCard (a square box representing a category of things)

Relies on no store, but does rely on props:

  - Expects an array of objects, each represneting a category, to be passed in

  Has one user interaction:

    - whenever one of the spread items or list entries is clicked, a navigation method on the Category componrnt is triggered.

Handles the entry animation of all the Cards:

  - each Card will fly in swiftly fomr the screen bottom, with earlier/higher cards travelling faster

*/

import navActions from '../../../../../actions/navActions';
import CategoryCard from './Spread/CategoryCard';

export default class Spread extends React.Component {


  // +-------------------------------------------------------------------+
  //                       NAVIGATION METHODS
  // +-------------------------------------------------------------------+

  /**
  * INPUT: id (integer, representing the id of the node)
  * DOES: triggers an action on navActions, passing in the id
  */
  goToCategory(id) {
    console.log(navActions);
    this.navActions.goToCategory(id);
  }

  // +-------------------------------------------------------------------+
  //                       RENDERING METHODS
  // +-------------------------------------------------------------------+

  /**
  INPUT: NONE
  DOES: generates a CategoryCard component for each subcategory in props, displaying its data
  OUTPUT: an array of CategoryCard Components
  */
  categoryCards() {
    const self = this;
    return this.props.subcategories.map(function(category) {
      return (
        <CategoryCard
          key={ category.id }
          id = { category. id }
          name={ category.name }
          image = { category.image }
          method = {self.goToCategory.bind(self, category.id)} />
      )
    })
  }

  render() {
    return (
      <div className="container-fluid d-flex justify-content-center flex-wrap spread">
        { this.categoryCards() }
      </div>
    );
  }
}
