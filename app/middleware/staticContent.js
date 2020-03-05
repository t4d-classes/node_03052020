const fs = require('fs');
const path = require('path');

const staticContent = (defaultFile) => (req, res) => {

  const indexFileName = path.join(
      __dirname, '..', 'public', defaultFile);

  // callback version
  fs.readFile(indexFileName, 'utf8', (err, data) => {

    if (err) {

      res.statusCode = 500;
      res.end();

      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);

  });

  // // promise version
  // fs.readFile(indexFileName, 'utf8')
  //   .then((data) => {

  //   })
  //   .catch(err => { });

  // // async/await version - promises + generators
  // try {
  //   const data = await fs.readFile(indexFileName, 'utf8');
  // } catch(err) {
    
  // }


};

module.exports = staticContent;

