[![npm version](https://badge.fury.io/js/fetch-timeout.svg)](https://badge.fury.io/js/fetch-timeout)
[![Build Status](https://travis-ci.org/jkomyno/fetch-timeout.svg?branch=master)](https://travis-ci.org/jkomyno/fetch-timeout)

fetch-timeout
==============

HTTP/S **fetch** wrapper that adds the possibility to set a **timeout** after which a custom error is returned.
If used in NodeJS, this package is dependent on node-fetch, altough it will always try to use window.fetch.

## Installation

  `npm install --save fetch-timeout`
  
### Nodejs environment only

Also add the following package, since the standard window.fetch isn't accessible from node.

`npm install --save node-fetch`

## Usage

#### ES5

```javascript
  var fetchTimeout = require('fetch-timeout');

  fetchTimeout('https://api.github.com/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }, 5000, 'My custom timeout error string')
  .then(function(res) {
    if (res.status !== 200) {
      throw new Error('Status code not OK', res.status);
    } else {
      return res.json();
    }
  })
  .then(function(json) {
    console.log("json returned from response");
  })
  .catch(function(err) {
      console.log("error", err);
  });
```

#### ES6

```javascript
  import fetchTimeout from 'fetch-timeout';

  fetchTimeout('https://api.github.com/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }, 5000, 'My custom timeout error string')
  .then(res => {
    if (res.status !== 200) {
      throw new Error('Status code not OK', res.status);
    } else {
      return res.json();
    }
  })
  .then(json => {
    console.log("json returned from response");
  })
  .catch(err => {
      console.log("error", err);
  });
```

## API


Arguments | Type   | Optional | Default           | Description
----------| ------ | -------- | ----------------- | ------------------------------------------------------------
url       | string | false    |                   | url to pass to node-fetch
options   | object | true     | {}                | standard options to pass to node-fetch
timeout   | number | true     | 10000             | maximum acceptable timeout before throwing the timeout error
error     | string | true     | 'Timeout error'   | custom error string after the timeout is expired

## Tests

  `npm test`

## Contributing

Pull requests and suggestions are more than welcome!
