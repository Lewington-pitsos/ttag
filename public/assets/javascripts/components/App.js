import React from 'react';

/*
Displays two components:

  - About (a bit of intro text that we don't want clogging up anything else)
  - Display (the actual content of the app)

Relies on one store:

  - AboutStore: which tracks whether or not to display the About component

Has no User Interactions.

Handles the animation of:

  - About components entering and leaving the page
  - Display components entering and leaveing the page (different animations)

This pretty much just a wrrapper to keep everything logically distinct.
*/

import Display from './App/Display';
import About from './App/About';

import aboutStore from '../stores/AboutStore';

import { CSSTransitionGroup } from 'react-transition-group';

export default class App extends React.Component {
  constructor() {
    super();
    // innitially sets the current state according to the state of the aboutStore
    // we also want to keep track of the listener on the aboutStore so that we can get rid of it when we un-mount App

    this.state = aboutStore.getInfo();
    this.updateState = this.updateState.bind(this);
  }

  // +-------------------------------------------------------------------+
  //                       GENERIC STORE LISTENING
  // +-------------------------------------------------------------------+

  componentWillMount() {
    // when this component is first mounted we want to add a listener to the aboutStore
    aboutStore.on('change', this.updateState);
  }

  componentWillUnmount() {
    // when this component gets removed from the dom we want to remove the listener to the store.
    aboutStore.removeListener('change', this.updateState);
  }

  updateState() {
    // this is a listener to the aboutStore. Whenever the latter undergoes a change we want to update the state of App to match.
    this.setState(aboutStore.getInfo());
  }

  render() {
    return (
      <div className="container-fluid" id="app">
        <CSSTransitionGroup
         transitionName="app"
         transitionEnterTimeout={800}
         transitionLeaveTimeout={500}>

         {this.state.about ? <About /> : ''}
         {this.state.about ? '' : <Display />}

        </CSSTransitionGroup>
      </div>
    );
  }
}
