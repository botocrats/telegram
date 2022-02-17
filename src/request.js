const FormData = require('form-data')
const { handleError, catchTelegramError, catchException } = require('./error')

const handleResponse = (request, debug) =>
  (...params) =>
    request(...params)
      .then((e) => e.result)
      .catch((err) =>
        err.json
          ? err.json().then(catchTelegramError(params))
          : catchException(err, params)
      )
      .catch(handleError(debug))

const handleFormData = (request, interceptor) =>
  (method, params, formData = false) => {
    // client can be interfered by defining interceptor callback.
    if (interceptor) {
      const result = interceptor(method, params, formData)
      if(result instanceof Promise) return result
    }
    if (formData) {
      const form = new FormData()
      Object.entries(params).forEach((i) => form.append(i[0], i[1]))
      return request(method, form, form.getHeaders())
    }
    return request(method, params)
  }
module.exports = (url, debug, interceptor) =>
  handleResponse(
    handleFormData(require('bent')(url, 'json', 'POST'), interceptor)
    , debug)
