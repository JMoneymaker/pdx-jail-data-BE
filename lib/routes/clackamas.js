const { Router } = require('express');
const ClackDetention = require('../models/ClackDetention');

module.exports = Router() 

  .get('/dailyAgeCount', (req, res, next) => {
    ClackDetention
      .dailyAgeCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyGenderCount', (req, res, next) => {
    ClackDetention
      .dailyGenderCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyFacilityCount', (req, res, next) => {
    ClackDetention
      .dailyFacilityCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyRaceCount', (req, res, next) => {
    ClackDetention
      .dailyRaceCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyDetentionAverageByRace', (req, res, next) => {
    ClackDetention
      .dailyDetentionAverageByRace()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/twoDayTotals', (req, res, next) => {
    ClackDetention
      .getTwoDayTotals()
      .then(data => res.send(data))
      .catch(next);
  });


  

// .get('/dailyChargeCategory', (req, res, next) => {
//   ClackDetention
//     .dailyChargeCategory()
//     .then(data => res.send(data))
//     .catch(next);
// })

// .get('/allChargeDescriptions', (req, res, next) => {
//   ClackDetention
//     .getAllChargeDesciptions()
//     .then(data => res.send(data))
//     .catch(next);
// })

// .get('/dailyChargeDescriptions', (req, res, next) => {
//   ClackDetention
//     .dailyChargeDescriptions()
//     .then(data => res.send(data))
//     .catch(next);
// })

// .get('/top20charges', (req, res, next) => {
//   ClackDetention
//     .getTop20Charges()
//     .then(data => res.send(data))
//     .catch(next);
// });



