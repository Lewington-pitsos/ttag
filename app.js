const express = require('express');

const app = express();

const backend = require('./public/assets/backend');


// this is the root directory for the purpose of requiring static files
app.use(express.static('public'))

// this sets the response for the '/' rout
// NOTE: files served MUST have ABSOLOUTE paths (relative to this file, not the root directory defined above)
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.get('/setup', function(req, res) {
  // first setup the database if it isn't set up already
  // then setup the tables if they aren't already
  // finally we return something to signify whether the database is now successfully set up
  const dbSetup = new backend.DbSetup();
  dbSetup.setupIfNeeded();

  const relationSetup = new backend.RelationSetup();
  relationSetup.setupIfNeeded();

  res.send(true);
})

app.get('/data/test', function(req, res) {
  // first setup the database if it isn't set up already
  // then setup the tables if they aren't already
  // finally we return something to signify whether the database is now successfully set up
  const dbSetup = new backend.DbSetup();
  dbSetup.setupIfNeeded();

  const relationSetup = new backend.RelationSetup();
  relationSetup.setupIfNeeded();

  res.send(true);
})

app.get('/node/:id', function(req, res) {
  const archivist = new backend.Archivist();
  archivist.getNodeData(req.params.id).then(function() {
    res.send(archivist.result);
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
