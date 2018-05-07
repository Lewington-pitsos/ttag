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
    // stores current category/thing id (starting at 1)
    // stores whether or not it is a thing
    this.id = 1;
    this.thing = false;
    this.breadcrumbs = [];

    // stores the current category/thing as an object (so like, JSON compatible)
    // stores all it's children (if it has any) in an array of like objetcs
    // stores an array of all the previously navigated-to categories
    this.node = {};
    this.children = [];

    // PERMENENTLY stores some sort of identifier that is used to check whether or not the current category/thing is the root

    // on instantiation, retrives all the data for the current node (and children)
    this.getNodeData();
  }

  getRootInfo() {
    // returns a state containing just an indicator of whether or not we are at the root category
    return { atRoot: this.id == 1 };
  }

  getRootDistance() {
    return { rootDistance: this.breadcrumbs.length }
  }

  getTypeInfo() {
    // returns a state containing just an indicator of whether or not we are at a Thing (rather than a category)
    return { atThing: this.thing };
  }

  getCategoryInfo() {
    // returns a state represneting the information on the current category and all the information on it's child node
    return {
      category: {
        title: this.node.name,
        id: this.node.id
      },
      thingCategory: this.node.thing_category,
      children: this.children
    };
  }

  handleActions(action) {
    // only ever responds to category tree navigating actions
    switch(action.type) {
      case 'UP': {
        this.goUp();
        break;
      } case 'ROOT': {
        this.goRoot();
        break;
      } case 'SWITCH_ABOUT': {
        this.getNodeData();
      } case 'GOTO': {
        this.goTo(action.id, action.thing);
      }
    }
  }

  // +-------------------------------------------------------------------+
  //                          MAINPULATING DATA
  // +-------------------------------------------------------------------+

  goUp() {
    // this can only ever be called if we're not at the root
    // sets the current node id to the previous id (through breadcrumbs) and removes that id from breadcrumbs
    // uses the database to get the current node's data and that of its children
    this.id = this.breadcrumbs.pop();
    this.getNodeData();
  }

  goRoot() {
    // sets the current category to the root category and the children to the root's children.
    // empties the array of previous categories.
  }

  goTo(id, thing) {
    // passes the old id into breadcrumbs and sets the current id to the passed in node
    // executes a query to set the node an children properties of this store to the correct values, given the current id
    // the exact queries vary depending on whether we are at a thing or a category
    this.breadcrumbs.push(this.id);
    this.id = id;
    if (thing) {
      console.log('we need to retrive the data for a thing');
    } else {
      this.getNodeData();
    }
  }


  // +-------------------------------------------------------------------+
  //                 RETRIVING DATA FROM SERVER
  // +-------------------------------------------------------------------+

  getNodeData() {
    // makes an ajax request to the server with the current category or thing id
    // the request should return some json data with the details of the current node plus the details of its children
    // the returned data is saved to this store
    const request = new XMLHttpRequest();
    request.open('GET', '/node/' + this.id, true);
    request.send();

    const self = this;
    request.onreadystatechange = function(){
      if (request.readyState == 4) {
        console.log(request.responseText);
        const response = JSON.parse(request.responseText);
        self.node = response.node;
        self.children = response.children;
        console.log(self.children);
        self.emit('change');
      }
    };
  }
}



const thingStore = new ThingStore;

dispatcher.register(thingStore.handleActions.bind(thingStore));
export default thingStore;
