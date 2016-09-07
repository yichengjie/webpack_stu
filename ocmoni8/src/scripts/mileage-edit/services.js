//define(function(require, exports, module) {
	var app = angular.module('app.service',[]) ;
	app.factory('FormData', function(){
	  return {
		  id:'',
		  action:'',
		  carrCode:'',//航空公司
		  contextPath:'',
	      status:'1',//1:未生效的记录
		  sequenceNumber:'',//序列号
		  firstMaintenanceDate:'',//生效日期
		  lastMaintenanceDate:'',//截止日期
		  basicCurrencyUnit:'',//基准货币类型
		  exchangeFactor:'',//兑换系数
		  serviceType:'',//服务类型
		  subCode:'',//服务子代码
		  groupCode:'',//服务所在组
		  frequentFlyerStatus:'',//常旅客等级
		  geoSpecLoc1Type:'',//区域一类型
		  geoSpecLoc1:'',//区域一代码
		  geoSpecLoc2Type:'',//区域二类型
		  geoSpecLoc2:''//区域二代码
	  };
	}) ;
//}) ;