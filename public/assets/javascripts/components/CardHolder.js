import React from 'react'; // We need to import React as well as Card, because all that we get from Card is the card class, REMEMBER js importing and exporting works different and is shit.
import Card from './Card'; // NOTE: relative path is requird or EMS assumes it's a module
import PropTypes from 'prop-types'

export default class CardHolder extends React.Component {
  // this is currently just a wrapper for all the card objects
  // prop: entryDirection (string) animation entry direction
  render() {
    // renders a simple card holding row with a Card component inside
    return(
      <div className={'d-flex flex-wrap flex-column align-items-center card-holder'}>
        {this.props.children}
      </div>
    );
  }
}

CardHolder.propTypes = {
  // raises warnings if an array isn's passed in
  entryDirection: PropTypes.string.isRequired
}
