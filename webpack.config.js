/*
 * @Author: your name
 * @Date: 2021-02-28 22:28:41
 * @LastEditTime: 2021-03-06 22:41:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zip-plugin\webpack.config.js
 */
const path = require('path')
const ZipPlugin = require('./src/plugins/zip.js')
module.exports = {
  entry: {
    path: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    new ZipPlugin({
      fileName: '一个zip包'
    })
  ]
}