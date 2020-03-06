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

app.put('/api/colors/:colorId', (req, res) => {

  const colorIdParam = Number(req.params.colorId);

  if (colorIdParam < 1 || colorIdParam !== req.body.id) {
    res.sendStatus(400);
    res.end();
    return;
  }

  fs.promises.readFile('./db.json')
    .then(data => {

      const db = JSON.parse(data);
      const updateColor = {
        ...req.body,
        id: colorIdParam,
      };

      const colorIndex = db.colors.findIndex(c => c.id === colorIdParam);
      db.colors[colorIndex] = updateColor;

      return fs.promises.writeFile('./db.json', JSON.stringify(db));
    })
    .then(() => {
      res.sendStatus(204);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
      res.end();
    });

});

app.delete('/api/colors/:colorId', (req, res) => {

  const colorIdParam = Number(req.params.colorId);

  if (colorIdParam < 1) {
    res.sendStatus(400);
    res.end();
    return;
  }

  fs.promises.readFile('./db.json')
    .then(data => {

      const db = JSON.parse(data);

      const colorIndex = db.colors.findIndex(c => c.id === colorIdParam);
      db.colors.splice(colorIndex, 1);

      return fs.promises.writeFile('./db.json', JSON.stringify(db));
    })
    .then(() => {
      res.sendStatus(204);
      res.end();
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

