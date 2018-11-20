const WriteFilePlugin = require("write-file-webpack-plugin");
const path = require("path");

module.exports = {
  configureWebpack: {
    // plugins: [new WriteFilePlugin()]
    entry: {
      background: path.resolve(__dirname, "./src/background.js")
    },
    output: {
      filename: "js/[name].js"
    }
  }
};
