const { Router } = require('express');
const DailyCount = require('../models/DailyCount');
const DailyFacilityCount = require('../models/DailyFacilityCount');
const DailyGenderCount = require('../models/DailyGenderCount');

module.exports = Router() 

  .get('/', (req, res, next) => {
    DailyCount
      .find()
      .then(counts => res.send(counts))
      .catch(next);
  })

  .get('/csvDownload', (req, res, next) => {
    DailyCount
      .getCSVCounts()
      .then(counts => res.send(counts))
      .catch(next);
  })

  .get('/facility', (req, res, next) => {
    DailyFacilityCount
      .getDailyFacilityCount()
      .then(facilityCounts => res.send(facilityCounts))
      .catch(next);
  })

  .get('/gender', (req, res, next) => {
    DailyGenderCount
      .getDailyGenderCount()
      .then(genderCounts => res.send(genderCounts))
      .catch(next);
  });
  
