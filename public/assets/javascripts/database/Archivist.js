/*

This guy is basically in charge of returning data from the database in a form palitable to our precious frontend. Basically just a javascript wrapper for a bunch of SELECT queries

As a general strategy for accessing the results of queries:

  - each call to a select query will return a promise
  - also it will assign the results of that select query to a property on the archivist instance
  - once the promise is fulfilled, the query results can be accessed through that property

*/

const { Pool, Client } = require('pg');
const secrets = require('./db.secret.js');
const queries = require('./queries/selects');

module.exports = function Archivist() {
  // setup a deafult connection pool on initialization
  // saves an object containing all the queries the app could possibly need


  // on instantiation the queries mixin is added to each Archivist obejct
  Object.assign(this, queries);
  this.result = null;

  this.pool = new Pool({
    user: secrets.ttagUser,
    password: secrets.ttagPass,
    database: 'ttag'
  });

  /*
  INPUT: (id) an id represneting the id of a relation row
  INPUT: (callback) a function which will return the required SELECT query as a string

  DOES: executes the query and saves the result to the result property of Archivist

  OUTPUT: a promise that is fulfilled as soon as the query is executed and finished
  */
  this.executeQuery = function(id, callback) {
    // returns a promise that is fulfilled once the query is complete and its result has been saved
    // gerates a query string useing the passed in id and callback
    // gets the pool to execute the query, saves the result, and fulfills the promise
    const self = this;
    return new Promise(function(resolve, reject) {

      const query = callback(id);
      self.pool.query(query).then(function(res, err) {

        self.result = res;
        resolve();
      })

    })
  }

  this.previousCategory = function(id) {
  }

  // +-------------------------------------------------------------------+
  //                         EXPOSED METHODS
  // +-------------------------------------------------------------------+

  this.getCurrentCategory = function(id) {
    // triggers the execution of the appropriate query
    // once it has been executed and its result saved to the result property we return that property
    return this.executeQuery(id, this.catContents.bind(this));
  }


  /**
  * INPUT: id (intger) the id of the thing whose info you want
  * DOES: executes a single query to retrive all of the information about the comments and similar things for the given thing, and saves that data to the results object
  * OUTPUT: a promise that is resolved as soon as the query results have been saved
  */
  this.getThingInfo = function(id) {
    // initialises an object and returns a promise
    // executes a query to return all the comments for the current thing, and once this is finished, saves them to the data object
    // executes a query to return all the similar things, and saves this to data once it is done
    // finially, saves data as the overall result of the query and resolves the promise
    const data = {};
    const self = this;

    return new Promise(function(resolve, reject) {
      self.getThingComments(id).then(function() {
        data.comments = self.result.rows;

        self.getSimilarThings(id).then(function() {
          data.similarThings = self.result.rows;
          self.result = data;
          resolve();

        })
      })
    })
  }

  this.getThingComments = function(id) {
    return this.executeQuery(id, this.thingComments.bind(this));
  }


  this.getSimilarThings = function(id) {
    return this.executeQuery(id, this.similarThings.bind(this));
  }


  /*
  INPUT: an id representing the id of some categroy

  DOES: executes Archivist methods to retrive thet data of that category and also the data of its children

  OUTPUT: a promise that will be fulfilled when both of these queires have been executed and their data saved
  */
  this.getNodeData = function(id) {
    // creates a node data object
    // executes the query for the current category's data and then the query for it's children, saving the results of each to the node data object
    // depending on the contents of the first category we either query for categories or things in the second query
    // finally the result object on Archivist is set to the node data object

    var callback;
    const self = this;
    const nodeData = {};

    return new Promise(function(resolve, reject) {
      self.getCurrentCategory(id).then(function() {
        const node = self.result.rows[0];
        nodeData.node = node;

        if (node.thing_category) {
          callback = self.childThings.bind(self);
        } else {
          callback = self.childCats.bind(self);
        }

        self.executeQuery(id, callback).then(function() {
          nodeData.children = self.result.rows;
          self.result = nodeData;
          console.log(nodeData);
          resolve();
        });
      });
    });
  }
}
