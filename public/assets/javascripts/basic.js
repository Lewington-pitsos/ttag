import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {
  render() {
    return(
      <div className='text-center'>
        <h1>CUNT </h1>
        <h1 className="text-right">dasdasd </h1>
      </div>
    );
  }
}

const content = document.getElementById('main')

console.log(document);

console.log(<Layout/>);

ReactDOM.render(<Layout/>, content);
