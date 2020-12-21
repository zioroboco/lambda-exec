const path = require("path")
const webpack = require("webpack")

/** @type webpack.Configuration */
const config = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src",
  target: "node",
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
}

module.exports = config
