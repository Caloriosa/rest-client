const Caloriosa = require("../../src/index.js")
const config = require("./config.json")

var caloriosa = Caloriosa.createApiClient(config.client)
caloriosa.api.users("@Ashleynka").get().then(console.dir)

process.on("unhandledRejection", e => { console.error(e.stack) })
