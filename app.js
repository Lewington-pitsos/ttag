const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/thing/info/:id', function(req, res) {
  const archivist = new backend.Archivist();
  archivist.getThingInfo(req.params.id).then(function() {
    res.send(archivist.result);
  })
})

app.post('/thing/:id/approve/', function(req, res) {
  const librarian = new backend.Librarian();
  librarian.approveThing(req.params.id, 1).then(function() {
    res.send(200);
  })
})

app.get('/thing/new/', function(req, res) {
  const values = {
    name: 'Meditations',
    image: 'marcus.jpg',
    text: 'thid book is really good. it teaches you a lot of funyk shit',
    approval: 10
  }

  const librarian = new backend.Librarian();
  librarian.insertNewThing(values, 1000).then(function() {
    res.send(200);
  });
})

app.get('/categories/:category_id/add/things/:thing_id', function(req, res) {
  const librarian = new backend.Librarian();
  librarian.addThingToCategory(req.params.category_id, req.params.thing_id).then(function() {
    res.send(200);
  });
})

app.post('/categories/things/remove', function(req, res) {
  console.log(req);
  console.log(req.body);
  console.log(req.payload);

  const librarian = new backend.Librarian();
  librarian.removeThingFromCategory(req.body.categoryId, req.body.thingId).then(function() {
    res.send(200);
  });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
