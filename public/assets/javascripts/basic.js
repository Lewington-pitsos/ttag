import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {
  render(word) {
    return(
      <div className='text-xs-center'>
        <h1>CUNT {word}</h1>
        <h1 className="text-xs-right">dasdasd {word}</h1>
      </div>
    );
  }
}

const app = document.getElementById('app')

console.log(<Layout/>);

ReactDOM.render(<Layout/>, app);
