module.exports.handler = event => {
  return Promise.resolve(JSON.stringify({ output: event.body }))
}
