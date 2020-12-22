import * as execa from "execa"
import { dir } from "tmp-promise"
import { build } from "esbuild"
import { resolve } from "path"

export type Options = Partial<{
  event: object
  project: string
}>

export const defaultOptions: Required<Options> = {
  event: {},
  project: process.cwd(),
}

export const run = async (options?: Options) => {
  const { event, project }: Required<Options> = {
    ...defaultOptions,
    ...(options ?? {}),
  }

  const { path: taskdir, cleanup } = await dir({
    prefix: "lambda-exec",
    unsafeCleanup: true,
  })

  await build({
    entryPoints: [resolve(project, "src/index.ts")],
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
    JSON.stringify(event),
  ]

  const result = await execa("echo", args, { cwd: taskdir })

  cleanup()

  return result
}
