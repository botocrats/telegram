'use strict'
const streamMethods = require('./stream')
const {handleResponse, handleFormData} = require('./request')
const downloader = require('./download')
const defaultOptions = {
  baseUri: 'https://api.telegram.org/bot',
  fileUri: 'https://api.telegram.org/file/bot',
  fileSizeLimit: Infinity
}

module.exports = (options = {}) => {
  const {token, debug, baseUri, ...fileOptions} = {...defaultOptions, ...options}
  if(typeof token != "undefined" && typeof token != "string"){
    throw Error("you should provide valid token or don't provide token at all")
  }
  const request = handleResponse(handleFormData(require('bent')(baseUri + token+ "/", 'json', "POST")), debug)
  const download = downloader({ token, ...fileOptions })
  return new Proxy({}, {
    get: (o, endpoint) =>
      endpoint === "download"
        ? download
        : (params) =>
          request(endpoint, params, streamMethods[endpoint] && streamMethods[endpoint](params)),
  })
}