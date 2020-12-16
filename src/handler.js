const emoji = require("node-emoji")

module.exports = event => {
  return Promise.resolve(
    JSON.stringify({
      output: emoji.get(event.body),
    })
  )
}
