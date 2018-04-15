const express = require('express');

const app = express();

const backend = require('./public/assets/backend');


// this is the root directory for the purpose of requiring static files
app.use(express.static('public'))

// this sets the response for the '/' rout
// NOTE: files served MUST have ABSOLOUTE paths (relative to this file, not the root directory defined above)
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.get('/data', function(req, res) {
  console.log(backend);
  console.log(backend.DbSetup);
  res.send(backend.DbSetup);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
