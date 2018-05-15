/*

Not used by any components

sends requests to update data on the server basically.

*/

// othwesie keep executing new commands untill we
import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher';

class AdminStore extends EventEmitter {

  // +-------------------------------------------------------------------+
  //                      GENERIC FLUX STUFF
  // +-------------------------------------------------------------------+

  handleActions(action) {
    // only responds to one action which switches the about-page in and out
    switch(action.type) {
      case "REMOVE_FROM_CATEGORY": {
        this.removeFromCategory(action);
        break;
      }
    }
  }

  // +-------------------------------------------------------------------+
  //                          REQUEST SENDING
  // +-------------------------------------------------------------------+

  removeFromCategory(info) {
    console.log('ad');
    const request = new XMLHttpRequest();
    request.open('POST', `/categories/things/remove/`, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(`{"categoryId":"${info.categoryId}","thingId":"${info.thingId}"}`);
  }
}

const adminStore = new AdminStore;

dispatcher.register(adminStore.handleActions.bind(adminStore));
export default adminStore;
