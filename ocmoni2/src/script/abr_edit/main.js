define(function(require, exports, module) {
  	require('jquery_validate_lib');
	require('tui_dialog_lib');
	require('datepicker_lib') ;
	require('./services/services') ;
	require('./controllers/controllers') ;
	require('./directives/directives') ;
	require('./directives/validator') ;
	var app = angular.module('app',['angular-growl','ngMessages','app.service','app.controller','app.directive','app.validator']); 
	/**页面加载完毕之后启动angualr**/
	module.exports = { 
 		init: function(){ 
			angular.element(document).ready(function() {
			     angular.bootstrap(document, ['app']);
			});
 		} 
 	} 
	
}) ;