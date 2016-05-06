var webpack = require('webpack') ;
module.exports = {
    entry: "./src/edit/main.js",
    output: {
        path: __dirname+"/build",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {test: /\.html$/, loader: 'html'}
        ]
    },
    plugins: [
        new webpack.BannerPlugin('This file is created by yicj, email : 626659321@qq.com'),
        //压缩打包的文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        })
    ]
};