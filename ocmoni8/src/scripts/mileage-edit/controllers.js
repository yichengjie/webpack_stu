//define(function(require, exports, module) {
var app = angular.module('app.controller',[]) ;
var _ = require('underscore_lib') ;
var util = require('../lib/util') ;
var moment = require('moment_lib') ;

var dateTimeFormatStr = 'YYYY-MM-DD HH:mm' ;
var dateFormatStr = "YYYY-MM-DD" ; 
var growlConfig = {info:{type: 'info',offset: {from: 'top', amount: 110}},
		   danger:{type: 'danger',offset: {from: 'top', amount: 110}},
		   success:{type: 'success',offset: {from: 'top', amount: 110}}};

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

function resetFormData(targetObj,orgObj){
	var keys = _.keys(orgObj) ;
	_.each(keys,function(key){
		var val = orgObj[key] ;
		if(_.isArray(val)){
			targetObj[key] = angular.copy(val) ;
		}else{
			targetObj[key] = val ;
		}
	}) ;
}

/*从list中选中第一条作为默认选中的值*/
function _filterDefaultGroupCode(groupCodeList){
	var groupCode = "" ;
	if(groupCodeList && groupCodeList.length>0){
		groupCode = groupCodeList[0] ['value'] || "";
	}
	return groupCode ;
}

function dealResult4Submit(targetObj,orgObj,myForm,HttpOperService){
	var action = orgObj.action ;
	var contextPath = $("#contextPath").val() ;
	if(action=='add'){
		$.showTuiConfirmDialog2("保存成功,继续添加?",function(){
			resetFormData(targetObj,orgObj) ;
			myForm.$setPristine() ;
			var url = contextPath + "/mileage/getMaxSequenceNumberByCarrCode.action" ;
			//重新获取sequenceNum
			HttpOperService.get4JSONData(url).then(function(retData){
				 if (retData.flag == 'true') {
					 var sequenceNumber = retData.sequenceNumber ;
					 targetObj.sequenceNumber = sequenceNumber ;
				 }else{
					 $.bootstrapGrowl('获取序列号出错!',growlConfig.danger) ; 
				 }
			}) ;
		},function(){//返回查询页面
			window.location.href= contextPath+'/mileage/toMileageExchangeUI.action' ;
		});
	}else{//其他操作--比如修改
		$.bootstrapGrowl("保存成功，即将返回查询页面!",growlConfig.success) ;
		setTimeout(function() {
			window.location.href= contextPath+'/mileage/toMileageExchangeUI.action' ;
		}, 1500);
	}
}


