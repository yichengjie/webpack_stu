//var pathStr = require.resolve('src/main') ;
//console.info("path : " + pathStr) ;
require('tui-dialog') ;
require('tui-datepicker') ;
require("./router") ;
require("../lib/modal") ;
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
