const DbSetup =  require('./javascripts/database/DbSetup');
const RelationSetup =  require('./javascripts/database/RelationSetup');
const Librarian = require('./javascripts/database/Librarian');
const Archivist = require('./javascripts/database/Archivist');

console.log(RelationSetup);

module.exports = {
  DbSetup: DbSetup,
  RelationSetup: RelationSetup,
  Archivist: Archivist
}


const rel = new RelationSetup;

//rel.dropIfNeeded();

//rel.setupIfNeeded();

//console.log('lol');

const lib = new Librarian

lib.insertTestData();
