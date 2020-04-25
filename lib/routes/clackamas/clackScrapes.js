const { Router } = require('express');
const ClackScrape = require('../../models/ClackScrape');

module.exports = Router() 

  .get('/', (req, res, next) => {
    ClackScrape
      .find()
      .then(detentions => res.send(detentions))
      .catch(next);
  });
