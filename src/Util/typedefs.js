/**
 * Type definitions, structures, enums and defaults
 * @namespace Typedefs
 */

/**
 * @typedef {String} UserRole
 * @memberof Typedefs
 */

/**
 * @readonly
 * @enum {UserRole}
 * @name UserRoles
 * @memberof Typedefs
 * @property {UserRole} ADMIN
 * @property {UserRole} MEMBER
 * @property {UserRole} UNKNOWN
 */
exports.UserRoles = {
  ADMIN: "admin",
  MEMBER: "member",
  UNKNOWN: "unknown"
}

/**
 * @typedef {String} IdentityType
 * @memberof Typedefs
 */

/**
 * @readonly
 * @enum {IdentityType}
 * @name IdentityTypes
 * @memberof Typedefs
 * @property {string} [USER="user"]
 * @property {string} [DEVICE="device"]
 * @property {string} [UNKNOWN="unknown"]
 */
exports.IdentityTypes = {
  USER: "user",
  DEVICE: "device",
  UNKNOWN: "unknown"
}

/**
 * @typedef {String} SensorType
 * @memberof Typedefs
 */

/**
 * @readonly
 * @enum {SensorType}
 * @name SensorTypes
 * @memberof Typedefs
 * @property {String} [TEMPERATURE=temperature]
 * @property {String} [WIND_SPEED=windSpeed]
 * @property {String} [HUMIDITY=humidity]
 */
exports.SensorTypes = {
  TEMERATURE: "temperature",
  WIND_SPEED: "windSpeed",
  HUMIDITY: "humidity"
}

/**
 * @typedef {String} ResultType
 * @property {String} [CONTENT_ONLY=contentOnly]
 * @property {String} [STATUS_ONLY=statusOnly]
 * @property {String} [RESPONSE_DATA=data]
 * @property {String} [FULL_RESPONSE=response]
 */
/**
 * @type ResultType
 */
var ResultTypes = exports.ResultTypes = {
  CONTENT_ONLY: "contentOnly",
  STATUS_ONLY: "statusOnly",
  RESPONSE_DATA: "data",
  FULL_RESPONSE: "response"
}

/**
 * @typedef {Object} HttpProxy
 * @memberof Typedefs
 *
 * @property {String} [host=localhost]
 * @property {Number} [port=8080]
 * @property {String} [user=proxyuser]
 * @property {String} [password]
 * @property {Boolean} [tunnel=true]
 */
exports.DefaultHttpProxy = {
  host: "localhost",
  port: 8080,
  user: "proxyuser",
  password: "",
  tunnel: true
}

/**
 * @typedef {Object} ClientOptions
 * @memberof Typedefs
 *
 * @property {String} [url=http://localhost:6060]
 * @property {String} [token=null]
 * @property {String} [appSignature=null]
 * @property {ResultType} [resultType=ResultTypes.DATA]
 * @property {HttpProxy} [proxy=null]
 */
exports.DefaultClientOptions = {
  url: "http://localhost:6060",
  token: null,
  appSignature: null,
  resultType: ResultTypes.RESPONSE_DATA,
  proxy: null
}

/**
 * @typedef {Object} AuthInfo
 * @memberof Typedefs
 *
 * @property {string} token
 * @property {string} created
 * @property {string} expires
 */

/**
 * @typedef {Object} QueryObject
 * @memberof Typedefs
 */

/**
 * @typedef {Object|Array} ContentData
 * @memberof Typedefs
 */

/**
 * @typedef {Object} StatusData
 * @memberof Typedefs
 *
 * @property {ApiStatus} code
 * @property {string} message
 */

/**
 * @typedef {ContentData|String} UidResolvable
 * @memberof Typedefs
 */

/**
 * @typedef {Proxy} Route
 * @memberof Typedefs
 */

/**
 * @typedef {String} ApiStatus
 * @memberof Typedefs
 */

/**
 * @readonly
 * @enum {ApiStatus}
 * @name ApiStatuses
 * @memberof Typedefs
 *
 * @property {ApiStatus} OK
 * @property {ApiStatus} CREATED
 * @property {ApiStatus} DUPLICATED
 * @property {ApiStatus} NOT_FOUND
 * @property {ApiStatus} DATASOURCE_ERROR
 * @property {ApiStatus} PERMISSION_DENIED
 * @property {ApiStatus} UNAUTHORIZED
 * @property {ApiStatus} UNAVAILABLE
 * @property {ApiStatus} REMOVE_FAILED
 * @property {ApiStatus} AUTH_FAILED
 * @property {ApiStatus} INVALID_DATA
 * @property {ApiStatus} INVALID_CREDENTIALS
 * @property {ApiStatus} INVALID_SENSOR
 * @property {ApiStatus} INVALID_TOKEN
 * @property {ApiStatus} TOKEN_EXPIRED
 * @property {ApiStatus} USER_EXISTS
 * @property {ApiStatus} WEAK_PASSWORD
 * @property {ApiStatus} INVALID_PASSWORD
 * @property {ApiStatus} INVALID_USERNAME
 * @property {ApiStatus} INVALID_EMAIL
 * @property {ApiStatus} PASSWORD_MISMATCH
 * @property {ApiStatus} ACTIVATION_FAILED
 * @property {ApiStatus} DATA_INCOMPLETE
 * @property {ApiStatus} METHOD_NOT_ALLOWED
 * @property {ApiStatus} NOT_IMPLEMENTED
 * @property {ApiStatus} TIMED_OUT
 * @property {ApiStatus} SERVICE_UNAVAILABLE
 * @property {ApiStatus} BUSY
 * @property {ApiStatus} UNKNOWN
 */
exports.ApiStatuses = {
  OK: "OK",
  CREATED: "CREATED",
  ACCEPTED: "ACCEPTED",
  DUPLICATED: "DUPLICATED",
  NOT_FOUND: "NOT_FOUND",
  DATASOURCE_ERROR: "DATASOURCE_ERROR",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  UNAUTHORIZED: "UNAUTHORIZED",
  UNAVAILABLE: "UNAVAILABLE",
  REMOVE_FAILED: "REMOVE_FAILED",
  AUTH_FAILED: "AUTH_FAILED",
  INVALID_DATA: "INVALID_DATA",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_SENSOR: "INVALID_SENSOR",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  USER_EXISTS: "USER_EXISTS",
  WEAK_PASSWORD: "WEAK_PASSWORD",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  INVALID_USERNAME: "INVALID_USERNAME",
  INVALID_EMAIL: "INVALID_EMAIL",
  PASSWORD_MISMATCH: "PASSWORD_MISMATCH",
  ACTIVATION_FAILED: "ACTIVATION_FAILED",
  DATA_INCOMPLETE: "DATA_INCOMPLETE",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
  TIMED_OUT: "TIMED_OUT",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  BUSY: "BUSY",
  UNKNOWN: "UNKNOWN"
}
