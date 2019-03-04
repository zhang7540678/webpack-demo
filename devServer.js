const webpack = require('webpack');
const express = require('express');
const webpackConfig = require('./webpack.dev.config');
const compiler = webpack(webpackConfig);
const middleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const app = express();
const port = '3003';

app.use(middleware(compiler, {
  publicPath: '/',
  quiet: true,
  noInfo: false,
  stats: {
    colors: true,
    chunks: false
  }
}))
webpackConfig.entry.unshift("webpack-hot-middleware/client?noInfo=true&reload=true");  
app.use(hotMiddleware(compiler))

//监听服务端口
app.listen(port, function(err){
  if(err){
    console.log(err);
  }else{
    console.log(`成功启动：http://localhost:${port}`);
    console.log('\n');
  }
})