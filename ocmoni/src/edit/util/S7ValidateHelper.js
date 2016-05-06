define(function (require, exports, module) {
	var commonUtil = require('./commonUtil') ;
	var _ = require('underscore') ;
	var jsonDataHelper = require('../data/jsonDataHelper') ;
	
	//js文件内部私有的工具类
	var _privateInnerUtil = {} ;
	_privateInnerUtil.checkIsPageClickFlag = function(isChangeSelectFlag){
	   //是否是页面点击触发的flag
		var pageClickFlag = true ;
		var tmpFlagStr = isChangeSelectFlag +"" ;
		if(tmpFlagStr=='false'){
		   pageClickFlag = false;
		}
		return pageClickFlag;
	}

	//所有置为可能为’可编辑‘的状态时都要判断status是否为3
	var setEditableByStatus = function(globalEditStatus,name,statusDes){
		var flag = commonUtil.getEditFlagByStatus(statusDes) ;
		globalEditStatus[name] = flag;
	};


	var NOTICE_TYPE_SINGLE = "singleChangeByFlagNotice" ;
	var NOTICE_TYPE_SERVICETYPE = "serviceTypeChangeNotice" ;



	var sendNotice2ForceDirctive4ServiceType = function  (scope,needDigest) {
		scope.$broadcast(NOTICE_TYPE_SERVICETYPE,needDigest+"") ;//scope.$broadcast('serviceTypeChangeNotice') ;
	};

	var sendNoticeToForceDirctive4Single = function(scope,needDigest,noticeName,showFlag){
		scope.$broadcast(NOTICE_TYPE_SINGLE,noticeName,showFlag+"",needDigest+"") ;//适用于
	};

	var sendNoticeToForceDirctive4SingleArr = function(scope,needDigest,noticeNameFlagList){
		var len = noticeNameFlagList.length ;
		for(var i = 0 ; i< len ; i++){
			var obj = noticeNameFlagList[i] ;
			var noticeName = obj.name ;
			var showFlag = obj.flag ;
			scope.$broadcast(NOTICE_TYPE_SINGLE,noticeName,showFlag+"",needDigest+"") ;//适用于
		}
	};

	/**
	 * 功能描述:'或/和'控件 更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateSpecSevFeeAndOrIndicator = function (editScope,data,globalEditStatus) {
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var statusDes = data.statusDes;
		var serviceType = data.serviceType ;
		var noChargeNotAvailable = data.noChargeNotAvailable ;
		//全额或折扣(全额:1,折扣:0)
		var discountOrNot = data.discountOrNot ;
		var specifiedServiceFeeApp = data.specifiedServiceFeeApp ;//适用于
		
		//start**********这部分是为了处理可能存在的历史数据问题进行的特殊置空处理
		if(_.contains(['H','C','P'],specifiedServiceFeeApp)){
			data.specSevFeeAndOrIndicator = '' ;
		}
		//end**********上面的这段特殊置空处理一定要注意(是为了update页面时，如果‘适用于’为‘H/C/P’则强制将‘里程费’和‘或/和’字段置为空)
		
		//serviceType 对'或/和'的影响
		//当服务类型为A、B、E时或/和一定为‘或’ 
		//当适用于为'H/C/P'时
		//2.判断是否可编辑
		if(_.contains(['A','B','E'], serviceType)||noChargeNotAvailable!=''||discountOrNot=='0'||_.contains(['H','C','P'],specifiedServiceFeeApp)){
			globalEditStatus.specSevFeeAndOrIndicator= false;
		}else{//当有机会设置为可编辑时继续判断//也就是说不为行李时才有机会可编辑
			setEditableByStatus(globalEditStatus,'specSevFeeAndOrIndicator',statusDes) ;
		}
	};
	/**
	 * 功能描述:更新‘收费组件’
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateNoChargeNotAvailable = function(editScope,data,globalEditStatus){
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var statusDes = data.statusDes;
		var serviceType = data.serviceType ;//serviceType
		//如果是免费则将下面的费用变为不可选择
		//下面的这点之所以没有设置为不可编辑的原因是因为，
		//2.判断是否可编辑
		if(serviceType=='C'||serviceType=='P'){//收费一定为收费且不可编辑
			globalEditStatus.noChargeNotAvailable= false;
		}else{//可编辑
			//还要判断当前status是否等于3
			setEditableByStatus(globalEditStatus,'noChargeNotAvailable',statusDes) ;
		}
		//免费/收费
		editScope.noChargeNotAvailableList.list= jsonDataHelper.getNoChargeNotAvailableList(serviceType) ;

	};
	//
	/**
	 * 功能描述:‘是否检查库存组件’更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateAvailability = function(editScope,data,globalEditStatus){
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var statusDes = data.statusDes;
		var serviceType = data.serviceType ;//serviceType
		//将是否检查库存设置为 ‘否’
		//2.判断是否可编辑
		if(_.contains(['A','B','E'],serviceType)){
			globalEditStatus.availability= false;
		}else{
			setEditableByStatus(globalEditStatus,'availability',statusDes) ;
		}
	} ;
	/**
	 * 功能描述:‘适用于组件’更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateSpecifiedServiceFeeApp = function(editScope,data,globalEditStatus){
		var serviceType = data.serviceType ;//serviceType
		//适用于
		editScope.specifiedServiceFeeAppList.list = jsonDataHelper.getSpecifiedServiceFeeAppList(serviceType) ;
	};

	/**
	 * 功能描述:‘行李适用范围组件’更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updatebaggageTravelApplication = function(editScope,data,globalEditStatus){
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var noChargeNotAvailable = data.noChargeNotAvailable ;
		var statusDes = data.statusDes ;
		//2.是否可编辑设置
		if(noChargeNotAvailable=='D'){
			globalEditStatus.baggageTravelApplication = false;
		}else{
			setEditableByStatus(globalEditStatus,'baggageTravelApplication',statusDes) ;
		}
	};
	
	/**
	 * 功能描述:‘是否可退组件’更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateIndicatorReissueRefund = function(editScope,data,globalEditStatus){
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var noChargeNotAvailable = data.noChargeNotAvailable ;
		var statusDes = data.statusDes ;
		//2.是否可编辑设置
		if(_.contains(['X','F','E'],noChargeNotAvailable)){//如果不可点击
			globalEditStatus.indicatorReissueRefund = false;
		}else{
			setEditableByStatus(globalEditStatus,'indicatorReissueRefund',statusDes) ;
		}
	};
	/**
	 * 功能描述:‘区域/部分/全程’更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateGeoSpecSectPortJourney = function  (editScope,data,globalEditStatus) {
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var serviceType = data.serviceType ;
		var statusDes = data.statusDes ;
		//2.判断是否可编辑
		if(_.contains(['B','E'], serviceType)){//不可编辑
			globalEditStatus.geoSpecSectPortJourney=false;
		}else{//如果没有被重置为不可编辑，则这里需要重置是否可编辑
			setEditableByStatus(globalEditStatus,'geoSpecSectPortJourney',statusDes) ;
		}
		editScope.geoSpecSectPortJourneyList.list = jsonDataHelper.getgeoSpecSectPortJourneyList(serviceType) ;
	};
	
	/**
	 * 功能描述:更新‘里程费’
	 */
	var updateSpecifiedServiceFeeMileage = function  (editScope,data,globalEditStatus) {
		var statusDes = data.statusDes ;
		//全额或折扣(全额:1,折扣:0)
		var discountOrNot = data.discountOrNot ;//是否打折
		var mileageExchangeIndicator = data.mileageExchangeIndicator ;//里程兑换标识
		var specifiedServiceFeeApp = data.specifiedServiceFeeApp ;//适用于
		//如果为折扣 则 里程费 必须为空,里程兑换标识为1或2时里程费字段必须为空//或则适用于为'H/C/P时'
		
		//start**********这部分是为了处理可能存在的历史数据问题进行的特殊置空处理
		if(_.contains(['H','C','P'],specifiedServiceFeeApp)){
			data.specifiedServiceFeeMileage = '' ;
		}
		//end**********上面的这段特殊置空处理一定要注意(是为了update页面时，如果‘适用于’为‘H/C/P’则强制将‘里程费’和‘或/和’字段置为空)
		
		if(discountOrNot=='0'||mileageExchangeIndicator=='1'||mileageExchangeIndicator=='2'||_.contains(['H','C','P'],specifiedServiceFeeApp)){
			globalEditStatus.specifiedServiceFeeMileage=false;
		}else{
			setEditableByStatus(globalEditStatus,'specifiedServiceFeeMileage',statusDes) ;
		}
	};
	
	/**
	 * 功能描述:更新‘里程兑换标识’
	 */
	var updateMileageExchangeIndicator = function (editScope,data,globalEditStatus){
		var statusDes = data.statusDes ;
		//是否收费
		var noChargeNotAvailable = data.noChargeNotAvailable ;
		//全额或折扣(全额:1,折扣:0)
		var discountOrNot = data.discountOrNot ;
		//‘或/和’
		var specSevFeeAndOrIndicator = data.specSevFeeAndOrIndicator ;
		//适用于字段为'H/C/P'
		var specifiedServiceFeeApp = data.specifiedServiceFeeApp ;
		//如果为折扣 则 里程费 必须为空
		if(noChargeNotAvailable!=''||discountOrNot=='0'||specSevFeeAndOrIndicator=='A'||_.contains(['H','C','P'],specifiedServiceFeeApp)){
			globalEditStatus.mileageExchangeIndicator=false;
		}else{
			setEditableByStatus(globalEditStatus,'mileageExchangeIndicator',statusDes) ;
		}
	};
	
	/**
	 * 功能描述:更新期限的延迟类型
	 */
	var updateEffectivePeriodType = function(editScope,data,globalEditStatus){
		var subGroup = data.basicInfoVo.subGroup ;//serviceType
		editScope.effectivePeriodTypeList.list = jsonDataHelper.getEffectivePeriodTypeList(subGroup) ;
	}
	
	
	
	


	module.exports = {
		changeServiceType:function(editScope,data,globalEditStatus){/*改变serviceType*/
			var statusDes = data.statusDes;
			var serviceType = data.serviceType || '' ;//serviceType
			//更新是否收费组件的信息
			updateNoChargeNotAvailable(editScope, data, globalEditStatus) ;
			//更新'或/和'组件的显隐及是否可编辑状态
			updateSpecSevFeeAndOrIndicator(editScope,data,globalEditStatus) ;
			//更新是否检查库存
			updateAvailability(editScope, data, globalEditStatus) ;
			//适用于
			updateSpecifiedServiceFeeApp(editScope, data, globalEditStatus) ;
			//区域/部分/全程
			updateGeoSpecSectPortJourney(editScope, data, globalEditStatus) ;
			//更新延迟期限类型的select
			updateEffectivePeriodType(editScope, data, globalEditStatus) ;
			
			//发送广播隐藏或显示组件
			//editScope.$broadcast('serviceTypeChangeNotice','false') ;//scope.$broadcast('serviceTypeChangeNotice') ;	
			sendNotice2ForceDirctive4ServiceType(editScope, 'false') ;
		},
		changeNoChargeNotAvailable:function(editScope,data,globalEditStatus){/**当改变是否收费的时候*/
			var serviceType = data.serviceType || '' ;
			var noChargeNotAvailable = data.noChargeNotAvailable || '';
			//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
			//console.info('serviceType : ' + serviceType) ;
			//服务类型是不是行李附加服务
			//var isBaggageFlag = commonUtil.checkBaggageServcie(serviceType) ;
			var in_flag = true ;
			if(noChargeNotAvailable==''){//如果不为收费这下面的置空
				in_flag = true ;
			}else{//免费的时候需要清空填写的信息
				in_flag = false;//隐藏 适用于，里程，金额
			}
			//console.info('是否为行李服务['+isBaggageFlag+']，收费类型为 ['+noChargeNotAvailable+']--X,E,F,G,H--时隐藏，判断结果flag : ' + in_flag) ;
			//var specifiedServiceFeeApp_specialFlag = true;
			//当收费类型为D/X/F/E时暂时不做区分是否为行李或则一般附加服务，这里全部都将适用于置为空
			//这个地方可能还存在一店暂时先把为d时适用于全部置空
			//specifiedServiceFeeApp_specialFlag = false ;//如果不为d，则进入其他的校验，按照其他的进行
			//当是否收费为D时  --行李适用范围必须为空
			//更新'行李适用范围'组件
			updatebaggageTravelApplication(editScope,data,globalEditStatus) ;
			//更新’或/和‘组件
			updateSpecSevFeeAndOrIndicator(editScope,data,globalEditStatus) ;
			//更新‘是否可退’组件
			updateIndicatorReissueRefund(editScope,data,globalEditStatus) ;
			var freeBaggageAllowancePiecesFlag = false ;//因为免费行李件件数控件只有在serviceType=='A'是才能显示
			//当是否收费为D/O时行李件数必修为空,行李类型必须为A,行李子代码必须为0DF
			if(serviceType=='A'){
				if(noChargeNotAvailable=='D'||noChargeNotAvailable=='O'){
					freeBaggageAllowancePiecesFlag = false ;
				}else{
					freeBaggageAllowancePiecesFlag = true ;
				}
			}
			//行李件数置为空//费用//里程//适用于//里程兑换标
			var noticeNameFlagList = [
				{"name":"freeBaggageAllowancePieces","flag":freeBaggageAllowancePiecesFlag},{"name":"list170VOAndlist201VO","flag":in_flag},
				{"name":"specifiedServiceFeeMileage","flag":in_flag},{"name":"specifiedServiceFeeApp","flag":in_flag}
			] ;
			sendNoticeToForceDirctive4SingleArr(editScope, "false", noticeNameFlagList) ;
			/*{"name":"specifiedServiceFeeApp","flag":in_flag}*/
			//这个地方是只有当适用于不为hcp，并且为收费时才应该显示
			/*var specifiedServiceFeeApp = data.specifiedServiceFeeApp ;
			var flag2 = true ;
			if(_.contains(['H','C','P'],specifiedServiceFeeApp)){
				flag2 = false;
			}else{
				if(noChargeNotAvailable==''){
					flag2 = true;
				}else{
					flag2 = false ;
				}
			}
			sendNoticeToForceDirctive4Single(editScope, "false", "mileageExchangeIndicator", flag2) ;*/
			updateMileageExchangeIndicator(editScope,data,globalEditStatus) ;
		},
		changeSpecifiedServiceFeeApp:function(editScope,data,globalEditStatus){/**当改变适用于的时候*/
			var serviceType = data.serviceType ||'';
			var noChargeNotAvailable = data.noChargeNotAvailable || '';
			var ssfa = data.specifiedServiceFeeApp || '' ;
			var in_flag = true ;
			//因为只有行李服务适用于才会有[H,C,P]，所以这里不需要判断serviceType是否为C，P
			if(ssfa=='H'||ssfa=='C'||ssfa=='P'){
				in_flag = false;
			}else{
				if(noChargeNotAvailable==''){//如果不为收费这下面的置空
					in_flag = true ;
				}else{//免费的时候需要清空填写的信息
					in_flag = false;//隐藏 适用于，里程，金额
				}
			}
			//console.info('serviceType : ['+serviceType+'] , ssfa : ['+ssfa+']  , in_flag : ['+in_flag+']' ) ;
			//$scope.FormEditStatusServcie.noChargeNotAvailable =in_flag;
			//170，201显示或隐藏
			//editScope.$broadcast('singleChangeByFlagNotice','list170VOAndlist201VO',in_flag+'','false') ;
			sendNoticeToForceDirctive4Single(editScope, "false", "list170VOAndlist201VO", in_flag) ;
			//当适用于改变的时候要更新 ‘里程积分兑换标识’状态
			updateMileageExchangeIndicator(editScope,data,globalEditStatus) ;
			//更新‘或/者’字段
			updateSpecSevFeeAndOrIndicator(editScope,data,globalEditStatus) ;
			//更新‘里程费’字段
			updateSpecifiedServiceFeeMileage(editScope,data,globalEditStatus) ;
			
		},
		changeGeoSpecSectPortJourney:function  (editScope,data,globalEditStatus) {
			/*var geoSpecSectPortJourney = data.geoSpecSectPortJourney || '' ;
			var noticeName = 'geoSpecLoc1AndType' ;
			var showFlag = true;
			if(geoSpecSectPortJourney==''){
				showFlag = false;
			}
			sendNoticeToForceDirctive4Single(editScope,'false',noticeName,showFlag+'') ;*/
		},
		changeDiscount:function(editScope,data,globalEditStatus){/*当改变折扣时*/
			//更新‘或/和’是否可编辑状态
			updateSpecSevFeeAndOrIndicator(editScope,data,globalEditStatus) ;
			//更新‘里程费’是否可编辑状态
			updateSpecifiedServiceFeeMileage(editScope,data,globalEditStatus) ;
			//更新'里程兑换标识'
			updateMileageExchangeIndicator(editScope,data,globalEditStatus) ;
		},
		changeSpecSevFeeAndOrIndicator:function(editScope,data,globalEditStatus){/*当改变‘或/和’时*/
			//更新'里程兑换标识'
			updateMileageExchangeIndicator(editScope,data,globalEditStatus) ;
		},
		changeMileageExchangeIndicator:function(editScope,data,globalEditStatus){/*当改变‘里程兑换标识’时*/
			//更新‘里程费’是否可编辑状态
			updateSpecifiedServiceFeeMileage(editScope,data,globalEditStatus) ;
		}
	} ;

}) ;