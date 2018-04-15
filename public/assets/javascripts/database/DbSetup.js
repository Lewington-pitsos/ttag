const { Pool, Client } = require('pg');
const secrets = require('./db.secret.js');
/*

This is an ordinary javascript object tasked with setting up (and tearing down) the (whole) database for our. It doesn't concern itself with tables at all, it just sets up the database from scratch if it doesn't exist yet, or if it does, DbSetup does nothing. it logs a bunch of info.

Exposed methods:

  - setupIfNeeded: sets up the database and user if either doesn't exist yet.   Otherwise does nothing

  - dropIfNeeded: destroys the database and user if both exist currently. Otherwise does nothing

*/

module.exports = function DbSetup() {

  // just a bunch of values for making queries.
  const databaseName = 'ttag';
  const makeDbQuery = `CREATE DATABASE ${databaseName}`;
  const makeUserQuery = `CREATE ROLE ${secrets.ttagUser} WITH PASSWORD '${secrets.ttagPass}' LOGIN;`;
  const dropUserQuery = `DROP ROLE ${secrets.ttagUser};`;
  const dropDbQuery = `DROP DATABASE ${databaseName};`;

  this.connected = false; // tracks whether or not we can connect to the database;

  // first up: we want to create a new pool for connecting to the database
  // by default configured to use the portgres user and the ttag database
  this.ttagPool = new Pool({
    user: secrets.ttagUser,
    password: secrets.ttagPass,
    database: databaseName
  });

  this.databaseExists = function() {
    // checks whether the default database exists at all and saves the (boolean) result to an attribute
    const self = this;
    return new Promise(function(resolve, error) {
      self.ttagPool.query('SELECT NOW()', (err, res) => {
        console.log(err, res);
        self.ttagPool.end();
        self.connected = (err == undefined);
        resolve('yay')
      });
    });
  }

  this.setupIfNeeded = function() {
    // checkes whether or not the ttag database exists.
    // if so we just exit
    // otherwise we create the database, and then exit.
    const self = this;
    this.databaseExists().then(function() {
      if (!self.connected) {
        self.executeRootQueries(makeUserQuery, makeDbQuery);
      }
    })

  }

  this.executeRootQueries = function(userQuery, dbQuery) {
    // first we create a database connection with root privelages
    this.makeSetupPool();
    // executes the user-related query and then the database relaetd query, killing the connection when the latter finishes
    this.setupPool.query(userQuery, (err, res) => {
      console.log(err, res);
      this.setupPool.query(dbQuery, (err, res) => {
        console.log(err, res);
        this.setupPool.end();
      });
    });
  }

  this.makeSetupPool = function() {
    // creates a new pool for connecting as the root database user so we can set up a new database
    this.setupPool = new Pool({
      user: secrets.setupUser,
      password: secrets.setupPass,
      database: secrets.setupDb
    })
  }

  this.dropIfNeeded = function() {
    // firstw e check if we can connect to the database
    // if not, we just exit
    // if we can we execute DROP queries and then exit
    const self = this;
    this.databaseExists().then(function() {
      if (self.connected) {
        self.executeRootQueries(dropUserQuery, dropDbQuery);
      }
    });
  }

}
