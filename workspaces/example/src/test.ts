import { run } from "lambda-exec"

let response

beforeAll(async () => {
  response = await run({
    handler: require.resolve("."),
    event: { body: "heart" },
  })
})

it(`returns stuff`, async () => {
  expect(JSON.parse(response)).toMatchObject({ output: "❤️" })
})
