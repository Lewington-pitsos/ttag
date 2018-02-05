import React from 'react';
import PropTypes from 'prop-types';

export default class CardText extends React.Component{
  // expects content a string to be passed in to Props
  render() {
    return(
      <p>{this.props.content}</p>
    );
  }
}

CardText.propTypes = {
  content: PropTypes.string
}
