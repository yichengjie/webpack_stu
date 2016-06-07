//define(function(require, exports, module) {
    var util = require('../../lib/util') ;
    var app = require('./directives') ;
    var _ = require('underscore_lib') ;
    

    //区域校验
    app.directive('geo',function(){
        var obj = {'A':'areacode','C':'citycode','N':'countrycode','P':'airportcode','S':'statecode','Z':'zonecode'} ;
        var values = _.values(obj); 
        function resetAllSuccess (ctrl){
            _.each(values, function(item){
                ctrl.$setValidity(item,true);
            });
        };
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


    //letter
     app.directive('letter',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                ctrl.$validators.letter = function(modelValue,viewValue){
                    if(viewValue!=''){
                        return util.isLetter(viewValue);
                    }
                    return true;
                };
            }
        };
    });

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

    //small
    app.directive('smaller',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                ctrl.$validators.smaller = function(modelValue, viewValue) {
                    var flag = true ;
                    var compareVal = attrs['smaller'] ;
                    if(viewValue!=''&&compareVal!=''){
                        if(!isNaN(viewValue)&&!isNaN(compareVal)){//都为数值时
                            var curInt = parseFloat(viewValue) ;
                            var comInt = parseFloat(compareVal) ;
                            if(curInt>comInt){
                                flag = false;
                            }
                        }
                    }
                    return flag;
                };
                attrs.$observe('smaller', function() {
                    ctrl.$validate();
                });
            }
        };
    });

    //bigger
    app.directive('bigger',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                ctrl.$validators.bigger = function(modelValue, viewValue) {
                    var flag = true ;
                    var compareVal = attrs['bigger'] ;
                    if(viewValue!=''&&compareVal!=''){
                        if(!isNaN(viewValue)&&!isNaN(compareVal)){//都为数值时
                            var curInt = parseFloat(viewValue) ;
                            var comInt = parseFloat(compareVal) ;
                            if(curInt<comInt){
                                flag = false;
                            }
                        }
                    }
                    return flag;
                };
                attrs.$observe('bigger', function() {
                    ctrl.$validate();
                });
            }
        }
    });

    //biggerDate
    app.directive('bd',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                if (!ctrl) return;
                ctrl.$validators.bd = function(modelValue, viewValue) {
                    var compareVal = attrs['bd'] ;
                    if(viewValue!=''&&compareVal!=''){
                        return util.isBiggerDateThan(viewValue,compareVal) ;
                    }
                    return true;
                };
                attrs.$observe('bd', function() {
                    ctrl.$validate();
                });
            }
        }
    });

    //smallerDate
    app.directive('sd',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                if (!ctrl) return;
                ctrl.$validators.sd = function(modelValue, viewValue) {
                    var compareVal = attrs['sd'] ;
                    if(viewValue!=''&&compareVal!=''){
                        return util.isSmallerDateThan(viewValue,compareVal) ; 
                    }
                    return true;
                };
                attrs.$observe('sd', function() {
                    ctrl.$validate();
                });
            }
        }
    });
    
    
    //biggerThanCurrent
    app.directive('btc',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	if (!ctrl) return;
                ctrl.$validators.btc = function(modelValue, viewValue) {
                     var statusDes = scope.data.statusDes ;
	                 if(viewValue!=''&&!util.checkStatusIsDisabled(statusDes)){
	                      return util.isBiggerThanCurrent(viewValue) ;
	                }
	                 return true ;
                };
            }
        }
    });
  //biggerThanCurrent(无论是否可编辑都进行字段合法性校验)
    app.directive('btc2',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	if (!ctrl) return;
                ctrl.$validators.btc2 = function(modelValue, viewValue) {
	                 if(viewValue!=''){
	                      return util.isBiggerThanCurrent(viewValue) ;
	                }
	                 return true ;
                };
            }
        }
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
                	var statusDes = scope.data.statusDes ;
	                 if(viewValue!=''&&!util.checkStatusIsDisabled(statusDes)){
	                      return util.isBiggerDateTimeThanCurrent(viewValue) ;
	                }
	                 return true ;
                };
            }
        }
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
        }
    });
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
    app.directive('dateoc',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                if (!ctrl) return;
                ctrl.$validators.dateoc = function(modelValue, viewValue) {
		                if(viewValue!=''){
	                        return util.isDateOC(viewValue);
	                    }
	                    return true ;
                };
            }
        }
    });
    
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
        }
    });
  //自定义校验(三字码)
    app.directive('threecode',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	if (!ctrl) return;
                ctrl.$validators.threecode = function(modelValue, viewValue) {
		                if(viewValue!=''){
	                        return util.isThreecode(viewValue) ;
	                    }
	                    return true ;
                };
            }
        }
    });

    app.directive('air',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
            	if (!ctrl) return;
                ctrl.$validators.threecode = function(modelValue, viewValue) {
		                if(viewValue!=''){
	                        return util.isAir(viewValue);
	                    }
	                    return true ;
                };
            }
        }
    });

    //发布对象校验
    app.directive('publicobj',function(){
        return {
            restrict:"A",
            scope:true,
            require:"ngModel",
            link:function(scope,ele,attrs,ctrl){
                ctrl.$parsers.push(function(viewValue){
                    var curType = attrs['publicobj'] ;
                    var len = viewValue.length ;
                    if(curType=='T'){
                        if(len>6){
                            ctrl.$setValidity('length6',false);
                        }else{
                            ctrl.$setValidity('length6',true);
                        }
                        ctrl.$setValidity('length8',true);
                    }else{
                        if(len>8){
                            ctrl.$setValidity('length8',false);
                        }else{
                            ctrl.$setValidity('length8',true);
                        }
                        ctrl.$setValidity('length6',true);
                    }
                    return viewValue;
                });
            }
        }
    });
    
    
    
//}) ;