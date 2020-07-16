'use strict';

const expect = chai.expect;

// it is a function that helps to read test results

// if an error is thrown it will fail
//  the error will be logged as "uncaught"
it('throwing an error in it', () => {
  throw new Error(':(');
});

// failing assertions throw an error, making it fail
//  these errors are logged without 'uncaught'
it('failing assertion', () => {
  expect('4').to.equal(4);
});

// if no error is thrown, it passes
it('passing assertion', () => {
  expect(4).to.equal(4);
});

it('no assertion and no error', () => {
  const hello = 'hi';
});








