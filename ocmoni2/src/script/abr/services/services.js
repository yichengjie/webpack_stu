define(function(require, exports, module) {
	var app = angular.module("app.service",[]) ;
	var util = require('../../util') ;
	app.factory('FormData', [ function(){
		return {
			id:'',
			action:'',
			carrCode:'',//航空公司
			contextPath:'',
			status:'1',//1:未生效的记录
			sequcenceNumber:'',//序列号
			serviceType:'*',//服务类型//  这个从哪里获取呢？
			subCode:'',//子代码，服务三字代码，【*】则为不做任何限制，ALL
			internationalTag:'',//行程种类,由行程判断得到   I=国际   D=国内（默认值）
			effDate:'',//生效日期
			discDate:'',//截止日期
			dataSource:'',//访问数据源,OPTSVC=ATPCO数据（默认值） TSKOC=航信数据
			publishObjectList:[
				//{"type":'V',"code":"001","selected":false},
				//{"type":'V',"code":"001","selected":true}
			]
		};
	}]) ;
	
	
	app.factory('HttpOperService', ['$http', '$q', function ($http, $q) {  
	  return {  
		    getDataByUrl : function(url) {  
		      var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行  
		      $http({method: 'GET', url: url}).  
		      success(function(data, status, headers, config) {  
		        deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了  
		      }).  
		      error(function(data, status, headers, config) {  
		        deferred.reject(data);   // 声明执行失败，即服务器返回错误  
		      });  
		      return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
		    },
		    postDate:function(url,queryParam,config){
		    	var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行  
		    	var tmpCfg = {} ;
		    	if(config!=null){
		    		tmpCfg = config ;
		    	}
		    	var csrfInfo = util.getCSRFInfo() ;
		    	tmpCfg = $.extend(tmpCfg,csrfInfo) ;
		        $http({method: 'POST', url: url,data:queryParam,params:tmpCfg}).  
		        success(function(data, status, headers, config) {  
		           deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了  
		        }).  
		        error(function(data, status, headers, config) {  
		           deferred.reject(data);   // 声明执行失败，即服务器返回错误  
		        });  
		      	return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
		    }
		};
	}]);  
	
}) ;