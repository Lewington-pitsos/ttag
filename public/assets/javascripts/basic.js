import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Layout extends React.Component {
  render() {
    return(
      <h1>Please sir, can I have some</h1>
    );
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout/>, app);
