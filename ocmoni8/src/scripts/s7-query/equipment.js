//define(function(require, exports, module) {
	var Common = require('../lib/common');
	var common = new Common();
	var httpClient = require('../lib/HttpClientUtil') ;
	var util = require('util_lib');
	function Equipment() {
	}
	
	module.exports = Equipment;
	/**
	 * 查询机型
	 */
	Equipment.prototype.query = function(type) {
		var url = $('#s7_F_equipment').attr('url');
		var ajaxing = httpClient.dealAjaxRequestWithoutParam(url) ;
		$.when(ajaxing).done(function(retData){
			for(var i = 0; i < retData.length; i++) {
				var equipment = '<option>'  + retData[i].code + '-' + retData[i].description +'</option>';
				$('#s7_F_equipment').append(equipment);
			}
		}).fail(function(err){
			util.toastDanger('初始化页面机型出错!') ;
		});
	};
	
//});