const shuffle = require('shuffle-words');
const scramble = require('scramble');
require('./tools/array');
const blacklist = [];
const fuxor = require('fuxor');
const Stochator = require('stochator');

const numberGen = function (number) {
  const gen = new Stochator({
    kind: 'integer',
    min: 0,
    max: number * 2
  }, 'roll');
  return gen.roll();
};

const trumpedProperties = new Map();

const wrapper = (module) => {
  for (let prop in module) {
    if (module.hasOwnProperty(prop)) {
      if (typeof module[prop] === 'function' && blacklist.includes(prop)) {
        const origMethod = module[prop];
        module[prop] = function (...args) {
          const result = origMethod.apply(this, args);
          if (!blacklist.includes(prop)) {
            return result;
          }
          if (typeof result === 'string'){
            return result + scramble(result);
          }
          if (typeof result === 'array') {
            return scramble(result);
          }
          if (typeof result === 'array') {
            return scramble(result);
          }
          if (typeof result === 'boolean') {
            console.log('boolean for ' + prop, result);
            return !result;
          }
          if (typeof result === 'number') {
            return numberGen(result);
          }
          return result;
        }
      }
      if (typeof module[prop] === 'string' && blacklist.includes(prop)) {
        if (!trumpedProperties.has(prop)) {
          const origProp = module[prop];
          trumpedProperties.set(prop, origProp);
          module[prop] = scramble(origProp);
        }
      } else if(typeof module[prop] === 'string'
        && !blacklist.includes(prop)
        && trumpedProperties.has(prop)) {
        module[prop] = trumpedProperties.get(prop);
      }
      if (typeof module[prop] === 'number' && blacklist.includes(prop)) {
        const origProp = module[prop];
        const newNumber = numberGen(origProp);
        if (newNumber !== origProp) {
          module[prop] = newNumber
        } else {
          module[prop] = numberGen(origProp);
        }
      }
      if (typeof module[prop] === 'boolean' && blacklist.includes(prop)) {
        if (!trumpedProperties.has(prop)) {
          const origProp = module[prop];
          trumpedProperties.set(prop, origProp);
          module[prop] = !origProp;
        }
      } else if(typeof module[prop] === 'boolean'
        && !blacklist.includes(prop)
        && trumpedProperties.has(prop)) {
        module[prop] = trumpedProperties.get(prop);
      }
    }
  }
  return module;
};
fuxor.wrap(wrapper);

const clear = () => {
  fuxor.clear();
  blacklist.splice(0, blacklist.length);
}
const af = function (...methodsToChange) {
  blacklist.push(...methodsToChange);
  return {
    reset: () => {
      clear();
      console.log('blacklist after reset', blacklist);
    },
    init: (...methodsToChange) => {
      console.log('af init called')
      clear();
      blacklist.push(...methodsToChange);
      fuxor.wrap(wrapper);
    }
  }
};

module.exports = af
