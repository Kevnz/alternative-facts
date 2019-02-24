"use strict";

var shuffle = require('shuffle-words');

var scramble = require('scramble');

var CustomArray = require('./helpers/array');

var blacklist = new CustomArray();

var fuxor = require('fuxor');

var Stochator = require('stochator');

var numberGen = function numberGen(number) {
  var gen = new Stochator({
    kind: 'integer',
    min: 0,
    max: number * 2
  }, 'roll');
  return gen.roll();
};

var trumpedProperties = new Map();

var wrapper = function wrapper(module) {
  var _loop = function _loop(prop) {
    if (module.hasOwnProperty(prop)) {
      if (typeof module[prop] === 'function' && blacklist.includes(prop)) {
        var origMethod = module[prop];

        module[prop] = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var result = origMethod.apply(this, args);

          if (!blacklist.includes(prop)) {
            return result;
          }

          if (typeof result === 'string') {
            return result + scramble(result);
          }

          if (typeof result === 'array') {
            return scramble(result);
          }

          if (typeof result === 'array') {
            return scramble(result);
          }

          if (typeof result === 'boolean') {
            return !result;
          }

          if (typeof result === 'number') {
            return numberGen(result);
          }

          return result;
        };
      }

      if (typeof module[prop] === 'string' && blacklist.includes(prop)) {
        if (!trumpedProperties.has(prop)) {
          var origProp = module[prop];
          trumpedProperties.set(prop, origProp);
          module[prop] = scramble(origProp);
        }
      } else if (typeof module[prop] === 'string' && !blacklist.includes(prop) && trumpedProperties.has(prop)) {
        module[prop] = trumpedProperties.get(prop);
      }

      if (typeof module[prop] === 'number' && blacklist.includes(prop)) {
        if (!trumpedProperties.has(prop)) {
          var _origProp = module[prop];
          trumpedProperties.set(prop, _origProp);
          var newNumber = numberGen(_origProp);

          if (newNumber !== _origProp) {
            module[prop] = newNumber;
          } else {
            module[prop] = numberGen(_origProp);
          }
        }
      } else if (typeof module[prop] === 'number' && !blacklist.includes(prop) && trumpedProperties.has(prop)) {
        module[prop] = trumpedProperties.get(prop);
      }

      if (typeof module[prop] === 'boolean' && blacklist.includes(prop)) {
        if (!trumpedProperties.has(prop)) {
          var _origProp2 = module[prop];
          trumpedProperties.set(prop, _origProp2);
          module[prop] = !_origProp2;
        }
      } else if (typeof module[prop] === 'boolean' && !blacklist.includes(prop) && trumpedProperties.has(prop)) {
        module[prop] = trumpedProperties.get(prop);
      }
    }
  };

  for (var prop in module) {
    _loop(prop);
  }

  return module;
};

fuxor.wrap(wrapper);

var clear = function clear() {
  fuxor.clear();
  blacklist.empty();
};

var af = function af() {
  blacklist.push.apply(blacklist, arguments);
  return {
    reset: function reset() {
      clear();
    },
    init: function init() {
      clear();
      blacklist.push.apply(blacklist, arguments);
      fuxor.wrap(wrapper);
    }
  };
};

module.exports = af;