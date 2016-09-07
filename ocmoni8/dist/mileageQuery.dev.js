/*!
 * {compony travelsky-dbky ,
 *  author: yicj,
 *  email : 626659321@qq.com,
 * create-date:2016/05/05}
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//引入项目依赖的所有css文件
	__webpack_require__(98);

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(27);

/***/ },

/***/ 61:
/***/ function(module, exports) {

	module.exports = vendor_997f7dcf;

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(31);

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(29);

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(14);

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(2);

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(7);

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(33);

/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(9);

/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(17);

/***/ },

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(4);

/***/ },

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	__webpack_require__(60);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(65);
	__webpack_require__(91);
	__webpack_require__(66);
	//require('jq_growl_lib') ;
	//var Headroom = require('headroom_lib') ;
	//require('is_loading_lib') ;
	//var util = require('util_lib') ;
	var moment = __webpack_require__(95);
	var httpUtil = __webpack_require__(86);
	var _ = __webpack_require__(74);
	var util = __webpack_require__(70);

	__webpack_require__(99);
	var dateFormatStr = "YYYY-MM-DD";
	var dateTimeFormatStr = "YYYY-MM-DD HH:mm";
	var growlConfig = { info: { type: 'info', offset: { from: 'top', amount: 110 } },
		danger: { type: 'danger', offset: { from: 'top', amount: 110 } },
		success: { type: 'success', offset: { from: 'top', amount: 110 } } };

	function checkIsTrue(obj) {
		if (obj != null && (obj == true || obj == 'true')) {
			return true;
		}
		return false;
	}

	function MileageExchangeQuery() {
		this.contextPath = "";
		if (this == window) {
			throw new Error("please new an MileageExchangeQuery object to use it !");
		}
	}

	function initDateTimePicker(elemId, minDateStr) {
		//配置日期控件
		var optionObj = {};
		optionObj.dateFormat = "yy-mm-dd";
		optionObj.timeFormat = 'HH:mm';
		optionObj.timeText = "&nbsp;&nbsp;时间";
		optionObj.hourText = "&nbsp;&nbsp;时";
		optionObj.minuteText = "&nbsp;&nbsp;分";
		//optionObj.secondText = "&nbsp;&nbsp;秒" ;
		optionObj.currentText = "当前";
		optionObj.closeText = "关闭";
		optionObj.minDate = minDateStr;
		optionObj.showButtonPanel = true;
		//optionObj.showSecond = true ;
		$("#" + elemId).datetimepicker(optionObj);
	}

	/**
	 *  $.growl({ title: "Growl", message: "The kitten is awake!", url: "/kittens" });
	    $.growl.error({ message: "The kitten is attacking!" });
	    $.growl.notice({ message: "The kitten is cute!" });
	    $.growl.warning({ message: "The kitten is ugly!" });
	 */
	MileageExchangeQuery.prototype.init = function () {
		//初始化headroom插件
		//var $myheader = $('#myheader');
		//var headroom  = new Headroom($myheader[0]);
		//headroom.init();
		var _self = this;
		//初始化日期控件
		var dateStr = moment().format(dateFormatStr); //
		initDateTimePicker("lastMaintenanceDate", dateStr);
		this.contextPath = $.trim($("#contextPath").val());
		var vm = new Vue({
			el: '#app',
			data: {
				lastMaintenanceDate: '',
				list: [],
				pageBar: {
					curPage: 0,
					pageSize: 0,
					pgArr: [],
					pageCount: 0
				}
			},
			methods: {
				query: function query() {
					/**查询按钮被点击**/
					console.info('查询');
					//_self.query(this.list) ;
					var config = {
						toPageNum: 1,
						vmList: this.list,
						vmPageBar: this.pageBar
					};
					_self.query4Page(config);
				},
				backPage: function backPage() {
					/**返回按钮被点击**/
					//console.info(_self.contextPath) ;
					window.location.href = _self.contextPath + '/oc/toQueryS7UI.action';
				},
				toAddPage: function toAddPage() {
					/**新建按钮被点击**/
					window.location.href = _self.contextPath + "/mileage/toMileageExchangeAddUI.action";
				},
				deleteItem: function deleteItem(id) {
					/**删除按钮被点击*/
					$.showTuiConfirmDialog('确认删除?', function () {
						_self.deleteById(id);
					});
				},
				abort: function abort() {
					/**截止按钮被点击*/
					var flag = false;
					_.each(this.list, function (item) {
						var checkedFlag = item.checkedFlag;
						if (checkIsTrue(checkedFlag)) {
							flag = true;
						}
					});
					if (flag) {
						//var dateTimeStr = moment().format(dateTimeFormatStr) ;
						this.lastMaintenanceDate = dateStr + " 23:59";
						$('#myModal').modal('show');
					} else {
						$.showTuiErrorDialog('至少选择一条需要截止的记录!');
					}
				},
				submitAbort: function submitAbort() {
					var inputDateStr = this.lastMaintenanceDate;
					var idArrs = [];
					var checkedList = [];
					//获取所有的选中记录
					_.each(this.list, function (item) {
						var checkedFlag = item.checkedFlag;
						if (checkIsTrue(checkedFlag)) {
							checkedList.push(item);
						}
					});
					var flag = _self.checkAbortDateStr(inputDateStr, checkedList, idArrs);
					if (flag) {
						//如果验证通过
						$('#myModal').modal('hide');
						this.lastMaintenanceDate = '';
						_self.batchAbort(idArrs, inputDateStr, checkedList);
					}
				},
				checkItem: function checkItem(item) {
					var checkedFlag = item.checkedFlag;
					item.checkedFlag = !checkIsTrue(checkedFlag);
				},
				toPage: function toPage(pnum) {
					//触发查询操作
					//当前页数据更新
					//this.pageBar.curPage = pnum ;
					if (pnum != this.pageBar.curPage) {
						var config = {
							toPageNum: pnum,
							vmList: this.list,
							vmPageBar: this.pageBar
						};
						_self.query4Page(config);
					}
				},
				toPerviousPage: function toPerviousPage() {
					if (this.pageBar.curPage * 1 > 1) {
						//触发查询操作
						//this.pageBar.curPage = this.pageBar.curPage*1 -1 ;
						var config = {
							toPageNum: this.pageBar.curPage * 1 - 1,
							vmList: this.list,
							vmPageBar: this.pageBar
						};
						_self.query4Page(config);
					}
				},
				toNextPage: function toNextPage() {
					if (this.pageBar.curPage * 1 < this.pageBar.pageCount * 1) {
						//触发查询操作
						//this.pageBar.curPage = this.pageBar.curPage*1 +1 ;
						var config = {
							toPageNum: this.pageBar.curPage * 1 + 1,
							vmList: this.list,
							vmPageBar: this.pageBar
						};
						_self.query4Page(config);
					}
				},
				pageConfirm: function pageConfirm() {
					var pageOkInput = $("#pageOkInput").val();
					//将当前页数据更新
					var pageOkInputNum = pageOkInput * 1;
					if (pageOkInputNum > 0 && pageOkInputNum <= this.pageBar.pageCount * 1) {
						var config = {
							toPageNum: pageOkInput * 1,
							vmList: this.list,
							vmPageBar: this.pageBar
						};
						_self.query4Page(config);
					} else {
						$("#pageOkInput").val(this.pageBar.curPage);
					}
				}
			}
		});
		//初始化页面时主动触发一次查询
		$('#mileageExchangeQueryBtn').trigger('click');
	};

	/**手动校验截止日期是否合法*/
	MileageExchangeQuery.prototype.checkAbortDateStr = function (inputDateStr, checkedList, idArrs) {
		if (inputDateStr == '') {
			$.bootstrapGrowl("截止日期不能为空!", growlConfig.danger);
			return false;
		} else {
			//验证日期格式是否合法
			var ttt1 = util.isDateTimeOC(inputDateStr);
			if (!ttt1) {
				//如果日期格式不合法
				$.bootstrapGrowl("时间格式不合法!", growlConfig.danger);
				return false;
			}
			//日期格式合法时
			var isBiggerThanCurrent = util.isBiggerDateTimeThanCurrentNextHour(inputDateStr);
			if (!isBiggerThanCurrent) {
				$.bootstrapGrowl("截止日期必须大于下一小时0分!", growlConfig.danger);
				return false;
			} else {
				var allBiggerFirstDateFlag = true;
				//截止日期要大于所有的生效日期
				_.each(checkedList, function (item) {
					var curfirstDateStr = item.firstMaintenanceDate;
					//源字符串是带秒的，所以要把后面的秒截取掉
					var tmpStr = curfirstDateStr.substring(0, curfirstDateStr.length - 3);
					//截止日期大于所有的生效日期
					var tttFlag = util.isBiggerDateTimeThan(inputDateStr, tmpStr);
					if (!tttFlag) {
						//如果存在生效日期大于截止日期的记录，则flag= false
						allBiggerFirstDateFlag = false;
					}
					idArrs.push(item.id);
				});
				//只有这一种情况返回true
				if (allBiggerFirstDateFlag) {
					return true;
				} else {
					idArrs.splice(0, idArrs.length);
					$.bootstrapGrowl("截止日期必须大于所选记录的生效日期!", growlConfig.danger);
					return false;
				}
			}
		}
	};

	//分页查询
	/**
	 * @param toPageNum 即后台对应的curPage
	 * @param vmList  vm  list 列表
	 * @param vmPageBar   vm 分页bar
	 */
	MileageExchangeQuery.prototype.query4Page = function (config) {
		//util.showLoading() ;
		var toPageNum = config.toPageNum;
		var vmList = config.vmList;
		var vmPageBar = config.vmPageBar;

		var pageSize = config.vmPageBar.pageSize;
		var serverURL = this.contextPath + "/mileage/query4Page.action";
		var simpleJsonData = { "toPageNum": toPageNum, "pageSize": pageSize };
		//清空历史数据
		vmList.splice(0, vmList.length);
		config.vmPageBar.curPage = 0;
		//config.vmPageBar.pageSize =0;
		config.vmPageBar.pageCount = 0;
		config.vmPageBar.pgArr.splice(0, vmPageBar.pgArr.length);

		var promise = httpUtil.dealAjaxRequest4SimpleParam(serverURL, simpleJsonData);
		$.when(promise).done(function (data) {
			//util.hideLoading() ;
			if (data.flag == "true" || data.flag == true) {
				var pageBean = data.pageBean;
				var list = pageBean.recordList;
				if (list == null || list.length == 0) {
					//$.growl.error({ message: "没有查询到符合条件的记录!" });
					$.bootstrapGrowl("没有查询到符合条件的记录!", growlConfig.danger);
				} else {
					vmPageBar.curPage = pageBean.curPage;
					vmPageBar.pageSize = pageBean.pageSize;
					_.each(pageBean.pageNumList, function (item) {
						vmPageBar.pgArr.push(item);
					});
					vmPageBar.pageCount = pageBean.pageCount;
					_.each(list, function (item) {
						vmList.push(item);
					});
				}
			} else {
				//$.growl.error({ message: "查询操作失败!" });
				$.bootstrapGrowl("查询操作失败!", growlConfig.danger);
			}
		}).fail(function (err) {
			//util.hideLoading() ;
			//$.growl.error({ message: "查询操作失败!" });
			$.bootstrapGrowl("查询操作失败!", growlConfig.danger);
		});
	};

	//查询方法
	/*MileageExchangeQuery.prototype.query = function(vmList){
		var serverURL = this.contextPath+"/mileage/query.action" ;
		vmList.splice(0,vmList.length);  
		var promise = httpUtil.dealAjaxRequestWithoutParam(serverURL) ;
		$.when(promise)
		.done(function(data){
			if(data.flag=="true"||data.flag==true){
				  var list = data.list ;
				  if(list==null||list.length==0){
					  //$.growl.error({ message: "没有查询到符合条件的记录!" });
					  $.bootstrapGrowl("没有查询到符合条件的记录!",growlConfig.danger) ;
				   }else{
				   		_.each(list,function(item){
				   			vmList.push(item) ;
				   		}) ;
				   }
			}else{
				//$.growl.error({ message: "查询操作失败!" });
				$.bootstrapGrowl("查询操作失败!",growlConfig.danger) ;
			}
		})
		.fail(function(err){
			//$.growl.error({ message: "查询操作失败!" });
			$.bootstrapGrowl("查询操作失败!",growlConfig.danger) ;
		}) ;
	};*/

	//批量终止，batchAbort
	MileageExchangeQuery.prototype.batchAbort = function (ids, lastMaintenanceDate, list) {
		var serverURL = this.contextPath + "/mileage/batchAbort.action";
		var params = { "lastMaintenanceDate": lastMaintenanceDate, "ids": ids };
		var promise = httpUtil.dealAjaxRequest4SimpleParam(serverURL, params);
		$.when(promise).done(function (retData) {
			if (checkIsTrue(retData.flag)) {
				//$.growl.notice({ message: "截止操作成功!" });
				$.bootstrapGrowl("截止操作成功!", growlConfig.success);
				_.each(list, function (item) {
					var curId = item.id;
					if (_.contains(ids, curId)) {
						item.lastMaintenanceDate = lastMaintenanceDate + ":59";
					}
				});
			} else {
				//$.growl.error({ message: "截止操作失败!" });
				$.bootstrapGrowl("截止操作失败!", growlConfig.danger);
			}
		}).fail(function (err) {
			//$.growl.error({ message: "截止操作出错!" });
			$.bootstrapGrowl("截止操作失败!", growlConfig.danger);
		});
	};

	//删除方法
	MileageExchangeQuery.prototype.deleteById = function (id) {
		console.info('id : ' + id);
		var serverURL = this.contextPath + "/mileage/deleteById.action";
		var params = { "id": id };
		var promise = httpUtil.dealAjaxRequest4SimpleParam(serverURL, params);
		$.when(promise).done(function (data) {
			if (data.flag == 'true' || data.flag == true) {
				//$.growl.notice({ message: "删除记录成功!" });
				$.bootstrapGrowl("删除记录成功!", growlConfig.success);
				//删除完成以后触发一次查询操作
				//$('#mileageExchangeQueryBtn').trigger('click') ;
				$('#mileageExchangeQueryBtn').trigger('click');
			} else {
				//$.growl.error({ message: "删除记录失败!" });
				$.bootstrapGrowl("删除记录失败!", growlConfig.danger);
			}
		}).fail(function (err) {
			//$.growl.error({ message: "操作报错!" });
			$.bootstrapGrowl("操作报错!", growlConfig.danger);
		});
	};

	var obj = new MileageExchangeQuery();
	obj.init();
	//}) ;

/***/ },

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(25);

/***/ }

/******/ });