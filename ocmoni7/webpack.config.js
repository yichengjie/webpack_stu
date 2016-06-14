var webpack = require('webpack') ;
var path = require('path') ;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var LIB_PATH = path.resolve('./src/scripts/lib');
var CSS_PATH = path.resolve('./src/styles/css');
var SCRIPTS_PATH = path.resolve('./src/scripts');
var TEM_JSP_PATH = path.resolve('./jsp') ;

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
        /*filename: '[name].js'*/
    },
    module: {
        loaders: [
            /*{ test: /\.css$/, loader: "style!css" },*/
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            {test: /\.html$/, loader: 'html'},
            {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192&name=images/[name].[hash:8].[ext]"},
            {test: /\.(eot|woff|ttf|svg)$/, loader: "file-loader?name=file/[name].[hash:8].[ext]" }
        ]
    },
    resolve: {
        alias: {
        	clipboard_lib:LIB_PATH+"/clipboard/index.js",
        	jq_autocomplete_lib: LIB_PATH+"/jq-autocomplete/index.js",
        	jq_datepicker_lib: LIB_PATH+"/jq-datepicker/index.js",
        	jq_growl_lib: LIB_PATH+"/jq-growl/index.js",
        	jq_timepicker_lib:LIB_PATH+"/jq-timepicker/index.js",
        	jq_validate_lib:LIB_PATH+"/jq-validate/index.js",
        	moment_lib:LIB_PATH+"/moment/index.js",
        	ng_bindonce_lib: LIB_PATH+"/ng-bindonce/index.js",
            ng_growl_lib: LIB_PATH+"/ng-growl/index.js",
            ng_messages_lib: LIB_PATH+"/ng-messages/index.js",
            ng_sanitize_lib: LIB_PATH+"/ng-sanitize/index.js",
            tui_core_lib:LIB_PATH+"/tui-core/index.js",
            tui_dialog_lib:LIB_PATH+"/tui-dialog/index.js",
            tui_drag_lib:LIB_PATH+"/tui-drag/index.js",
            underscore_lib:LIB_PATH+"/underscore/index.js",
            ajaxfileupload_lib:LIB_PATH+"/ajaxfileupload.js",
            modal_helper_lib:LIB_PATH+"/modal.helper.js",
            modal_lib:LIB_PATH+"/modal.js",
            common_lib:LIB_PATH+"/common.js",
            HttpClientUtil_lib:LIB_PATH+"/HttpClientUtil.js",
            util_lib:LIB_PATH+"/util.js",
            /*------------style----------*/
            css_path:CSS_PATH,
            scripts_path:SCRIPTS_PATH
        }
    },
    plugins: [
        new webpack.BannerPlugin('{compony travelsky-dbky ,\n author: yicj,\n email : 626659321@qq.com,\ncreate-date:2016/05/05}')
        //压缩打包的文件
        /*,new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        })*/
        /*,new ExtractTextPlugin("[name].[hash:20].css")*/
        ,new ExtractTextPlugin("[name].css")
        ,new HtmlWebpackPlugin({
            template: path.resolve(TEM_JSP_PATH, 's7Query.html'),
            filename: 's7Query.jsp',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['s7Query'],
            //要把script插入到标签里
            inject: 'body'
        })//
        ,new HtmlWebpackPlugin({
            template: path.resolve(TEM_JSP_PATH, 's7Edit.html'),
            filename: 's7Edit.jsp',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['s7Edit'],
            //要把script插入到标签里
            inject: 'body'
        })
        ,new HtmlWebpackPlugin({
            template: path.resolve(TEM_JSP_PATH, 'datasourceQuery.html'),
            filename: 'datasourceQuery.jsp',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['datasourceQuery'],
            //要把script插入到标签里
            inject: 'body'
        })
        ,new HtmlWebpackPlugin({
            template: path.resolve(TEM_JSP_PATH, 'datasourceEdit.html'),
            filename: 'datasourceEdit.jsp',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['datasourceEdit'],
            //要把script插入到标签里
            inject: 'body'
        })
        ,new HtmlWebpackPlugin({
            template: path.resolve(TEM_JSP_PATH, 'mileageExchangeQuery.html'),
            filename: 'mileageExchangeQuery.jsp',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['mileageQuery'],
            //要把script插入到标签里
            inject: 'body'
        })
        ,new HtmlWebpackPlugin({
            template: path.resolve(TEM_JSP_PATH, 'mileageExchangeEdit.html'),
            filename: 'mileageExchangeEdit.jsp',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['mileageEdit'],
            //要把script插入到标签里
            inject: 'body'
        })
        ,new HtmlWebpackPlugin({
            template: path.resolve(TEM_JSP_PATH, 'validate.html'),
            filename: 'validate.jsp',
            //chunks这个参数告诉插件要引用entry里面的哪几个入口
            chunks: ['validate'],
            //要把script插入到标签里
            inject: 'body'
        })
        //把指定文件夹xia的文件复制到指定的目录
        /*,new TransferWebpackPlugin([{from: 'www'}],
          path.resolve(__dirname,"src"))*/
    ]
};