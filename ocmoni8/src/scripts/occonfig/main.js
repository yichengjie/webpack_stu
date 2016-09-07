require('tui_core_lib') ;
require('tui_drag_lib') ;
require('tui_dialog_lib');
require('jq_validate_lib');
//require('jq_autocomplete_lib') ;
require('bt_growl_lib') ;
require('ng_messages_lib') ;
require('ng_bindonce_lib') ;
//require('ng_imgcrop_lib') ;
require('./directives/directives') ;
require('./services/services') ;
require('./services/HttpOperService') ;
require('./controllers/controllers') ;
var app = angular.module('app',['pasvaz.bindonce','ngMessages','app.service','app.directive','app.controller']); 
module.exports = { 
	init: function(){ 
		angular.element(document).ready(function() {
		     angular.bootstrap(document, ['app']);
		});
	} 
};
