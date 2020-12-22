const { resolve } = require("path")
const { runSync } = require("lambda-exec")
const { build } = require("esbuild")

let result

beforeAll(async () => {
  await build({
    entryPoints: [resolve(__dirname, "src/index.ts")],
    outfile: resolve(__dirname, "build/index.js"),
    bundle: true,
    sourcemap: "external",
    platform: "node",
    target: "node12.14", // matching lambci/lambda:node12.x
  }).catch(err => {
    console.error(err)
    process.exit(1)
  })

  result = runSync({ event: { body: "heart" } })
})

it(`exits zero`, async () => {
  expect(result.exitCode).toBe(0)
})
