//define(function(require, exports, module) {
	require('tui_core_lib') ;
	require('tui_drag_lib') ;
	require('tui_dialog_lib');
  	require('jq_validate_lib');
	require('jq_datepicker_lib') ;
	require('jq_timepicker_lib') ;
	require('jq_growl_lib') ;
	require('ng_messages_lib') ;
	require('./services') ;
	require('./HttpOperService') ;
	require('./controllers') ;
	require('./directives') ;
	require('./validator') ;
	var app = angular.module('app',['ngMessages','app.service','app.controller','app.directive','app.validator']); 
	/**页面加载完毕之后启动angualr**/
	module.exports = { 
 		init: function(){ 
			angular.element(document).ready(function() {
			     angular.bootstrap(document, ['app']);
			});
 		} 
 	} 
//}) ;