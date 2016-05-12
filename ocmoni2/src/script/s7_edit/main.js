//var pathStr = require.resolve('src/main') ;
//console.info("path : " + pathStr) ;
//这里一定要注意，tui-core必须先与tui的datepicker引入，
//否则会报错，可能是tui的bug，目前还不知道具体是什么原因
//这些文件也会绑定到全局的jquery 对象上去
//引入项目以来的所有css文件
require('./edit_style') ;
//引入模块依赖的所有js文件
require('tui_core_lib') ;
//tui-core一定要先与所有的tui插件前引入
require('tui_drag_lib') ;
require('tui_dialog_lib') ;
//一定要注意tui插件的引入顺序问题，否则可能会报错
//下面引入的是jquery的插件，会绑定到全局的jquery对象上去
require("modal_lib") ;
require('autocomplete_lib') ;
require('datepicker_lib') ;
require('timepicker_lib') ;
require('jquery_validate_lib') ;
////////////////
require('angular') ;
//require('moment') ;
require('angular-messages') ;
require('angular-bindonce') ;





require("./router") ;
module.exports = {
	init: function(){
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['app']);
			pageLoadComplete() ;
		});
	}
};
function pageLoadComplete (){
	$("body").addClass("helper_background_color1") ;
	$("#loading").addClass('hidden') ;
	$("#EditMainBoxDiv").removeClass('hidden') ;
	$("#myheader").removeClass('hidden') ;
}
