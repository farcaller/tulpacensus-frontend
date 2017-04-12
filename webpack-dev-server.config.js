const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: [
    // 'webpack/hot/dev-server',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    'whatwg-fetch',
    path.resolve('./src/index.tsx'),
  ],
  devServer: {
    contentBase: '.',
    devtool: 'eval-source-map',
    hot: true,
    inline: true,
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  output: {
    path: buildPath,
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new TransferWebpackPlugin([
    //   {from: 'www'},
    // ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: [nodeModulesPath],
      },
      {
        test: /\.tsx?$/,
        loaders: ['react-hot-loader/webpack', 'ts-loader'],
        exclude: [nodeModulesPath],
      },
    ],

    preLoaders: [
        { test: /\.js$/, loader: "source-map-loader" }
    ],
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      react: path.resolve('./node_modules/react'),
    }
  },
  externals: {
    // "react": "React",
    // "react-dom": "ReactDOM"
  },
};

module.exports = config;
