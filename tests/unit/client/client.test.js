const { Client, Rest } = require("../../../src/index.js")
const test = require("ava").test

function createClient (opts = {}) {
  return new Client(new Rest(opts))
}

test("isDevice flag", t => {
  var client = createClient()
  t.false(client.isDevice)
  client = createClient({ device: true })
  t.true(client.isDevice)
})

test("Token passing by setter", t => {
  var client = createClient()
  t.is(client.token, null)
  client.token = "abcdefgh"
  t.is(client.token, "abcdefgh")
})

test("Token passing by client options", t => {
  var client = createClient({ token: "abcdefgh" })
  t.is(client.token, "abcdefgh")
})
