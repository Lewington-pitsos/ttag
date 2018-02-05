import React from 'react'; // We need to import React as well as Card, because all that we get from Card is the card class, REMEMBER js importing and exporting works different and is shit.
import Card from './Card'; // NOTE: relative path is requird or EMS assumes it's a module
import PropTypes from 'prop-types'

export default class CardHolder extends React.Component {
  // prop: dialogue (array)
  // prop: entryDirection (string) animation entry direction
  render() {
    // renders a simple card holding row with a Card component inside
    return(
      <div className={'row justify-content-center no-gutters card-holder animated fadeIn' + this.props.entryDirection + 'Big'}>
        <div class='col-md-6'>
          <Card dialogue={this.props.dialogue}/>
        </div>
      </div>
    );
  }
}

CardHolder.propTypes = {
  // raises warnings if an array isn's passed in
  dialogue: PropTypes.array.isRequired
}
