import React from 'react';

/*
Displays a no further components

Relies on no store, but does exepct the following from props:

  - an id (integer) a name (string) and an image (string represneting a path)

Has 1 user interaction:

  - clicking on a particular category will navigate the tree to that category (efectly reidrecting the user)

Handles card interaction animations:

  - each Card will appear to compress inwards when clicked
  - additionally each card will appear to glow when hovered over

*/

export default class CategoryCard extends React.Component {
    render() {
      return (
        <div className="container-fluid spread" onClick = { this.props.method }>
          <div className="row">
            <div className="col">
              <a href={ this.id }>
              <h4>{ this.props.name }</h4>
              <p>{ this.props.image }</p>
              </a>
            </div>
          </div>
        </div>
      );
    }
}
