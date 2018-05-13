/*

Used by 1+ components:

  - Display ( for deciding whether or not to display Nav, based on whether      we're ion the root category)

Retrives from the database and stores the currently viewable category (and all it's children), or thing, plus the previous category if we're not at the root category. Responds to navigation events by walking up and down the category/thing tree.

*/

// othwesie keep executing new commands untill we
import {EventEmitter} from 'events'; // 'events is like, part of nodejs'

import dispatcher from '../dispatcher';

class ThingStore extends EventEmitter {
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
    this.thingInfo = [];

    // PERMENENTLY stores some sort of identifier that is used to check whether or not the current category/thing is the root

    // on instantiation, retrives all the data for the current node (and children)
    this.fetchNodeData();
  }


  // +-------------------------------------------------------------------+
  //                   COMPONENT UPDATING
  // +-------------------------------------------------------------------+

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

  getThingInfo() {
    return {
      'thing': this.node,
      'comments': this.thingInfo
    }
  }


  // +-------------------------------------------------------------------+
  //                      ACTIONS
  // +-------------------------------------------------------------------+

  handleActions(action) {
    // only ever responds to category tree navigating actions
    switch(action.type) {
      case 'UP': {
        this.goUp();
        break;
      } case 'ROOT': {
        this.goRoot();
        break;
      } case 'GOTO': {
        this.goTo(action.id, action.thing);
        break;
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
    this.thing = false;
    this.fetchNodeData();
  }

  goRoot() {
    // sets the current category to the root category and the children to the root's children.
    // empties the array of previous categories.
    this.id = 1;
    this.thing = false;
    this.breadcrumbs = [];
    this.fetchNodeData();
  }

  goTo(id, thing) {
    // passes the old id into breadcrumbs and sets the current id to the passed in node
    // executes a query to set the node an children properties of this store to the correct values, given the current id
    // the exact queries vary depending on whether we are at a thing or a category
    this.breadcrumbs.push(this.id);
    this.id = id;
    if (thing) {
      this.goToChild(id)
    } else {
      this.fetchNodeData();
    }
  }

  /**
  * INPUT: (integer) the id of the child that the user wantrs to navigate to
  * DOES: sets the current node to that child, clears all the other children and gets the comments associates with that child. Emits a change.
  * OUTPUT: NONE
  */
  goToChild(id) {
    // sets the current node to the child whose id matches id
    // resets the children array
    // gathers all the info (comments and similar things) on the current thing and saves it
    // sets the tracker of whether we're currently at a thing to true
    this.thing = true;
    this.node = this.currentThing(id);
    this.children = [];
    const self = this;
    this.fetchThingInfo(id).then(function() {
      self.emit('change');
    })
  }

  currentThing(id) {
    // iterates through all current children and returns the one whose id matches the passed in id.
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].id == id) {
        return this.children[i];
      }
    }

    return null;
  }

  // +-------------------------------------------------------------------+
  //                 RETRIVING DATA FROM SERVER
  // +-------------------------------------------------------------------+

  fetchNodeData() {
    // makes an ajax request to the server with the current category or thing id
    // the request should return some json data with the details of the current node plus the details of its children
    // the returned data is saved to this store
    const request = new XMLHttpRequest();
    request.open('GET', '/node/' + this.id, true);
    request.send();

    const self = this;
    request.onreadystatechange = function(){
      if (request.readyState == 4) {
        const response = JSON.parse(request.responseText);
        self.node = response.node;
        console.log(response.children);
        self.children = response.children;
        self.emit('change');
      }
    };
  }

  fetchThingInfo(id) {
    console.log(id);
    const self = this;
    return new Promise(function(resolve, error) {
      const request = new XMLHttpRequest();
      request.open('GET', '/thing/info/' + id, true);
      request.send()

      request.onreadystatechange = function(){
        if (request.readyState == 4) {
          const response = JSON.parse(request.responseText);
          self.thingInfo = response.rows;
          resolve();
        }
      };
    })
  }
}



const thingStore = new ThingStore;

dispatcher.register(thingStore.handleActions.bind(thingStore));
export default thingStore;
