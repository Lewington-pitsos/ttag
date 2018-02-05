import React from 'react';

export default class CardText extends React.Component{
  render() {
    return(
      <p>{this.props.content}</p>
    );
  }
}
