import React from 'react';

export default class Card extends React.Component {
  render() {
    return(
      <div className="col-md-6">
        <div className='card'>
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}
