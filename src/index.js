'use strict'
const streamMethods = require('./stream')
const createRequester = require('./request')
const downloader = require('./download')

module.exports = ({token, debug, baseUri = 'https://api.telegram.org', fileSizeLimit = Infinity, interceptor}) => {
  if(typeof token != 'string'){
    throw Error('you should provide valid token')
  }
  const request = createRequester(baseUri + '/bot' + token+ '/', debug, interceptor)
  const download = downloader({ token, fileSizeLimit, baseUri })
  return new Proxy({}, {
    get: (o, endpoint) =>
      endpoint === 'download'
        ? download
        : (params) =>
          request(endpoint, params, streamMethods[endpoint] && streamMethods[endpoint](params)),
  })
}