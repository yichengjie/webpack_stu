"use strict"
/**
 * webpack.DllPlugin 的选项中， path 是manifest文件的输出路径；
 * name 是dll暴露的对象名，要跟 output.library 保持一致； 
 * context 是解析包路径的上下文，这个要跟接下来配置的dll user一致。
 */
let path = require('path');
let webpack = require('webpack');
var alias = require('./alias.js') ;
var DIST_PATH = path.resolve('./dist/');
var vendors = require('./vendors.js') ;

module.exports = {
  output:{
	path:path.resolve( __dirname, './dist/dll' ),
    filename:'[name].dev.js',
    library:"[name]_dev"
  },
  entry: {
    vendor: vendors,
  },
  resolve: {
      alias: alias
  },
  plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
//    new webpack.DefinePlugin({
//      'process.env': {
//        'NODE_ENV': JSON.stringify('production')
//      }
//    }),
    new webpack.DllPlugin({
      path:path.resolve( __dirname, './dist/dll/manifest.json'),
      name:"[name]_dev"
    }),
  ],
};
