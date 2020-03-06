require('dotenv').config();

const http = require('http');

const Config = require('./services/Config');

const { concatStr } = require('./utils');
const createWebApp = require('./services/createWebApp');
const accessLoggerMiddleware = require('./middleware/accessLogger');
const staticContentMiddleware = require('./middleware/staticContent');

const app = ({ port, defaultFile, logger }) => {

  const webApp = createWebApp();
  webApp.use(accessLoggerMiddleware(logger));
  webApp.use(staticContentMiddleware(defaultFile));

  const server = http.createServer(webApp);

  server.listen(port, () => {
    console.log(
      concatStr('server started on port: ', port));
  });

};

const configSvc = new Config('./config.json');

// configSvc.load((err, config) => {

//   if (err) {
//     console.log(err.message);
//     process.exit();
//   }

//   app(config);

// });

configSvc.load()
  .then(config => {

    const logger = require('./services/Logger')
      .create(config.logFile);

    logger.log('starting application');

    config.logger = logger;

    app(config);
  })
  .catch(err => {
    console.log(err.message);
    process.exit();
  });
