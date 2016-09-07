
var _ = require('underscore_lib') ;
var util = require('../../lib/util') ;
var app = angular.module("app.directive",[]) ;


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



//lettersOrNumber
app.directive('lorn',function(){
    return {
        restrict:"A",
        scope:true,
        require:"?ngModel",
        link:function(scope,ele,attrs,ctrl){
            if(!ctrl) return ;
            ctrl.$validators.lorn = function(modelValue,viewValue){
                if(viewValue!=''){
                    return util.islettersOrNumber(viewValue);
                }
                return true;
            };
        }
    };
});
app.directive('subCodeRemoteValidate',['HttpOperService',function(HttpOperService){
    return {
        restrict:"A",
        scope:true,
        require:"?ngModel",
        link:function(scope,ele,attrs,ctrl){
            if(!ctrl) return ;
            ctrl.$parsers.push(function(viewValue){
                if(viewValue!='' && viewValue.length==3){
						var url =scope.data.contextPath+"/occonfig/checkSubCodeExist.action";
						var param = {"carrCode":scope.data.carrCode,"serviceType":scope.data.serviceType,"subCode":viewValue};	                    	
				    	var promise = HttpOperService.post4JSONData(url,param) ;
				    	promise.then(function(retData){
				    		if(retData.flag=='true'){
				    				if(retData.existFlag=='true'){
				    					 ctrl.$setValidity('subCodeRemoteValidate',true);
									}else{
										ctrl.$setValidity('subCodeRemoteValidate',false);
									}
				    		}else{
				    			ctrl.$setValidity('subCodeRemoteValidate',false);
				    		}
				    	}) ;
                }
                ctrl.$setValidity('subCodeRemoteValidate',true);
                return viewValue;
            });
        }
    };
}]);