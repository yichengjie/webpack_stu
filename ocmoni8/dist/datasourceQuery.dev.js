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

	/**
	 * Created by Administrator on 2016/5/12.
	 */
	//引入项目依赖的所有css文件
	__webpack_require__(80);

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

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(20);

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(14);

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(7);

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(33);

/***/ },

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require) {
	__webpack_require__(60);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(81);
	var Headroom = __webpack_require__(82);

	var abrQuery = __webpack_require__(84);
	new abrQuery();

	var abrDelete = __webpack_require__(89);
	var abrdelete = new abrDelete();
	abrdelete.init();

	//初始化headroom插件
	var $myheader = $('#myheader');
	var headroom = new Headroom($myheader[0]);
	headroom.init();
	//});

/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(3);

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	var Headroom = __webpack_require__(83);
	module.exports = Headroom ;



/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * headroom.js v0.9.3 - Give your page some headroom. Hide your header until you need it
	 * Copyright (c) 2016 Nick Williams - http://wicky.nillia.ms/headroom.js
	 * License: MIT
	 */

	(function(root, factory) {
	  'use strict';

	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  else if (typeof exports === 'object') {
	    // COMMONJS
	    module.exports = factory();
	  }
	  else {
	    // BROWSER
	    root.Headroom = factory();
	  }
	}(this, function() {
	  'use strict';

	  /* exported features */
	  
	  var features = {
	    bind : !!(function(){}.bind),
	    classList : 'classList' in document.documentElement,
	    rAF : !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
	  };
	  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
	  
	  /**
	   * Handles debouncing of events via requestAnimationFrame
	   * @see http://www.html5rocks.com/en/tutorials/speed/animations/
	   * @param {Function} callback The callback to handle whichever event
	   */
	  function Debouncer (callback) {
	    this.callback = callback;
	    this.ticking = false;
	  }
	  Debouncer.prototype = {
	    constructor : Debouncer,
	  
	    /**
	     * dispatches the event to the supplied callback
	     * @private
	     */
	    update : function() {
	      this.callback && this.callback();
	      this.ticking = false;
	    },
	  
	    /**
	     * ensures events don't get stacked
	     * @private
	     */
	    requestTick : function() {
	      if(!this.ticking) {
	        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
	        this.ticking = true;
	      }
	    },
	  
	    /**
	     * Attach this as the event listeners
	     */
	    handleEvent : function() {
	      this.requestTick();
	    }
	  };
	  /**
	   * Check if object is part of the DOM
	   * @constructor
	   * @param {Object} obj element to check
	   */
	  function isDOMElement(obj) {
	    return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
	  }
	  
	  /**
	   * Helper function for extending objects
	   */
	  function extend (object /*, objectN ... */) {
	    if(arguments.length <= 0) {
	      throw new Error('Missing arguments in extend function');
	    }
	  
	    var result = object || {},
	        key,
	        i;
	  
	    for (i = 1; i < arguments.length; i++) {
	      var replacement = arguments[i] || {};
	  
	      for (key in replacement) {
	        // Recurse into object except if the object is a DOM element
	        if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
	          result[key] = extend(result[key], replacement[key]);
	        }
	        else {
	          result[key] = result[key] || replacement[key];
	        }
	      }
	    }
	  
	    return result;
	  }
	  
	  /**
	   * Helper function for normalizing tolerance option to object format
	   */
	  function normalizeTolerance (t) {
	    return t === Object(t) ? t : { down : t, up : t };
	  }
	  
	  /**
	   * UI enhancement for fixed headers.
	   * Hides header when scrolling down
	   * Shows header when scrolling up
	   * @constructor
	   * @param {DOMElement} elem the header element
	   * @param {Object} options options for the widget
	   */
	  function Headroom (elem, options) {
	    options = extend(options, Headroom.options);
	  
	    this.lastKnownScrollY = 0;
	    this.elem             = elem;
	    this.tolerance        = normalizeTolerance(options.tolerance);
	    this.classes          = options.classes;
	    this.offset           = options.offset;
	    this.scroller         = options.scroller;
	    this.initialised      = false;
	    this.onPin            = options.onPin;
	    this.onUnpin          = options.onUnpin;
	    this.onTop            = options.onTop;
	    this.onNotTop         = options.onNotTop;
	    this.onBottom         = options.onBottom;
	    this.onNotBottom      = options.onNotBottom;
	  }
	  Headroom.prototype = {
	    constructor : Headroom,
	  
	    /**
	     * Initialises the widget
	     */
	    init : function() {
	      if(!Headroom.cutsTheMustard) {
	        return;
	      }
	  
	      this.debouncer = new Debouncer(this.update.bind(this));
	      this.elem.classList.add(this.classes.initial);
	  
	      // defer event registration to handle browser 
	      // potentially restoring previous scroll position
	      setTimeout(this.attachEvent.bind(this), 100);
	  
	      return this;
	    },
	  
	    /**
	     * Unattaches events and removes any classes that were added
	     */
	    destroy : function() {
	      var classes = this.classes;
	  
	      this.initialised = false;
	      this.elem.classList.remove(classes.unpinned, classes.pinned, classes.top, classes.notTop, classes.initial);
	      this.scroller.removeEventListener('scroll', this.debouncer, false);
	    },
	  
	    /**
	     * Attaches the scroll event
	     * @private
	     */
	    attachEvent : function() {
	      if(!this.initialised){
	        this.lastKnownScrollY = this.getScrollY();
	        this.initialised = true;
	        this.scroller.addEventListener('scroll', this.debouncer, false);
	  
	        this.debouncer.handleEvent();
	      }
	    },
	    
	    /**
	     * Unpins the header if it's currently pinned
	     */
	    unpin : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
	        classList.add(classes.unpinned);
	        classList.remove(classes.pinned);
	        this.onUnpin && this.onUnpin.call(this);
	      }
	    },
	  
	    /**
	     * Pins the header if it's currently unpinned
	     */
	    pin : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(classList.contains(classes.unpinned)) {
	        classList.remove(classes.unpinned);
	        classList.add(classes.pinned);
	        this.onPin && this.onPin.call(this);
	      }
	    },
	  
	    /**
	     * Handles the top states
	     */
	    top : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.top)) {
	        classList.add(classes.top);
	        classList.remove(classes.notTop);
	        this.onTop && this.onTop.call(this);
	      }
	    },
	  
	    /**
	     * Handles the not top state
	     */
	    notTop : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.notTop)) {
	        classList.add(classes.notTop);
	        classList.remove(classes.top);
	        this.onNotTop && this.onNotTop.call(this);
	      }
	    },
	  
	    bottom : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.bottom)) {
	        classList.add(classes.bottom);
	        classList.remove(classes.notBottom);
	        this.onBottom && this.onBottom.call(this);
	      }
	    },
	  
	    /**
	     * Handles the not top state
	     */
	    notBottom : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.notBottom)) {
	        classList.add(classes.notBottom);
	        classList.remove(classes.bottom);
	        this.onNotBottom && this.onNotBottom.call(this);
	      }
	    },
	  
	    /**
	     * Gets the Y scroll position
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
	     * @return {Number} pixels the page has scrolled along the Y-axis
	     */
	    getScrollY : function() {
	      return (this.scroller.pageYOffset !== undefined)
	        ? this.scroller.pageYOffset
	        : (this.scroller.scrollTop !== undefined)
	          ? this.scroller.scrollTop
	          : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	    },
	  
	    /**
	     * Gets the height of the viewport
	     * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
	     * @return {int} the height of the viewport in pixels
	     */
	    getViewportHeight : function () {
	      return window.innerHeight
	        || document.documentElement.clientHeight
	        || document.body.clientHeight;
	    },
	  
	    /**
	     * Gets the physical height of the DOM element
	     * @param  {Object}  elm the element to calculate the physical height of which
	     * @return {int}     the physical height of the element in pixels
	     */
	    getElementPhysicalHeight : function (elm) {
	      return Math.max(
	        elm.offsetHeight,
	        elm.clientHeight
	      );
	    },
	  
	    /**
	     * Gets the physical height of the scroller element
	     * @return {int} the physical height of the scroller element in pixels
	     */
	    getScrollerPhysicalHeight : function () {
	      return (this.scroller === window || this.scroller === document.body)
	        ? this.getViewportHeight()
	        : this.getElementPhysicalHeight(this.scroller);
	    },
	  
	    /**
	     * Gets the height of the document
	     * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
	     * @return {int} the height of the document in pixels
	     */
	    getDocumentHeight : function () {
	      var body = document.body,
	        documentElement = document.documentElement;
	    
	      return Math.max(
	        body.scrollHeight, documentElement.scrollHeight,
	        body.offsetHeight, documentElement.offsetHeight,
	        body.clientHeight, documentElement.clientHeight
	      );
	    },
	  
	    /**
	     * Gets the height of the DOM element
	     * @param  {Object}  elm the element to calculate the height of which
	     * @return {int}     the height of the element in pixels
	     */
	    getElementHeight : function (elm) {
	      return Math.max(
	        elm.scrollHeight,
	        elm.offsetHeight,
	        elm.clientHeight
	      );
	    },
	  
	    /**
	     * Gets the height of the scroller element
	     * @return {int} the height of the scroller element in pixels
	     */
	    getScrollerHeight : function () {
	      return (this.scroller === window || this.scroller === document.body)
	        ? this.getDocumentHeight()
	        : this.getElementHeight(this.scroller);
	    },
	  
	    /**
	     * determines if the scroll position is outside of document boundaries
	     * @param  {int}  currentScrollY the current y scroll position
	     * @return {bool} true if out of bounds, false otherwise
	     */
	    isOutOfBounds : function (currentScrollY) {
	      var pastTop  = currentScrollY < 0,
	        pastBottom = currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
	      
	      return pastTop || pastBottom;
	    },
	  
	    /**
	     * determines if the tolerance has been exceeded
	     * @param  {int} currentScrollY the current scroll y position
	     * @return {bool} true if tolerance exceeded, false otherwise
	     */
	    toleranceExceeded : function (currentScrollY, direction) {
	      return Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance[direction];
	    },
	  
	    /**
	     * determine if it is appropriate to unpin
	     * @param  {int} currentScrollY the current y scroll position
	     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
	     * @return {bool} true if should unpin, false otherwise
	     */
	    shouldUnpin : function (currentScrollY, toleranceExceeded) {
	      var scrollingDown = currentScrollY > this.lastKnownScrollY,
	        pastOffset = currentScrollY >= this.offset;
	  
	      return scrollingDown && pastOffset && toleranceExceeded;
	    },
	  
	    /**
	     * determine if it is appropriate to pin
	     * @param  {int} currentScrollY the current y scroll position
	     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
	     * @return {bool} true if should pin, false otherwise
	     */
	    shouldPin : function (currentScrollY, toleranceExceeded) {
	      var scrollingUp  = currentScrollY < this.lastKnownScrollY,
	        pastOffset = currentScrollY <= this.offset;
	  
	      return (scrollingUp && toleranceExceeded) || pastOffset;
	    },
	  
	    /**
	     * Handles updating the state of the widget
	     */
	    update : function() {
	      var currentScrollY  = this.getScrollY(),
	        scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
	        toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);
	  
	      if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
	        return;
	      }
	  
	      if (currentScrollY <= this.offset ) {
	        this.top();
	      } else {
	        this.notTop();
	      }
	  
	      if(currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
	        this.bottom();
	      }
	      else {
	        this.notBottom();
	      }
	  
	      if(this.shouldUnpin(currentScrollY, toleranceExceeded)) {
	        this.unpin();
	      }
	      else if(this.shouldPin(currentScrollY, toleranceExceeded)) {
	        this.pin();
	      }
	  
	      this.lastKnownScrollY = currentScrollY;
	    }
	  };
	  /**
	   * Default options
	   * @type {Object}
	   */
	  Headroom.options = {
	    tolerance : {
	      up : 0,
	      down : 0
	    },
	    offset : 0,
	    scroller: window,
	    classes : {
	      pinned : 'headroom--pinned',
	      unpinned : 'headroom--unpinned',
	      top : 'headroom--top',
	      notTop : 'headroom--not-top',
	      bottom : 'headroom--bottom',
	      notBottom : 'headroom--not-bottom',
	      initial : 'headroom'
	    }
	  };
	  Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

	  return Headroom;
	}));

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	//var $ = require('jquery');
	var Common = __webpack_require__(85);
	var common = new Common();
	var httpClient = __webpack_require__(86);
	var list_panelHtml = __webpack_require__(87);
	var list_itemHtml = __webpack_require__(88);
	var _ = __webpack_require__(74);
	var util = __webpack_require__(70);

	function abrQuery() {
		this._init();
	}
	module.exports = abrQuery;
	abrQuery.prototype._init = function () {
		var that = this;
		//注册日期插件
		$('#effectMaxDate').datepicker({ showButtonPanel: true, clearBtn: true, yearSuffix: "", changeMonth: true, changeYear: true });
		$('#effectMinDate').datepicker({ showButtonPanel: true, clearBtn: true, yearSuffix: "", changeMonth: true, changeYear: true });
		$(document).ready(function () {
			/* 实现大写的转换，在document的节点中，若有mode='upper'的属性，则将输入值都转换成大写 */
			$('[mode=upper]').each(function () {
				$(this).bind('keyup', function () {
					$(this).val($(this).val().toUpperCase());
				});
			});

			$('#abrQueryBtn').click(function (e) {
				e.preventDefault();
				that.query();
			});
			//页面第一次加载
			$('#abrQueryBtn').trigger('click');
		});
	};

	abrQuery.prototype.query = function () {
		util.showLoading();
		var url = $('#abrQueryBtn').attr('url');
		var that = this;
		var param = this.getData();
		var ajaxing = httpClient.dealAjaxRequest4JSObj(url, param);
		$.when(ajaxing).done(function (datas) {
			util.hideLoading();
			if (datas === null) {
				window.location.reload();
				return;
			}
			if (datas.length === 0) {
				$('#abrcontent').empty();
				$.showTuiMessageDialog('没有相应搜索条件下的结果！');
				return;
			}
			that._resultData(datas);
		}).fail(function (err) {
			util.hideLoading();
			$.showTuiMessageDialog('查询出错！');
		});
	};

	//获取查询条件数据
	abrQuery.prototype.getData = function () {
		var paramTemp = {};
		paramTemp['serviceType'] = this.getServiceTypeData('serviceType'); //发布状态
		paramTemp['carrier'] = $('#carrier').val(); //航空公司
		paramTemp['subCode'] = $('#subCode').val(); //子代码
		paramTemp['effectMaxDate'] = $('#effectMaxDate').val(); //生效日期上限
		paramTemp['effectMinDate'] = $('#effectMinDate').val(); //生效日期下限
		paramTemp['dataSource'] = $('#dataSource').val(); //数据源
		paramTemp['internationalTag'] = $('#internationalTag').val(); //行程种类
		paramTemp['departmentCode'] = $('#departmentCode').val(); //部门代码
		return paramTemp;
	};

	abrQuery.prototype.getServiceTypeData = function (name) {
		var result = '';
		var array = document.getElementsByName(name);
		for (var i = 0; i < array.length; i++) {
			if (array[i].checked === true) {
				result += array[i].value;
			}
		}
		return result;
	};

	abrQuery.prototype._resultData = function (datas) {
		//var list_panelHtml ;
		//var list_itemHtml ;
		$('#abrcontent').empty();
		var abrContent = $('#abrcontent');
		var that = this;
		var $list_panel = $(list_panelHtml);
		for (var i = 0; i < datas.length; i++) {
			var abrConfig = datas[i];
			/////////////
			var id = abrConfig.id || '';
			var sequcenceNumber = abrConfig.sequcenceNumber || '';
			var serviceType = _transeServiceType(abrConfig.serviceType) || '';
			var subCode = abrConfig.subCode || '';
			var departmentCode = abrConfig.departmentCode || '';
			//////////////
			var internationalTag = _transeInternationalTag(abrConfig.internationalTag) || '';
			var effDate = abrConfig.effDate || '';
			var discDate = abrConfig.discDate || '';
			var dataSource = _transeDataSource(abrConfig.dataSource) || '';
			var tag_ctx = $('#tag_ctx').val() || '';
			///////////////
			var deleteFlag = _getDeleteFlag(abrConfig.effDate);
			var obj = { "id": id, "sequcenceNumber": sequcenceNumber, "serviceType": serviceType,
				"subCode": subCode, "departmentCode": departmentCode, "internationalTag": internationalTag,
				"effDate": effDate, "discDate": discDate, "dataSource": dataSource,
				"tag_ctx": tag_ctx, "deleteFlag": deleteFlag };
			var compiled = _.template(list_itemHtml);
			var retStr = compiled(obj);
			$list_panel.find('tbody').append(retStr);
		}
		abrContent.html($list_panel);
	};

	abrQuery.prototype._resultData2 = function (datas) {
		$('#abrcontent').empty();
		var abrContent = $('#abrcontent');
		var that = this;
		abrContent.html('');
		//var contentContainer = $('<div name="contentContainer" class="data_section markDiv"></div>');
		//var container = $('<div class="helper_float_right ocprice"></div>');
		var div = $('<div class="data_section markDiv tableLayout"></div>');
		var table = $('<table cellspacing="0" cellpadding="0" border="1"></table>');
		var th = $('<tr><th>序列号</th><th>服务类型</th><th>子代码</th>' + '<th>部门代码</th><th>行程种类</th>' + '<th>生效日期</th><th>截止日期</th><th>数据源</th><th>操作</th></tr>');
		/*<tr><th>序列号</th><th>组</th><th>子组</th><th>服务类型</th><th>子代码</th>'+
	 '<th>旅行社代码</th><th>IATA旅行社序号</th><th>部门标识</th><th>部门代码</th><th>行程种类</th>'+
	 '<th>生效日期</th><th>截止日期</th><th>数据源</th><th>操作</th></tr>*/
		var tbody = $('<tbody></tbody>');
		th.appendTo(tbody);
		for (var i = 0; i < datas.length; i++) {
			var abrConfig = datas[i];
			var id = abrConfig.id;
			var tr_head = '<tr class="border_bottom">';
			var td1 = '<td><input name="abrid" value="' + id + '"type="hidden"/>' + abrConfig.sequcenceNumber + '</td>';
			//var td2 = '<td>'+abrConfig.attributesGroup+'</td>' ;
			//var td3 = '<td>'+abrConfig.attributesSubGroup+'</td>' ;
			var td4 = '<td>' + _transeServiceType(abrConfig.serviceType) + '</td>';
			var td5 = '<td>' + abrConfig.subCode + '</td>';
			//var td6 = '<td>'+abrConfig.travelAgencyCode+'</td>' ;
			//var td7 = '<td>'+abrConfig.iataTravelAgencyCode+'</td>' ;
			//var td8 = '<td>'+abrConfig.departmentIdentifier+'</td>' ;
			var td9 = '<td>' + abrConfig.departmentCode + '</td>';
			var td10 = '<td>' + _transeInternationalTag(abrConfig.internationalTag) + '</td>';
			var td11 = '<td>' + abrConfig.effDate + '</td>';
			var td12 = '<td>' + abrConfig.discDate + '</td>';
			var td13 = '<td>' + _transeDataSource(abrConfig.dataSource) + '</td>';
			var td14 = '<td><div class="helper_float_left operate_btn">' + _showConfigDetail(id) + _getDeleteButton(abrConfig.effDate) + '</div></td>';
			var tr_tail = '</tr>';
			$(tr_head + td1 + td4 + td5 + td9 + td10 + td11 + td12 + td13 + td14 + tr_tail).appendTo(tbody);
		}
		tbody.appendTo(table);
		//table.appendTo(container);
		//container.appendTo(contentContainer);
		//$('<div class="clearfix"></div>').appendTo(contentContainer);
		//contentContainer.appendTo(abrContent);
		table.appendTo(div);
		div.appendTo(abrContent);
	};
	var _showConfigDetail = function _showConfigDetail(id) {
		var tag_ctx = $('#tag_ctx').val();
		var editDiv = '<a href="' + tag_ctx + '/abr/toAbrDatasourceUpdate?id=' + id + '" title="修改编辑" class="modify helper_float_left"></a>';
		return editDiv;
	};
	var _transeInternationalTag = function _transeInternationalTag(str) {
		if (str == 'D') {
			str = '国内';
		} else if (str == 'I') {
			str = '国际';
		}
		return str;
	};
	var _transeDataSource = function _transeDataSource(str) {
		if (str == 'OPTSVC') {
			str = 'ATPCO数据';
		} else if (str == 'TSKOC') {
			str = '航信数据';
		}
		return str;
	};
	var _transeServiceType = function _transeServiceType(str) {
		if (str == 'A') {
			str = '免费行李';
		} else if (str == 'B') {
			str = '随携行李';
		} else if (str == 'C') {
			str = '付费行李';
		} else if (str == 'P') {
			str = '预付费行李';
		} else if (str == 'E') {
			str = '禁运行李';
		} else if (str == 'F') {
			str = '运价相关';
		} else if (str == 'T') {
			str = '客票相关';
		} else if (str == 'M') {
			str = '商品相关';
		} else if (str == 'R') {
			str = '规则相关';
		}
		return str;
	};
	var _getDate = function _getDate(str) {
		var strs = str.split('-');
		var year = strs[0];
		var month = strs[1];
		var day = strs[2];
		return new Date(year, month - 1, day);
	};
	var _getDeleteButton = function _getDeleteButton(str) {
		var effDate = _getDate(str);
		var currentDate = new Date();
		if (currentDate >= effDate) {
			return '<div title="删除" class="deleteOK helper_float_left marginLeft5"></div>';
		}
		return '<div title="删除" name="abrdelete" class="delete helper_float_left marginLeft5"></div>';
	};

	var _getDeleteFlag = function _getDeleteFlag(str) {
		var effDate = _getDate(str);
		var currentDate = new Date();
		if (currentDate >= effDate) {
			return false;
		}
		return true;
	};

	//});

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(10);

