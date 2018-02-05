import React from 'react';
import CardText from './CardText';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  // prop: dialogue (array)
  // prop: id (string)
  // prop: hidden (string) whether the card starts hidden
  // prop: size (string)
  // prop: entryDirection (string) used with animate.css
  constructor(props) {
    super(props);
    this.state = {frontTextIndex: 0, backTextIndex: -1}

    // This binding is necessary to make `this` work in the callback
    this.updateText = this.updateText.bind(this);
    this.nextIndex = this.nextIndex.bind(this);
    this.flip = this.flip.bind(this);
  }

  updateText() { //TODO we want to fire an event when the last dialogue string is visible
    // on a click IF neither index is greater than the end of the array, the lower of the two dialogue indexes is increased to one greater than the current highest
    var highest = Math.max(this.state.frontTextIndex, this.state.backTextIndex)
    if (this.state.frontTextIndex == highest)
     {
        this.setState({backTextIndex: this.nextIndex(highest)});
      } else {
        this.setState({frontTextIndex: this.nextIndex(highest)});
      }

    // we also flip the card, but different cards will have different flipping interactions, so the speficis will be left up to the class
    this.cardSpecificFlip()
  }

  flip() {
    // flips the card over. Depends on the current height of the card
    $(`#${this.props.id}.flip-container`).toggleClass('hover');
  }

  nextIndex(num) {
    // returns one greater than the number passed, in or one less if num is equal or higher than limit.
    // This way if one of the leapfrogging indicies reaches the second-last index, it will stay there, and the other will always remain the "highest" of the two
    var limit = this.props.dialogue.length - 1;
    return num < limit ? num + 1 : num - 1
  }

  render() { // we should have possible children on the front and back of each of the cards
    // renders the outside containers of the card div and a CardText component
    var fadein = 'fadeIn' + this.props.entryDirection + 'Big';
    return(
      <div className={`vertical flip-container card-flipper ${this.props.size}-card animated ${fadein} ${this.props.hidden}`} id={this.props.id}>
        {this.props.children}
        <div className='flipper'>
          <div className='card front' onClick={this.updateText}>
            <CardText content={this.props.dialogue[this.state.frontTextIndex]}/>
          </div>
          <div className='card back' onClick={this.updateText}>
            <CardText content={this.props.dialogue[this.state.backTextIndex]}/>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  // raises warnings if the correct props aren't passed in
  dialogue: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
}

Card.defaultProps = {
  // sets default prop values
  size: 'med',
  entryDirection: 'Top'
}
