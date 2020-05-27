const { Router } = require('express');
const WashScrape = require('../models/WashScrape');

module.exports = Router() 

// .get('/', (req, res, next) => {
//   WashScrape
//     .find()
//     .then(detentions => res.send(detentions))
//     .catch(next);
// })

  .get('/dailyAgeCount', (req, res, next) => {
    WashScrape
      .dailyAgeCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyFacilityCount', (req, res, next) => {
    WashScrape
      .dailyFacilityCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyRaceCount', (req, res, next) => {
    WashScrape
      .dailyRaceCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyAgencyCount', (req, res, next) => {
    WashScrape
      .dailyAgencyCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyDetentionAverageByRace', (req, res, next) => {
    WashScrape
      .dailyDetentionAverageByRace()
      .then(data => res.send(data))
      .catch(next);
  });
