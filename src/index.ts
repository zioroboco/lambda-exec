import * as emoji from "node-emoji"

export const handler = event => {
  const name: string = event.body
  return Promise.resolve(
    JSON.stringify({
      output: emoji.get(name),
    })
  )
}
