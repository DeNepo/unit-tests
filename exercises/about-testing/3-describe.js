'use strict';

const expect = chai.expect;


// describe helps to group test cases, it doesn't do much more than that
describe('repeatString should repeat strings', () => {
  it('throwing an error in it', () => {
    throw new Error(':(');
  });
  it('failing assertion', () => {
    expect('4').to.equal(4);
  });
  it('passing assertion', () => {
    expect(4).to.equal(4);
  });
  it('no assertion and no error', () => {
    const hello = 'hi';
  });

  // an error inside describe is called a "suite error"
  throw new Error(':(');
  // this doesn't mean a test failed
  // it just means there was an error :(
});





