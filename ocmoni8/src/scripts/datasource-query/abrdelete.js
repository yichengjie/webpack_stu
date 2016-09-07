//define(function(require, exports, module) {
	// 通过require引入依赖
	//var $ = require('jquery');
	var Common = require('../lib/common');
	var common = new Common();
	var httpClient = require('../lib/HttpClientUtil') ;

	function abrDelete() {
	}
	module.exports = abrDelete;
	/**
	 * 发布按钮绑定事件
	 */
	abrDelete.prototype.init = function() {
		var _self = this ;
		$(document).delegate('.delete[name=abrdelete]', 'click', function() {
			//删除s7id
			var abrid = $(this).parents('tr').find(':input[name=abrid]').attr('value');
			var $curItem = $(this).parents('tr');
			$.showTuiConfirmDialog('确认删除?', function() {
				_self.deleteById(abrid,$curItem) ;
			}) ;
		});
	};
	
	abrDelete.prototype.deleteById = function(abrid,$curItem){
		var param = {"id":abrid};
		var tag_ctx = $('#tag_ctx').val();
		var url = tag_ctx+'/abr/abrDatasourceDelete.action';
		var ajaxing = httpClient.dealAjaxRequest4SimpleParam(url,param) ;
		$.when(ajaxing).done(function(retData){
			if (retData === null) {
				window.location.reload();
				return;
			}
			if (retData === 'SUCCESS' ) {
				$.showTuiSuccessDialog('删除成功！', function() {
					$curItem.remove();
				});
			} else {
				$.showTuiErrorDialog('系统异常，删除失败！');
			}
		}).fail(function(err){
			$.showTuiErrorDialog('系统异常，删除失败！');
		}) ;
	};
//});