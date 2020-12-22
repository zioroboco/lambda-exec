const { run } = require("lambda-exec")

let result

beforeAll(async () => {
  result = await run({
    project: __dirname,
    event: { body: "heart" },
  })
})

it(`exits zero`, async () => {
  expect(result.exitCode).toBe(0)
})
