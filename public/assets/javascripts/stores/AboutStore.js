/*

Only used by 1 component:

  - App

Basically just stores whether or not to show the about page.

*/

// othwesie keep executing new commands untill we
import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher';

class AboutStore extends EventEmitter {

  // +-------------------------------------------------------------------+
  //                      GENERIC FLUX STUFF
  // +-------------------------------------------------------------------+

  constructor() {
    super();
    // stores whether or not the about page is currently to be displayed. By default it isn't.
    this.about = false;
  }

  getInfo() {

    // returns a state containing a single value, indicating whether or not the about page is to be displayed
    return { about: this.about };
  }

  handleActions(action) {
    // only responds to one action which switches the about-page in and out
    switch(action.type) {
      case "SWITCH_ABOUT": {
        this.switchAbout();
        break;
      }
    }
  }

  // +-------------------------------------------------------------------+
  //                          MAINPULATING DATA
  // +-------------------------------------------------------------------+

  switchAbout() {
    // flips the stored value which indicates whether or not the about page should be shown.
    this.about = !this.about;
    this.emit('change');
  }

}

const aboutStore = new AboutStore;

dispatcher.register(aboutStore.handleActions.bind(aboutStore));
export default aboutStore;
