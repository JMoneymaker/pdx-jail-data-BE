require('dotenv').config();
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const { makeDate, makeDateWithTime, numifyBail, makeTimeless } = require('../../utils/dataShapers');
const { shapeRace } = require('../../utils/shapeRace');
const { shapeAgency } = require('../../utils/shapeAgency');
const { shapeGender } = require('../../utils/shapeGender');
const RawDetention = require('../../models/RawDetention');
const ParsedDetention = require('../../models/ParsedDetention');


module.exports = async(job) => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  try {
    const { html } = await RawDetention.findById(job.data.id);
    const $ = cheerio.load(html);
    return await ParsedDetention.create(parseProfile($));
  } finally {
    await mongoose.connection.close();
  }
    
};

const parseProfile = html => {
  const labelFinder = label => html(`label[for="${label}"]`).parent().next().text().trim();
  return ({
    county: 'Multnomah',
    dateAdded: makeTimeless(),
    bookingDate: makeDateWithTime(labelFinder('BookingDateTime')),
    projectedReleaseDate: makeDate(labelFinder('ProjectedReleaseDateTime')),
    bookingNumber: html('#BookingNumber').attr('value'),
    swisId: labelFinder('Person_SwisID'),
    fullName: labelFinder('Person_FullName'),
    age: labelFinder('Person_Age'),
    gender: shapeGender(labelFinder('Person_Gender')),
    race: shapeRace(labelFinder('Person_Race')),
    height: labelFinder('Person_Height'),
    weight: labelFinder('Person_Weight'),
    hairColor: labelFinder('Person_HairColor'),
    eyeColor: labelFinder('Person_EyeColor'),
    arrestingAgency: shapeAgency(labelFinder('ArrestingAgency')),
    assignedFacility: labelFinder('AssignedFacility'),
    charges: html('#charge-info ol li').get()
      .map((el) => {
        const caseFinder = htmlTag => html(el).parent().parent().prev().find(htmlTag).text();
        const chargeFinder = htmlTag => html(el).find(htmlTag).text();
        const [description, category] = chargeFinder('.charge-description-display').split('(');
        return ({
          caseNumber: caseFinder('.court-case-number > b'),
          daCaseNumber: caseFinder('.da-case-number > b'),
          citationNumber: caseFinder('.citation-number > b'),
          description: description.toString().trim(),
          category: category.toString().trim().slice(0, -1),
          bail: numifyBail(chargeFinder('.charge-bail-value')),
          status: chargeFinder('.charge-status-value')
        });
      })
  });  
};

