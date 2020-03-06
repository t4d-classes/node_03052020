const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use('/api/colors', (req, res) => {

  res.json([
    { id: 1, name: 'red' },
    { id: 2, name: 'green' },
    { id: 3, name: 'blue' },
  ]);

});

app.use('/', proxy('localhost:3000'));

app.listen(4200, () => {

  console.log('web server listening on port 4200');

});

