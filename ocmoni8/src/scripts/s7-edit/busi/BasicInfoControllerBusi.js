'use strict' ;
var validateHelper = require('../util/S7ValidateHelper') ;
import _ from 'underscore_lib' ;
/*BaseInfoController操作相关的方法**/
export function dealData4NewServiceType({data,orgData,chooseItem,FormEditStatusServcie,rootScope}){
	//data,orgData,l,FormEditStatusServcie,editScope
	//第一部分:主要为点击事件后的页面表单赋值工作
	var carrCode = chooseItem.carrCode ;
	var serviceType = chooseItem.serviceType ;
	var serviceSubCode = chooseItem.serviceSubCode ;
	var serviceGroup = chooseItem.attributesGroup ;
	var subGroup = chooseItem.attributesSubgroup ;
	//第一步:重置表单数据
	//当点击的饿时候把整个表单重置//除了serviceType外的其他字段
	for(var pname in data){
		if(!_.contains(['sel1','sel2','sel3','sel4','firstMaintenanceDate'], pname)){
			data[pname] = angular.copy(orgData[pname]) ;
		}
	}
	//validator是绑定在window上的全局变量
	validator.resetForm();
	//第二步：填充当前选中的数据
	data.carrCode = carrCode ;
	data.serviceAndSubCode = serviceSubCode ;
	data.serviceType = serviceType ;
	//填充basicInfo信息start
	data.basicInfoVo.serviceGroup= serviceGroup ;
	data.basicInfoVo.subGroup= subGroup ;
	data.basicInfoVo.subCode= serviceSubCode ;
	//清除表格复用的信息
	_clearAllReuseTbHistory() ;
	//清空金额缓存数据(初始化为全额状态)
	data.discountOrNot = '1' ;
	data.list201VO = [] ;//数据初始化
	//赋默认值部分
	_changeDefaultValueByServiceType(data) ;
	//第二部分：主要做页面的显隐以及是否可编辑工作
	validateHelper.changeServiceType(rootScope,data,FormEditStatusServcie) ;
	rootScope.myForm.$setPristine() ;
}
/*获取需要显示在 ‘选择附加服务’输入框中的 文字描述*/
export function getShowChooseFuncStr (FormData){
	var str = "" ;
	var str1 = FormData.sel1.showStr || "" ;
	var str2 = FormData.sel2.showStr || "" ;
	var str3 = FormData.sel3.showStr || "" ;
	if(str1.length>0){
		str = str1 ;
	}
	if(str2.length>0){
		str += " > "+str2 ;
	}
	if(str3.length>0){
		str += " > "+str3 ;
	}
	return str ;
}
/*清空第三个服务选择框中的类容*/
export function clearChoose3Info({FormData,lastGroupList,lastGroupList2,initServiceType}){
	//FormData,lastGroupList,lastGroupList2,initServiceType
	//把第三个选项框以前保留的信息清空
	FormData.sel3.showStr = "" ;
	FormData.sel3.value = "" ;
	FormData.sel3.textTableNo163 = "" ;
	lastGroupList = [] ;
	lastGroupList2 = [] ;
	FormData.serviceAndSubCode = "" ;
	FormData.serviceType = initServiceType ;//
	FormData.noChargeNotAvailable = "" ;//设置为默认
	/////////////////////////////////////////
	FormData.basicInfoVo.serviceGroup= "" ;
	FormData.basicInfoVo.subGroup= "" ;
	FormData.basicInfoVo.subCode= "" ;
	FormData.sel4 = [];
}


/*var handleChangeSelect = function(val) {
    console.log("你选择的 value : " + val);
};*/

