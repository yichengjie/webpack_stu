//define(function(require, exports, module) {
	//require("ui-router") ;
	require("./services/index") ;
	require("./directives/index") ;
	require("./controllers/index") ;
	require("./filters/filters") ;
	var _ = require('underscore_lib') ;
    //var editallHtml = require("./tpls/edit.all.html") ;
	//把需要的模块全部加载到testApp中
	var app = angular.module('app',['pasvaz.bindonce','ngMessages','app.factory','app.controllers','app.directives','app.filter']);
	app.constant('DEFAULT_SERVICETYPE','F') ;//默认的serviceType
//}) ;
