const { TransformTypes } = require("../Util/typedefs")
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

  get isDevice () {
    return this.rest.isDevice
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
    const authInfo = await this.api.auth.post({login, password}, null, TransformTypes.CONTENT_ONLY)
    if (!authInfo.token) {
      throw new Error("No token aquired in auth response!")
    }
    this.token = authInfo.token
    return authInfo
  }

  /**
   * @returns {Promise}
   */
  async logout () {
    await this.api.auth.delete()
    this.token = null
  }

  static createApiClient (options) {
    return new Client(new Rest(options))
  }
}

module.exports = Client
