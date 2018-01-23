const Caloriosa = require("../../src/index.js")
const TransformTypes = Caloriosa.typedefs.TransformTypes
const nock = require("nock")
const test = require("ava").test

test.beforeEach("Setup nock", t => {
  nock("http://localhost:6060")
    .get("/anydata")
    .reply(200, {
      status: {
        code: "OK",
        message: "OK"
      },
      content: {
        name: "Foo",
        surname: "Bar"
      }
    })
    .head("/anydata")
    .reply(200, null, {
      "X-Test": "test ok"
    })
})

test("Content only", async t => {
  var client = new Caloriosa.Client()
  let content = await client.api.anydata.get(null, TransformTypes.CONTENT_ONLY)
  t.is(content.name, "Foo")
  t.is(content.surname, "Bar")
})

test("Status only", async t => {
  var client = new Caloriosa.Client()
  let status = await client.api.anydata.get(null, TransformTypes.STATUS_ONLY)
  t.is(status.code, "OK")
  t.is(status.message, "OK")
})

test("Response data", async t => {
  var client = new Caloriosa.Client()
  let data = await client.api.anydata.get(null, TransformTypes.RESPONSE_DATA)
  t.is(data.content.name, "Foo")
  t.is(data.content.surname, "Bar")
  t.is(data.status.code, "OK")
  t.is(data.status.message, "OK")
})

test("Full response", async t => {
  var client = new Caloriosa.Client()
  let response = await client.api.anydata.get(null, TransformTypes.FULL_RESPONSE)
  t.is(response.data.content.name, "Foo")
  t.is(response.data.status.code, "OK")
  t.is(response.status, 200)
})

test("Head", async t => {
  var client = new Caloriosa.Client()
  let headers = await client.api.anydata.head()
  t.is(headers["x-test"], "test ok")
})
