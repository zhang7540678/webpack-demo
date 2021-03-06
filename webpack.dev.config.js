const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const UglifyJsPlugin = require('webpack-parallel-uglify-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: [Path.resolve(__dirname, './src/main.js')],
  output: {
    path: '/',
    publicPath: '/',
    filename: './static/js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: Path.resolve(__dirname, 'src')
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: Path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        loaders: ['style-loader','css-loader','less-loader']
      },
      {
        test:/\.(png|jpg|jpeg|svg)/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          limit:1000,
          name: 'fonts/[name].[ext]'
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'progress.env': {
        NODE_ENV: 'development'
      }
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: Path.resolve(__dirname, './src/index.html'),
      inject: 'body'
    }),
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
      outputPath: './static/libs',
      publicPath: '/static/libs'
    }),
    new VueLoaderPlugin(),
    // 实现刷新浏览器必写
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.jsx'],
    alias: {
      '@libs': Path.resolve(__dirname, './src/libs'),
      '@page': Path.resolve(__dirname, './src/page'),
      '@components': Path.resolve(__dirname, './src/components'),
      '@assets': Path.resolve(__dirname, './src/assets'),
      '@store': Path.resolve(__dirname, './src/store'),
      '@request': Path.resolve(__dirname, './src/libs/request.js'),
    }
  },
  devtool: '#source-map',
  performance: {
    hints: false
  }
}