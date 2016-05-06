var webpack = require('webpack') ;
module.exports = {
    entry: "./src/script/edit/entry.js",
    output: {
        path: __dirname+"/dist/edit",
        filename: "edit.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {test: /\.html$/, loader: 'html'},
            {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192"}
        ]
    },
    plugins: [
        new webpack.BannerPlugin('This file is created by yicj, email : 626659321@qq.com')
        //压缩打包的文件
        ,new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        })
    ]
};