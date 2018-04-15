/*

This guy is basically in charge of returning data from the database in a form palitable to our precious frontend. Basically just a javascript wrapper for a bunch of SELECT queries

*/

function Archivist() {
  // setup a deafult connection pool on initialization
  // saves an object containing all the queries the app could possibly need

  this.categoryContents = function(id) {
    // gets the pool to execute the categoryContents query for the passed in id
  }

  this.previousCategory = function(id) {

  }

}
