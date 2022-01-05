const FormData = require("form-data")
const catchError = require("./error")
module.exports.handleResponse = (request, debug) => (...params) => request(...params)
  .then(request => request.result)
  .catch(r => r.json().then(({description, status_code: code}) =>
    Promise.reject({code, description, endpoint: params[0], qs:params[1]})))
  .catch(catchError(debug))

module.exports.handleFormData = (request) => (endpoint, params, formData = false) => {
    if(formData) {
      const form = new FormData()
      Object.entries(params).forEach(i => form.append(i[0], i[1]))
      return request(endpoint, form, form.getHeaders())
    } else return request(endpoint, params)
  }
