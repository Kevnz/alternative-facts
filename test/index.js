const test = require('ava');

const af = require('../index')('xformat');

test('change string results', t => {
  const tools = require('../tools/helpers');
  const result = tools.xformat('%s:%s','foo','bar');
  const shouldBe = 'foo:bar';
  t.not(shouldBe, result);
});

test('reset af should allow correct results', t => {
  af.reset();
  af.init();
  const tools = require('../tools/helpers');
  const result = tools.xformat('%s:%s','foo','bar');
  const shouldBe = 'foo:bar';
  t.is(shouldBe, result);
});

test('strings should be scrambled', t => {
  af.reset();
  af.init('string', 'strings');
  const tools = require('../tools/helpers');
  t.not(tools.strings(), 'This is another string');
  t.not(tools.string, 'This is a string');
});

test('strings should be unscrambled when reset called', t => {
  af.reset();
  af.init();
  const tools = require('../tools/helpers');
  t.is(tools.strings(), 'This is another string');
  t.is(tools.string, 'This is a string');
});

test('strings should be strings', t => {
  af.reset();
  af.init('string', 'strings');
  const tools = require('../tools/helpers');
  t.is(typeof tools.strings(), 'string');
  t.is(typeof tools.string, 'string');
});

test('numbers should be different', t => {
  af.reset();
  af.init('number', 'numbers');
  const tools = require('../tools/helpers');
  t.not(tools.numbers(), 42);
  t.not(tools.number, 21);
});

test('numbers should be numbers', t => {
  af.reset();
  af.init('number', 'numbers');
  const tools = require('../tools/helpers');
  t.is(typeof tools.numbers(), 'number');
  t.is(typeof tools.number, 'number');
});

test('booleans should be different', t => {
  af.reset();
  af.init('bool', 'bools');
  const tools = require('../tools/helpers');
  t.not(tools.bools(), false, 'The function should return inverted result');
  t.not(tools.bool, true);
});

test('booleans should be booleans', t => {
  af.reset();
  af.init('bool', 'bools');
  const tools = require('../tools/helpers');
  t.is(typeof tools.bools(), 'boolean');
  t.is(typeof tools.bool, 'boolean');
});

test('complex objects', t => {

})
