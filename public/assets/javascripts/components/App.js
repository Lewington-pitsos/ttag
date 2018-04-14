import React from 'react'

/*
Displays two components:

  - About (a bit of intro text that we don't want clogging up anything else)
  - Display (the actual content of the app)

Relies on one store:

  - AboutStore: which tracks whether or not to display the About component

*/
export default class App extends React.Component {
   render() {
      return (
        <div id="app">

        </div>
      );
   }
}
