const { runSync } = require("lambda-exec")
const webpack = require("webpack")

let result

const compile = () => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(require("./webpack.config"))
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.error("💥 ", stats.toString())
      } else {
        console.log("🛎 ", stats.toString())
      }
      resolve()
    })
  })
}

beforeAll(async () => {
  await compile()

  result = runSync({ event: { body: "heart" } })
})

it(`exits zero`, async () => {
  expect(result.exitCode).toBe(0)
})
