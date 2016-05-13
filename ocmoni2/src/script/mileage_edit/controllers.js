define(function(require, exports, module) {
	var app = angular.module('app.controller',[]) ;
	var _ = require('underscore') ;
	var moment = require('moment_lib') ;
	
	var dateTimeFormatStr = 'YYYY-MM-DD HH:mm' ;
	var dateFormatStr = "YYYY-MM-DD" ; 
	
	function changeInputStatus4Submit(data,myForm){
        var keys1 = _.keys(data) ;
        var keys2 = _.keys(myForm) ;
        _.each(keys2,function(item){
            if(_.contains(keys1,item)){
                myForm[item].$setDirty(true) ;
            }
        }) ;
    }
	function convertVo2FormData(vo,formData){
		for(var p in formData) {
			var flag =  vo.hasOwnProperty(p);
			if(flag){
				formData[p] = vo[p]  ;
			}
		}
	}
	app.controller('EditController',['$scope','FormData','HttpOperService',function($scope,FormData,HttpOperService){
		$scope.data = FormData ;
		var id =  $("#id").val() ;
		var carrCode = $("#carrCode").val() ;
		var action = $("#action").val() ;
		var contextPath = $("#contextPath").val() ;
		FormData.id = id ;
		FormData.action = action ;
		FormData.carrCode = carrCode ;
		FormData.contextPath = contextPath ;
		if(action=='add'){
			$scope.headerTipStr ="新增里程积分兑换" ;
			initPage4Add() ;
		}else if(action=='update'){
			$scope.headerTipStr ="更新里程积分兑换" ;
			initPage4Update() ;
		}
		/*$.growl({ title: "Growl", message: "The kitten is awake!", url: "/kittens" });
	    $.growl.error({ message: "The kitten is attacking!" });
	    $.growl.notice({ message: "The kitten is cute!" });
	    $.growl.warning({ message: "The kitten is ugly!" });*/
		//growl.addSuccessMessage("This adds a success message");
        //growl.addErrorMessage("This adds a error message");
		//常旅客等级，从数据库配置中读取
        $scope.frequentFlyerStatusList = [] ;
        //服务所在组，从数据库配置中读取
        $scope.groupCodeList = [];
        //当前日期
        var currentDateTimeStr = moment().add('hour',1).format("YYYY-MM-DD HH") +":00" ;
        var currentDateStr = moment().format(dateFormatStr) ;
        $scope.currentDateStr = currentDateStr ;
        
		function initPage4Add(){
			 //console.info('初始化新增页面数据') ;
			// var carrCode = $scope.data.carrCode;
			 var url = $scope.data.contextPath +"/mileage/initFormData" ; 
			 HttpOperService.get4JSONData(url).then(function(retData){
				 $scope.data.firstMaintenanceDate = currentDateTimeStr;
				 $scope.data.lastMaintenanceDate = "";
				 if (retData.flag == 'true' ||retData.flag==true) {
						$scope.data.sequenceNumber = retData.sequenceNumber;
						$scope.frequentFlyerStatusList = retData.frequentFlyerStatusList ;
						$scope.groupCodeList = retData.groupCodeList;
						/*if(retData.frequentFlyerStatusList&&retData.frequentFlyerStatusList.length>0){
							$scope.data.frequentFlyerStatus = retData.frequentFlyerStatusList[0] ['value'];
						}*/
						if(retData.groupCodeList && retData.groupCodeList.length>0){
							$scope.data.groupCode = retData.groupCodeList[0] ['value'];
						}
					} else {
						//growl.addErrorMessage("初始化页面出错!");
						$.growl.error({ message: "初始化页面出错!" });
					}
				}
			 );
		}
		function initPage4Update(){
			//console.info('初始化修改页面数据') ;
			var url = $scope.data.contextPath +"/mileage/findMileageExchangeById?id="+id ;
			 HttpOperService.get4JSONData(url).then(function(retData){
				 if (retData.flag == 'true' ||retData.flag==true) {
					 $scope.frequentFlyerStatusList = retData.frequentFlyerStatusList ;
					 $scope.groupCodeList = retData.groupCodeList;
					 convertVo2FormData(retData.vo,$scope.data);
				 }else{
					// growl.addErrorMessage("初始化页面出错!");
					$.growl.error({ message: "初始化页面出错!" });
				 }
				 
			 },function(err){
				$.growl.error({ message: "初始化页面出错!" });
			 });
			 
		}
		
		
		$scope.submitPage = function(){
				var serverURL =contextPath+ "/mileage/saveMileageExchangeData" ;  
				var ngFlag = $scope.myForm.$valid ;
				//var jqFlag = validator.form() ;
				changeInputStatus4Submit($scope.data,$scope.myForm) ;
				//console.info("ngFlag : " + ngFlag ) ;
				if(ngFlag){
					$.showTuiConfirmDialog('保存?', function() {
						var promise = HttpOperService.post4JSONData(serverURL,$scope.data,{"action":$scope.data.action})  ;
						promise.then(function(retData){
							if(retData.flag==true||retData.flag=='true'){
								$.growl.notice({ message: "保存成功，即将返回查询页面!" });
					  			setTimeout(function() {
									window.location.href= $scope.data.contextPath+'/mileage/toMileageExchangeUI' ;
								}, 2000);
							}else{
								$.growl.error({ message: "保存数据出错!" });
							}
						},function(err){
							//console.info(JSON.stringify(err)) ;
							//growl.addErrorMessage("保存数据出错!");
							$.growl.error({ message: "保存数据出错!" });
						}) ;
					});
				}
		}
		
		//需求变更，屏蔽这两种行李服务,{"name":"逾重行李服务","value":"C"},{"name":"预付费行李服务","value":"P"}
		$scope.selectList = {
				"serviceTypeList":[
				    {"name":"运价相关服务","value":"F"},{"name":"商品相关服务","value":"M"},
				    {"name":"规则相关服务","value":"R"},{"name":"客票相关服务","value":"T"}
				],
				"geoLocTypeList":[//区域集合
		            {"name":"请选择","value":""},
    				{"name":"大区","value":"A"},{"name":"城市","value":"C"},
    				{"name":"国家","value":"N"},{"name":"机场","value":"P"},
    				{"name":"州","value":"S"},{"name":"区域","value":"Z"}
		        ]
		
		} ;
		$scope.backPage = function(){
			 window.location.href= $scope.data.contextPath+'/mileage/toMileageExchangeUI' ;
		}
		
	}]) ;
	
}) ;