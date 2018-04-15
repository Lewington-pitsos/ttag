const { Pool, Client } = require('pg')

/*

This is an ordinary javascript object tasked with setting up (and tearing down) the (whole) database for our. It doesn't concern itself with tables at all, it just sets up the database from scratch if it doesn't exist yet, or if it does, DbSetup does nothing.


*/

module.exports = {
  lol: 'oooool'
}



/*
DbSetup() {
  constructor(passsword) {
    // starts by creating a Client and innitializing a connection with the database
    // it connects to a default database because we have to assume at this point we're dealing with a fresh postgres install.
    this.pool = new Pool({
      user: 'postgres'
    })
  }
}
*/
