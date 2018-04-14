/*

Used by 1+ components:

  - Display ( for deciding whether or not to display Nav, based on whether      we're ion the root category)

Retrives from the database and stores the currently viewable category (and all it's children), or thing, plus the previous category if we're not at the root category. Responds to navigation events by walking up and down the category/thing tree.

*/

// othwesie keep executing new commands untill we
import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher';

class ThingStore extends EventEmitter {

  // +-------------------------------------------------------------------+
  //                      GENERIC FLUX STUFF
  // +-------------------------------------------------------------------+

  constructor() {
    super();
    // stores the current category/thing as an object (so like, JSON compatible)
    // stores all it's children (if it has any) in an array of like objetcs
    // stores an array of all the previously navigated-to categories

    // PERMENENTLY stores some sort of identifier that is used to check whether or not the current category/thing is the root

  }

  getDisplayInfo() {
    // returns a state containing just an indicator of whether or not we are at the root category
  }

  getContentInfo() {

    // returns a state containing the current category/thing and all it's children
  }

  handleActions(action) {
    // only ever responds to category tree navigating actions
    switch(action.type) {
      case "UP": {
        this.up();
        break;
      } case "ROOT": {
        this.root();
        break;
      }
    }
  }

  // +-------------------------------------------------------------------+
  //                          MAINPULATING DATA
  // +-------------------------------------------------------------------+

  up() {
    // this can only ever be called if we're not at the root
    // sets the current category/thing to the previous one, sets the current children to its children (archivist finds them for us) and removes it from the list of previous categories
  }

  root() {
    // sets the current category to the root category and the children to the root's children.
    // empties the array of previous categories.
  }

}

const thingStore = new ThingStore;

dispatcher.register(thingStore.handleActions.bind(thingStore));
export default thingStore;
