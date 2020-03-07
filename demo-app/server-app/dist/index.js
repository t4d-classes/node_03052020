var _process$env$PORT, _process$env$SALT_ROU;

require('dotenv').config();

const {
  isNil
} = require('lodash');

if (isNil(process.env.JWTSECRET)) {
  console.log('JWT Secret Environment Variable is required.');
  process.exit();
}

const proxy = require('express-http-proxy');

const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const jwtauth = require('./middleware/jwtauth');

const usersRouter = require('./routers/users');

const db = require('./db');

const port = (_process$env$PORT = process.env.PORT) !== null && _process$env$PORT !== void 0 ? _process$env$PORT : 80;
const app = express();
app.set('context', {
  db,
  saltRounds: (_process$env$SALT_ROU = process.env.SALT_ROUNDS) !== null && _process$env$SALT_ROU !== void 0 ? _process$env$SALT_ROU : 10,
  jwtsecret: process.env.JWTSECRET
});
app.set('port', port);
app.use(cookieParser());
app.use('/api', bodyParser.json());
app.use('/api', usersRouter);
app.use('/api/cars', jwtauth, (req, res) => {
  res.json(db.get('cars'));
});
app.use('/', proxy(process.env.CLIENT_PROXY));
app.listen(app.get('port'), () => {
  console.log('server listening on port ' + app.get('port'));
});