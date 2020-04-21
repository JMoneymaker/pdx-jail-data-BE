require('dotenv').config();

// const request = require('supertest');
// const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const DailyDetention = require('../lib/models/DailyDetention');

describe('app routes', async() => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let detention;

  beforeEach(async() => {
    detention = await DailyDetention.create({
      bookingNumber: '12345678',
      bookingDate: '2019-11-17T10:12:00.000+00:00',
      swisId: '20208712',
      arrestingAgency: 'Portland Police',
      releaseDate:'2019-11-19T10:12:00.000+00:00',
      fullName: 'Eisley, Moss',
      age: '40',
      gender: 'any/all',
      race: 'White',
      height: '5 8',
      weight: '258',
      hairColor: 'black',
      eyeColor: 'blue',
      charges: [{
        blank: 'ugh'
      }]
    });
  });
  

  afterAll(() => {
    return mongoose.connection.close();
  });
});
