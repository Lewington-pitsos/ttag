import React from 'react';

import Display from './App/Display';
import About from './App/About';

/*
Displays two components:

  - About (a bit of intro text that we don't want clogging up anything else)
  - Display (the actual content of the app)

Relies on one store:

  - AboutStore: which tracks whether or not to display the About component

This pretty much just a wrapepr to keep everything logically distinct.
*/
export default class App extends React.Component {
   render() { 
      return (
        <div className="container-fluid" id="app">
          <About />
          <Display />

        </div>
      );
   }
}
