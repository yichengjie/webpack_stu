//define(function(require, exports, module) {
	var util = require('../lib/util') ;
	var _ = require('underscore_lib') ;
	var app = angular.module('app.directive',[]) ;
	
	app.directive('datetimepicker', [function () {
        return {
            restrict: 'A',
            scope:true,
            require:'?ngModel',
            link: function (scope, iElement, iAttrs,ctrl) {
                if(!ctrl) return ;
                var minDateStr = iAttrs['datetimepicker'] ;
                var minDate = new Date(minDateStr) ;
                //配置日期控件
                var optionObj = {} ;
                optionObj.dateFormat = "yy-mm-dd" ;
                optionObj.timeFormat = 'HH:mm' ;
                var updateModel = function(dateText){
                    scope.$apply(function  () {
                        //调用angular内部的工具更新双向绑定关系
                        ctrl.$setViewValue(dateText) ;
                    }) ;
                };
                optionObj.onSelect = function(dateText,picker){
                    updateModel(dateText) ;
                    if(scope.select){
                        scope.$apply(function  () {
                            scope.select({date:dateText}) ;
                        }) ;
                    }
                };
                 optionObj.minDate = minDate ;
                optionObj.timeText="&nbsp;&nbsp;时间" ;
                optionObj.hourText ="&nbsp;&nbsp;时" ;
                optionObj.minuteText ="&nbsp;&nbsp;分" ;
                //optionObj.secondText = "&nbsp;&nbsp;秒" ;
                optionObj.currentText = "当前" ;
                optionObj.closeText = "关闭" ;
                optionObj.showButtonPanel = true ;
                //optionObj.showSecond = true ;
                iElement.datetimepicker(optionObj) ;
            }
        };
    }]) ;
	
	app.directive("upperInput",function(){
        return{
            restrict:'A',
            require:'ngModel',
            link:function(scope,element,attrs,ngModel){
                if (!ngModel){
                	return; 
                }
                ngModel.$render = function() {
                    var tmp = ngModel.$viewValue || '' ;
                    tmp = tmp.toUpperCase() ;
                    element.val(tmp);
                    ngModel.$setViewValue(tmp);
                };
                $(element).bind('blur', function() {
                    scope.$apply(read);
                });
                function read() {
                    var tmp = ngModel.$viewValue || '';
                    tmp = tmp.toUpperCase() ;
                    ngModel.$setViewValue(tmp);
                    element.val(tmp);
                }
            }
        };
    }) ;
	
	
	
    //区域长度限制
    app.directive('geoMaxLength',function(){
	    return {
	        restrict: 'AE',
	        replace: true,
	        scope:true,
	        controller:['$scope', '$element', '$attrs',function($scope, $element, $attrs){
				$scope.getGeoLengthByType = function(type){
					type = type || "" ;
				  	var obj = {'A':'1','C':'3','N':'2','P':'3','S':'2','Z':'3'} ;
				    var len = eval("obj['"+type+"']") || 0;
					return len ;
				};
			}],
	        link: function(scope, element, attrs){
	            scope.$watch(attrs['geoMaxLength'], myWatchCallbackFunc);
	            function myWatchCallbackFunc (){
	                var geoMaxLength = attrs['geoMaxLength'] ;
	                var value  = scope.$eval(geoMaxLength) ;
					var len = scope.getGeoLengthByType(value) ;
					element.attr('maxlength',len) ;//设置长度
	            }
	        }
	    };
	  }) ;
    
//}) ;