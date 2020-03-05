const fs = require('fs');

class Config {

  constructor(configFileName) {
    this._configFilName = configFileName;
  }

  load(callback) {

    fs.readFile(this._configFilName, 'utf8',
      (err, data) => {

        if (err) {
          callback(err);
          return;
        }

        callback(null, JSON.parse(data));

      });

  }
}

module.exports = Config;