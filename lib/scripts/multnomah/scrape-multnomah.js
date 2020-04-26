const cheerio = require('cheerio');
const superagent = require('superagent');
const { makeDate, numifyBail, makeTimeless } = require('../../utils/dataShapers');


const scrapeMultnomah = query => {
  const url = `http://www.mcso.us/PAID/Home/Booking/${query}`;
  return superagent
    .get(url)
    .then(response => cheerio.load(response.text))
    .then(html => makeDetentionObject(html))
    .catch(error => console.log(error));
};

const makeDetentionObject = html => {

  return ({
    county: 'Multnomah',
    dateAdded: makeTimeless(),
    bookingDate: makeDate(html('label[for="BookingDateTime"]').parent().next().text()),
    projectedReleaseDate: makeDate(html('label[for="ProjectedReleaseDateTime"]').parent().next().text()),
    bookingNumber: html('#BookingNumber').attr('value'),
    swisId: html('label[for="Person_SwisID"]').parent().next().text(),
    fullName: html('label[for="Person_FullName"]').parent().next().text(),
    age: html('label[for="Person_Age"]').parent().next().text(),
    gender: html('label[for="Person_Gender"]').parent().next().text(),
    race: html('label[for="Person_Race"]').parent().next().text(),
    height: html('label[for="Person_Height"]').parent().next().text(),
    weight: html('label[for="Person_Weight"]').parent().next().text(),
    hairColor: html('label[for="Person_HairColor"]').parent().next().text(),
    eyeColor: html('label[for="Person_EyeColor"]').parent().next().text(),
    arrestingAgency: html('label[for="ArrestingAgency"]').parent().next().text(),
    assignedFacility: html('label[for="AssignedFacility"]').parent().next().text(),
    charges: html('#charge-info ol li').get()
      .map((el) => ({
        caseNumber: html(el).parent().parent().prev().find('.court-case-number > b').text(),
        daCaseNumber: html(el).parent().parent().prev().find('.da-case-number > b').text(),
        citationNumber: html(el).parent().parent().prev().find('.citation-number > b').text(),
        description: html(el).find('.charge-description-display').text()
          .substr(0, html(el).find('.charge-description-display').text().indexOf('(')).trim(),
        category: html(el).find('.charge-description-display').text()
          .substr(html(el).find('.charge-description-display').text().indexOf('(') + 1).slice(0, -1).trim(),
        bail: numifyBail(html(el).find('.charge-bail-value').text()),
        status: html(el).find('.charge-status-value').text()
      }))
  });  
};
       
module.exports = scrapeMultnomah;
