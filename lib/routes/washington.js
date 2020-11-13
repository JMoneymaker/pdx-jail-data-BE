const { Router } = require('express');
const WashDetention = require('../models/WashDetention');

module.exports = Router() 

  .get('/dailyAgeCount', (req, res, next) => {
    WashDetention
      .dailyAgeCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyGenderCount', (req, res, next) => {
    WashDetention
      .dailyGenderCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyFacilityCount', (req, res, next) => {
    WashDetention
      .dailyFacilityCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyRaceCount', (req, res, next) => {
    WashDetention
      .dailyRaceCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyAgencyCount', (req, res, next) => {
    WashDetention
      .dailyAgencyCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyDetentionAverageByRace', (req, res, next) => {
    WashDetention
      .dailyDetentionAverageByRace()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/twoDayTotals', (req, res, next) => {
    WashDetention
      .getTwoDayTotals()
      .then(data => res.send(data))
      .catch(next);
  });

// .get('/dailyChargeCategory', (req, res, next) => {
//   WashDetention
//     .dailyChargeCategory()
//     .then(data => res.send(data))
//     .catch(next);
// })

// .get('/allChargeDescriptions', (req, res, next) => {
//   WashDetention
//     .getAllChargeDesciptions()
//     .then(data => res.send(data))
//     .catch(next);
// })

// .get('/dailyChargeDescriptions', (req, res, next) => {
//   WashDetention
//     .dailyChargeDescriptions()
//     .then(data => res.send(data))
//     .catch(next);
// })

// .get('/top20charges', (req, res, next) => {
//   WashDetention
//     .getTop20Charges()
//     .then(data => res.send(data))
//     .catch(next);
// });

