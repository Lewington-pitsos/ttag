import React from 'react';
import CardText from './CardText';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {frontTextIndex: 0, backTextIndex: -1}

    // This binding is necessary to make `this` work in the callback
    this.updateText = this.updateText.bind(this);
    this.nextIndex = this.nextIndex.bind(this);
  }

  updateText() {
    // on a click IF neither index is greater than the end of the array, the lower of the two dialogue indexes is increased to one greater than the current highest
    var highest = Math.max(this.state.frontTextIndex, this.state.backTextIndex)
    if (this.state.frontTextIndex == highest)
     {
        this.setState({backTextIndex: this.nextIndex(highest)});
      } else {
        this.setState({frontTextIndex: this.nextIndex(highest)});
      }

    // we also flip the cards
    $('.flip-container').toggleClass('hover');
  }

  nextIndex(num) {
    // returns one greater than the number passed, in or the same number if num is equal or higher than limit
    var limit = this.props.dialogue.length - 1;
    return num < limit ? num + 1 : num - 1
  }

  render() {
    // renders the outside containers of the card div and a CardText component
    return(
      <div className='vertical flip-container'>
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
  // raises warnings if an array isn's passed in
  dialogue: PropTypes.array.isRequired
}
