//define(function(require, exports, module) {
    var app = angular.module('app.controllers',[]) ;
    var _ = require('underscore_lib') ;
    var moment = require('moment_lib') ;
	var Clipboard =  require('clipboard_lib') ;//粘贴板
	var jsonData = require('./jsonData') ;
	
	var growlConfig = {info:{type: 'info',offset: {from: 'top', amount: 110}},
					   danger:{type: 'danger',offset: {from: 'top', amount: 110}},
					   success:{type: 'success',offset: {from: 'top', amount: 110}}};
	var requestTypeJson = {
    		"座选":"TSKOC","升舱":"TSKOC","餐食":"TSKOC",
    		"贵宾休息室":"TSKOC","优先登机":"TSKOC","FareLock":"TSKOC",
    		"通用券":"TSKOC","预付费行李":"P","逾重行李":"C"
    } ;		
    
    
    function changeInputStatus4Submit(data,myForm){
        var keys1 = _.keys(data) ;
        var keys2 = _.keys(myForm) ;
        _.each(keys2,function(item){
            if(_.contains(keys1,item)){
                myForm[item].$setDirty(true) ;
            }
        }) ;
    }

    function simplePropCopy (obj,org){
        for(var name in org){
            obj[name] = angular.copy(org[name])  ;
        }
    }
    /**
     * <pre>
     * 		功能描述:重置表单数据
     * </pre>
     */
    function resetForm(data,orgData,myForm){
            var keys =  _.keys(data) ;
            _.each(keys, function (key) {
            	if(!_.contains(['marketingAirlineCode'],key)){
            		var oldValue =  orgData[key] ;
	                if(_.isArray(oldValue)|| _.isObject(oldValue)){
	                    data[key] = angular.copy(oldValue) ;
	                }else{
	                   data[key] = oldValue ;
	                }
            	}
            }) ;
            myForm.$setPristine() ;
    }
    
    function manualValidate(formData){
    	var flag = true ;
    	var requestTypeShow = formData['requestTypeShow'] ;
    	if(requestTypeShow=='升舱'){
    		var listUpgradeInfo = formData['listUpgradeInfo'] ;
    		if(listUpgradeInfo.length==0){
    			flag = false;
    			$.bootstrapGrowl("升舱至少填写一条记录!",growlConfig.danger) ;
    		}
    	}else if(requestTypeShow=='预付费行李'||requestTypeShow=='逾重行李'){
    		var listBaggages = formData['listBaggages'] ;
    		if(listBaggages.length==0){
    			flag = false;
    			$.bootstrapGrowl("收费行李至少填写一条记录!",growlConfig.danger) ;
    		}
    	}
    	return flag;
    }

    app.controller('EditController',['$scope','FormData','HttpOperService','ShowHideTbStatus','InputRequiredStatus', function ($scope,FormData,HttpOperService,ShowHideTbStatus,InputRequiredStatus) {
        $scope.data = FormData ;
        $scope.orgData = angular.copy(FormData) ;
        $scope.showHideStatus = ShowHideTbStatus ;
        //$scope.showDetailPanelFlag = false;
        //项目目录
        $scope.contextPath = $("#contextPath").val() ;
        //console.info('contextPath : ' +  $scope.contextPath) ;
        var carrCode = $("#carrCode").val() ;//marketingAirlineCode
        //市场方航空公司被固定，不可随意修改
        $scope.data.marketingAirlineCode = carrCode ;
        //显示正在加载中的标志
        $scope.showLoadingFlag = false;
        //页面元素是否必填的状态
        $scope.requiredStatus = InputRequiredStatus ;
        //验证结果存放
        $scope.validateResultData = {
            back:false,
            requestXML:'',
            singleDataFlag:false,
            singleData:{amount:'',currency:'',sequenceNumber:'',code:''},
            multiDataFlag:false,
            all:{amount:'',currency:''},
            listData:[],
            showDetailPanelFlag:false
        } ;

        $scope.orgValidateResultData = angular.copy($scope.validateResultData) ;

        window.onscroll = function () { 
            var top = document.documentElement.scrollTop || document.body.scrollTop; 
            if($scope.validateResultData.showDetailPanelFlag){
               $scope.$apply(function(){
                   $scope.validateResultData.showDetailPanelFlag = false;
               }) ; 
            }
        };
        //返回之前页面
        $scope.backPage = function (e) {
            //console.info('back page ......') ;
            window.location.href= $scope.contextPath+'/oc/toQueryS7UI.action' ;
        };
        //清空页面数据
        $scope.resetPage = function (e) {
            //console.info('reset page ......') ;
            //growl.addSuccessMessage("重置页面数据成功!");
        	$.bootstrapGrowl("重置页面数据成功!",growlConfig.success) ;
            simplePropCopy($scope.validateResultData,$scope.orgValidateResultData) ;
            resetForm($scope.data,$scope.orgData,$scope.myForm) ;
        };
        
        //注册jquery validate框架
        //对表单注册校验
        var validator = $("#myForm").validate({meta:""});
        //提交表单
        $scope.submitPage = function () {
        	//如果上次的校验还没有返回的话，将不进行重复校验
        	if($scope.showLoadingFlag){
        		//growl.addInfoMessage("校验中，请不要重复点击校验!");
        		$.bootstrapGrowl("校验中，请不要重复点击校验!",growlConfig.info) ;
        		return ;
        	}
        	//将之前的历史清除//隐藏xml复制
        	$scope.validateResultData.back = false ;
            var url = $scope.contextPath+"/validate/submitPage.action" ;
            var ngFlag = $scope.myForm.$valid ;
            //将结校验结果init
            simplePropCopy($scope.validateResultData,$scope.orgValidateResultData) ;
            //$scope.showDetailPanelFlag = false;
            //将页面上所有字段的dirty置为true
            changeInputStatus4Submit($scope.data,$scope.myForm) ;
            var jqFlag = validator.form() ;
            var config = {} ;
            var queryParam = $scope.data ;
            var manualFlag = false ;
            if(ngFlag&&jqFlag){
            	manualFlag = manualValidate($scope.data) ;
            }
            if (ngFlag&&jqFlag&&manualFlag) {
            	//加载loading图标
            	//$.isLoading(loadingDefaults);
            	$scope.showLoadingFlag = true;
                var promise = HttpOperService.post4JSONData(url,queryParam,config) ;
                promise.then(function (data) {
                	$scope.validateResultData.back = true ;
                    var retFlag = data.flag ;
                    //隐藏加载图标
                    //$.isLoading( "hide" );
                    $scope.showLoadingFlag = false;
                    $scope.validateResultData.requestXML = data.requestXML ;
                    if(retFlag==true||retFlag=='true'){
                    	var tmpFlag = false;
                        if(data.singleDataFlag==true||data.singleDataFlag=='true'){
                        	//growl.addSuccessMessage("验证返回单条信息成功!");
                        	$.bootstrapGrowl("验证返回单条信息成功!",growlConfig.success) ;
                            $scope.validateResultData.singleDataFlag = true ;
                            $scope.validateResultData.singleData = data.feeInfo ;
                            tmpFlag = true ;
                        }else{
                            $scope.validateResultData.singleDataFlag = false ;
                        }
                        if(data.multiDataFlag==true||data.multiDataFlag=='true'){
                        	//growl.addSuccessMessage("验证返回多条信息成功!");
                        	$.bootstrapGrowl("验证返回多条信息成功!",growlConfig.success) ;
                            $scope.validateResultData.multiDataFlag = true ;
                            $scope.validateResultData.listData = data.listFeeInfo ;
                            $scope.validateResultData.all.amount = data.amount;
                            $scope.validateResultData.all.currency = data.currency;
                            tmpFlag = true ;
                        }else{
                            $scope.validateResultData.multiDataFlag = false ;
                        }
                        //既不是单条数据也不是多条数据
                        if(!tmpFlag){
                        	//growl.addErrorMessage("返回的数据格式不合法!");
                        	$.bootstrapGrowl("返回的数据格式不合法!",growlConfig.danger) ;
                        }
                    }else{
                        $scope.validateResultData.singleDataFlag = false ;
                        $scope.validateResultData.multiDataFlag = false ;
                        //growl.addErrorMessage("校验出错!");
                        $.bootstrapGrowl("校验出错!",growlConfig.danger) ;
                    }
                },function(err){
                	$scope.validateResultData.back = true ;
                	//growl.addErrorMessage("校验出错!");
                	$.bootstrapGrowl("校验出错!",growlConfig.danger) ;
                }) ;
            } else {
                $.bootstrapGrowl("验证未通过，表单填写存在错误!",growlConfig.danger) ;
            }
        };
        //常旅客等级，从数据库配置中读取
        $scope.frequentFlyerStatusList = [] ;
        //旅客类型，从数据库配置中读取
        $scope.passengerTypeCodeList = [] ;
        //当前日期
        var currentDateTimeStr = moment().format('YYYY-MM-DD HH:mm') ;
        //免费行李的显示与隐藏
        $scope.showHideFreeBaggageFlag = false;
        $scope.showHideFreeBaggage = function () {
            $scope.showHideFreeBaggageFlag = !$scope.showHideFreeBaggageFlag ;
            if($scope.showHideFreeBaggageFlag){//如果将变成隐藏
                $scope.data.freeAmount = '' ;
                $scope.data.freeUnit = '' ;
            }
        };

        var initPageDataUrl = $scope.contextPath+"/validate/initPageData.action" ;
        var promise = HttpOperService.get4JSONData(initPageDataUrl) ;
        promise.then(function (data) {
            //将日期控件填充为当前的时间
            $scope.data.salesDate = currentDateTimeStr ;
            $scope.data.departureDateTime = currentDateTimeStr ;
            $scope.data.arrivalDateTime = currentDateTimeStr ;
            if(data.flag=='true'||data.flag==true){
                $scope.frequentFlyerStatusList = data.frequentFlyerStatusList ;
                $scope.passengerTypeCodeList = data.passengerTypeCodeList ;
            }else{
                //console.error('初始化页面数据出错...') ;
                //growl.addErrorMessage("初始化页面数据出错...");
                $.bootstrapGrowl("初始化页面数据出错!",growlConfig.danger) ;
            }
        }, function (err) {
           //console.info(err) ;
           //growl.addErrorMessage("获取初始化页面数据出错，请检查网络!");
           $.bootstrapGrowl("获取初始化页面数据出错，请检查网络!",growlConfig.danger) ;
        }) ;
        //当改变发布对象类型的时候
        $scope.changePublicObjectType = function (type) {
            if(type==''){
                $scope.data.publicObjectCode = '' ;
            }
        };
        //切换服务类型时
        $scope.changeServiceType = function(e){
        	 var requestTypeShow = $scope.data.requestTypeShow ;
        	 var requestType = requestTypeJson[requestTypeShow] || '' ;
        	 resetForm($scope.data,$scope.orgData,$scope.myForm) ;
        	 $scope.data.requestTypeShow= requestTypeShow ;
        	 $scope.data.requestType = requestType ;
        	 //当切换服务类型时页面上的时间不被清空
        	 _.each(['salesDate','departureDateTime','arrivalDateTime'],function(item){
        	 	$scope.data[item] = currentDateTimeStr ;
        	 }) ;
        	
        	 var keys = _.keys(jsonData.required4RequestTypeShow) ;
        	 //改变input的是否必填的状态
        	 _.each(keys,function(key){
        		 var valArr = jsonData.required4RequestTypeShow[key] ;
        		 //判断当前input元素是否必填
        		 var containsFlag = _.contains(valArr,requestTypeShow) ;
        		 $scope.requiredStatus[key] = containsFlag ;
        	 }) ;
        };
        //复制请求xml数据到粘贴板上
        //粘贴板部分代码
        var clipboard = new Clipboard('.copyXML');
        clipboard.on('success', function(e) {
        	  $scope.$apply(function(){
        	   	  //growl.addSuccessMessage("复制内容到粘贴板上成功!");
        	   	  $.bootstrapGrowl("复制内容到粘贴板上成功!",growlConfig.success) ;
        	  }) ;
            e.clearSelection();
        });
        clipboard.on('error', function(e) {
        	 $scope.$apply(function(){
        	   	  //growl.addErrorMessage("复制内容到粘贴板上失败!");
        	   	  $.bootstrapGrowl("复制内容到粘贴板上失败!",growlConfig.danger) ;
        	  }) ;
        });

        //当表格的tr被点击时的操作
        $scope.selectTr = function (event) {
            $(event.target).parents('tr').siblings('tr').removeClass('selectTd')  ;
            $(event.target).parents('tr').addClass('selectTd') ;
        };
        //显示隐藏验证结果明细
        $scope.showValidateResultDetail = function () {
            $scope.validateResultData.showDetailPanelFlag = !$scope.validateResultData.showDetailPanelFlag;
        };
    }]) ;
//}) ;
