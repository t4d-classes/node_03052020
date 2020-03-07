var { URL } = require('url');

const getBaseUrl = (req) => {

  const [ host, port ] = req.get('host').split(':');

  const url = new URL();
  url.protocol = req.protocol;
  url.host = host;
  url.port = req.get('port') ?? port ?? 80;

  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
  });
};


module.exports = {
  getBaseUrl,
};