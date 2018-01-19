const { Util } = require("../../../src/index.js")
const test = require("ava").test

test("encodeURIComponent", t => {
  t.is(Util.encodeURIComponent("@"), "@")
  t.is(Util.encodeURIComponent("!"), "!")
  t.is(Util.encodeURIComponent("#"), "%23")
  t.is(Util.encodeURIComponent("$"), "$")
  t.is(Util.encodeURIComponent(" "), "+")
  t.is(Util.encodeURIComponent("+"), "%2B")
  t.is(Util.encodeURIComponent("/"), "%2F")
  t.is(Util.encodeURIComponent("?"), "%3F")
  t.is(Util.encodeURIComponent("-"), "-")
  t.is(Util.encodeURIComponent("."), ".")
  t.is(Util.encodeURIComponent("%2F"), "%252F")
  t.is(Util.encodeURIComponent("%20"), "%2520")
  t.is(Util.encodeURIComponent("@ashley"), "@ashley")
  t.is(Util.encodeURIComponent("../admin"), "..%2Fadmin")
  t.is(Util.encodeURIComponent("Elise Bauman nominated to oscar!"), "Elise+Bauman+nominated+to+oscar!")
})

test("trimData - Simple object and scalars", t => {
  t.is(Util.trimData("I love Ashley"), "I love Ashley")
  t.is(Util.trimData(10), 10)
  t.is(Util.trimData(3.14), 3.14)
  t.is(Util.trimData(null), null)
  t.is(Util.trimData(undefined), undefined)
  t.deepEqual(Util.trimData({}), {})
  t.deepEqual(Util.trimData([]), [])
  t.deepEqual(Util.trimData({ name: "Ashley", id: 255, _log: true }), { name: "Ashley", id: 255 })
  t.deepEqual(Util.trimData([ "Ashley", "Ellen" ]), [ "Ashley", "Ellen" ])
  t.deepEqual(Util.trimData({ _private: true, _id: 33, _activated: false, _type: "internal" }), {})
})

test("trimData - Deep object", t => {
  let obj = {
    _id: 40,
    name: "Elise Bauman",
    tags: [
      {
        _id: 25,
        name: "Actress"
      },
      {
        _id: 27,
        name: "LGBT"
      }
    ],
    addin: {
      _private: true,
      public: false
    }
  }
  t.deepEqual(Util.trimData(obj), {
    name: "Elise Bauman",
    tags: [
      {
        name: "Actress"
      },
      {
        name: "LGBT"
      }
    ],
    addin: {
      public: false
    }
  })
  t.deepEqual(Util.trimData([1, 2, "Ashley", 3.14, { foo: "bar", _diz: 30 }]),
    [1, 2, "Ashley", 3.14, { foo: "bar" }])
})

test("mergeDefault", t => {
  var defaults = {
    url: "http://localhost:6060",
    timeout: 3600,
    keepAlive: true,
    proxy: null,
    auth: {
      login: "admin",
      password: "123456",
      type: "Basic"
    }
  }
  var custom = {
    url: "https://api.caloriosa.com",
    proxy: {
      host: "gw.caloriosa.com",
      port: 8088,
      auth: "admin/admin123"
    },
    auth: {
      login: "root",
      password: "secretpass"
    }
  }
  var expected = {
    url: "https://api.caloriosa.com",
    timeout: 3600,
    keepAlive: true,
    proxy: {
      host: "gw.caloriosa.com",
      port: 8088,
      auth: "admin/admin123"
    },
    auth: {
      login: "root",
      password: "secretpass",
      type: "Basic"
    }
  }
  t.deepEqual(Util.mergeDefault(defaults, custom), expected)
})

test("Clone object", t => {
  var original = {
    name: "foo",
    surname: "bar",
    age: 20
  }
  var cloned = Util.cloneObject(original)
  t.deepEqual(original, cloned)
  original.name = "baz"
  t.not(original.name, cloned.name)
})

test("Can't instantiate Util (static)", t => {
  var error = t.throws(() => {
    var util = new Util()
  }, Error)
  t.is(error.message, "Can't instantiate static class!")
})
