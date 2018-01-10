const { Rest } = require("../../src/index.js")

var rest = new Rest({
  url: "https://jsonplaceholder.typicode.com"
})
rest.get(process.argv[process.argv.length - 1])
  .then(response => console.dir(response.data))

process.on("unhandledRejection", e => { console.error(e) })
