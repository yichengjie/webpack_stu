  var controllers = require('./controllers') ;
  var util = require('../util/S7FormDataUtil') ;
  var _ = require('underscore') ;

  //当提交的时候将页面上所有字段的$dirty全部置为true
  function changeInputStatus4Submit(data,myForm){
		var keys1 = _.keys(data) ;
		var keys2 = _.keys(myForm) ;
		_.each(keys2,function(item){
			if(_.contains(keys1,item)){
				 myForm[item].$setDirty(true) ;
			}
		}) ;
  } ;
	//保存表格数据到后台
  //headerController
  controllers.controller('HeaderCtrl',['$scope','FormData','HttpOperService','$log',function($scope,FormData,HttpOperService,$log){
	  $scope.contextPath = FormData.contextPath ;
	  $scope.data = FormData ;
	   //提交表单数据
	  $scope.submitForm = function(saveOrSaveAndPublish){
		   var action = $scope.data.action ;
			var sel3ShowStr =  $scope.data.sel3.showStr ;
			var flag = validator.form() ;
			var ngFlag = $scope.myForm.$valid ;
			//$log.info('flag : ' + flag) ;
			//$log.info('ngFlag : '  + ngFlag) ;
			if(action=='add'&&sel3ShowStr==''){
				$.showTuiErrorDialog('请选择服务到最后一级！');
			 }else{
				changeInputStatus4Submit($scope.data,$scope.myForm) ;
				if(flag&&ngFlag){
				   saveFormData(saveOrSaveAndPublish,$scope.data) ;
				}
			 }
	   }
		/**
		 * <pre>
		 * 	功能描述:保存表单数据
		 * </pre>
		 * @param {Object} operType  ['save','saveAndPublish']  点击‘保存’,‘保存并发布’
		 */
		  function saveFormData (operType,formData){
				var tokenId = $("#tokenId").val() ;
				var flag = false ;
				var s7 = util.convertFormDataToS7(formData) ;
				flag = util.validFormData(s7,formData) ;
				//flag = false;//本地测试禁止表单提交
				if(flag){//如果校验通过的话则提交表单数据到后台
					$.showTuiConfirmDialog('保存?', function() {
						var url = "" ;
						if(operType=='save'){
							if(formData.action == "add"||formData.action == "copy"){//新增数据的话
								url = formData.contextPath + "/addS7"
							}else if(formData.action=="update"){//更新数据的话
								url = formData.contextPath + "/updateS7" ;
							}
						}else if (operType=='saveAndPublish'){
							url = formData.contextPath + "/saveAndPublishS7" ;
						}
						var config = {"tokenId":tokenId} ;
						var promise = HttpOperService.postDate(url,s7,config) ;
						promise.then(function (data) {
							if (data.flag == 'true' ) {
								$.showTuiSuccessDialog('保存成功！', function() {
									$.showTuiWaitingDialog('即将返回查询界面!', 200, 60);
									window.location.href= formData.contextPath+'/oc/ocView' ;
								});
							} else {
								$.showTuiErrorDialog('保存数据出错！');
							}
						},function(error){
							$.showTuiErrorDialog('保存数据出错！');
						}) ;
					});
				}
		 }

  }])  ;
