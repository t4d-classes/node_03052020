


const createWebApp = () => {

  const middlewareFns = [];

  const webApp = (req, res) => {

    middlewareFns.forEach(middlewareFn => {
      middlewareFn(req, res);
    });

  };

  webApp.use = (middlewareFn) => {
    middlewareFns.push(middlewareFn);
  };

  return webApp;

};

module.exports = createWebApp;