const { Router } = require('express');
const MultScrape = require('../models/MultScrape');

module.exports = Router() 

  .get('/', (req, res, next) => {
    MultScrape
      .find()
      .then(detentions => res.send(detentions))
      .catch(next);
  })

  .get('/dailyAgeCount', (req, res, next) => {
    MultScrape
      .dailyAgeCount()
      .then(data  => res.send(data))
      .catch(next);
  });
