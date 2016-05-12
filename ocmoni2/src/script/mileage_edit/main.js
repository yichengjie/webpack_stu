define(function(require, exports, module) {
  	require('jquery_validate_lib');
	require('tui_dialog_lib');
	require('./services') ;
	require('./HttpOperService') ;
	require('./controllers') ;
	require('./directives') ;
	require('./validator') ;
	require('datepicker_lib') ;
	require('timepicker_lib') ;
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