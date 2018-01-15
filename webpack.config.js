var path = require('path')

var common = {
  entry: './src/index.js',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};

var server = Object.assign({
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'caloriosa-restc.node.js',
    library: 'caloriosaRestClient',
    libraryTarget: 'umd'
  }
}, common)

var client = Object.assign({
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'caloriosa-restc.web.js',
    library: 'caloriosaRestClient',
    libraryTarget: 'window'
  }
}, common)

module.exports = [server, client]