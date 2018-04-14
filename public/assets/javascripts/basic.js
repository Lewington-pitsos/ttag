import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';

const main = document.getElementById('main')

/*
Literally just renders the Main component to the DOM.
*/
ReactDOM.render(
  <App>
  </App>
  , main // i.e. main is the element that everything is being inserted into
);
