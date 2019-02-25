const Path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('webpack-parallel-uglify-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
var vendor = [
  'vue',
  'vuex',
  'vue-router',
  'element-ui'
]

module.exports = {
  mode: 'product',
  entry: {
    vendor
  },
  output: {
    path: Path.join(__dirname, './Dll/prod'),
    filename: '[name]_[hash].dll.js',
    library: '[name]_[hash]_library'
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
      path: Path.join(__dirname,'./Dll/prod' ,'[name]-manifest.json'),
      name: '[name]_[hash]_library'
    }),
    new CleanWebpackPlugin('./Dll/prod'),
    new UglifyJsPlugin({
      cacheDir: './cache/prod/dll',
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
  ],
  optimization: {
    
  }
}