var webpack = require('webpack') ;
var path = require('path') ;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var APP_PATH = "./src/" ;

var ROOT_PATH = "../" ;

//Template的文件夹路径
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
    /*entry: "./src/script/edit/entry.js",*/
    entry: {
        //三个入口文件，app, mobile和 vendors
        edit: path.resolve(APP_PATH, './script/edit/entry.js'),
        style: path.resolve(APP_PATH, './style/style.js')
    },
    /*devtool: 'eval-source-map',*/
    output: {
        path: __dirname+"/dist/",
        /*filename: "edit.js"*/
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [
            /*{ test: /\.css$/, loader: "style!css" },*/
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            {test: /\.html$/, loader: 'html'},
            {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192&name=./images/[name].[hash:8].[ext]"},
            {test: /\.(eot|woff|ttf|svg)$/, loader: "file-loader?name=./file/[name].[hash:8].[ext]" }
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
        new webpack.BannerPlugin('{compony travelsky-dbky ,\n author: yicj,\n email : 626659321@qq.com,\ncreate-date:2016/05/05}')
        //压缩打包的文件
        /*,new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        })*/
        /*,new HtmlWebpackPlugin({
            title: 'Hello World app',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['edit'],
            //要把script插入到标签里
            inject: 'body'
        })*/
        ,new ExtractTextPlugin("style.[hash:8].css")
        /*,new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: "commons.[hash:8].js",
        })*/
    ]
};