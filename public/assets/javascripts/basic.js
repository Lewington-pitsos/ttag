import React from 'react';
import ReactDOM from 'react-dom';

import EasyCard from './components/EasyCard.js';
import CardHolder from './components/CardHolder.js';

const main = document.getElementById('main')

var cardOneDialogue = [
  "Gaaaaah *gasp* Aaaaaah! Help me *splutter* I'm in terrible pain! Quick, flip me over",
  "Phew, christ that's better, thanks for that. Ok, ok, you can flip me back now.",
  '...'
];

var cardTwoDialogue =  [
  "He's not coming back you know",
  "Curses! I have been Vanquished."
]

ReactDOM.render(
  <CardHolder entryDirection={'Left'}>
    <EasyCard dialogue={cardOneDialogue} id="nice-card" size="medium" entryDirection="Down"/>
    <EasyCard dialogue={cardTwoDialogue} id="mean-card" size="small" entryDirection="Up" hidden="hidden"/>
  </CardHolder>
  , main
);
