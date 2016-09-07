//define(function (require, exports, module) {
	var validateHelper = require('./S7ValidateHelper') ;
	var S7FormDataUtil = require('./S7FormDataUtil') ;
	var jsonDate = require('../data/editJsonData') ;
	var jsonDataHelper = require('../data/jsonDataHelper') ;
	var _  = require('underscore_lib') ;
	var util = require("util_lib") ;
	import {convertChooseList2ChooseOptions}  from '../busi/BasicInfoControllerBusi.js' ;
	
	/**
	 * 处理表单特殊数据
	 * @param {Object} formData
	 */
	var initOtherData = function (formData){
		//处理旅行起始日期
		if(formData.firstTravelYear!=''&&formData.firstTravelMonth!=''&&formData.firstTravelDay!=''){
			formData.travelStartDate = formData.firstTravelYear+'-' +formData.firstTravelMonth +'-' +formData.firstTravelDay ;
		}
		//处理旅行结束日期
		if(formData.lastTravelYear!=''&&formData.lastTravelMonth!=''&&formData.lastTravelDay!=''){
			formData.travelEndDate = formData.lastTravelYear+'-' +formData.lastTravelMonth +'-' +formData.lastTravelDay ;
		}
		//星期
		var dayofWake = formData.dayOfWeek ;
		var len = dayofWake.length ;
		for(var i = 0 ; i < len ; i++){
			 var s = dayofWake.charAt(i);
			 var tmpStr = 'w'+s ;
			 formData.dayOfWeekShow[tmpStr] = true ;//选中checkbox
		}
		//处理页面上的复用字表号的placeholder显示字符串
		//
//		$(":input[name=reuseList172VO]").attr("placeholder",formData['accountCodeTableNo172']) ;
//		$(":input[name=reuseList173TicketVO]").attr("placeholder",formData['ticketDesignatorTableNo173']) ;
//		$(":input[name=reuseList183VO]").attr("placeholder",formData['securityTableNo183']) ;
//		$(":input[name=reuseList198VO]").attr("placeholder",formData['rbdTableNo198']) ;
//		$(":input[name=reuseList198UpgradeVO]").attr("placeholder",formData['upgradeToRbdTableNo198']) ;
//		$(":input[name=reuseList171VO]").attr("placeholder",formData['cxrResFareTableNo171']) ;
//		$(":input[name=reuseList173TktVO]").attr("placeholder",formData['tktDesignatorTableNo173']) ;
//		$(":input[name=reuseList186VO]").attr("placeholder",formData['carrierFlightTableNo186']) ;
//		$(":input[name=reuseList170VO]").attr("placeholder",formData['serviceFeeCurTableNo170']) ;
//		$(":input[name=reuseList196VO]").attr("placeholder",formData['textTableNo196']) ;
//		$(":input[name=reuseList165VO]").attr("placeholder",formData['equipmentTypeTableNo165']) ;
//		$(":input[name=reuseList178Loc1]").attr("placeholder",formData['list178Loc1Id']) ;
//		$(":input[name=reuseList178Loc2]").attr("placeholder",formData['list178Loc2Id']) ;
//		$(":input[name=reuseList178Loc3]").attr("placeholder",formData['list178Loc3Id']) ;
//		//201暂时不支持$(":input[name=reuseList201VO]").attr("placeholder",formData['list201VO']) ;
//		$(":input[name=reuseListTsk202VO]").attr("placeholder",formData['flightPassTableTsk202']) ;
		
	};
	
	var initAutoCompletePlaceholder = function(editScope){
		var formData = editScope.data ;
		var nameList = [{"key":"placeholderList172VO","value":"accountCodeTableNo172"},
        {"key":"placeholderList173TicketVO","value":"ticketDesignatorTableNo173"},
        {"key":"placeholderList183VO","value":"securityTableNo183"},
        {"key":"placeholderList198VO","value":"rbdTableNo198"},
        {"key":"placeholderList198UpgradeVO","value":"upgradeToRbdTableNo198"},
        {"key":"placeholderList171VO","value":"cxrResFareTableNo171"},
        {"key":"placeholderList173TktVO","value":"tktDesignatorTableNo173"},
        {"key":"placeholderList186VO","value":"carrierFlightTableNo186"},
        {"key":"placeholderList170VO","value":"serviceFeeCurTableNo170"},
        {"key":"placeholderList196VO","value":"textTableNo196"},
        {"key":"placeholderList165VO","value":"equipmentTypeTableNo165"},
        {"key":"placeholderList178Loc1","value":"list178Loc1Id"},
        {"key":"placeholderList178Loc2","value":"list178Loc2Id"},
        {"key":"placeholderList178Loc3","value":"list178Loc3Id"},
        {"key":"placeholderListTsk202VO","value":"flightPassTableTsk202"}] ;
		//201暂时不支持$(":input[name=reuseList201VO]").attr("placeholder",formData['list201VO']) ;
		for(var i = 0 ; i <nameList.length; i ++ ){
			var key = nameList[i]['key'] ;
			var value = nameList[i]['value'] ;
			//console.info('['+key+']--['+value+'] --['+formData[value]+']') ;
			editScope[key] = formData[value] ;
		}
	};
	
	/**
	 * @功能描述:处理表格被引用次数数据
	 * @param referenceMap 被引用的次数map数据
	 * @param editStatus 页面全局的编辑属性
	 * @param customeEditTbStatus 自定义表格显示状态
	 */
	var initCustomeEditTbData = function(editStatus,customeEditTbStatus,formData){
		var referenceMap = formData['subTbReferenceCountMap'] ;
		var keys = _.keys(referenceMap);
		_.each(keys,function(key){
			var tmp = referenceMap[key] || '0';
			var count = tmp*1 ;
			if(count>1){
				editStatus[key] = false;
				customeEditTbStatus[key] = true ;
			}
		}) ;
	};


	//这是一个私有的辅助方法
	var initTbData = function (list,flagData,tbname){
		if(list.length>0){
			flagData[tbname] = true ;
		}else{
			flagData[tbname] = false ;
		}
	};

	var initListData = function (s7VO,flagData){
		if(s7VO.list170VO.length>0){//170表格
			initTbData(s7VO.list170VO,flagData ,'list170VO') ;
		}
		if(s7VO.list201VO.length>0){//201表格
			initTbData(s7VO.list201VO,flagData,'list170VO') ;//----11
		}
		//198
		initTbData(s7VO.list198VO,flagData,'list198VO') ;//----9
		//198_2
		initTbData(s7VO.list198UpgradeVO,flagData,'list198UpgradeVO') ;//----10
		//list183VO
		initTbData(s7VO.list183VO,flagData,'list183VO') ;  //-----1
		//list186VO
		initTbData(s7VO.list186VO,flagData,'list186VO') ; //-----7
		//geo1 //list178Loc1
		initTbData(s7VO.list178Loc1,flagData,'list178Loc1') ;//--12
		//geo2 //list178Loc2
		initTbData(s7VO.list178Loc2,flagData,'list178Loc2') ;//---13
		//geo3 //list178Loc3
		initTbData(s7VO.list178Loc3,flagData ,'list178Loc3') ;//----14
		//196//备注例外行李
		initTbData(s7VO.list196VO,flagData ,'list196VO') ; //----8
		//165机型
		initTbData(s7VO.list165VO,flagData,'list165VO') ;//------6
		//171
		initTbData(s7VO.list171VO,flagData,'list171VO') ; //-----2
		initTbData(s7VO.list172VO,flagData,'list172VO') ; //-----3
		initTbData(s7VO.list173TicketVO,flagData,'list173TicketVO') ;//------4
		initTbData(s7VO.list173TktVO,flagData,'list173TktVO') ;//-----5
		
		//增加tsk202子表
		initTbData(s7VO.listTsk202VO,flagData,'listTsk202VO') ;//-----5
		
		
	};

	/**
	 * 这个方法只能为更新数据时，页面初始化时调用，相当于将页面上的，联动控件触发一下联动检查
	 */
	var init4Validate = function(editScope,data,globalEditStatus){/**这里需要重置数据的原因是因为有些value会影响到别的控件的显示*/
		var statusDes = data.statusDes ;
		//当状态为3的时候，页面不可编辑
		if(statusDes=='3'){
			for(var cname in globalEditStatus){
				globalEditStatus[cname] = false;
			}
		}
		validateHelper.changeServiceType(editScope,data,globalEditStatus) ;
		validateHelper.changeNoChargeNotAvailable(editScope,data,globalEditStatus) ;
		validateHelper.changeSpecifiedServiceFeeApp(editScope,data,globalEditStatus) ;
		//区域/部分/全程变化
		validateHelper.changeGeoSpecSectPortJourney(editScope,data,globalEditStatus) ;
		//折扣变化
		validateHelper.changeDiscount(editScope.$parent,data,globalEditStatus) ;
	};

	//填充页面上的select的初始数据//因为这些数据需要从数据库中查询
	var initScopeSelectList = function  (editScope,returnData) {
		editScope.serviceGroupList = returnData.serviceGroupList ;
		editScope.passengerTypeCodeList = returnData.passengerList ;
		editScope.frequentFlyerStatusList = returnData.ffpList ;
		var equipmentList = returnData.equipmentList ;
		//向返回来的数组中添加一个空的选择option
		equipmentList.splice(0,0,{"description":"选择","code":""}) ;
		editScope.equipmentList = equipmentList ;
		//提前购票时间单位
		editScope.advancedPurchasePeriodList = jsonDate.advancedPurchasePeriodList ;
		//延长类型
		//editScope.effectivePeriodTypeList = jsonDate.effectivePeriodTypeList ;
		editScope.effectivePeriodTypeList = {
				list:jsonDataHelper.getEffectivePeriodTypeList(editScope.data.basicInfoVo.subGroup) 
		};
		//延长时间单位
		editScope.effectivePeriodUnitList = jsonDate.effectivePeriodUnitList ;
		//免费/收费
		editScope.noChargeNotAvailableList = {
			list:jsonDataHelper.getNoChargeNotAvailableList(editScope.data.serviceType) 
		} ;
		//适用于
		editScope.specifiedServiceFeeAppList = {
			list:jsonDataHelper.getSpecifiedServiceFeeAppList(editScope.data.serviceType)
		} ;
		var subGroup = editScope.data.basicInfoVo.subGroup || '';
		//区域/部分/全程
		editScope.geoSpecSectPortJourneyList={
			list:jsonDataHelper.getgeoSpecSectPortJourneyList(editScope.data.serviceType,subGroup) 
		};
	};

	//处理edit页面上添加时的后数据处理
	var dealResultData4Add = function  (promise,editScope) {
		promise.then(function(returnData) {  // 调用承诺API获取数据 .resolve  
			if(returnData.flag==true||returnData.flag=='true'){
				//初始化数据、测试新增的时候才有意义，上线时此行代码没有意义
				initListData(editScope.data,editScope.tableStatus) ;
				//这段初始化数据方法要放在下面，因为内部从scope中取serviceType
				//不过在添加方法中无所谓了，修改方法中一定要放在下面
				initScopeSelectList(editScope, returnData) ;
				var serviceChooseList = returnData.serviceChooseList ;
				var options = convertChooseList2ChooseOptions(serviceChooseList) ;
				for(let option of options){
					selectize.addOption(option) ;
				}
				let serviceChooseMap = new Map();
				for(let item of serviceChooseList){
					serviceChooseMap.set(item.id,item) ;
				}
				editScope.serviceChooseMap = serviceChooseMap ;
			}else{
				 util.toastDanger('初始化页面数据出错!') ;
			}
	    }, function(error) {  // 处理错误 .reject  
	        //console.error('初始化页面数据出错!'+error) ;
	        util.toastDanger('初始化页面数据出错!') ;
	    }); 
	} ;
	//处理edit页面上更新时的后数据处理
	var dealResult4Update = function (promise,editScope) {
		promise.then(function(returnData) {  // 调用承诺API获取数据 .resolve  
			if(returnData.flag==true||returnData.flag=='true'){
				//s7record的信息
				S7FormDataUtil.convertS7ToFormData(returnData.s7VO,editScope.data) ;//将查询的s7数据填充到formData中
				initListData(returnData.s7VO,editScope.tableStatus) ;
				//其他特殊数据处理
				initOtherData(editScope.data) ;
				//list163
				editScope.data.sel4 = returnData.list163 ;
				//这段初始化数据方法要放在下面，因为内部从scope中取serviceType
				//但是必须要放在验证之前，因为验证的时候需要对特殊的字段进行处理
				//这段代码一定要放在init4Validate()前面
				initScopeSelectList(editScope, returnData) ;
				//初始化校验页面数据
				init4Validate(editScope,editScope.data,editScope.editStatus) ;
				//处理表格被引用次数数据
				initCustomeEditTbData(editScope.editStatus,editScope.customeEditTbStatus,editScope.data) ;
				//初始化placeholder
				initAutoCompletePlaceholder(editScope) ;
			}else{
				 util.toastDanger('初始化页面数据出错!') ;
			}
	    }, function(error) {  // 处理错误 .reject  
	        //console.error('初始化页面数据出错!' + error) ;
	        util.toastDanger('初始化页面数据出错!') ;
	    }); 

	};


	var dealResult4Copy = function  (promise,editScope) {
		promise.then(function(returnData) {  // 调用承诺API获取数据 .resolve  
			//s7record的信息
			S7FormDataUtil.convertS7ToFormData(returnData.s7VO,editScope.data) ;//将查询的s7数据填充到formData中
			initListData(returnData.s7VO,editScope.tableStatus) ;
			//其他特殊数据处理
			initOtherData(editScope.data) ;
			//list163
			editScope.data.sel4 = returnData.list163 ;
			//这段初始化数据方法要放在下面，因为内部从scope中取serviceType
			//这段代码一定要放在init4Validate()前面
			initScopeSelectList(editScope, returnData) ;
			//初始化校验页面数据
			init4Validate(editScope,editScope.data,editScope.editStatus) ;
			//前面部分与复制一样，但是要清空id
			editScope.data.id ="" ;
			//复制的时候自标号全部被置为空，所以不需要重置placeholder
			//initAutoCompletePlaceholder(editScope) ;
	    }, function(error) {  // 处理错误 .reject  
	        //console.error('初始化页面数据出错!' + error) ;
	        util.toastDanger('初始化页面数据出错!') ;
	    }); 
	} ;



	//这边是要返回的方法的集合处
	var EditUtil = {
		initData:{/*初始化*/		
			dealResultData4Add:dealResultData4Add,
			dealResult4Update:dealResult4Update,
			dealResult4Copy:dealResult4Copy
		}

	} ;	
	module.exports = EditUtil ;
	//return EditUtil ;
//}) ;