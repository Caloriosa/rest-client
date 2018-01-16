const { Util } = require("../../../src/index.js")
const test = require("ava").test

test("encodeURIComponent", t => {
  t.is(Util.encodeURIComponent("@"), "@")
  t.is(Util.encodeURIComponent("!"), "!")
  t.is(Util.encodeURIComponent("#"), "%23")
  t.is(Util.encodeURIComponent("$"), "$")
  t.is(Util.encodeURIComponent("%"), "%")
  t.is(Util.encodeURIComponent(" "), "+")
  t.is(Util.encodeURIComponent("+"), "%2B")
  t.is(Util.encodeURIComponent("/"), "%2F")
  t.is(Util.encodeURIComponent("?"), "%3F")
  t.is(Util.encodeURIComponent("-"), "-")
  t.is(Util.encodeURIComponent("."), ".")
  t.is(Util.encodeURIComponent("@ashley"), "@ashley")
  t.is(Util.encodeURIComponent("../admin"), "..%2Fadmin")
  t.is(Util.encodeURIComponent("Elise Bauman nominated to oscar!"), "Elise+Bauman+nominated+to+oscar!")
})
