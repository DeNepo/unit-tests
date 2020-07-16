'use strict';

// https://www.chaijs.com/api/bdd/

const expect = chai.expect;

describe('chai has many more assertions', () => {
  describe('.a("type")', () => {
    it('expects the value is a string', () => {
      expect('asdf').to.be.a('string');
    });
    it('expects the value is a number', () => {
      expect(12).to.be.a('number');
    });
    it('expects the value is an array', () => {
      expect([]).to.be.a('array');
    });
    it('expects the value is an error', () => {
      expect(new Error()).to.be.a('error');
    });
    it('...', () => {
      // https://www.chaijs.com/api/bdd/#method_a
    });
  });
  describe('built-in checks for certain values', () => {
    it('expects true', () => {
      expect(true).to.be.true;
    });
    it('expects false', () => {
      expect(false).to.be.false;
    });
    it('expects null', () => {
      expect(null).to.be.null;
    });
    it('expects undefined', () => {
      expect(undefined).to.be.undefined;
    });
    it('expects NaN', () => {
      expect(NaN).to.be.NaN;
    });
  });
  describe('test the length of things that have lengths', () => {
    it('strings', () => {
      expect('asdf').to.have.lengthOf(4);
    });
    it('arrays', () => {
      expect([1, 2, 3]).to.have.lengthOf(3);
    });
  });
  describe('search for things', () => {
    it('does a string include a substring?', () => {
      expect('foobar').to.include('foo');
    });
    it('search a string using regex', () => {
      expect('foobar').to.match(/^foo/);
    });
    it('does an array include a certain value?', () => {
      expect(['a', 2, true]).to.include(true);
    });
    it('does an object have a property?', () => {
      expect({ a: 1 }).to.have.property('a');
    });
    it('does an object have a key/value pair?', () => {
      expect({ a: 1, b: 2, c: 3 }).to.include({ a: 1, b: 2 });
    });
  });
  describe('make sure a function throws an error', () => {
    it('throws any error', () => {
      const funky = () => { throw new Error(); }
      expect(funky).to.throw();
    });
    it('throws a specific error', () => {
      const funky = () => { throw new TypeError(); }
      expect(funky).to.throw(TypeError);
    });
    it('with a specific message', () => {
      const funky = () => { throw new Error('plop'); }
      expect(funky).to.throw(Error, 'plop');
    });
  });
  describe('fail on purpose', () => {
    it('There can only be one', () => {
      expect.fail('Highlander!');
    });
  });
});
