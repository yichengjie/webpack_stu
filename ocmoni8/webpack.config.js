var webpack = require('webpack') ;
var path = require('path') ;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var alias = require('./alias.js') ;
//var LIB_PATH = path.resolve('./src/scripts/lib');
//var CSS_PATH = path.resolve('./src/styles/css');
//var SCRIPTS_PATH = path.resolve('./src/scripts');
//var DIST_PATH = path.resolve('../../public/dist/oc/');
var DIST_PATH = path.resolve('./dist');
//Template的文件夹路径
//var TEM_JSP_PATH = path.resolve('./src/jsp') ;
var entryMap = require('./entryMap') ;
var vendors = require('./vendors.js') ;
entryMap['vendor'] = vendors ;

module.exports = {
    /*entry: "./src/script/edit/entry.js",*/
    entry: entryMap,
    /*devtool: 'eval-source-map',*/
    output: {
        path: DIST_PATH,
        /*filename: "edit.js"*/
        /*filename: '[name].[hash].js'*/
        /*filename: '[name].[chunkhash:8].js'*/
        filename: '[name].[hash:8].js'
        /*filename: '[name].js'*/
    },
    module: {
        loaders: [
            {test: /\.js$/,loaders: [ 'babel' ],exclude: /(node_modules|lib)/,include: __dirname},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            {test: /\.html$/, loader: 'html'},
            {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192&name=./images/[name].[hash:8].[ext]"},
            {test: /\.(eot|woff|ttf|svg)$/, loader: "file-loader?name=./file/[name].[hash:8].[ext]" }
        ]
    },
    resolve: {
        alias:alias
    },
    plugins: [
        new webpack.BannerPlugin('{compony travelsky-dbky ,\n author: yicj,\n email : 626659321@qq.com,\ncreate-date:2016/05/05}'),
        new webpack.DefinePlugin({
            'process.env':{
               'NODE_ENV': JSON.stringify('production')
            }
         }),
        //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash:8].js'),
       
        /*,new ExtractTextPlugin("[name].[hash:20].css")*/
        new ExtractTextPlugin("[name].[hash:8].css"),
        new webpack.DllReferencePlugin({
            context:__dirname,
            manifest: require('./dist/dll/manifest.json' )
        }),
        //压缩打包的文件
        new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
        }),
        //把指定文件夹xia的文件复制到指定的目录
        /*,new TransferWebpackPlugin([{from: 'www'}],
          path.resolve(__dirname,"src"))*/
    ]
};