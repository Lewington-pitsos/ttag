// this is currently the only Webpack entry point so all JS that we could ever need must be requireed here

// dependencies

// for some FUCKED reason, tether needs to be imported HERE for bootstrap.js to work while Jquery needs to be included using the ProvidePlugin
import tether from 'tether';
global.Tether = tether;

// css
import './stylesheets/main.sass';


// js
import './javascripts/basic.js';
import 'bootstrap'; // yeah, this is just bootstrap js
