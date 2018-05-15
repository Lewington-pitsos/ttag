/*

Essentially just a wrapper for a bunch of Insert queries. It starts up a connection as the ttag user, performs a bunch of queries and then quietly kills itself once the queries are finished, returning whether or not there was any kind of error.

*/
const { Pool, Client } = require('pg');
const Q = require('q');
const secrets = require('./db.secret.js');
const insertLib = require('./queries/inserts');

module.exports = function Librarian() {

  this.pool = new Pool({
    user: secrets.ttagUser,
    password: secrets.ttagPass,
    database: 'ttag'
  });

  // stores the result of each query just after execution
  this.results = {};

  // creates a database connection as the ttag user

  /*
  INPUT: a string (relation) specifying the relation name in question
  INPUT: an object (inserts) specifying attributes (object keys) and values (object values) to be inserted

  OUTPUT: a string representing a query which, if executed in the right database, will insert the right values to the specified relation.
  */
  this.generateQuery = function(relation, inserts, returnName = 'id') {
    // create empty arrays for the keys and values to be inserted
    var names = [];
    var values = [];

    // populates the arrays with the keys and values (respectively) of inserts
    Object.keys(inserts).forEach(function(key, _) {
      names.push(key);

      // all values are cast as strings and have single quotes added around them so that SQL sees them as strings
      values.push("'" + inserts[key] + "' ");
    })

    // formats the arrays into a query which is then returned
    names = names.join(', ');
    return `INSERT INTO ${relation} (${names}) VALUES(${values}) RETURNING ${returnName};`
  }


  /*
  INPUT: an array (inserts)
    - inserts[0][0]: strings or symbols representing relation names
    - inserts[0][1]: arrays of objects, each object representing a mapping of attributes to values for insertion
      - keys: attribute names
      - values: values

  DOES: a recursive function, executes all inserts for the current relation, waits for them all to finish, and then moves on to the next relation

  OUTPUT: a promise that gets fulfilled as soon as all the insert queries are finished, or instantly if there are no insert queries left to execute
  */
  this.insertAll = function(inserts) {
    // returns a promise
    // grabs the first relation name key from inserts
    // if this is undefined, fulfills the promise
    // otherwise, performs all the associated inserts for that relation, and when all are finished, deletes that relation from the inserts object and calls insertAll again
    // the promise is resolved only when THAT insertAll call is finished

    const self = this;
    return new Promise(function(resolve, reject) {

      var relationName = Object.keys(inserts)[0];

      if (relationName) {

        var relationInserts = inserts[relationName];
        self.insertTo(relationName, relationInserts).then(function() {

          delete inserts[relationName];
          self.insertAll(inserts).then(function() {

            resolve();
          })
        })

      } else {
        resolve();
      }

      // the returned promise is resolved once all the promises are resolvied

    });
  }


  /*
  INPUT: a string or symbol (relation) representing the name of a relation
  INPUT: an array of objects, each object representing a mapping of attributes to values for insertion (inserts)
    - keys: attribute names
    - values: values

  OUTPUT: a promise which is fulfilled once ALL insertions have been made
  */
  this.insertTo = function(relation, inserts) {
    // we return a promise
    // iterate through the inserts array, building a query from it and the relation name, and then calling executeQuery on that query.
    // each query promise is added to an array of promises.
    // when every single promise in that array is fulfilled, we resolve the returned promise
    const self = this;
    return new Promise(function(resolve, reject) {
      const promises = [];

      inserts.forEach(function(insert) {
        var query = self.generateQuery(relation, insert);
        promises.push(self.executeQuery(query));
      });

      // the returned promise os resolved once all the promises are resolvied
      Q.all(promises).then(function() {
        resolve();
      })
    });
  }

  /*
  INPUT: a string representing a well formatted insert query

  OUTPUT: a promise that gets resolved as soon as the query is executed.
  */
  this.executeQuery = function(query) {
    // returns a promise and executes the passed in query string
    // the promise is fulfilled as soon as the query is finished executeing.
    const self = this;
    return new Promise(function(resolve, error) {
      self.pool.query(query, (err, res) => {
        self.result = res;
        resolve();
      });
    });
  }

  // +-------------------------------------------------------------------+
  //                         EXPOSED METHODS
  // +-------------------------------------------------------------------+

  this.insertTestData = function() {
    // just calls insertAll on the test data object
    return this.insertAll(insertLib.testData);
  }

  this.clearAllTables = function() {
    // using an array containing all relation names sorted in safe deletion order, executes a delete query on each relation, and once that is finished, moves to the next relation name and repeats
    // yje root category is never removed
  }

  this.approveThing = function(id, approval) {
    // builds the query, executes it and returns the promise
    const query = this.setApproval(id, approval);
    return this.executeQuery(query);
  }

  /* INPUT: (values) an object
    -> keys: attribute names
    -> values: attribute values
    INPUT: (category_id) the id of the thing's parent category

    DOES: inserts the new values to the things relation
    DOES: adds a new assocaition to thingcategories between the new thing and the parent category

    OUTPUT: a promise which is resolves as soon as the associations are created
  */
  this.insertNewThing = function(values, category_id) {

    // returns a promise
    // inserts the new values to 'things' and returns the id of the new tuple
    // inserts that id and category_id to 'ThingCategories' and THEN resolves the promise
    const self = this;
    return new Promise(function(resolve, reject) {
      console.log(values);

      self.insertTo('things', [values]).then(function() {
        console.log(self.result);
        const id = self.result.rows[0].id;

        self.insertTo('ThingCategories', [{
          category_id: category_id,
          thing_id: id
        }]).then(function() {
          resolve();
        })
      })
    })
  }
}


// var lib = new Librarian();
//
// lib.insertTestData().then(function() {
//   console.log('lol');
// })
