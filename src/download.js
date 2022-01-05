module.exports = ({token, fileUri, fileSizeLimit: max}) => {
  const request = require('bent')(fileUri + token+"/", 'GET')
  return ({ file_size: size, file_path: path }) =>
    size > max
    ? Promise.reject({ code: 800, description: 'File size is larger than maximum allowed size.', size, max, path })
    : request(path)
      .then(stream => stream.arrayBuffer())
      .catch(({message: description, statusCode: code})=>
        Promise.reject({size,path,code, description}))
}