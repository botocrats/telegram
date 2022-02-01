module.exports = ({token, baseUri, fileSizeLimit: max}) => {
  const request = require('bent')(baseUri + '/file/bot' + token + '/', 'GET')
  
  return ({ file_size: size, file_path: path }) => size > max
    ? Promise.reject({ code: 800, description: 'File size is larger than maximum allowed size.', size, max, path })
    : request(path)
      .then(stream => stream.arrayBuffer())
      .then(buffer => [buffer, path.split('.').pop(), size])
      .catch(({message: description, statusCode: code}) =>
        Promise.reject([null, null, null,{size, path, code, description}]))
}