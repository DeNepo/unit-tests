'use strict';

const expect = chai.expect;

/* comparing arrays doesn't work like you'd hope
  remember reference vs. value?
  === tests if two arrays are the array in program memory
  so this comparison is false:
*/
const huh = [1, 2, 3] === [1, 2, 3];
console.log('huh:', typeof huh, huh);

// and using chai.strictEqual doesn't change anything
//  .strictEqual is the same as ===
it('these arrays are not strictly equal', () => {
  expect([1, 2, 3]).to.equal([1, 2, 3]);
});
it('an array is strictly equal to itself', () => {
  const array1 = [1, 2, 3];
  const array2 = array1;
  expect(array1).to.equal(array2);
});

/* but you'd like this test to pass
  when we think of arrays being equal,
  we think of them having the same values.

  chai to the rescue!
  deepStrictEqual compares each element in an array
    if each entry is strictly equal, it passes
*/
it('these arrays are deeply equal', () => {
  expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
});

it('these arrays are not deeply equal', () => {
  expect([1, '2', 3]).to.deep.equal([1, 2, 3]);
});

it('arrays are deepStrictEqual to themselves', () => {
  const array = [1, 2, 3];
  expect(array).to.deep.equal(array);
});




