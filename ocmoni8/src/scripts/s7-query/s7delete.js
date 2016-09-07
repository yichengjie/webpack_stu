//define(function(require, exports, module) {
	// 通过require引入依赖
	//var $ = require('jquery');
var Common = require('../lib/common');
var common = new Common();
var httpClient = require('../lib/HttpClientUtil') ;
var util = require('../lib/util') ;
function S7Delete() {
}
module.exports = S7Delete;
/**
 * 发布按钮绑定事件
 */
S7Delete.prototype.init = function() {
	var _self = this ;
	$(document).delegate('.delete[name=s7delete]', 'click', function() {
		var $list_item = $(this).parents('li') ;
		var s7id = $list_item.find(':input[name=s7id]').attr('value');
		$.showTuiConfirmDialog('确认删除?', function() {
			_self.deleteS7(s7id, $list_item) ;
		}) ;
	});
};
S7Delete.prototype.deleteS7 = function(s7id,$list_item){
	var param = {"s7Id":s7id};
	var contextPath = util.getContextPath() ;
	var url = contextPath+"/s7/s7delete.action";
	var ajaxing = httpClient.dealAjaxRequest4SimpleParam(url,param) ;
	$.when(ajaxing).done(function(retData){
		if(retData=='SUCCESS'){
			util.toastSuccess('删除成功!',150) ;
			//查询是不是最后一条s7记录
			var len = $list_item.siblings('li').length ;
			if(len==0){//如果只有一个直接删除panel即可
				$list_item.parents('.s7list_panel').remove() ;
			}else{//如果大于一个删除li即可
				$list_item.remove();
			}
		}else{
			util.toastDanger('系统异常，删除失败!',150) ;
		}
	}).fail(function(err){
		util.toastDanger('系统异常，删除失败!',150) ;
	}) ;
};
//});
