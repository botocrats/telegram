const FormData = require("form-data")
const { handleError, catchTelegramError, catchException } = require("./error")
module.exports.handleResponse = (request, debug) =>
  (...params) =>
    request(...params)
      .then((e) => e.result)
      .catch((err) =>
        err.json
          ? err.json().then(catchTelegramError(params))
          : catchException(err, params))
      .catch(handleError(debug))

module.exports.handleFormData = (request) => (endpoint, params, formData = false) => {
  if (formData) {
    const form = new FormData()
    Object.entries(params).forEach(i => form.append(i[0], i[1]))
    return request(endpoint, form, form.getHeaders())
  }
  return request(endpoint, params)
}
