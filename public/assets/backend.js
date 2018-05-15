const DbSetup =  require('./javascripts/database/DbSetup');
const RelationSetup =  require('./javascripts/database/RelationSetup');
const Librarian = require('./javascripts/database/Librarian');
const Archivist = require('./javascripts/database/Archivist');

console.log(RelationSetup);

module.exports = {
  DbSetup: DbSetup,
  RelationSetup: RelationSetup,
  Archivist: Archivist,
  Librarian: Librarian
}

/*
const db = new DbSetup;

//db.setupIfNeeded();

const rel = new RelationSetup;

//rel.dropIfNeeded();

//rel.setupIfNeeded();

const lib = new Librarian

//lib.insertTestData();
*/
