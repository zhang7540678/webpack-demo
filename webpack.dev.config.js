const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const UglifyJsPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  mode: 'development',
  entry: Path.resolve(__dirname, './src/main.js'),
  output: {
    path: Path.resolve(__dirname, './dist/static/'),
    publicPath: './static/',
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: Path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test:/\.(png|jpg|jpeg|svg)/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'progress.env': {
        NODE_ENV: 'development'
      }
    }),
    new HtmlWebpackPlugin({
      filename: Path.resolve(__dirname, './dist/index.html'),
      template: Path.resolve(__dirname, './src/index.html'),
      inject: 'body'
    }),
    new CleanWebpackPlugin('./dist'),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./Dll/dev/vendor-manifest.json')
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve('./Dll/dev/vendor.dll.js'),
      outputPath: './libs'
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
  ],
  devtool: '#source-map',
  performance: {
    hints: false
  },
  optimization: {
    
  }
}