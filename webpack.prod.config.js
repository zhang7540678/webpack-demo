const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const UglifyJsPlugin = require('webpack-parallel-uglify-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'production',
  entry: Path.resolve(__dirname, './src/main.js'),
  output: {
    path: Path.resolve(__dirname, './dist/static/'),
    publicPath: './static/',
    filename: 'js/[name]_[hash].bundle.js',
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
        loader: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test:/\.(png|jpg|jpeg|svg)/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'img/[name]_[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'progress.env': {
        NODE_ENV: 'production'
      }
    }),
    new HtmlWebpackPlugin({
      filename: Path.resolve(__dirname, './dist/index.html'),
      template: Path.resolve(__dirname, './src/index.html'),
      inject: 'body'
    }),
    new CleanWebpackPlugin('./dist'),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[hash].css',
      chunkFilename: 'css/[id].css'
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./Dll/prod/vendor-manifest.json')
    }),
    new AddAssetHtmlPlugin({
      filepath: Path.resolve(__dirname, './Dll/prod/*.dll.js'),
      outputPath: './libs',
      publicPath: '/static/libs'
    }),
    new UglifyJsPlugin({
      cacheDir: './cache/prod/dist',
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
    new VueLoaderPlugin()
  ],
  //devtool: '#source-map',
  performance: {
    hints: false
  },
  optimization: {
    
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx']
  },
  // devServer: {
  //   contentBase: Path.join(__dirname, 'dist'),
  //   port: 8001,
  //   publicPath: '/static',
  //   hot: true,
  //   open: true,
  // }
}