/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(9);

/***/ },

/***/ 87:
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default s7list_panel\">\r\n    <div class=\"panel-body\">\r\n        <table class=\"table\">\r\n            <thead>\r\n            <tr class=\"active\">\r\n                <th>序列号</th>\r\n                <th>服务类型</th>\r\n                <th>子代码</th>\r\n                <th>部门代码</th>\r\n                <th>行程种类</th>\r\n                <th>生效日期</th>\r\n                <th>截止日期</th>\r\n                <th>数据源</th>\r\n                <th>操作</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            \r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</div>";

/***/ },

/***/ 88:
/***/ function(module, exports) {

	module.exports = "<tr>\r\n    <th>\r\n    \t<input name=\"abrid\" value=\"<%=id%>\"type=\"hidden\"/><%=sequcenceNumber%>\r\n    </th>\r\n    <td><%=serviceType%></td>\r\n    <td><%=subCode%></td>\r\n    <td><%=departmentCode%></td>\r\n    <td><%=internationalTag%></td>\r\n    <td><%=effDate%></td>\r\n    <td><%=discDate%></td>\r\n    <td><%=dataSource%></td>\r\n    <td class =\"oper_item\">\r\n        <a title=\"修改编辑\" href =\"<%=tag_ctx%>/abr/toAbrDatasourceUpdate.action?id=<%=id%>\">\r\n        \t<i class=\"glyphicon glyphicon-pencil myhand\"></i>\r\n        </a>\r\n        <%if(deleteFlag==true){%>\r\n        \t<span title=\"删除\" name=\"abrdelete\" class=\"delete\"><i class=\"glyphicon glyphicon-trash myhand marginL5\"></i></span>\r\n        <%}else{%>\r\n        \t<i class=\"glyphicon glyphicon-trash myhand marginL5 gray\"></i>\r\n        <%}%>\r\n       \r\n    </td>\r\n</tr>";

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	// 通过require引入依赖
	//var $ = require('jquery');
	var Common = __webpack_require__(85);
	var common = new Common();
	var httpClient = __webpack_require__(86);

	function abrDelete() {}
	module.exports = abrDelete;
	/**
	 * 发布按钮绑定事件
	 */
	abrDelete.prototype.init = function () {
		var _self = this;
		$(document).delegate('.delete[name=abrdelete]', 'click', function () {
			//删除s7id
			var abrid = $(this).parents('tr').find(':input[name=abrid]').attr('value');
			var $curItem = $(this).parents('tr');
			$.showTuiConfirmDialog('确认删除?', function () {
				_self.deleteById(abrid, $curItem);
			});
		});
	};

	abrDelete.prototype.deleteById = function (abrid, $curItem) {
		var param = { "id": abrid };
		var tag_ctx = $('#tag_ctx').val();
		var url = tag_ctx + '/abr/abrDatasourceDelete.action';
		var ajaxing = httpClient.dealAjaxRequest4SimpleParam(url, param);
		$.when(ajaxing).done(function (retData) {
			if (retData === null) {
				window.location.reload();
				return;
			}
			if (retData === 'SUCCESS') {
				$.showTuiSuccessDialog('删除成功！', function () {
					$curItem.remove();
				});
			} else {
				$.showTuiErrorDialog('系统异常，删除失败！');
			}
		}).fail(function (err) {
			$.showTuiErrorDialog('系统异常，删除失败！');
		});
	};
	//});

/***/ }

/******/ });