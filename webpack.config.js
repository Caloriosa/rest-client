const createVariants = require('parallel-webpack').createVariants;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

var variants = {
  minify: [false, true],
}

function createConfig(options) {
  var plugins = []

  if (options.minify) {
    minify = true
    plugins.push(new UglifyJsPlugin())
  }

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `caloriosa-restc${options.minify ? '.min' : ''}.js`,
      library: 'CaloriosaRestClient',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    },
    plugins
  };
}


module.exports = createVariants({}, variants, createConfig);