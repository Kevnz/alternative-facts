const expect = require('chai').expect;

describe('The module', () => {

  it('change string results', done => {
    const af = require('../src/index')('xformat');
    const tools = require('./tools/helpers');
    const result = tools.xformat('%s:%s','foo','bar');
    const shouldBe = 'foo:bar';
    expect(result).not.to.equal(shouldBe);
    done()
  });

  it('reset af should allow correct results', done => {
    const af = require('../src/index')('xformat');
    af.reset();
    af.init();
    const tools = require('./tools/helpers');
    const result = tools.xformat('%s:%s','foo','bar');
    const shouldBe = 'foo:bar';
    expect(result).to.equal(shouldBe);
    done()
  });

  it('strings should be scrambled', done => {
    const af = require('../src/index')('xformat');
    af.reset();
    af.init('string', 'strings');
    const tools = require('./tools/helpers');

    expect(tools.strings()).not.to.equal('This is another string');
    expect(tools.string).not.to.equal('This is a string');
    done()
  });

  it('strings should be unscrambled when reset called', done => {
    const af = require('../src/index')('xformat');
    af.reset();
    af.init();
    const tools = require('./tools/helpers');

    expect(tools.strings()).to.equal('This is another string');
    expect(tools.string).to.equal('This is a string');
    done()
  });

  it('strings should be strings', done => {
    const af = require('../src/index')('xformat');
    af.reset();
    af.init('string', 'strings');
    const tools = require('./tools/helpers');

    expect(typeof tools.strings()).to.equal('string')
    expect(typeof tools.string).to.equal('string')
    done()

  });

  it('numbers should be different', done => {
    const af = require('../src/index')('xformat');
    af.reset();
    af.init('number', 'numbers');
    const tools = require('./tools/helpers');

    expect(tools.numbers()).not.to.equal(42)
    expect(tools.number).not.to.equal(21)
    done()

  });

  it('numbers should be numbers', done => {
    const af = require('../src/index')('xformat');
    af.reset();
    af.init('number', 'numbers');
    const tools = require('./tools/helpers');

    expect(typeof tools.numbers()).to.equal('number')
    expect(typeof tools.number).to.equal('number')
    done()

  });

  it('booleans should be different', done => {
    const af = require('../src/index')('bools', 'bool');
    af.reset();
    af.init('bools', 'bool');
    const tools = require('./tools/helpers');

    expect(tools.bools()).to.equal(true)
    expect(tools.bool).to.equal(false)
    af.reset()
    done()

  });

  it('booleans should be booleans', done => {
    const af = require('../src/index')('xformat');
    af.reset();
    af.init('bool', 'bools');
    const tools = require('./tools/helpers');

    expect(typeof tools.bools()).to.equal('boolean')
    expect(typeof tools.bool).to.equal('boolean')
    done()

  });
  it('numbers should be back to normal', done => {
    const af = require('../src/index')('xformat');
    af.init('number', 'numbers');
    const tools = require('./tools/helpers');
    af.reset();

    expect(tools.numbers()).to.equal(42)
    expect(tools.number).to.equal(21)
    done()

  });
  it('booleans should be back to normal', done => {
    const af = require('../src/index')('xformat');
    af.init('bool', 'bools');

    af.reset();
    const tools = require('./tools/helpers');
    expect(tools.bools()).to.equal(false)
    expect(tools.bool).to.equal(true)
    done()

  });

})
