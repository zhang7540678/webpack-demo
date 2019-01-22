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
  plugins: [
    new webpack.DllPlugin({
      path: Path.join(__dirname, './Dll/dev/[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}