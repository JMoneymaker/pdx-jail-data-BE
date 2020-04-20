const cheerio = require('cheerio');
const superagent = require('superagent');
require('superagent-retry-delay')(superagent);

const scrapeBooking = url => {
  return superagent
    .get(url)
    .then(response => cheerio.load(response.text))
    .then(makeBookingObject)
    .catch(error => console.log(error));
};

const makeBookingObject = html => {
  // const cases = [];
  // const caseNumbers = [];
  return ({
    date: new Date(),
    bookingNumber: html('#BookingNumber').attr('value'),
    swisId: html('label[for="Person_SwisID"]').parent().next().text(),
    fullName:html('label[for="Person_FullName"]').parent().next().text(),
    age: html('label[for="Person_Age"]').parent().next().text(),
    gender: html('label[for="Person_Gender"]').parent().next().text(),
    race: html('label[for="Person_Race"]').parent().next().text(),
    height: html('label[for="Person_Height"]').parent().next().text(),
    weight: html('label[for="Person_Weight"]').parent().next().text(),
    hairColor: html('label[for="Person_HairColor"]').parent().next().text(),
    eyeColor: html('label[for="Person_EyeColor"]').parent().next().text(),
    arrestingAgency: html('label[for="ArrestingAgency"]').parent().next().text(),
    bookingDate: html('label[for="BookingDateTime"]').parent().next().text(),
    assignedFacility: html('label[for="AssignedFacility"]').parent().next().text(),
    projectedReleaseDate: html('label[for="ProjectedReleaseDateTime"]').parent().next().text(),
    charges: getCharges(html)
  });
};  

const getCharges = html => {
  return html('#charge-info h3')
    .map((_, caseInfo) => html(caseInfo)
      .map((_, charge) => charge));
};
    
scrapeBooking('http://www.mcso.us/PAID/Home/Booking/1468857')
  .then(results => console.log(results));
       
module.exports = scrapeBooking;

// (function() {
//   caseNumbers.push(html('.court-case-number > b', this).text());
//   const caseInfo = {
//     caseNumber: html('.court-case-number > b', this).text(),
//     daCaseNumber: html('.da-case-number > b', this).text(),
//     citationNumber: html('.citation-number > b', this).text(),
//     charges: []
//   };

//   html(this).next().find('li').each(function() {
//     const charge = {
//       description: html('.charge-description-display', this).text(),
//       bail: html('.charge-bail-display > span', this).text()
//         .split('')
//         .filter(char => !'html,'.includes(char))
//         .join(''),
//       status: html('.charge-status-display > span', this).text()
//     };
//     caseInfo.charges.push(charge);
//   });
//   cases.push(caseInfo);
