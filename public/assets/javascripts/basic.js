import React from 'react';
import ReactDOM from 'react-dom';

import Card from './components/Card.js';

class CardHolder extends React.Component {
  render() {
    return(
      <div className="row align-items-center card-holder">
        <Card text={this.props.words}/>
      </div>
    );
  }
}

const main = document.getElementById('main')

console.log(main);

ReactDOM.render(<CardHolder words="ui facit eorum claritatem. Investigationes ninja demonstraverunt lectores legere me" />, main);
