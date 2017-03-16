'use strict';

if (typeof window === 'undefined' || window.hasOwnProperty('fetch')) {
  var fetch = require('node-fetch');
}

/**
 * [timeoutPromise description]
 * @param  {Promise} promise
 * @param  {number} timeout
 * @param  {string} error
 * @return
 */
function timeoutPromise(promise, timeout, error) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(error);
    }, timeout);
    promise.then(resolve, reject);
  });
}

/**
 * node-fetch wrapper that adds the possibility to set a timeout after which a custom error is returned.
 * @param  {string} url     url to pass to node-fetch
 * @param  {object} options options to pass to node-fetch
 * @param  {number} timeout maximum acceptable timeout before considering the request as failed
 * @param  {string} error   custom error string after the timeout is expired
 * @return {Promise}
 */
module.exports = function fetchTimeout(url, options, timeout, error) {
  error = error || 'Timeout error';
  options = options || {};
  timeout = timeout || 10000;
  return timeoutPromise(fetch(url, options), timeout, error);
};
