const { Pool, Client } = require('pg');
const Q = require('q');
const secrets = require('./db.secret.js');
const queries = require('./queries/TableSetup')

function RelationSetup() {
  // all the different queries for actually setting up the tables are defiend as properties on the function body and stored in a seperate file so everything doesn't look like cancer
  this.dropArray = queries.drop;
  this.setupArray= queries.setup;
  this.relationNames = queries.relationNames;
  this.queryArray = [];

  this.relationMissing = false;

  // a new conncetion using the ttag user and database
  this.pool = new Pool({
    user: secrets.ttagUser,
    password: secrets.ttagPass,
    database: 'ttag'
  });

  // +-------------------------------------------------------------------+
  //                   RELATION EXISTANCE CHECKING
  // +-------------------------------------------------------------------+

  this.allRelationsExist = function() {
    // a check of whether the relations are set up already, returns a promise
    // first we assume no relation is missing, then we check each table to see if it is missing (recording any missing relations)
    // if once every relation is checked we fulfill the promise if any relations were missing we'll have recorded as much
    const self = this;
    this.relationMissing = false;
    return new Promise(function(resolve, reject) {
      const promises = []
      self.relationNames.forEach(function(relation) {
        promises.push(self.relationExists(relation));
      })

      Q.all(promises).then(function() {
        resolve();
      })
    });

  }

  this.relationExists = function(name) {
    // tries to derive a relation from the passed in relation and returns a promise
    // if the table doesn't exist an error will be raised, so if an error is raised during the query we record the fact that at least one relation is missing.
    const self = this;
    return new Promise(function(resolve, error) {
      self.pool.query(`SELECT * FROM ${name};`, (err, res) => {
        if (err != undefined) {
          self.relationMissing = true;
        }
        resolve();
      });
    });
  }

  // +-------------------------------------------------------------------+
  //                       RELATION SETUP AND DROPING
  // +-------------------------------------------------------------------+


  this.dropRelations = function() {
    // sets the query array to the table dropping query array and starts the recursive executeQuery calls from index 0
    this.queryArray = this.dropArray;
    this.executeQuery(0);
  }

  this.setupRelations = function() {
    // sets the query array to the table creating query array
    // executes the first query in the query array under a promise and passes that promise into an executeQuery fucntion call along with the index 1
    this.queryArray = this.setupArray;
    this.executeQuery(0);
  }

  this.executeQuery = function(index) {
    // uses the passed in index to extract the next query from the query array
    // if this query is null, ends the current database connection
    // otherwise executes the query and once it finishes, calles executeQuery with the next index along
    const query = this.queryArray[index];
    const self = this;
    if (query) {
      self.pool.query(query)
        .then(function() {
          self.executeQuery(index + 1);
        })
        .catch(function(e) {
          // if there's an error we still want to create or drop all the tables we still can
          console.error(e.stack);
          self.executeQuery(index + 1);
        });

    } else {
      self.pool.end();
    }
  }

  // +-------------------------------------------------------------------+
  //                         EXPOSED METHODS
  // +-------------------------------------------------------------------+

  this.setupIfNeeded = function() {
    // checks if the tables exist already
    // exits if they do
    // otherwise goes ahead and sets every table up
    const self = this;
    this.allRelationsExist().then(function() {
      if (self.relationMissing) {
        self.setupRelations();
      }
    })
  }

  this.dropIfNeeded = function() {
    // checks if the tables exist already
    // exits if they don't exist
    // otherwise goes ahead and drops every table
    const self = this;
    this.allRelationsExist().then(function() {
      if (!self.relationMissing) {
        self.dropRelations();
      }
    })
  }

}

/*

const tab = new RelationSetup();

//tab.dropIfNeeded();

//tab.setupIfNeeded();

//tab.allRelationsExist().then(function() {
//  console.log(tab.relationMissing);
//});

*/
