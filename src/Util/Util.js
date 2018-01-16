/**
 * @class Util
 * @static
 */
class Util {
  constructor () {
    throw new Error(`Can't instantiate abstract class ${this.constructor.name}`)
  }

  /**
     * Exports only public r/w properties and variables from entity
     * @param {Object} obj
     * @returns {Object}
     */
  static toRawObject (obj) {
    const data = {}
    Object.keys(obj).forEach(prop => {
      if (prop.startsWith("_") || obj[prop] === undefined) {
        return
      }
      if (typeof (obj[prop]) === "object" && !Array.isArray(obj)) {
        data[prop] = Util.toRawObject(obj[prop])
      }
      data[prop] = obj[prop]
    })
    return data
  }

  /**
   *
   * @param {Object} data
   * @returns {Object}
   * @private
   */
  static trimData (data) {
    if (Array.isArray(data)) {
      const cleanArr = []
      data.forEach(element => {
        cleanArr.push(Util.trimData(element))
      })
      return cleanArr
    }
    if (data instanceof Object) {
      return Util.toRawObject(data)
    }
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
