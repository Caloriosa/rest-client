const RestError = require("./RestError")
const { ApiStatuses } = require("../Util/typedefs")

/**
 * @class
 * @extends Error
 */
class CaloriosaApiError extends RestError {
  /**
   * @constructor
   * @param {String} code
   * @param {String} message
   * @param {Object} error
   */
  constructor (code, message, error) {
    super(message, error)
    this.name = CaloriosaApiError.name
    /**
     * Shortcut to err.status.code
     * @type {String}
     */
    this.code = code || ApiStatuses.UNKNOWN
    /**
     * @type {DtoData}
     */
    this.content = this.response.data ? this.response.data.content : null
  }
}

module.exports = CaloriosaApiError
