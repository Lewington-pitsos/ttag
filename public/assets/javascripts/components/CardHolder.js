import React from 'react'; // We need to import React as well as Card, because all that we get from Card is the card class, REMEMBER js importing and exporting works different and is shit.
import Card from './Card'; // NOTE: relative path is requird or EMS assumes it's a module

export default class CardHolder extends React.Component {
  render() {
    return(
      <div className="row align-items-center card-holder">
        <Card text={this.props.words}/>
      </div>
    );
  }
}
