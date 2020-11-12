const { Router } = require('express');
const MultDetention = require('../models/MultDetention');

module.exports = Router() 

  .get('/dailyAgeCount', (req, res, next) => {
    MultDetention
      .dailyAgeCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyGenderCount', (req, res, next) => {
    MultDetention
      .dailyGenderCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyFacilityCount', (req, res, next) => {
    MultDetention
      .dailyFacilityCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyRaceCount', (req, res, next) => {
    MultDetention
      .dailyRaceCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyAgencyCount', (req, res, next) => {
    MultDetention
      .dailyAgencyCount()
      .then(data  => res.send(data))
      .catch(next);
  })

  .get('/dailyDetentionAverageByRace', (req, res, next) => {
    MultDetention
      .dailyDetentionAverageByRace()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/dailyChargeCategory', (req, res, next) => {
    MultDetention
      .dailyChargeCategory()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/allChargeDescriptions', (req, res, next) => {
    MultDetention
      .getAllChargeDesciptions()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/dailyChargeDescriptions', (req, res, next) => {
    MultDetention
      .dailyChargeDescriptions()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/top20charges', (req, res, next) => {
    MultDetention
      .getTop20Charges()
      .then(data => res.send(data))
      .catch(next);
  })

  .get('/twoDayTotals', (req, res, next) => {
    MultDetention
      .getTwoDayTotals()
      .then(data => res.send(data))
      .then(console.log)
      .catch(next);
  })
