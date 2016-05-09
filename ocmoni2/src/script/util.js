define(function(require, exports, module) {
	var dataFormatStr = "YYYY-MM-DD" ;
	var dataTimeFormatStr = "YYYY-MM-DD HH:mm" ;
	var util = {};
	//获取也csrf信息
	util.getCSRFInfo = function(){
		var _csrf = $("meta[name=_csrf]").attr('content');
		var _csrf_header = $("meta[name=_csrf]").attr('content') ;
		var _csrf_parameterName = $("meta[name=_csrf]").attr('content') ;
		var info = {"_csrf":_csrf,"_csrf_header":_csrf_header,"_csrf_parameterName":_csrf_parameterName} ;
		return info ;
	}
	//判断状态不可编辑，当状态为3的时候不能编辑
	util.checkStatusIsDisable = function(status){
		var flag = false ;
		if(status!=null){
			if(status == '3'){
				flag = true;
			}
		}
		return flag;
	};
	
	
	util.getByteNumOfStr = function(str){
		str = str || "" ;
		return str.replace(/[^\x00-\xff]/g, 'xx').length;
	};
	
	
	util.getRbdTb198TmpStr = function(){
		return "rbd" ;//这个返回值一定要和页面上的相同，对应以前的bookSeat
	};
	util.getRbdUpgradeTb198TmpStr = function() {
		return "rbdUpgrade" ;//这个返回值一定要和页面上的相同//对应以前的seatProp
	};
	
	util.getCommonImgArr = function(){
		var arr = ['0B5', '0DG', '0B3', '0LO', '0LQ', '0LT', '0BO']  ;
		return arr ;
	};
	util.getAppName = function(){
		//-/ocGui/oc/ocView
		var pathname = window.location.pathname ;
		var t1 = pathname.substr(1) ;
		var index = t1.indexOf("/") ;
		var t2 = t1.substr(0,index) ;
		return t2 ;
	};

	util.isNonNegativeInteger =  function(value){
		return /^[0-9]{0,}$/.test(value);
	} ;


	util.isThreecode = function (value) {
		return /^[A-Z]{3}$/i.test(value) ;
	};
	
	util.isThreecode2 = function (value) {
		return /^[A-Za-z0-9]{3}$/i.test(value) ;
	};
	
	//输入字符串是否为航空公司二字码
	util.isAir = function (value) {
		return /^[a-zA-Z]{2}$|^[a-zA-Z]{1}[0-9]{1}$|^[0-9]{1}[a-zA-Z]{1}$/.test(value);
	};
	
	util.isInteger = function(value){
		return /^-?\d+$/.test(value);
	};
	
	util.isDateOC = function(datavalue){
		return isLegalDate(datavalue,true);//可以超过20年 
	};
	
    util.isBiggerDateThan = function(val1,val2){
    	var date1 = moment(val1,dataFormatStr) ;
    	var date2 = moment(val2,dataFormatStr) ;
    	return date1 >= date2 ;
    };

    util.isSmallerDateThan = function(val1,val2){
    	var date1 = moment(val1,dataFormatStr) ;
    	var date2 = moment(val2,dataFormatStr) ;
    	return date1 <= date2 ;
    };

	util.isBiggerThanCurrent =function(datevalue){
		var curDateStr = moment().format(dataFormatStr) ;
		var curDate = moment(curDateStr) ;
		var valueDate = moment(datevalue,dataFormatStr) ;
		return valueDate>=curDate;
	};
	
	/**date time 相关的 start**/
	util.isBiggerDateTimeThan = function(val1,val2){
    	var date1 = moment(val1,dataTimeFormatStr) ;
    	var date2 = moment(val2,dataTimeFormatStr) ;
    	return date1 >= date2 ;
    };

    util.isSmallerDateTimeThan = function(val1,val2){
    	var date1 = moment(val1,dataTimeFormatStr) ;
    	var date2 = moment(val2,dataTimeFormatStr) ;
    	return date1 <= date2 ;
    };

	util.isBiggerDateTimeThanCurrent =function(datevalue){
		var curDateStr = moment().format(dataTimeFormatStr) ;
		var curDate = moment(curDateStr) ;
		var valueDate = moment(datevalue,dataTimeFormatStr) ;
		return valueDate>=curDate;
	};
	/**date time 相关的 end**/
	
	

	util.islettersOrNumber = function(value){
		return /^[A-Za-z0-9]{0,}$/i.test(value);
	} ;

	util.isPositiveInteger = function  (value) {
		return /^[1-9]{1}[0-9]{0,}$/.test(value);
	} ;

	util.isLetter = function  (value) {
		return /^[a-zA-Z]+$/i.test(value);
	} ;
	
	util.isAlphanumericOrStart = function(value){
		return /^[A-Za-z0-9]{0,}$|^[\*]{1}$/.test(value) ;
	}

	util.isValidGeoLocal = function(value,geoType){
		//{'A':'areacode','C':'citycode','N':'countrycode','P':'airportcode','S':'statecode','Z':'zonecode'
		if(geoType=='A'){
			return util.isAreacode(value) ;	
		}else if(geoType=='C'){
			return util.isCitycode(value) ;
		}else if(geoType=='N'){
			return util.isCountrycode(value) ;
		}else if(geoType=='P'){
			return util.isAirportcode(value) ;
		}else if(geoType=='S'){
			return util.isStatecode(value) ;
		}else if(geoType=='Z'){
			return util.isZonecode(value) ;
		}
		return false;
	};


	util.isAreacode = function(value){
		return /^[1-3]{1}$/i.test(value) ;
	} ;

	util.isCitycode = function(value){
		return /^[A-Z]{3}$/i.test(value); 
	} ;
	util.isCountrycode = function(value){
		return /^[A-Z]{2}$/i.test(value) ;
	} ;
	util.isAirportcode = function(value){
		return /^[A-Z]{3}$/i.test(value) ;
	} ;
	util.isStatecode = function(value){
		return /^[A-Z]{2}$/i.test(value) ;
	} ;
	util.isZonecode = function(value){
		return /^[0-9]{3}$/i.test(value) ;
	} ;

	
	//判断日期是否合法
	var  isLegalDate=function(datavalue,noTimeLimit){
	   var date = datavalue;
	   if( !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date)){
		  return false;
		}
	   var result = true;
	   var curYear = (new Date().getFullYear() - 0);
	   var ymd = date.split(/-/);
	   var year = ymd[0] - 0;
	   var month = ymd[1] - 0;
	   var day = ymd[2] - 0;
		/* month-day relation, January begins from index 1 */
	   var mdr = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	   var isLeapYear = function(){
		  // 判断年份是否是闰年
		  return (year % 400 === 0) || ((year % 4 === 0) && (year % 100 !== 0));
		};
	   if(!noTimeLimit&&(year < curYear - 20 || year > curYear + 20)){
		// 年份超过前后20年，则校验失败
		result = false;
		}
	   if(month > 12 || month < 1){
		// 如果月份不合法，则校验失败
		result = false;
	   }
	  if(mdr[month] < day || day < 1 || day > 31){
		// 日期天数不合法，校验失败
		result = false;
	   }
	  if(month === 2 && !isLeapYear() && day > 28){
		// 年份不是闰年，日期天数不合法，校验失败
		result = false;
	   }
	  return result;
   };

	module.exports = util ;
});