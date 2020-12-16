const { resolve } = require("path")

const thing = require("docker-lambda")({
  event: { body: "🧪" },
  taskDir: resolve(__dirname, "src"),
  dockerImage: "lambci/lambda:nodejs12.x",
})

console.log(thing)
