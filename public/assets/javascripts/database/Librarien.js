/*

Essentially just a wrapper for a bunch of Insert queries. It starts up a connection as the ttag user, performs a bunch of queries and then quietly kills itself once the queries are finished, returning whether or not there was any kind of error.

*/

const Q = require('q');
const inserts = require('./inserts');

function Librarian() {
  // creates a database connection as the ttag user

  /*
  INPUT: a string (relation) specifying the relation name in question
  INPUT: an object (inserts) specifying attributes (object keys) and values (object values) to be inserted

  OUTPUT: a string representing a query which, if executed in the right database, will insert the right values to the specified relation.
  */
  this.insertInto = function(relation, inserts) {
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
    return `INSERT INTO ${relation} (${names}) VALUES(${values});`
  }


  /*
  INPUT: an object (inserts)
    - keys: strings or symbols representing relation names
    - values: arrays of objects, each object representing a mapping of attributes to values for insertion
      - keys: attribute names
      - values: values

  OUTPUT: a promise that gets fulfilled as soon as all the insert queries are finished
  */
  this.insertAll = function(inserts) {
    // iterates through every key-value pair from inserts
    // for each generates a query string for every insert object in the array of insert objects
    // each query string is executed (not necesserily in sequence, bugger that)
    // once all queries have finished, the returned promise is fulfilled
    const self = this;
    return new Promise(function(resolve, reject) {
      const promises = [];

      inserts.forEach(function(relationName) {
        var relationInserts = inserts[relationName];
        relationInserts.forEach(function(relationInsert) {
          var query = this.insertInto(relationName, insert);
          promises.push(self.executeQuery(query));
        })
      })

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
    return new Promise(function(resolve, error) {
      self.pool.query(query, (err, res) => {
        resolve();
      });
    });
  }

  // +-------------------------------------------------------------------+
  //                         EXPOSED METHODS
  // +-------------------------------------------------------------------+

  this.insertTestData = function() {
    // just calls insertAll on the test data object
    this.insertAll(inserts.testData);
  }


}
