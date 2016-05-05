var webpack = require('webpack') ;
module.exports = {
    entry: "./src/entry.js",
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
        new webpack.BannerPlugin('This file is created by yicj, email : 626659321@qq.com')
    ]
};