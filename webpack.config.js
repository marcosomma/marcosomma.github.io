var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')
var { SourceMapDevToolPlugin } = require('webpack')
var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    main: __dirname + '/src/index.js',
    scene: __dirname + '/src/mainScene.js',
    landing: __dirname + '/src/scenes/landing.js',
    helper: __dirname + '/src/helper.js',
    meshCreator: __dirname + '/src/meshCreator.js',
    sphereCreator: __dirname + '/src/creators/sphere.js',
    edgesCreator: __dirname + '/src/creators/edge.js',
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
          to: __dirname + '/dist/fonts',
        },
        {
          from: __dirname + '/src/assets/models/',
          to: __dirname + '/dist/assets/models',
        },
        {
          from: __dirname + '/src/assets/css/',
          to: __dirname + '/dist/css',
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
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
}
