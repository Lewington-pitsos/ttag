import React from 'react';
import CardText from './CardText';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.updateText = this.updateText.bind(this);
  }

  updateText() {
    console.log(this.props.currentDialogue);
    console.log(this.props);
    this.props.currentDialogue += 1;
  }

  render() {
    return(
      <div className="col-md-6">
        <div className='card' onClick={this.updateText}>
          <CardText content={this.props.dialogue[this.props.currentDialogue]}/>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  currentDialogue: PropTypes.number.isRequired
}

Card.defaultProps = {
  currentDialogue: 0
}
