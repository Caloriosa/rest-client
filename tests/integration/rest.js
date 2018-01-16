const { Rest } = require("../../src/index.js")

const method = process.argv[2] || null
const endpoint = process.argv[3] || "/"

console.log(`Request: ${method} ${endpoint}`)

var rest = new Rest({
  url: "https://jsonplaceholder.typicode.com"
})

rest.request(method, endpoint).then(r => console.dir(r))

process.on("unhandledRejection", e => { console.error(e.stack) })
