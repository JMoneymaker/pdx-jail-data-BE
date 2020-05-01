const { Router } = require('express');
const ClackScrape = require('../models/ClackScrape');

module.exports = Router() 

  .get('/', (req, res, next) => {
    ClackScrape
      .find()
      .then(response => res.send(response))
      .catch(next);
  })

  .get('/dailyAgeCount', (req, res, next) => {
    ClackScrape
      .dailyAgeCount()
      .then(data  => res.send(data))
      .catch(next);
  });
