const { DefaultClientOptions, ResultTypes } = require("../Util/typedefs")
const EventEmmiter = require("events")
const axios = require("axios")
const CaloriosaApiError = require("./CaloriosaApiError")
const RestError = require("./RestError")
const Util = require("../Util/Util")

/**
 * @class
 */
class Rest {
  /**
   * @event Client#response
   * @type {Response}
   */

  /**
   * @event Client#request
   * @type {Object}
   */

  /**
   * @event Client#error
   * @type {Error}
   */

  /**
   * @constructor
   * @param {ClientOptions} options
   */
  constructor (options = {}) {
    /**
     * @private
     */
    this._options = Util.mergeDefault(DefaultClientOptions, options)
    /**
     * @type {String}
     */
    this.url = this._options.url
    /**
     * @type {ResultType}
     */
    this.resultType = this._options.resultType || null
    /**
     * @type {RestClient}
     * @private
     */
    this._token = this._options.token || null
    this._appSignature = this._options.appSignature
    this.emiter = new EventEmmiter()
    this.defaultArgs = {
      baseURL: this.url,
      headers: {
        "Content-Type": "application/json",
        "X-Dto-Client": "rest-dto-node",
        "X-Application": this._options.appSignature || null
      },
      proxy: this._options.proxy || null
    }
  }

  /**
   * @type {ClientOptions}
   * @readonly
   */
  get options () {
    return this._options
  }

  /**
   * @type {String}
   */
  get token () {
    return this._token
  }

  /**
   * @type {String}
   */
  set token (val) {
    this._token = val
  }

  /**
   * @type {String}
   * @readonly
   */
  get appSignature () {
    return this.defaultArgs.headers["X-Application"] || null
  }

  /**
   * Handle rest call via method GET
   * @param {string} path REST path (ex: /auth, /users/32, /devices/6/sensors, ...)
   * @param {Object} [query] Query parameters (ex: ?count=20&sort=ASC)
   * @param {Object} [args] HTTP request arguments
   * @returns {Promise<*>}
   */
  get (endpoint, query = null, args = {}) {
    args.params = query
    return this.request("get", endpoint, args)
  }

  /**
   * Handle rest call via method GET
   * @param {string} path
   * @param {string} postData
   * @param {QueryObject} [query]
   * @param {Object} [args]
   * @returns {Promise<*>}
   */
  post (endpoint, postData, query = null, args = {}) {
    args.data = Util.trimData(postData)
    args.params = query
    return this.request("post", endpoint, args)
  }

  /**
   * Handle rest call via method GET
   * @param {string} path
   * @param {string} postData
   * @param {QueryObject} [query]
   * @param {Object} [args]
   * @returns {Promise<*>}
   */
  patch (endpoint, postData, query = null, args = {}) {
    args = Util.mergeDefault(this.defaultArgs, args)
    args.data = Util.trimData(postData)
    args.params = query
    return this.request("patch", endpoint, args)
  }

  /**
   *
   * @param {string} path
   * @param {QueryObject} query
   * @param {Object} args
   * @returns {Promise<*>}
   */
  delete (endpoint, query = null, args = {}) {
    args = Util.mergeDefault(this.defaultArgs, args)
    args.parameters = query
    return this.request("delete", endpoint, args)
  }

  /**
   * Handle raw rest request call
   * @param {String} method
   * @param {String} endpoint
   * @param {Object} args
   * @fires Rest#request
   * @fires Rest#response
   * @fires Rest#error
   * @return {Promise<*>}
   */
  async request (method, endpoint, args = {}) {
    let request = Util.mergeDefault(this.defaultArgs, args)
    let resultType = request.resultType || this.resultType
    let err, response
    request.method = method
    request.url = typeof endpoint === "string" ? endpoint : endpoint.toString()
    this.injectToken(this.token, request)
    this.emiter.emit("request", request);
    [err, response] = await Util.saferize(axios(request))
    if (err) {
      return this.resolveError(err)
    }
    this.emiter.emit("response", response)
    if (["options", "head"].includes(method)) {
      return resultType === ResultTypes.RESPONSE ? response : response.headers
    }
    this.validateResult(response.data)
    switch (resultType) {
      case ResultTypes.CONTENT_ONLY:
        return response.data.content
      case ResultTypes.DATA:
        return response.data
      default:
        return response
    }
  }

  /**
   * @private
   * @fires Client#error
   */
  resolveError (err) {
    if (err.response && err.response.data && err.response.data.status) {
      err = new CaloriosaApiError(err.response.data.status.code, err.response.data.status.message, err)
    } else if (err.response) {
      err = new RestError(`${err.response.status} - ${err.response.statusText}`, err)
    }
    this.emiter.emit("error", err)
    return Promise.reject(err)
  }

  validateResult (res) {
    if (!res) {
      throw new ReferenceError("No result data given!")
    }
    if (typeof res.content === "undefined") {
      throw new ReferenceError("No content defined in result data!")
    }
    if (!res.status) {
      throw new ReferenceError("No status metadata given from result data!")
    }
  }

  /**
    * Handle an event
    * @param {string} event
    * @param {function} callback
    */
  on (event, callback) {
    return this.emiter.on(event, callback)
  }

  /**
   * @param {String} token
   * @param {Object} args
   * @private
   */
  injectToken (token, args) {
    if (token) {
      args.headers.Authorization = `Bearer ${token}`
    }
  }
}

module.exports = Rest
