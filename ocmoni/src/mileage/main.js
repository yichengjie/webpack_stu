define(function(require, exports, module) {
  	require('tuiValidator');
	require('tuiDialog');
	require('./services') ;
	require('./HttpOperService') ;
	require('./controllers') ;
	require('./directives') ;
	require('./validator') ;
	require('datepicker') ;
	require('jqueryuitimepickeraddon') ;
	var app = angular.module('app',['ngMessages','app.service','app.controller','app.directive','app.validator']); 
	/**页面加载完毕之后启动angualr**/
	module.exports = { 
 		init: function(){ 
			angular.element(document).ready(function() {
			     angular.bootstrap(document, ['app']);
			});
 		} 
 	} 
}) ;