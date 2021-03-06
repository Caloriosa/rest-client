const { DefaultClientOptions, TransformTypes } = require("../Util/typedefs")
const EventEmmiter = require("events")
const axios = require("axios")
const qs = require("qs")
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
     * @type {ClientOptions}
     * @private
     */
    this._options = Util.mergeDefault(DefaultClientOptions, options || {})
    /**
     * @type {String}
     */
    this.url = this._options.url
    /**
     * @type {TransformType}
     */
    this.transform = this._options.transform || null
    /**
     * @type {RestClient}
     * @private
     */
    this._token = this._options.token || null
    this._isDevice = this._options.device || false
    this._appSignature = this._options.appSignature
    this.emiter = new EventEmmiter()
    this._defaultArgs = {
      baseURL: this.url,
      headers: {
        "Content-Type": "application/json",
        "X-Dto-Client": "caloriosa-rest-client",
        "X-Agent-Type": this._options.device ? "device" : "user",
        "X-Application": this._options.appSignature || null
      },
      proxy: this._options.proxy || null,
      paramsSerializer: function (params) {
        return qs.stringify(params, { encode: false })
      }
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
   * @type {Object}
   */
  get defaultArgs () {
    return this._defaultArgs || null
  }

  /**
   * @type {Object}
   */
  set defaultArgs (val) {
    if (!val) {
      throw new TypeError("Default arguments for rest http client can't be set null or undefined!")
    }
    this._defaultArgs = val
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
    if (!this.defaultArgs.headers) {
      return null
    }
    return this.defaultArgs.headers["X-Application"] || null
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
  async request (method, endpoint, args = {}, transform = null) {
    let request = Util.mergeDefault(this.defaultArgs, args)
    let err, response
    transform = transform || this.transform || TransformTypes.FULL_RESPONSE
    request.method = method
    request.url = typeof endpoint === "string" ? endpoint : endpoint.toString()
    request.data = request.data ? Util.trimData(request.data) : null
    this.injectToken(this.token, request)
    this.emiter.emit("request", request);
    [err, response] = await Util.saferize(axios(request))
    if (err) {
      throw this.resolveError(err)
    }
    this.emiter.emit("response", response)
    if (["options", "head"].includes(method)) {
      return transform === TransformTypes.FULL_RESPONSE ? response : response.headers
    }
    this.validateResult(response.data)
    switch (transform) {
      case TransformTypes.CONTENT_ONLY:
        return response.data.content
      case TransformTypes.STATUS_ONLY:
        return response.data.status
      case TransformTypes.RESPONSE_DATA:
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
      err = new RestError(err.response.statusText ? `${err.response.status} - ${err.response.statusText}` : err.message, err)
    }
    this.emiter.emit("error", err)
    return err
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
