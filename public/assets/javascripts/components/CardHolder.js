import React from 'react'; // We need to import React as well as Card, because all that we get from Card is the card class, REMEMBER js importing and exporting works different and is shit.
import Card from './Card'; // NOTE: relative path is requird or EMS assumes it's a module
import PropTypes from 'prop-types'

export default class CardHolder extends React.Component {
  // requires a dialogue to be passed in as a prop
  render() {
    // renders a simple card holding row with a Card component inside
    return(
      <div className="row justify-content-center no-gutters card-holder">
        <Card dialogue={this.props.dialogue}/>
      </div>
    );
  }
}

CardHolder.propTypes = {
  // raises warnings if an array isn's passed in
  dialogue: PropTypes.array.isRequired
}
