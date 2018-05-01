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

  /*
  INPUT: an id representing the id of some categroy

  DOES: executes a SELECT query to return the data of all subcategories of that category

  OUTPUT: a promise that will be fulfilled when the result of that query is saved
  */
  this.getSubcategories = function(id) {
    // triggers the execution of the appropriate query
    // once it has been executed and its result saved to the result property we return that property
    return this.executeQuery(id, this.childCats.bind(this))
  }

  this.getCurrentCategory = function(id) {
    // triggers the execution of the appropriate query
    // once it has been executed and its result saved to the result property we return that property
    return this.executeQuery(id, this.catContents.bind(this));
  }

}
