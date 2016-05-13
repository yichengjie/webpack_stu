define(function(require, exports, module) {
	var app = angular.module("app.controller",[]) ;
	var FormDataUtil = require("../util/FormDataUtil") ;
	var _ = require('underscore') ;
	
	function changeInputStatus4Submit(data,myForm){
        var keys1 = _.keys(data) ;
        var keys2 = _.keys(myForm) ;
        _.each(keys2,function(item){
            if(_.contains(keys1,item)){
                myForm[item].$setDirty(true) ;
            }
        }) ;
    };
	app.controller('EditController', ['$scope','FormData','HttpOperService','growl',function($scope,FormData,HttpOperService,growl){
		$scope.headerTipStr = "新建数据源配置" ;
		$scope.data = FormData ;
		var id =  $.trim($("#id").val()) ;
		var action = $.trim($("#action").val()) ;
		var carrCode = $.trim($("#carrCode").val()) ;
		var contextPath = $.trim($("#contextPath").val()) ;
		//这个字段是判断当前登陆用户的信息//属于航空公司或则航信用户
		FormData.id = id ;
		FormData.action = action ;
		FormData.carrCode = carrCode ;
		FormData.contextPath = contextPath ;
		//前面几个一般表格的显示隐藏
		$scope.tbFlagData = {
			"publishObject": {"flag": false,"title": "填写表格"}
		} ;
		if(action=='add'){
			$scope.headerTipStr = "新建数据源配置" ;
			initPage4Add() ;
		}else if (action=='update'){
			$scope.headerTipStr = "更新数据源配置" ;
			initPage4Update() ;
		}
		
		 //注册jquery validate框架
        //对表单注册校验
        var validator = $("#myForm").validate({meta:""});
		//init add page
		function initPage4Add(){
			initListData($scope.data,$scope.tbFlagData) ;
		}
		//init update page
		function initPage4Update(){
			var id = $scope.data.id ;
			var url = $scope.data.contextPath +"/abr/findAbrDataSourceCfgById?id="+id ; 
			var promise = HttpOperService.getDataByUrl(url) ;
			promise.then(function(retData){
				if (retData.flag == 'true' ) {
					FormDataUtil.convertVo2FormData(retData.vo,$scope.data) ;
					initListData($scope.data,$scope.tbFlagData) ;
				} else {
					growl.addErrorMessage("获取数据出错！");
				}
			},function(err){
				//$.showTuiErrorDialog('获取数据出错！');
				growl.addErrorMessage("获取数据出错！");
			}) ;
		}
		
		$scope.backPage = function(){
			 window.location.href= $scope.data.contextPath+'/abr/toCfgAbrDatasource' ;
		}
		
		/******************这一部分是select提供数据开始*************************************/
		/*{"name":"运价相关","value":"F"},{"name":"客票相关","value":"T"},
		 * {"name":"商品相关","value":"M"},{"name":"规则相关","value":"R"}
		 */
		$scope.selectList = {
			"serviceTypeList":[
				{"name":"选择","value":"*"},{"name":"免费行李","value":"A"},
				{"name":"随携行李","value":"B"},{"name":"付费行李","value":"C"},
				{"name":"预付费行李","value":"P"},{"name":"禁运行李","value":"E"}		
			]
		} ;
		/******************这一部分是select提供数据结束*************************************/
		$scope.tbTitleList = {
			"pbObj":[{"title":"发布对象类型"},{"title":"部门代码"}]
		}
		$scope.saveFormData = function(){
				var action = $scope.data.action ;
				var tokenId = $("#tokenId").val() ;
				var url = $scope.data.contextPath+"/abr/saveFormData" ;
				var vo = FormDataUtil.convertFormData2Vo($scope.data) ;
				var ngFlag = $scope.myForm.$valid ;
				var jqFlag = validator.form() ;
				changeInputStatus4Submit($scope.data,$scope.myForm) ;
				console.info("ngFlag : " + ngFlag +"   , jqFlag : " +jqFlag ) ;
				if(ngFlag&&jqFlag){
					$.showTuiConfirmDialog('保存?', function() {
						  var promise= HttpOperService.postDate(url,vo,{"action":action,"tokenId":tokenId}) ;
						  promise.then(function(retData){
						  		if (retData.flag == 'true' ) {
						  			growl.addSuccessMessage("保存成功，即将返回查询页面!");
						  			setTimeout(function() {
											window.location.href= $scope.data.contextPath+'/abr/toCfgAbrDatasource' ;
									}, 2000);
								} else {
									growl.addErrorMessage("保存数据出错！");
								}
						  },
						  function(err){
						  	growl.addErrorMessage("保存数据出错！");
						  }) ;
					}) ;
				}
		}
		//初始化数据
		function initListData(dataSourceCfgVo, tbFlagData){
			//publish object
			initTbData(dataSourceCfgVo.publishObjectList, tbFlagData.publishObject);
		}
		function  initTbData (list,flagData){
			if(list){
				if(list.length>0){
					flagData.flag = true ;
					flagData.title = "收起表格" ;
				}
			}
		}
		
	}]) ;
}) ;