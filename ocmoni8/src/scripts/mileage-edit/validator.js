//define(function(require, exports, module) {
	var util = require('../lib/util') ;
	 var _ = require('underscore_lib') ;
	var app = angular.module("app.validator",[]) ;
	
	app.directive('datetimeoc',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                if (!ctrl) return;
                ctrl.$validators.datetimeoc = function(modelValue, viewValue) {
	                if(viewValue!=''){
                        return util.isDateTimeOC(viewValue);
                    }
                    return true ;
                };
            }
        };
    });
	
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
    
     //自定义校验(三字码)(必须为3位长度)
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
        };
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
						var url =scope.data.contextPath+"/mileage/checkSequenceNumberNotExist.action";
						var param = {"id":scope.data.id,"sequcenceNumber":viewValue} ;	                    	
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
        };
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
        };
    });
    
    
    //biggerThanCurrent(disabled的控件不做校验)
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
	                 if(viewValue!=''&&!util.checkMileageStatusIsDisabled(status)){
	                      return util.isBiggerDateTimeThanCurrent(viewValue) ;
	                }
	                 return true ;
                };
            }
        };
    });
    
    
    //biggerThanCurrent(disabled的控件也做校验)
    app.directive('biggerDateTimeCurrent2',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	if (!ctrl) return;
                ctrl.$validators.biggerDateTimeCurrent2 = function(modelValue, viewValue) {
                	//注意这里判断当前控件是否是不可编辑状态，
                	//如果属于不可编辑状态，则不判断大于当前日期
                     var status = scope.data.status ;
	                 if(viewValue!=''){
	                      return util.isBiggerDateTimeThanCurrent(viewValue) ;
	                }
	                 return true ;
                };
            }
        };
    });
    
    
    app.directive('integer',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	 if (!ctrl) return;
            	 ctrl.$validators.integer = function(modelValue, viewValue) {
 	                 if(viewValue!=''){
 	                      return util.isInteger(viewValue) ;
 	                }
 	                 return true ;
                 };
            }
        };
    });
	//区域校验
    app.directive('geo',function(){
        var obj = {'A':'areacode','C':'citycode','N':'countrycode','P':'airportcode','S':'statecode','Z':'zonecode'} ;
        var values = _.values(obj); 
        function resetAllSuccess (ctrl){
            _.each(values, function(item){
                ctrl.$setValidity(item,true);
            });
        }
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	if (!ctrl) return;
                ctrl.$parsers.push(function(viewValue){
                    var flag = true ;
                    var key = "" ;
                    if(viewValue!=''){
                    	var geoSpecLocType = attrs['geo'] ;
                        key = obj[geoSpecLocType] ;
                        flag = util.isValidGeoLocal(viewValue,geoSpecLocType) ;
                    }
                    resetAllSuccess(ctrl) ;
                    if(key!=null&&key.length>0){
                        ctrl.$setValidity(key,flag);
                    }
                    return viewValue;
                });
                
                attrs.$observe('geo', function() {
                	var viewValue = ctrl.$viewValue ;
                	var flag = true ;
                    var key = "" ;
                    if(viewValue!=''){
                    	var geoSpecLocType = attrs['geo'] ;
                        key = obj[geoSpecLocType] ;
                        flag = util.isValidGeoLocal(viewValue,geoSpecLocType) ;
                    }
                    resetAllSuccess(ctrl) ;
                    if(key!=null&&key.length>0){
                        ctrl.$setValidity(key,flag);
                    }
                }) ;
                
            }
        };
    });
//}) ;