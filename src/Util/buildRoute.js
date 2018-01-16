/** @namespace Router */

const { resolveUid } = require("./DataResolver")
const noop = () => {} // eslint-disable-line no-empty-function
const methods = ["get", "post", "delete", "patch", "put", "options", "head"]
const reflectors = [
  "toString", "valueOf", "inspect", "constructor", "call",
  Symbol.toPrimitive, Symbol.for("util.inspect.custom"), Symbol("util.inspect.custom")
]

if (typeof util !== "undefined") { // eslint-disable-line
  reflectors.push(util.inspect.custom) // eslint-disable-line no-undef
}

/**
 * @param {Rest} rest
 * @param {String} method
 * @param {String} endpoint
 * @returns {Function}
 * @memberof Router
 * @private
 */
function makeRequestFor (rest, method, endpoint) {
  return (...params) => {
    let data, query, transform, args
    if (["post", "patch", "put"].includes(method)) {
      [ data, query, transform, args = {} ] = params
    } else {
      [ query, transform, args = {} ] = params
    }
    args.params = query || null
    args.data = data || null
    args.transform = transform || null
    return rest.request(method, endpoint, args)
  }
}

/**
 * @param {Rest} rest
 * @return {Route}
 * @memberof Router
 */
function buildRoute (rest) {
  const route = [""]
  const handler = {
    get (target, name) {
      if (reflectors.includes(name)) return () => route.join("/")
      if (methods.includes(name)) {
        return makeRequestFor(rest, name, route.join("/"))
      }
      route.push(name.toString())
      return new Proxy(noop, handler)
    },
    apply (target, _, args) {
      route.push(...args.filter(x => x != null).map(x => encodeURIComponent(x))) // eslint-disable-line eqeqeq
      return new Proxy(noop, handler)
    }
  }
  return new Proxy(noop, handler)
}

module.exports = buildRoute
