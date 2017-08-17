require('dotenv').config();

var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

var ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

var prodPlugins = [];
if (process.env.IONIC_ENV === 'prod') {
  prodPlugins.push(new ModuleConcatPlugin());
}

function getPlugins() {

  console.log('plugin works')
  var plugins = [
    new webpack.DefinePlugin({
      'API_URL': JSON.stringify(process.env.API_URL),
      'IMGUR_APIKEY': JSON.stringify(process.env.IMGUR_APIKEY)
      // Add any more variables here that you wish to define
    })
  ];

  if (process.env.IONIC_ENV === 'prod') {
      // This helps ensure the builds are consistent if source hasn't changed:
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  }
  return plugins;
}

module.exports = {

  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      },
      {
        test: /\.js$/,
        loader: process.env.IONIC_WEBPACK_TRANSPILE_LOADER
      }
    ]
  },

  plugins: getPlugins(),

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};