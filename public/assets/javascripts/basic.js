import React from 'react';
import ReactDOM from 'react-dom';

import Card from './components/Card.js';
import CardHolder from './components/CardHolder.js';

const main = document.getElementById('main')

console.log(main);

ReactDOM.render(<CardHolder words="ui facit eorum claritatem. Investigationes ninja demonstraverunt lectores legere me" />, main);
