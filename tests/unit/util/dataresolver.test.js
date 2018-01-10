const { DataResolver, User } = require("../../../src/index.js")
const test = require("ava").test

test("resolve UID", t => {
  var user = {
    _id: "5a23d11025a09c281cd3ca13",
    login: "admin",
    password: "heslo123",
    email: "admin@localhost.dev",
    name: "Natasha Negovanlis",
    _created: "2017-12-02 21:57 UTC",
    activated: true,
    role: "admin"
  }
  var uid = user._id
  var someObject = {foo: "bar"}
  var number = 15
  t.is(DataResolver.resolveUid(user), "5a23d11025a09c281cd3ca13")
  t.is(DataResolver.resolveUid(uid), "5a23d11025a09c281cd3ca13")
  t.is(DataResolver.resolveUid(someObject), null)
  t.is(DataResolver.resolveUid(number), null)
})
