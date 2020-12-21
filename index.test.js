let result

beforeAll(() => {
  result = require("docker-lambda")({
    event: { body: "heart" },
    dockerImage: "lambci/lambda:nodejs12.x",
  })
})

it(`works`, () => {
  expect(JSON.parse(result)).toMatchObject({ output: "❤️" })
})
