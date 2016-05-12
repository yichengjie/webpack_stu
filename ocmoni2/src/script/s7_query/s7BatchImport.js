define(function(require, exports, module) {
	var util = require('./util') ;
	require('./lib/ajaxfileupload') ;
	var modalHelper = new (require('./lib/modal.helper'))('batchImportTipInfo') ;
	
	function s7BatchImport(){
		
	}
	module.exports = s7BatchImport;
	
	s7BatchImport.prototype.init=function(){
		var self = this ;
		$("#batchImportFileInput").bind('change',function(){
		      var fileName = $("#batchImportFileInput").val() ;
		      $("#batchImportFileName").html(fileName) ;
		      if(fileName!=''){
		    	$("#submitBatchImportFormBtn").removeClass("hidden") ;
		      	$("#batchImportModal").modal("show") ;
		      }
		  })  ;
		 
		  $("#batchImportBtn").click(function(e){
			  	 var forId =  $(e.target).attr("for") ;
			  	 $("#submitBatchImportFormBtn").removeClass("hidden") ;
			  	 cleanTipInfo() ;
			  	 $("#"+forId).trigger('click') ;
		  }) ;
		  
		  $("#submitBatchImportFormBtn").click(function(){
			  	var csrfInfo = util.getCSRFInfo() ;
			  	var appName = util.getAppName() ;
			  	var serverUrl = "/"+appName+"/ocimport/resolve?_csrf="+csrfInfo._csrf;
			  	var fileName = $("#batchImportFileInput").val() ;
			  	if (fileName === '') {
					//$.showTuiErrorDialog('请选择文件！');
					addErrorTip("请选择文件！") ;
					return;
				}
				var point = fileName.lastIndexOf(".");
				var type = fileName.substr(point);
				if (type !== '.xls' && type !== '.xlsx') {
					//$.showTuiErrorDialog('文件格式错误！');
					addErrorTip("文件格式错误！") ;
					return;
				}else{
					self.submitForm(serverUrl) ;
				}
		  }) ;
	}
	
	
	s7BatchImport.prototype.submitForm = function(serverUrl){
		$("#submitBatchImportFormBtn").addClass("hidden") ;
		addSuccessTip("文件上传中....") ;
		$.ajaxFileUpload({
			url:serverUrl, //用于文件上传的服务器端请求地址
			type:'post',
			formId:'batchImportForm',
			timeout:100000,
			secureuri:false, //一般设置为false
			dataType:'json', //返回值类型 一般设置为json
			success:function(datas, status){
				$("#submitBatchImportFormBtn").removeClass("hidden") ;
				addSuccessTip("导入操作完成...") ;
			},
			error:function(xmlHttpRequest, status, error) {
				$("#submitBatchImportFormBtn").removeClass("hidden") ;
				addErrorTip("导入失败！") ;
			}
		});
		
	};
	
	function cleanAllInputInfo (){
	   $("#batchImportFileInput").val("") ;
	} ;
	  
    function cleanTipInfo (){
    	modalHelper.cleanTipInfo() ;
    } ;
	  
    function addErrorTip(errMsg){
    	cleanTipInfo() ;
    	modalHelper.addErrorTip(errMsg) ;
    } ;
		
    function addSuccessTip(sucMsg){
    	cleanTipInfo() ;
    	modalHelper.addSuccessTip(sucMsg) ;
    } ;
	
}) ;