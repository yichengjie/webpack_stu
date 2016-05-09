define(function(require, exports, module) {
  	require('tuiValidator');
	require('tuiDialog');
	require('datepicker') ;
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