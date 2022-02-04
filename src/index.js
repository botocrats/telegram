'use strict'
const streamMethods = require('./stream')
const createRequester = require("./request");
const downloader = require('./download')
const defaultOptions = {
  baseUri: 'https://api.telegram.org',
  fileSizeLimit: Infinity
}

module.exports = (options = {}) => {
  const {token, debug, baseUri, fileSizeLimit} = {...defaultOptions, ...options}
  if(typeof token != 'string'){
    throw Error('you should provide valid token')
  }
  const request = createRequester(baseUri + '/bot' + token+ '/', debug)
  const download = downloader({ token, fileSizeLimit, baseUri })
  return new Proxy({}, {
    get: (o, endpoint) =>
      endpoint === 'download'
        ? download
        : (params) =>
          request(endpoint, params, streamMethods[endpoint] && streamMethods[endpoint](params)),
  })
}