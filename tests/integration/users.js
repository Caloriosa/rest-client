const Caloriosa = require("../../src/index.js")
const config = require("./config.json")

var caloriosa = Caloriosa.createApiClient(config.client)
caloriosa.api.users.get( {filter: {login: "ashley", bool: true}} ).then(console.dir)

process.on("unhandledRejection", e => { console.error(e.stack) })
