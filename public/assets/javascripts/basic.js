import React from 'react';
import ReactDOM from 'react-dom';

import Title from './components/Title.js';

const main = document.getElementById('main')

ReactDOM.render(
  <Title>
    Fuck you
  </Title>
  , main // i.e. main is the element that everything is being inserted into
);
