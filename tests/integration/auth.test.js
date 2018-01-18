const Caloriosa = require("../../src/index.js")
const nock = require("nock")
const test = require("ava").test

var samples = {
  authInfo: {
    token: "abcdefghijk",
    type: "user",
    expireAt: "2017-01-19 08:53:00 UTC",
    identityId: "ertzuio5453224"
  },
  loggedUser: {
    _id: "ertzuio5453224",
    login: "elise",
    role: "member",
    name: "Elise Bauman",
    activated: true
  }
}

test.beforeEach("Setup nock", t => {
  nock("http://localhost:6060")
    .post("/auth", { login: "elise", password: "pass321abc" })
    .reply(200, {
      status: {
        code: "OK",
        message: "OK"
      },
      content: samples.authInfo
    })
  nock("http://localhost:6060", {
    reqheaders: {
      "authorization": "Bearer abcdefghijk"
    }
  })
    .delete("/auth")
    .reply(200, {
      status: {
        code: "OK",
        message: "OK"
      },
      content: {}
    })
    .get("/users/me")
    .reply(200, {
      status: {
        code: "OK",
        message: "OK"
      },
      content: samples.loggedUser
    })
})

test("Authenticate user (login)", async t => {
  var caloriosa = Caloriosa.createApiClient()
  var authInfo = await caloriosa.login("elise", "pass321abc")
  t.is(authInfo.type, "user")
  t.is(authInfo.token, "abcdefghijk")
  t.is(caloriosa.token, authInfo.token)
})

test("Get logged user (via api.users.me)", async t => {
  var caloriosa = Caloriosa.createApiClient()
  caloriosa.token = "abcdefghijk"
  t.is(caloriosa.token, "abcdefghijk")
  var me = await caloriosa.api.users.me.get()
  t.is(me.content.login, "elise")
  t.is(me.content.role, "member")
  t.is(me.content.name, "Elise Bauman")
  t.is(me.content.activated, true)
})

test("User logout", async t => {
  var caloriosa = Caloriosa.createApiClient()
  caloriosa.token = "abcdefghijk"
  t.is(caloriosa.token, "abcdefghijk")
  await caloriosa.logout()
  t.is(caloriosa.token, null)
})

test("All together (login + get me + logout)", async t => {
  var caloriosa = Caloriosa.createApiClient()
  t.is(caloriosa.token, null)
  await caloriosa.login("elise", "pass321abc")
  t.is(caloriosa.token, "abcdefghijk")
  var me = await caloriosa.api.users.me.get()
  t.deepEqual(me.content, samples.loggedUser)
  await caloriosa.logout()
  t.is(caloriosa.token, null)
})
