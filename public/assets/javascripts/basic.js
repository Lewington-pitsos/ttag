import React from 'react';
import ReactDOM from 'react-dom';

class Card extends React.Component {
  render() {
    return(
      <div className='text-center card'>

      </div>
    );
  }
}

const content = document.getElementById('main')

console.log(document);

console.log(<Card/>);

ReactDOM.render(<Card/>, content);
