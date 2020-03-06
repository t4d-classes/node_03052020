const fs = require('fs');

class Config {

  constructor(configFileName) {
    this._configFileName = configFileName;
  }

  load(callback) {

    if (typeof callback !== 'function') {

      return new Promise((resolve, reject) => {

        fs.readFile(this._configFileName, 'utf8',
        (err, data) => {
  
          if (err) {
            reject(err);
            return;
          }
  
          resolve(JSON.parse(data));
  
        });

      });

    } else {

      fs.readFile(this._configFileName, 'utf8',
      (err, data) => {

        if (err) {
          callback(err);
          return;
        }

        callback(null, JSON.parse(data));

      });

    }


  }
}

module.exports = Config;