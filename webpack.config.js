var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')
var { SourceMapDevToolPlugin } = require('webpack')
var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    main: __dirname + '/src/index.js',
    scene: __dirname + '/src/mainScene.js',
    landing: __dirname + '/src/scenes/landing.js',
    brain: __dirname + '/src/imports/brain.js',
    lightHouse: __dirname + '/src/imports/lightHouse.js',
    brainGUI: __dirname + '/src/GUI/brain.js',
    landingGUI: __dirname + '/src/GUI/landing.js',
    helper: __dirname + '/src/common/helper.js'
  },
  output: {
    filename: '[name].js',
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
          from: __dirname + '/src/assets/fonts/',
          to: __dirname + '/dist/assets/fonts',
        },
        {
          from: __dirname + '/src/assets/models/',
          to: __dirname + '/dist/assets/models',
        },
        {
          from: __dirname + '/src/assets/css/',
          to: __dirname + '/dist/assets/css',
        },
      ],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ttf', '*'],
  },
  devServer: {
    inline: true,
    contentBase: __dirname + '/dist',
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.test.js$/,
        exclude: ['/node_modules/'],
        use: [
          {
            loader: 'babel-loader',
            options: {},
          },
        ],
      },
      {    
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader"
      },
      {
        test: /\.(css)$/,
        use: ["css-loader"]
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
      },
    ],
  },
}
