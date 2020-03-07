const express = require('express');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const _ = require('lodash');

const jwtauth = require('../middleware/jwtauth');

const {
  getBaseUrl
} = require('../util');

const Users = require('../services/users');

const router = express.Router();
router.post('/users/register', async (req, res) => {
  const {
    db,
    saltRounds
  } = req.app.get('context');
  const {
    username,
    password
  } = req.body;

  if (db.get('users').filter({
    username
  }).value().length > 0) {
    res.json({
      err: 'username not available',
      registered: false
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = db.get('users').insert({
      username,
      password: hashedPassword
    }).write();
    res.json({
      userId: result.id,
      registered: true
    });
  } catch (err) {
    res.json({
      err: err.message,
      registered: false
    });
  }
});
router.post('/users/login', async (req, res) => {
  const {
    db,
    secret
  } = req.app.get('context');
  const {
    username,
    password
  } = req.body;
  const user = db.get('users').filter({
    username
  }).first().value();

  try {
    const same = await bcrypt.compare(password, user.password);

    if (!same) {
      res.clearCookie('token').json({
        err: 'password does not match'
      });
      return;
    }

    const payload = {
      username
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: '1m'
    });
    res.cookie('token', token, {
      httpOnly: true
    }).sendStatus(200);
  } catch (err) {
    res.clearCookie('token').json({
      err: err.message
    });
  }
});
router.get('/users/logout', (_, res) => {
  res.clearCookie('token').sendStatus(200);
});
router.get('/users/verify', jwtauth, (_, res) => {
  res.sendStatus(200);
});
router.route('/users').all(jwtauth).get((req, res) => {
  const {
    db
  } = req.app.get('context');
  const users = new Users(db);
  res.json(users.all());
}).post(async (req, res) => {
  const {
    db,
    saltRounds
  } = req.app.get('context');
  const user = req.body;
  const users = new Users(db);

  try {
    const newUser = users.append(user, saltRounds);
    res.set('Location', getBaseUrl(req) + '/' + encodeURIComponent(newUser.id));
    res.json(_.omit(newUser, ['password']));
  } catch (err) {
    res.json({
      err: err.message,
      registered: false
    });
  }
});
router.route('/users/:userId').all(jwtauth).get((req, res) => {
  const {
    db
  } = req.app.get('context');
  const user = db.get('users').getById(Number(req.params.userId));

  if (!user) {
    res.statusCode(404);
    return;
  }

  res.json(user);
}).put((req, res) => {
  const {
    db
  } = req.app.get('context');
  db.get('users').updateById(Number(req.params.userId), req.body);
  res.sendStatus(204);
}).delete((req, res) => {
  const {
    db
  } = req.app.get('context');
  db.get('users').removeById(Number(req.params.userId));
  res.sendStatus(204);
});
module.exports = router;