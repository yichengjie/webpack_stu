//define(function (require, exports, module) {
  var controllers = require('./controllers') ;
  import {dealData4NewServiceType,getShowChooseFuncStr,clearChoose3Info,initNewVersionServcieChoose} from '../busi/BasicInfoControllerBusi.js' ;
  //页面第一个部分/////////选择附加服务部分/////////////////////////////////////////
  //select级联controller
   controllers.controller('BasicInfoCtrl',['$scope','HttpOperService','FormData','DEFAULT_SERVICETYPE','FormEditStatusServcie',function($scope,HttpOperService,FormData,DEFAULT_SERVICETYPE,FormEditStatusServcie){
		//chooseInput的输入数据
		$scope.chooseInputData = {
			"choose1":"",
			"choose2":"",
			"choose3":""
		} ;
   		$scope.data = FormData ;
   		//显示在 ‘选择附加服务’输入框中的 文字描述
		$scope.showChooseFunc = function(){
			return getShowChooseFuncStr(FormData) ;
		};
		//当新旧版页面切换时
		$scope.chageVersionOper = function(flag){
			var action = FormData.action ;
			//只有新增页面才支持
			if(action==='add'){
				if($scope.newVersionFlag!=flag){
					$scope.newVersionFlag = flag ;
				}
			}
		};
		
		//初始化新版服务选择框(新版)
		//console.info('页面部分数据其他处理.......') ;
		var selectize = initNewVersionServcieChoose(function(id){
			if(id&&id.length>0){
				var curItem = $scope.serviceChooseMap.get(id) ;
				var serviceGroup = curItem.attributesGroup ;
				var subGroup = curItem.attributesSubgroup ;
				var subCode = curItem.serviceSubCode ;
				var serviceGroupDescription = curItem.serviceGroupDescription ;
				var subGroupDescription = curItem.subGroupDescription ;
				var commercialName = curItem.commercialName ;
				var carrCode = curItem.carrCode ;
				var serviceType = curItem.serviceType ;
				//'['+serviceSubCode+']'+commercialName ;
				var data = $scope.data ;
				var orgData = $scope.orgData ;
				var chooseItem =  curItem;
				var rootScope = $scope.$parent ;
				var operOption = {data,orgData,chooseItem,FormEditStatusServcie,rootScope} ;
				$scope.$apply(function(){
					//当改版serviceType后
					//1.步骤
					FormData.sel1.value =serviceGroup; //serviceGroup
					FormData.sel1.showStr = serviceGroupDescription ;
					FormData.sel2.value = subGroup ; //subGroup
					FormData.sel2.showStr = subGroupDescription ;
					FormData.sel3.value = subCode ;
					FormData.sel3.showStr = "["+subCode+"]"+commercialName; 
					//2.步骤
					dealData4NewServiceType(operOption) ;
					//第四步:查询数据为后面显示准备
				}) ;
				var textTableNo163 = curItem.subCodeTableNo163||'' ;
				var oldTextTableNo163 = FormData.sel3.textTableNo163 ||'';
				//if(oldTextTableNo163!=textTableNo163){//如果上次和这次不相同才需要重新渲染第四列
					textTableNo163 = textTableNo163*1 ;
					var url = FormData.contextPath+"/s7/query4ClickService.action" ;
					var queryParam = {"subCodeTableNo163":textTableNo163+"",
									  "carrCode":carrCode,
									  "serviceType":serviceType,
									  "serviceAndSubCode":subCode} ;
					var promise =HttpOperService.postDate(url,queryParam,{}) ;
					promise.then(function(retData){
						$scope.lastGroupList2 = retData.tb163List ;
					  	$scope.data.sel4 = retData.tb163List;
					  	$scope.data.sequenceNumber = retData.maxSequenceNumber*1+10 ;
					},function(err){
						alert("查询出错!") ;
					}) ;
				//}
			}else{//当删除的时候，也会触发选中事件
				$scope.$apply(function(){
					FormData.sel1.value = ""; //serviceGroup
					FormData.sel1.showStr = "" ;
					FormData.sel2.value = "" ; //subGroup
					FormData.sel2.showStr = "" ;
					FormData.sel3.value = "" ;
					FormData.sel3.showStr = ""; 
				}) ;
			}
		}) ;
		window.selectize = selectize ;
		
		//choose第一个框中li点击事件
		$scope.subGroupQuery = function(showStr,serviceGroup){
			var contextPath = $scope.contextPath ;
			FormData.sel1.showStr = showStr ;
			FormData.sel1.value = serviceGroup ;
			//把第二个选项框以前保留的信息清空
			FormData.sel2.showStr = "" ;
			FormData.sel2.value = "" ;
			//把第三个选项框以前保留的信息清空
			var initServiceType = DEFAULT_SERVICETYPE ;
			var lastGroupList = $scope.lastGroupList ;
			var lastGroupList2 = $scope.lastGroupList2 ;
			var clearOption = {FormData,lastGroupList,lastGroupList2,initServiceType} ;
			clearChoose3Info(clearOption) ;
			
			var url = contextPath+"/s5/queryS5SubGroupByGroup.action" ;
			var carrier = $scope.data.carrCode  ;
			var jqeryData = {} ;//post方式提交
			var jueryParam = {carrCode: carrier,serviceGroup:serviceGroup};//地址问号形式
			var promise =HttpOperService.postDate(url,jqeryData,jueryParam) ;
			promise.then(function(retData){
				$scope.subGroupList = retData ;
			},function(err){
				alert("查询出错!") ;
			}) ;
		};
		//第二个li点击事件
		$scope.s5Query = function(showStr,subGroup){
			var contextPath = $scope.contextPath ;
			FormData.sel2.showStr = showStr ;
			FormData.sel2.value = subGroup ;
			//把第三个选项框以前保留的信息清空
			var initServiceType = DEFAULT_SERVICETYPE ;
			var lastGroupList = $scope.lastGroupList ;
			var lastGroupList2 = $scope.lastGroupList2 ;
			var clearOption = {FormData,lastGroupList,lastGroupList2,initServiceType} ;
			clearChoose3Info(clearOption) ;
			var url = contextPath+"/s5/queryS5BySubGroup.action" ;
			var carrier = $scope.data.carrCode  ;
			var serviceGroup = FormData.sel1.value ;
			var jqeryData = {} ;//post方式提交
			var jueryParam = {carrier: carrier,serviceGroup:serviceGroup,subGroup:subGroup};//地址问号形式
			var promise =HttpOperService.postDate(url,jqeryData,jueryParam) ;
			promise.then(function(retData){
				$scope.lastGroupList = retData ;
			},function(err){
				alert("查询出错!") ;
			}) ;
		};

		//第三个li点击事件
		$scope.lastChooseClick = function(l){
			//l.attributesGroup与上面的serviceGroup一样
			//这个必须在dealData4newServcieType前面执行(下面sel3的赋值)
			//1.步骤
			var commercialName = l.commercialName ;
			var serviceSubCode = l.serviceSubCode ;
			$scope.data.sel3.showStr = '['+serviceSubCode+']'+commercialName ;
			$scope.data.sel3.value = serviceSubCode ;
			//2.步骤
			var data = $scope.data ;
			var orgData = $scope.orgData ;
			var chooseItem =  l;
			var rootScope = $scope.$parent ;
			var operOption = {data,orgData,chooseItem,FormEditStatusServcie,rootScope} ;
			dealData4NewServiceType(operOption) ;
			//填充basicInfo信息end
			//第四步:查询数据为后面显示准备
			var textTableNo163 = l.subCodeTableNo163||'' ;
			var oldTextTableNo163 = FormData.sel3.textTableNo163 ||'';
			
			if(oldTextTableNo163!=textTableNo163){//如果上次和这次不相同才需要重新渲染第四列
				textTableNo163 = textTableNo163*1 ;
				var url = FormData.contextPath+"/s7/query4ClickService.action" ;
				var queryParam = {"subCodeTableNo163":textTableNo163+"",
								  "carrCode":l.carrCode,
								  "serviceType":l.serviceType,
								  "serviceAndSubCode":l.serviceSubCode} ;
				var promise =HttpOperService.postDate(url,queryParam,{}) ;
				promise.then(function(retData){
					$scope.lastGroupList2 = retData.tb163List ;
				  	$scope.data.sel4 = retData.tb163List;
				  	$scope.data.sequenceNumber = retData.maxSequenceNumber*1+10 ;
				},function(err){
					alert("查询出错!") ;
				}) ;
			}
		};
   }]) ;
  
   // ng-show = "lastGroupList2.length>0"

//}) ;
