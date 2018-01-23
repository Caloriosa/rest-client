const Caloriosa = require("../../../src/index.js")
const test = require("ava").test

test("isDevice flag", t => {
  var client = new Caloriosa.Client()
  t.false(client.isDevice)
  client = new Caloriosa.Client({ device: true })
  t.true(client.isDevice)
})

test("Token passing by setter", t => {
  var client = new Caloriosa.Client()
  t.is(client.token, null)
  client.token = "abcdefgh"
  t.is(client.token, "abcdefgh")
})

test("Token passing by client options", t => {
  var client = new Caloriosa.Client({ token: "abcdefgh" })
  t.is(client.token, "abcdefgh")
})
