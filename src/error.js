const ERRORS = {
  BOT_NOT_STARTED: 'Forbidden: bot can\'t initiate conversation with a user',
  BOT_BLOCKED: 'Forbidden: bot was blocked by the user',
  MESSAGE_DELETED: 'Bad Request: message to forward not found',
  NOT_IN_CHAT: 'Bad Request: chat not found',
  INVALID_FILE_URL: 'Bad Request: invalid file HTTP URL specified: Wrong URL host',
  SERVER_CONNECT_ERROR: 'getaddrinfo ENOTFOUND api.telegram.org'
}
const findKeyFromValue = (o) => {
  let k = Object.keys(o)
  let v = Object.values(o)
  return (val) => {
    const i = v.indexOf(val)
    return i>-1 ? k[i] : null
  }
}
const findError = findKeyFromValue(ERRORS)

module.exports.handleError = (debug) => (e) => {
  if (e.description) {
    const errorName = findError(e.description)
    if (errorName) {
      e.type = errorName
    }
  }
  debug && (
    typeof debug === 'function' ? debug(e) : console.error(e)
  )
  return debug ? (()=>true) : Promise.reject(e)
}
module.exports.catchTelegramError = ([endpoint, qs]) =>
  ({ description, status_code: code }) =>
    Promise.reject({ code, description, endpoint, qs })

module.exports.catchException = ({errno: code, message: description}, [endpoint, qs]) =>
  Promise.reject({ code, description, endpoint, qs })
