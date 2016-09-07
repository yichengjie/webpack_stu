var path = require('path') ;
var LIB_PATH = path.resolve('./src/scripts/lib');
var CSS_PATH = path.resolve('./src/styles/css');
var SCRIPTS_PATH = path.resolve('./src/scripts');

var alias ={
	bt_growl_lib:LIB_PATH+"/bt-grow/jquery.bootstrap-growl.js",
	clipboard_lib:LIB_PATH+"/clipboard/index.js",
	headroom_lib:LIB_PATH+"/headroom/index.js",
	is_loading_lib:LIB_PATH+"/is-loading/index.js",
	jq_autocomplete_lib: LIB_PATH+"/jq-autocomplete/index.js",
	jq_datepicker_lib: LIB_PATH+"/jq-datepicker/index.js",
	/*jq_growl_lib: LIB_PATH+"/jq-growl/index.js",*/
	jq_timepicker_lib:LIB_PATH+"/jq-timepicker/index.js",
	jq_validate_lib:LIB_PATH+"/jq-validate/index.js",
	moment_lib:LIB_PATH+"/moment/index.js",
	ng_bindonce_lib: LIB_PATH+"/ng-bindonce/index.js",
   /* ng_growl_lib: LIB_PATH+"/ng-growl/index.js",*/
    ng_messages_lib: LIB_PATH+"/ng-messages/index.js",
    ng_sanitize_lib: LIB_PATH+"/ng-sanitize/index.js",
    selectize_lib:LIB_PATH+"/selectize/index.js",
    tui_core_lib:LIB_PATH+"/tui-core/index.js",
    tui_dialog_lib:LIB_PATH+"/tui-dialog/index.js",
    tui_drag_lib:LIB_PATH+"/tui-drag/index.js",
    underscore_lib:LIB_PATH+"/underscore/index.js",
    ajaxfileupload_lib:LIB_PATH+"/ajaxfileupload.js",
    modal_helper_lib:LIB_PATH+"/modal.helper.js",
    modal_lib:LIB_PATH+"/modal.js",
    common_lib:LIB_PATH+"/common.js",
    HttpClientUtil_lib:LIB_PATH+"/HttpClientUtil.js",
    util_lib:LIB_PATH+"/util.js",
    /*------------style----------*/
    css_path:CSS_PATH,
    scripts_path:SCRIPTS_PATH
}

module.exports = alias ;