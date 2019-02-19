# Alternative-Facts

[![Build Status](https://travis-ci.org/Kevnz/fuxor.png?branch=master)](https://travis-ci.org/Kevnz/alternative-facts)

## When you want to make the truth false.

JS lib that intercepts code and delivers incorrect values

### API

#### Setup

```js
// require
const alternativeFacts = require('alternative-facts')
const af = alternativeFacts('format');
//override any method or property named format
const util = require('util');
const result = tools.format('%s:%s','foo','bar');
// result will be scrambled from "foo:bar"

```

#### reset

```js
af.reset();
const util2 = require('util');
const result2 = utils2.format('%s:%s','foo','bar');
// result is now "foo:bar"
```

#### init
```js
af.reset();
af.init('format');
const util3 = require('util');
const result3 = utils3.format('%s:%s','foo','bar');
// scambled again
```
