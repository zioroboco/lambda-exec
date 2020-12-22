const { run } = require("lambda-exec")

let response

beforeAll(async () => {
  response = await run({
    project: __dirname,
    event: { body: "heart" },
  })
})

it(`returns stuff`, async () => {
  expect(JSON.parse(response)).toMatchObject({ output: "❤️" })
})
