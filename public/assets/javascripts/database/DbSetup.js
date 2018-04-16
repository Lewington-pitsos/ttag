const { Pool, Client } = require('pg');
const secrets = require('./db.secret');
/*

This is an ordinary javascript object tasked with setting up (and tearing down) the (whole) database for our. It doesn't concern itself with tables at all, it just sets up the database from scratch if it doesn't exist yet, or if it does, DbSetup does nothing. it logs a bunch of info.

Exposed methods:

  - setupIfNeeded: sets up the database and user if either doesn't exist yet.   Otherwise does nothing

  - dropIfNeeded: destroys the database and user if both exist currently. Otherwise does nothing

*/

module.exports = function DbSetup() {

  // +-------------------------------------------------------------------+
  //                          DEFAULT VALUES
  // +-------------------------------------------------------------------+

  // just a bunch of values for making queries.
  const databaseName = 'ttag';
  const makeDbQuery = `CREATE DATABASE ${databaseName}`;
  const makeUserQuery = `CREATE ROLE ${secrets.ttagUser} WITH PASSWORD '${secrets.ttagPass}' LOGIN;`;
  const grantAccessQuery = `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${secrets.ttagUser};`;

  const dropUserQuery = `DROP ROLE ${secrets.ttagUser};`;
  const dropDbQuery = `DROP DATABASE ${databaseName};`;

  this.connected = false; // tracks whether or not we can connect to the database;

  // a new pool for connecting to the database configured to use the predefined ttag user and the ttag database
  this.ttagPool = new Pool({
    user: secrets.ttagUser,
    password: secrets.ttagPass,
    database: databaseName
  });


  this.databaseExists = function() {
    // checks whether the default database exists at all and saves the (boolean) result to an attribute
    // yes it is async so watch out
    const self = this;
    return new Promise(function(resolve, error) {
      self.ttagPool.query('SELECT NOW()', (err, res) => {
        console.log(err, res);
        self.ttagPool.end();
        self.connected = (err == undefined);
        resolve();
      });
    });
  }

  // +-------------------------------------------------------------------+
  //                    EXECUTING QUERIES AS ROOT
  // +-------------------------------------------------------------------+


  this.executeRootQueries = function(userQuery, dbQuery, permQuery) {
    // first we create a database connection with root privelages
    this.makeSetupPool();
    // executes the user-related query and then the database relaetd query, killing the connection when the latter finishes
    this.setupPool.query(userQuery, (err, res) => {
      console.log(err, res);
      this.setupPool.query(dbQuery, (err, res) => {
        console.log(err, res);
        if (permQuery) {
          this.setupPool.query(permQuery, (err, res) => {
            console.log(err, res);
            this.setupPool.end();
          })
        } else {
          this.setupPool.end();
        }
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


  // +-------------------------------------------------------------------+
  //                         EXPOSED METHODS
  // +-------------------------------------------------------------------+

  this.setupIfNeeded = function() {
    // checkes whether or not the ttag database exists.
    // if so we just exit
    // otherwise we create the database, and then exit.
    const self = this;
    this.databaseExists().then(function() {
      if (!self.connected) {
        self.executeRootQueries(makeUserQuery, makeDbQuery, grantAccessQuery);
      }
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

/*
const set = new DbSetup();

console.log(set);
console.log(secrets);
set.setupIfNeeded();

*/
