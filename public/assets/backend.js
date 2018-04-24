const DbSetup =  require('./javascripts/database/DbSetup');
const RelationSetup =  require('./javascripts/database/RelationSetup');
const Librarian = require('./javascripts/database/Librarian')

console.log(RelationSetup);

//module.exports = {
//  DbSetup: DbSetup,
//  RelationSetup: RelationSetup
//}

const rel = new RelationSetup;

//rel.dropIfNeeded();

rel.setupIfNeeded();

console.log('lol');

const lib = new Librarian

lib.insertTestData();
