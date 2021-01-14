const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const { SourceMapDevToolPlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(process.env.NODE_ENV)
module.exports = {
  entry: {
    main: __dirname + '/src/index.js',
    // scene: __dirname + '/src/mainScene.js',
    // deskActions: __dirname + '/src/actions/desk.js',
    // indexActions: __dirname + '/src/actions/index.js',
    // lightHouseActions: __dirname + '/src/actions/lightHouse.js',
    // helper: __dirname + '/src/common/helper.js',
    // brainGUI: __dirname + '/src/GUI/brain.js',
    // deskGUI: __dirname + '/src/GUI/desk.js',
    // indexGUI: __dirname + '/src/GUI/index.js',
    // landingGUI: __dirname + '/src/GUI/landing.js',
    // lightHouseGUI: __dirname + '/src/GUI/lightHouse.js',
    // brainOBJ: __dirname + '/src/imports/brain.js',
    // creativeOBJ: __dirname + '/src/imports/creative.js',
    // deskOBJ: __dirname + '/src/imports/desk.js',
    // indexOBJ: __dirname + '/src/imports/desk.js',
    // lightHouseOBJ: __dirname + '/src/imports/lightHouse.js',
    // landing: __dirname + '/src/scenes/landing.js',
  },
  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js',
    path: __dirname + '/dist',
  },
  performance: {
    hints: false,
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: __dirname + '/src/index.html',
        },
        {
          from: __dirname + '/src/favicon.ico',
        },
        {
          from: __dirname + '/src/db.json',
        },
        {
          from: __dirname + '/src/assets/',
          to: __dirname + '/dist/assets',
        },
      ],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: process.env.NODE_ENV === 'production' ? true : false,
      template: __dirname + process.env.NODE_ENV === 'production' ? '/dist/index.html' : 'src/index_dev.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ttf', '.obj', '.mtl', '.ico', '.tga', '.*', '*'],
  },
  devServer: {
    inline: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.test.js$/,
        exclude: ['/node_modules/', '/src/assets'],
        use: [
          {
            loader: 'babel-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(css)$/,
        use: ['css-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.obj$/,
        loader: 'webpack-obj-loader',
      },
      {
        test: /\.mtl$/,
        loader: 'mtl-loader',
      },
    ],
  },
}
