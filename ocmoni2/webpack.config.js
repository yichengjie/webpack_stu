var webpack = require('webpack') ;
var path = require('path') ;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//var LIB_PATH = __dirname+"/src/script/lib/" ;
var LIB_PATH = path.resolve('./src/script/lib');
var STYLE_PATH = path.resolve('./src/style');
//Template的文件夹路径
var entryMap = require('./entryMap') ;

module.exports = {
    /*entry: "./src/script/edit/entry.js",*/
    entry: entryMap,
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
    resolve: {
        alias: {
            autocomplete_lib: LIB_PATH+"/autocomplete/index.js",
            datepicker_lib: LIB_PATH+"/datepicker/index.js",
            jquery_validate_lib:LIB_PATH+"/jquery-validate/index.js",
            timepicker_lib:LIB_PATH+"/timepicker/index.js",
            tui_core_lib:LIB_PATH+"/tui-core/index.js",
            tui_dialog_lib:LIB_PATH+"/tui-dialog/index.js",
            tui_drag_lib:LIB_PATH+"/tui-drag/index.js",
            ajaxfileupload_lib:LIB_PATH+"/ajaxfileupload.js",
            modal_helper_lib:LIB_PATH+"/modal.helper.js",
            modal_lib:LIB_PATH+"/modal.js",
            common_lib:LIB_PATH+"/common.js",
            HttpClientUtil_lib:LIB_PATH+"/HttpClientUtil.js",
            util_lib:LIB_PATH+"/util.js",
            /*------------style----------*/
            style_path:STYLE_PATH
        }
    },
    plugins: [
        new webpack.BannerPlugin('{compony travelsky-dbky ,\n author: yicj,\n email : 626659321@qq.com,\ncreate-date:2016/05/05}')
        //压缩打包的文件
        ,new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        })
        //提供全局的变量，在模块中使用无需用require引入,这个暂时不好用，会报错，jquery还是先全局引入
       /*,new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
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
        ,new ExtractTextPlugin("[name].[hash:20].css")
        /*,new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: "commons.[hash:8].js",
        })*/
        //把指定文件夹xia的文件复制到指定的目录
        /*,new TransferWebpackPlugin([{from: 'www'}],
          path.resolve(__dirname,"src"))*/
    ]
};