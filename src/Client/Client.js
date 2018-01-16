const { ResultTypes } = require("../Util/typedefs")
const Rest = require("./Rest")
const Util = require("../Util/Util")
const buildRoute = require("../Util/buildRoute")

/**
 * @class
 */
class Client {
  /**
     * @constructor
     * @param {Client} rest
     */
  constructor (rest) {
    this._rest = rest
  }

  /**
   * @type {Rest}
   * @readonly
   */
  get rest () {
    return this._rest
  }

  /**
   * @type {String}
   */
  get token () {
    return this.rest.token
  }

  /**
   * @type {String}
   */
  set token (val) {
    this.rest.token = val
  }

  /**
   * @type {Route}
   * @readonly
   */
  get api () {
    return buildRoute(this.rest)
  }

  /**
     *
     * @param {String} login
     * @param {String} password
     * @returns {Promise<AuthInfo>}
     */
  async login (login, password) {
    const [err, authInfo] = await Util.saferize(this.api.auth.post({login, password}, null, {resultType: ResultTypes.CONTENT_ONLY}))
    if (err) {
      return Promise.reject(err)
    }
    this.token = authInfo.token
    return authInfo
  }

  /**
     * @returns {Promise}
     */
  async logout () {
    const [err] = await Util.saferize(this.api.auth.delete())
    if (err) {
      return Promise.reject(err)
    }
    this.token = null
  }

  static createApiClient (options) {
    return new Client(new Rest(options))
  }
}

module.exports = Client
