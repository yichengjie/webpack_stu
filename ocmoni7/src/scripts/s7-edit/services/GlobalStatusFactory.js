//define(function(require, exports, module){ 
	var services = require("./services") ;
	services.factory("TbShowHideServcie", function(){
	    return {
	        "list183VO":false,
	        "list171VO":false,
	        "list172VO":false,
	        "list173TicketVO":false,
	        "list173TktVO":false,
	        "list165VO":false,
	        "list186VO":false,
	        "list196VO":false,
	        "list198VO":false,
	        "list198UpgradeVO":false,
	        "list170VO":true,
	        "list178Loc1":false,
	        "list178Loc2":false,
	        "list178Loc3":false,
	        "listTsk202VO":false
	    };
	}) ;
	
	//自定义表格按钮是否显示service
	services.factory("CustomeEditTbStatusServcie", function(){
	    return {
	        "list183VO":false,
	        "list171VO":false,
	        "list172VO":false,
	        "list173TicketVO":false,
	        "list173TktVO":false,
	        "list165VO":false,
	        "list186VO":false,
	        "list196VO":false,
	        "list198VO":false,
	        "list198UpgradeVO":false,
	        "list170VO":false,
	        "list178Loc1":false,
	        "list178Loc2":false,
	        "list178Loc3":false,
	        "listTsk202VO":false
	    };
	}) ;

	services.factory("ListVo2tbNoMap", function(){
	    return {
	        "list183VO":"securityTableNo183",
	        "list171VO":"cxrResFareTableNo171",
	        "list172VO":"accountCodeTableNo172",
	        "list173TicketVO":"ticketDesignatorTableNo173",
	        "list173TktVO":"tktDesignatorTableNo173",
	        "list165VO":"equipmentTypeTableNo165",
	        "list186VO":"carrierFlightTableNo186",
	        "list196VO":"textTableNo196",
	        "list198VO":"rbdTableNo198",
	        "list198UpgradeVO":"upgradeToRbdTableNo198",
	        "list170VO":"serviceFeeCurTableNo170",
	        "list178Loc1":"list178Loc1Id",
	        "list178Loc2":"list178Loc2Id",
	        "list178Loc3":"list178Loc3Id",
	        "listTsk202VO":"flightPassTableTsk202"
	    };
	}) ;

	/*控制页面上的控件是否可编辑*/
	services.factory("FormEditStatusServcie", function(){
	    return {
	        "firstMaintenanceDate":true,
	        "lastMaintenanceDate":true,
	        "description":true,
	        "fareBasis":true,
	        "availability":true,
	        "freeBaggageAllowancePieces":true,
	        "firstExcessOccurrence":true,
	        "lastExcessOccurrence":true,
	        "freeBaggageAllowanceWeight":true,
	        "freeBaggageAllowanceUnit":true,
	        "baggageTravelApplication":true,
	        "list196VO":true,
	        "noChargeNotAvailable":true,
	        "list170VO":true,
	        "list201VO":true,
	        "specSevFeeAndOrIndicator":true,
	        "specifiedServiceFeeMileage":true,
	        "specifiedServiceFeeApp":true,
	        "specServiceFeeColSub":true,
	        "specServiceFeeNetSell":true,
	        "indicatorComission":true,
	        "taxApplication":true,
	        "sequenceNumber":true,
	        "passengerTypeCode":true,
	        "minPassengerAge":true,
	        "maxPassengerAge":true,
	        "firstPassengerOccurrence":true,
	        "lastPassengerOccurrence":true,
	        "frequentFlyerStatus":true,
	        "mileageMinimum":true,
	        "mileageMaximum":true,
	        "customerIndexScoreMinimum":true,
	        "customerIndexScoreMaxmum":true,
	        "list172VO":true,
	        "list183VO":true,
	        "publicPrivateIndicator":true,
	        "geoSpecFromToWithin":true,
	        "geoSpecSectPortJourney":true,
	        "geoSpecTravelIndicator":true,
	        "geoSpecExceptionStopTime":true,
	        "geoSpecExceptionStopUnit":true,
	        "geoSpecStopConnDes":true,
	        "geoSpecLoc1Type":true,
	        "geoSpecLoc1":true,
	        "list178Loc1":true,
	        "geoSpecLoc2Type":true,
	        "geoSpecLoc2":true,
	        "list178Loc2":true,
	        "geoSpecLoc3Type":true,
	        "geoSpecLoc3":true,
	        "list178Loc3":true,
	        "travelStartDate":true,
	        "travelEndDate":true,
	        "startTime":true,
	        "stopTime":true,
	        "timeApplication":true,
	        "dayOfWeek":true,
	        "equipment":true,
	        "list165VO":true,
	        "list186VO":true,
	        "cabin":true,
	        "list198VO":true,
	        "upgradeToCabin":true,
	        "list198UpgradeVO":true,
	        "advancedPurchasePeriod":true,
	        "advancedPurchaseUnit":true,
	        "tourCode":true,
	        "list173TicketVO":true,
	        "tariff":true,
	        "rule":true,
	        "list173TktVO":true,
	        "list171VO":true,
	        "advancedPurchaseTktIssue":true,
	        "indicatorReissueRefund":true,
	        "formOfRefund":true,
	        "indicatorInterline":true,
			"allowancePeopleMinimum":true,
			"allowancePeopleMaximum":true,
			"effectivePeriodType":true,
			"effectivePeriodNumber":true,
			"effectivePeriodUnit":true,
			"serviceNumberMinimum":true,
			"serviceNumberMaximum":true,
			"firstUseDate":true,
			"lastUseDate":true,
			"mileageExchangeIndicator":true,
			"listTsk202VO":true
	    };
	}) ;


	//整个页面的组件在serviceType为xxx时应该显示到页面上(控制显隐关系)
	services.factory("FormStatusService", function(){
	    return {
	        "firstMaintenanceDate":{
	        	"typeList":["F","M","R","T","A","B","C","E","P"],
	        	"groupList":[],
	        	"nameList":["firstMaintenanceDate"],
	        	"showFlag":true
	        },
	        "lastMaintenanceDate":{
	        	"typeList":["F","M","R","T","A","B","C","E","P"],
	        	"groupList":[],
	        	"nameList":["lastMaintenanceDate"],
	        	"showFlag":true
	        },
	        "description":{
	        	"typeList":["F","M","R","T","B","E"],
	        	"groupList":[],
	        	"nameList":["description"],
	        	"showFlag":true
	        },
	        "fareBasis":{
	        	"typeList":["F","M","R","T","A","B","C","E","P"],
	        	"groupList":[],
	        	"nameList":["fareBasis"],
	        	"showFlag":true
	        },
	        "availability":{
	        	"typeList":["F","M","R","T","A","B","C","E","P"],
	        	"groupList":[],
	        	"nameList":["availability"],
	        	"showFlag":true
	        },
	        "freeBaggageAllowancePieces":{
	        	"typeList":["A"],
	        	"groupList":[],
	        	"nameList":["freeBaggageAllowancePieces"],
	        	"showFlag":true
	        },
	        "firstAndLastExcessOccurrence":{
	        	"typeList":["C","P"],
	        	"groupList":[],
	        	"nameList":["firstExcessOccurrence","lastExcessOccurrence"],
	        	"showFlag":true
	        },
	        "freeBaggageAllowanceWeight":{
	        	"typeList":["A","C","P"],
	        	"groupList":[],
	        	"nameList":["freeBaggageAllowanceWeight","freeBaggageAllowanceUnit"],
	        	"showFlag":true
	        },
	        "baggageTravelApplication":{
	        	"typeList":["A","C","P"],
	        	"groupList":[],
	        	"nameList":["baggageTravelApplication"],
	        	"showFlag":true
	        },
			"list196VO":{
				"typeList":["A","C","P"],
				"groupList":[],
				"nameList":["list196VO"],
				"showFlag":true
			},
			"noChargeNotAvailable":{
				"typeList":["F","M","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["noChargeNotAvailable"],
				"showFlag":true
			},
			"list170VOAndlist201VO":{
				"typeList":["F","M","R","T","C","P"],
				"groupList":[],
				"nameList":["list170VO","list201VO"],
				"showFlag":true
			},
			"specSevFeeAndOrIndicator":{
				"typeList":["F","M","R","T","C","P"],
				"groupList":[],
				"nameList":["specSevFeeAndOrIndicator"],
				"showFlag":true
			},
			"specifiedServiceFeeMileage":{
				"typeList":["F","M","R","T","C","P"],
				"groupList":[],
				"nameList":["specifiedServiceFeeMileage"],
				"showFlag":true
			},
			"specifiedServiceFeeApp":{
				"typeList":["F","M","R","T","C","P"],
				"groupList":[],
				"nameList":["specifiedServiceFeeApp"],
				"showFlag":true
			},
			"specServiceFeeColSub":{
				"typeList":["F","M","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["specServiceFeeColSub"],
				"showFlag":true
			},
			"specServiceFeeNetSell":{
				"typeList":["F","M","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["specServiceFeeNetSell"],
				"showFlag":true
			},
			"indicatorComission":{
				"typeList":["F","M","R","T","C","P"],
				"groupList":[],
				"nameList":["indicatorComission"],
				"showFlag":true
			},
			"taxApplication":{
				"typeList":["F","M","R","T","C","P"],
				"groupList":[],
				"nameList":["taxApplication"],
				"showFlag":true
			},
			"sequenceNumber":{
				"typeList":["F","M","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["sequenceNumber"],
				"showFlag":true
			},
			"passengerTypeCode":{
				"typeList":["F","M","R","T","A","B","C","P"],
				"groupList":[],
				"nameList":["passengerTypeCode"],
				"showFlag":true
			},
			"minAndMaxPassengerAge":{
				"typeList":["F","M","R","T","A","B","C","P"],
				"groupList":[],
				"nameList":["minPassengerAge","maxPassengerAge"],
				"showFlag":true
			},
			"firstAndLastPassengerOccurrence":{
				"typeList":["F","M","R","T"],
				"groupList":[],
				"nameList":["firstPassengerOccurrence","lastPassengerOccurrence"],
				"showFlag":true
			},
			"frequentFlyerStatus":{
				"typeList":["F","M","R","T","B","C","P"],
				"groupList":[],
				"nameList":["frequentFlyerStatus"],
				"showFlag":true
			},
			"mileageMinAndMaximum":{
				"typeList":["F","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["mileageMinimum","mileageMaximum"],
				"showFlag":true
			},
			"customerIndexScoreMinAndMaximum":{
				"typeList":["F","M","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["customerIndexScoreMinimum","customerIndexScoreMaxmum"],
				"showFlag":true
			},
			"list172VO":{
				"typeList":["F","M","R","T","A","B","C","P"],
				"groupList":[],
				"nameList":["list172VO"],
				"showFlag":true
			},
			"list183VO":{
				"typeList":["F","M","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["list183VO"],
				"showFlag":true
			},
			"publicPrivateIndicator":{
				"typeList":["F","M","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["publicPrivateIndicator"],
				"showFlag":true
			},
			"geoSpecFromToWithin":{
				"typeList":["F","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["geoSpecFromToWithin"],
				"showFlag":true
			},
			"geoSpecSectPortJourney":{
				"typeList":["F","R","A","B","C","E","P"],
				"groupList":[],
				"nameList":["geoSpecSectPortJourney"],
				"showFlag":true
			},
			"geoSpecTravelIndicator":{
				"typeList":["F","R","A","B","C","E","P"],
				"groupList":[],
				"nameList":["geoSpecTravelIndicator"],
				"showFlag":true
			},
			"geoSpecExceptionStopTimeAndUnit":{
				"typeList":["F","R","A","C","P"],
				"groupList":[],
				"nameList":["geoSpecExceptionStopTime","geoSpecExceptionStopUnit"],
				"showFlag":true
			},
			"geoSpecStopConnDes":{
				"typeList":["F","R","A","B","C","E","P"],
				"groupList":[],
				"nameList":["geoSpecStopConnDes"],
				"showFlag":true
			},
			"geoSpecLoc1AndType":{
				"typeList":["F","M","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["geoSpecLoc1Type","geoSpecLoc1"],
				"showFlag":true
			},
			"list178Loc1":{
				"typeList":["F","M","A","C","P","T"],
				"groupList":[],
				"nameList":["list178Loc1"],
				"showFlag":true
			},
			"geoSpecLoc2AndType":{
				"typeList":["F","R","A","B","C","E","P"],
				"groupList":[],
				"nameList":["geoSpecLoc2Type","geoSpecLoc2"],
				"showFlag":true
			},
			"list178Loc2":{
				"typeList":["F","M","A","C","P","T"],
				"groupList":[],
				"nameList":["list178Loc2"],
				"showFlag":true
			},
			"geoSpecLoc3AndType":{
				"typeList":["F","R","A","B","C","E","P"],
				"groupList":[],
				"nameList":["geoSpecLoc3Type","geoSpecLoc3"],
				"showFlag":true
			},
			"list178Loc3":{
				"typeList":["F","M","A","C","P","T"],
				"groupList":[],
				"nameList":["list178Loc3"],
				"showFlag":true
			},
			"travelStartDate":{
				"typeList":["F","M","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["travelStartDate"],
				"showFlag":true
			},
			"travelEndDate":{
				"typeList":["F","M","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["travelEndDate"],
				"showFlag":true
			},
			"startTime":{
				"typeList":["F","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["startTime"],
				"showFlag":true
			},
			"stopTime":{
				"typeList":["F","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["stopTime"],
				"showFlag":true
			},
			"timeApplication":{
				"typeList":["hidden"],
				"groupList":[],
				"nameList":["timeApplication"],
				"showFlag":true
			},
			"dayOfWeek":{
				"typeList":["F","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["dayOfWeek"],
				"showFlag":true
			},
			"equipmentAndlist165":{
				"typeList":["F","A","B","C","E","P"],
				"groupList":[],
				"nameList":["equipment","list165VO"],
				"showFlag":true
			},
			"list186VO":{
				"typeList":["F","R","T","A","B","C","E","P"],
				"groupList":[],
				"nameList":["list186VO"],
				"showFlag":true
			},
			"cabin":{
				"typeList":["F","A","B","C","P"],
				"groupList":[],
				"nameList":["cabin"],
				"showFlag":true
			},
			"list198VO":{
				"typeList":["F","A","B","C","P"],
				"groupList":[],
				"nameList":["list198VO"],
				"showFlag":true
			},
			"upgradeToCabin":{
				"typeList":["F","M"],
				"groupList":["UP","BDUP"],
				"nameList":["upgradeToCabin"],
				"showFlag":true
			},
			"list198UpgradeVO":{
				"typeList":["F","M"],
				"groupList":["UP","BDUP","SA","BDSA"],
				"nameList":["list198UpgradeVO"],
				"showFlag":true
			},
			"advancedPurchasePeriodAndUnit":{
				"typeList":["F","M","R","T","C","P"],
				"groupList":[],
				"nameList":["advancedPurchasePeriod","advancedPurchaseUnit"],
				"showFlag":true
			},
			"tourCode":{
				"typeList":["F","M","R","T","A","B","C","P"],
				"groupList":[],
				"nameList":["tourCode"],
				"showFlag":true
			},
			"list173TicketVO":{
				"typeList":["F","M","R","T","A","B","C","P"],
				"groupList":[],
				"nameList":["list173TicketVO"],
				"showFlag":true
			},
			"tariff":{
				"typeList":["F","R","A","B","C","P"],
				"groupList":[],
				"nameList":["tariff"],
				"showFlag":true
			},
			"rule":{
				"typeList":["F","R","A","B","C","P"],
				"groupList":[],
				"nameList":["rule"],
				"showFlag":true
			},
			"list173TktVO":{
				"typeList":["F","R","A","B","C","P"],
				"groupList":[],
				"nameList":["list173TktVO"],
				"showFlag":true
			},
			"list171VO":{
				"typeList":["F","R","A","B","C","P"],
				"groupList":[],
				"nameList":["list171VO"],
				"showFlag":true
			},
			"advancedPurchaseTktIssue":{
				"typeList":["F","R","T","P"],
				"groupList":[],
				"nameList":["advancedPurchaseTktIssue"],
				"showFlag":true
			},
			"indicatorReissueRefund":{
				"typeList":["F","M","A","C","P","T"],
				"groupList":[],
				"nameList":["indicatorReissueRefund"],
				"showFlag":true
			},
			"formOfRefund":{
				"typeList":["F","M","R","T","C","P"],
				"groupList":[],
				"nameList":["formOfRefund"],
				"showFlag":true
			},
			"indicatorInterline":{
				"typeList":["F","M","R","T","C","P"],
				"groupList":[],
				"nameList":["indicatorInterline"],
				"showFlag":true
			},
			"allowancePeopleMinAndMaximum":{/*服务适用人数范围*/
				"typeList":["F","R","T","A","B","C","E","P"],
				"groupList":["FP"],
				"nameList":["allowancePeopleMinimum","allowancePeopleMaximum"],
				"showFlag":true
			},
			"effectivePeriodInfo":{/*延长时间*/
				"typeList":["F","R","T","A","B","C","E","P"],
				"groupList":["FL","FP"],
				"nameList":["effectivePeriodType","effectivePeriodNumber","effectivePeriodUnit"],
				"showFlag":true
			},
			"serviceNumberMinAndMaximum":{/*服务套数*/
				"typeList":["F","R","T","A","B","C","E","P"],
				"groupList":["FP"],
				"nameList":["serviceNumberMinimum","serviceNumberMaximum"],
				"showFlag":true
			},
			"firstAndLastUseDate":{/*期限开始*/
				"typeList":["F","R","T","A","B","C","E","P"],
				"groupList":["FP"],
				"nameList":["firstUseDate","lastUseDate"],
				"showFlag":true
			},
			"mileageExchangeIndicator":{
				"typeList":["F","M","R","T","C","P"],
				"groupList":[],
				"nameList":["mileageExchangeIndicator"],
				"showFlag":true
			}
	    };
	}) ;
 //}) ;
