const Util = require("./Util/Util")
const Client = require("./Client/Client")
const typedefs = require("./Util/typedefs")

module.exports = {
  // Main classes
  Client,
  Rest: require("./Client/Rest"),
  CaloriosaApiError: require("./Client/CaloriosaApiError"),
  RestError: require("./Client/RestError"),

  // Utilities
  DataResolver: require("./Util/DataResolver"),
  buildRoute: require("./Util/buildRoute"),
  typedefs,
  Util,
  util: Util,

  // Shortcuts
  saferize: Util.saferize,
  ApiStatuses: typedefs.ApiStatuses,
  UserRoles: typedefs.UserRoles,
  SensorTypes: typedefs.SensorTypes,
  IdentityTypes: typedefs.IdentityTypes,
  createApiClient: Client.createApiClient
}
