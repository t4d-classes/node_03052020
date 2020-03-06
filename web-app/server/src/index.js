const express = require('express');
const proxy = require('express-http-proxy');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// add a 'body' property to the req object
app.use('/api', bodyParser.json());

app.post('/api/colors', (req, res) => {

  fs.promises.readFile('./db.json')
    .then(data => {

      const db = JSON.parse(data);
      const newColor = {
        ...req.body,
        id: Math.max(...db.colors.map(c => c.id), 0) + 1,
      };

      db.colors.push(newColor);

      return fs.promises.writeFile('./db.json', JSON.stringify(db))
        .then(() => newColor);
    })
    .then((newColor) => {
      res.json(newColor);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
      res.end();
    });

});

app.get('/api/colors/:colorId', (req, res) => {

  fs.readFile('./db.json', (err, data) => {

    if (err) {
      console.log(err);
      res.sendStatus(500);
      res.end();
    }

    const db = JSON.parse(data);

    const color = db.colors.find(
      c => c.id === Number(req.params.colorId)
    );
    
    if (!color) {
      res.sendStatus(404);
      res.end();
    }
    
    res.json(color);

  });

});

app.get('/api/colors', (req, res) => {

  fs.readFile('./db.json', (err, data) => {

    if (err) {
      console.log(err);
      res.sendStatus(500);
      res.end();
    }

    const db = JSON.parse(data);
    res.json(db.colors);

  });

});

app.use('/', proxy('localhost:3000'));

app.listen(4200, () => {

  console.log('web server listening on port 4200');

});

