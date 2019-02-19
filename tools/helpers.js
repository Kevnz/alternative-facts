"use strict";

var util = require('util');

module.exports = {
  xformat: function xformat(base, arg1, arg2) {
    return util.format(base, arg1, arg2);
  },
  bool: true,
  string: 'This is a string',
  number: 21,
  strings: function strings() {
    return 'This is another string';
  },
  numbers: function numbers() {
    return 42;
  },
  bools: function bools() {
    return false;
  }
};