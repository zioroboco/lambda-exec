import * as execa from "execa"
import { resolve } from "path"

export type Options = { taskDir: string; event: object }

export const defaultOptions: Options = {
  taskDir: process.cwd(),
  event: {},
}

export const runSync = (options?: Partial<Options>) => {
  const { event, taskDir }: Options = {
    ...defaultOptions,
    ...(options ?? {}),
  }

  const args = [
    "run",
    "--volume",
    `${taskDir}:/var/task`,
    "--rm",
    "lambci/lambda:nodejs12.x",
    "index.handler",
    JSON.stringify(event),
  ]

  execa.sync("cd", [resolve(__dirname)])
  const result = execa.sync("echo", args)

  return result
}
