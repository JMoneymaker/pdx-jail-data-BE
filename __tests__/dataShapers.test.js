const { makeDate, numifyBail, getAge } = require('../lib/utils/dataShapers.js');
const moment = require('moment');
moment().format();

describe('bail numifier', () => {
  test('it returns a number if the value is a word', () => {
    const input = 'NO BAIL';
    const output = 0;

    expect(numifyBail(input)).toEqual(output);
  });

  test('it returns a number if the value is a string with a $', () => {
    const input = '$2500';
    const output = 2500;

    expect(numifyBail(input)).toEqual(output);
  });

  test('it returns a number if the value is a string without a $', () => {
    const input = '2500';
    const output = 2500;

    expect(numifyBail(input)).toEqual(output);
  });
});

describe('date maker', () => {
  it('returns a date if the format is m/d/yy', () => {
    const input = '2/19/80';
    const output = '1980-02-19T08:00:00.000Z';

    expect(makeDate(input)).toEqual(new Date(output));
  });

  it('returns a date if the format is mm/dd/yy', () => {
    const input = '02/19/80';
    const output = '1980-02-19T08:00:00.000Z';

    expect(makeDate(input)).toEqual(new Date(output));
  });

  it('returns a date if the format is mm/dd/yyyy', () => {
    const input = '02/19/1980';
    const output = '1980-02-19T08:00:00.000Z';

    expect(makeDate(input)).toEqual(new Date(output));
  });
});

describe('get age', () => {
  it('returns the correct age if the format is m/d/yy', () => {
    const input = '2/19/80';
    const output = 40;
  
    expect(getAge(input)).toEqual(output);
  });
  
  it('returns the correct age if the format is mm/dd/yy', () => {
    const input = '02/19/80';
    const output = 40;
  
    expect(getAge(input)).toEqual(output);
  });
  
  it('returns the correct age if the format is mm/dd/yyyy', () => {
    const input = '02/19/1980';
    const output = 40;
  
    expect(getAge(input)).toEqual(output);
  });
  
});
