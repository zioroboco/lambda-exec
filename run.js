const { resolve } = require("path")

const thing = require("docker-lambda")({
  event: { body: "heart" },
  dockerImage: "lambci/lambda:nodejs12.x",
})

console.log(thing)