export function initNewVersionServcieChoose(callback){
	 var options = [] ;
     var $select = $('#select-links').selectize({
         valueField: 'id',
         labelField: 'text',
         searchField: ['text'],
         sortField: [
             {field: 'groupDescription', direction: 'desc'}
         ],
         onChange: callback,
         options: options,
         render: {
             option: function(item, escape) {
                 var label = item.text;
                 var caption = item.serviceType;
                 return '<div>' +
                         '<span>' + escape(label) + '</span>' +
                         '<span class="serviceTypeSpan">' + escape(caption) + '</span>'+
                         '</div>';
             }
         }
     });
     var selectize = $select[0].selectize;
     return selectize ;
}
/**将后台查询过来的list转为提示框需要的数据形式*/
export function convertChooseList2ChooseOptions (list){
	//F/M/R/T------航班服务/商品服务/规则服务/客票服务
	//A/B/C/E/P----免费行李/随携行李/逾重行李/禁运行李/预付费行李
	let objMap = {"F":"航班服务","M":"商品服务","R":"规则服务","T":"客票服务",
			"A":"免费行李","B":"随携行李","C":"逾重行李","E":"禁运行李","P":"预付费行李"} ;
	let options = [] ;
	for(let {id,serviceType,serviceSubCode,commercialName="空",serviceGroupDescription ="空",subGroupDescription="空"} of list){
		let text = _dealNullStr(serviceGroupDescription)+" > "+_dealNullStr(subGroupDescription)+" > ["+serviceSubCode+"] "+ commercialName ;
		let groupDescription = serviceGroupDescription ;
		options.push({id,text,groupDescription,serviceType}) ;
	}
	return options ;
}


function _dealNullStr(str){
	var tmp = str || "空" ;
	return tmp ;
}

/*当serviceType改变的时候，给页面上的一些元素赋默认值  private method*/
function _changeDefaultValueByServiceType (data){
    var serviceType = data.serviceType ;
    ////1.当为免费行李时，‘或/和’字段为空
    if(_.contains(['A','B','E'], serviceType)){
	  data.specSevFeeAndOrIndicator= '' ;
    }
    //2.更新‘是否收费’的默认值
    if(serviceType=='A'){
	  data.noChargeNotAvailable = 'F' ;//设置为免费
    }else if (serviceType=='B'){
	 data.noChargeNotAvailable = 'F' ;//设置为免费
    }else if (serviceType=='C'||serviceType=='P'){
	  data.noChargeNotAvailable = '' ;//设置为收费
    }else if (serviceType=='E'){
	  data.noChargeNotAvailable = 'X' ;//设置为收费
    }
    //3.更新‘是否检查库存’
    if(_.contains(['A','B','E'],serviceType)){
	  data.availability = 'N' ;
    }
    //当服务为通用券（subgroup为FP）时，【sector/portion/journey】字段的值默认取值为journey（J=journey），且不可编辑
    var subgroup = data.basicInfoVo.subGroup;
    //4.更新‘区域/部分/全程’
    if(_.contains(['B','E'], serviceType)){
	  data.geoSpecSectPortJourney = 'S' ;
    }else if(serviceType=='F'){
	  if(subgroup=='FP'){//这里其实可以在下面直接判断当subgroup为fp时区域部分全程为‘J’
		 data.geoSpecSectPortJourney = 'J' ;
	  }else{
		 data.geoSpecSectPortJourney = 'S' ;
	  }
    }else{
	  data.geoSpecSectPortJourney = '' ;
    }
}


/*清空复用的历史信息 private method */
function _clearAllReuseTbHistory (){
   //201暂时不支持复用，所以不用清空历史
   var namesArrs = ["reuseList172VO","reuseList173TicketVO","reuseList183VO","reuseList198VO","reuseList198UpgradeVO",
 	  "reuseList171VO","reuseList173TktVO","reuseList186VO","reuseList170VO","reuseList196VO","reuseList165VO",
 	  "reuseList178Loc1","reuseList178Loc2","reuseList178Loc3","reuseListTsk202VO"] ;
   for(let name of namesArrs){
 	  $(":input[name="+name+"]").val("").attr("placeholder","") ;
   }
}


class BasicInfoControllerBusi {
   constructor() {
	  console.info('BasicInfoControllerClass is create .') ;
   }
}
  
export default BasicInfoControllerBusi ;