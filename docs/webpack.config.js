const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./init-wasm.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "init-wasm.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
};
