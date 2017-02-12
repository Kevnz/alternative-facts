const util = require('util')
module.exports = {
  xformat: function (base, arg1, arg2) {
    return util.format(base, arg1, arg2);
  },
  bool: true,
  string: 'This is a string',
  number: 21,
  strings: function() {
    return 'This is another string';
  },
  numbers: function() {
    return 42;
  },
  bools: function () {
    return false;
  }
}
