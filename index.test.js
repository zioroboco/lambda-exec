const path = require("path")

let result

beforeAll(() => {
  result = require("docker-lambda")({
    event: { body: "heart" },
    taskDir: path.resolve(__dirname, "build"),
    dockerImage: "lambci/lambda:nodejs12.x",
  })
})

it(`works`, () => {
  expect(JSON.parse(result)).toMatchObject({ output: "❤️" })
})
