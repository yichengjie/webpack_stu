'use strict'
var gulp = require('gulp') ;
//var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack') ;
var webpackConfig = require("./webpack.config.js");
var entryMap = require('./entryMap') ;
var entryKeys = Object.keys(entryMap) ;
//var webpackCfg = Object.create(webpackConfig) ;
for(var key in entryMap){
	(function (taskName) {
		gulp.task(taskName,function(callback){
			var myConfig = Object.create(webpackConfig) ;
			myConfig.entry={} ;
			myConfig.entry[taskName] =entryMap[taskName] ;
			webpack(myConfig,
				function(err,stats){
					console.error('has an error with package '  + err) ;
					callback() ;
				});
		}) ;
	})(key) ;
}
//执行webpack打包所有webpack任务
gulp.task('webpack',entryKeys) ;
//默认task
var defaultTaskArr =["commonStyle"] ;
gulp.task('default',defaultTaskArr) ;