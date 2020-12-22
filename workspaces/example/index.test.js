const path = require("path")
const webpack = require("webpack")

let result

const compile = () => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(require("./webpack.config"))
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.error("💥")
      } else {
        console.log("🛎")
      }
      resolve()
    })
  })
}

beforeAll(async () => {
  await compile()

  result = require("docker-lambda")({
    event: { body: "heart" },
    taskDir: path.resolve(__dirname, "build"),
    dockerImage: "lambci/lambda:nodejs12.x",
  })
})

it(`works`, async () => {
  expect(JSON.parse(result)).toMatchObject({ output: "❤️" })
})
