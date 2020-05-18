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

  .get('/dailyChargeCount', (req, res, next) => {
    MultScrape
      .dailyChargeCount()
      .then(data => res.send(data))
      .catch(next);
  });
