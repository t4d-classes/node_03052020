const fs = require('fs');

const _logger = {};

class Logger {

  constructor(logFile) {
    console.log('creating a new logger');
    this._logFile = logFile;
  }

  log(message) {

    const time = new Date().toLocaleString();

    fs.appendFile(
      this._logFile,
      time + ' ' + message + '\n',
      'utf8',
      () => null,
    );
  }

}

module.exports = {
  create: (logFile) => {

    if (!_logger[logFile]) {
      _logger[logFile] = new Logger(logFile);
    }

    return _logger[logFile];
  },
};
