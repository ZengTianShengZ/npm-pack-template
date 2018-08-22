'use strict';

const path = require('path');
const packageConfig = require('../package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}
console.log(`
====pack version=====
      ${packageConfig.version}
====pack version=====
`);

module.exports = {
  context: resolve('src'),
  entry: {
    index: './index.js'
  },
  output: {
    library: 'index',
    libraryTarget: 'umd',
    path: resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js'], //* *Change
    modules: [
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    })
  ]
};
