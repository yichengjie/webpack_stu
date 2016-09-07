//获取查询条件数据
export function getQueryParam () {
	var paramTemp = {};
	//基础信息
	paramTemp['status'] = _getStatusData('status');//发布状态
	paramTemp['effStatus'] = _getStatusData('effStatus');//生效状态
	var server=$('#server').val();
	if(server ==='商务名称'){
		paramTemp['commercialName'] = $('#service').val();
	}else{
		paramTemp['subCode'] = $('#service').val();
	}
	paramTemp['effectMaxDate'] = $('#effectMaxDate').val();//生效日期上限
	paramTemp['effectMinDate'] = $('#effectMinDate').val();//生效日期下限
	// 机型
	paramTemp['equipment'] = _getEquipment();
	//服务等级
	paramTemp['cabin'] = _getCabinData('cabin');//服务等级
	//console.log(paramTemp['cabin'] );
	//获取优先级序号
	paramTemp['sequenceNumber'] = _getSequenceNumber() ;
	//地理位置
	paramTemp['geoSpecLoc1Type'] = $('#geoSpecLoc1Type').attr('checked') ? $('#geoSpecLoc1Type').val() : '';//机场标识1
	paramTemp['geoSpecLoc1'] = $('#geoSpecLoc1').val();//区域1
	paramTemp['geoSpecLoc2Type'] = $('#geoSpecLoc2Type').attr('checked') ? $('#geoSpecLoc2Type').val() : '';//机场标识2
	paramTemp['geoSpecLoc2'] = $('#geoSpecLoc2').val();//区域2
	paramTemp['geoSpecLoc3Type'] = $('#geoSpecLoc3Type').attr('checked') ? $('#geoSpecLoc3Type').val() : '';//机场标识3
	paramTemp['geoSpecLoc3'] = $('#geoSpecLoc3').val();//经过区域
	paramTemp['carrCode'] = $('#carrCode').val();//航空公司
	return paramTemp;
}


//从界面获取发布状态和生效状态
function _getStatusData (name) {
	var result = '';
	var tag = '';
	var array =$(":checkbox[name="+name+"]");
	array.each(function(){
		let flag = $(this).prop("checked") ;
		if(flag){
			result += '1';
		}else{
			result += '0';
		}
		tag += '0';
	}) ;
    //如果状态代码result的值都是0组成的字符串，则将result置为空字符串
    if(result === tag) {
    	result = '';
    }
    return result;
}

//从界面获取服务等级
function _getCabinData (name) {
	var result = '';
	var array = $(":checkbox[name="+name+"]");
	array.each(function(){
		let flag = $(this).prop("checked") ;
		if(flag){
			result += $(this).val();
		}
	}) ;
    return result;
}

//获取优先级序号
function _getSequenceNumber (){
	var sequenceNumber = $.trim($("#sequenceNumber").val());
	return sequenceNumber ;
}

//机型
function _getEquipment () {
	var eqment = $('#s7_F_equipment').val();
	if(eqment !== '' && eqment !== null && typeof(eqment) !== 'undefined'){
		return (eqment.split('-'))[0];
	}else{
		return '';
	}
}
