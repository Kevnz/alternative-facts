"use strict";

var af = require('./index')('xformat');

var tools = require('./tools/helpers');

var result = tools.xformat('%s:%s', 'foo', 'bar');
console.log('format', result);