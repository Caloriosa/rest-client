const Caloriosa = require("../../src/index.js")
const nock = require("nock")
const test = require("ava").test

test.beforeEach("Setup nock", t => {
  nock("http://localhost:6060")
    .get("/empty")
    .reply(200, null)
    .get("/nostatus")
    .reply(200, {
      content: {
        name: "Foo",
        surname: "Bar"
      }
    })
    .get("/nocontent")
    .reply(200, {
      status: {
        code: "OK",
        message: "OK"
      }
    })
    .get("/error")
    .reply(500, {
      status: {
        code: "UNKNOWN",
        message: "Internal server error"
      },
      content: null
    })
    .get("/error/general")
    .reply(500)
})

test("Empty result", async t => {
  var caloriosa = new Caloriosa.Client()
  var error = await t.throws(caloriosa.api.empty.get(), ReferenceError)
  t.is(error.message, "No result data given!")
})

test("No status", async t => {
  var caloriosa = new Caloriosa.Client()
  var error = await t.throws(caloriosa.api.nostatus.get(), ReferenceError)
  t.is(error.message, "No status metadata given from result data!")
})

test("Undefined content", async t => {
  var caloriosa = new Caloriosa.Client()
  var error = await t.throws(caloriosa.api.nocontent.get(), ReferenceError)
  t.is(error.message, "No content defined in result data!")
})

test("Server error (CaloriosaApiError)", async t => {
  var caloriosa = new Caloriosa.Client()
  var error = await t.throws(caloriosa.api.error.get(), Caloriosa.CaloriosaApiError)
  t.is(error.code, Caloriosa.ApiStatuses.UNKNOWN)
  t.is(error.statusCode, 500)
  t.is(error.message, "Internal server error")
})

test("General server error (RestError)", async t => {
  var caloriosa = new Caloriosa.Client()
  var error = await t.throws(caloriosa.api.error.general.get(), Caloriosa.RestError)
  t.is(error.message, "Request failed with status code 500")
})
