//define(function(require, exports, module) {
	// 通过require引入依赖
	//var $ = require('jquery');
	var Common = require('../lib/common');
	var common = new Common();
	var httpClient = require('../lib/HttpClientUtil') ;
	var util = require('../lib/util') ;

	function S7Delete() {

	};

	module.exports = S7Delete;

	/**
	 * 发布按钮绑定事件
	 */
	S7Delete.prototype.init = function() {
		$(document).delegate('.delete[name=s7delete]', 'click', function() {
			var list_item = $(this).parents('li') ;
			//删除s7id
			var s7id = list_item.find(':input[name=s7id]').attr('value');
			var deletedS7 = $(this);
			var param = {};
			var contextPath = util.getContextPath() ;
			var url = contextPath+"/s7/s7delete.action";
			param['s7Id'] = s7id;
			//param['tokenId'] = $('#tokenId').val();
			common.baseOptions['url'] = url;
			common.baseOptions['data'] = param;
			common.baseOptions['success'] = function(datas) {
				if (datas === null) {
					window.location.reload();
					return;
				}
				if (datas === 'SUCCESS' ) {
					$.showTuiSuccessDialog('删除成功！', function() {
						if (deletedS7.parents('table').find('tr').length === 1) {
							deletedS7.parents('div[name=contentContainer]').remove();
						}
						list_item.remove();
					});
				} else {
					$.showTuiErrorDialog('系统异常，删除失败！');
				}
			};
			//$.ajax(common.baseOptions);	
			httpClient.dealAjax4BaseOptions(common.baseOptions)  ;
		});
	};
//});
