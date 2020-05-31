const { Router } = require('express');
const MultScrape = require('../models/MultScrape');

module.exports = Router() 

// .get('/', (req, res, next) => {
//   MultScrape
//     .find()
//     .then(detentions => res.send(detentions))
//     .catch(next);
// })

  .get('/dailyAgeCount', (req, res, next) => {
    MultScrape
      .dailyAgeCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyGenderCount', (req, res, next) => {
    MultScrape
      .dailyGenderCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyFacilityCount', (req, res, next) => {
    MultScrape
      .dailyFacilityCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyRaceCount', (req, res, next) => {
    MultScrape
      .dailyRaceCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyAgencyCount', (req, res, next) => {
    MultScrape
      .dailyAgencyCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyDetentionAverageByRace', (req, res, next) => {
    MultScrape
      .dailyDetentionAverageByRace()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/dailyChargeCategory', (req, res, next) => {
    MultScrape
      .dailyChargeCategory()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('./allChargeDescriptions', (req, res, next) => {
    MultScrape
      .getAllChargeDesciptions()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/dailyChargeDescriptions', (req, res, next) => {
    MultScrape
      .dailyChargeDescriptions()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/top20charges', (req, res, next) => {
    MultScrape
      .getTop20Charges()
      .then(data => res.send(data))
      .catch(next);
  });
