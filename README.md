
# qs-url

[![Build Status](https://travis-ci.com/bolin-L/qs-url.svg?branch=master)](https://travis-ci.com/bolin-L/qs-url)
[![Coverage Status](https://coveralls.io/repos/github/bolin-L/qs-url/badge.svg?branch=master)](https://coveralls.io/github/bolin-L/qs-url?branch=master)

A url and querystring parsing library extend from [fs library](https://github.com/ljharb/qs)


## Usage

```
const qsUrl = require('qs-url');
const url = 'http://www.bolin.site/user/?id=1&status=success#/user/info?name=lbl&userId=456';

const query1 = qsUrl.getQuery('', url); // {id: '1', status: 'success'}

const query2 = qsUrl.getQuery(['id'], url) // {id: '1'}

const query3 = qsUrl.getQuery('status', url) // success


// set baseUrl and parse it

qsUrl.setBaseUrl('http://www.bolin.site/user/?id=1&status=success#/user/info?name=lbl&userId=456')
const urlInfo = qsUrl.parseUrl();

expect(urlInfo).to.deep.equal({
    url: 'http://www.bolin.site/user/',
    query: {id: '1'},
    queryStr: 'id=1',
    hash: '/user/info',
    hashStr: '/user/info?name=lbl&userId=456',
    params: {name: 'lbl', userId: '456'},
    paramsStr: 'name=lbl&userId=456',
});

// do not pass url argument after set baseUrl
const query3 = qsUrl.getQuery('status') // success

```

## APIs

**url: 'http://www.bolin.site/user/?id=1&status=success#/user/info?name=lbl&userId=456'**

|API|arguments|return|
|:--:|:----:|:----:|
|parse| - | - |
|stringify| - | - |
|formats| - | - |
|getQuery| (string&array, [string&object]) | object|string |
|addQuery| (object, [string&object]) | string |
|removeQuery| (string&array, [string&object]) | string |
|replaceQuery| (object, [string&object]) | string |
|getParams| (string&array, [string&object]) | object&string |
|addParams| (object, [string&object]) | string |
|removeParams| (string&array, [string&object]) | string |
|replaceParams| (object, [string&object]) | string |
|getPath| ([string&object]) | string |
|getPathAndQuery| ([string&object]) | string |
|getPathAndHash| ([string&object]) | string |
|setBaseUrl| (string) | - |
|setBaseUrl| - | string |
|parseUrl| ([string&object]) | object |


## CHANGE LOG

### 1.0.4 - [ 2019-05-07 ]

[ M ] - 升级babel到7.0+
[ M ] - 打包转译Object.assign