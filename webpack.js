var path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
// const BrotliPlugin = require('brotli-webpack-plugin')
const generate = require('nanoid/generate')

module.exports = env => {

  const entry = path.resolve(__dirname, "dist") + '/index.html'

  let plugins = [
    new HtmlWebpackPlugin({
        hash: true,
        template: path.resolve(__dirname, "dist") + '/build.html',
        filename: entry
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '_BUILD_',
        replacement: generate('0123456789abcdef', 8)
      }
    ])
  ]

  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
      require.resolve(path.resolve(__dirname, "src") + '/common/polyfills'),
      './src/webapp/bootstrap.tsx'
    ],
    output: {
      publicPath: '/app',
      path: path.resolve(__dirname, "dist") + '/app',
      filename: "app.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.ts|\.tsx$/,
          loader: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    stats: 'errors-only',
    plugins
  }
}
