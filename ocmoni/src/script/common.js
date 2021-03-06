define(function(require, exports, module) {

	//通过require引入依赖
	var $ = require('jquery');

	function Common() {

	};

	module.exports = Common;

	//将form中的值序列化为json数组
	Common.prototype.formSerializeObj = function(formId) {
		var arr = $('#' + formId).serializeArray();
		var result = {};
		for ( var i = 0; i < arr.length; i++) {
			result[arr[i].name] = arr[i].value;
		}
		return result;
	};

	//为了方便json的ajax请求，使用baseOptions对象
	Common.prototype.baseOptions = {
		'type' : 'POST',
		'dataType' : 'json',
		'contentType' : 'application/x-www-form-urlencoded; charset=UTF-8',
		'timeout' : 100000,
		'async' : false,
		'error' : function() {
			$.showTuiErrorDialog('系统响应异常！');
		}
	};
	
	
/*	Common.prototype.dealAjaxRequest4JSObj = function(serverURL,jsObjData){//异步操作
		var defer = $.Deferred();
		var option = {
    	   contentType:'application/json' ,
    	   url:serverURL,
    	   type: 'POST',
    	   timeout : 100000, //超时时间设置，单位毫秒
    	   data:JSON.stringify(jsObjData),
    	   dataType:'json',
    	   error: function (err) {
    	   	  console.info(err) ;
    	   	  $.showTuiErrorDialog('系统响应异常！');
    	   },
    	   success:function (result) { 
    		   defer.resolve(result);
    	   }
		};
    	$.ajax(option); //发送ajax请
		return defer.promise() ;
	}
	
	
	Common.prototype.dealAjaxRequest4SimpleParam = function(serverURL,simpleJsonData){//异步操作
		 var defer = $.Deferred();
		 var option = {
    	   url:serverURL,
    	   type: 'POST',
    	   contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
    	   timeout : 100000, //超时时间设置，单位毫秒
    	   data:simpleJsonData,
    	   dataType:'json',
    	   error: function (err) {
    	   	  console.info(err) ;
    	   	  $.showTuiErrorDialog('系统响应异常！');
    	   },
    	   success:function (result) { 
    		   defer.resolve(result);
    	   }
		 };
    	$.ajax(option); //发送ajax请
		return defer.promise() ;
	}*/
	
	Common.prototype.getDate = function() {
		var yxday = new Date();
		var month = yxday.getMonth() < 9 ? '0'
				+ (yxday.getMonth() + 1).toString() : (yxday.getMonth() + 1)
				.toString();
		var day = yxday.getDate() < 10 ? '0' + yxday.getDate().toString()
				: yxday.getDate().toString();

		return yxday.getFullYear().toString() + '-' + month + '-' + day;
	};
	
	Common.prototype.convetStr2Date = function(str) {
		str = str.replace(/-/g,"/");
		var date = new Date(str );
		return date ;
	};
	
	
	
});