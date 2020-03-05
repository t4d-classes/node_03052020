require('dotenv').config();

const http = require('http');

const Config = require('./services/Config');

const { concatStr } = require('./utils');
const staticContentMiddleware = require('./middleware/staticContent');

const app = ({ port, defaultFile }) => {

  const server = http.createServer(
    staticContentMiddleware(defaultFile));

  server.listen(port, () => {
    console.log(
      concatStr('server started on port: ', port));
  });

};

const configSvc = new Config('./config.json');

configSvc.load((err, config) => {

  if (err) {
    console.log(err.message);
    process.exit();
  }

  app(config);

});

