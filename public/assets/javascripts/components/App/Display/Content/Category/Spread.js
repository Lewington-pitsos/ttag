import React from 'react';

/*
Displays a tableax of one component

  - CategoryCard (a square box representing a category of things)

Relies on no store, but does rely on props:

  - Expects an array of objects, each represneting a category, to be passed in

Has no user interactions.

Handles the entry animation of all the Cards:

  - each Card will fly in swiftly fomr the screen bottom, with earlier/higher cards travelling faster

*/

import CategoryCard from './Spread/CategoryCard';

export default class Spread extends React.Component {

    /**
    INPUT: NONE
    DOES: generates a CategoryCard component for each subcategory in props, displaying its data
    OUTPUT: an array of CategoryCard Components
    */
    categoryCards() {
      return this.props.subcategories.map(function(category) {
        return (
          <CategoryCard
            key={ category.id }
            id = { category. id }
            name={ category.name }
            image = { category.image } />
        )
      })
    }

    render() {
      return (
        <div className="container-fluid spread">
          <div className="row">
            <div className="col">
              { this.categoryCards() }
            </div>
          </div>
        </div>
      );
    }
}
