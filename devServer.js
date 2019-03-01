const webpack = require('webpack');
const express = require('express');
const ip = require('ip');
const host = ip.address();
const webpackConfig = require('./webpack.dev.config');
const compiler = webpack(webpackConfig);
const middleware = require('webpack-dev-middleware');
const app = express();
const port = '3003';

app.use(middleware(compiler, {
  publicPath: `${host}:${port}/`,
  quiet: true,
  noInfo: false,
  stats: {
    colors: true,
    chunks: false
  }
}))

//监听服务端口
app.listen(port, function(err){
  if(err){
    console.log(err);
  }else{
    console.log(`成功启动：http://localhost:${port}`);
    console.log('\n');
  }
})