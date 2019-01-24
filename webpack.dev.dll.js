const Path = require('path');
const webpack = require('webpack');
var vendor = [
  'vue',
  'vuex',
  'vue-router',
  'element-ui'
]

module.exports = {
  mode: 'development',
  entry: {
    vendor
  },
  output: {
    path: Path.join(__dirname, './Dll/dev'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: Path.join(__dirname, './src'),
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: Path.join(__dirname, './src')
      }
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: Path.join(__dirname,'./Dll/dev' ,'[name]-manifest.json'),
      name: '[name]_library'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        uglifyJS: {
          output: {
            comments: false
          },
          compress: {
            warning: false
          }
        }
      },
    }),
  ]
}