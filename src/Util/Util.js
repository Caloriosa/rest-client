/**
 * @class Util
 * @static
 */
class Util {
  constructor () {
    throw new Error(`Can't instantiate abstract class ${this.constructor.name}`)
  }

  /**
   * Exports only public r/w properties and variables from entity.
   * Scalars and arrays converts 1:1. Instances of class converts to native Object,
   * loss getters, setters and methods (prepare to serialization)
   * @param {*} obj
   * @returns {Object|Array|*}
   */
  static trimData (obj) {
    if (!obj || typeof obj !== "object") {
      return obj
    }
    let data = Array.isArray(obj) ? [] : {}
    Object.keys(obj).forEach(prop => {
      if (prop.startsWith("_") || obj[prop] === undefined) {
        return
      }
      if (typeof (obj[prop]) === "object") {
        data[prop] = Util.trimData(obj[prop])
      } else {
        data[prop] = obj[prop]
      }
    })
    return data
  }

  /**
     * Create copy of an instance
     * @param {Object} obj
     */
  static cloneObject (obj) {
    return Object.assign(Object.create(obj), obj)
  }

  /**
     * Sets default properties on an object that aren't already specified.
     * @param {Object} def Default properties
     * @param {Object} given Object to assign defaults to
     * @returns {Object}
     */
  static mergeDefault (def, given) {
    if (!given) { return def }
    for (const key in def) {
      if (!{}.hasOwnProperty.call(given, key)) {
        given[key] = def[key]
      } else if (given[key] === Object(given[key])) {
        given[key] = this.mergeDefault(def[key], given[key])
      }
    }
    return given
  }

  /**
    * Process promise with auto-catch error.
    * Result includes a resolved content and catched error.
    * @param {Promise} promise
    * @returns {Promise<ResultSet<Error,*>>}
    */
  static saferize (promise) {
    return promise.then(data => [null, data])
      .catch(err => [err])
  }

  /**
   * @param {String} param
   */
  static encodeURIComponent (param) {
    // Encode URI component with whitelisted chars @$:% and encode space as +
    let patterns = [[/%40/gi, "@"], [/%24/gi, "$"], [/%3A/gi, ":"], [/%20/gi, "+"]]
    let enc = encodeURIComponent(param)
    for (let i = 0; i < patterns.length; i++) {
      let pat = patterns[i]
      enc = enc.replace(pat[0], pat[1] || null)
    }
    return enc
  }
}

module.exports = Util
