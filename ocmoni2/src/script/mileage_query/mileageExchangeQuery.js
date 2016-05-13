define(function(require, exports, module) {

	var Vue = require('vue') ;

	var httpUtil = require("HttpClientUtil_lib") ;
	var _ = require('underscore') ;
	require('tui_dialog_lib');
	require('modal_lib') ;
	require('datepicker_lib') ;
	require('timepicker_lib') ;
	var dateFormatStr ="YYYY-MM-DD" ;
	var dateTimeFormatStr = "YYYY-MM-DD HH:mm" ;
	
	function checkIsTrue(obj){
		if(obj!=null&&(obj==true||obj=='true')){
			return true;
		}
		return false;
	}
	
	
	function MileageExchangeQuery(){
		this.contextPath = "" ; 	
		if(this==window){
			throw new Error("please new an MileageExchangeQuery object to use it !");
		 }
	}
	
	function initDateTimePicker(elemId,minDateStr){
		   //配置日期控件
            var optionObj = {} ;
            optionObj.dateFormat = "yy-mm-dd" ;
            optionObj.timeFormat = 'HH:mm' ;
            optionObj.timeText="&nbsp;&nbsp;时间" ;
            optionObj.hourText ="&nbsp;&nbsp;时" ;
            optionObj.minuteText ="&nbsp;&nbsp;分" ;
            //optionObj.secondText = "&nbsp;&nbsp;秒" ;
            optionObj.currentText = "当前" ;
            optionObj.closeText = "关闭" ;
             optionObj.minDate = minDateStr ;
            optionObj.showButtonPanel = true ;
            //optionObj.showSecond = true ;
            $("#"+elemId).datetimepicker(optionObj) ;
	}
	
	
	/**
	 *  $.growl({ title: "Growl", message: "The kitten is awake!", url: "/kittens" });
	    $.growl.error({ message: "The kitten is attacking!" });
	    $.growl.notice({ message: "The kitten is cute!" });
	    $.growl.warning({ message: "The kitten is ugly!" });
	 */
	MileageExchangeQuery.prototype.init = function(){
		var _self = this ;
		//初始化日期控件
		var dateStr = moment().format(dateFormatStr) ;//
		initDateTimePicker("lastMaintenanceDate",dateStr) ;
	    this.contextPath = 	$.trim($("#contextPath").val()) ;
		var vm =new Vue({
			  el: '#app',
			  data: {
			  	  lastMaintenanceDate:'',
			      list: [],
			      pageBar:{
			      	 curPage:0,
			      	 pageSize:0,
			      	 pgArr:[],
			      	 pageCount:0
			      }
			  },
			  methods: {
				    query: function () {/**查询按钮被点击**/
				    	 //_self.query(this.list) ;
				    	var config = {
				    		toPageNum:1,
				    		vmList:this.list ,
				    		vmPageBar:this.pageBar
				    	} ;
				    	_self.query4Page(config) ;
				    },
				    backPage:function(){/**返回按钮被点击**/
				    	//console.info(_self.contextPath) ;
						window.location.href= _self.contextPath+'/oc/ocView' ;
				    },
				    toAddPage:function(){/**新建按钮被点击**/
						window.location.href =_self.contextPath+"/mileage/toMileageExchangeAddUI" ;
				    },
				    deleteItem:function(id){/**删除按钮被点击*/
				    	$.showTuiConfirmDialog('确认删除?', function() {
				    		_self.deleteById(id) ;
				    	}) ;
				    },
				    abort:function(){/**截止按钮被点击*/
				    	var flag = false;
				    	 _.each(this.list,function(item){
				    	 	var checkedFlag = item.checkedFlag ;
				    	 	if(checkIsTrue(checkedFlag)){
				    	 		 flag = true ;
				    	 	}
				    	 }) ;
				    	 if(flag){
				    	 	var dateTimeStr = moment().format(dateTimeFormatStr) ;
				    	 	 this.lastMaintenanceDate = dateTimeStr ;
				    	 	 $('#myModal').modal('show') ;
				    	 }else{
				    	 	$.showTuiErrorDialog('至少选择一条需要截止的记录!');
				    	 }
				    },
				    submitAbort:function(){
				    	var lastMaintenanceDateStr = this.lastMaintenanceDate ;
				    	if(lastMaintenanceDateStr==''){
				    		 $.growl.error({ message: "截止日期不能为空!" });
				    	}else{
				    		var nextHourTimeStr = moment().add(1, 'hours').format("YYYY-MM-DD HH") ;
				    		var tmpStr = nextHourTimeStr + ":00" ;
				    		var nextHourTime = moment(tmpStr,dateTimeFormatStr) ;
				    		var lastMaintenanceDate = moment(this.lastMaintenanceDate,dateTimeFormatStr) ;
				    		if(lastMaintenanceDate>nextHourTime){
			    			    var allBiggerFirstDateFlag = true ;
			    			    //截止日期要大于所有的生效日期
			    				 var idArrs = [] ;
						    	 _.each(this.list,function(item){
						    	 	var checkedFlag = item.checkedFlag ;
						    	 	var curfirstDateStr = item.firstMaintenanceDate ;
						    	 	var tmpStr = curfirstDateStr.substring(0,curfirstDateStr.length-3) ;
						    	 	var curFirstDate = moment(tmpStr,dateTimeFormatStr) ;
						    	 	if(curFirstDate>=lastMaintenanceDate){//如果存在生效日期大于截止日期的记录，则flag= false
						    	 		allBiggerFirstDateFlag = false;
						    	 	}
						    	 	if(checkIsTrue(checkedFlag)){
						    	 		idArrs.push(item.id) ;
						    	 	}
						    	 }) ;
						    	 if(allBiggerFirstDateFlag){
					    	 		 $('#myModal').modal('hide') ;
					    	 		 this.lastMaintenanceDate = '' ;
					    	 		 _self.batchAbort(idArrs,lastMaintenanceDateStr,this.list) ;
						    	 }else{
						    	 	 $.growl.error({ message: "截止日期必须大于所选记录的生效日期!" });				  
						    	 }
				    		}else{
				    			$.growl.error({ message: "截止日期必须大于下一小时0分!" });				    		
				    		}
				    	}
				    },
				    checkItem:function(item){
				    	var checkedFlag = item.checkedFlag ;
				    	item.checkedFlag = !checkIsTrue(checkedFlag) ;
				    },
				    toPage:function(pnum){
				    	 //触发查询操作
				    	 //当前页数据更新
				    	//this.pageBar.curPage = pnum ;
				    	if(pnum!=this.pageBar.curPage){
					    	var config = {
					    		toPageNum:pnum,
					    		vmList:this.list ,
					    		vmPageBar:this.pageBar
					    	} ;
					    	_self.query4Page(config) ;
				    	}
				    },
				    toPerviousPage:function(){
				    	if(this.pageBar.curPage*1>1){
				    		//触发查询操作
				    		//this.pageBar.curPage = this.pageBar.curPage*1 -1 ;
				    		var config = {
					    		toPageNum:this.pageBar.curPage*1 -1,
					    		vmList:this.list ,
					    		vmPageBar:this.pageBar
					    	} ;
				    		_self.query4Page(config) ;
				    	}
				    },
				    toNextPage:function(){
				    	if(this.pageBar.curPage*1<this.pageBar.pageCount*1){
				    		//触发查询操作
				    		//this.pageBar.curPage = this.pageBar.curPage*1 +1 ;
				    		var config = {
					    		toPageNum:this.pageBar.curPage*1 +1,
					    		vmList:this.list ,
					    		vmPageBar:this.pageBar
					    	} ;
				    		_self.query4Page(config) ;
				    		
				    	}
				    },
				    pageConfirm:function(){
				    	var pageOkInput =  $("#pageOkInput").val() ;
				    	//将当前页数据更新
				    	var pageOkInputNum = pageOkInput*1 ;
				    	if(pageOkInputNum>0&&pageOkInputNum<=this.pageBar.pageCount*1){
				    		 var config = {
					    		toPageNum:pageOkInput*1,
					    		vmList:this.list ,
					    		vmPageBar:this.pageBar
						     } ;
					    	_self.query4Page(config) ;
				    	}else{
				    		$("#pageOkInput").val(this.pageBar.curPage)
				    	}
				    }
			  }
		});
		//初始化页面时主动触发一次查询
		$('#mileageExchangeQueryBtn').trigger('click') ;
	}
	
	//分页查询
	/**
	 * @param toPageNum 即后台对应的curPage
	 * @param vmList  vm  list 列表
	 * @param vmPageBar   vm 分页bar
	 */
	MileageExchangeQuery.prototype.query4Page = function(config){
		var toPageNum = config.toPageNum ;
		var vmList = config.vmList ;
		var vmPageBar = config.vmPageBar ;
		
		var pageSize =   config.vmPageBar.pageSize ;
		var serverURL = this.contextPath+"/mileage/query4Page" ;
		var simpleJsonData = {"toPageNum":toPageNum,"pageSize":pageSize} ;
		//清空历史数据
		vmList.splice(0,vmList.length);  
		config.vmPageBar.curPage =0 ;
		//config.vmPageBar.pageSize =0;
		config.vmPageBar.pageCount = 0 ;
		config.vmPageBar.pgArr.splice(0,vmPageBar.pgArr.length) ;
		
		var promise = httpUtil.dealAjaxRequest4SimpleParam(serverURL,simpleJsonData) ;
		$.when(promise)
		.done(function(data){
			if(data.flag=="true"||data.flag==true){
				var pageBean = data.pageBean ;
				var list = pageBean.recordList ;
				if(list==null||list.length==0){
					$.growl.error({ message: "没有查询到符合条件的记录!" });
				}else{
			    	vmPageBar.curPage = pageBean.curPage ;
			    	vmPageBar.pageSize= pageBean.pageSize;
			    	_.each(pageBean.pageNumList,function(item){
			    		vmPageBar.pgArr.push(item) ;
			    	});
			    	vmPageBar.pageCount = pageBean.pageCount;
			   		_.each(list,function(item){
			   			vmList.push(item) ;
			   		}) ;
				}
			}else{
				$.growl.error({ message: "查询操作失败!" });
			}
		})
		.fail(function(err){
			$.growl.error({ message: "查询操作失败!" });
		}) ;
					
	}
	
	
	
	//查询方法
	MileageExchangeQuery.prototype.query = function(vmList){
		var serverURL = this.contextPath+"/mileage/query" ;
		vmList.splice(0,vmList.length);  
		var promise = httpUtil.dealAjaxRequestWithoutParam(serverURL) ;
		$.when(promise)
		.done(function(data){
			if(data.flag=="true"||data.flag==true){
				  var list = data.list ;
				  if(list==null||list.length==0){
					 	$.growl.error({ message: "没有查询到符合条件的记录!" });
				   }else{
				   		_.each(list,function(item){
				   			vmList.push(item) ;
				   		}) ;
				   }
			}else{
				$.growl.error({ message: "查询操作失败!" });
			}
		})
		.fail(function(err){
			$.growl.error({ message: "查询操作失败!" });
		}) ;
	};
	
	//批量终止，batchAbort
	MileageExchangeQuery.prototype.batchAbort = function(ids,lastMaintenanceDate,list){
			var serverURL = this.contextPath+"/mileage/batchAbort" ;
			var params = {"lastMaintenanceDate":lastMaintenanceDate,"ids":ids} ;
			var promise = httpUtil.dealAjaxRequest4SimpleParam(serverURL,params) ;
			$.when(promise).done(function(retData){
				if(checkIsTrue(retData.flag)){
					$.growl.notice({ message: "截止操作成功!" });
					_.each(list,function(item){
						var curId = item.id ;
						if(_.contains(ids,curId)){
							item.lastMaintenanceDate = lastMaintenanceDate +":59" ;
						}
					}) ;
				}else{
					$.growl.error({ message: "截止操作失败!" });
				}
			}).fail(function(err){
				$.growl.error({ message: "截止操作出错!" });
			}) ;
	} ;
	
	//删除方法
	MileageExchangeQuery.prototype.deleteById = function(id){
		var serverURL = this.contextPath+"/mileage/deleteById" ;
		var params = {"id":id} ;
		var promise = httpUtil.dealAjaxRequest4SimpleParam(serverURL,params) ;
		$.when(promise)
		.done(function(data){
			if(data.flag=='true'||data.flag==true){
				$.growl.notice({ message: "删除记录成功!" });
				//删除完成以后触发一次查询操作
				$('#mileageExchangeQueryBtn').trigger('click') ;
			}else{
				$.growl.error({ message: "删除记录失败!" });
			}
		}).fail(function(err){
			$.growl.error({ message: "操作报错!" });
		}) ;
	};
	
	var obj = new MileageExchangeQuery() ;
	obj.init() ;
}) ;