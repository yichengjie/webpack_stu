var webpack = require('webpack') ;
var path = require('path') ;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var APP_PATH = "./src/script/" ;

var ROOT_PATH = "../" ;

//Template的文件夹路径
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
    /*entry: "./src/script/edit/entry.js",*/
    entry: {
        //三个入口文件，app, mobile和 vendors
        edit: path.resolve(APP_PATH, './edit/entry.js')
    },
    /*devtool: 'eval-source-map',*/
    output: {
        path: __dirname+"/dist/",
        /*filename: "edit.js"*/
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {test: /\.html$/, loader: 'html'},
            {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192"}
        ]
    },
    //和loaders一样的语法，很简单,经过测试这个好像没啥用呢?
    /* perLoaders: [
     {
     test: /\.js?$/,
     include: APP_PATH,
     loader: 'jshint-loader'
     }
     ],*/
    plugins: [
        new webpack.BannerPlugin('This file is created by yicj, email : 626659321@qq.com')
        //压缩打包的文件
        /*,new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        })*/
        ,new HtmlWebpackPlugin({
            title: 'Hello World app',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['edit'],
            //要把script插入到标签里
            inject: 'body'
        })
    ]
};