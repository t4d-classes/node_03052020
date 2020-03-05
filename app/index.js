require('dotenv').config();

const http = require('http');

const { concatStr } = require('./utils');
const staticContentMiddleware = require('./middleware/staticContent');

const app = (port) => {



  const callback = () => {

    const msg = concatStr('server started on port: ', port);

    console.log(msg);

  };

  const server = http.createServer(staticContentMiddleware);

  server.listen(port, callback);

};

app(process.env.PORT || 3050);
