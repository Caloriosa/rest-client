const { createApiClient, AuthInfo } = require("../../src/index.js")
const config = require("./config.json")

var caloriosa = createApiClient(config.client)

caloriosa.login("Ashleynka", "123").then(authInfo => {
  console.dir(authInfo)
  console.log("\n--------------------------------")
  console.log("Token: " + authInfo.token)
  console.log("ExpireAt: " + authInfo.expireAt)
  console.log("Type: " + authInfo.type)
  console.log("IdentityID: " + authInfo.identityId)
  console.log("Aquired token to client: " + caloriosa.token)
})

process.on("unhandledRejection", e => { console.error(e.stack) })