app.controller('EditController',['$scope','FormData','HttpOperService',function($scope,FormData,HttpOperService){
	$scope.data = FormData ;
	 //当前日期
    var currentDateTimeStr = moment().add('hour',1).format("YYYY-MM-DD HH") +":00" ;
    var currentDateStr = moment().format(dateFormatStr) ;
    $scope.currentDateStr = currentDateStr ;
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
	//这一步复制数据一定要放在基本数据初始化完毕以后，否则后面得基本数据无法使用
	$scope.orgData = angular.copy(FormData) ;
	$scope.orgData.firstMaintenanceDate = currentDateTimeStr;
	$scope.disabledEditFlag = false;
	//常旅客等级，从数据库配置中读取
    $scope.frequentFlyerStatusList = [] ;
    //服务所在组，从数据库配置中读取
    $scope.groupCodeList = [];
   
    
	function initPage4Add(){
		 $scope.data.firstMaintenanceDate = currentDateTimeStr;
		 $scope.data.lastMaintenanceDate = "";
		 //console.info('初始化新增页面数据') ;
		// var carrCode = $scope.data.carrCode;
		 var url = $scope.data.contextPath +"/mileage/initFormData.action" ; 
		 HttpOperService.get4JSONData(url).then(function(retData){
			 if (retData.flag == 'true' ||retData.flag==true) {
					$scope.data.sequenceNumber = retData.sequenceNumber;
					$scope.frequentFlyerStatusList = retData.frequentFlyerStatusList ;
					//retData.groupCodeList.splice(0, 0, {name:"选择",value:""});  
					$scope.groupCodeList = retData.groupCodeList;
					/*if(retData.frequentFlyerStatusList&&retData.frequentFlyerStatusList.length>0){
						$scope.data.frequentFlyerStatus = retData.frequentFlyerStatusList[0] ['value'];
					}*/
					//var defaultGroupCode = _filterDefaultGroupCode(retData.groupCodeList) ;
					//$scope.data.groupCode = defaultGroupCode ;
					//原始数据也要同步更新
					//$scope.orgData.groupCode = defaultGroupCode ;
				} else {
					//growl.addErrorMessage("初始化页面出错!");
					//$.growl.error({ message: "初始化页面出错!" });
					$.bootstrapGrowl("初始化页面出错!",growlConfig.danger) ;
				}
			}
		 );
	}
	
	function initPage4Update(){
		//console.info('初始化修改页面数据') ;
		var url = $scope.data.contextPath +"/mileage/findMileageExchangeById.action?id="+id ;
		 HttpOperService.get4JSONData(url).then(function(retData){
			 if (retData.flag == 'true' ||retData.flag==true) {
				 $scope.frequentFlyerStatusList = retData.frequentFlyerStatusList ;
				 $scope.groupCodeList = retData.groupCodeList;
				 convertVo2FormData(retData.vo,$scope.data);
				 //判断是否可以编辑页面
				 var disabledEditFlag = util.checkMileageStatusIsDisabled($scope.data.status) ;
				 $scope.disabledEditFlag = disabledEditFlag ;
			 }else{
				$.bootstrapGrowl("初始化页面出错!",growlConfig.danger) ;
			 }
		 },function(err){
			$.bootstrapGrowl("初始化页面出错!",growlConfig.danger) ;
		 });
	}
	
	$scope.submitPage = function(){
		var serverURL =contextPath+ "/mileage/saveMileageExchangeData.action" ;  
		var ngFlag = $scope.myForm.$valid ;
		changeInputStatus4Submit($scope.data,$scope.myForm) ;
		if(ngFlag){
			$.showTuiConfirmDialog('保存?', function() {
				util.showLoading() ;
				var promise = HttpOperService.post4JSONData(serverURL,$scope.data,{"action":$scope.data.action})  ;
				promise.then(function(retData){
					util.hideLoading() ;
					if(retData.flag==true||retData.flag=='true'){
						//保存数据成功后的业务逻辑处理//下一个任务使用下面的代码即可
						dealResult4Submit($scope.data,$scope.orgData,$scope.myForm,HttpOperService) ;
						/*$.bootstrapGrowl("保存成功，即将返回查询页面!",growlConfig.success) ;
			  			setTimeout(function() {
							window.location.href= $scope.data.contextPath+'/mileage/toMileageExchangeUI.action' ;
						}, 1500);*/
					}else{
						$.bootstrapGrowl("保存数据出错!",growlConfig.danger) ;
					}
				},function(err){
					util.hideLoading() ;
					$.bootstrapGrowl("保存数据出错!",growlConfig.danger) ;
				}) ;
			});
		}
	};
	
	//需求变更，屏蔽这两种行李类型,{"name":"逾重行李服务","value":"C"},{"name":"预付费行李服务","value":"P"}
	$scope.selectList = {
			"serviceTypeList":[
			    {"name":"选择","value":""},
			    {"name":"运价相关服务","value":"F"},{"name":"商品相关服务","value":"M"},
			    {"name":"规则相关服务","value":"R"},{"name":"客票相关服务","value":"T"},
			    {"name":"逾重行李服务","value":"C"},{"name":"预付费行李服务","value":"P"}
			],
			"geoLocTypeList":[//区域集合
	            {"name":"请选择","value":""},
				{"name":"大区","value":"A"},{"name":"城市","value":"C"},
				{"name":"国家","value":"N"},{"name":"机场","value":"P"},
				{"name":"州","value":"S"},{"name":"区域","value":"Z"}
	        ]
	
	} ;
	$scope.backPage = function(){
		 window.location.href= $scope.data.contextPath+'/mileage/toMileageExchangeUI.action' ;
	};
	
	$scope.changeGeoSpecLoc1Type = function(){
		$scope.data.geoSpecLoc1 = "" ;
	};
	
	$scope.changeGeoSpecLoc2Type = function(){
		$scope.data.geoSpecLoc2 = "" ;
	};
	
}]) ;
	
//}) ;