//define(function(require, exports, module) {
	require('tui_core_lib') ;
	require('tui_drag_lib') ;
	require('tui_dialog_lib') ;
	require('jq_datepicker_lib') ;
	require('jq_timepicker_lib') ;
	require('jq_validate_lib') ;
	//require('ng_sanitize_lib') ;
	require('bt_growl_lib') ;
	require('ng_messages_lib') ;
	require('./services') ;
	require('./HttpOperService') ;
	require('./controllers') ;
	require('./directives') ;
	var Headroom = require('headroom_lib') ;
	var app = angular.module('app',['ngMessages','app.services','app.controllers','app.directives']);

	/*app.config(['growlProvider', function(growlProvider) {
		growlProvider.globalTimeToLive(3000);
	}]);*/
	/**页面加载完毕之后启动angualr**/
	module.exports = {
		init: function(){
			angular.element(document).ready(function() {
				angular.bootstrap(document, ['app']);
			});
			
			//初始化headroom插件
		    var $myheader = $('#myheader');
		    var headroom  = new Headroom($myheader[0]);
		    headroom.init();
		}
	};
//}) ;