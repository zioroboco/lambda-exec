const { run } = require("lambda-exec")

let response

beforeAll(async () => {
  response = await run({
    handler: require.resolve("./src/index"),
    event: { body: "heart" },
  })
})

it(`returns stuff`, async () => {
  expect(JSON.parse(response)).toMatchObject({ output: "❤️" })
})
