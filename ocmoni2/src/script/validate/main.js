define(function(require, exports, module) {
	//tui-core一定要先与所有的tui插件前引入
	require('tui_core_lib') ;
	require('tui_drag_lib') ;
	require('tui_dialog_lib') ;
	require('datepicker_lib') ;
	require('timepicker_lib') ;

	require('jquery_validate_lib') ;



	require('angular') ;
	require('angular_growl_lib') ;
	require('angular-messages') ;

	require('./services') ;
	require('./HttpOperService') ;
	require('./controllers') ;
	require('./directives') ;
	var app = angular.module('app',['angular-growl','ngMessages','app.services','app.controllers','app.directives']);

	app.config(['growlProvider', function(growlProvider) {
		growlProvider.globalTimeToLive(3000);
	}]);
	/**页面加载完毕之后启动angualr**/
	module.exports = {
		init: function(){
			angular.element(document).ready(function() {
				angular.bootstrap(document, ['app']);
			});
		}
	}



}) ;