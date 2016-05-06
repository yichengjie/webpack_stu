define(function (require, exports, module) {
	var controllers = require('./controllers') ;
	var jsonDate = require('../data/editJsonData') ;
	var EditUtil = require('../util/S7EditUtil') ;
	var commonUtil = require('../util/commonUtil') ;
	var util = require('../../util') ;
	var ModalHelper = require('../../lib/modal.helper') ;
	
	
	function cleanTipInfo() {
		$("#abortTipInfo").html("") ;
	} ;
	
	function addErrorTip(errMsg){
		$("#abortTipInfo").append("<li><span class ='marginRight15'></span><span class =\"modal-errorTip\">"+errMsg+"</span></li>") ;
	} ;
	
	function addSuccessTip(sucMsg){
		$("#abortTipInfo").append("<li><span class ='marginRight15'></span><span class =\"modal-successTip\">"+sucMsg+"</span></li>") ;
	} ;
	
	
	
	//最外层controller
	controllers.controller('EditController',['$scope','FormData','HttpOperService','TbShowHideServcie','FormEditStatusServcie','FormStatusService','CustomeEditTbStatusServcie','$timeout',function($scope,FormData,HttpOperService,TbShowHideServcie,FormEditStatusServcie,FormStatusService,CustomeEditTbStatusServcie,$timeout){
		$scope.contextPath = FormData.contextPath ;
		//保留一份原始数据，方便数据初始化时使用
		$scope.orgData = angular.copy(FormData) ;
		//页面上的form数据
		$scope.data = FormData ;
		//页面上所有表格的显示或隐藏的的状态数据
		$scope.tableStatus = TbShowHideServcie ;//TableStatusServcie
		//表格复用的自定义是否显示
		$scope.customeEditTbStatus = CustomeEditTbStatusServcie ;
		//对表单注册校验
		var validator = $("#s7_form").validate({meta : ""});
		window.validator = validator ;
		
		//页面上所有控件的状态数据
		$scope.editStatus = FormEditStatusServcie ;
		$scope.showStatus = FormStatusService ;
		var s7Id = $("#s7Id").val() ;
		$scope.data.id = s7Id ;
		//日期问题
		var currDate = new Date();
		var curMonthStr = commonUtil.getFullDayOrMonthStr(currDate.getMonth()+1)  ;
		var curDateStr = commonUtil.getFullDayOrMonthStr(currDate.getDate()) ;
		var nextDateStr= commonUtil.getFullDayOrMonthStr(currDate.getDate() +1) ;
		//当前日期
		$scope.currentDateStr = currDate.getFullYear() +'-'+curMonthStr+ '-'+curDateStr;
		//下一天日期
		$scope.nextDateStr = currDate.getFullYear() +'-'+curMonthStr+ '-'+nextDateStr ;
		//所有的表格定义信息都在这里
		$scope.tableData = jsonDate.tableData ;
		//-------------区域对应的表格显示隐藏开始--------//
		//第一次进入页面时需要加载的数据
		//console.info('准备初始化页面数据..........') ;
		var url = '';
		var promise = null;
		if(FormData.action=="add"){//1.新增
			url = $scope.contextPath+'/initPage4Add';
			promise = HttpOperService.getDataByUrl(url) ;
			EditUtil.initData.dealResultData4Add(promise,$scope) ;
		}else if (FormData.action=="update"){
			url = $scope.contextPath+'/initPage4Upate?s7Id='+$scope.data.id;
			promise = HttpOperService.getDataByUrl(url) ;
			EditUtil.initData.dealResult4Update(promise,$scope) ;
		}else if (FormData.action=="copy"){
			url = $scope.contextPath+'/initPage4Copy?s7Id='+$scope.data.id;
			promise = HttpOperService.getDataByUrl(url) ;
			//EditUtil.initData.dealResult4Update(promise,$scope) ;
			EditUtil.initData.dealResult4Copy(promise,$scope) ;
		}
		//console.info('页面部分数据其他处理.......') ;
		
		
		
		$scope.submitTbTSKCustomeEdit = function(){
			var tipDivId = "tskCustomeTipInfo" ;
			var modalHelper = new ModalHelper(tipDivId) ;
			//tbTSKCustomeEdit_type//tbTSKCustomeEdit_index//tbTSKCustomeEdit_value
			var tbTSKCustomeEdit_type = $("#tbTSKCustomeEdit_type").val() ;
			var tbTSKCustomeEdit_index = $("#tbTSKCustomeEdit_index").val() ;
			var tbTSKCustomeEdit_value = $("#tbTSKCustomeEdit_value").val() ;
			var maxLength = $("#tbTSKCustomeEdit_value").attr("maxlength") ;
			var len = util.getByteNumOfStr(tbTSKCustomeEdit_value) ;
			modalHelper.cleanTipInfo() ;
			if(len>maxLength){
				modalHelper.addErrorTip('最多输入'+maxLength+'个字节!') ;
				return ;
			}else{
				$scope.data.listTsk202VO[tbTSKCustomeEdit_index*1][tbTSKCustomeEdit_type] = tbTSKCustomeEdit_value ;
				$('#tbTSK202Modal').modal('hide') ;
			}
		}
		
		
    }]) ;

}) ;
