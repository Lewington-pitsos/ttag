import React from 'react';
import CardText from './CardText';

export default class Card extends React.Component {
  render() {
    return(
      <div className="col-md-6">
        <div className='card'>
          <CardText content={this.props.dialogue}/>
        </div>
      </div>
    );
  }
}
