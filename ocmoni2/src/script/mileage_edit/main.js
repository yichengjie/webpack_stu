define(function(require, exports, module) {
	require('tui_core_lib') ;
	//tui-core一定要先与所有的tui插件前引入
	require('tui_drag_lib') ;
  	require('jquery_validate_lib');
	require('tui_dialog_lib');
	require('jquery_growl_lib') ;
	require('angular') ;
	require('angular-messages') ;



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