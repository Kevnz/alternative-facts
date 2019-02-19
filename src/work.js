const af = require('./index')('xformat');

    const tools = require('./tools/helpers');
    const result = tools.xformat('%s:%s','foo','bar');
    console.log('format', result)
