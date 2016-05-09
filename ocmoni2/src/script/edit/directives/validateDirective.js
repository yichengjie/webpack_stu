var util = require('../../util') ;
var app = require('./directives') ;
var _ = require('underscore') ;


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
            ctrl.$parsers.push(function(viewValue){
                var flag = true ;
                var key = "" ;
                if(viewValue!=''){
                    var geo = attrs['geo'] ;
                    var geoSpecLocType = scope.data[geo] ;
                    key = obj[geoSpecLocType] ;
                    flag = util.isValidGeoLocal(viewValue,geoSpecLocType) ;
                }
                resetAllSuccess(ctrl) ;
                if(key!=null&&key.length>0){
                    ctrl.$setValidity(key,flag);
                }
                return viewValue;
            });
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
                 if(viewValue!=''&&!util.checkStatusIsDisable(statusDes)){
                      return util.isBiggerThanCurrent(viewValue) ;
                }
                 return true ;
            };
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



