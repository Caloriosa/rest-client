const createVariants = require('parallel-webpack').createVariants;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

var variants = {
  minify: [false, true],
  target: ['web', 'node']
}

function createConfig(options) {
  var plugins = []
  var target = {
    node: 'umd',
    web: 'window'
  }

  if (options.minify) {
    minify = true
    plugins.push(new UglifyJsPlugin())
  }

  return {
    target: options.target,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `caloriosa-restc.${options.target}${options.minify ? '.min' : ''}.js`,
      library: 'CaloriosaRestClient',
      libraryTarget: target[options.target]
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