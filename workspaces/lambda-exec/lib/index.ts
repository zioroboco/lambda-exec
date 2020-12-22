import * as execa from "execa"
import { dir } from "tmp-promise"
import { build } from "esbuild"

export type Options = {
  event: object
  handler: string
}

export const run = async (options: Options) => {
  const { path: taskdir, cleanup } = await dir({
    prefix: "lambda-exec",
    unsafeCleanup: true,
  })

  await build({
    entryPoints: [options.handler],
    outdir: taskdir,
    bundle: true,
    sourcemap: "external",
    platform: "node",
    target: "node12.14", // matching lambci/lambda:node12.x
  }).catch(err => {
    console.error(err)
    process.exit(1)
  })

  const args = [
    "run",
    "--volume",
    `${taskdir}:/var/task`,
    "--rm",
    "lambci/lambda:nodejs12.x",
    "index.handler",
    JSON.stringify(options.event),
  ]

  const result = await execa("docker", args, { cwd: taskdir })

  cleanup()

  return JSON.parse(result.stdout)
}
