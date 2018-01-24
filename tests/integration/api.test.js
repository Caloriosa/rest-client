const Caloriosa = require("../../src/index.js")
const nock = require("nock")
const test = require("ava").test

var samples = {
  users: [
    {
      _id: "sdfdfg46sd5g4f",
      login: "ashley",
      name: "Lovely Ashley",
      role: "admin",
      activated: true
    }
  ],
  user: {
    _id: "sdfdfg46sd5g4f",
    login: "ashley",
    name: "Lovely Ashley",
    role: "admin",
    activated: true
  },
  created: {
    _id: "abcdefg",
    login: "elise",
    name: "Elise Bauman",
    role: "member",
    activated: false
  }
}

test.before("Setup nock", t => {
  nock("http://localhost:6060")
    .get("/users")
    .reply(200, {
      status: {
        code: "OK",
        message: "OK"
      },
      content: samples.users
    })
    .get("/users")
    .query({
      filter: {
        login: "ashley"
      }
    })
    .reply(200, {
      status: {
        code: "OK",
        message: "OK"
      },
      content: samples.users
    })
    .get("/users/@ashley")
    .reply(200, {
      status: {
        code: "OK",
        message: "OK"
      },
      content: samples.user
    })
    .post("/users", { login: "elise", password: "pass321abc", name: "Elise Bauman" })
    .reply(201, {
      status: {
        code: "CREATED",
        message: "Content created"
      },
      content: samples.created
    }).get("/users/@natvanlis")
    .reply(404, {
      status: {
        code: "NOT_FOUND",
        message: "Resource not found"
      }
    })
})

test("Get users", async t => {
  var caloriosa = new Caloriosa.Client()
  var users = await caloriosa.api.users.get()
  t.is(users.status.code, "OK")
  t.is(users.status.message, "OK")
  t.deepEqual(users.content, samples.users)
})

test("Get users filtered", async t => {
  var caloriosa = new Caloriosa.Client()
  var users = await caloriosa.api.users.get({ filter: { login: "ashley" } })
  t.pass()
})

test("Get user by login", async t => {
  var caloriosa = new Caloriosa.Client()
  var user = await caloriosa.api.users("@ashley").get()
  t.is(user.status.code, Caloriosa.ApiStatuses.OK)
  t.is(user.status.message, "OK")
  t.deepEqual(user.content, samples.user)
})

test("Create user", async t => {
  var caloriosa = new Caloriosa.Client()
  var created = await caloriosa.api.users.post({ login: "elise", password: "pass321abc", name: "Elise Bauman" })
  t.is(created.status.code, Caloriosa.ApiStatuses.CREATED)
  t.is(created.status.message, "Content created")
  t.deepEqual(created.content, samples.created)
})

test("User not found", async t => {
  var caloriosa = new Caloriosa.Client()
  var error = await t.throws(caloriosa.api.users("@natvanlis").get(), Caloriosa.CaloriosaApiError)
  t.is(error.statusCode, 404)
  t.is(error.code, Caloriosa.ApiStatuses.NOT_FOUND)
})
