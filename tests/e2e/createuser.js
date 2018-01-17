const { createApiClient, User } = require("../../src/index.js")
const config = require("./config.json")

var caloriosa = createApiClient(config.client)
caloriosa.token = "aasdasdd"
var user = {
  login: "carmilla",
  email: "I@suck.blood",
  name: "Carmilla Karnstein",
  password: "ibiteyoucupcake"
}

caloriosa.api.users.post(user).then(console.dir)

process.on("unhandledRejection", e => { console.error(e.stack) })
