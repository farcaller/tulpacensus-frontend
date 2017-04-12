const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: [
    'whatwg-fetch',
    path.resolve('./src/index.tsx'),
  ],
  devtool: 'source-map',
  output: {
    path: buildPath,
    filename: 'app.js',
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.NoErrorsPlugin(),
    // new TransferWebpackPlugin([
    //   {from: 'www'},
    // ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath],
      },
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader'],
        exclude: [nodeModulesPath],
      },
    ],

    preLoaders: [
        { test: /\.js$/, loader: "source-map-loader" }
    ],
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
};

module.exports = config;
