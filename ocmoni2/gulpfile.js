'use strict'
var gulp = require('gulp') ;
var gutil = require("gulp-util");
//var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack') ;
var webpackConfig = require("./webpack.config.js");
var entryMap = require('./entryMap') ;
var entryKeys = Object.keys(entryMap) ;
//var webpackCfg = Object.create(webpackConfig) ;
for(let key in entryMap){
	gulp.task(key,function(callback){
		var myConfig = Object.create(webpackConfig) ;
		myConfig.entry={} ;
		myConfig.entry[key] =entryMap[key] ;
		webpack(myConfig,
			function(err,stats){
			if(err){
				throw new gutil.pluginError('webpack',err) ;
				gutil.log('[webpack]',stats.toString({})) ;
			}
			callback() ;
		});
	}) ;
}
//执行webpack打包所有webpack任务
gulp.task('webpack',entryKeys) ;
//默认task
var defaultTaskArr =["mileage_edit"] ;
gulp.task('default',defaultTaskArr) ;