const express = require('express');
const proxy = require('express-http-proxy');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// add a 'body' property to the req object
app.use('/api', bodyParser.json());

app.post('/api/colors', (req, res) => {
  console.log('write the color to the file', req.body);

  res.json(req.body);
})

app.get('/api/colors', (req, res) => {

  fs.readFile('./db.json', (err, data) => {
    const db = JSON.parse(data);
    res.json(db.colors);
  });

});

app.use('/', proxy('localhost:3000'));

app.listen(4200, () => {

  console.log('web server listening on port 4200');

});

