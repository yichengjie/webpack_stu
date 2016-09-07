//define(function(require) {
  require('tui_core_lib');
  require('tui_drag_lib') ;
  require('tui_dialog_lib');
  require('jq_datepicker_lib');
  require("jq_timepicker_lib") ;
  require('is_loading_lib') ;
  var Headroom =  require('headroom_lib') ;
	
  var util = require('../lib/util') ;
  var S7Query = require('./s7query');
  new S7Query();
  
  var S7Publish = require('./s7publish');
  var s7publish = new S7Publish();
  s7publish.init();
  
  var S7Delete = require('./s7delete');
  var s7delete = new S7Delete();
  s7delete.init();
  
  //终止操作相关代码
  var S7Abort = require('./s7abort') ;
  var s7abort = new S7Abort() ;
  s7abort.init() ;
  //
  var S7BatchImport = require('./s7BatchImport') ;
  new S7BatchImport().init() ;
  
  import S7Export from './s7export' ;
  new S7Export() ;
  
  
  
  
  $("#moreInputBtn").click(function(){
	  //srchInfoMore
	  util.slideToggleDiv('srchInfoMore') ;
  }) ;
  

  //当点击复制数据的时候
  $('#copyRecord7Btn').bind('click',function (event) {
  		//console.info('复制一条数据。。。。。。') ;
  		var checkedR7s = $(":checkbox[name=s7check]:checked") ;
  		var len = checkedR7s.length ;
  		if(len==1){
  			var list_item = checkedR7s.parents('li') ;
  			var s7Id = list_item.find(":input[name=s7id]").val() ;
  			var appName = util.getAppName() ;
  			var toUrl = "/"+appName+"/oc/toCopyS7UI.action?s7Id="+ s7Id;
  			window.location.href = toUrl ;
  		}else if(len==0){
        $.showTuiErrorDialog('请选择一条需要复制的记录!');
      }else{
  			$.showTuiErrorDialog('只能选择一条需要复制的记录!');
  		}
  }) ;
  
  $(".dropdown-oc").find(".dropdown-trigger").click(function (e) {
    e.stopPropagation() ;
    $(".dropdown-menu-oc").removeClass('open') ;
    $(this).parents(".dropdown-oc").find(".dropdown-menu-oc").toggleClass('open') ;
  }) ;

  $(document).click(function(e){
  	 e.stopPropagation() ;
     $('.dropdown-menu-oc').removeClass('open') ;
  }) ;
  
 //初始化headroom插件
 //$('#myheader').headroom();
 var $myheader = $('#myheader');
 var headroom  = new Headroom($myheader[0]);
 headroom.init();
//}) ;
  
