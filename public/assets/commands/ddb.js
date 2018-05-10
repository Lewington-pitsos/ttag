const DbSetup =  require('../javascripts/database/DbSetup');

const db = new DbSetup;

db.dropIfNeeded();

//db.setupIfNeeded();
