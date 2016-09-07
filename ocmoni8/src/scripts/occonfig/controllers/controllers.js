var app = angular.module('app.controller',[]) ;
var _ = require('underscore_lib') ;
var util = require('util_lib') ;
var growlConfig = {info:{type: 'info',offset: {from: 'top', amount: 110}},
		   danger:{type: 'danger',offset: {from: 'top', amount: 110}},
		   success:{type: 'success',offset: {from: 'top', amount: 110}}};


app.controller('EditController',['$scope','FormData','HttpOperService',function($scope,FormData,HttpOperService){
	$scope.data = FormData ;
	var carrCode = $("#carrCode").val() ;
	var contextPath = $("#contextPath").val() ;
	FormData.carrCode = carrCode ;
	FormData.contextPath = contextPath ;
	$scope.serviceGroupList = [] ;
	//$scope.subGroupList = [];
	$scope.serviceDetailList = [];//当修改时需要改变checkFlag
	$scope.initServiceDetailList=[];//保存初始数据
	$scope.data.action = "";
	$scope.data.oldSubCode = ""; //更新时带过来的原来的subcode
	//$scope.myImage="";
    //$scope.myCroppedImage="";
    $scope.hrefTitle="自定义";
    $scope.showHideTableFlag=false;
	$scope.checkIsTrue = function(obj){
		if(obj!=null&&(obj==true||obj=='true')){
			return true;
		}
		return false;
	};
	
	/*$scope.changeGroupSelect = function(){
		//alert(item);
//		alert($scope.data.group.serviceGroupDescription)
		//alert($scope.serviceGroupListInfo[item])
		//data.groupDesc = item.serviceGroupDescription;
		angular.forEach($scope.serviceGroupListInfo,function(l){
			if(l.serviceGroup==$scope.data.group){
				$scope.data.groupDesc = l.serviceGroupDescription;
				alert(l.serviceGroupDescription);
			}
		}) ;
	}*/
	
	//$scope.groupTableShowStatus=;
//	$scope.subGroupTable = {"showStatus":"false"};
	var url = $scope.data.contextPath +"/occonfig/initConfigUI.action" ; 
	var promise = HttpOperService.post4JSONData(url,$scope.data,{"carrCode":carrCode})  ;
	promise.then(function(retData){
		
		//$scope.serviceGroupListInfo = retData.serviceGroupList;
		$scope.serviceGroupList = retData.serviceGroupList;
		//$scope.subGroupListInfo = retData.subGroupList;
		$scope.serviceDetailList = retData.serviceDetailList;
		$scope.initServiceDetailList = retData.serviceDetailList;
	},function(err){});
	
	
	$scope.serviceTypeList=[ {"name":"运价相关服务","value":"F"},{"name":"商品相关服务","value":"M"},
	     				    {"name":"规则相关服务","value":"R"},{"name":"客票相关服务","value":"T"},
	    				    {"name":"逾重行李服务","value":"C"},{"name":"预付费行李服务","value":"P"}];
	
	$scope.rficList = [ {"name":"航空运输","value":"A"},{"name":"地面交通/非航空服务","value":"B"},
     				    {"name":"行李","value":"C"},{"name":"财务保障","value":"D"},
    				    {"name":"机场服务","value":"E"},{"name":"商品","value":"F"},
    				    {"name":"机上服务","value":"G"},{"name":"其他","value":"I"}];
    
	$scope.subCodeOccurenceList = [{"value":"1"},{"value":"2"},{"value":"3"},{"value":"4"},{"value":"5"},
	                               {"value":"6"},{"value":"7"},{"value":"8"},{"value":"9"}];
	//choose第一个框中li点击事件
	$scope.subGroupQuery = function(showStr,serviceGroup){
		var contextPath = $scope.data.contextPath ;
		FormData.sel1.showStr = showStr ;
		//serviceGroup = serviceGroup.split(",#,")[0];
		FormData.sel1.value = serviceGroup ;
		//把第二个选项框以前保留的信息清空
		FormData.sel2.showStr = "" ;
		FormData.sel2.value = "" ;
		//把第三个选项框以前保留的信息清空
		FormData.sel3.showStr = "" ;
		FormData.sel3.value = "" ;
		FormData.sel3.serviceGroup = "" ;
		FormData.sel3.textTableNo163 = "" ;
		$scope.lastGroupList = [] ;
		$scope.lastGroupList2 = [] ;
		//清空formData信息
		//FormData.serviceAndSubCode = "" ;
		FormData.serviceType = "F" ;//DEFAULT_SERVICETYPE
		//FormData.noChargeNotAvailable = "" ;//设置为默认
		var url = contextPath+"/s5/queryS5ByGroup.action" ;
		var carrier = $scope.data.carrCode  ;
		var jqeryData = {} ;//post方式提交
		var jueryParam = {carrCode: carrier,serviceGroup:serviceGroup};//地址问号形式
		var promise =HttpOperService.post4JSONData(url,jqeryData,jueryParam) ;
		promise.then(function(retData){
			$scope.subGroupList = retData.subGroupList ;
			//$scope.lastGroupList = retData.s5List;
		},function(err){
			alert("查询出错!") ;
		}) ;
		//$scope.data.basicInfoVo.serviceGroup= "";
		//$scope.data.basicInfoVo.subGroup= "" ;
		//$scope.data.basicInfoVo.subCode= "" ;
		$scope.data.sel4 = [];
	};

	//第二个li点击事件
	$scope.s5Query = function(showStr,subGroup){
		var contextPath = $scope.data.contextPath ;
		FormData.sel2.showStr = showStr ;
		FormData.sel2.value = subGroup ;
		//清空第三个选项框
		FormData.sel3.showStr = "" ;
		FormData.sel3.value = "" ;
		FormData.sel3.serviceGroup = "" ;
		FormData.sel3.textTableNo163 = "" ;
		$scope.lastGroupList = [] ;
		FormData.serviceAndSubCode = "" ;
		FormData.serviceType = "F" ;//DEFAULT_SERVICETYPE
		$scope.lastGroupList2 = [] ;

		//FormData.noChargeNotAvailable = "" ;//设置为默认
		var url = contextPath+"/s5/queryS5BySubGroup.action" ;
		var carrier = $scope.data.carrCode  ;
		var serviceGroup = FormData.sel1.value ;
		var jqeryData = {} ;//post方式提交
		var jueryParam = {carrier: carrier,serviceGroup:serviceGroup,subGroup:subGroup};//地址问号形式
		var promise =HttpOperService.post4JSONData(url,jqeryData,jueryParam) ;
		promise.then(function(retData){
			$scope.lastGroupList = retData ;
		},function(err){
			alert("查询出错!") ;
		}) ;
		//$scope.data.basicInfoVo.serviceGroup= "" ;
		//$scope.data.basicInfoVo.subGroup= "" ;
		//$scope.data.basicInfoVo.subCode= "" ;
		$scope.data.sel4 = [];
	};

	//第三个li点击事件
	$scope.lastChooseClick = function(l){
		//l.attributesGroup与上面的serviceGroup一样
		var serviceGroup = l.attributesGroup ;	
		var serviceType = l.serviceType ;
		var pageNeedNewRunderFlag = true ;
		//下面的这段暂时注释掉，以后可能需要根据点击要判断当前页面是否需要重置数据
		//点击本次li前的数据
		//var oldServiceGroup = $scope.data.sel3.serviceGroup ;
		//var oldServiceType = FormData.serviceType ;
		/*if(oldServiceGroup==serviceGroup){//表示之前点击过第三个li并且一直保持在第三个li上面
			if(oldServiceType==serviceType){//表示serviceGroup和serviceType都没有变，则页面不需要重新渲染
				pageNeedNewRunderFlag = false;
			}
		}*/
		
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
			var promise =HttpOperService.post4JSONData(url,queryParam,{}) ;
			promise.then(function(retData){
				$scope.lastGroupList2 = retData.tb163List ;
			  	$scope.data.sel4 = retData.tb163List;
			  	//$scope.data.sequenceNumber = retData.maxSequenceNumber*1+10 ;
			},function(err){
				alert("查询出错!") ;
			}) ;
		}
	};
	
	//显示模态框
	$scope.showModal = function(){
		initData();
		$scope.data.action = "add";
		$('#subCodeModal').modal('show');
	};
	
	//保存
	$scope.submitPage = function(){
		var serverURL =contextPath+ "/occonfig/insertData.action" ;
		if(showServiceList()){
			$scope.data.serviceDetailList = $scope.serviceDetailList;
		}else{
			$scope.data.serviceDetailList = $scope.initServiceDetailList;
		}
		
		
		$.showTuiConfirmDialog('保存?', function() {
			var ngFlag = validate();
			console.info("ngFlag:"+ngFlag);
			if(ngFlag){
				var promise = HttpOperService.post4JSONData(serverURL,$scope.data);
				promise.then(function(retData){
					if(retData.flag==true||retData.flag=='true'){
						console.info("保存成功");
						$.bootstrapGrowl("保存成功，即将返回查询页面!",growlConfig.success) ;
						setTimeout(function() {
							$('#subCodeModal').modal('hide');
							window.location.href= contextPath+'/occonfig/toConfigUI.action' ;
						}, 1500);
					}else{
						console.info("保存出错");
						if(retData.errMsg!=undefined &&　retData.errMsg !=""){
							$.bootstrapGrowl(retData.errMsg,growlConfig.danger) ; 
						}else{
							$.bootstrapGrowl('保存出错',growlConfig.danger) ; 
						}
					}
				},function(err){
					$.bootstrapGrowl('网络异常',growlConfig.danger) ; 
					console.info("网络异常："+err);
				});
			}else{
				console.info("校验未通过");
				$.bootstrapGrowl('校验未通过，请检查填写信息',growlConfig.danger) ; 
			}
		});
	};
	
	//套餐服务详细列表
	$scope.showServiceDetail = function(){
		return showServiceList();
	};
	
	var showServiceList = function(){
		var selfGroupStr = $scope.data.selfGroupCode;
		var basicInfo = $scope.data.basicInfoBySubCode;
		var groupStr="";
		var subCode = $scope.data.subCode;
		var subCodeTableNo163 = $scope.data.subCodeTableNo163;
		if(basicInfo!=undefined){
			groupStr = basicInfo.serviceGroup;
		}
		if((groupStr!=undefined &&groupStr.match("^BD|^bd"))||(selfGroupStr!=undefined &&selfGroupStr.match("^BD|^bd"))
				||(subCodeTableNo163!=undefined && subCodeTableNo163!="" && subCodeTableNo163!="0" && subCode!=undefined
						&& subCode!="" &&subCode == $scope.data.oldSubCode)){
			return true;
		}
		return false;
	};
	//点击编辑图标动作
	$scope.editS5 = function(l){
		initData();
		$scope.data.records5Id = l.id;
		$scope.data.subCode = l.serviceSubCode;
		$scope.data.serviceType=l.serviceType;
		$scope.data.subCodeTableNo163 = l.subCodeTableNo163;
		$scope.data.carrCode = carrCode;
		
		$scope.data.basicInfoBySubCode.serviceGroupDescription = l.serviceGroupDescription;
		$scope.data.basicInfoBySubCode.subGroupDescription = l.subGroupDescription;
		$scope.data.basicInfoBySubCode.commercialName = l.commercialName;
		$scope.showDescFlag=true;
		$scope.data.oldSubCode = l.serviceSubCode;
		$scope.data.action = "update";
		var serverURL =contextPath+ "/occonfig/prepareUpdate.action" ;
		var promise = HttpOperService.post4JSONData(serverURL,$scope.data);
		promise.then(function(retData){
			if(retData.flag==true||retData.flag=='true'){
				if(retData.resultVo.serviceDetailList!=undefined && retData.resultVo.serviceDetailList!=null){
					$scope.serviceDetailList = retData.resultVo.serviceDetailList;
				}
				$('#subCodeModal').modal('show');
			}else{
				if(retData.errorMsg!=undefined && retData.errorMsg!=""){
					console.info(retData.errorMsg);
					$.bootstrapGrowl(retData.errorMsg,growlConfig.info) ; 
				}else{
					$.bootstrapGrowl("获取信息出错！",growlConfig.danger) ; 
					console.info("获取信息出错！");
				}
				
			}
		},function(err){
			$.bootstrapGrowl("网络异常！",growlConfig.danger) ; 
			console.info("网络异常："+err);
		});
	};
	//删除操作
	$scope.deleteS5= function(l){
		$.showTuiConfirmDialog('删除?', function() {
			var serverURL =contextPath+ "/occonfig/deleteConfig.action" ;
			var promise = HttpOperService.post4JSONData(serverURL,l);
			promise.then(function(retData){
				if(retData.flag==true||retData.flag=='true'){
					//console.info("删除成功");
					$.bootstrapGrowl("删除成功",growlConfig.success) ; 
					setTimeout(function() {
						window.location.href= contextPath+'/occonfig/toConfigUI.action' ;
					}, 1500);
				}else{
					//console.info("删除失败");
					if(retData.errorMsg!=undefined && ""!=retData.errorMsg){
						$.bootstrapGrowl(retData.errorMsg,growlConfig.danger) ; 
					}else{
						$.bootstrapGrowl("删除失败",growlConfig.danger) ; 
					}
					
				} 
			},function(err){
				console.info("网络异常："+err);
				$.bootstrapGrowl("网络异常",growlConfig.danger) ; 
			});
		});
	};
	
	//页面SUBCODE校验
	$scope.checkSubCode = function(){
		validateSubCode();
		var subCode = $scope.data.subCode;
		if(subCode!=undefined && subCode!=$scope.data.oldSubCode && subCode.length==3){
			var serverURL =contextPath+ "/occonfig/queryInfoBySubCode.action" ;
			var promise = HttpOperService.post4JSONData(serverURL,$scope.data);//,{"carrCode":carrCode}
			promise.then(function(retData){
				if(retData.flag==true||retData.flag=='true'){
					$scope.data.basicInfoBySubCode = retData.basicInfo;
					$scope.data.errMsgBySubCode="";
					$scope.showDescFlag=true;
				}else{
					$scope.data.errMsgBySubCode = retData.errMsg;
					$scope.showDescFlag=false;
					console.info(retData.errMsg);
				}
			}
			,function(err){
				$scope.showDescFlag=false;
				console.info("网络异常："+err);
			});
		}
	};
	//页面自定义SUBCODE校验
	$scope.checkSelfSubCode =  function(){
		validateSelfSubCode();
		
		var selfSubCode = $scope.data.selfSubCode;
		if(selfSubCode!=undefined && selfSubCode.length==3 && $scope.data.errMsgSelfSubCode==""){
			var serverURL =contextPath+"/occonfig/checkSubCodeExist.action";
			var param = {"carrCode":$scope.data.carrCode,"serviceType":$scope.data.serviceType,"selfSubCode":selfSubCode};
			var promise = HttpOperService.post4JSONData(serverURL,param) ;
			promise.then(function(retData){
	    		if(retData.flag=='true'){
	    				if(retData.existFlag!='true'){
	    					$scope.data.errMsgSelfSubCode = "SUBCODE已存在，请更改输入。";
						}else{
							$scope.data.errMsgSelfSubCode = "";
						}
	    		}else{
	    			$scope.data.errMsgSelfSubCode = "SUBCODE校验失败。";
	    		}
	    	}) ;
		}
	};
	//页面自定义GROUP校验
	$scope.checkSelfGroupCode = function(){
		validateSelfGroupCode();
	};
	//页面自定义GROUP描述检验
	$scope.checkSelfGroupDesc = function(){
		validateSelfGroupDesc();
	};
	//页面自定义SUBGROUP校验
	$scope.checkSelfSubGroupCode =function(){
		validateSelfSubGroupCode();
	};
	//页面自定义SUBGROUP描述校验
	$scope.checkSelfSubGroupDesc =function(){
		validateSelfSubGroupDesc();
	};
	
	//页面商业名称校验
	$scope.checkCommercialName =function(){
		validateCommercialName();
	};
	//页面RFIC校验
	$scope.checkRfic =function(){
		validateRfic();
	};
	
	//显示隐藏表格
	$scope.showHideTable = function(){
		var showTbBtnTip = "自定义" ;
		var hideTbBtnTip = "取消自定义" ;
		$scope.data.errMsgBySubCode="";
		$scope.showHideTableFlag = !$scope.showHideTableFlag;
		if($scope.showHideTableFlag){
			$scope.hrefTitle = hideTbBtnTip;
			$scope.showDescFlag = false;
			$scope.data.subCode="";
		}else{
			$scope.hrefTitle = showTbBtnTip; 
			$scope.data.selfSubCode="";
			$scope.data.selfGroupCode="";
			$scope.data.selfGroupDesc="";
			$scope.data.selfSubGroupCode="";
			$scope.data.selfSubGroupDesc="";
		}
		initErrMsg();
	};
	//服务类型改变事件
	$scope.serviceTypeChange =  function(){
		if(!$scope.showHideTableFlag){
			validateSubCode();
			var subCode = $scope.data.subCode;
			if(subCode!=undefined && subCode.length==3){
				var serverURL =contextPath+ "/occonfig/queryInfoBySubCode.action" ;
				var promise = HttpOperService.post4JSONData(serverURL,$scope.data);//,{"carrCode":carrCode}
				promise.then(function(retData){
					if(retData.flag==true||retData.flag=='true'){
						$scope.data.basicInfoBySubCode = retData.basicInfo;
						$scope.data.errMsgBySubCode="";
						$scope.showDescFlag=true;
					}else{
						$scope.data.errMsgBySubCode = retData.errMsg;
						$scope.showDescFlag=false;
						console.info(retData.errMsg);
					}
				}
				,function(err){
					$scope.showDescFlag=false;
					console.info("网络异常："+err);
				});
			}
		}
	};
	
	var validate = function(){
		
		if($scope.showHideTableFlag){
			validateSelfSubCode();
			validateSelfGroupCode();
			validateSelfGroupDesc();
			validateSelfSubGroupCode();
			validateCommercialName();
			validateRfic();
			if($scope.data.errMsgSelfSubCode=="" &&
			$scope.data.errMsgSelfGroupCode=="" &&
			$scope.data.errMsgSelfGroupDesc=="" &&
			$scope.data.errMsgSelfSubGroupCode=="" &&
			$scope.data.errMsgCommercialName=="" &&
			$scope.data.errMsgRfic==""){
				return true;
			}else{
				return false;
			}
		}else{
			validateSubCode();
			if($scope.data.errMsgBySubCode==undefined || $scope.data.errMsgBySubCode==""){
				return true;
			}else{
				return false;
			}
		}
	};
	var validateSubCode = function(){
		var subCode = $scope.data.subCode;
		var err = "";
		if(subCode!=undefined && subCode!=""){
			 if(!util.isThreecode2(subCode)){
				 err="请输入正确的SUBCODE。";
				 $scope.showDescFlag=false;
             }
		}else{
			err ="必填字段。";
			$scope.showDescFlag=false;
		}
		$scope.data.errMsgBySubCode = err;
	};
	var validateSelfSubCode = function(){
		var selfSubCode = $scope.data.selfSubCode;
		var errMsg = "";
		if(selfSubCode!=undefined && selfSubCode!=""){
			 if(!util.isThreecode2(selfSubCode)){
				 errMsg="请输入正确的SUBCODE。";
            }
		}else{
			errMsg="必填字段。";
		}
		
		$scope.data.errMsgSelfSubCode = errMsg;
	};
	var validateSelfGroupCode = function(){
		var selfGroupCode = $scope.data.selfGroupCode;
		var errMsg = "";
		if(selfGroupCode!=undefined && selfGroupCode!=""){
			 if(!util.islettersOrNumber(selfGroupCode)){
				 errMsg="请输入正确的GROUP。";
            }
		}else{
			errMsg="必填字段。";
		}
		$scope.data.errMsgSelfGroupCode = errMsg;
	};
	var validateSelfGroupDesc = function(){
		var selfGroupDesc = $scope.data.selfGroupDesc;
		var errMsg = "";
		if(selfGroupDesc==undefined || selfGroupDesc==""){
			errMsg="必填字段。";
		}else{
			if(!islettersOrNumberOrChar(selfGroupDesc)){
				 errMsg="请输入正确的描述。";
            }
		}
		$scope.data.errMsgSelfGroupDesc = errMsg;
	};
	var validateSelfSubGroupCode = function(){
		var selfSubGroupCode = $scope.data.selfSubGroupCode;
		var errMsg = "";
		if(selfSubGroupCode!=undefined && selfSubGroupCode!=""){
			 if(!util.islettersOrNumber(selfSubGroupCode)){
				 errMsg="请输入正确的SUBGROUP。";
            }
		}
		$scope.data.errMsgSelfSubGroupCode = errMsg;
	};
	var validateSelfSubGroupDesc =  function(){
		var selfSubGroupDesc = $scope.data.selfSubGroupDesc;
		var errMsg = "";
		if(selfSubGroupDesc!=undefined && selfSubGroupDesc!=""){
			 if(!islettersOrNumberOrChar(selfSubGroupDesc)){
				 errMsg="请输入正确的描述。";
             }
		}
		$scope.data.errMsgSelfSubGroupDesc = errMsg;
	};
	
	var validateCommercialName = function(){
		var commercialName = $scope.data.commercialName;
		var errMsg = "";
		if(commercialName!=undefined && commercialName!=""){
			 if(!islettersOrNumberOrChar(commercialName)){
				 errMsg="请输入正确的CommercialName。";
            }
		}
		$scope.data.errMsgCommercialName = errMsg;
	};
	var validateRfic = function(){
		var rfic = $scope.data.rfic;
		var errMsg = "";
		if(rfic==undefined || rfic==""){
			errMsg="请选择RFIC。";
		}
		$scope.data.errMsgRfic = errMsg;
	};
	var initErrMsg = function(){
		$scope.data.errMsgBySubCode="";
		$scope.data.errMsgSelfSubCode="";
		$scope.data.errMsgSelfGroupCode="";
		$scope.data.errMsgSelfGroupDesc="";
		$scope.data.errMsgSelfSubGroupCode="";
		$scope.data.errMsgCommercialName="";
		$scope.data.errMsgRfic="";
	};
	var initData = function(){
		$scope.serviceDetailList = $scope.initServiceDetailList;
		$scope.data.action="";
		$scope.data.records5Id="";
		$scope.data.subCode="";
		$scope.showHideTableFlag=false;
		$scope.showDescFlag=false;
		$scope.hrefTitle="自定义";
		$scope.data.selfSubCode="";
		$scope.data.selfGroupCode="";
		$scope.data.selfGroupDesc="";
		$scope.data.selfSubGroupCode="";
		$scope.data.selfSubGroupDesc="";
		$scope.data.commercialName="";
		$scope.data.serviceType="F";
		$scope.data.rfic="";
		$scope.data.subCodeTableNo163="";
		$scope.data.errMsgBySubCode="";
		$scope.data.basicInfoBySubCode="";
		$scope.data.oldSubCode="";
		$scope.data.basicInfoBySubCode = [];
		initErrMsg();
	};
	var islettersOrNumberOrChar = function(value){
		return /^[\w\s,\.;:]{0,}$/i.test(value);
	} ;
}]) ;