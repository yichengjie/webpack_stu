define(function(require, exports, module){
	 var _ = require("underscore_lib") ;
	 var directives = require("./directives") ;
	 var headerHtml = require("../tpls/header.html") ;
	 var chooseDivHtml = require("../tpls/choose_div.html") ;
	 var chooseUlHtml = require("../tpls/choose-ul.html") ;
	 directives.directive('headerNav', function() {
	    return {
	        restrict: 'E',
	        replace: true,
			scope:true,
	        template: function(elem,attrs){
	        	var action  = $.trim($("#action").val()) ;
	        	var headerTipStr = "" ;
	        	 if(action=="add"){
	    			 headerTipStr = "新建服务费用" ;
	    		  }else{//表示为修改页面跳转过来的
	    		  	  headerTipStr = "更新服务费用" ;
	    		  }
	        	 var template = _.template(headerHtml);
	        	 var str = template({headerTipStr: headerTipStr});
	        	return str ;
	        },
	        link:function(scope,elem,attrs){
	        	scope.backPage = function (){
	        		  var contextPath = $.trim($("#contextPath").val());
	    			  window.location.href= contextPath+'/oc/toQueryS7UI.action' ;
	    		  }
	        }
	    };
	 });

	 directives.directive('chooseDiv', function() {
	    return {
	        restrict: 'AE',
	        replace: true,
			scope:true,
			transclude:true,
	        template: chooseDivHtml,
			compile: function compile(tElement, tAttrs, transclude){
				var urlStr = tAttrs['htmlUrl'] ;
				var template = _.template(chooseUlHtml);
				var htmlStr = template({value: urlStr});
				var tmpDiv = tElement.find('div.service_list') ;
				tmpDiv.append(htmlStr) ;
			}
	    };
	 });

 }) ;
