const { Rest, typedefs } = require("../../../src/index.js")
const TransformTypes = typedefs.TransformTypes
const DefaultClientOptions = typedefs.DefaultClientOptions
const test = require("ava").test

test("Default options passing", t => {
  var rest = new Rest()
  t.deepEqual(rest.options, DefaultClientOptions)
})

test("Options merge with custom opts", t => {
  var rest = new Rest({
    url: "https://my.api.test"
  })
  t.notDeepEqual(rest.options, DefaultClientOptions)
  t.is(rest.options.url, "https://my.api.test")
  t.is(rest.options.transform, TransformTypes.RESPONSE_DATA)
})

test("Application signature", t => {
  var rest = new Rest()
  t.is(rest.appSignature, null)
  t.throws(() => { rest.appSignature = "blabla" }, TypeError)
  t.is(rest.appSignature, null)
  rest = new Rest({ appSignature: "blabla" })
  t.is(rest.appSignature, "blabla")
  rest.defaultArgs.headers = null
  t.is(rest.appSignature, null)
  rest.defaultArgs.headers = undefined
  t.is(rest.appSignature, null)
})

test("Default args can't be set null or undefined", t => {
  var rest = new Rest()
  t.throws(() => { rest.defaultArgs = null }, TypeError)
  t.throws(() => { rest.defaultArgs = undefined }, TypeError)
})

test("Response transform (default ClientOptions)", t => {
  var rest = new Rest()
  t.is(rest.transform, TransformTypes.RESPONSE_DATA)
  rest.transform = TransformTypes.CONTENT_ONLY
  t.is(rest.transform, TransformTypes.CONTENT_ONLY)
})

test("Response transform (custom ClientOptions)", t => {
  var rest = new Rest({ transform: TransformTypes.CONTENT_ONLY })
  t.is(rest.transform, TransformTypes.CONTENT_ONLY)
  rest.transform = TransformTypes.FULL_RESPONSE
  t.is(rest.transform, TransformTypes.FULL_RESPONSE)
})

test("Agent type", t => {
  var rest = new Rest()
  t.is(rest.defaultArgs.headers["X-Agent-Type"], "user")
  rest = new Rest({
    device: true
  })
  t.is(rest.defaultArgs.headers["X-Agent-Type"], "device")
})
