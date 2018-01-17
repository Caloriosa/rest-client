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
  created: {
    _id: "abcdefg",
    login: "elise",
    name: "Elise Bauman",
    role: "member",
    activated: false
  }
}

test("Get users", async t => {
  nock("http://localhost:6060")
    .get("/users")
    .reply(200, {
      status: {
        code: "OK",
        message: "OK"
      },
      content: samples.users
    })
  var caloriosa = Caloriosa.createApiClient()
  var users = await caloriosa.api.users.get(/* {filter: {login: "ashley", bool: true}} */)
  t.is(users.status.code, "OK")
  t.is(users.status.message, "OK")
  t.deepEqual(users.content, samples.users)
})

test("Create user", async t => {
  nock("http://localhost:6060")
    .post("/users", { login: "elise", password: "pass321abc", name: "Elise Bauman" })
    .reply(200, {
      status: {
        code: "OK",
        message: "OK"
      },
      content: samples.created
    })
  var caloriosa = Caloriosa.createApiClient()
  var created = await caloriosa.api.users.post({ login: "elise", password: "pass321abc", name: "Elise Bauman" })
  t.deepEqual(created.content, samples.created)
})
