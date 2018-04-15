const { Pool, Client } = require('pg');
const secrets = require('./db.secret.js');
const queries = require('./queries/TableSetup')

function TableSetup() {
  // all the different queries for actually setting up the tables are defiend as properties on the function body and stored in a seperate file so everything doesn't look like cancer
  this.dropArray = queries.drop;
  this.setupArray= queries.setup;
  this.queryArray = [];

  // a new conncetion using the ttag user and database
  this.pool = new Pool({
    user: secrets.setupUser,
    password: secrets.setupPass,
    database: secrets.setupDb
  });

  this.tablesExist = function() {
    // a check of whether the tables are set up already
    // the result (bool) is saved to a variable for later
    // async
  }


  this.dropTables = function() {
    // sets the query array to the table dropping query array and starts the recursive executeQuery calls from index 0
  }

  this.setupTables = function() {
    // sets the query array to the table creating query array and starts the recursive executeQuery calls from index 0
  }

  this.executeQuery = function(promse, index) {
    // uses the passed in index to extract the next query from the query array
    // if this query is null, ends the current database connection as soon as the promise is fulfilled
    // otherwise executes the query as soon as the passed in promise is fulfilled and then passes the promise resulting from THAT query to a new executeQuery call, along with an incremented index
  }

  // +-------------------------------------------------------------------+
  //                         EXPOSED METHODS
  // +-------------------------------------------------------------------+

  this.setupIfNeeded = function() {
    // checks if the tables exist already
    // exits if they do
    // otherwise goes ahead and sets every table up
  }

  this.dropIfNeeded = function() {
    // checks if the tables exist already
    // exits if they don't exist
    // otherwise goes ahead and drops every table
  }

}

const tab = new TableSetup();

console.log(tab);
