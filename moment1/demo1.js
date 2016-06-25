/**
 * Created by Administrator on 2016/6/24.
 */
//var info = moment().add(7, 'days').subtract(1, 'months').year(2009).hours(0).minutes(0).seconds(0);
var dataTimeFormatStr = "YYYY-MM-DD HH:mm" ;
function isBiggerDateTimeThanCurrentNextHour (datevalue){
    //moment().add(1, 'hour').minutes(0).format(dataTimeFormatStr) ;
    var curDateStr = moment().add(1, 'hour').minutes(0).format(dataTimeFormatStr) ;
    var curDate = moment(curDateStr,dataTimeFormatStr) ;
    var valueDate = moment(datevalue,dataTimeFormatStr) ;
    console.info('*************************') ;
    console.info(curDate.format(dataTimeFormatStr)) ;
    console.info(valueDate.format(dataTimeFormatStr)) ;
    console.info('*************************') ;
    return valueDate>=curDate;
};

//var info = moment().add(1, 'hour').minutes(0).format(dataTimeFormatStr) ;
var datevalue = "2016-06-24 15:56"  ;
console.info(isBiggerDateTimeThanCurrentNextHour(datevalue)) ;

