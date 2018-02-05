import React from 'react';
import CardText from './CardText';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentDialogue: 0}

    // This binding is necessary to make `this` work in the callback
    this.updateText = this.updateText.bind(this);
  }

  updateText() {
    // on a click, the currentDialogue of this card object is increased, unless it's already at the end of the Dialogue array
    if (this.state.currentDialogue < (this.props.dialogue.length - 1)) {
      this.setState(prevState => ({
        currentDialogue: prevState.currentDialogue + 1
      }));
    }
  }

  render() {
    // renders the outside containers of the card div and a CardText component
    return(
      <div class='flip-container' ontouchstart="this.classList.toggle('hover');">
       <div class='flipper'>
          <div className='card front' onClick={this.updateText}>
            <CardText content={this.props.dialogue[this.state.currentDialogue]}/>
          </div>
          <div className='card back' onClick={this.updateText}>
            <CardText content={this.props.dialogue[this.state.currentDialogue]}/>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  // raises warnings if an array isn's passed in
  dialogue: PropTypes.array.isRequired
}
