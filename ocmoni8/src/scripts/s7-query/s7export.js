//s7ExportBtn
'use strict';
var util = require('../lib/util') ;
var httpClient = require('../lib/HttpClientUtil') ;
import {getQueryParam} from './common' ;


export default class S7Export {
	
	constructor() {
		$("#s7ExportBtn").click(this.handleExport) ;
	}
	
	handleExport(){
		let url = $('#s7ExportBtn').attr('url');
		let param = getQueryParam();
		let ajaxing = httpClient.dealAjaxRequest4JSObj(url,param) ;
		let contextPath = $("#contextPath").val() ;
		util.showLoading() ;
    	$.when(ajaxing).done(function(retData){
    		util.hideLoading() ;
    		let flag = retData.flag ;
    		if(flag=='true'){
    			let excelUrl = retData.url ;
    			window.location.href = contextPath + excelUrl;
    		}else{
    			util.toastDanger('导出出错!') ;
    		}
    	}).fail(function(err){
    		util.hideLoading() ;
    		util.toastDanger('调用导出方法出错!') ;
    	}) ;
	}
}


