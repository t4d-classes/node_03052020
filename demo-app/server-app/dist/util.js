var {
  URL
} = require('url');

const getBaseUrl = req => {
  var _ref, _req$get;

  const [host, port] = req.get('host').split(':');
  const url = new URL();
  url.protocol = req.protocol;
  url.host = host;
  url.port = (_ref = (_req$get = req.get('port')) !== null && _req$get !== void 0 ? _req$get : port) !== null && _ref !== void 0 ? _ref : 80;
  return url.format({
    protocol: req.protocol,
    host: req.get('host')
  });
};

module.exports = {
  getBaseUrl
};