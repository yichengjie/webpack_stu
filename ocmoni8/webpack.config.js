var webpack = require('webpack') ;
var path = require('path') ;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var alias = require('./alias.js') ;
var DIST_PATH = path.resolve('./dist');
var entryMap = require('./entryMap') ;

module.exports = {
    entry: entryMap,
    output: {
        path: DIST_PATH,
        /*filename: '[name].[chunkhash:8].js'*/
        filename: '[name].[hash:8].js'
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
        new webpack.BannerPlugin('{\n author: yicj,\n email : 626659321@qq.com,\ncreate-date:2016/05/05}'),
        new webpack.DefinePlugin({
            'process.env':{
               'NODE_ENV': JSON.stringify('production')
            }
         }),
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