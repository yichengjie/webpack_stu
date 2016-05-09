define(function(require, exports, module) {
	var util = require('../util') ;
	 var _ = require('underscore') ;
	var app = angular.module("app.validator",[]) ;
	
	
	app.directive('letterOrNum',function(){
        return {
            restrict:"A",
            scope:true,
            require:"?ngModel",
            link:function(scope,ele,attrs,ctrl){
                if(!ctrl) return ;
                ctrl.$validators.letterOrNum = function(modelValue,viewValue){
                    if(viewValue!=''){
                        return util.islettersOrNumber(viewValue);
                    }
                    return true;
                };
            }
        };
    });
	
    
    //positiveInteger(正整数不包括'0')
    app.directive('pint',function(){
        return {
            restrict:"A",
            scope:true,
            require:"?ngModel",
            link:function(scope,ele,attrs,ctrl){
                if(!ctrl) return ;
                ctrl.$validators.pint = function(modelValue,viewValue){
                    if(viewValue!=''){
                        return util.isPositiveInteger(viewValue);
                    }
                    return true;
                };
            }
        };
    });
    
    //nonNegativeInteger(包括‘0’)
    app.directive('nnint',function(){
        return {
            restrict:"A",
            scope:true,
            require:"?ngModel",
            link:function(scope,ele,attrs,ctrl){
                if(!ctrl) return ;
                ctrl.$validators.nnint = function(modelValue,viewValue){
                    if(viewValue!=''){
                        return util.isNonNegativeInteger(viewValue);
                    }
                    return true;
                };
            }
        };
    });
    
     //自定义校验(三字码)
    app.directive('threecode2',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	if(!ctrl) return ;
            	ctrl.$validators.threecode2 = function(modelValue,viewValue){
                    if(viewValue!=''){
                        return util.isThreecode2(viewValue);
                    }
                    return true;
                };
            }
        }
    });
    
    app.directive('remoteValidate',['HttpOperService',function(HttpOperService){
        return {
            restrict:"A",
            scope:true,
            require:"?ngModel",
            link:function(scope,ele,attrs,ctrl){
                if(!ctrl) return ;
                ctrl.$parsers.push(function(viewValue){
                    if(viewValue!=''){
							var url =scope.data.contextPath+"/mileage/checkSequenceNumberNotExist";
							var param = {"id":scope.data.id,"sequcenceNumber":viewValue}	                    	
					    	var promise = HttpOperService.post4JSONData(url,param) ;
					    	promise.then(function(retData){
					    		if(retData.flag=='true'){
					    				if(retData.existFlag=='true'){
					    					 ctrl.$setValidity('remoteValidate',true);
										}else{
											ctrl.$setValidity('remoteValidate',false);
										}
					    		}else{
					    			ctrl.$setValidity('remoteValidate',false);
					    		}
					    	}) ;
                    }
                    ctrl.$setValidity('remoteValidate',true);
                    return viewValue;
                });
            }
        };
    }]);
    
      //biggerDate
    app.directive('biggerDateTime',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                if (!ctrl) return;
                ctrl.$validators.biggerDateTime = function(modelValue, viewValue) {
                    var compareVal = attrs['biggerDateTime'] ;
                    if(viewValue!=''&&compareVal!=''){
                        return util.isBiggerDateTimeThan(viewValue,compareVal) ;
                    }
                    return true;
                };
                attrs.$observe('biggerDateTime', function() {
                    ctrl.$validate();
                });
            }
        }
    });

    //smallerDate
    app.directive('smallerDateTime',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                if (!ctrl) return;
                ctrl.$validators.smallerDateTime = function(modelValue, viewValue) {
                    var compareVal = attrs['smallerDateTime'] ;
                    if(viewValue!=''&&compareVal!=''){
                        return util.isSmallerDateTimeThan(viewValue,compareVal) ; 
                    }
                    return true;
                };
                attrs.$observe('smallerDateTime', function() {
                    ctrl.$validate();
                });
            }
        }
    });
    
    
    //biggerThanCurrent
    app.directive('biggerDateTimeCurrent',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	if (!ctrl) return;
                ctrl.$validators.biggerDateTimeCurrent = function(modelValue, viewValue) {
                	//注意这里判断当前控件是否是不可编辑状态，
                	//如果属于不可编辑状态，则不判断大于当前日期
                     var status = scope.data.status ;
	                 if(viewValue!=''&&!util.checkStatusIsDisable(status)){
	                      return util.isBiggerDateTimeThanCurrent(viewValue) ;
	                }
	                 return true ;
                };
            }
        }
    });
    
	
}) ;