define(function (require, exports, module) {
	/*
	 * "座选","升舱","餐食","贵宾休息室","优先登机","预付费行李","逾重行李","FareLock","通用券"
	 */
	var jsonData = {
		required4RequestTypeShow:{
	        salesDate:["座选","升舱","餐食","贵宾休息室","优先登机","预付费行李","逾重行李"],/*销售地日期*/
	        pointOfSaleLocation:["座选","升舱","餐食","贵宾休息室","优先登机","预付费行李","逾重行李"],/*销售地*/
	        departureAirportCode:["座选","升舱","餐食","贵宾休息室","优先登机","预付费行李","逾重行李"],/*始发地*/
	        arrivalAirportCode:["座选","升舱","餐食","贵宾休息室","优先登机","预付费行李","逾重行李"],/*目的地*/
	        marketingAirlineCode:["座选","升舱","餐食","贵宾休息室","优先登机","预付费行李","逾重行李"],/*市场方航空公司*/
	        cabin:['升舱'],/*舱位等级*/
	        resBookDesigCode:["升舱"],
	        carrierCode:["座选"],/*常旅客积分所在航司*/
	        frequentFlyerStatus:["座选"],/*常旅客等级*/
	        subCode:["座选","升舱","餐食","贵宾休息室","优先登机"],/*服务子代码*/
	        seatCharacteristics:["座选"],/*提前订座(可填多个，多个用 / 分隔)*/
			listUpgradeInfo:["升舱"],/*升舱到*/
		    listBaggages:["预付费行李","逾重行李"]/*收费行李*/
		}
	} ;

	module.exports = jsonData ;
}) ;
