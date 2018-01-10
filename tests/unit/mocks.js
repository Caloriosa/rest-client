const { Client, UserManager, typedefs } = require("../../src/index.js")
const httpMock = require("node-mocks-http")

exports.mockClient = function () {
  return new Client()
}

exports.mockResponse = function () {
  var res = httpMock.createResponse()
  return res
}

exports.mockStatus = function (code, message) {
  return {code: code, message: message}
}

exports.mockRestMeta = function (status = null, response = null) {
  if (!status) {
    status = exports.mockStatus(typedefs.ApiStatuses.OK, "OK")
  }
  if (!response) {
    response = exports.mockResponse()
  }
  return {status: status, response: response}
}
