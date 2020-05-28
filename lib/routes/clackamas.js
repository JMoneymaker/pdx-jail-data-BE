const { Router } = require('express');
const ClackScrape = require('../models/ClackScrape');

module.exports = Router() 

// .get('/', (req, res, next) => {
//   ClackScrape
//     .find()
//     .then(response => res.send(response))
//     .catch(next);
// })

  .get('/dailyAgeCount', (req, res, next) => {
    ClackScrape
      .dailyAgeCount()
      .then(data  => res.send(data))
      .catch(next);
  })

// .get('/dailyGenderCount', (req, res, next) => {
//   ClackScrape
//     .dailyGenderCount()
//     .then(data  => res.send(data))
//     .catch(next);
// })

  .get('/dailyFacilityCount', (req, res, next) => {
    ClackScrape
      .dailyFacilityCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyRaceCount', (req, res, next) => {
    ClackScrape
      .dailyRaceCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyDetentionAverageByRace', (req, res, next) => {
    ClackScrape
      .dailyDetentionAverageByRace()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/dailyChargeCount', (req, res, next) => {
    ClackScrape
      .dailyChargeCount()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/dailyChargeDescriptions', (req, res, next) => {
    ClackScrape
      .dailyChargeDescriptions()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/top20charges', (req, res, next) => {
    ClackScrape
      .getTop20Charges()
      .then(data => res.send(data))
      .catch(next);
  });



