const DbSetup =  require('./javascripts/database/DbSetup');
const RelationSetup =  require('./javascripts/database/RelationSetup');

console.log(RelationSetup);

module.exports = {
  DbSetup: DbSetup,
  RelationSetup: RelationSetup
}
