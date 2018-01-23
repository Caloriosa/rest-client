const { Rest, buildRoute } = require("../../../src/index.js")
const test = require("ava").test

function router () {
  return buildRoute(new Rest())
}

test("Route to string", t => {
  t.is(router().users.me.toString(), "/users/me")
  t.is(router().users("@ashley").toString(), "/users/@ashley")
  t.is(router().users("abcd").devices.toString(), "/users/abcd/devices")
})

test("Compose route", t => {
  var route = router().users
  t.is(route.toString(), "/users")
  t.is(route.me.toString(), "/users/me")
})

test("Route requesters", t => {
  var route = router().devices
  t.is(typeof route.post, "function")
  t.is(typeof route.get, "function")
  t.is(typeof route.put, "function")
  t.is(typeof route.patch, "function")
  t.is(typeof route.delete, "function")
  t.is(typeof route.head, "function")
  t.is(typeof route.options, "function")
})
