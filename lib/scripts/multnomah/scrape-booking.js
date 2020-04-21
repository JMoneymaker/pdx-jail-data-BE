const cheerio = require('cheerio');
const superagent = require('superagent');
require('superagent-retry-delay')(superagent);

const scrapeBooking = bookingNumber => {
  const url = `http://www.mcso.us/PAID/Home/Booking/${bookingNumber}`;
  return superagent
    .get(url)
    .then(response => cheerio.load(response.text))
    .then(text => makeBookingObject(text))
    .catch(error => console.log(error));
};

const getDate = () => {
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return (month + '/' + day + '/' + year);
};

const makeBookingObject = html => {
  return ({
    dateAdded: getDate(),
    county: 'Multnomah',
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
    cases: html('#charge-info h3').get()
      .map((el) => ({
        caseNumber: html(el).find('.court-case-number > b').text(),
        daCaseNumber: html(el).find('.da-case-number > b').text(),
        citationNumber: html(el).find('.citation-number > b').text(),
        charges: html(el).parent().find('ol li').get()
          .map((el) => ({
            description: html(el).find('.charge-description-display').text()
              .substr(0, html(el).find('.charge-description-display').text().indexOf('(')).trim(),
            category: html(el).find('.charge-description-display').text()
              .substr(html(el).find('.charge-description-display').text().indexOf('(') + 1).slice(0, -1).trim(),
            bail: html(el).find('.charge-bail-value').text(),
            status: html(el).find('.charge-status-value').text()
          }))
      }))
  });  
};

// scrapeBooking('http://www.mcso.us/PAID/Home/Booking/1468857')
//   .then(results => console.log(JSON.stringify(results, null, 2)));
       
module.exports = scrapeBooking;


    

