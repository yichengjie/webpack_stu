/*! This file is created by yicj, email : 626659321@qq.com */
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var main = __webpack_require__(1) ;
	main.init() ;





/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		//var pathStr = require.resolve('src/main') ;
		//console.info("path : " + pathStr) ;
		__webpack_require__(2) ;
		__webpack_require__(8) ;
		__webpack_require__(11) ;
		__webpack_require__(49) ;
		module.exports = {
	 		init: function(){
				angular.element(document).ready(function() {
				    angular.bootstrap(document, ['app']);
					pageLoadComplete() ;
				});
	 		}
	 	};
		
	 	function pageLoadComplete (){
	 		$("body").addClass("helper_background_color1") ;
			$("#loading").addClass('hidden') ;
			$("#EditMainBoxDiv").removeClass('hidden') ;
			$("#myheader").removeClass('hidden') ;
	 	}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(5);
	var tui_dialog = __webpack_require__(7);
	module.exports = tui_dialog;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var tui_dialog = __webpack_require__(4);
	module.exports = tui_dialog;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*!
	 * tui核心基础组件
	 * 2013-12-03 增加了isMobile方法，用于判断浏览器是否在ios的移动端
	 * 2014-02-08 修改了win8下的IE11判断方法。
	 */
	;(function( $, undefined ) {

	// prevent duplicate loading
	// this is only a problem because we proxy existing functions
	// and we don't want to double proxy them
	$.tui = $.tui || {};
	if ( $.tui.version ) {
		return "1.5.0" ;
	}
	if(!window.console){
		window.console={
			log:function(e){return ;},
			warn:function(e){return;}
		};
	}
	$.extend( $.tui, {
		version: "1.5.0",//版本控制，在前端eico上线时，发布1.0版本。每个功能修改，测试通过后，发布小数点后一位版本
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91, // COMMAND
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93, // COMMAND_RIGHT
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91 // COMMAND
		}
	});

	// plugins
	$.fn.extend({
		//propAttr: $.fn.prop || $.fn.attr,
		_focus: $.fn.focus,//保留原来jquery的focus方法。
		//从新改写focus方法。扩展了jquery focus的方法。传入延迟多长时间，执行函数
		tuiFocus: function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				this._focus.apply( this, arguments );
		},
	 //获取设置滚动属性的 父元素
	 //curCSS取得当前的css的值，属于jquery内部的函数，没有在api中体现 // DEPRECATED in 1.3, Use jQuery.css() instead jQuery.curCSS = jQuery.css;
	 //// 读取样式值css: function( elem, name, extra )  jQuery.css() 
		tuiScrollParent: function() {
			var scrollParent;
		if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {//ie同时相对定位或者绝对定位
				scrollParent = this.parents().filter(function() {
					return (/(relative|absolute|fixed)/).test($.curCSS(this,'position',1)) && (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));//fucntion里面的函数，当前的css是否有定位和滚动
				}).eq(0);
			} else {
				scrollParent = this.parents().filter(function() {
					return (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
				}).eq(0);
			}
			
			return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;//如果是fixed，不找父元素，无论他有没有
		},
	  //设置或获取元素的垂直坐标
		tuiZIndex: function( zIndex ) {
			if ( zIndex !== undefined ) {
				return this.css( "zIndex", zIndex );
			}

			if ( this.length ) {
				var elem = $( this[ 0 ] ), position, value;
				while ( elem.length && elem[ 0 ] !== document ) {
					// Ignore z-index if position is set to a value where z-index is ignored by the browser
					// This makes behavior of this function consistent across browsers
					// WebKit always returns auto if the element is positioned
					position = elem.css( "position" );
					if ( position === "absolute" || position === "relative" || position === "fixed" ) {
						// IE returns 0 when zIndex is not specified
						// other browsers return a string
						// we ignore the case of nested elements with an explicit value of 0
						// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
						value = parseInt( elem.css( "zIndex" ), 10 );
						if ( !isNaN( value ) && value !== 0 ) {
							return value;
						}
					}
					elem = elem.parent();//不断循环找父元素，可以取得父元素的zindex
				}
			}

			return 0;
		},
	 //设置元素不支持被选择
		tuiDisableSelection: function() {
			return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
				".tui-disableSelection", function( event ) {
					event.preventDefault();
				});
		},
	 //设置元素支持被选择
		tuiEnableSelection: function() {
			return this.unbind( ".tui-disableSelection" );
		}
	});//$.fn.extend结束
	//不需要调用，全局的执行从新定义了innerHeight、innerWidth、outerHeight、outerWidth的方法，可以设置上面的值
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),//设置css的名称
			orig = {//系统原来的方法
				innerWidth: $.fn.innerWidth,//包括补白不包括边框
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,//补白不包括边框
				outerHeight: $.fn.outerHeight
			};
	     //返回需要设置的值，是当前元素padding,border上left right top  bottom的值
		function reduce( elem, size, border, margin ) {
			$.each( side, function() {//side是如果宽度是left right，高度是top bottom,就是调整padding,border上left right top  bottom的值
				size -= parseFloat( $.curCSS( elem, "padding" + this, true) ) || 0;
				if ( border ) {
					size -= parseFloat( $.curCSS( elem, "border" + this + "Width", true) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.curCSS( elem, "margin" + this, true) ) || 0;
				}
			});
			return size;
		}
	     //从新定义，允许设置值。通过更改传入元素css的"Width", "Height"的值来达到目的， 
		$.fn[ "tuiInner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}
	        //inner,仅仅是补白 padding的距离
			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};
	    //outer,是补白和边框，如果设置margin了，就加上margin的距离
		$.fn[ "tuiOuter" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});//each结束

	// 内部方法，下面extend会用
	function focusable( element, isTabIndexNotNaN ) {
		var nodeName = element.nodeName.toLowerCase();
		if ( "area" === nodeName ) {
			var map = element.parentNode,
				mapName = map.name,
				img;
			if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
				return false;
			}
			img = $( "img[usemap=#" + mapName + "]" )[0];
			return !!img && visible( img );
		}
		return ( /input|select|textarea|button|object/.test( nodeName )
			? !element.disabled
			: "a" == nodeName
				? element.href || isTabIndexNotNaN
				: isTabIndexNotNaN)
			// the element and all of its ancestors must be visible
			&& visible( element );
	}
	//内部方法
	function visible( element ) {
		return !$( element ).parents().andSelf().filter(function() {
			return $.curCSS( this, "visibility" ) === "hidden" ||
				$.expr.filters.hidden( this );
		}).length;
	}
	//jQuery.expr[":"] = jQuery.expr.filters; 扩展jQuery.expr.filters 的筛选方法，在jquery-1.4.1.js中有其他方法
	$.extend( $.expr[ ":" ], {
		data: function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

		focusable: function( element ) {
			return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
		},

		tabbable: function( element ) {
			var tabIndex = $.attr( element, "tabindex" ),
				isTabIndexNaN = isNaN( tabIndex );
			return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
		}
	});
	// 支持信息，扩展support方法
	$(function() {
		var body = document.body,
			div = body.appendChild( div = document.createElement( "div" ) );

		// access offsetHeight before setting the style to prevent a layout bug
		// in IE 9 which causes the elemnt to continue to take up space even
		// after it is removed from the DOM (#8026)
		div.offsetHeight;

		$.extend( div.style, {
			minHeight: "100px",
			height: "auto",
			padding: 0,
			borderWidth: 0
		});

		$.support.minHeight = div.offsetHeight === 100;
		$.support.selectstart = "onselectstart" in div;

		// set display to none to avoid a layout bug in IE
		// http://dev.jquery.com/ticket/4014
		body.removeChild( div ).style.display = "none";
	});
	//自己补充的方法，与原来的jquer ui没有关系。
	// 由于win8下的IE11的userAgent字符串变了，所以isIE,isIE11这两个方法的判断依据都需要修改。
	$.extend($.tui,{
		isIE:function(){
		   return /MSIE (\d)\./i.test(navigator.userAgent) || /Trident/i.test(navigator.userAgent); //IE浏览器
			},
		isIE6:function(){
		   return /MSIE (\d)\./i.test(navigator.userAgent) && parseInt(RegExp.$1) == 6;
		   },
		isIE7:function(){
			return /MSIE (\d)\./i.test(navigator.userAgent) && parseInt(RegExp.$1) == 7;
		   },
		isIE8:function(){
			return /MSIE (\d)\./i.test(navigator.userAgent) && parseInt(RegExp.$1) == 8;
		   },
		isIE9:function(){
		   return /MSIE (\d)\./i.test(navigator.userAgent) && parseInt(RegExp.$1) == 9;
		   },
		isIE10:function(){
		   return /MSIE (\d*)\./i.test(navigator.userAgent) && parseInt(RegExp.$1) == 10;
		   },
	    isIE11:function(){
		   return /rv:(\d*)/i.test(navigator.userAgent) && parseInt(RegExp.$1) == 11;
		   },
		isIE678:function(){
		   return /MSIE (\d)\./i.test(navigator.userAgent) && parseInt(RegExp.$1) < 9;
		   },
		isFirefox:function(){
		   return /firefox\/([\d.]+)/i.test(navigator.userAgent);
		   },
		isChrome:function(){
		   return /chrome\/([\d.]+)/i.test(navigator.userAgent);
		   },
		isSafari:function(){
		   return /safari\/([\d.]+)/i.test(navigator.userAgent);
		   },
		isMobile:function (){//is browser in ipad, iphone, ipod, itouch
			return /ipad|ipod|itouch|iphone/i.test(navigator.userAgent.toLowerCase()) ? true : false;
			},
		showMask:function(maskId,zIndex,top,left,appendObject,eventType,eventFunction,addClass){//显示遮罩，可以给遮罩上绑定事件
			var $doc=$(document);
			var $mask;
			if($('#'+maskId).length<1){//如果没有遮罩
				var maskHTML='<div id="'+maskId+'"style="position:absolute;z-index:'+zIndex+';top:'+top+'px;left:'+left+'px;"></div>';
				$mask= $(maskHTML).appendTo(appendObject);
				if(addClass){
					$mask.addClass(addClass);
				}
			}else {$mask=$('#'+maskId);}
			$mask.css({width:$doc.width()+'px',height:$doc.height()+'px'});
			$mask.show();//显示遮罩层，由于可能是已经存在并且隐藏了。
			$('#'+maskId).off(eventType).on(eventType,eventFunction);//bind事件结束
			return $mask;
			}//showMask方法结束			
		});//自己补充的方法结束
	})( jQuery );

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var tui_drag = __webpack_require__(6);
	module.exports = tui_drag;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
	 * tsDrag是GUI项目中的拖拽插件，该插件基于jquery开发，在jquery原始方法中添加拖拽功能。可以通过参数进行实时修改。
	 * 该拖拽插件支持一般的拖拽和特殊拖拽，用于各类拖拽的情况。
	 * Copyright: Copyright (c) 2012                       
	 * Company: 中国民航信息网络股份有限公司               
	 * @author  马驰                  
	 * @version 1.0                     
	 * @see                                                
	 *	HISTORY                                            
	 * 2012-4-13 创建文件
	 * 2012-4-16 版本更新，添加了proxy参数，允许设定拖动的模式，如果为clone，则拖动clone的元素，如果为function，则拖动函数返回的jquery对象
	 * 2012-4-20 修改了程序结构，由调用者的jquery对象保存参数，并可以根据参数实时对部分属性进行修改。
	 * 2012-5-15 版本更新，将拖拽层在初始化中设置position的操作放置在鼠标按下事件中。添加了onFinshed回调函数
	 * 2012-6-13 版本更新，修改了定位细节和点击未拖动时坐标错误的bug
	 * 2012-9-21 版本更新,onBeforeDrag改名为onReadyDrag,tsDragMask改为tuiDragMask
	 * 2012-9-26 版本更新,by 党会建，针对代理proxy的方式进行修改。默认情况clone,创建在当前元素的同级下，不再是body下。
	                     加上proxy:{$appendTo:"body",cssText:{}}//允许传如创建的对象，和代理的样式
	 * 2012-10-30 版本更新，修正了错误的事件命名空间。修改了事件的绑定方式。
	 * 2013-01-25 版本更新，添加了解除绑定拖拽的方法。
	 * 2013-07-23 版本更新，修正了proxy参数中回调函数的$drag上下文
	 * 2013-10-10 1.0，删除$.browser方法
	 *
	 */
	// JavaScript Document
	;(function(){
		//取消绑定拖拽。
		$.fn.tuiOffDrag=function(){
			var $this=$(this);
			return $this.off('.tuiDrag').css({cursor:'default'});
		}
		$.fn.tuiDrag=function(){
			var _self=this;//调用者
			var _defaults = {//默认参数
				handle:null,//默认为null，如果为null，则代表拖动自己，如果不为空，则可以指定jQuery对象拖动
				cursor:"move",//移动时，鼠标的指针样式
				isFixed:false,//是否是fixed
				dragRange:'auto',//可拖拽的范围设置，如果为auto，则说明可拖拽的区域由系统默认的全屏范围来定，如果为其他值，则由dragableRangeX和dragableRangeY来确定。使用 dragableRangeX dragableRangeY，置成空吧
				dragableRangeX:[0,1000],//可拖拽的范围X值
				dragableRangeY:[0,1000],//可拖拽的方位y值
				onReadyDrag:null,//回调函数，是在开始拖拽之前的时候，执行的方法
				onStartDrag:null,//回调函数，点击开始拖拽的时候，执行的方法
				onDrop:null,//回调函数，当释放拖拽的时候，执行的方法，两个参数，finalX和finalY，分别为移动后的左上角坐标
				onDraging:null,//回调函数，执行拖拽时的方法，两个参数，finalX和finalY，分别为移动后的左上角坐标
				onFinshed:null,//回调函数，在所有拖拽事件完成后调用的方法，两个参数，finalX和finalY，分别为移动后左上角坐标
				zIndex:11005,//要拖拽的遮罩层的z-index
				proxy:null,//string,function类型，如果为'clone',则创建一个拖动元素的副本进行拖动，如果为function，则function必须要返回一个jquery对象来进行拖拽代理对象
				revert:false,//是否还原，如果为true，则在鼠标松开的时候，返回之前拖动的位置
				revertTime:300,//如果revert=true,则会出现一个过渡的移动动画
				disabled:false//是否可以拖拽，如果为true，则不可拖拽
			};
			var isIE=$.tui.isIE; //IE浏览器
			var isIE6=$.tui.isIE6;//是否是IE6
			//判断参数类型,可以进行修改-------------------------------------------------------------
			//在拖拽过程中进行修改使用（,,）传递
			if(arguments.length>=1&&typeof(arguments[0])==='string'&&this.length==1){//如果该方法参数是修改，则进行修改
				if(arguments.length==2){//修改参数
					var value=arguments[1];//修改的值
					var label=arguments[0];
					var dragOption=this.data('dragOption');
					switch(label){
						case 'dragableRangeX':
							if(!dragOption) return;
							var minDragableX=value[0]||0;
							var maxDragableX=value[1]||0;
							maxDragableX=(maxDragableX>=minDragableX)?maxDragableX:minDragableX;
							dragOption.dragableRangeX=[minDragableX,maxDragableX];
							dragOption.dragRange='default';
							$(this).data('dragOption',dragOption);
							return this;
						case 'dragableRangeY':
							if(!dragOption) return;
							var minDragableY=value[0]||0;
							var maxDragableY=value[1]||0;
							maxDragableY=(maxDragableY>=minDragableY)?maxDragableY:minDragableY;
							dragOption.dragableRangeY=[minDragableY,maxDragableY];
							dragOption.dragRange='default';
							$(this).data('dragOption',dragOption);
							return this;
						case 'dragRange':
							if(!dragOption) return;
							if(value=='auto'){
								dragOption.dragRange='auto';
								$(this).data('dragOption',dragOption);
								return this;
							}
							return this;
						case 'disabled':
							if(!dragOption) return;
							var $handle=(dragOption.handle instanceof jQuery)?dragOption.handle:$(dragOption.handle);//如果handle不是jquery对象，则尝试创建jquery对象
							if(value){//关闭拖拽
								$handle.css({cursor:'auto'});
								dragOption.disabled=true;
								$(this).data('dragOption',dragOption);
							}else{
								$handle.css({cursor:dragOption.cursor});
								dragOption.disabled=false;
								$(this).data('dragOption',dragOption);
							}
							return this;
						case 'revert':
							if(!dragOption) return;
							var dragOption=this.data('dragOption');
							dragOption.revert=value;
							$(this).data('dragOption',dragOption);
							return this;
					}
				}
			}
			//----------------------------------------------------------
			var dragOption = $.extend({},_defaults);
			for(var i=0;i<arguments.length;i++){//读取多个参数
				dragOption=$.extend(dragOption,arguments[i]);
			}
			this.data('dragOption',dragOption);//将配置参数放置在
			return this.each(function(){
				var $drag=$(this);//要拖动的对象
				var $handle;//要拖动对象的载体
				var source={};//用于记录在鼠标拖动之前鼠标的位置，用于在拖动过程中，得到鼠标移动的位移差，从而使窗口移动，这个方法避免了无法获得鼠标距离窗口的相对距离
				var $dragMask;//用于拖拽的遮罩层对象
				var minDragableX;//拖拽的边界横向最小值
				var minDragableY;//拖拽的边界增项最小值
				var maxDragableX;//拖拽的边界横向最大值
				var maxDragableY;//拖拽的边界增项最大值
				var finalX=0;//移动后的最终x坐标
				var finalY=0;//移动后的最终y坐标
				
				var $proxyDrag;//要拖拽的代理拖拽容器
				
				if(dragOption.handle==null){//默认为本身拖拽
					$handle=$drag;
				}else{
					$handle=(dragOption.handle instanceof jQuery)?dragOption.handle:$(dragOption.handle);//如果handle不是jquery对象，则尝试创建jquery对象
				}
				var $doc=$(document);
					
				$handle.off('mousedown.tuiDrag').on('mousedown.tuiDrag',function(event){
					event.stopPropagation();
					dragOption=$drag.data('dragOption');
					var disabled=dragOption.disabled;
					if(disabled){return;}//如果不能拖拽，那么直接
					moveReady(event);//拖动的准备
					if(typeof(dragOption.onStartDrag)==='function'){//执行回调函数
						dragOption.onStartDrag.call($drag);
					}
				});
				dragOption.disabled?'':$handle.css({cursor:dragOption.cursor});//如果可以拖拽，则修改鼠标图标
				//准备拖动函数
				function moveReady(event){
					//计算拖拽范围
					if(typeof(dragOption.onReadyDrag)==='function'){//执行回调函数
						dragOption.onReadyDrag.call($drag,event);
					}
					if($drag.css('position')!='fixed'&&$drag.css('position')!='absolute'&&$drag.css('position')!='relative'){//如果这个容器不是fixed或者absolute，则需要置成absolute才能移动
						$drag.css({position:'absolute'});
					}
					dragOption=$drag.data('dragOption');
					if(dragOption.dragRange=='auto'){//如果拖拽的范围是自动的
						if($drag.css('position')=='fixed'){//fixed的边界和absolute的边界不同,这是一般情况下的fixed
							maxDragableX=$(window).width()-$drag.width()-4;//可拖拽的右边界,左边界为0
							maxDragableY=$(window).height()-$drag.height()-4;//可拖拽的下边界，上边界为0
						}else if(dragOption.isFixed&&isIE6){
							maxDragableX=$(window).width()+$(document).scrollLeft()-$drag.width()-4;//可拖拽的右边界,算上滚动条的位置,左边界为0
							maxDragableY=$(window).height()+$(document).scrollTop()-$drag.height()-4;//可拖拽的下边界，算上滚动条的位置，上边界为0
						}else{
							maxDragableX=$(document).width()-$drag.width();//可拖拽的右边界,左边界为0
							maxDragableY=$(document).height()-$drag.height();//可拖拽的下边界，上边界为0
						}
						minDragableX=0;
						minDragableY=0;
					}else{//如果拖动的范围是指定的
						minDragableX=dragOption.dragableRangeX[0]||0;
						minDragableY=dragOption.dragableRangeY[0]||0;
						maxDragableX=dragOption.dragableRangeX[1]||0;
						maxDragableY=dragOption.dragableRangeY[1]||0;
						maxDragableX=(maxDragableX>=minDragableX)?maxDragableX:minDragableX;
						maxDragableY=(maxDragableY>=minDragableY)?maxDragableY:minDragableY;
					}
					
					//alert(minDragableX)
					event.preventDefault?event.preventDefault():event.returnValue=false;//防止浏览器默认行为，在IE下，为returnValue
					//if($drag.css('position')=='fixed'){alert($(document).scrollTop())}
					source.ox=event.pageX;
					source.oy=event.pageY;
					//拖动准备函数，在鼠标按下时，做拖动的准备
					source.dragTop=parseInt($drag.position().top);//记录下需要移动的窗口的原始top
					source.dragLeft=parseInt($drag.position().left);//记录下需要移动的窗口的原始left
					finalX=source.dragLeft;
					finalY=source.dragTop;
					//首先将初始的位置设置好，避免造成在用户点击之后没有拖动就释放了。这样目标会移动到0,0位置。因此要避免这个问题
					if($('#tuiDragMask').length<1){//如果没有遮罩层
						var dragMaskHTML='<div id="tuiDragMask" style="position:absolute;z-index:'+dragOption.zIndex+';top:0px;left:0px;"><div>';//为防止在拖拽的时候，鼠标移动到iframe中，因此在最上层添加一层mask，用于拖拽
						$dragMask=$(dragMaskHTML).appendTo('body');
					}else{
						$dragMask=$('#tuiDragMask');
					}
					$dragMask.css({width:$(document).width()+'px',height:$(document).height()+'px',cursor:dragOption.cursor});
					$dragMask.show();//显示遮罩层，由于可能是已经存在并且隐藏了。
					//$('body').append('<div style="position:absolute;width:1000px;height:500px;top:0px;left:0px;z-index:11001;border:1px solid blue;"></div>')
					//对拖拽的代理进行设定
					if(typeof(dragOption.proxy)==='function'){//通过自定函数创建代理拖拽容器
						$proxyDrag=dragOption.proxy.call($drag);
						if(!($proxyDrag instanceof jQuery)){
							window.console&&console.warn("proxy is a function but not return a jquery instance");
							return false;
						}
						if($proxyDrag.css('position')!='fixed'&&$proxyDrag.css('position')!='absolute'&&$proxyDrag.css('position')!='relative'){//如果这个容器不是fixed或者absolute，则需要置成absolute才能移动
							$proxyDrag.css({position:'absolute'});
						}
						var pX=$drag.offset().left;
						var pY=$drag.offset().top;
						$proxyDrag.css({//将代理拖拽容器的坐标设定为当前的坐标
							left:pX+'px',
							top:pY+'px'
						});
					}else if(dragOption.proxy==='clone'){
						$proxyDrag=$drag.clone();
						$proxyDrag.appendTo($drag.parent());//默认创建在同级
					}else if(dragOption.proxy&&typeof(dragOption.proxy)==='object'){
						var $appendTo=dragOption.proxy["$appendTo"];
						$proxyDrag=$drag.clone();
						$proxyDrag.appendTo($appendTo);
						$proxyDrag.css(dragOption.proxy["cssText"]);
						//更改位置的值
						var $dragParentOffset=$drag.parent().offset();
						var topDiff=$appendTo.offset().top-$dragParentOffset.top;
						var leftDiff=$appendTo.offset().left-$dragParentOffset.left;
						source.dragTop=parseInt($drag.position().top-topDiff);//记录下需要移动的窗口的原始top
					    source.dragLeft=parseInt($drag.position().left-leftDiff);//记录下需要移动的窗口的原始left
						finalX=source.dragLeft;
						finalY=source.dragTop;
						$proxyDrag.css({//设定位置
							left:finalX+'px',
							top:finalY+'px'
						});
					}else {
						$proxyDrag=$drag;
					}
					$doc.off('mousemove.tuiDrag').on('mousemove.tuiDrag',moveLayer);//鼠标移动时的事件
					$doc.off('mouseup.tuiDrag').on('mouseup.tuiDrag',moveUp);//鼠标抬起时的事件
				}
				//移动函数
				function moveLayer(event){
					dragOption=$drag.data('dragOption');
					event.preventDefault?event.preventDefault():event.returnValue=false;//防止浏览器默认行为，在IE下，为returnValue
					if($proxyDrag.css('position')=='fixed'){//如果是fixed，则需要将滚动条的位置去掉
						finalX=(event.pageX-$(document).scrollLeft()-source.ox)+source.dragLeft;
						finalY=(event.pageY-$(document).scrollTop()-source.oy)+source.dragTop;
					}else{//其他情况
						finalX=(event.pageX-source.ox)+source.dragLeft;
						finalY=(event.pageY-source.oy)+source.dragTop;
					}
					//判断移动是否出界了
					finalX=(finalX<minDragableX?minDragableX:finalX);
					finalX=(finalX>maxDragableX?maxDragableX:finalX);
					finalY=(finalY<minDragableY?minDragableY:finalY);
					finalY=(finalY>maxDragableY?maxDragableY:finalY);
					$proxyDrag.css({//设定位置
						left:finalX+'px',
						top:finalY+'px'
					});
					//$('#info').html(maxDragableX)
					if(typeof(dragOption.onDraging)==='function'){//执行回调函数
						dragOption.onDraging.call($proxyDrag,finalX,finalY,event);
					}
				}
				//移动结束
				function moveUp(event){
					if(typeof(dragOption.onDrop)==='function'){//执行回调函数
						dragOption.onDrop.call($proxyDrag,finalX,finalY);
					}
					dragOption=$drag.data('dragOption');
					$dragMask.remove();//清空拖拽的遮罩层
					if(dragOption.revert){
						$proxyDrag.animate({
							top:source.dragTop,//记录下需要移动的窗口的原始top
							left:source.dragLeft
						},dragOption.revertTime);
					}else{
						$proxyDrag.css({
							left:finalX+'px',
							top:finalY+'px'
						});
					}
					if($drag==$proxyDrag){}
					else{
						$proxyDrag.animate({left:0},0,function(){$(this).remove()});//在移动后销毁该对象
					}
					$doc.off('mousemove.tuiDrag',moveLayer).off('mouseup.tuiDrag',moveUp);//解除绑定
					if(typeof(dragOption.onFinshed)==='function'){//执行拖拽结束的回调函数
						dragOption.onFinshed.call($proxyDrag,finalX,finalY,event);
					}
				}
			});
		};
	})($);

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**                                                    
	 * tuiDialog在GUI项目中，负责弹出提示信息等功能，从大类型上划分，分为窗口和消息提示框。每个类型中分为多个小的类型，具体请见$.tui.tuiDialogDefault方法说明。
	 * 弹出框支持position:fixed样式，但是该样式在ie6中，效果同absolute，为保证ie6下有这个效果，将在ie6下的窗口position设定为absolute，并在window上绑定了scroll事件，进行重新计算
	 * showTuiInfoDialog方法的回调函数是第四个参数，要与其他方法区分开                       
	 * Copyright: Copyright (c) 2012                       
	 * Company: 中国民航信息网络股份有限公司               
	 * @author  马驰                  
	 * @version 0.10.18         
	 * @see                                                
	 *	HISTORY                                            
	 * 2012-3-29下午04:08:08 创建文件
	 * 2012-3-30 更新版本 添加了标题栏的显示和标题栏中关闭按钮的实现，可以通过参数控制。
	 * 2012-3-31 对关闭方法进行了修改，在关闭窗口后，窗口中的内容全部清空，可以节省资源。
	 *  遮罩层宽度重新进行了修改，在IE6下，将减少22px，以避免出现不必要的滚动条
	 *  修改弹出窗口位置方法，如果弹出框的top为负值，说明弹出框上边超出屏幕范围，这是不允许的。必须保证弹出框的上边框显示出来
	 * 2012-4-01 修改了确定等按钮出发事件的顺序，先进行关闭，再进行onConfirm等回调函数
	 *  修改了遮罩层宽度和高度适应的bug
	 * 2012-4-09 版本更新，添加了键盘事件，对于confirm类型的窗口，支持enter和esc键的操作，其他窗口，enter和esc都将触发点击确定按钮的事件。
	    现在可以通过enter和esc键来对窗口进行操作了。
	 * 2012-4-13 修改了css样式中的所有class的名称，添加了tui前缀
	 * 2012-4-13 版本更新，将tuiDrag分离出去。现在的该页面要在引用tui_Drag.js之后引用
	 * 2012-4-23 版本更新，修正了在IE6下多次打开窗口，遮罩层不能正确覆盖select的问题
	 * 2012-4-26 版本更新，修正一个缺陷，对于窗口中再显示窗口的情况，如果内部窗口的回调函数将外部窗口关闭，则会出现错误。修改后，将关闭窗口的方法优先于回调函数执行，
	    在窗口关闭完之后执行回调。此外，关闭窗口时并不真的消除窗口中的内容，以便于回调函数中读取当前窗口中的数据。
	 * 2012-5-08 版本更新，修正了因为调整浏览器窗口大小出现遮罩层不能完全覆盖页面的bug。
	 * ************************************************
	 * 2012-9-14 新版本更新，更换了命名空间，更名为tui。基本放弃了对IE6的维护
	 * 2012-9-17 修改了默认参数的mode，增加style，使显示方式和显示样式分开。详情见参数配置
	 * 2012-9-21 版本更新，修正了新版的样式中dialog高度错误
	 * 2012-9-24 版本更新，宽度和高度添加了百分比设置与auto设置
	 * 2012-9-27 版本更新，支持在窗口关闭后仍然执行关闭窗口中的任何代码。注，窗口关闭实际上时隐藏窗口，因此部分定位代码将不会得到正确执行。
	 *  程序在打开新的窗口时，才被替换成新窗口内容
	 * 2012-10-22 版本更新，新增了小型编辑窗口的方法。
	 * 2012-10-23 版本更新，新增了用于div的小型窗口方法。
	 * 2012-10-30 版本更新，修正了：第一个窗口可以拖动，第二个窗口不可拖动时的仍然可以拖动的错误。修正了直接调用修改参数方法时的错误
	 * 2013-01-10 版本更新，删除了showTuiInfoDialog方法！全部由showTuiMessageDialog代替。
	 *  添加了新的方法：showTuiTipDialog
	 * 2013-01-14 版本更新，修正了waiting模式下双ID的bug，同时，修改了showTuiWaitingDialog的方法，该方法现在可以在无任何参数时正常显示。
	 *  如果存在参数，将按照参数显示另一类窗口
	 * 2013-01-25 版本更新，修正了waiting下的宽度和高度大小错误。修正了waiting之后再弹出其他窗口时拖拽的错误。
	 *  修正了存在滚动条时显示位置的错误。
	 * 2013-01-31 版本更新，修正了在用户指定top和left时，增加滚动条位置的bug
	 * 2013-02-04 版本更新，增加了$.showTuiSmallWaitingDialog方法
	 * 2013-02-05 版本更新，增加了$.showTuiHTMLDialog方法
	 * 2013-03-04 版本更新，修正了在弹出错误窗口时，弹出的内容过多出现滚动条后，鼠标拖动滚动条时和拖拽事件冲突而造成的无法拖动滚动条问题。
	 * 2013-04-08 版本更新，增加了$.showTuiModifyDialog方法。在style为text时，已经将id为dialog_info_panel容器加上溢出滚动条了。
	 * 2013-05-17 版本更新，修改了在IE浏览器中遮罩层的宽度出现的偏差
	 * 2013-05-30 修正了showTuiSmallEditDialog的参数错误。
	 * 2013-06-17 版本更新，修改了showMask的调用顺序，现在遮罩层将在窗口弹出之后出现。并且修正IE下出现的滚动条导致的遮罩层大小错误。
	 **************************************************/
	// JavaScript Document
	;(function($){
		$.tui=$.tui||{};//tui域名
		//关闭窗口的外部方法，为其他程序使用
		/*-------------------------------拓展方法，外部接口----------------------------------*/
		$.closeTuiWindow=function(){
			$.tui.closeTuiWindow();
		};
		//弹出带遮罩层的弹出框，extraOption是更多的配置，一般的配置在option中设定，其他的设置需要在extraOption中指定才能生效
		$.showTuiModalDialog=function(option,extraOption){
			$.tui.tuiDialog({
				url:option.url||'',
				width:option.width||500,
				height:option.height||400,
				title:option.title||'',
				mode:'window',
				style:'window'
			},extraOption);
		};
		//弹出不带遮罩层的弹出框，extraOption是更多的配置，一般的配置在option中设定，其他的设置需要在extraOption中指定才能生效
		$.showTuiDialog=function(option,extraOption){
			$.tui.tuiDialog({
				url:option.url||'',
				width:option.width||500,
				height:option.height||400,
				title:option.title||'',
				mode:'window',
				style:'window',
				isShowMask:false
			},extraOption);
		};
		//弹出一个HTML内容的窗口，content为HTML代码
		$.showTuiHTMLDialog=function(content,width,height,title,extraOption){
			$.tui.tuiDialog({
				mode:'window',
				style:'text',
				width:width||300,
				height:height||200,
				message:content,
				showTitle:true,
				title:title
			},extraOption);
		}
		//弹出错误提示框，参数中option请见$.tui.tuiDialogDefault
		$.showTuiErrorDialog=function(errorMsg,errorCallback,width,height,option){
			var opt={
				title:'错误',
				width:width||300,
				height:height||180,
				message:errorMsg,
				mode:'no_title_window',
				style:'error',
				onConfirm:errorCallback,
				confirmBtn:true
			};
			opt=$.extend(opt,option);
			$.tui.tuiDialog(opt);
		};
		//弹出信息提示框，注意！这里的callback是第四个参数！！
		/*$.showTuiInfoDialog=function(info,width,height,sureCallback,option){
			var opt={
				title:'信息',
				width:width||300,
				height:height||150,
				message:info,
				mode:'no_title_window',
				style:'info',
				onConfirm:sureCallback,
				confirmBtn:true
			};
			opt=$.extend(opt,option);
			$.tui.tuiDialog(opt);
		};*/
		//弹出等候的消息框，但是消息框中的所有内容，需要info指定
		//注：一般情况下，该方法显示一个默认的“请稍候...”字样的弹出框，不需要任何参数。
		//   如果存在有效的info,width,height的话，将根据参数内容弹出窗口，窗口的样式和无参数时不同！
		$.showTuiWaitingDialog=function(info,width,height,option){
			var w=width||null,
				h=height||null,
				i=info,
				opt;
			if(i||w||h){
				opt={
					width:w||150,
					height:h||56,
					message:info,
					mode:"no_title_window",
					style:'waiting'
				}
			}else{
				opt={
					width:width||150,
					height:height||80,
					mode:'waiting'
				};
			}
			opt=$.extend(opt,option);
			$.tui.tuiDialog(opt);
		};
		//弹出一个等待框，该框只有一个gif图标
		$.showTuiSmallWaitingDialog=function(width,height,option){
			var opt={
				width:width||68,
				height:height||70,
				mode:"no_title_window",
				style:'waiting'
			};
			opt=$.extend(opt,option);
			$.tui.tuiDialog(opt);
		}
		//弹出信息提示框，和Info相同
		$.showTuiMessageDialog=function(info,callback,width,height,option){
			var opt={
				title:'信息',
				width:width||300,
				height:height||150,
				message:info,
				mode:'no_title_window',
				style:'info',
				onConfirm:callback,
				confirmBtn:true
			};
			opt=$.extend(opt,option);
			$.tui.tuiDialog(opt);
		};
		//确认框
		$.showTuiConfirmDialog=function(message,sureCallback,width,height,option){
			var opt={
				title:'确认',
				width:width||300,
				height:height||160,
				message:message,
				mode:'no_title_window',
				style:'confirm',
				onConfirm:sureCallback,
				cancelBtn:true,
				confirmBtn:true
			};
			$.extend(opt,option);
			opt=$.extend(opt,option);
			$.tui.tuiDialog(opt);
		};
		//成功提示框
		$.showTuiSuccessDialog=function(info,sureCallback,width,height,option){
			var opt={
				title:'成功',
				width:width||300,
				height:height||150,
				message:info,
				mode:'no_title_window',
				style:'success',
				onConfirm:sureCallback,
				confirmBtn:true
			};
			opt=$.extend(opt,option);
			$.tui.tuiDialog(opt);
		};
		//显示无图片的提示框，但是有确认按钮
		$.showTuiNoImgDialog=function(message,sureCallback,width,height,option){
			var opt={
				title:'',
				width:width||300,
				height:height||200,
				message:message,
				mode:'no_title_window',
				style:'text',
				onConfirm:sureCallback,
				confirmBtn:true
			};
			opt=$.extend(opt,option);
			$.tui.tuiDialog(opt);
		}
		//显示黑色半透明提示框
		$.showTuiMessageAlert=function(message,sureCallback,width,height,option){
			var opt={
				mode:'alert',
				style:'error',
				width:width||360,
				height:height||100,
				message:message,
				showTitle:true,
				showDefaultBtn:true,
				onConfirm:sureCallback
			};
			opt=$.extend(opt,option);
			$.tui.tuiDialog(opt);
		};
		//小型的编辑窗口，位置需要设定
		$.showTuiSmallEditWindow=function(url,width,height,top,left,extraOption){
			var opt={
				url:url,
				mode:'narrow_window',
				style:'window',
				width:width||200,
				height:height||100,
				showPos:'ex',
				top:top||0,
				left:left||0,
				isShowMask:false,
				isDrag:false
			}
			opt=$.extend(opt,extraOption);
			$.tui.tuiDialog(opt);
		}
		//小型的编辑窗口，位置需要设定
		$.showTuiSmallEditDialog=function(content,callback,width,height,top,left,extraOption){
			var opt={
				message:content,
				confirmBtn:true,
				cancelBtn:true,
				mode:'narrow_window',
				style:'text',
				width:width||200,
				height:height||150,
				showPos:'ex',
				top:top||0,
				left:left||0,
				isShowMask:false,
				isDrag:false,
				onConfirm:callback
			};
			opt=$.extend(opt,extraOption);
			$.tui.tuiDialog(opt);
		}
		//带有蓝色上边框的弹出框，弹出框中不带有默认的按钮，因此需要在content中添加关闭的措施。left和top的位置如果为空，将按照中央进行显示
		$.showTuiTipDialog=function(content,width,height,left,top,extraOption){
			var showPos='c';
			if(left!=null&&top!=null){
				showPos='ex';
			}
			var opt={
				mode:'narrow_window',
				style:'text',
				width:width||300,
				height:height||100,
				message:content,
				showPos:showPos,
				top:top||0,
				left:left||0,
				showTitle:false,
				showDefaultBtn:false,
				confirmBtn:false
			}
			opt=$.extend(opt,extraOption);
			$.tui.tuiDialog(opt);
		}
		//无边框的窗口，弹出的窗口中的内容是content，不是url,无任何按钮。显示窄边窗口
		$.showTuiModifyDialog=function(content,width,height,left,top,extraOption){
			var showPos='c';
			if(left!=null&&top!=null){
				showPos='ex';
			}
			var opt={
				mode:'no_title_window',
				style:'text',
				width:width||300,
				height:height||100,
				message:content,
				showPos:showPos,
				top:top||0,
				left:left||0,
				showTitle:false,
				showDefaultBtn:false,
				confirmBtn:false
			}
			opt=$.extend(opt,extraOption);
			$.tui.tuiDialog(opt);
		}
		//判断弹出窗口是否存在或显示
		$.isTuiWindowVisible=function(){
			return $.tui.isVisible();
		}
		/*----------------------------外部接口结束-------------------------------*/
		$.tui.tuiDialogDefault={//默认参数
			width:300,//弹出框的默认宽度，单位：px，可以为'auto','50%'等
			height:200,//弹出框的默认高度，单位:px
			message:'',//弹出框的显示内容
			url:'',//弹出框显示的内容链接，自动读取url中的内容。
			title:'tui dialog',//弹出框的默认标题
			maskAlphaColor:'#000',//遮罩透明的颜色，默认为黑色
			maskAlpha:0.1,//遮罩的透明度
			isFixed:false,//弹出框是否固定位置，不跟随滚动条滚动
			showTitle:true,//是否显示标题栏，只有window类型的窗口才能显示title，注，该项为false时，showDefaultBtn参数无效
			showDefaultBtn:true,//是否显示标题栏右侧的关闭按钮。注意该按钮不受autoClose的影响，点击后自动关闭。showTitle为false时，不显示
			confirmBtn:false,//是否显示确定按钮
			cancelBtn:false,//是否显示取消按钮
			closeBtn:false,//是否显示关闭按钮
			autoClose:true,//点击确定或取消按钮是否关闭窗口
			onConfirm:null,//回调函数，点击确定时的function
			onCancel:null,//回调函数，点击取消时的function
			onClose:null,//回调函数，点击关闭是的function
			onTitleClose:null,//标题栏中的关闭按钮的回调函数
			isDrag:true,//是否可以拖动
			isShowMask:true,//是否显示遮罩层
			showPos:'c',//显示窗口的位置，可以为c,lt,lb,rt,rb,ex，分表代表的意思是居中，左上，左下，右上，右下，其他
			top:0,//在showPos为ex时有效，窗口的top
			left:0,//在showPos为ex时有效，窗口的left
			btnContext:{//各个按钮的文字
				w_confirm:'确定',
				w_cancel:'取消',
				w_close:'关闭'
			},
			mode:'window',//显示模式，分别为：window,no_title_window,narrow_window,waiting,alert，以上分别对应不同的窗口显示模式
			style:'info'//窗口模式，可以为：window,success,info,confirm,error,waiting,text以上分别对应窗口中的显示内容，window为iframe，后者为文本类型，以icon区别。注意：mode为alert时，style不能为window，如果是window将按照text来处理。
		};
		/*--------------------------------extend拓展开始-------------------------------*/
		$.extend($.tui,{
			tuiDialog:function(){//弹出一个窗口
				/*--------------------参数准备-------------------*/
				var settings=$.extend({},$.tui.tuiDialogDefault);//读取默认参数参数
				for(var i=0;i<arguments.length;i++){//读取多个参数
					settings=$.extend(settings,arguments[i]);
				}
				var isIE=$.tui.isIE(),
					isCSS1=(document.compatMode=="CSS1Compat"),
					isIE7=$.tui.isIE7(),
					isIE8=$.tui.isIE8(),
					isIE6=$.tui.isIE6();
				/*--------------------参数完毕-------------------*/
				
				/*--------------------内部方法-------------------*/
				//显示遮罩层，参数为遮罩的颜色和遮罩的透明度
				var showMask=function(mask_color,mask_alpha){
					var $doc=$(document),
						maskWidth=$doc.width(),//遮罩层的宽度
						maskHeight=$doc.height(),//遮罩层的高度
						$mask,
						maskSrc='<div id="tui_dialog_mask" class="dialog_mask"></div>',
						hasVerticalScroll;
					if($('#tui_dialog_mask').length>0){//已经存在了遮罩层，则不进行新建遮罩层的操作
						$mask=$('#tui_dialog_mask');
					}else{//新建遮罩层
						$mask=$(maskSrc);
						$('body').append($mask);//将新的遮罩层放入body中。
					}
					//判断是否存在纵向滚动条
					if(window.innerHeight){
						hasVerticalScroll = document.body.offsetHeight > innerHeight;
			        }
			        else {
			        	hasVerticalScroll=
			        		(document.documentElement.scrollHeight > document.documentElement.offsetHeight ||
			                document.body.scrollHeight > document.body.offsetHeight);
			        }
					if(isIE){
						//在IE中，body的宽度不将滚动条的宽度算计去，因此，添加遮罩层之后就会让页面出现横向滚动条。
						
						if(hasVerticalScroll){
							//maskWidth -= 17;
						}
					}
					//说明：在IE6下，遮罩层不能使用div，必须使用iframe才能将下拉菜单等盖住
					if(isIE6){//如果是IE6，则需要在遮罩层中添加一个iframe
						$mask.append('<iframe border="0" frameborder="0" style="width:100%;height:100%;filter:alpha(opacity='+(100*mask_alpha)+');" src="about:blank"></iframe>');//添加iframe，用于遮盖下拉菜单等
					}
					$mask.css({width:maskWidth+'px',height:maskHeight+'px',opacity:mask_alpha,background:mask_color}).show();//设置样式，并且尝试显示
					//如果浏览器窗口大小改变，遮罩层应该也改变，因此绑定事件，当修改窗口大小时，遮罩层也改变
					var oWidth=maskWidth,//记录初始时文档结构的大小，如果窗口拉大则增大，但是窗口缩小时必须判断是不是小于初始化时的文档窗口大小了
						oHeight=maskHeight;
					var onResize=function($mask,oWidth,oHeight){//用于绑定窗口事件，当window发生变化，则将遮罩层根据窗口变化。对于小于初始化大小的窗口变化，将不作变化
						return function(){
							var $window=$(window),
							//大小规则：如果浏览器窗口大于文档大小了，遮罩层要跟着窗口增大，如果浏览器窗口小于文档窗口了，则不能跟着减小，因为这会露出部分文档内容
								maskWidth=$window.width()>oWidth?$window.width():oWidth,
								maskHeight=$window.height()>oHeight?$window.height():oHeight;//遮罩层的高度
							$mask.css({width:maskWidth+'px',height:maskHeight+'px'});
						}
					}
					$(window).bind('resize.tuiDialog',onResize($mask,oWidth,oHeight));//绑定方法，在窗口变化时，改变遮罩层的大小
				};
				//关闭遮罩层
				var closeMask=function(){
					$('#tui_dialog_mask').html('').hide();
					$(window).unbind('resize.tuiDialog');//解除绑定遮罩层监听事件
				};
				//针对IE6的方法，由于IE6不支持position:fixed,所以需要通过absolute来模仿，该方法就是滚动条的事件函数
				var tuiDialogScroll=function(){
					var $tui_dialog_window=$('#tui_dialog_window'),
						$document=$(document),
						left=parseInt($tui_dialog_window.css('left')),
						top=parseInt($tui_dialog_window.css('top'));
					$tui_dialog_window.css({
						left:left+($document.scrollLeft()-window.tuiDialogForIE6ScrollX)+'px',
						top:top+($document.scrollTop()-window.tuiDialogForIE6ScrollY)+'px'
					});
					//alert(left+($(document).scrollLeft()-window.tuiDialogForIE6ScrollX)+'px');
					window.tuiDialogForIE6ScrollX=$document.scrollLeft();//
					window.tuiDialogForIE6ScrollY=$document.scrollTop();
				};
				//用于显示dialog窗口，通常是显示一个微型的弹出框,传入参数对象，见默认参数格式
				//无论是什么样的窗口类型，窗口的结构分为四部分，分别为：上边框，中间的内容，下侧按钮和下边框，这四个部分分别由三个方法负责实现，此方法为上边框和下边框的生成
				var showBasicWindow=function(para){
					var $window,//窗口对象
						$win=$(window),
						$document=$(document);
					/*--窗口的显示处理--*/
					//获得弹出窗口
					if($('#tui_dialog_window').length<1){//如果没有找到已经存在的弹出框，则新建一个
						var dialogHtml='<div id="tui_dialog_window" class="dialog_panel"></div>';//弹出框
						$window=$(dialogHtml);
						$('body').append($window);//将新的窗口放入body中。
					}else{
						$window=$('#tui_dialog_window');
					}
					$window.empty().show().css({position:para.isFixed?'fixed':'absolute'});//清楚掉内部的内容，如果该窗口已经存在，内部的内容必须清掉，便于建立新的内容，如果已经存在弹出窗口，很有可能弹出窗口已经隐藏了，因此，需要显示
					//功能增强，如果width或者height参数为'auto'，或'50%';则需要计算高度
					var paraWidth=para.width,
						paraHeight=para.height,
						dialogWidth,
						dialogHeight;
					//处理宽度
					if(!isNaN(paraWidth)){//如果宽度是不可以计算的
						dialogWidth=para.width;
					}else if(paraWidth=="auto"){
						dialogWidth=$win.width();
					}else{
						var reg=/^(\d{1,3})%$/;
						var regRes=reg.exec(paraWidth);
						if(regRes&&regRes.length==2){//计算比例，如果比例有问题，则按照100%计算
							dialogWidth=$win.width()*(parseInt(regRes[1])||100)/100;
						}else{
							dialogWidth=para.width;
						}
					}
					//处理高度
					if(!isNaN(paraHeight)){
						dialogHeight=para.height;
					}else if(paraHeight=="auto"){
						dialogHeight=$win.height();
					}else{
						var reg=/^(\d{1,3})%$/;
						var regRes=reg.exec(paraHeight);
						if(regRes&&regRes.length==2){
							dialogHeight=$win.height()*(parseInt(regRes[1])||100)/100;
						}else{
							dialogHeight=para.height;
						}
					}
					//将计算好的值传回para中，因为在shouBtnPart中，还需要根据宽高计算文本部分的高度
					para.height=dialogHeight;
					//如果参数中是固定位置显示，则按照fixed显示，否则，按照absoluate显示
					var top=0,
						left=0;
					//根据参数固定显示的位置
					switch(para.showPos){
						case 'lt'://左上显示
							break;
						case 'lb'://左下显示
							top=$win.height()-dialogHeight-2;
							break;
						case 'rt'://右上显示
							left=$win.width()-dialogWidth-2;
							break;
						case 'rb'://右下显示
							top=$win.height()-dialogHeight-2;
							left=$win.width()-dialogWidth-2;
							break;
						case 'c'://居中
							top=($win.height()-dialogHeight)/2;//窗口距离上端的距离
							left=($win.width()-dialogWidth)/2;//窗口距离左端的距离
							break;
						default://其他，根据参数决定
							top=para.top;
							left=para.left;
					}
					//上边框必须显示出来，即：显示的时候，上边框不能超出屏幕范围
					top=top>=0?top:0;
					if(isIE6&&para.isFixed){//在IE6的情况下，position:fixed不支持，因此需要单独处理，坑爹的IE6! :(
						/*
						处理思路：在IE6下，要想实现position:fixed，除了使用css的expression之外，就是通过absolute模仿fixed，这样做的好处在于，直接通过css属性进行复制就可以了。
						给window绑定scroll事件，当滚动条滚动时，重新处理top和left。这里使用差值处理，即，记录初始滚轴位置，每当滚轴变化时，将当前的窗口移动滚轴变化量，而不是重新计算top和left，这样做的原因是，窗口可能经过拖动，而拖动后的left和top在该域内不可见。
						*/
						$window.css({position:'absolute',left:$document.scrollLeft()+left+'px',top:$document.scrollTop()+top+'px'});//重新制定位置
						window.tuiDialogForIE6ScrollX=$document.scrollLeft();//记录初始的滚动条位置
						window.tuiDialogForIE6ScrollY=$document.scrollTop();
						$win.bind('scroll.tuiDialog',tuiDialogScroll)//绑定滚动条事件
					}else{
						//如果页面较长，出现了水平和垂直滚动条，则在absolute的定位中需要加上滚动条的移动位置。
						if(!para.isFixed&&para.showPos!='ex'){
							left+=($win.scrollLeft()||0);
							top+=($win.scrollTop()||0);
						}
						$window.css({left:left+'px',top:top+'px'});//窗口的位置
					}
					
					$window.css({width:dialogWidth+'px',height:dialogHeight+'px'});//设定宽高
					/*--窗口显示处理完毕--*/
					/*--窗口内容--*/
					//弹出框的上边栏
					//mode:显示模式，分别为：window,no_title_window,narrow_window,waiting,alert，以上分别对应不同的窗口显示模式
					var mode=para.mode,
						tempT='',
						tempF='',
						defaultBtnHTML='<div id="tui_dialog_close_button" class="dialog_head_close"></div>',
						$defaultBtn;
					switch(mode){
						case "window":
							tempT='<div id="tui_dialog_title" class="dialog_head_left">\
										<div class="dialog_head_right">\
											<div class="dialog_head_content" id="tui_dialog_title_center"></div>\
										</div>\
									</div>\
									<div class="dialog_body_left">\
										<div class="dialog_body_right">\
											<div class="dialog_body_content" id="dialog_content"></div>\
										</div>\
									</div>';
							//弹出框的下边栏
							tempF='<div id="tui_dialog_bottom" class="dialog_foot_left">\
										<div class="dialog_foot_right">\
											<div class="dialog_foot_content"></div>\
										</div>\
									</div>';
							break;
						case "no_title_window":
							tempT='<div id="tui_dialog_title" class="dialog_head_no_title_left">\
										<div class="dialog_head_no_title_right">\
											<div class="dialog_head_no_title_content" id="tui_dialog_title_center"></div>\
										</div>\
									</div>\
									<div class="dialog_body_left">\
										<div class="dialog_body_right">\
											<div class="dialog_body_content" id="dialog_content"></div>\
										</div>\
									</div>';
							//弹出框的下边栏
							tempF='<div id="tui_dialog_bottom" class="dialog_foot_left">\
										<div class="dialog_foot_right">\
											<div class="dialog_foot_content"></div>\
										</div>\
									</div>';
							break;
						case "narrow_window":
							tempT='<div id="tui_dialog_title" class="dialog_head_narrow_left">\
										<div class="dialog_head_narrow_right">\
											<div class="dialog_head_narrow_content" id="tui_dialog_title_center"></div>\
										</div>\
									</div>\
									<div class="dialog_body_narrow_left">\
										<div class="dialog_body_narrow_right">\
											<div class="dialog_body_narrow_content" id="dialog_content"></div>\
										</div>\
									</div>\
									';
							//弹出框的下边栏
							tempF='<div id="tui_dialog_bottom" class="dialog_foot_narrow_left">\
										<div class="dialog_foot_narrow_right">\
											<div class="dialog_foot_narrow_content"></div>\
										</div>\
									</div>';
							break;
						default://针对alert和waiting，需要单独做其他操作
							tempT='';
							tempF='';
					}
					if(tempT!=''&&tempF!=''){//如果是窗口型的样式
						$(tempT).appendTo($window);
						var $windowTitle=$('#tui_dialog_title'),
							$titleCenter=$('#tui_dialog_title_center');//获得标题栏中间部分
						if(para.showTitle&&mode=="window"){//如果需要显示标题
							var titleHTML='<div class="dialog_head_title" id="tui_dialog_title_content">'+para.title+'</div>',
								$titleContext=$(titleHTML).appendTo($titleCenter);//将标题内容放到标题栏中间容器中
							if(para.showDefaultBtn){//如果显示标题栏的关闭按钮
								$defaultBtn=$(defaultBtnHTML).appendTo($titleCenter);//将关闭按钮放入标题中间容器中
								//绑定事件
							}
						}
						var $windowBottom=$(tempF).appendTo($window);//添加下边栏
					}else{//其他的样式
						if(mode=="waiting"){
							var tempT='<div class="dialog_waiting">\
											<div class="dialog_waiting_msg">\
												<div class="icon"></div><span class="content">'+(para.message||'请稍候...')+'</span>\
											</div>\
										</div>',
								$waiting=$(tempT).appendTo($window);
								$window.css({width:150,height:72});//针对waiting类型的，则显示一个固定的一个宽高。
						}else if(mode=='alert'){
							var tempT='<div class="dialog_alert" id="dialog_alert">\
											<div class="dialog_alert_msg" id="dialog_content"></div>\
										</div>',
								$alert=$(tempT).appendTo($window);
							if(para.showDefaultBtn){
								var closeBtn='<div class="dialog_close_icon" id="tui_dialog_close_button"></div>',
									$defaultBtn=$(closeBtn);
								$('#dialog_alert').before($defaultBtn);
							}
						}
					}
					$defaultBtn&&$defaultBtn.length&&$defaultBtn.bind('mousedown.tuiDialog',function(e){
						//此事件的目的是因为拖拽绑定的是mousedown,因此必须要绑定mousedown事件实现防止冒泡，使得click事件顺利出发
						e.stopPropagation();
					}).bind('click.tuiDialog',function(e){
						e.stopPropagation();//防止冒泡
						closeTuiDialog();
						if(typeof(para.onTitleClose)==="function"){
							para.onTitleClose.call(this,e,$window);
						}
					});
					
					/*--窗口内容完毕--*/
					//给窗口上部添加拖动
					if(para.isDrag){
						$window.tuiOffDrag().tuiDrag({handle:($windowTitle&&$windowTitle.length)?$windowTitle:$window,isFixed:para.isFixed,dragRange:'auto'});
					}else{
						$window.tuiOffDrag().tuiDrag('disabled',true);
					}
				};
				//用于关闭窗口
				var closeWindow=function(){
					$('#tui_dialog_window').hide();
					//取消因为IE6而兼容的position:fixed
					$(window).unbind('scroll.tuiDialog',tuiDialogScroll);
				};
				//关闭窗口的统一方法,除了处理关闭窗口，还要负责将缓存中等待显示的信息取出（如果存在）,并进行显示
				var closeTuiDialog=function(){
					closeWindow();//关闭窗口
					closeMask();//关闭遮罩层
					//删除键盘enter和esc事件
					$(document).unbind('keydown.tuiDialog');
					if(window.tuiDialogCache.length>0){//说明缓存中还有要显示的信息
						var tempCfg=window.tuiDialogCache.shift();//取出队列中的配置参数
						$.tui.tuiDialog(tempCfg);//调用第二次
					}
				};
				//无论是什么样的窗口类型，窗口的结构分为四部分，分别为：上边框，中间的内容，下侧按钮和下边框，这四个部分分别由三个方法负责实现，此方法为中间内容的生成
				var showContentPart=function(para){
					//用于过滤和处理一些特殊字符
					var messageFilter=function(str){
						return str;
					}
					var styleList={//各个窗口类型所对应的样式class名称
						'info':'dialog_icon_info',
						'success':'dialog_icon_success',
						'error':'dialog_icon_error',
						'confirm':'dialog_icon_confirm',
						'waiting':'dialog_icon_waiting'
						},
						$dialog_content,
						mode=para.mode,
						style=para.style,
						$iframe;
					if($('#dialog_content').length!=1&&mode!="waiting"){//中间内容不存在的情况下，需要新建一个新的容器
						window.console&&window.console.warn('not found #dialog_content!');
						return;
					}
					$dialog_content=$('#dialog_content');
					$dialog_content.empty();//如果已经存在了内部信息，为防止错误，将内部的信息清空
					switch(style){
						case "window"://内容为一个iframe新页面
							if((mode!='alert')&&(mode!='waiting')){
								var innerHtml='<iframe border="0" id="dialog_iframe" frameborder="0" class="dialog_iframe" src="'+para.url+'"></iframe>';
								$iframe=$(innerHtml).appendTo($dialog_content);
								
								break;
							}
						case "text":
							if(mode!='waiting'){
								$dialog_content.html('<div id="dialog_info_panel" style="overflow:auto;">'+messageFilter(para.message)+'</div>');
							}
							break;
						case "info":
						case "success":
						case "error":
						case "confirm":
						case "waiting":
							var innerHtml='<div class="dialog_info" id="dialog_info_panel">\
	                        				<div id="dialog_icon"></div>\
	                       					<div class="dialog_info_content" id="dialog_info_content"></div>\
	                    				   </div>';
							var $dialog_info=$(innerHtml).appendTo($dialog_content);
							var $dialog_icon=$('#dialog_icon'),
								$dialog_info_content=$('#dialog_info_content');
							$dialog_icon.addClass(styleList[style]);
							$dialog_info_content.html(messageFilter(para.message));
							//去掉dialog_info_content冒泡的事件，因为在一些情况下，滚动条的事件会在拖拽的事件下无法正常使用
							$dialog_info_content.off('mousedown.tuiDialog').on('mousedown.tuiDialog',function(e){
								(e&&e.stopPropagation)?e.stopPropagation():window.event.cancelBubble=true;
							});
							//添加waiting的图标选项之后，在waiting下，由于gif图标与其他图标的大小不同，因此需要重新计算文字的padding
							if(style=="waiting"){
								$dialog_icon.parent().css({paddingLeft:56});
								if(para.message==""){
									$dialog_icon.parent().css({paddingTop:0});//如果没有message，则需要将top的位置去掉，用在只显示gif图标时使用
								}
							}
							break;
					}
					//计算实际的高度
					var sub=0,//此变量为需要减去的高度，因为窗口的高度需要内容框的高度来撑起来。
						$iframe=$('#dialog_iframe'),
						$dialog_info_panel=$('#dialog_info_panel');
					if(para.confirmBtn||para.cancelBtn||para.closeBtn){//如果有按钮，则少30px
						sub+=30;
					}
					if(mode=='window'){//如果是window型的，少43px
						sub+=43;
					}else if(mode=='alert'){//alert少20px
						sub+=20;
					}else if(mode=='no_title_window'){
						sub+=15;
					}else if(mode=='narrow_window'){
						sub+=13;
					}
					$dialog_info_panel.length&&$dialog_info_panel.css({height:(para.height-sub)+'px'});
					$iframe.length&&$iframe.css({height:(para.height-sub)+'px'});
				};
				//显示按钮部分的内容，注意：改方法必须要在内容部分存在时才能调用
				var showButtonPart=function(para){
					var $window=$('#tui_dialog_window'),
						$btn_panel=$('#dialog_btn_panel'),
						mode=para.mode,
						$content=$('#dialog_content'),
						btnHtml='',
						btnContext=para.btnContext;
					if($window.length!=1||$content.length!=1){//必须存在弹出窗口
						return;
					}
					if(mode=="waiting"){//如果是请稍后的弹出框，则不支持按钮
						return;
					}
					if($btn_panel.length!=0){//已经存在btn容器了
						$btn_panel.empty().remove();//清楚因存在的按钮
					}
					if(para.confirmBtn){
						btnHtml+='<div class="btn_page btn_save dialog_btn" id="dialog_btn_confirm">\
									<div class="btn_left"></div>\
									<div class="btn_content" id="tt">&nbsp;'+btnContext.w_confirm+'&nbsp;</div>\
									<div class="btn_right"></div>\
								</div>';
					}
					if(para.cancelBtn){
						btnHtml+='<div class="btn_page btn_cancel dialog_btn" id="dialog_btn_cancel">\
									<div class="btn_left"></div>\
									<div class="btn_content">&nbsp;'+btnContext.w_cancel+'&nbsp;</div>\
									<div class="btn_right"></div>\
								</div>';
					}
					if(para.closeBtn){
						btnHtml+='<div class="btn_page btn_cancel dialog_btn" id="dialog_btn_close">\
									<div class="btn_left"></div>\
									<div class="btn_content">&nbsp;'+btnContext.w_close+'&nbsp;</div>\
									<div class="btn_right"></div>\
								</div>';
					}
					if(btnHtml!=''){
						$btn_panel=$('<div class="dialog_btn_panel" id="dialog_btn_panel"></div>').appendTo($content);
						$btn_panel.html(btnHtml);
					}else{//如果不存在任何按钮，则不作任何操作
						return;
					}
					var $confirm=$('#dialog_btn_confirm'),
						$cancel=$('#dialog_btn_cancel'),
						$close=$('#dialog_btn_close'),
						isAutoClose=para.autoClose;
					//绑定确认
					$confirm.length&&$confirm.bind('mousedown',function(e){e.stopPropagation();}).bind('click.tuiDialog',function(e){
						isAutoClose?closeTuiDialog():'';
						typeof(para.onConfirm)=="function"?para.onConfirm.call(this,e,$window):'';
					});
					//绑定取消
					$cancel.length&&$cancel.bind('mousedown',function(e){e.stopPropagation();}).bind('click.tuiDialog',function(e){
						isAutoClose?closeTuiDialog():'';
						typeof(para.onCancel)=="function"?para.onCancel.call(this,e,$window):'';
					});
					//绑定关闭
					$close.length&&$close.bind('mousedown',function(e){e.stopPropagation();}).bind('click.tuiDialog',function(e){
						isAutoClose?closeTuiDialog():'';
						typeof(para.onClose)=="function"?para.onClose.call(this,e,$window):'';
					});
					//绑定一个键盘事件，用于键盘的事件
					$(document).bind('keydown.tuiDialog',function(e){
						var $confirm=$('#dialog_btn_confirm');
						var $cancel=$('#dialog_btn_cancel');
						var $autoCancel=$('#tui_dialog_close_button');
						if(e.keyCode==13){
							$confirm.length&&$confirm.trigger('click');
						}else if(e.keyCode==27){
							$cancel.length?$cancel.trigger('click'):$autoCancel.length&&$autoCancel.trigger('click');
						}
					});
				};
				/*--------------------方法结束-------------------*/
				/*-------------------主方法开始-------------------*/
				/**/
				window.tuiDialogCache?'':window.tuiDialogCache=new Array();//创建一个用于记录弹出框信息的缓存，为了实现需要弹出多个弹出框的时候，按次序弹出的功能
				if($('#tui_dialog_window:visible').length>0){//说明，调用主方法时，弹出框已经弹出，正在显示别的信息，因此，将该方法放入缓存中，等之前的弹出框关闭了在显示当前弹出框
					window.tuiDialogCache.push(settings);//放入缓存
					return;//所有方法结束，后面的显示过程都不做
				}
				
				showBasicWindow(settings);//显示基本窗口
				showContentPart(settings);//显示窗口中的内容
				showButtonPart(settings);//显示窗口的按钮
				settings.isShowMask?showMask(settings.maskAlphaColor,settings.maskAlpha):'';//显示遮罩层
			},
			closeTuiWindow:function(){//关闭窗口的总方法，用于封装时调用
				//关闭遮罩层
				var closeMask=function(){
					//删除键盘enter和esc事件
					$(document).unbind('keydown.tuiDialog');
					$('#tui_dialog_mask').html('').hide();
					$(window).unbind('resize.tuiDialog');
				};
				//用于关闭弹出窗口
				var closeWindow=function(){
					$('#tui_dialog_window').hide();
					//取消因为IE6而兼容的position:fixed
					$(window).unbind('scroll.tuiDialog');
				};
				//关闭窗口的统一方法,除了处理关闭窗口，还要负责将缓存中等待显示的信息取出（如果存在）,并进行显示
				var closeTuiDialog=function(){
					closeWindow();//关闭窗口
					closeMask();//关闭遮罩层
					if(window.tuiDialogCache&&window.tuiDialogCache.length>0){//说明缓存中还有要显示的信息
						var tempCfg=window.tuiDialogCache.shift();//取出队列中的配置参数
						$.tui.tuiDialog(tempCfg);//调用第二次
					}
				};
				closeTuiDialog();
			},
			isVisible:function(){//判断是否有窗口显示
				var $win=$('#tui_dialog_window');
				if($win.length&&$win.is(':visible')){
					return true;
				}else{
					return false;
				}
			}
		});
		/*----------------------------------extend拓展结束---------------------------------*/
	})(jQuery);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	__webpack_require__(10);

/***/ },
/* 9 */
/***/ function(module, exports) {

	/*! jQuery UI - v1.9.2 - 2012-12-13
	* http://jqueryui.com
	* Includes: jquery.ui.core.js, jquery.ui.datepicker.js
	* Copyright (c) 2012 jQuery Foundation and other contributors Licensed MIT */

	/*
	 * jqueryUI文件中的datepicker在2013/02/21经过machi修改，添加了农历的显示
	 * version: v1.0.2
	 * author: machi
	 * history:
	 *  2013-04-11 版本更新，增加了新样式，修正了LunarCalendar的错误。
	 *    支持了节日的样式显示。
	 *  2013-04-22 修正了参数赋值错误。
	 *  2013-04-24 修正了农历月份在非本月时的显示错误。修正了在tui2.0中的zIndex计算bug
	 *  2013-09-10 增加了清空按钮及功能的支持，现在可以通过参数设置清空按钮。
	 */

	(function( $, undefined ) {

	var uuid = 0,
		runiqueId = /^ui-id-\d+$/;

	// prevent duplicate loading
	// this is only a problem because we proxy existing functions
	// and we don't want to double proxy them
	$.ui = $.ui || {};
	if ( $.ui.version ) {
		return;
	}

	$.extend( $.ui, {
		version: "1.9.2",

		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	});

	// plugins
	$.fn.extend({
		_focus: $.fn.focus,
		focus: function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				this._focus.apply( this, arguments );
		},

		scrollParent: function() {
			var scrollParent;
			if (($.ui.ie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
				scrollParent = this.parents().filter(function() {
					return (/(relative|absolute|fixed)/).test($.css(this,'position')) && (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
				}).eq(0);
			} else {
				scrollParent = this.parents().filter(function() {
					return (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
				}).eq(0);
			}

			return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
		},

		zIndex: function( zIndex ) {
			if ( zIndex !== undefined ) {
				return this.css( "zIndex", zIndex );
			}
			
			if ( this.length ) {
				var elem = $( this[ 0 ] ), position, value;
				while ( elem.length && elem[ 0 ] !== document ) {
					// Ignore z-index if position is set to a value where z-index is ignored by the browser
					// This makes behavior of this function consistent across browsers
					// WebKit always returns auto if the element is positioned
					position = elem.css( "position" );
					if ( position === "absolute" || position === "relative" || position === "fixed" ) {
						// IE returns 0 when zIndex is not specified
						// other browsers return a string
						// we ignore the case of nested elements with an explicit value of 0
						// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
						value = parseInt( elem.css( "zIndex" ), 10 );
						if ( !isNaN( value ) && value !== 0 ) {
							return value;
						}
					}
					elem = elem.parent();
				}
			}

			return 0;
		},

		uniqueId: function() {
			return this.each(function() {
				if ( !this.id ) {
					this.id = "ui-id-" + (++uuid);
				}
			});
		},

		removeUniqueId: function() {
			return this.each(function() {
				if ( runiqueId.test( this.id ) ) {
					$( this ).removeAttr( "id" );
				}
			});
		}
	});

	// selectors
	function focusable( element, isTabIndexNotNaN ) {
		var map, mapName, img,
			nodeName = element.nodeName.toLowerCase();
		if ( "area" === nodeName ) {
			map = element.parentNode;
			mapName = map.name;
			if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
				return false;
			}
			img = $( "img[usemap=#" + mapName + "]" )[0];
			return !!img && visible( img );
		}
		return ( /input|select|textarea|button|object/.test( nodeName ) ?
			!element.disabled :
			"a" === nodeName ?
				element.href || isTabIndexNotNaN :
				isTabIndexNotNaN) &&
			// the element and all of its ancestors must be visible
			visible( element );
	}

	function visible( element ) {
		return $.expr.filters.visible( element ) &&
			!$( element ).parents().andSelf().filter(function() {
				return $.css( this, "visibility" ) === "hidden";
			}).length;
	}

	$.extend( $.expr[ ":" ], {
		data: $.expr.createPseudo ?
			$.expr.createPseudo(function( dataName ) {
				return function( elem ) {
					return !!$.data( elem, dataName );
				};
			}) :
			// support: jQuery <1.8
			function( elem, i, match ) {
				return !!$.data( elem, match[ 3 ] );
			},

		focusable: function( element ) {
			return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
		},

		tabbable: function( element ) {
			var tabIndex = $.attr( element, "tabindex" ),
				isTabIndexNaN = isNaN( tabIndex );
			return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
		}
	});

	// support
	$(function() {
		var body = document.body,
			div = body.appendChild( div = document.createElement( "div" ) );

		// access offsetHeight before setting the style to prevent a layout bug
		// in IE 9 which causes the element to continue to take up space even
		// after it is removed from the DOM (#8026)
		div.offsetHeight;

		$.extend( div.style, {
			minHeight: "100px",
			height: "auto",
			padding: 0,
			borderWidth: 0
		});

		$.support.minHeight = div.offsetHeight === 100;
		$.support.selectstart = "onselectstart" in div;

		// set display to none to avoid a layout bug in IE
		// http://dev.jquery.com/ticket/4014
		body.removeChild( div ).style.display = "none";
	});

	// support: jQuery <1.8
	if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
		$.each( [ "Width", "Height" ], function( i, name ) {
			var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
				type = name.toLowerCase(),
				orig = {
					innerWidth: $.fn.innerWidth,
					innerHeight: $.fn.innerHeight,
					outerWidth: $.fn.outerWidth,
					outerHeight: $.fn.outerHeight
				};

			function reduce( elem, size, border, margin ) {
				$.each( side, function() {
					size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
					if ( border ) {
						size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
					}
					if ( margin ) {
						size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
					}
				});
				return size;
			}

			$.fn[ "inner" + name ] = function( size ) {
				if ( size === undefined ) {
					return orig[ "inner" + name ].call( this );
				}

				return this.each(function() {
					$( this ).css( type, reduce( this, size ) + "px" );
				});
			};

			$.fn[ "outer" + name] = function( size, margin ) {
				if ( typeof size !== "number" ) {
					return orig[ "outer" + name ].call( this, size );
				}

				return this.each(function() {
					$( this).css( type, reduce( this, size, true, margin ) + "px" );
				});
			};
		});
	}

	// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
	if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
		$.fn.removeData = (function( removeData ) {
			return function( key ) {
				if ( arguments.length ) {
					return removeData.call( this, $.camelCase( key ) );
				} else {
					return removeData.call( this );
				}
			};
		})( $.fn.removeData );
	}





	// deprecated

	(function() {
		var uaMatch = /msie ([\w.]+)/.exec( navigator.userAgent.toLowerCase() ) || [];
		$.ui.ie = uaMatch.length ? true : false;
		$.ui.ie6 = parseFloat( uaMatch[ 1 ], 10 ) === 6;
	})();

	$.fn.extend({
		disableSelection: function() {
			return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
				".ui-disableSelection", function( event ) {
					event.preventDefault();
				});
		},

		enableSelection: function() {
			return this.unbind( ".ui-disableSelection" );
		}
	});

	$.extend( $.ui, {
		// $.ui.plugin is deprecated.  Use the proxy pattern instead.
		plugin: {
			add: function( module, option, set ) {
				var i,
					proto = $.ui[ module ].prototype;
				for ( i in set ) {
					proto.plugins[ i ] = proto.plugins[ i ] || [];
					proto.plugins[ i ].push( [ option, set[ i ] ] );
				}
			},
			call: function( instance, name, args ) {
				var i,
					set = instance.plugins[ name ];
				if ( !set || !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) {
					return;
				}

				for ( i = 0; i < set.length; i++ ) {
					if ( instance.options[ set[ i ][ 0 ] ] ) {
						set[ i ][ 1 ].apply( instance.element, args );
					}
				}
			}
		},

		contains: $.contains,

		// only used by resizable
		hasScroll: function( el, a ) {

			//If overflow is hidden, the element might have extra content, but the user wants to hide it
			if ( $( el ).css( "overflow" ) === "hidden") {
				return false;
			}

			var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
				has = false;

			if ( el[ scroll ] > 0 ) {
				return true;
			}

			// TODO: determine which cases actually cause this to happen
			// if the element doesn't have the scroll set, see if it's possible to
			// set the scroll
			el[ scroll ] = 1;
			has = ( el[ scroll ] > 0 );
			el[ scroll ] = 0;
			return has;
		},

		// these are odd functions, fix the API or move into individual plugins
		isOverAxis: function( x, reference, size ) {
			//Determines when x coordinate is over "b" element axis
			return ( x > reference ) && ( x < ( reference + size ) );
		},
		isOver: function( y, x, top, left, height, width ) {
			//Determines when x, y coordinates is over "b" element
			return $.ui.isOverAxis( y, top, height ) && $.ui.isOverAxis( x, left, width );
		}
	});

	})( jQuery );
	(function( $, undefined ) {

	$.extend($.ui, { datepicker: { version: "1.9.2" } });

	var PROP_NAME = 'datepicker';
	var dpuuid = new Date().getTime();
	var instActive;

	/*
	 * LunarCalendar自建类，包括构造函数与使用方法***************************************************************
	 *
	 */
	function LunarCalendar(dateObj){
		this.dateObj = (dateObj != undefined) ? dateObj : new Date();
	    this.SY = this.dateObj.getFullYear();//年份
	    this.SM = this.dateObj.getMonth();//月份
		this.SD = this.dateObj.getDate();//日期
		this.lunarDate;
		this.Lunar();
	}
	//修改日期
	LunarCalendar.prototype.setDate = function(date){
		this.dateObj = date;
		this.SY = date.getFullYear();//年份
	    this.SM = date.getMonth();//月份
		this.SD = date.getDate();//日期
		this.Lunar();
		return this;
	}
	//1900-2050年的农历数据
	LunarCalendar.prototype.lunarInfo = [
		0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
		0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
		0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
		0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
		0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
		0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
		0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
		0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
		0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
		0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
		0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
		0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
		0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
		0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
		0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
		0x14b63
	];
	//传回农历 y年闰哪个月 1-12 , 没闰传回 0
	LunarCalendar.prototype.leapMonth = function(y){
		return this.lunarInfo[y - 1900] & 0xf;
	};

	//传回农历 y年m月的总天数
	LunarCalendar.prototype.monthDays = function(y, m){
		return (this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29;
	};
	//传回农历 y年闰月的天数
	LunarCalendar.prototype.leapDays = function(y){

		if (this.leapMonth(y)) {
			return (this.lunarInfo[y - 1900] & 0x10000) ? 30 : 29;
		}
		else {
			return 0;
		}
	};
	//传回农历 y年的总天数
	LunarCalendar.prototype.lYearDays = function(y){
		var i, sum = 348;
		for (i = 0x8000; i > 0x8; i >>= 1) {
			sum += (this.lunarInfo[y - 1900] & i) ? 1 : 0;
		}
		return sum + this.leapDays(y);
	};
	//算出农历, 传入日期对象, 传回农历日期对象
	//该对象属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
	LunarCalendar.prototype.Lunar = function(){
		var dateObj = this.dateObj,
			i, leap = 0, temp = 0, lunarObj = {},
			baseDate = new Date(1900, 0, 31),
			offset = (dateObj - baseDate) / 86400000;
		lunarObj.dayCyl = offset + 40;
		lunarObj.monCyl = 14;
		for (i = 1900; i < 2050 && offset > 0; i++) {
			temp = this.lYearDays(i);
			offset -= temp;
			lunarObj.monCyl += 12;
		}
		if (offset < 0) {
			offset += temp;
			i--;
			lunarObj.monCyl -= 12;
		}
		
		lunarObj.year = i;
		lunarObj.yearCyl = i - 1864;
		leap = this.leapMonth(i);
		lunarObj.isLeap = false;
		for (i = 1; i < 13 && offset > 0; i++) {
			if (leap > 0 && i == (leap + 1) && lunarObj.isLeap == false) {
				--i;
				lunarObj.isLeap = true;
				temp = this.leapDays(lunarObj.year);
			}
			else {
				temp = this.monthDays(lunarObj.year, i)
			}
			if (lunarObj.isLeap == true && i == (leap + 1)) {
				lunarObj.isLeap = false;
			}
			offset -= temp;
			if (lunarObj.isLeap == false) {
				lunarObj.monCyl++;
			}
		}
		
		if (offset == 0 && leap > 0 && i == leap + 1) {
			if (lunarObj.isLeap) {
				lunarObj.isLeap = false;
			}
			else {
				lunarObj.isLeap = true;
				--i;
				--lunarObj.monCyl;
			}
		}
		
		if (offset < 0) {
			offset += temp;
			--i;
			--lunarObj.monCyl
		}
		lunarObj.month = i;
		lunarObj.day = offset + 1;
		this.lunarDate = lunarObj;
		return lunarObj;
	};
	LunarCalendar.prototype.getYearToString = function(){
		var str1=['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
			str2=['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
			y = (this.lunarDate.year)>>>0,
			result;
		result = str1[(y-4)%10] + str2[(y-4)%12] + "年";
		return result;
	}
	//获得月份,toString
	LunarCalendar.prototype.getMouthToString = function(){
		var str=[' ','正','二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '腊'],
			result,
			m = (this.lunarDate.month)>>>0;
		//超出或非法的月份
		if(m>12||m<1){
			return '';
		}
		result = str[m] + "月";
		return result;
	}
	//获得日子，toString
	LunarCalendar.prototype.getDateToString = function(){
		var str1 = ['初', '十', '廿', '三', '　'],
			str2 = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
			d = this.lunarDate.day,
			result,
			bits, ten;//个位，十位
		//超出或非法的结果
		if(d>39||d<0){
			return '';
		}
		bits = (d%10)>>>0;
		ten = (d/10)>>>0;
		if(d == 10){
			result = "初十";
		}else{
			result = str1[ten] + str2[bits];
		}
		return result;
	}
	LunarCalendar.prototype.test = function(){
		var result =this.getYearToString() + this.getMouthToString() + this.getDateToString();
		return result;
	}
	 
	 

	/* Date picker manager.
	   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
	   Settings for (groups of) date pickers are maintained in an instance object,
	   allowing multiple different settings on the same page. */

	function Datepicker() {
		this.debug = false; // Change this to true to start debugging
		this._curInst = null; // The current instance in use
		this._keyEvent = false; // If the last event was a key event
		this._disabledInputs = []; // List of date picker inputs that have been disabled
		this._datepickerShowing = false; // True if the popup picker is showing , false if not
		this._inDialog = false; // True if showing within a "dialog", false if not
		this._mainDivId = 'ui-datepicker-div'; // The ID of the main datepicker division
		this._inlineClass = 'ui-datepicker-inline'; // The name of the inline marker class
		this._appendClass = 'ui-datepicker-append'; // The name of the append marker class
		this._triggerClass = 'ui-datepicker-trigger'; // The name of the trigger marker class
		this._dialogClass = 'ui-datepicker-dialog'; // The name of the dialog marker class
		this._disableClass = 'ui-datepicker-disabled'; // The name of the disabled covering marker class
		this._unselectableClass = 'ui-datepicker-unselectable'; // The name of the unselectable cell marker class
		this._currentClass = 'ui-datepicker-current-day'; // The name of the current day marker class
		this._dayOverClass = 'ui-datepicker-days-cell-over'; // The name of the day hover marker class
		this.regional = []; // Available regional settings, indexed by language code
		this.regional[''] = { // Default regional settings
			closeText: 'Done', // Display text for close link
			prevText: 'Prev', // Display text for previous month link
			nextText: 'Next', // Display text for next month link
			currentText: 'Today', // Display text for current month link
			clearText: 'Clear',//马驰添加，清空按钮
			monthNames: ['January','February','March','April','May','June',
				'July','August','September','October','November','December'], // Names of months for drop-down and formatting
			monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
			dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
			dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
			dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
			weekHeader: 'Wk', // Column header for week of the year
			dateFormat: 'mm/dd/yy', // See format options on parseDate
			firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL: false, // True if right-to-left language, false if left-to-right
			showMonthAfterYear: false, // True if the year select precedes month, false for month then year
			yearSuffix: '' // Additional text to append to the year in the month headers
		};
		this._defaults = { // Global defaults for all the date picker instances
			showOn: 'focus', // 'focus' for popup on focus,
				// 'button' for trigger button, or 'both' for either
			showAnim: 'fadeIn', // Name of jQuery animation for popup
			showOptions: {}, // Options for enhanced animations
			defaultDate: null, // Used when field is blank: actual date,
				// +/-number for offset from today, null for today
			appendText: '', // Display text following the input box, e.g. showing the format
			buttonText: '...', // Text for trigger button
			buttonImage: '', // URL for trigger button image
			buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
			hideIfNoPrevNext: false, // True to hide next/previous month links
				// if not applicable, false to just disable them
			navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
			gotoCurrent: false, // True if today link goes back to current selection instead
			changeMonth: false, // True if month can be selected directly, false if only prev/next
			changeYear: false, // True if year can be selected directly, false if only prev/next
			yearRange: 'c-10:c+10', // Range of years to display in drop-down,
				// either relative to today's year (-nn:+nn), relative to currently displayed year
				// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
			showOtherMonths: true, // True to show dates in other months, false to leave blank
			selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
			showWeek: false, // True to show week of the year, false to not show it
			calculateWeek: this.iso8601Week, // How to calculate the week of the year,
				// takes a Date and returns the number of the week for it
			shortYearCutoff: '+10', // Short year values < this are in the current century,
				// > this are in the previous century,
				// string value starting with '+' for current year + value
			minDate: null, // The earliest selectable date, or null for no limit
			maxDate: null, // The latest selectable date, or null for no limit
			duration: 'fast', // Duration of display/closure
			beforeShowDay: null, // Function that takes a date and returns an array with
				// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
				// [2] = cell title (optional), e.g. $.datepicker.noWeekends
			beforeShow: null, // Function that takes an input field and
				// returns a set of custom settings for the date picker
			onSelect: null, // Define a callback function when a date is selected
			onChangeMonthYear: null, // Define a callback function when the month or year is changed
			onClose: null, // Define a callback function when the datepicker is closed
			numberOfMonths: 1, // Number of months to show at a time
			showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
			stepMonths: 1, // Number of months to step back/forward
			stepBigMonths: 12, // Number of months to step back/forward for the big links
			altField: '', // Selector for an alternate field to store selected dates into
			altFormat: '', // The date format to use for the alternate field
			constrainInput: true, // The input is constrained by the current date format
			showButtonPanel: false, // True to show button panel, false to not show it
			autoSize: false, // True to size the input for the date format, false to leave as is
			disabled: false, // The initial disabled state
			//马驰添加与修改
			isShowLunarCal: false, //是否显示农历日期
			isShowFestival: false, //是否显示节假日列表
			//节假日列表，注：isShowFestival必须为true时有效。
			// 数据类型：{"2013-03-04":"清明节*","日期":"节日名称"} 列表中的节日名称若以"*"结尾的，将在日历上显示星号
			festivalList: {},
			clearBtn: false//马驰添加，是否显示清空按钮。注意！如果该值为true，则当月按钮的功能将会被替换。
			
		};
		$.extend(this._defaults, this.regional['']);
		this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
	}

	$.extend(Datepicker.prototype, {
		/* Class name added to elements to indicate already configured with a date picker. */
		markerClassName: 'hasDatepicker',

		//Keep track of the maximum number of rows displayed (see #7043)
		maxRows: 4,

		/* Debug logging (if enabled). */
		log: function () {
			if (this.debug)
				console.log.apply('', arguments);
		},

		// TODO rename to "widget" when switching to widget factory
		_widgetDatepicker: function() {
			return this.dpDiv;
		},

		/* Override the default settings for all instances of the date picker.
		   @param  settings  object - the new settings to use as defaults (anonymous object)
		   @return the manager object */
		setDefaults: function(settings) {
			extendRemove(this._defaults, settings || {});
			return this;
		},

		/* Attach the date picker to a jQuery selection.
		   @param  target    element - the target input field or division or span
		   @param  settings  object - the new settings to use for this date picker instance (anonymous) */
		_attachDatepicker: function(target, settings) {
			// check for settings on the control itself - in namespace 'date:'
			var inlineSettings = null;
			for (var attrName in this._defaults) {
				var attrValue = target.getAttribute('date:' + attrName);
				if (attrValue) {
					inlineSettings = inlineSettings || {};
					try {
						inlineSettings[attrName] = eval(attrValue);
					} catch (err) {
						inlineSettings[attrName] = attrValue;
					}
				}
			}
			var nodeName = target.nodeName.toLowerCase();
			var inline = (nodeName == 'div' || nodeName == 'span');
			if (!target.id) {
				this.uuid += 1;
				target.id = 'dp' + this.uuid;
			}
			var inst = this._newInst($(target), inline);
			//马驰修改，如果存在节日列表，则将新的节日和defult中的节日合并
			settings&&settings.festivalList&&(settings.festivalList=$.extend({},this._defaults.festivalList,settings.festivalList));
			inst.settings = $.extend({}, settings || {}, inlineSettings || {});
			if (nodeName == 'input') {
				this._connectDatepicker(target, inst);
			} else if (inline) {
				this._inlineDatepicker(target, inst);
			}
		},

		/* Create a new instance object. */
		_newInst: function(target, inline) {
			var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars
			return {id: id, input: target, // associated target
				selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
				drawMonth: 0, drawYear: 0, // month being drawn
				inline: inline, // is datepicker inline or not
				dpDiv: (!inline ? this.dpDiv : // presentation div
				bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))};
		},

		/* Attach the date picker to an input field. */
		_connectDatepicker: function(target, inst) {
			var input = $(target);
			inst.append = $([]);
			inst.trigger = $([]);
			if (input.hasClass(this.markerClassName))
				return;
			this._attachments(input, inst);
			input.addClass(this.markerClassName).keydown(this._doKeyDown).
				keypress(this._doKeyPress).keyup(this._doKeyUp).
				bind("setData.datepicker", function(event, key, value) {
					inst.settings[key] = value;
				}).bind("getData.datepicker", function(event, key) {
					return this._get(inst, key);
				});
			this._autoSize(inst);
			$.data(target, PROP_NAME, inst);
			//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
			if( inst.settings.disabled ) {
				this._disableDatepicker( target );
			}
		},

		/* Make attachments based on settings. */
		_attachments: function(input, inst) {
			var appendText = this._get(inst, 'appendText');
			var isRTL = this._get(inst, 'isRTL');
			if (inst.append)
				inst.append.remove();
			if (appendText) {
				inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
				input[isRTL ? 'before' : 'after'](inst.append);
			}
			input.unbind('focus', this._showDatepicker);
			if (inst.trigger)
				inst.trigger.remove();
			var showOn = this._get(inst, 'showOn');
			if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
				input.focus(this._showDatepicker);
			if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
				var buttonText = this._get(inst, 'buttonText');
				var buttonImage = this._get(inst, 'buttonImage');
				inst.trigger = $(this._get(inst, 'buttonImageOnly') ?
					$('<img/>').addClass(this._triggerClass).
						attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
					$('<button type="button"></button>').addClass(this._triggerClass).
						html(buttonImage == '' ? buttonText : $('<img/>').attr(
						{ src:buttonImage, alt:buttonText, title:buttonText })));
				input[isRTL ? 'before' : 'after'](inst.trigger);
				inst.trigger.click(function() {
					if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
						$.datepicker._hideDatepicker();
					else if ($.datepicker._datepickerShowing && $.datepicker._lastInput != input[0]) {
						$.datepicker._hideDatepicker();
						$.datepicker._showDatepicker(input[0]);
					} else
						$.datepicker._showDatepicker(input[0]);
					return false;
				});
			}
		},

		/* Apply the maximum length for the date format. */
		_autoSize: function(inst) {
			if (this._get(inst, 'autoSize') && !inst.inline) {
				var date = new Date(2009, 12 - 1, 20); // Ensure double digits
				var dateFormat = this._get(inst, 'dateFormat');
				if (dateFormat.match(/[DM]/)) {
					var findMax = function(names) {
						var max = 0;
						var maxI = 0;
						for (var i = 0; i < names.length; i++) {
							if (names[i].length > max) {
								max = names[i].length;
								maxI = i;
							}
						}
						return maxI;
					};
					date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
						'monthNames' : 'monthNamesShort'))));
					date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
						'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
				}
				inst.input.attr('size', this._formatDate(inst, date).length);
			}
		},

		/* Attach an inline date picker to a div. */
		_inlineDatepicker: function(target, inst) {
			var divSpan = $(target);
			if (divSpan.hasClass(this.markerClassName))
				return;
			divSpan.addClass(this.markerClassName).append(inst.dpDiv).
				bind("setData.datepicker", function(event, key, value){
					inst.settings[key] = value;
				}).bind("getData.datepicker", function(event, key){
					return this._get(inst, key);
				});
			$.data(target, PROP_NAME, inst);
			this._setDate(inst, this._getDefaultDate(inst), true);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
			//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
			if( inst.settings.disabled ) {
				this._disableDatepicker( target );
			}
			// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
			// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
			inst.dpDiv.css( "display", "block" );
		},

		/* Pop-up the date picker in a "dialog" box.
		   @param  input     element - ignored
		   @param  date      string or Date - the initial date to display
		   @param  onSelect  function - the function to call when a date is selected
		   @param  settings  object - update the dialog date picker instance's settings (anonymous object)
		   @param  pos       int[2] - coordinates for the dialog's position within the screen or
		                     event - with x/y coordinates or
		                     leave empty for default (screen centre)
		   @return the manager object */
		_dialogDatepicker: function(input, date, onSelect, settings, pos) {
			var inst = this._dialogInst; // internal instance
			if (!inst) {
				this.uuid += 1;
				var id = 'dp' + this.uuid;
				this._dialogInput = $('<input type="text" id="' + id +
					'" style="position: absolute; top: -100px; width: 0px;"/>');
				this._dialogInput.keydown(this._doKeyDown);
				$('body').append(this._dialogInput);
				inst = this._dialogInst = this._newInst(this._dialogInput, false);
				inst.settings = {};
				$.data(this._dialogInput[0], PROP_NAME, inst);
			}
			extendRemove(inst.settings, settings || {});
			date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
			this._dialogInput.val(date);

			this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
			if (!this._pos) {
				var browserWidth = document.documentElement.clientWidth;
				var browserHeight = document.documentElement.clientHeight;
				var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = // should use actual width/height below
					[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
			}

			// move input on screen for focus, but hidden behind dialog
			this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
			inst.settings.onSelect = onSelect;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			if ($.blockUI)
				$.blockUI(this.dpDiv);
			$.data(this._dialogInput[0], PROP_NAME, inst);
			return this;
		},

		/* Detach a datepicker from its control.
		   @param  target    element - the target input field or division or span */
		_destroyDatepicker: function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if (!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			$.removeData(target, PROP_NAME);
			if (nodeName == 'input') {
				inst.append.remove();
				inst.trigger.remove();
				$target.removeClass(this.markerClassName).
					unbind('focus', this._showDatepicker).
					unbind('keydown', this._doKeyDown).
					unbind('keypress', this._doKeyPress).
					unbind('keyup', this._doKeyUp);
			} else if (nodeName == 'div' || nodeName == 'span')
				$target.removeClass(this.markerClassName).empty();
		},

		/* Enable the date picker to a jQuery selection.
		   @param  target    element - the target input field or division or span */
		_enableDatepicker: function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if (!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			if (nodeName == 'input') {
				target.disabled = false;
				inst.trigger.filter('button').
					each(function() { this.disabled = false; }).end().
					filter('img').css({opacity: '1.0', cursor: ''});
			}
			else if (nodeName == 'div' || nodeName == 'span') {
				var inline = $target.children('.' + this._inlineClass);
				inline.children().removeClass('ui-state-disabled');
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
					prop("disabled", false);
			}
			this._disabledInputs = $.map(this._disabledInputs,
				function(value) { return (value == target ? null : value); }); // delete entry
		},

		/* Disable the date picker to a jQuery selection.
		   @param  target    element - the target input field or division or span */
		_disableDatepicker: function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if (!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			if (nodeName == 'input') {
				target.disabled = true;
				inst.trigger.filter('button').
					each(function() { this.disabled = true; }).end().
					filter('img').css({opacity: '0.5', cursor: 'default'});
			}
			else if (nodeName == 'div' || nodeName == 'span') {
				var inline = $target.children('.' + this._inlineClass);
				inline.children().addClass('ui-state-disabled');
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
					prop("disabled", true);
			}
			this._disabledInputs = $.map(this._disabledInputs,
				function(value) { return (value == target ? null : value); }); // delete entry
			this._disabledInputs[this._disabledInputs.length] = target;
		},

		/* Is the first field in a jQuery collection disabled as a datepicker?
		   @param  target    element - the target input field or division or span
		   @return boolean - true if disabled, false if enabled */
		_isDisabledDatepicker: function(target) {
			if (!target) {
				return false;
			}
			for (var i = 0; i < this._disabledInputs.length; i++) {
				if (this._disabledInputs[i] == target)
					return true;
			}
			return false;
		},

		/* Retrieve the instance data for the target control.
		   @param  target  element - the target input field or division or span
		   @return  object - the associated instance data
		   @throws  error if a jQuery problem getting data */
		_getInst: function(target) {
			try {
				return $.data(target, PROP_NAME);
			}
			catch (err) {
				throw 'Missing instance data for this datepicker';
			}
		},

		/* Update or retrieve the settings for a date picker attached to an input field or division.
		   @param  target  element - the target input field or division or span
		   @param  name    object - the new settings to update or
		                   string - the name of the setting to change or retrieve,
		                   when retrieving also 'all' for all instance settings or
		                   'defaults' for all global defaults
		   @param  value   any - the new value for the setting
		                   (omit if above is an object or to retrieve a value) */
		_optionDatepicker: function(target, name, value) {
			var inst = this._getInst(target);
			if (arguments.length == 2 && typeof name == 'string') {
				return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) :
					(inst ? (name == 'all' ? $.extend({}, inst.settings) :
					this._get(inst, name)) : null));
			}
			var settings = name || {};
			if (typeof name == 'string') {
				settings = {};
				settings[name] = value;
			}
			if (inst) {
				if (this._curInst == inst) {
					this._hideDatepicker();
				}
				var date = this._getDateDatepicker(target, true);
				var minDate = this._getMinMaxDate(inst, 'min');
				var maxDate = this._getMinMaxDate(inst, 'max');
				extendRemove(inst.settings, settings);
				// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
				if (minDate !== null && settings['dateFormat'] !== undefined && settings['minDate'] === undefined)
					inst.settings.minDate = this._formatDate(inst, minDate);
				if (maxDate !== null && settings['dateFormat'] !== undefined && settings['maxDate'] === undefined)
					inst.settings.maxDate = this._formatDate(inst, maxDate);
				this._attachments($(target), inst);
				this._autoSize(inst);
				this._setDate(inst, date);
				this._updateAlternate(inst);
				this._updateDatepicker(inst);
			}
		},

		// change method deprecated
		_changeDatepicker: function(target, name, value) {
			this._optionDatepicker(target, name, value);
		},

		/* Redraw the date picker attached to an input field or division.
		   @param  target  element - the target input field or division or span */
		_refreshDatepicker: function(target) {
			var inst = this._getInst(target);
			if (inst) {
				this._updateDatepicker(inst);
			}
		},

		/* Set the dates for a jQuery selection.
		   @param  target   element - the target input field or division or span
		   @param  date     Date - the new date */
		_setDateDatepicker: function(target, date) {
			var inst = this._getInst(target);
			if (inst) {
				this._setDate(inst, date);
				this._updateDatepicker(inst);
				this._updateAlternate(inst);
			}
		},

		/* Get the date(s) for the first entry in a jQuery selection.
		   @param  target     element - the target input field or division or span
		   @param  noDefault  boolean - true if no default date is to be used
		   @return Date - the current date */
		_getDateDatepicker: function(target, noDefault) {
			var inst = this._getInst(target);
			if (inst && !inst.inline)
				this._setDateFromField(inst, noDefault);
			return (inst ? this._getDate(inst) : null);
		},

		/* Handle keystrokes. */
		_doKeyDown: function(event) {
			var inst = $.datepicker._getInst(event.target);
			var handled = true;
			var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
			inst._keyEvent = true;
			if ($.datepicker._datepickerShowing)
				switch (event.keyCode) {
					case 9: $.datepicker._hideDatepicker();
							handled = false;
							break; // hide on tab out
					case 13: var sel = $('td.' + $.datepicker._dayOverClass + ':not(.' +
										$.datepicker._currentClass + ')', inst.dpDiv);
							if (sel[0])
								$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
								var onSelect = $.datepicker._get(inst, 'onSelect');
								if (onSelect) {
									var dateStr = $.datepicker._formatDate(inst);

									// trigger custom callback
									onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
								}
							else
								$.datepicker._hideDatepicker();
							return false; // don't submit the form
							break; // select the value on enter
					case 27: $.datepicker._hideDatepicker();
							break; // hide on escape
					case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
								-$.datepicker._get(inst, 'stepBigMonths') :
								-$.datepicker._get(inst, 'stepMonths')), 'M');
							break; // previous month/year on page up/+ ctrl
					case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
								+$.datepicker._get(inst, 'stepBigMonths') :
								+$.datepicker._get(inst, 'stepMonths')), 'M');
							break; // next month/year on page down/+ ctrl
					case 35: if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
							handled = event.ctrlKey || event.metaKey;
							break; // clear on ctrl or command +end
					case 36: if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
							handled = event.ctrlKey || event.metaKey;
							break; // current on ctrl or command +home
					case 37: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
							handled = event.ctrlKey || event.metaKey;
							// -1 day on ctrl or command +left
							if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
										-$.datepicker._get(inst, 'stepBigMonths') :
										-$.datepicker._get(inst, 'stepMonths')), 'M');
							// next month/year on alt +left on Mac
							break;
					case 38: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, 'D');
							handled = event.ctrlKey || event.metaKey;
							break; // -1 week on ctrl or command +up
					case 39: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
							handled = event.ctrlKey || event.metaKey;
							// +1 day on ctrl or command +right
							if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ?
										+$.datepicker._get(inst, 'stepBigMonths') :
										+$.datepicker._get(inst, 'stepMonths')), 'M');
							// next month/year on alt +right
							break;
					case 40: if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, 'D');
							handled = event.ctrlKey || event.metaKey;
							break; // +1 week on ctrl or command +down
					default: handled = false;
				}
			else if (event.keyCode == 36 && event.ctrlKey) // display the date picker on ctrl+home
				$.datepicker._showDatepicker(this);
			else {
				handled = false;
			}
			if (handled) {
				event.preventDefault();
				event.stopPropagation();
			}
		},

		/* Filter entered characters - based on date format. */
		_doKeyPress: function(event) {
			var inst = $.datepicker._getInst(event.target);
			if ($.datepicker._get(inst, 'constrainInput')) {
				var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
				var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
				return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
			}
		},

		/* Synchronise manual entry and field/alternate field. */
		_doKeyUp: function(event) {
			var inst = $.datepicker._getInst(event.target);
			if (inst.input.val() != inst.lastVal) {
				try {
					var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
						(inst.input ? inst.input.val() : null),
						$.datepicker._getFormatConfig(inst));
					if (date) { // only if valid
						$.datepicker._setDateFromField(inst);
						$.datepicker._updateAlternate(inst);
						$.datepicker._updateDatepicker(inst);
					}
				}
				catch (err) {
					$.datepicker.log(err);
				}
			}
			return true;
		},

		/* Pop-up the date picker for a given input field.
		   If false returned from beforeShow event handler do not show.
		   @param  input  element - the input field attached to the date picker or
		                  event - if triggered by focus */
		_showDatepicker: function(input) {
			input = input.target || input;
			if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
				input = $('input', input.parentNode)[0];
			if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
				return;
			var inst = $.datepicker._getInst(input);
			if ($.datepicker._curInst && $.datepicker._curInst != inst) {
				$.datepicker._curInst.dpDiv.stop(true, true);
				if ( inst && $.datepicker._datepickerShowing ) {
					$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
				}
			}
			var beforeShow = $.datepicker._get(inst, 'beforeShow');
			var beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
			if(beforeShowSettings === false){
				//false
				return;
			}
			extendRemove(inst.settings, beforeShowSettings);
			inst.lastVal = null;
			$.datepicker._lastInput = input;
			$.datepicker._setDateFromField(inst);
			if ($.datepicker._inDialog) // hide cursor
				input.value = '';
			if (!$.datepicker._pos) { // position below input
				$.datepicker._pos = $.datepicker._findPos(input);
				$.datepicker._pos[1] += input.offsetHeight; // add the height
			}
			var isFixed = false;
			$(input).parents().each(function() {
				isFixed |= $(this).css('position') == 'fixed';
				return !isFixed;
			});
			var offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
			$.datepicker._pos = null;
			//to avoid flashes on Firefox
			inst.dpDiv.empty();
			// determine sizing offscreen
			inst.dpDiv.css({position: 'absolute', display: 'block', top: '-1000px'});
			$.datepicker._updateDatepicker(inst);
			// fix width for dynamic number of date pickers
			// and adjust position before showing
			offset = $.datepicker._checkOffset(inst, offset, isFixed);
			inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
				'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
				left: offset.left + 'px', top: offset.top + 'px'});
			if (!inst.inline) {
				var showAnim = $.datepicker._get(inst, 'showAnim');
				var duration = $.datepicker._get(inst, 'duration');
				var postProcess = function() {
					var cover = inst.dpDiv.find('iframe.ui-datepicker-cover'); // IE6- only
					if( !! cover.length ){
						var borders = $.datepicker._getBorders(inst.dpDiv);
						cover.css({left: -borders[0], top: -borders[1],
							width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()});
					}
				};
				//该位置存在问题，根据这部分的需求，zindex必须大于2，因此，进行修改
				//inst.dpDiv.zIndex($(input).zIndex()+1);
				inst.dpDiv.zIndex($(input).zIndex()+20);
				$.datepicker._datepickerShowing = true;

				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) )
					inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
				else
					inst.dpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess);
				if (!showAnim || !duration)
					postProcess();
				if (inst.input.is(':visible') && !inst.input.is(':disabled'))
					inst.input.focus();
				$.datepicker._curInst = inst;
			}
		},

		/* Generate the date picker content. */
		_updateDatepicker: function(inst) {
			this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
			var borders = $.datepicker._getBorders(inst.dpDiv);
			instActive = inst; // for delegate hover events
			inst.dpDiv.empty().append(this._generateHTML(inst));
			this._attachHandlers(inst);
			var cover = inst.dpDiv.find('iframe.ui-datepicker-cover'); // IE6- only
			if( !!cover.length ){ //avoid call to outerXXXX() when not in IE6
				cover.css({left: -borders[0], top: -borders[1], width: inst.dpDiv.outerWidth(), height: inst.dpDiv.outerHeight()})
			}
			inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
			var numMonths = this._getNumberOfMonths(inst);
			var cols = numMonths[1];
			var width = 20;
			inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
			if (cols > 1)
				inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
			inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
				'Class']('ui-datepicker-multi');
			inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
				'Class']('ui-datepicker-rtl');
			if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input &&
					// #6694 - don't focus the input if it's already focused
					// this breaks the change event in IE
					inst.input.is(':visible') && !inst.input.is(':disabled') && inst.input[0] != document.activeElement)
				inst.input.focus();
			// deffered render of the years select (to avoid flashes on Firefox)
			if( inst.yearshtml ){
				var origyearshtml = inst.yearshtml;
				setTimeout(function(){
					//assure that inst.yearshtml didn't change.
					if( origyearshtml === inst.yearshtml && inst.yearshtml ){
						inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
					}
					origyearshtml = inst.yearshtml = null;
				}, 0);
			}
		},

		/* Retrieve the size of left and top borders for an element.
		   @param  elem  (jQuery object) the element of interest
		   @return  (number[2]) the left and top borders */
		_getBorders: function(elem) {
			var convert = function(value) {
				return {thin: 1, medium: 2, thick: 3}[value] || value;
			};
			return [parseFloat(convert(elem.css('border-left-width'))),
				parseFloat(convert(elem.css('border-top-width')))];
		},

		/* Check positioning to remain on screen. */
		_checkOffset: function(inst, offset, isFixed) {
			var dpWidth = inst.dpDiv.outerWidth();
			var dpHeight = inst.dpDiv.outerHeight();
			var inputWidth = inst.input ? inst.input.outerWidth() : 0;
			var inputHeight = inst.input ? inst.input.outerHeight() : 0;
			var viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft());
			var viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

			offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
			offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
			offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

			// now check if datepicker is showing outside window viewport - move to a better place if so.
			offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
				Math.abs(offset.left + dpWidth - viewWidth) : 0);
			offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
				Math.abs(dpHeight + inputHeight) : 0);

			return offset;
		},

		/* Find an object's position on the screen. */
		_findPos: function(obj) {
			var inst = this._getInst(obj);
			var isRTL = this._get(inst, 'isRTL');
			while (obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
				obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
			}
			var position = $(obj).offset();
			return [position.left, position.top];
		},

		/* Hide the date picker from view.
		   @param  input  element - the input field attached to the date picker */
		_hideDatepicker: function(input) {
			var inst = this._curInst;
			if (!inst || (input && inst != $.data(input, PROP_NAME)))
				return;
			if (this._datepickerShowing) {
				var showAnim = this._get(inst, 'showAnim');
				var duration = this._get(inst, 'duration');
				var postProcess = function() {
					$.datepicker._tidyDialog(inst);
				};

				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) )
					inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
				else
					inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
						(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess);
				if (!showAnim)
					postProcess();
				this._datepickerShowing = false;
				var onClose = this._get(inst, 'onClose');
				if (onClose)
					onClose.apply((inst.input ? inst.input[0] : null),
						[(inst.input ? inst.input.val() : ''), inst]);
				this._lastInput = null;
				if (this._inDialog) {
					this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
					if ($.blockUI) {
						$.unblockUI();
						$('body').append(this.dpDiv);
					}
				}
				this._inDialog = false;
			}
		},

		/* Tidy up after a dialog display. */
		_tidyDialog: function(inst) {
			inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
		},

		/* Close date picker if clicked elsewhere. */
		_checkExternalClick: function(event) {
			if (!$.datepicker._curInst)
				return;

			var $target = $(event.target),
				inst = $.datepicker._getInst($target[0]);

			if ( ( ( $target[0].id != $.datepicker._mainDivId &&
					$target.parents('#' + $.datepicker._mainDivId).length == 0 &&
					!$target.hasClass($.datepicker.markerClassName) &&
					!$target.closest("." + $.datepicker._triggerClass).length &&
					$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
				( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst ) )
				$.datepicker._hideDatepicker();
		},

		/* Adjust one of the date sub-fields. */
		_adjustDate: function(id, offset, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if (this._isDisabledDatepicker(target[0])) {
				return;
			}
			this._adjustInstDate(inst, offset +
				(period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
				period);
			this._updateDatepicker(inst);
		},

		/* Action for current link. */
		_gotoToday: function(id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
				inst.selectedDay = inst.currentDay;
				inst.drawMonth = inst.selectedMonth = inst.currentMonth;
				inst.drawYear = inst.selectedYear = inst.currentYear;
			}
			else {
				var date = new Date();
				inst.selectedDay = date.getDate();
				inst.drawMonth = inst.selectedMonth = date.getMonth();
				inst.drawYear = inst.selectedYear = date.getFullYear();
			}
			this._notifyChange(inst);
			this._adjustDate(target);
		},

		/* Action for selecting a new month/year. */
		_selectMonthYear: function(id, select, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			inst['selected' + (period == 'M' ? 'Month' : 'Year')] =
			inst['draw' + (period == 'M' ? 'Month' : 'Year')] =
				parseInt(select.options[select.selectedIndex].value,10);
			this._notifyChange(inst);
			this._adjustDate(target);
		},

		/* Action for selecting a day. */
		_selectDay: function(id, month, year, td) {
			var target = $(id);
			if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
				return;
			}
			var inst = this._getInst(target[0]);
			//inst.selectedDay = inst.currentDay = $('a', td).html();//马驰修改，由于添加了阴历，因此日期就不能再从html中得到了
			inst.selectedDay = inst.currentDay = $('a', td).attr('tui_day');
			inst.selectedMonth = inst.currentMonth = month;
			inst.selectedYear = inst.currentYear = year;
			this._selectDate(id, this._formatDate(inst,
				inst.currentDay, inst.currentMonth, inst.currentYear));
		},

		/* Erase the input field and hide the date picker. */
		_clearDate: function(id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			this._selectDate(target, '');
		},

		/* 马驰添加，针对clearDate方法中，除了删除输入框内的内容外，还隐藏picker，该方法不会隐藏picker*/
		_clearDateWithPicker: function (id){
			var target = $(id);
			var inst = this._getInst(target[0]);
			this._setDate(inst);
		},

		/* Update the input field with the selected date. */
		_selectDate: function(id, dateStr) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
			if (inst.input)
				inst.input.val(dateStr);
			this._updateAlternate(inst);
			var onSelect = this._get(inst, 'onSelect');
			if (onSelect)
				onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
			else if (inst.input)
				inst.input.trigger('change'); // fire the change event
			if (inst.inline)
				this._updateDatepicker(inst);
			else {
				this._hideDatepicker();
				this._lastInput = inst.input[0];
				if (typeof(inst.input[0]) != 'object')
					inst.input.focus(); // restore focus
				this._lastInput = null;
			}
		},

		/* Update any alternate field to synchronise with the main field. */
		_updateAlternate: function(inst) {
			var altField = this._get(inst, 'altField');
			if (altField) { // update alternate field too
				var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
				var date = this._getDate(inst);
				var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
				$(altField).each(function() { $(this).val(dateStr); });
			}
		},

		/* Set as beforeShowDay function to prevent selection of weekends.
		   @param  date  Date - the date to customise
		   @return [boolean, string] - is this date selectable?, what is its CSS class? */
		noWeekends: function(date) {
			var day = date.getDay();
			return [(day > 0 && day < 6), ''];
		},

		/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
		   @param  date  Date - the date to get the week for
		   @return  number - the number of the week within the year that contains this date */
		iso8601Week: function(date) {
			var checkDate = new Date(date.getTime());
			// Find Thursday of this week starting on Monday
			checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
			var time = checkDate.getTime();
			checkDate.setMonth(0); // Compare with Jan 1
			checkDate.setDate(1);
			return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
		},

		/* Parse a string value into a date object.
		   See formatDate below for the possible formats.

		   @param  format    string - the expected format of the date
		   @param  value     string - the date in the above format
		   @param  settings  Object - attributes include:
		                     shortYearCutoff  number - the cutoff year for determining the century (optional)
		                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
		                     dayNames         string[7] - names of the days from Sunday (optional)
		                     monthNamesShort  string[12] - abbreviated names of the months (optional)
		                     monthNames       string[12] - names of the months (optional)
		   @return  Date - the extracted date value or null if value is blank */
		parseDate: function (format, value, settings) {
			if (format == null || value == null)
				throw 'Invalid arguments';
			value = (typeof value == 'object' ? value.toString() : value + '');
			if (value == '')
				return null;
			var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
			shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
					new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
			var year = -1;
			var month = -1;
			var day = -1;
			var doy = -1;
			var literal = false;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if (matches)
					iFormat++;
				return matches;
			};
			// Extract a number from the string value
			var getNumber = function(match) {
				var isDoubled = lookAhead(match);
				var size = (match == '@' ? 14 : (match == '!' ? 20 :
					(match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
				var digits = new RegExp('^\\d{1,' + size + '}');
				var num = value.substring(iValue).match(digits);
				if (!num)
					throw 'Missing number at position ' + iValue;
				iValue += num[0].length;
				return parseInt(num[0], 10);
			};
			// Extract a name from the string value and convert to an index
			var getName = function(match, shortNames, longNames) {
				var names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
					return [ [k, v] ];
				}).sort(function (a, b) {
					return -(a[1].length - b[1].length);
				});
				var index = -1;
				$.each(names, function (i, pair) {
					var name = pair[1];
					if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
						index = pair[0];
						iValue += name.length;
						return false;
					}
				});
				if (index != -1)
					return index + 1;
				else
					throw 'Unknown name at position ' + iValue;
			};
			// Confirm that a literal character matches the string value
			var checkLiteral = function() {
				if (value.charAt(iValue) != format.charAt(iFormat))
					throw 'Unexpected literal at position ' + iValue;
				iValue++;
			};
			var iValue = 0;
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						checkLiteral();
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							day = getNumber('d');
							break;
						case 'D':
							getName('D', dayNamesShort, dayNames);
							break;
						case 'o':
							doy = getNumber('o');
							break;
						case 'm':
							month = getNumber('m');
							break;
						case 'M':
							month = getName('M', monthNamesShort, monthNames);
							break;
						case 'y':
							year = getNumber('y');
							break;
						case '@':
							var date = new Date(getNumber('@'));
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case '!':
							var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "'":
							if (lookAhead("'"))
								checkLiteral();
							else
								literal = true;
							break;
						default:
							checkLiteral();
					}
			}
			if (iValue < value.length){
				var extra = value.substr(iValue);
				if (!/^\s+/.test(extra)) {
					throw "Extra/unparsed characters found in date: " + extra;
				}
			}
			if (year == -1)
				year = new Date().getFullYear();
			else if (year < 100)
				year += new Date().getFullYear() - new Date().getFullYear() % 100 +
					(year <= shortYearCutoff ? 0 : -100);
			if (doy > -1) {
				month = 1;
				day = doy;
				do {
					var dim = this._getDaysInMonth(year, month - 1);
					if (day <= dim)
						break;
					month++;
					day -= dim;
				} while (true);
			}
			var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
			if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
				throw 'Invalid date'; // E.g. 31/02/00
			return date;
		},

		/* Standard date formats. */
		ATOM: 'yy-mm-dd', // RFC 3339 (ISO 8601)
		COOKIE: 'D, dd M yy',
		ISO_8601: 'yy-mm-dd',
		RFC_822: 'D, d M y',
		RFC_850: 'DD, dd-M-y',
		RFC_1036: 'D, d M y',
		RFC_1123: 'D, d M yy',
		RFC_2822: 'D, d M yy',
		RSS: 'D, d M y', // RFC 822
		TICKS: '!',
		TIMESTAMP: '@',
		W3C: 'yy-mm-dd', // ISO 8601

		_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
			Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

		/* Format a date object into a string value.
		   The format can be combinations of the following:
		   d  - day of month (no leading zero)
		   dd - day of month (two digit)
		   o  - day of year (no leading zeros)
		   oo - day of year (three digit)
		   D  - day name short
		   DD - day name long
		   m  - month of year (no leading zero)
		   mm - month of year (two digit)
		   M  - month name short
		   MM - month name long
		   y  - year (two digit)
		   yy - year (four digit)
		   @ - Unix timestamp (ms since 01/01/1970)
		   ! - Windows ticks (100ns since 01/01/0001)
		   '...' - literal text
		   '' - single quote

		   @param  format    string - the desired format of the date
		   @param  date      Date - the date value to format
		   @param  settings  Object - attributes include:
		                     dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
		                     dayNames         string[7] - names of the days from Sunday (optional)
		                     monthNamesShort  string[12] - abbreviated names of the months (optional)
		                     monthNames       string[12] - names of the months (optional)
		   @return  string - the date in the above format */
		formatDate: function (format, date, settings) {
			if (!date)
				return '';
			var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if (matches)
					iFormat++;
				return matches;
			};
			// Format a number, with leading zero if necessary
			var formatNumber = function(match, value, len) {
				var num = '' + value;
				if (lookAhead(match))
					while (num.length < len)
						num = '0' + num;
				return num;
			};
			// Format a name, short or long as requested
			var formatName = function(match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value]);
			};
			var output = '';
			var literal = false;
			if (date)
				for (var iFormat = 0; iFormat < format.length; iFormat++) {
					if (literal)
						if (format.charAt(iFormat) == "'" && !lookAhead("'"))
							literal = false;
						else
							output += format.charAt(iFormat);
					else
						switch (format.charAt(iFormat)) {
							case 'd':
								output += formatNumber('d', date.getDate(), 2);
								break;
							case 'D':
								output += formatName('D', date.getDay(), dayNamesShort, dayNames);
								break;
							case 'o':
								output += formatNumber('o',
									Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
								break;
							case 'm':
								output += formatNumber('m', date.getMonth() + 1, 2);
								break;
							case 'M':
								output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
								break;
							case 'y':
								output += (lookAhead('y') ? date.getFullYear() :
									(date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
								break;
							case '@':
								output += date.getTime();
								break;
							case '!':
								output += date.getTime() * 10000 + this._ticksTo1970;
								break;
							case "'":
								if (lookAhead("'"))
									output += "'";
								else
									literal = true;
								break;
							default:
								output += format.charAt(iFormat);
						}
				}
			return output;
		},

		/* Extract all possible characters from the date format. */
		_possibleChars: function (format) {
			var chars = '';
			var literal = false;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if (matches)
					iFormat++;
				return matches;
			};
			for (var iFormat = 0; iFormat < format.length; iFormat++)
				if (literal)
					if (format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						chars += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd': case 'm': case 'y': case '@':
							chars += '0123456789';
							break;
						case 'D': case 'M':
							return null; // Accept anything
						case "'":
							if (lookAhead("'"))
								chars += "'";
							else
								literal = true;
							break;
						default:
							chars += format.charAt(iFormat);
					}
			return chars;
		},

		/* Get a setting value, defaulting if necessary. */
		_get: function(inst, name) {
			return inst.settings[name] !== undefined ?
				inst.settings[name] : this._defaults[name];
		},

		/* Parse existing date and initialise date picker. */
		_setDateFromField: function(inst, noDefault) {
			if (inst.input.val() == inst.lastVal) {
				return;
			}
			var dateFormat = this._get(inst, 'dateFormat');
			var dates = inst.lastVal = inst.input ? inst.input.val() : null;
			var date, defaultDate;
			date = defaultDate = this._getDefaultDate(inst);
			var settings = this._getFormatConfig(inst);
			try {
				date = this.parseDate(dateFormat, dates, settings) || defaultDate;
			} catch (event) {
				this.log(event);
				dates = (noDefault ? '' : dates);
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentDay = (dates ? date.getDate() : 0);
			inst.currentMonth = (dates ? date.getMonth() : 0);
			inst.currentYear = (dates ? date.getFullYear() : 0);
			this._adjustInstDate(inst);
		},

		/* Retrieve the default date shown on opening. */
		_getDefaultDate: function(inst) {
			return this._restrictMinMax(inst,
				this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
		},

		/* A date may be specified as an exact value or a relative one. */
		_determineDate: function(inst, date, defaultDate) {
			var offsetNumeric = function(offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date;
			};
			var offsetString = function(offset) {
				try {
					return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'),
						offset, $.datepicker._getFormatConfig(inst));
				}
				catch (e) {
					// Ignore
				}
				var date = (offset.toLowerCase().match(/^c/) ?
					$.datepicker._getDate(inst) : null) || new Date();
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDate();
				var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
				var matches = pattern.exec(offset);
				while (matches) {
					switch (matches[2] || 'd') {
						case 'd' : case 'D' :
							day += parseInt(matches[1],10); break;
						case 'w' : case 'W' :
							day += parseInt(matches[1],10) * 7; break;
						case 'm' : case 'M' :
							month += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case 'y': case 'Y' :
							year += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day);
			};
			var newDate = (date == null || date === '' ? defaultDate : (typeof date == 'string' ? offsetString(date) :
				(typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
			newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
			if (newDate) {
				newDate.setHours(0);
				newDate.setMinutes(0);
				newDate.setSeconds(0);
				newDate.setMilliseconds(0);
			}
			return this._daylightSavingAdjust(newDate);
		},

		/* Handle switch to/from daylight saving.
		   Hours may be non-zero on daylight saving cut-over:
		   > 12 when midnight changeover, but then cannot generate
		   midnight datetime, so jump to 1AM, otherwise reset.
		   @param  date  (Date) the date to check
		   @return  (Date) the corrected date */
		_daylightSavingAdjust: function(date) {
			if (!date) return null;
			date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
			return date;
		},

		/* Set the date(s) directly. */
		_setDate: function(inst, date, noChange) {
			var clear = !date;
			var origMonth = inst.selectedMonth;
			var origYear = inst.selectedYear;
			var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
			inst.selectedDay = inst.currentDay = newDate.getDate();
			inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
			inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
			if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
				this._notifyChange(inst);
			this._adjustInstDate(inst);
			if (inst.input) {
				inst.input.val(clear ? '' : this._formatDate(inst));
			}
		},

		/* Retrieve the date(s) directly. */
		_getDate: function(inst) {
			var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null :
				this._daylightSavingAdjust(new Date(
				inst.currentYear, inst.currentMonth, inst.currentDay)));
				return startDate;
		},

		/* Attach the onxxx handlers.  These are declared statically so
		 * they work with static code transformers like Caja.
		 */
		_attachHandlers: function(inst) {
			var stepMonths = this._get(inst, 'stepMonths');
			var id = '#' + inst.id.replace( /\\\\/g, "\\" );
			inst.dpDiv.find('[data-handler]').map(function () {
				var handler = {
					prev: function () {
						window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, -stepMonths, 'M');
					},
					next: function () {
						window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, +stepMonths, 'M');
					},
					hide: function () {
						window['DP_jQuery_' + dpuuid].datepicker._hideDatepicker();
					},
					today: function () {
						window['DP_jQuery_' + dpuuid].datepicker._gotoToday(id);
					},
					selectDay: function () {
						window['DP_jQuery_' + dpuuid].datepicker._selectDay(id, +this.getAttribute('data-month'), +this.getAttribute('data-year'), this);
						return false;
					},
					selectMonth: function () {
						window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'M');
						return false;
					},
					selectYear: function () {
						window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'Y');
						return false;
					},
					clear: function () {//马驰添加，增加了clear的功能。
						window['DP_jQuery_' + dpuuid].datepicker._clearDateWithPicker(id);
						return false;
					}
				};
				$(this).bind(this.getAttribute('data-event'), handler[this.getAttribute('data-handler')]);
			});
		},
		
		/* add by machi; get a format string by Date in yyyy-mm-dd*/
		_getDateFormatString: function(date){
			var yyyy = date.getFullYear(),
				mm = date.getMonth()+1,
				dd = date.getDate();
			return yyyy + "-" + (mm > 9 ? mm : "0" + mm) + "-" + (dd > 9 ? dd : "0"+dd);
		},

		/* Generate the HTML for the current state of the date picker. */
		_generateHTML: function(inst) {
			var today = new Date();
			today = this._daylightSavingAdjust(
				new Date(today.getFullYear(), today.getMonth(), today.getDate())); // clear time
			var isRTL = this._get(inst, 'isRTL');
			var showButtonPanel = this._get(inst, 'showButtonPanel');
			var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
			var clearBtn = this._get(inst, 'clearBtn');//马驰添加，是否显示清空
			var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
			var numMonths = this._getNumberOfMonths(inst);
			var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
			var stepMonths = this._get(inst, 'stepMonths');
			var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
			var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
				new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			var drawMonth = inst.drawMonth - showCurrentAtPos;
			var drawYear = inst.drawYear;
			if (drawMonth < 0) {
				drawMonth += 12;
				drawYear--;
			}
			if (maxDate) {
				var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
					maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
				maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
				while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
					drawMonth--;
					if (drawMonth < 0) {
						drawMonth = 11;
						drawYear--;
					}
				}
			}
			inst.drawMonth = drawMonth;
			inst.drawYear = drawYear;
			var prevText = this._get(inst, 'prevText');
			prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
				this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
				this._getFormatConfig(inst)));
			var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
				'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click"' +
				' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' :
				(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+ prevText +'"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
			var nextText = this._get(inst, 'nextText');
			nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
				this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
				this._getFormatConfig(inst)));
			var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
				'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click"' +
				' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' :
				(hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+ nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
			var currentText = this._get(inst, 'currentText');
			var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
			currentText = (!navigationAsDateFormat ? currentText :
				this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
			var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' +
				this._get(inst, 'closeText') + '</button>' : '');
			var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
				(this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-event="click" data-handler="' + (clearBtn ? 'clear' : 'today') + '"' +
				'>' + (clearBtn ? this._get(inst, 'clearText') : currentText) + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
			var firstDay = parseInt(this._get(inst, 'firstDay'),10);
			firstDay = (isNaN(firstDay) ? 0 : firstDay);
			var showWeek = this._get(inst, 'showWeek');
			var dayNames = this._get(inst, 'dayNames');
			var dayNamesShort = this._get(inst, 'dayNamesShort');
			var dayNamesMin = this._get(inst, 'dayNamesMin');
			var monthNames = this._get(inst, 'monthNames');
			var monthNamesShort = this._get(inst, 'monthNamesShort');
			var beforeShowDay = this._get(inst, 'beforeShowDay');
			var showOtherMonths = this._get(inst, 'showOtherMonths');
			var selectOtherMonths = this._get(inst, 'selectOtherMonths');
			var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
			var defaultDate = this._getDefaultDate(inst);
			var html = '';
			var isShowLunarCal = this._get(inst, 'isShowLunarCal');//马驰添加
			var lunarCal = new LunarCalendar();//创建阴历实例
			var isShowFestival = this._get(inst, 'isShowFestival');//是否显示节日列表
			var festivalList = this._get(inst, 'festivalList');//获得节日列表
			
			for (var row = 0; row < numMonths[0]; row++) {
				var group = '';
				this.maxRows = 4;
				for (var col = 0; col < numMonths[1]; col++) {
					var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
					var cornerClass = ' ui-corner-all';
					var calender = '';
					if (isMultiMonth) {
						calender += '<div class="ui-datepicker-group';
						if (numMonths[1] > 1)
							switch (col) {
								case 0: calender += ' ui-datepicker-group-first';
									cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left'); break;
								case numMonths[1]-1: calender += ' ui-datepicker-group-last';
									cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right'); break;
								default: calender += ' ui-datepicker-group-middle'; cornerClass = ''; break;
							}
						calender += '">';
					}
					calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
						(/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
						(/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
						this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
						row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
						'</div><table class="ui-datepicker-calendar"><thead>' +
						'<tr>';
					var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
					for (var dow = 0; dow < 7; dow++) { // days of the week
						var day = (dow + firstDay) % 7;
						thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' +
							'<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
					}
					calender += thead + '</tr></thead><tbody>';
					var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
					if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
						inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
					var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
					var curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
					var numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
					this.maxRows = numRows;
					var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
					for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
						calender += '<tr>';
						var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' +
							this._get(inst, 'calculateWeek')(printDate) + '</td>');
						for (var dow = 0; dow < 7; dow++) { // create date picker days
							if(isShowLunarCal){
								lunarCal.setDate(printDate);
							}
							//machi，获得格式化的日期
							var formatString = this._getDateFormatString(printDate);
							//用于判断是否是节日，isShowFestival为false则也不是。
							var festivalString = (isShowFestival? festivalList[formatString]: null);
							var festivalMark = null;
							//是否是标记节日
							if(festivalString){
								festivalMark = festivalString.charAt(festivalString.length - 1);
								if(festivalMark ==　"*"){
									festivalString = festivalString.slice(0,festivalString.length - 1);
								}else{
									festivalMark = null;
								}
							}
							//----
							var daySettings = (beforeShowDay ?
								beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
							var otherMonth = (printDate.getMonth() != drawMonth);
							var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
								(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
							tbody += '<td class="' +
								((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
								(otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
								((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
								(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
								// or defaultDate is current printedDate and defaultDate is selectedDate
								' ' + this._dayOverClass : '') + // highlight selected day
								(unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled': '') +  // highlight unselectable days
								(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
								(printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
								(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
								((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
								(unselectable ? '' : ' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + '>' + // actions
								(otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
								//马驰修改，在其他月份日期的后面，加上了阴历的内容
								(unselectable ? '<span class="ui-state-default">' + printDate.getDate() + (isShowLunarCal?"<br /><span class='tui_lunar_date'>" + (lunarCal.lunarDate.day==1?lunarCal.getMouthToString():lunarCal.getDateToString()) + "</span>":"") + '</span>' : '<a class="ui-state-default' +
								(printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
								//马驰修改，判断当前时间是否在节日列表中
								(festivalString? ' tui_festival' : '')+
								(printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
								(otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
								//马驰修改，在显示日期的后面，加上了阴历的内容
								'" href="#" tui_day="' + printDate.getDate() + '" title= "'+
								(isShowLunarCal?(lunarCal.getYearToString() + lunarCal.getMouthToString()): '') +
								(festivalString?' '+festivalString:"")+
								'" >' +
								(festivalMark?'<div class="tui_festival_mark"></div>':'')+
								printDate.getDate() + 
								(isShowLunarCal?"<br /><span class='tui_lunar_date'>"+(lunarCal.lunarDate.day==1?lunarCal.getMouthToString():lunarCal.getDateToString())+"</span>":"") + '</a>')) + '</td>'; // display selectable date
								
							printDate.setDate(printDate.getDate() + 1);
							printDate = this._daylightSavingAdjust(printDate);
						}
						calender += tbody + '</tr>';
					}
					drawMonth++;
					if (drawMonth > 11) {
						drawMonth = 0;
						drawYear++;
					}
					calender += '</tbody></table>' + (isMultiMonth ? '</div>' +
								((numMonths[0] > 0 && col == numMonths[1]-1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
					group += calender;
				}
				html += group;
			}
			html += buttonPanel + ($.ui.ie6 && !inst.inline ?
				'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
			inst._keyEvent = false;
			return html;
		},

		/* Generate the month and year header. */
		_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
				secondary, monthNames, monthNamesShort) {
			var changeMonth = this._get(inst, 'changeMonth');
			var changeYear = this._get(inst, 'changeYear');
			var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
			var html = '<div class="ui-datepicker-title">';
			var monthHtml = '';
			// month selection
			if (secondary || !changeMonth)
				monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
			else {
				var inMinYear = (minDate && minDate.getFullYear() == drawYear);
				var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
				monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
				for (var month = 0; month < 12; month++) {
					if ((!inMinYear || month >= minDate.getMonth()) &&
							(!inMaxYear || month <= maxDate.getMonth()))
						monthHtml += '<option value="' + month + '"' +
							(month == drawMonth ? ' selected="selected"' : '') +
							'>' + monthNamesShort[month] + '</option>';
				}
				monthHtml += '</select>';
			}
			if (!showMonthAfterYear)
				html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
			// year selection
			if ( !inst.yearshtml ) {
				inst.yearshtml = '';
				if (secondary || !changeYear)
					html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
				else {
					// determine range of years to display
					var years = this._get(inst, 'yearRange').split(':');
					var thisYear = new Date().getFullYear();
					var determineYear = function(value) {
						var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
							(value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
							parseInt(value, 10)));
						return (isNaN(year) ? thisYear : year);
					};
					var year = determineYear(years[0]);
					var endYear = Math.max(year, determineYear(years[1] || ''));
					year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
					endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
					inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
					for (; year <= endYear; year++) {
						inst.yearshtml += '<option value="' + year + '"' +
							(year == drawYear ? ' selected="selected"' : '') +
							'>' + year + '</option>';
					}
					inst.yearshtml += '</select>';

					html += inst.yearshtml;
					inst.yearshtml = null;
				}
			}
			html += this._get(inst, 'yearSuffix');
			if (showMonthAfterYear)
				html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
			html += '</div>'; // Close datepicker_header
			return html;
		},

		/* Adjust one of the date sub-fields. */
		_adjustInstDate: function(inst, offset, period) {
			var year = inst.drawYear + (period == 'Y' ? offset : 0);
			var month = inst.drawMonth + (period == 'M' ? offset : 0);
			var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
				(period == 'D' ? offset : 0);
			var date = this._restrictMinMax(inst,
				this._daylightSavingAdjust(new Date(year, month, day)));
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			if (period == 'M' || period == 'Y')
				this._notifyChange(inst);
		},

		/* Ensure a date is within any min/max bounds. */
		_restrictMinMax: function(inst, date) {
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			var newDate = (minDate && date < minDate ? minDate : date);
			newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
			return newDate;
		},

		/* Notify change of month/year. */
		_notifyChange: function(inst) {
			var onChange = this._get(inst, 'onChangeMonthYear');
			if (onChange)
				onChange.apply((inst.input ? inst.input[0] : null),
					[inst.selectedYear, inst.selectedMonth + 1, inst]);
		},

		/* Determine the number of months to show. */
		_getNumberOfMonths: function(inst) {
			var numMonths = this._get(inst, 'numberOfMonths');
			return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
		},

		/* Determine the current maximum date - ensure no time components are set. */
		_getMinMaxDate: function(inst, minMax) {
			return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
		},

		/* Find the number of days in a given month. */
		_getDaysInMonth: function(year, month) {
			return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
		},

		/* Find the day of the week of the first of a month. */
		_getFirstDayOfMonth: function(year, month) {
			return new Date(year, month, 1).getDay();
		},

		/* Determines if we should allow a "next/prev" month display change. */
		_canAdjustMonth: function(inst, offset, curYear, curMonth) {
			var numMonths = this._getNumberOfMonths(inst);
			var date = this._daylightSavingAdjust(new Date(curYear,
				curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
			if (offset < 0)
				date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
			return this._isInRange(inst, date);
		},

		/* Is the given date in the accepted range? */
		_isInRange: function(inst, date) {
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			return ((!minDate || date.getTime() >= minDate.getTime()) &&
				(!maxDate || date.getTime() <= maxDate.getTime()));
		},

		/* Provide the configuration settings for formatting/parsing. */
		_getFormatConfig: function(inst) {
			var shortYearCutoff = this._get(inst, 'shortYearCutoff');
			shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			return {shortYearCutoff: shortYearCutoff,
				dayNamesShort: this._get(inst, 'dayNamesShort'), dayNames: this._get(inst, 'dayNames'),
				monthNamesShort: this._get(inst, 'monthNamesShort'), monthNames: this._get(inst, 'monthNames')};
		},

		/* Format the given date for display. */
		_formatDate: function(inst, day, month, year) {
			if (!day) {
				inst.currentDay = inst.selectedDay;
				inst.currentMonth = inst.selectedMonth;
				inst.currentYear = inst.selectedYear;
			}
			var date = (day ? (typeof day == 'object' ? day :
				this._daylightSavingAdjust(new Date(year, month, day))) :
				this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
		}
	});

	/*
	 * Bind hover events for datepicker elements.
	 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
	 * Global instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
	 */
	function bindHover(dpDiv) {
		var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
		return dpDiv.delegate(selector, 'mouseout', function() {
				$(this).removeClass('ui-state-hover');
				if (this.className.indexOf('ui-datepicker-prev') != -1) $(this).removeClass('ui-datepicker-prev-hover');
				if (this.className.indexOf('ui-datepicker-next') != -1) $(this).removeClass('ui-datepicker-next-hover');
			})
			.delegate(selector, 'mouseover', function(){
				if (!$.datepicker._isDisabledDatepicker( instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
					$(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
					$(this).addClass('ui-state-hover');
					if (this.className.indexOf('ui-datepicker-prev') != -1) $(this).addClass('ui-datepicker-prev-hover');
					if (this.className.indexOf('ui-datepicker-next') != -1) $(this).addClass('ui-datepicker-next-hover');
				}
			});
	}

	/* jQuery extend now ignores nulls! */
	function extendRemove(target, props) {
		$.extend(target, props);
		for (var name in props)
			if (props[name] == null || props[name] == undefined)
				target[name] = props[name];
		return target;
	};

	/* Invoke the datepicker functionality.
	   @param  options  string - a command, optionally followed by additional parameters or
		                Object - settings for attaching new datepicker functionality
	   @return  jQuery object */
	$.fn.datepicker = function(options){

		/* Verify an empty collection wasn't passed - Fixes #6976 */
		if ( !this.length ) {
			return this;
		}

		/* Initialise the date picker. */
		if (!$.datepicker.initialized) {
			$(document).mousedown($.datepicker._checkExternalClick).
				find(document.body).append($.datepicker.dpDiv);
			$.datepicker.initialized = true;
		}

		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
			return $.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this[0]].concat(otherArgs));
		if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
			return $.datepicker['_' + options + 'Datepicker'].
				apply($.datepicker, [this[0]].concat(otherArgs));
		return this.each(function() {
			typeof options == 'string' ?
				$.datepicker['_' + options + 'Datepicker'].
					apply($.datepicker, [this].concat(otherArgs)) :
				$.datepicker._attachDatepicker(this, options);
		});
	};

	$.datepicker = new Datepicker(); // singleton instance
	$.datepicker.initialized = false;
	$.datepicker.uuid = new Date().getTime();
	$.datepicker.version = "1.9.2";

	// Workaround for #4055
	// Add another global to avoid noConflict issues with inline event handlers
	window['DP_jQuery_' + dpuuid] = $;

	})(jQuery);


/***/ },
/* 10 */
/***/ function(module, exports) {

	/* Chinese initialisation for the jQuery UI date picker plugin. */
	/* Written by Cloudream (cloudream@gmail.com). */
	/*
	 * datePicker的配置文件。
	 * @author machi
	 * modify at 2013-12-25
	 */
	jQuery(function($){
		$.datepicker.regional['zh-CN'] = {
			closeText: '关闭',
			prevText: '&#x3c;上月',
			nextText: '下月&#x3e;',
			currentText: '当月',
			monthNames: ['1月','2月','3月','4月','5月','6月',
			'7月','8月','9月','10月','11月','12月'],
			monthNamesShort: ['一','二','三','四','五','六',
			'七','八','九','十','十一','十二'],
			dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
			dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
			dayNamesMin: ['日','一','二','三','四','五','六'],
			weekHeader: '周',
			dateFormat: 'yy-mm-dd',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: true,
			yearSuffix: '年',
			festivalList: {
				"2014-01-01":"元旦*",
				"2014-01-31":"春节*",
				"2014-02-01":"春节",
				"2014-02-02":"春节",
				"2014-02-03":"春节",
				"2014-02-04":"春节",
				"2014-02-05":"春节",
				"2014-02-06":"春节",
				"2014-04-05":"清明节*",
				"2014-04-06":"清明节",
				"2014-04-07":"清明节",
				"2014-05-01":"劳动节*",
				"2014-05-02":"劳动节",
				"2014-05-03":"劳动节",
				"2014-05-31":"端午节",
				"2014-06-01":"端午节",
				"2014-06-02":"端午节*",
				"2014-09-06":"中秋节",
				"2014-09-07":"中秋节",
				"2014-09-08":"中秋节*",
				"2014-10-01":"国庆节*",
				"2014-10-02":"国庆节",
				"2014-10-03":"国庆节",
				"2014-10-04":"国庆节",
				"2014-10-05":"国庆节",
				"2014-10-06":"国庆节",
				"2014-10-07":"国庆节",
				"2015-01-01":"元旦*",
				"2015-01-02":"元旦",
				"2015-01-03":"元旦",
				"2015-02-18":"春节",
				"2015-02-19":"春节*",
				"2015-02-20":"春节",
				"2015-02-21":"春节",
				"2015-02-22":"春节",
				"2015-02-23":"春节",
				"2015-02-24":"春节",
				"2015-04-04":"清明节",
				"2015-04-05":"清明节*",
				"2015-04-06":"清明节",
				"2015-05-01":"劳动节*",
				"2015-05-02":"劳动节",
				"2015-05-03":"劳动节",
				"2015-06-20":"端午节*",
				"2015-06-21":"端午节",
				"2015-06-22":"端午节",
				"2015-09-27":"中秋节*",
				"2015-10-01":"国庆节*",
				"2015-10-02":"国庆节",
				"2015-10-03":"国庆节",
				"2015-10-04":"国庆节",
				"2015-10-05":"国庆节",
				"2015-10-06":"国庆节",
				"2015-10-07":"国庆节"
			},
			clearText: "清空"
			
			};
		$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		//require("ui-router") ;
		__webpack_require__(12) ;
		__webpack_require__(18) ;
		__webpack_require__(35) ;
		__webpack_require__(48) ;
		var _ = __webpack_require__(21) ;
	    //var editallHtml = require("./tpls/edit.all.html") ;
		//把需要的模块全部加载到testApp中
		var app = angular.module('app',['pasvaz.bindonce','ngMessages','app.factory','app.controllers','app.directives','app.filter']);
		app.constant('DEFAULT_SERVICETYPE','F') ;//默认的serviceType
		
		
		
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){ 
		__webpack_require__(13) ;
		__webpack_require__(15) ;
		__webpack_require__(16) ;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){ 
		var app = __webpack_require__(14) ;
		app.factory('FormData',['DEFAULT_SERVICETYPE',function(DEFAULT_SERVICETYPE) {
			var contextPath = $.trim($("#contextPath").val()) ;
			var carrCode = $.trim($("#carrCode").val()) ;
			var action = $.trim($("#action").val()) ;
			//console.log("[contextPath : "+contextPath+"],[carrCode : "+carrCode+"],[action:"+action+"]") ;
			return {
			   "id":"",
			   "status":"",
			   "statusDes":"",
			   "contextPath":contextPath,
			   "carrCode":carrCode,
			   "serviceAndSubCode":"",
			   "serviceType":DEFAULT_SERVICETYPE,/*s7中包含信息//默认值为"F"//根据选择的s5决定是"F"/"M"*/
			   "action":action,
			   "sel1":{"showStr":"","value":""},
			   "sel2":{"showStr":"","value":""},
			   "sel3":{"showStr":"","value":"","textTableNo163":"","serviceGroup":"","serviceType":""},
			   "sel4":[],
			   "basicInfoVo":{
			   		"id":"",
					"subCode":"",
					"indCxr":"",
					"subDescription":"",
					"ftmCode":"",
					"carrCode":"",
					"ftmDescription":"",
					"serviceGroup":"",
					"serviceGroupDescription":"",
					"subGroup":"",
					"subGroupDescription":"",
					"serveceType":"",
					"commercialName":""//商务名称
			   },
			   "firstMaintenanceDate":"",/*-----------页面第二部分开始--------------*/
			   "lastMaintenanceDate":"",
			   "description":"",/*描述*/
			   "fareBasis":"",/*运价基础*/
			   "freeBaggageAllowancePieces":"",/*免费行李件数*/
			   "firstExcessOccurrence":"",/*收费行李件数起点*/
			   "lastExcessOccurrence":"",/*收费行李件数结束*/
			   "freeBaggageAllowanceWeight":"",/*免费重量*/
			   "freeBaggageAllowanceUnit":"",/*免费单位*/
			   "noChargeNotAvailable":"",/*"E"的时候"免费"//s7中包含信息*/
			   "baggageTravelApplication":"",
			   "textTableNo196":"",
			   "list196VO":[/*备注例外行李*/],
			   "discountOrNot":"1",/*是否打折，这个字段不会保存到数据库*/
			   "discountRuleTableNo201":"",
			   "list201VO":[],
			   "serviceFeeCurTableNo170":"",
			   "list170VO":[],
				/*-------------页面第二部分结束---------------------------*/
				"mileageMinimum":"",/*里程//新增字段*/
				"mileageMaximum":"",/*里程//新增字段*/
				"specifiedServiceFeeApp":"",/*适用于//新增字段*/
				"specServiceFeeColSub":"",/*包含，扣除//新增字段*/
				"specServiceFeeNetSell":"",/*净价/销售价//新增字段*/
				"specSevFeeAndOrIndicator":"",/*或、和//新增字段*/
				"specifiedServiceFeeMileage":"",/*里程费//新增字段*/
				"mileageExchangeIndicator":"0",/*里程兑换标识*/
				"availability":"N",/*必须检查可用性（查库存）*/
			 	"sequenceNumber":"",/*优先级序号--------------------页面第三部分开始---------------------------*/
			 	"passengerTypeCode":"",/*旅客类型*/
			 	"minPassengerAge":"",/*最小年龄--新增字段*/
				"maxPassengerAge":"",/*最大年龄--新增字段*/
			 	"firstPassengerOccurrence":"",/*个数范围    第几个到第几个【数字】//新增字段*/
			 	"lastPassengerOccurrence":"",/*个数范围    第几个到第几个【数字】//新增字段*/
			 	"customerIndexScoreMinimum":"",/*客户积分范围【数字】//新增*/
			 	"customerIndexScoreMaxmum":"",/*客户积分范围【数字】//新增*/
			 	"frequentFlyerStatus":"",/*常旅客状态*/
			 	"accountCodeTableNo172":"",/*大客户/特殊客户表（T172）--子表//新增*/
			 	"list172VO":[],
			 	"ticketDesignatorTableNo173":"",/*指定客票表（T173）--子表//新增*/
			 	"list173TicketVO":[],
				"tktDesignatorTableNo173":"",/*173*/
				"list173TktVO":[],
			 	"tourCode":"",/*旅行编码（关联客票）【字母或数字】--新增*/
			 	"cabin":"",/*服务等级*/
			 	"upgradeToCabin":"",
			 	"rbdTableNo198":"",/*暂时没啥用,后台也不使用这个字段*/
				"list198VO":[],/*订座属性表*/
				"upgradeToRbdTableNo198":"",/*暂时没啥用，后台也不是该字段*/
				"list198UpgradeVO":[],/*座位属性表，或则升舱属性表*/
				"securityTableNo183":"",//发布安全表//暂时没啥用，后台也不是该字段*/
				"list183VO":[],//安全发布表*/
				"publicPrivateIndicator":"",/*公有、私有//新增字段*/
				"carrierFlightTableNo186":"",/*航班信息表//暂时没啥用，后台也不是该字段*/
				"list186VO":[],
				"taxApplication":"Y",/*是否含税费,新增字段*/
				"tariff":"",/*税费*/
				"rule":"",/*规则*/
				"cxrResFareTableNo171":"",/*客票舱位等级表*/
				"list171VO":[],/*客票舱位等级表*/
				"equipment":"",/*机型*/
				"equipmentTypeTableNo165":"",
				"list165VO":[] ,
				"startTime":"",/*开始时刻*/
				"stopTime":"",/*结束时刻*/
				"timeApplication":"D",/*应用范围,新增字段*/
				"dayOfWeek":"",/*星期 -- 新增字段*/
				"dayOfWeekShow":{"w1":false,"w2":false,"w3":false,"w4":false,"w5":false,"w6":false,"w7":false},/*前台数据，后台无对应的属性*/
				"advancedPurchasePeriod":"",/*提前购票时间--新增字段*/
				"advancedPurchaseUnit":"",/*时间单位 -- 新增字段*/
				"advancedPurchaseTktIssue":"",/*是否与机票同时出票 -- 新增字段*/
				"indicatorReissueRefund":"",/*退、改 -- 新增字段*/
				"formOfRefund":"",/*退款形式--新增字段*/
				"indicatorComission":"Y",/*(是否有)代理费--新增字段*/
				"indicatorInterline":"Y",/*是*/
				"firstTravelYear":"",
				"firstTravelMonth":"",
				"firstTravelDay":"",
				"lastTravelYear":"",
				"lastTravelMonth":"",
				"lastTravelDay":"",
				"travelStartDate":"",/*这个是中间数据，后台不存在对应的属性*/
				"travelEndDate":"",/*这个是中间数据，后台不存在对应的属性*/
				"list178Loc1Id":"",/*区域1表格id*/
				"list178Loc1":[],/*区域1对应的表格*/
				"list178Loc2Id":"",/*区域2表格id*/
				"list178Loc2":[],/*区域2对应的表格*/
				"list178Loc3Id":"",/*区域3表格id*/
				"list178Loc3":[],/*区域2对应的表格*/
				"geoSpecFromToWithin":"",/*区域限制*/
				"geoSpecSectPortJourney":"P",/*航段限制-目前返回的是定死的字符串‘P’*/
				"geoSpecLoc1Type":"",/*区域1类型*/
				"geoSpecLoc1":"",/*区域1代码*/
				"geoSpecLoc2Type":"",/*区域2类型*/
				"geoSpecLoc2":"",/*区域2代码*/
				"geoSpecLoc3Type":"",/*区域3类型*/
				"geoSpecLoc3":"",/*区域3代码 下面的都是新增 的字段*/
				"geoSpecTravelIndicator":"",/*指定区域*/
				"geoSpecExceptionStopTime":"",/*经停时间,新增字段*/
				"geoSpecExceptionStopUnit":"",/*经停单位*/
				"geoSpecStopConnDes":"",/*经停类型(限输入1位字母)*/
				"effectivePeriodType":"",/*延长类型*/
				"effectivePeriodNumber":"",/*延长时长*/
				"effectivePeriodUnit":"",/*延长时间单位*/
				"reuseList172VO":"",
				"reuseList173TicketVO":"",
				"reuseList183VO":"",
				"reuseList198VO":"",
				"reuseList198UpgradeVO":"",
				"reuseList171VO":"",
				"reuseList173TktVO":"",
				"reuseList186VO":"",
				"reuseList170VO":"",
				"reuseList196VO":"",
				"reuseList165VO":"",
				"reuseList201VO":"",
				"reuseList178Loc1":"",
				"reuseList178Loc2":"",
				"reuseList178Loc3":"",
				"reuseListTsk202VO":"",
				"allowancePeopleMinimum":"",/*服务适用范围起始*/
				"allowancePeopleMaximum":"",/*服务适用范围截止*/
				"serviceNumberMinimum":"",/*服务套数范围起始*/
				"serviceNumberMaximum":"",/*服务套数终止*/
				"firstUseDate":"",/*使用生效日期*/
				"lastUseDate":"",/*使用截止日期*/
				"useDateLimitTye":"",/*使用时间限制类型[时间段:‘’]或则[期限:'1']*/
				"flightPassTableTsk202":"",
				"listTsk202VO":[],
				"allowedService":"FLT",/*允许兑换的服务ALL:不限，FLT:航班--默认值，SVS:服务*/
				"subTbReferenceCountMap":{
					"list172VO":"0",
					"list173TicketVO":"0",
					"list183VO":"0",
					"list198VO":"0",
					"list198UpgradeVO":"0",
					"list171VO":"0",
					"list173TktVO":"0",
					"list186VO":"0",
					"list170VO":"0",
					"list196VO":"0",
					"list165VO":"0",
					"list201VO":"0",
					"list178Loc1":"0",
					"list178Loc2":"0",
					"list178Loc3":"0",
					"listTsk202VO":"0"
				}
			};
		
		}]);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){ 
		var app = angular.module('app.factory',[]); 
		//require('angular-resource') ;
	 	return app ;
	 }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){ 
		var services = __webpack_require__(14) ;
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
					"typeList":["F","M","R","T"],
					"groupList":[],
					"nameList":["mileageExchangeIndicator"],
					"showFlag":true
				}
		    };
		}) ;


		

	 }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){ 
		var app = __webpack_require__(14) ;
		var util = __webpack_require__(17) ;
		// $q 是内置服务，所以可以直接使用  //HttpOperService//S7EditService
		app.factory('HttpOperService', ['$http', '$q', function ($http, $q) {  
		  return {  
			    getDataByUrl : function(url) {  
			      var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行  
			      $http({method: 'GET', url: url}).  
			      success(function(data, status, headers, config) {  
			        deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了  
			      }).  
			      error(function(data, status, headers, config) {  
			        deferred.reject(data);   // 声明执行失败，即服务器返回错误  
			      });  
			      return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
			    },
			    postDate:function(url,queryParam,config){
			    	var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行  
			    	var tmpCfg = {} ;
			    	if(config!=null){
			    		tmpCfg = config ;
			    	}
			    	var csrfInfo = util.getCSRFInfo() ;
			    	tmpCfg = $.extend(tmpCfg,csrfInfo) ;
			        $http({method: 'POST', url: url,data:queryParam,params:tmpCfg}).  
			        success(function(data, status, headers, config) {  
			           deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了  
			        }).  
			        error(function(data, status, headers, config) {  
			           deferred.reject(data);   // 声明执行失败，即服务器返回错误  
			        });  
			      	return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
			    }
			};
		}]);  

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){ 
		__webpack_require__(19) ;//公共指令
		__webpack_require__(25) ;//基本信息指令
		//require("./tb198UpGradeDirective") ;//[座位属性表/升舱属性]table198指令
		__webpack_require__(29) ;//规则明细指令
		__webpack_require__(30) ;//规则明细指令
		//require("./select2Directive") ;//暂时不适用这个指令
		//加入校验指令
		__webpack_require__(34) ;
		
	 }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;




/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){
		 var directives = __webpack_require__(20) ;
		 var _ = __webpack_require__(21) ;
		 var jsonDataHelper = __webpack_require__(22) ;
		 var commonUtil = __webpack_require__(23) ;
		 
		 var convertFirstCharUpper = function(str){
		 	str = str || "" ;
		 	return str.replace(/(\w)/,function(v){return v.toUpperCase()});
		 }

		 //显示隐藏表格
		 directives.directive('showHideTable',['TbShowHideServcie',function(TbShowHideServcie){
		    return {
		        restrict: 'E',
		        replace: true,
		        scope: {},
		        controller:['$scope','$element','$attrs',function($scope,$element,$attrs){
		        	$scope.tableStatus = TbShowHideServcie ;
		        }],
		        template:function(elem,attrs){
		        	var tname = attrs['tname'] ;
		        	var tmpStr = "tableStatus."+tname ;
		        	var html = '<a  href = "javascript:void(0)"><span ng-show="'+tmpStr+'" >收起表格</span><span ng-show="!'+tmpStr+'">填写表格</span></a>' ;
		        	return html ;
		        }, 
		        transclude:true,
		        link: function(scope, element, attrs){
		        	element.bind('click',function(){
		        		var tname = attrs['tname'] ;
		        		scope.$apply(function(){
							scope.tableStatus[tname] = !scope.tableStatus[tname] ;
		        		}) ;
		        	}) ;
		        }
		    };
		}]) ;


		var _fillData4AutoComplete = function(suggestion,tbname ,FormData,FormEditStatusServcie,HttpOperService,customeEditStatus,tbnoName){
			//scope.showCustomeEditFlag = true;
	    	var tbNO = suggestion.data ;
	    	var url = FormData.contextPath+"/queryTableInfoByTbNO.action?tbNO="+tbNO+"&tbname="+tbname ;
	    	var promise = HttpOperService.getDataByUrl(url) ;
	    	var oldTbNo = FormData[tbnoName] ;
	    	var subTbReferenceCount = FormData['subTbReferenceCountMap'][tbname] *1;
	    	var reusePropName = "reuse"+convertFirstCharUpper(tbname) ;
	    	promise.then(function  (retData) {
	    		var list = jsonDataHelper.convert2TableDataList(retData.list,tbname) ;
	    		//如果当前标号与复用标号相同的话，并且是只被当前r7引用的话，说明不是复用，而是修改自己的记录
	    		if(subTbReferenceCount<=1&&oldTbNo==tbNO){//如果和之前的标号相同，并且被r7引用条数不大于1的话,可编辑
					//1.设置表格可编辑
					FormEditStatusServcie[tbname] = true;
					//2.清除复用标志
					FormData[reusePropName] = ''; 
					//3.隐藏自定义表格按钮
					customeEditStatus[tbname] = true;
	    		}else{
	    			FormEditStatusServcie[tbname] = false;
	    			//显示自定义表格按钮
	    			customeEditStatus[tbname] = true;
	    		}
	    		FormData[tbname] = list ;
	    	},function(error){
	    		console.info('获取数据出错!'+error) ;
	    	}) ;
		} ;
		

		directives.directive('ocComplete', ['FormEditStatusServcie','FormData','HttpOperService','ListVo2tbNoMap','TbShowHideServcie','CustomeEditTbStatusServcie',function (FormEditStatusServcie,FormData,HttpOperService,ListVo2tbNoMap,TbShowHideServcie,CustomeEditTbStatusServcie) {
		 	return {
		 		restrict: 'E',
		 		replace:true,
		 		scope:true,
		 		template:function  (elem,attrs) {
		 			//获取当前页面控件是否是非编辑状态
		 			var str ="" ;
	 				var tbname = attrs['tbname'] ;
	 				var reuseTablePropName = "reuse"+convertFirstCharUpper(tbname) ;
		 			var tbnoName = ListVo2tbNoMap[tbname] ;
		 			//var botext = "data."+tbnoName ;
		 			var sotext = "customeEditStatus."+tbname;
		 			str ='<span class ="marginRL15">' + 
							'<label class ="text-info">复用表号: </label>' +
							'<span style="position:relative;">'+
								'<input type="text"  name="'+reuseTablePropName+'" ng-disable ="data.statusDes==\'3\'" class="autocomplete reusetbnoinput" placeholder=""  >'+
								'<i class="icon iconfont icon-sousuo searchinput gray"></i>'+
							'</span>'+
							'<span class ="text-danger pointer marginRL15" name="customeEdit" ng-show ="'+sotext+'">自定义表格</span>'+
						 '</span>' ;
					return str ;
		 		},
		 		link: function (scope, elem, attrs) {
		 			scope.data = FormData ;
		 			var tbname = attrs['tbname'] ;
		 			var tbnoName = ListVo2tbNoMap[tbname] ;
		 			//是否显示自定义表格
		 			scope.customeEditStatus = CustomeEditTbStatusServcie;
		 			/*elem.find("i").bind('click',function(event){
		 				event.stopPropagation() ;
		 				event.preventDefault() ;
		 				//elem.find('input').focus() ;
		 			}) ;*/
		 			//点击自定义表格按钮
		 			elem.find('span[name="customeEdit"]').bind('click',function  (event) {
		 				//scope.showCustomeEditFlag = false;
		 				scope.customeEditStatus[tbname] = false;
		 				//1.清除复用的表号
		 				var reuseTablePropName = "reuse"+convertFirstCharUpper(tbname) ;
		 				FormData[reuseTablePropName] = '' ;
		 				//2.清除复用的list数据
		 				//var list = FormData[tbname] ;
		 				//获取当前页面控件是否是非编辑状态
		 				var editFlag = commonUtil.getEditFlagByStatus(FormData.statusDes) ;
		 				elem.find(':input').val('')
						scope.$apply(function  () {
		 					FormEditStatusServcie[tbname] = editFlag;
					    	FormData[tbname] = [] ;
						}) ;
						//清空placeholder提示
						elem.find(':input').removeAttr('placeholder'); 
						//只要被点击自定义就需要把这里置为-1，表示当前是自定义字表数据
						FormData[tbnoName] = '-1' ;
						/*//根据本引用次数判断是否清除源字表号(1.如果被引用一次则源表号任可重复利用，2.如果被多次引用则将源标号置为空)
						var referenceCount = FormData.subTbReferenceCountMap[tbname] ;
						if(referenceCount>1){
							//console.info('【'+referenceCount+'】被引用次数大于一，需要把源子表号置为空...') ;
							FormData[tbnoName] = '' ;
						}*/
						
		 			}) ;
					elem.find(".autocomplete").autocomplete({
						minChars:0,
						serviceUrl: scope.data.contextPath+'/queryTableNoByTableName',
						/*noCache:true,*/
					    onSelect: function (suggestion) {
					    	//判断当前是否有数据，并且当前数据是否可编辑,如果这样的话要给出提示信息
					    	var list = FormData[tbname] ;
					    	var editFlag = commonUtil.getEditFlagByStatus(FormData.statusDes) ;
					    	var reuseTablePropName = "reuse"+convertFirstCharUpper(tbname) ;
					    	var reuseTableNo = FormData[reuseTablePropName] ;
					    	//判断当前表格是否可编辑
					    	var tbEditAbleFlag = FormEditStatusServcie[tbname] ;
					    	//当前表格如果可编辑那么
					    	if(list.length>0&&editFlag&&reuseTableNo==''&&tbEditAbleFlag){
					    		$.showTuiConfirmDialog2('确定放弃已编辑的内容？', function() {
					    			var selectedTableNo = suggestion.data ;
							    	var reuseTablePropName = "reuse"+convertFirstCharUpper(tbname) ;
							    	FormData[reuseTablePropName] = selectedTableNo ;
							    	_fillData4AutoComplete(suggestion,tbname ,FormData,FormEditStatusServcie,HttpOperService,scope.customeEditStatus,tbnoName) ;
							    	//将表格置为显示状态
							    	TbShowHideServcie[tbname] = true ;
		 						},function(){
		 							FormData[reuseTablePropName] = '' ;
				    				elem.find(':input').val('') ;
		 						}) ;
					    	}else{
						    	var selectedTableNo = suggestion.data ;
						    	var reuseTablePropName = "reuse"+convertFirstCharUpper(tbname) ;
						    	FormData[reuseTablePropName] = selectedTableNo ;
						    	_fillData4AutoComplete(suggestion,tbname ,FormData,FormEditStatusServcie,HttpOperService,scope.customeEditStatus,tbnoName) ;
						    	//将表格置为显示状态
						    	TbShowHideServcie[tbname] = true ;
					    	}
					    },
					    paramName:'q' ,
					    params:{"tbname":tbname},
					    transformResult: function(response) {
					    	var jsonData = JSON.parse(response) ;
					    	var flag = jsonData.flag ;
					    	//console.info('flag : ' + flag) ;
					    	if(flag=='true'){
								return {
						            suggestions: $.map(jsonData.list, function(dataItem) {
						                return { value: dataItem+"", data: dataItem };
						            })
						        };
					    	}else{
					    		//console.info('获取表格出错...') ;
					    		return {
					    			suggestions:[]
					    		}
					    	}
					    }
					});
		 		}
		 	};
		}]) ;


		 //刚添加的一行表格td需要触发focus函数,否则如果直接点击页头部分的保存按钮将无法进行tui的require等校验//不知道为什么
		 directives.directive('setFocus', function(){
			  return {
		        restrict: 'AE',
		        replace: true,
				scope:true,
				link: function(scope, elem, attrs) {
		           elem.trigger('click') ;
		        }
		      };
	      });

		 //区域长度限制
		 directives.directive('geoMaxLength',function(){
		    return {
		        restrict: 'AE',
		        replace: true,
		        scope:true,
		        controller:['$scope', '$element', '$attrs',function($scope, $element, $attrs){
					$scope.getGeoLengthByType = function(type){
						type = type || "" ;
					  	var obj = {'A':'1','C':'3','N':'2','P':'3','S':'2','Z':'3'} ;
					    var len = eval("obj['"+type+"']") || 0;
						return len ;
					}
				}],
		        link: function(scope, element, attrs){
		            scope.$watch(attrs['geoMaxLength'], myWatchCallbackFunc);
		            function myWatchCallbackFunc (){
		                var geoMaxLength = attrs['geoMaxLength'] ;
		                var value  = scope.$eval(geoMaxLength) ;
						var len = scope.getGeoLengthByType(value) ;
						element.attr('maxlength',len) ;//设置长度
		            }
		        }
		    }
		  }) ;
		  
		  function _convertStr2Json (jsonStr){
		  	var str = jsonStr || '' ;
		  	str += '' ;
		  	var retJson = {} ;
		  	try{
		  		var retStr = str.replace(/'/g,'"') ;
		  		retJson = JSON.parse(retStr) ;
		  	}catch(e){
		  		console.info(e) ;
		  	}
		  	return retJson ;
		  }
		  

		 //tui长度限制属性
		 directives.directive('tuiMaxLength',function(){
		 	function _splitMaxLengtAttr (str){
			  	str = str || '' ;
			  	str += '' ;
			  	var arr = [] ;
			  	var str1 = "" ;
			  	var str2 = "" ;
			  	try{
				  	var start1 = str.indexOf('{');
			        var end1 = str.indexOf('}');
			        str1 = str.substr(start1,end1+1)  ;
			        var start2 = str.indexOf('[') ;
			        var end2 = str.indexOf(']') ;
			        str2 = str.substring(start2+1,end2) ;
			  	}catch(e){
			  		console.info(e) ;
			  	}
			  	if(str1.length>0&&str2.length>0){
			  		arr[0] = str1 ;
			  		arr[1] = str2 ;
			  	}
		        return arr ;
			}
		    return {
		        restrict: 'AE',
		        replace: true,
		        scope: true,
		        link: function(scope, element, attrs){
		        	var attrStr = attrs['tuiMaxLength'] ;
		            var infoArr = _splitMaxLengtAttr(attrStr) ;
		            var str1 = "" ;
		            var str2 = "" ;
		            var jsonObj = {} ;
		            //填写的字符串是否格式完好
		            var goodStrFlag = false;
		            if(infoArr.length==2){
		             	goodStrFlag = true ;
		             	str1 = infoArr[0] ;
		             	str2 = infoArr[1] ;
		             	jsonObj =  _convertStr2Json(str1) ; 
		            }
		            if(goodStrFlag){
			            scope.$watch(attrs['tuiMaxLength'], function(){
				        	var value2  = scope.$eval(str2) ;
				        	var valueAtrr = jsonObj[value2] ;
							element.attr('maxlength',valueAtrr) ;
			            });
		            }
		        }
		    }
		  }) ;

		directives.directive("upperInput",function(){
		    return{
		        restrict:'A',
		        require:'ngModel',
		        link:function(scope,element,attrs,ngModel){
		            if (!ngModel)
		                return; // do nothing if no ng-model
		            // Specify how UI should be updated
		            ngModel.$render = function() {
		                var tmp = ngModel.$viewValue || '' ;
		                tmp = tmp.toUpperCase() ;
		                element.val(tmp);
		                ngModel.$setViewValue(tmp);
		            };
		            // Listen for change events to enable binding
		            element.bind('blur', function() {
		                scope.$apply(read);
		            });
		            //read(); // initialize
		            /// Write data to the model
		            function read() {
		                var tmp = ngModel.$viewValue || '';
		                tmp = tmp.toUpperCase() ;
		                ngModel.$setViewValue(tmp);
		                element.val(tmp);
		            }
		        }
		    }
		}) ;
		 //178表格显示隐藏的链接指令
		 directives.directive('linkTable', ['TbShowHideServcie','FormEditStatusServcie',function(TbShowHideServcie,FormEditStatusServcie){
	          return {
		        restrict: 'AE',
		        replace: true,
				scope:{
					list:'=',
					tbname:'@'
				},
				controller:['$scope',function($scope){
					$scope.showStatus = TbShowHideServcie;
					$scope.editStatus = FormEditStatusServcie ;
					//点击显示隐藏表格事件处理
					$scope.myClick = function(){
						var tbname = $scope.tbname;
						$scope.showStatus[tbname] = !$scope.showStatus[tbname] ;
						if(!$scope.showStatus[tbname]){////点击取消自定义区域
							var len = $scope.list.length ;
							if($scope.editStatus[tbname]){//如何表格可编辑则清空数据
								outAllSelect() ;
								$scope.list.splice(0,len) ;
							}
						}
					}
					function outAllSelect(){//将所有tr全部置为非选中状态
						angular.forEach($scope.list,function(l){
							l.selected = false ;
						}) ;
					}
				}],
		        template:function(elem,attrs){
		        	var strtip = attrs['strtip'] ;
		        	var tbname = attrs['tbname'] ;
		        	var tmp = "showStatus."+ tbname;
					var retstr = '<a href="javascript:void(0)"><span ng-show="!'+tmp+'">'+strtip+'</span><span ng-show="'+tmp+'">取消自定义</span></a>' ;
					return retstr ;
		        }, 
				link: function(scope, elem, attrs) {
		            elem.bind('click', function() {
						scope.$apply(function(){
							scope.myClick() ;
						}) ;
		            });
		        }
		      };
	      }]) ;

		
			
		  //日期插件
		 directives.directive('datepicker',function(){
			return{
				restrict: 'A',
				scope: true,
				require:'ngModel',
				link: function (scope,elem,attr,ctrl) {
					if(!ctrl) return ;
					var minDateStr = attr['datepicker'] ;
					var minDate = new Date(minDateStr) ;
					//配置日期控件
			        var optionObj = {} ;
			        optionObj.dateFormat = "yy-mm-dd" ;
			        var updateModel = function(dateText){
			            scope.$apply(function  () {
			                //调用angular内部的工具更新双向绑定关系
			                ctrl.$setViewValue(dateText) ;
			            }) ;
			        }
		            optionObj.onSelect = function(dateText,picker){
		                updateModel(dateText) ;
		               // elem.focus() ;
		               // validator.element(elem) ;
		                if(scope.select){
		                    scope.$apply(function  () {
		                        scope.select({date:dateText}) ;
		                    }) ;
		                }
		            }
		            optionObj.minDate = minDate ;
		            optionObj.showButtonPanel = true ;
		            /*ctrl.$render = function(){
		            	//console.info('这个方法好像只有在第一次加载的收执行.......') ;
		                //下面这段步骤1和步骤2千万不能弄混了，1必须在前面
		                //1.将后台ng-model中的数据填充到页面上
		                 elem.datepicker('setDate',ctrl.$viewValue || '') ;//最后期发现是setDate的时候会根据最新的日期设置显示的页面上的html日期字符串
		                //2.下面写这个的原因是如果我们的日期控件设置了最小日期的话，当我们修改数据时，
		                //如果从数据库中读取的字段日期小于最小日期，datepicker会自动的将控件的日期设置为今天的日期,
		                //而这时angular并不知道，所有这里手动设置为页面上的html字符串,只有第一次加载时才可能出现这个问题
		                var viewView = ctrl.$viewValue ;
		                var textValue = $(elem).val() ;
		                if(viewView!=textValue){
							ctrl.$setViewValue(textValue);
		                }
		            }*/
					elem.datepicker(optionObj);
				}
			  };
			}) ;
			//时间插件
			directives.directive('timepicker',function(){
				return{
					restrict: 'A',
					scope: {},
					link: function (scope,elem,attr) {
						var timeVar = {
							controlType:'select',
							timeFormat: 'HHmm',
							timeOnly:  true,
							timeOnlyTitle: '选择时间',//Choose Time
							timeText: '时间',//Time
							hourText: '小时',//Hou
							minuteText: '分钟',//Minute
							currentText: '当前',//Current
							closeText: '关闭'//Close
						};
						$(elem).datetimepicker(timeVar);
					}
				};
			}) ;

			
			//重置数据
			var resetDataByFlag = function(nameList,flag,data,orgData){
			    if(!flag){//如果隐藏这需要重置数据
			        for(var i = 0 ; i < nameList.length ;i++){
			        	var curName = nameList[i] ;
			        	var oldValue = orgData[curName] ;
			        	var tmpValue = ""  ;
			        	if(_.isArray(oldValue)){//如果是数组则
			        		tmpValue = [] ;
			        	}else if(_.isObject(oldValue)){
			        		tmpValue =angular.copy(oldValue)  ;
			        	}
			        	data[curName] = tmpValue ;
			        }
			    }
			};

			var getFlagByServiceTypeAndServiceGroup = function (typeList, groupList,serviceType,serviceGroup) {
			    var flag = _.contains(typeList,serviceType) ;
			    if(flag&&groupList&&groupList.length>0){
			    	flag = _.contains(groupList, serviceGroup) ;
			    }
			    return flag ;
			};

			directives.directive('force',['FormStatusService','FormData',function(FormStatusService,FormData){
				return  {
					restrict:'A',
					scope:{orgData:'='},
					link: function (scope,elem,attrs) {//
						//@param : event 事件本身
						//@param ：needDigest ： 是否需要手动进行脏数据检查
						scope.$on('serviceTypeChangeNotice',function(event,needDigest){
							for(var fname in FormStatusService){
								var typeList = FormStatusService[fname]['typeList'] ;
								var groupList = FormStatusService[fname]['groupList'] ;
								var serviceType = FormData.serviceType;
								var serviceGroup = FormData.sel1.value ;
								var oldFlag = FormStatusService[fname]['showFlag'] ;
								var flag = getFlagByServiceTypeAndServiceGroup(typeList, groupList,serviceType,serviceGroup) ;
								/*if(fname=='mileageExchangeIndicator'){
									console.info('oldFlag : ' + oldFlag) ;
									console.info('serviceTypeChangeNotice --->  fname : [' + fname + ']-- flag : [' + flag + ']   , serviceType : ['+serviceType+'] , typeList ['+typeList+'] , groupList :['+groupList+']  , servcieGroup : ['+serviceGroup+'] ') ;
								}*/
								//console.info('serviceTypeChangeNotice --->  fname : [' + fname + ']-- flag : [' + flag + ']   , serviceType : ['+serviceType+'] , typeList ['+typeList+'] , groupList :['+groupList+']  , servcieGroup : ['+serviceGroup+'] ') ;
								if(oldFlag==!flag){//如果不同
									var nameList = FormStatusService[fname]['nameList'] ;
									resetDataByFlag(nameList,flag,FormData,scope.orgData) ;
									FormStatusService[fname]['showFlag']= flag;
									/*if(fname=='mileageExchangeIndicator'){
										console.info("FormStatusService[fname]['showFlag'] : " + FormStatusService[fname]['showFlag'])
									}*/
									if(needDigest&&needDigest=='true'){
										scope.$digest() ;
									}
								}
							}
						}) ;
						// @param :event :自带的事件本身
						// @param :in_fname : 传入的forceName
						// @param :in_flag :传入的隐藏显示的falg----第一要传递字符串
						// @param :needDigest ：是否需要手动脏数据检查  第一要传递字符串
						scope.$on('singleChangeByFlagNotice', function (event,in_fname,in_flag,needDigest) {
							var fname = in_fname ;
							var newFlag = in_flag=='true'?true:false;
							var oldFlag = FormStatusService[fname]['showFlag'] ;
							//console.info("singleChangeByFlagNotice -------> fname : ["+fname+"] , newFlag : ["+newFlag+"] , oldFlag : ["+oldFlag+"] ") ;
							//****这里需要修复一个bug,typeList如果判断为显示，说明传过来的flag才真正应该为true,如果typeList判断为false那么无论外面传入的是否为true，都因该被置为false
							var typeList = FormStatusService[fname]['typeList'] ;
							var groupList = FormStatusService[fname]['groupList'] ;
							var serviceType = FormData.serviceType;
							var serviceGroup = FormData.sel1.value ;
							var typeFlag = getFlagByServiceTypeAndServiceGroup(typeList, groupList,serviceType,serviceGroup) ;
							//如果根据typeList判断因该隐藏，那么一定为隐藏，否则根据传入的flag做判断
							if(typeFlag==false){
								newFlag = false;
							}
							if(newFlag==!oldFlag){//当前显隐与将要的显隐相反时
								var nameList = FormStatusService[fname]['nameList'] ;
								resetDataByFlag(nameList,newFlag,FormData,scope.orgData) ;
								FormStatusService[fname]['showFlag']= newFlag;
								if(needDigest&&needDigest=='true'){
									scope.$digest() ;
								}
							}else{
								//console.info('当前显隐与将要发生的显隐相同，不需要切换') ;
							}
						}) ;
					}
				} ;
			}]) ;

	 }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){ 
		 var directives = angular.module('app.directives',[]); 
		 return directives ;
	 }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;




/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		var _ = __webpack_require__(21) ;
		var util = __webpack_require__(23) ;
		var editJsonData = __webpack_require__(24) ;

		module.exports = {
			getNoChargeNotAvailableList:function(serviceType){
				var tmp = serviceType || '' ;
				var retArr = [] ;//{"name":"免费，行李规则遵循市场方航空公司规则","value":"D"},{"name":"免费，行李规则遵循承运方航空公司规则","value":"O"}
				var defaultArr = [{"name":"收费","value":""},{"name":"不适用","value":"X"},
			        {"name":"免费，不出EMD单","value":"F"},{"name":"免费，出EMD单","value":"E"},
			        {"name":"免费，不出EMD单，不要求预定","value":"G"},{"name":"免费，出EMD单，不要求预定","value":"H"}] ;
				if(tmp=='A'){
					retArr = [{"name":"不适用","value":"X"},{"name":"免费，不出EMD单","value":"F"},{"name":"免费，出EMD单","value":"E"},
			        {"name":"免费，不出EMD单，不要求预定","value":"G"},{"name":"免费，出EMD单，不要求预定","value":"H"},
			        {"name":"免费，行李规则遵循市场方航空公司规则","value":"D"},{"name":"免费，行李规则遵循承运方航空公司规则","value":"O"}] ;
				} else if (tmp=='B'){
					retArr = [{"name":"免费，不出EMD单","value":"F"}] ;
				}else if (tmp=='E'){
					retArr = [{"name":"不适用","value":"X"}] ;
				}else{
					retArr = defaultArr ;
				}
				return retArr ;
			},
			getSpecifiedServiceFeeAppList:function(serviceType){/**适用于**/
				var tmp = serviceType || '' ;
				var arr = [{"name":"每一个票价组成部分算一次服务费用","value":"1"},
	  				{"name":"每一个票价组成部分算一半的服务费用","value":"2"},{"name":"每用一次服务算一次服务费用","value":"3"},
	  				{"name":"匹配的部分航程算一次服务费用","value":"4"},{"name":"服务收费对应每张售票","value":"5"}] ;
				switch(tmp){
				case 'F':
				  arr = [{"name":"每一个票价组成部分算一次服务费用","value":"1"},
	  				{"name":"每一个票价组成部分算一半的服务费用","value":"2"},{"name":"每用一次服务算一次服务费用","value":"3"},
	  				{"name":"匹配的部分航程算一次服务费用","value":"4"},{"name":"服务收费对应每张售票","value":"5"}] ;
				  break;
				case 'M':
				  arr = [{"name":"每用一次服务算一次服务费用","value":"3"}] ;
				  break;
			    case 'R':
				   arr = [{"name":"服务收费对应每张售票","value":"5"}] ;
				  break;
				case 'T':
				   arr = [{"name":"每用一次服务算一次服务费用","value":"3"},{"name":"服务收费对应每张售票","value":"5"}] ;
				  break;
				case 'A':
				  arr=[] ;
				  break;
				case 'B':
				  arr=[] ;
				  break;
				case 'C':
				  arr=[
				  {"name":"按托运点收费","value":"3"},{"name":"按全行程收费","value":"4"},
	  				{"name":"每公斤按公布运价的0.5%收费","value":"H"},{"name":"每公斤按公布运价的1%收费","value":"C"},
	  				{"name":"每公斤按公布运价的1.5%收费","value":"P"},{"name":"按每公斤收费","value":"K"},
	  				{"name":"按每5公斤收费","value":"F"}] ;
				  break;
				case 'E':
				  arr=[] ;
				  break;
				case 'P':
				  arr=[
				  {"name":"按托运点收费","value":"3"},{"name":"按全行程收费","value":"4"},
	  				{"name":"每公斤按公布运价的0.5%收费","value":"H"},{"name":"每公斤按公布运价的1%收费","value":"C"},
	  				{"name":"每公斤按公布运价的1.5%收费","value":"P"},{"name":"按每公斤收费","value":"K"},
	  				{"name":"按每5公斤收费","value":"F"}] ;
				  break;
				default:
				  console.info('传入的serviceType有问题') ;
				}	
				return arr ;
			},
			getgeoSpecSectPortJourneyList:function  (serviceType) {
				var tmp = serviceType || '' ;//geoSpecSectPortJourneyList
				var arr = [{"name":"Sector","value":"S"},
					{"name":"Portion","value":"P"},{"name":"Journy","value":"J"}] ;
				var isBaggageFlag = util.checkBaggageServcie(tmp) ;
				if(_.contains(['B','E'], tmp)){
					arr = [{"name":"Sector","value":"S"}] ;
				}else if(_.contains(['A','C','P'], tmp)){
					arr = [{"name":"选择","value":""},{"name":"Portion","value":"P"},{"name":"Journy","value":"J"}] ;
				}else if(_.contains(['M','R','T'], tmp)){
					arr = [{"name":"选择","value":""}] ;
				}else if(tmp=='F'){
					arr = [{"name":"Sector","value":"S"},{"name":"Portion","value":"P"},{"name":"Journy","value":"J"}] ;
				}
				return arr ;
			},
			convert2TableDataList:function  (list,tbname) {
				list = list || [] ;
				var len = list.length ;
				var retList = [] ;
				var tmpObj = editJsonData['tableData'][tbname]['addObj'] ||{};
				var propArr = [] ;
				for (var prop in tmpObj) {
					if(prop!='selected'){
						propArr.push(prop) ;
					}
				}
				_.each(list,function (item) {
					var obj = {} ;
					_.each(propArr,function(prop){
						obj[prop] = item[prop] +'' ;
					}) ;
					retList.push(obj) ;
				}) ;
				return retList ;
			},
			getEffectivePeriodTypeList:function(subGroup){
				var arr = [{"name":"选择","value":""},{"name":"距购买服务后","value":"A"},
				           {"name":"距服务兑换后","value":"B"},{"name":"距航班起飞前","value":"D"}] ;
				if(subGroup=='FP'){
					arr = [{"name":"选择","value":""},{"name":"距购买服务后","value":"A"}] ;
				}else if(subGroup=='FL'){
					arr = [{"name":"选择","value":""},{"name":"距服务兑换后","value":"B"},{"name":"距航班起飞前","value":"D"}] ;
				}
				return arr ;
			}
		} ;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		var _ = __webpack_require__(21) ;
		module.exports = {
			checkCommonServcie:function(serviceType){//判断服务类型是不是一般附加服务
				var arr = ['F','M','R','T'] ;	
				var flag = _.contains(arr, serviceType) ;
				return flag ;
			},
			checkBaggageServcie:function(serviceType){//判断服务类型是不是行李附加服务
				var arr = ['A','B','C','E','P'] ;
				var flag = _.contains(arr, serviceType) ;
				return flag ;
			},
			getFullDayOrMonthStr:function(dateOrMonthNum){//获得日或月的字符串
				if(dateOrMonthNum<10){
					return "0"+dateOrMonthNum ;
				}
				return dateOrMonthNum+"";
			},
			getEditFlagByStatus:function(statusDes){//通过status获取是否可编辑的flag
				if(statusDes=='3'){
					return false;
				}else{
					return true ;
				}
			}
		} ;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	    var jsonDate = {
	      advancedPurchasePeriodList:[//提前购票时间单位
	        {"name":"分","value":"N"}, {"name":"小时","value":"H"},
	        {"name":"天","value":"D"}, {"name":"月","value":"M"}
	      ],//advancedPurchasePeriodList end
	      tableData:{
	        "list170VO":{
	  			"addObj":{"saleGeographicPointType":"","saleGeographicPoint":"","specFeeAmount":"","specFeeCurrency":"CNY","selected":true}
	  		  },
	        "list198VO":{
	            "addObj":{"mktOp":"","cxr":"","rbd1":"","rbd2":"","rbd3":"","rbd4":"","rbd5":"","selected":true}
	        },
	        "list198UpgradeVO":{
	          "addObj":{"mktOp":"","cxr":"","rbd1":"","rbd2":"","rbd3":"","rbd4":"","rbd5":"","selected":true} 
	        },
	        "list196VO":{
	            "addObj":{"count":"","code":"","selected":true}
	        },
	        "list186VO":{
	            "addObj":{"mktCarrier":"","optCarrier":"","fltNo1":"","fltNo2":"","selected":true}
	        },
	        "list183VO":{
	            "addObj":{"travelAgency":"","carrierGds":"","dutyFunctionCode":"","geographicSpecificationType":"","geographicSpecification":"","codeType":"","code":"","viewBookTkt":"","selected":true}
	        },
	        "list165VO":{
	            "addObj":{"equipmentCode":"","selected":true}
	        },
	        "list171VO":{
	            "addObj":{"carrier":"","resFareClassCode":"","fareTypeCode":"","selected":true}
	        },
	        "list172VO":{
	            "addObj":{"accountCode":"","selected":true}
	        },
	        "list173TicketVO":{
	            "addObj":{"ticketDesignator":"","selected":true}
	        },
	        "list173TktVO":{
	            "addObj":{"ticketDesignator":"","selected":true}
	        },
	        "list178Loc1":{
	            "addObj":{"geoLocType":"","geoLocSpec":"","appl":"","selected":true}
	        },
	        "list178Loc2":{
	            "addObj":{"geoLocType":"","geoLocSpec":"","appl":"","selected":true}
	        },
	        "list178Loc3":{
	            "addObj":{"geoLocType":"","geoLocSpec":"","appl":"","selected":true}
	        },
	        "listTsk202VO":{
	        	"addObj":{"allowedRbd":"","originalFareOffice":"","originalFareIataNo":"","originalFareDepartmentCode":"",
	        	"originalFareBasis":"","newFareBasis":"","flightSpreadFactor":"0","flightSpreadAmount":"","flightSpreadUnit":"",
	        	"flightTourCodeFactor":"","flightTourCodeText":"","flightEiFactor":"","flightEiText":"","selected":true}
	        }
	      },//table end
	      weightUnitList:[//行李重量单位集合
	        {"name":"选择","value":""},{"name":"千克","value":"K"},{"name":"磅","value":"P"}
	      ],
	      specServiceFeeColSubList:[	//SPEC_SERVICE_FEE_COL_SUB//包含/扣除
		       {"name":"包含在票价中","value":"I"},{"name":"单独收费","value":""}
	      ],
	      noChargeNotAvailableList:[//免费/收费
	        {"name":"收费","value":""},{"name":"不适用","value":"X"},
	        {"name":"免费，不出EMD单","value":"F"},{"name":"免费，出EMD单","value":"E"},
	        {"name":"免费，不出EMD单，不要求预定","value":"G"},{"name":"免费，出EMD单，不要求预定","value":"H"},
	        {"name":"免费，行李规则遵循市场方航空公司规则","value":"D"},{"name":"免费，行李规则遵循承运方航空公司规则","value":"O"}
	      ],
	      specServiceFeeNetSellList:[//净价/销售价
	        {"name":"销售价","value":""},{"name":"净价","value":"N"}
	      ],
	      baggageTravelApplicationList:[
	        {"name":"必须匹配所有的航段","value":"A"},{"name":"至少匹配一个航段","value":"S"},
	        {"name":"必须匹配旅行航段中的主航段","value":"M"},{"name":"必须匹配整个行程的每一段","value":"J"},
	        {"name":"不限制","value":""}
	      ],
	      noCharge_notAvailableList:[
	        {"name":"收费","value":""},{"name":"不适用","value":"X"},
	        {"name":"免费，不出EMD单","value":"F"},{"name":"免费，出EMD单","value":"E"},
	        {"name":"免费，不出EMD单，不要求预定","value":"G"},{"name":"免费，出EMD单，不要求预定","value":"H"},
	        {"name":"免费，行李规则遵循市场方航空公司规则","value":"D"},{"name":"免费，行李规则遵循承运方航空公司规则","value":"O"}
	      ],
	      cabinList:[//舱位list集合
	      	{"name":"选择","value":""},
	        {"name":"豪华头等舱","value":"R"},{"name":"头等舱","value":"F"},
	        {"name":"豪华商务舱","value":"J"},{"name":"商务舱","value":"C"},
	        {"name":"豪华经济舱","value":"P"},{"name":"经济舱","value":"Y"}
	      ],
	      geoLocTypeList:[//区域集合
	        {"name":"选择","value":""},
					{"name":"大区","value":"A"},{"name":"城市","value":"C"},
					{"name":"国家","value":"N"},{"name":"机场","value":"P"},
					{"name":"州","value":"S"},{"name":"区域","value":"Z"}
	      ],
	      indicatorReissueRefundList:[
	         {"name":"不可退款","value":"N"},
	         {"name":"可退款","value":"Y"}, {"name":"可改","value":"R"}
	      ],
	      formOfRefundList:[//退款形式
	        {"name":"选择","value":""},{"name":"按原付款渠道退款","value":"1"},
					{"name":"按电子凭证退款","value":"2"}
	      ],
	     
	      geoSpecExceptionStopUnitList:[
	        {"name":"选择","value":""},{"name":"分","value":"N"},
	        {"name":"小时","value":"H"},{"name":"天","value":"D"},
	        {"name":"周","value":"W"},{"name":"月","value":"M"}
	      ],
	      timeApplicationList:[
	        {"name":"选择","value":""},{"name":"分别","value":"D"},
					{"name":"之间","value":"R"}
	      ],
	      effectivePeriodTypeList:[	//effective_period_type//延长类型
	        {"name":"选择","value":""},{"name":"距购买服务后","value":"A"},
	        {"name":"距服务兑换后","value":"B"},{"name":"距航班起飞前","value":"D"}
	        
	      ],
	      effectivePeriodUnitList:[	//effective_period_unit//延长时间单位
	        {"name":"天","value":"D"},{"name":"月","value":"M"},
	        {"name":"小时","value":"H"}
	      ]
	    } ;
	   return jsonDate ;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){
		 var _ = __webpack_require__(21) ;
		 var directives = __webpack_require__(20) ;
		 var headerHtml = __webpack_require__(26) ;
		 var chooseDivHtml = __webpack_require__(27) ;
		 var chooseUlHtml = __webpack_require__(28) ;
		 directives.directive('headerNav', function() {
		    return {
		        restrict: 'E',
		        replace: true,
				scope:true,
		        template: function(elem,attrs){
		        	var action  = $.trim($("#action").val()) ;
		        	var headerTipStr = "" ;
		        	 if(action=="add"){
		    			 headerTipStr = "新建服务费用" ;
		    		  }else{//表示为修改页面跳转过来的
		    		  	  headerTipStr = "更新服务费用" ;
		    		  }
		        	 var template = _.template(headerHtml);
		        	 var str = template({headerTipStr: headerTipStr});
		        	return str ;
		        },
		        link:function(scope,elem,attrs){
		        	scope.backPage = function (){
		        		  var contextPath = $.trim($("#contextPath").val());
		    			  window.location.href= contextPath+'/oc/ocView' ;
		    		  }
		        }
		    };
		 });

		 directives.directive('chooseDiv', function() {
		    return {
		        restrict: 'AE',
		        replace: true,
				scope:true,
				transclude:true,
		        template: chooseDivHtml,
				compile: function compile(tElement, tAttrs, transclude){
					var urlStr = tAttrs['htmlUrl'] ;
					var template = _.template(chooseUlHtml);
					var htmlStr = template({value: urlStr});
					var tmpDiv = tElement.find('div.service_list') ;
					tmpDiv.append(htmlStr) ;
				}
		    };
		 });

	 }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<div class=\"header_control query_section\">\r\n\t<!-- title index -->\r\n\t<div class=\"helper_float_left query_section_row edit_header\">\r\n\t\t<h1 class=\"helper_margin_right_10px\" ><%=headerTipStr%></h1>\r\n\t\t<span class=\"helper_color_blue_2 \">服务类型</span>\r\n\t\t<span class=\"helper_color_blue_2 \">|</span>\r\n\t\t<span class=\"helper_color_blue_2 \">费用</span>\r\n\t\t<span class=\"helper_color_blue_2 \">|</span>\r\n\t\t<span class=\"helper_color_blue_2 \">规则</span>\r\n\t</div>\r\n\t<!-- title index -->\r\n\t<!-- 功能按钮start -->\r\n\t<div class=\"helper_float_right operation_btnlist\">\r\n\t\t<div class=\"helper_float_left helper_margin_0_2px margin_top_5px\" >\r\n\t\t\t<div class=\"btn_page btn_cancel\">\r\n\t\t\t\t<div class=\"btn_left\"></div>\r\n\t\t\t\t<div class=\"btn_content\" id=\"back\" ng-click = \"backPage();\">返回</div>\r\n\t\t\t\t<div class=\"btn_right\"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"helper_float_left helper_margin_0_2px margin_top_5px\">\r\n\t\t\t<div class=\"btn_page btn_cancel\">\r\n\t\t\t\t<div class=\"btn_left\"></div>\r\n\t\t\t\t<div class=\"btn_content\" id=\"s7_save\" ng-click =\"submitForm('save')\">保存</div>\r\n\t\t\t\t<div class=\"btn_right\"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"helper_float_left helper_margin_0_2px margin_top_5px\">\r\n\t\t\t<div class=\"btn_page btn_save\">\r\n\t\t\t\t<div class=\"btn_left\"></div>\r\n\t\t\t\t<div class=\"btn_content\" id=\"s7_saveAndPublish\" ng-click=\"submitForm('saveAndPublish')\" >保存并发布</div>\r\n\t\t\t\t<div class=\"btn_right\"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"clearfix\"></div>\r\n\t</div>\r\n\t<!-- 功能按钮end -->\r\n\t<div class=\"clearfix\"></div>\r\n</div>\r\n";

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<div class=\"choose_box\">\r\n\t<div class=\"srch_input\">\r\n\t\t<div class=\"helper_float_left input_outer\"  ng-transclude=\"\">\r\n\t\t</div>\r\n\t\t<div class=\"clearfix\"></div>\r\n\t</div>\r\n\t<div class=\"service_list\">\r\n\t</div>\r\n</div>";

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<ul>\r\n<%if(\"choose1.html\"==value){%>\r\n\t<li bindonce ng-repeat=\"l in serviceGroupList | serviceGroupFilter:chooseInputData.choose1\"\r\n\t \tng-click=\"subGroupQuery(l.serviceGroupDescription,l.serviceGroup)\" bo-bind=\"l.serviceGroupDescription\">\r\n\t</li>\r\n<%}else if(\"choose2.html\"==value){%>\r\n\t<li bindonce ng-repeat=\"l in subGroupList | subGroupFilter : chooseInputData.choose2\"\r\n\t \tng-click=\"s5Query(l.subGroupDescription,l.subGroup)\"  bo-bind=\"l.subGroupDescription\">\r\n\t</li>\r\n<%}else if(\"choose3.html\"==value){%>\r\n\t<li bindonce ng-repeat=\"l in lastGroupList  | lastGroupFilter : chooseInputData.choose3\"\r\n\t    ng-click=\"lastChooseClick(l)\" class=\"choose4li\">\r\n\t\t<div class=\"service_name\">\r\n\t\t\t<p class=\"helper_float_left\" bo-bind=\"'['+l.serviceSubCode+']'+l.commercialName\"></p>\r\n\t\t\t<span class=\"helper_float_left serviceTypeSpan\" bo-bind = \"l.serviceType\"></span>\r\n\t\t\t<div class=\"clearfix\"></div>\r\n\t\t</div>\r\n\t</li>\r\n<%}else if(\"choose4.html\"==value){%>\r\n\t<li bindonce ng-repeat=\"l in lastGroupList2\" class=\"choose4li\">\r\n\t\t<div class=\"service_name\">\r\n\t\t\t<p class=\"helper_float_left\" bo-bind=\"'['+l.subCode+']'+l.commercialName\"></p>\r\n\t\t\t<span class = \"helper_float_left serviceTypeSpan\" ng-bind = \"l.serviceType\"></span>\r\n\t\t\t<span bo-bind=\"'x'+l.subCodeOccurence\"></span>\r\n\t\t\t<div class=\"clearfix\"></div>\r\n\t\t</div>\r\n\t</li>\r\n<%}%>\r\n</ul>\r\n";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){ 
		 var directives = __webpack_require__(20) ;
		 directives.directive('geoSpecInput', function() {
		    return {
		        restrict: 'E',
		        replace: true,
				scope:true,
		        template: geoSpecInputHtml,
				transclude:true
		    };
		 });
		 
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){ 
		 var directives = __webpack_require__(20) ;
		 var tableHtml = __webpack_require__(31) ;
		 var trHtml = __webpack_require__(32) ;
		 var theadHtml = __webpack_require__(33) ;
		 var _ = __webpack_require__(21) ;
		 //重置数据
		 function reseat198VO (l198){
			if(l198){
				l198.cxr = "" ;
				l198.rbd1 = "" ;
				l198.rbd2 = "" ;
				l198.rbd3 = "" ;
				l198.rbd4 = "" ;
				l198.rbd5 = "" ;
			}
		 }
		 function outAllSelect(list){//将所有tr全部置为非选中状态
			angular.forEach(list,function(l){
				l.selected = false ;
			}) ;
		 }

		 directives.directive('tableInfo', ['FormEditStatusServcie','FormData',function(FormEditStatusServcie,FormData){
			  return {
		        restrict: 'AE',
		        replace: true,
				template:function(elem,atrrs){
					//var tableWidth = atrrs['tableWidth'] ;
					//var tableTemplate = _.template(tableHtml);
					//var tableStr = tableTemplate({"tableWidth": tableWidth}) ;
					//return tableStr ;
					return tableHtml ;
				},
				scope:{
					tableData:'=',
					list:'='
				},
				controller:['$scope',function($scope){
					$scope.data = FormData ;
					$scope.editStatus = FormEditStatusServcie ;
					//新增一行记录
					this.tbAddLine = function(){
						outAllSelect($scope.list) ;
						var obj = angular.copy($scope.tableData.addObj) ;
						$scope.list.push(obj) ;
					}
					//删除一行记录
					this.tbDelLine = function (){
						var len = $scope.list.length ;
						if(len>=1){
							var num = len-1 ;
							angular.forEach($scope.list,function(l,index){
								if(l.selected){
									num = index ;
								}
							}) ;
							outAllSelect($scope.list) ;
							$scope.list.splice(num,1) ;
						}
					}
					
					$scope.clickTr = function(l){
						outAllSelect($scope.list) ;
						l.selected = true ;
					}
					//下面是特殊的部分，select可能会存在//如果你的表格比较特殊的话可能需要修改修改下面的部分代码
					/**这一部分算是半工作能够部分(因为有的表格会使用这部分数据，但是有的表格不使用这部分数据)**/
					$scope.geoSpecTypeList = [
						{"name":"选择","value":""},
						{"name":"大区","value":"A"},{"name":"城市","value":"C"},
						{"name":"国家","value":"N"},{"name":"机场","value":"P"},
						{"name":"州","value":"S"},{"name":"区域","value":"Z"}
					] ;
					$scope.codeTypeList = [
						{"name":"选择","value":""},{"name":"代理人office号","value":"T"},
						{"name":"IATA号","value":"I"},{"name":"Department/Identifier","value":"X"},
						{"name":"CRS/CXR Department Code","value":"V"},{"name":"ERSP No","value":"E"},
						{"name":"LNIATA Number (CRT Address)","value":"L"},{"name":"Airline specific codes","value":"A"}
					] ;
					//市场方/承运方
					$scope.marketingOpreratingList = [
						{"name":"选择","value":""},
						{"name":"市场方","value":"M"},{"name":"承运方","value":"O"},
						{"name":"市场方/承运方","value":"E"}
					] ;
					/*********183特殊部分开始*******************/
					$scope.selectChange183Tb1 = function(l183){
						l183.geographicSpecification = "" ;
					}
					$scope.selectChange183Tb2 = function(l183){
						l183.code = "" ;
					}
					$scope.viewBookTktList = [// 权限list
						{"name":"选择","value":""},{"name":"查看/订票/出票","value":1},
						{"name":"仅查看","value":2}
					] ;
					/*********183特殊部分结束*******************/
					
					/*********198特殊部分开始*******************/
					$scope.selectChange198Tb = function(l198){
						reseat198VO(l198) ;
					}

					$scope.selectChange198TbUpGrade = function(l198UpGrade){
						reseat198VO(l198UpGrade) ;
					}
					/*********198特殊部分结束*******************/
					/*********170特殊部分开始*******************/
					$scope.selectChange170Tb = function(l170){
						reseat170VO(l170) ;
					}
					function reseat170VO (l170){
						if(l170){
							l170.saleGeographicPoint = "" ;
						}
					}
				    /*********170特殊部分结束*******************/
					//178表格的区域select框发生变化时触发的函数
					$scope.selectChange178Tb = function(l178){
						l178.geoLocSpec = "" ;
					}
					//tsk202子表的特殊处理函数
					$scope.customeEdit202Text = function(oldValue,type,index){
						//tbTSKCustomeEdit_type//tbTSKCustomeEdit_index//tbTSKCustomeEdit_value
						$("#tbTSKCustomeEdit_type").val(type) ;
						$("#tbTSKCustomeEdit_index").val(index) ;
						$("#tbTSKCustomeEdit_value").val(oldValue) ;
						//显示的时候清除可能存在的错误提示
						$("#tskCustomeTipInfo").html("") ;
						$("#tbTSK202Modal").modal("show") ;
						$("#tbTSKCustomeEdit_value").focus() ;
						if("flightTourCodeText"==type){//13个字
							$("#tbTSKCustomeEdit_value").attr("maxLength",13) ;
						}else if("flightEiText"==type){//80个字
							$("#tbTSKCustomeEdit_value").attr("maxLength",80) ;
						}
					}
					
				}],
				controllerAs:'ctrl',
				compile: function (tElement, tAttrs, transclude){
					var urlStr = tAttrs['htmlUrl'] ;
					var headerTeplate = _.template(theadHtml) ; 
					var bodyTemplate = _.template(trHtml);
					var headStr = headerTeplate({value: urlStr}) ;
					var bodyStr = bodyTemplate({value: urlStr});
					var tableElement =  angular.element(tElement) ;
					tableElement.find('thead').append(headStr) ;
					tableElement.find('tbody').append(bodyStr) ;
					return {
						post: function(scope, element, attrs,ctrl){
							var tbname = attrs['tbname'] ;
							element.find("div.delete_line").bind('click',function(){
								if (scope.editStatus[tbname]) {//当当前表格可以编辑时
									scope.$apply(function  () {
										ctrl.tbDelLine() ;
									}) ;
								}else{
									//console.info('表格['+tbname+']当前的状态为：不可编辑') ;
								}
							}) ;
							element.find("div.add_line").bind('click',function(){
								if (scope.editStatus[tbname]) {//当当前表格可以编辑时
									scope.$apply(function  () {
										ctrl.tbAddLine() ;
									}) ;
								}else{
									//console.info('表格['+tbname+']当前的状态为：不可编辑') ;
								}
							}) ;
						}
					};
				}
		      };
	      }]);
		  
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n<table>\r\n<thead>\r\n</thead>\r\n<tbody>\r\n</tbody>\r\n</table>\r\n<div class=\"helper_margin_top5\">\r\n\t<div class=\"btn_page btn_add_small\">\r\n    \t<div class=\"btn_left\"></div>\r\n        <div class=\"btn_content add_line\" >增加一行</div>\r\n        <div class=\"btn_right\"></div>\r\n    </div>\r\n\t<div class=\"btn_page btn_add_small_2\">\r\n    \t<div class=\"btn_left\"></div>\r\n\t\t<div class=\"btn_content delete_line\">删除一行</div>\r\n        <div class=\"btn_right\"></div>\r\n    </div>\r\n\t<div class=\"clearfix\"></div>\r\n</div>\r\n</div>\r\n";

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "<tr ng-repeat = \"l in list\"   ng-click = \"clickTr(l);\" ng-class = \"{true:'selectTd',false:''}[l.selected]\">\r\n<%if(\"tb183.html\"==value){%>\r\n\t<td>\r\n\t\t<input  name=\"{{'t1831'+$index}}\" ng-model = \"l.travelAgency\" style=\"width:90%;\"\r\n\t\t\tmaxLength = \"1\" type=\"text\" ng-disabled=\"!editStatus.list183VO\"  upper-input />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1832'+$index}}\"  ng-model = \"l.carrierGds\" style=\"width:90%;\"\r\n\t\t\tmaxLength = \"3\" ng-disabled=\"!editStatus.list183VO\"  type=\"text\"  />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1833'+$index}}\"  ng-model = \"l.dutyFunctionCode\"  style=\"width:90%;\"\r\n\t\t\tmaxLength = \"2\" ng-disabled=\"!editStatus.list183VO\"  type=\"text\"  />\r\n\t</td>\r\n\t<td>\r\n\t\t<select  ng-model=\"l.geographicSpecificationType\" style=\"width:90%;\"  ng-change=\"selectChange183Tb1(l)\"\r\n\t\t\tng-disabled=\"!editStatus.list183VO\" ng-options=\"c.value as c.name for c in geoSpecTypeList\" >\r\n\t\t</select>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1835'+$index}}\" style=\"width:90%;\" ng-model = \"l.geographicSpecification\" ng-disabled=\"!editStatus.list183VO\"  \r\n\t\t\tupper-input=\"\" geo-max-length = \"l.geographicSpecificationType\"  type=\"text\" \r\n\t\t\tng-class = \"{'A':'required areacode','C':'required citycode','N':'required countrycode','P':'required airportcode','S':'required statecode','Z':'required zonecode'}[l.geographicSpecificationType]\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<select  name =\"{{'t1836'+$index}}\" ng-model=\"l.codeType\" style=\"width:90%;\" \r\n\t\t\t\tng-disabled=\"!editStatus.list183VO\"  ng-change=\"selectChange183Tb2(l)\"  \r\n\t\t\t\tclass =\"required\" >\r\n\t\t\t\t <option bindonce  ng-repeat=\"t in codeTypeList\"  ng-selected =\"t.value==l.codeType\"   bo-value=\"t.value\" bo-bind=\"t.name\" ></option>  \r\n\t\t</select>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1837'+$index}}\"  style=\"width:90%;\" ng-model = \"l.code\" upper-input  ng-disabled=\"!editStatus.list183VO\" type=\"text\" \r\n\t\t\t   ng-class = \"{'T':'office required','I':'iatanum required','X':'required','V':'required','E':'required','L':'required','A':'required'}[l.codeType]\"  \r\n\t\t\t   tui-max-length = \"{'T':'6','I':'8','X':'8','V':'8','E':'8','L':'8','A':'8'}[l.codeType]\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<select ng-model=\"l.viewBookTkt\"style=\"width:95%;\"  ng-disabled=\"!editStatus.list183VO\" \r\n\t\t\t\tng-options=\"d.value as d.name for d in viewBookTktList\">\r\n\t\t</select>\r\n\t</td>\r\n<%}else if(\"tb171.html\"==value){%>\r\n\t<td>\r\n\t\t<input name=\"{{'t1711'+$index}}\" ng-model = \"l.carrier\"  ng-disabled=\"!editStatus.list171VO\"  upper-input=\"\" \r\n\t\t\tset-focus=\"\" class = \"air required\" type = \"text\" tabindex=\"1\" maxlength=\"2\"  size = \"16\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input  ng-model = \"l.resFareClassCode\"  ng-disabled=\"!editStatus.list171VO\" \r\n\t\t\ttype = \"text\" tabindex=\"1\" maxlength=\"16\"  size = \"16\" />\r\n\t</td>\r\n\t<td >\r\n\t\t<input  ng-model = \"l.fareTypeCode\"  ng-disabled=\"!editStatus.list171VO\" \r\n\t\t\t\ttype = \"text\" tabindex=\"1\" maxlength=\"3\"  size = \"16\" />\r\n\t</td>\r\n<%}else if (\"tb172.html\"==value){%>\r\n\t<td>\r\n\t\t<input  ng-model = \"l.accountCode\"  ng-disabled=\"!editStatus.list172VO\"  type = \"text\" \r\n\t\t\ttabindex=\"1\" maxlength=\"20\"  size = \"16\" />\r\n\t</td>\r\n<%}else if (\"tb173Ticket.html\"==value){%>\r\n\t<td>\r\n\t\t<input  ng-model = \"l.ticketDesignator\"  ng-disabled=\"!editStatus.list173TicketVO\"  type = \"text\" \r\n\t\t\t\ttabindex=\"1\" maxlength=\"10\"  size = \"16\" />\r\n\t</td>\r\n<%}else if (\"tb173Tkt.html\"==value){%>\r\n\t<td>\r\n\t\t<input  ng-model = \"l.ticketDesignator\"  ng-disabled=\"!editStatus.list173TktVO\" type = \"text\" tabindex=\"1\"\r\n\t\t\t maxlength=\"10\"  size = \"16\" />\r\n\t</td>\r\n<%}else if (\"tb165.html\"==value){%>\r\n\t<td>\r\n\t\t<input name=\"{{'t1651'+$index}}\" ng-model = \"l.equipmentCode\"  ng-disabled=\"!editStatus.list165VO\"  \r\n\t\t\tupper-input=\"\" class = \"lettersOrNumber\" maxLength = \"3\" type = \"text\" size = \"16\"  />\r\n\t</td>\r\n<%}else if(\"tb186.html\"==value){%>\r\n\t<td>\r\n\t\t<input name=\"{{'t1861'+$index}}\" ng-model = \"l.mktCarrier\" ng-disabled=\"!editStatus.list186VO\" set-focus  \r\n\t\t\ttype=\"text\" maxLength = \"3\" tabindex=\"3\" size=\"5\" class=\"required\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input ng-model = \"l.optCarrier\" maxLength =\"3\" ng-disabled=\"!editStatus.list186VO\"  \r\n\t\t\ttype=\"text\" tabindex=\"3\" size=\"5\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1863'+$index}}\" ng-model = \"l.fltNo1\" maxLength = \"4\" \r\n\t\t\tng-disabled=\"!editStatus.list186VO\" type=\"text\" tabindex=\"3\" size=\"5\" class=\"required\"  />-\r\n\t\t<input ng-model = \"l.fltNo2\" maxLength =\"4\" ng-disabled=\"!editStatus.list186VO\"  type=\"text\" \r\n\t\t\ttabindex=\"3\" size=\"5\"  />\r\n</td>\r\n<%}else if (\"tb196.html\"==value){%>\r\n\t<td>\r\n\t\t<input name=\"{{'t1961'+$index}}\" ng-model = \"l.count\"  ng-disabled=\"!editStatus.list196VO\" \r\n\t\t\t   maxLength = \"2\"  type=\"text\" tabindex=\"3\" size=\"15\" class=\"positiveInteger\"/>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1962'+$index}}\" ng-model = \"l.code\"  upper-input set-focus  maxLength = \"3\"  type=\"text\"\r\n\t\t\tng-disabled=\"!editStatus.list196VO\"  tabindex=\"3\" size=\"15\"  class=\"lettersOrNumber\" />\r\n\t</td>\r\n<%}else if (\"tb198.html\"==value){%>\r\n\t<td>\r\n\t\t<select ng-model=\"l.mktOp\" ng-disabled=\"!editStatus.list198VO\"  style=\"width:120px;\"\r\n\t\t\tng-change = \"selectChange198Tb(l)\" ng-options=\"b.value as b.name for b in marketingOpreratingList\" >\r\n\t\t</select>  \r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1982'+$index}}\" ng-model = \"l.cxr\" upper-input ng-disabled=\"!editStatus.list198VO\"  maxLength = \"2\"  typ \r\n\t\t   ng-class = \"{true:'air required',false:''}[l.mktOp.length>0]\"  tabindex=\"3\" size=\"5\" class=\"input_normal\"/>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1983'+$index}}\" ng-model = \"l.rbd1\" upper-input ng-disabled=\"!editStatus.list198VO\"  maxLength = \"1\" \r\n\t\t   type=\"text\" tabindex=\"3\" ng-class = \"{true:'seatcode required',false:''}[l.mktOp.length>0]\"  size=\"3\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1983'+$index}}\" ng-model = \"l.rbd2\" upper-input ng-disabled=\"!editStatus.list198VO\"  maxLength = \"1\"  \r\n\t\t\ttabindex=\"3\" ng-class = \"{true:'seatcode',false:''}[l.mktOp.length>0]\" type=\"text\"size=\"3\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1984'+$index}}\" ng-model = \"l.rbd3\"  upper-input ng-disabled=\"!editStatus.list198VO\" maxLength = \"1\"  \r\n\t\t\ttabindex=\"3\" size=\"3\" ng-class = \"{true:'seatcode',false:''}[l.mktOp.length>0]\" type=\"text\"  />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1985'+$index}}\" ng-model = \"l.rbd4\"  upper-input ng-disabled=\"!editStatus.list198VO\" \r\n\t\t\tmaxLength = \"1\"  tabindex=\"3\" size=\"3\" ng-class = \"{true:'seatcode',false:''}[l.mktOp.length>0]\" type=\"text\"  />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1986'+$index}}\" ng-model = \"l.rbd5\" upper-input  ng-disabled=\"!editStatus.list198VO\" maxLength = \"1\"  \r\n\t\t\ttabindex=\"3\" size=\"3\" ng-class = \"{true:'seatcode',false:''}[l.mktOp.length>0]\" type=\"text\"  />\r\n\t</td>\r\n<%}else if(\"tb198UpGrade.html\"==value){%>\r\n\t<td ng-if = \"data.sel1.value=='UP'||data.sel1.value=='BDUP'\">\r\n\t\t<select ng-change=\"selectChange198TbUpGrade(l)\" ng-model=\"l.mktOp\" ng-disabled=\"!editStatus.list198UpgradeVO\"  style=\"width:120px;\"\r\n\t\t\t ng-options=\"b.value as b.name for b in marketingOpreratingList\" >\r\n\t\t</select>  \r\n\t</td>\r\n\t<td ng-if = \"data.sel1.value=='UP'||data.sel1.value=='BDUP'\">\r\n\t\t<input name =\"{{'t198ug1'+$index}}\" ng-model = \"l.cxr\" upper-input ng-disabled=\"!editStatus.list198UpgradeVO\" \r\n\t\t\t   class=\"air\" maxLength=\"2\"  type=\"text\" tabindex=\"3\" size=\"5\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"{{'t198ug2'+$index}}\" ng-model = \"l.rbd1\" upper-input set-focus ng-disabled=\"!editStatus.list198UpgradeVO\" \r\n\t\t\tclass=\"required seatcode\" maxLength=\"1\"  type=\"text\" tabindex=\"3\" size=\"7\"  />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"{{'t198ug3'+$index}}\" ng-model = \"l.rbd2\" upper-input ng-disabled=\"!editStatus.list198UpgradeVO\"  \r\n\t\t\tclass=\"seatcode\" maxLength=\"1\" type=\"text\" tabindex=\"3\" size=\"7\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"{{'t198ug4'+$index}}\" ng-model = \"l.rbd3\" upper-input  ng-disabled=\"!editStatus.list198UpgradeVO\"  \r\n\t\t\tclass=\"seatcode\" maxLength=\"1\" type=\"text\" tabindex=\"3\" size=\"7\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"{{'t198ug5'+$index}}\" ng-model = \"l.rbd4\" upper-input ng-disabled=\"!editStatus.list198UpgradeVO\"  \r\n\t\t\tclass=\"seatcode\" maxLength=\"1\" type=\"text\" tabindex=\"3\" size=\"7\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"{{'t198ug6'+$index}}\" ng-model = \"l.rbd5\" upper-input ng-disabled=\"!editStatus.list198UpgradeVO\"  \r\n\t\t\tclass=\"seatcode\" maxLength=\"1\" type=\"text\" tabindex=\"3\" size=\"7\"  />\r\n\t</td>\r\n<%}else if (\"tb170.html\"==value){%>\r\n\t<td>\r\n\t\t<select ng-model=\"l.saleGeographicPointType\"  ng-disabled=\"!editStatus.list170VO\" style=\"width:60px;\"\r\n\t\t\t\tng-options=\"o.value as o.name for o in geoSpecTypeList\" ng-change=\"selectChange170Tb(l)\">\r\n\t\t</select>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name = \"{{'t1701'+$index}}\"  ng-model = \"l.saleGeographicPoint\" ng-disabled=\"!editStatus.list170VO\" \r\n\t\t\t   upper-input geo-max-length = \"l.saleGeographicPointType\" \r\n\t\t\t   ng-class = \"{'A':'required areacode','C':'required citycode','N':'required countrycode','P':'required airportcode','S':'required statecode','Z':'required zonecode'}[l.saleGeographicPointType]\"\r\n\t\t\t   type = \"text\" size = \"16\"  />\r\n\t</td>\r\n\t<td >\r\n\t\t<input  name=\"{{'t1702'+$index}}\" ng-model = \"l.specFeeAmount\" class = \"required nonNegativeInteger\"  set-focus=\"\" type = \"text\" \r\n\t\t\tng-disabled=\"!editStatus.list170VO\" tabindex=\"1\" maxlength=\"7\"  size = \"16\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name = \"{{'t1703'+$index}}\" ng-model = \"l.specFeeCurrency\" upper-input  type = \"text\" \r\n\t\t\tsize = \"16\" maxlength=\"3\"  ng-disabled=\"!editStatus.list170VO\" class = \"letter\" \r\n\t\t\tng-class = \"{true:'required',false:''}[l.saleGeographicPointType.length>0]\" />\r\n\t</td>\r\n<%}else if(\"tb178geo1.html\"==value){%>\r\n\t<td>\r\n\t\t<select ng-model=\"l.geoLocType\" ng-disabled=\"!editStatus.list178Loc1\"  class = \"select_width\" style=\"width:100px;\"\r\n\t\t\tng-options=\"b.value as b.name for b in geoSpecTypeList\" ng-change=\"selectChange178Tb(l)\" >\r\n\t\t</select>  \r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t17812'+$index}}\" ng-model = \"l.geoLocSpec\" geo-max-length = \"l.geoLocType\" upper-input  \r\n\t\t\tng-disabled=\"!editStatus.list178Loc1\" type=\"text\" tabindex=\"3\" size=\"5\" class=\"input_normal\"\r\n\t\t\tng-class = \"{'A':'required areacode','C':'required citycode','N':'required countrycode','P':'required airportcode','S':'required statecode','Z':'required zonecode'}[l.geoLocType]\" />\r\n\t</td>\r\n\t<td>\r\n\t\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc1\"  type=\"radio\" tabindex=\"3\" size=\"5\" value=\"\" />适用\r\n\t\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc1\"  type=\"radio\" tabindex=\"3\" size=\"5\" value=\"N\" />不适用\r\n\t</td>\r\n<%}else if(\"tb178geo2.html\"==value){%>\r\n\t<td>\r\n\t\t<select ng-model=\"l.geoLocType\" ng-disabled=\"!editStatus.list178Loc2\"  class = \"select_width\" style=\"width:100px;\"\r\n\t\t\tng-options=\"b.value as b.name for b in geoSpecTypeList\" ng-change=\"selectChange178Tb(l)\" >\r\n\t\t</select>  \r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t17822'+$index}}\" ng-model = \"l.geoLocSpec\" geo-max-length = \"l.geoLocType\" upper-input  \r\n\t\t\tng-disabled=\"!editStatus.list178Loc2\" type=\"text\" tabindex=\"3\" size=\"5\" class=\"input_normal\"\r\n\t\t\tng-class = \"{'A':'required areacode','C':'required citycode','N':'required countrycode','P':'required airportcode','S':'required statecode','Z':'required zonecode'}[l.geoLocType]\" />\r\n\t</td>\r\n\t<td>\r\n\t\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc2\"  type=\"radio\" tabindex=\"3\" size=\"5\" value=\"\" />适用\r\n\t\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc2\"  type=\"radio\" tabindex=\"3\" size=\"5\" value=\"N\" />不适用\r\n\t</td>\r\n<%}else if(\"tb178geo3.html\"==value){%>\r\n\t<td>\r\n\t\t<select ng-model=\"l.geoLocType\" ng-disabled=\"!editStatus.list178Loc3\"  class = \"select_width\" style=\"width:100px;\"\r\n\t\t\tng-options=\"b.value as b.name for b in geoSpecTypeList\" ng-change=\"selectChange178Tb(l)\" >\r\n\t\t</select>  \r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t17832'+$index}}\" ng-model = \"l.geoLocSpec\" geo-max-length = \"l.geoLocType\" upper-input  \r\n\t\t\tng-disabled=\"!editStatus.list178Loc3\" type=\"text\" tabindex=\"3\" size=\"5\" class=\"input_normal\"\r\n\t\t\tng-class = \"{'A':'required areacode','C':'required citycode','N':'required countrycode','P':'required airportcode','S':'required statecode','Z':'required zonecode'}[l.geoLocType]\" />\r\n\t</td>\r\n\t<td>\r\n\t\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc3\"  type=\"radio\" tabindex=\"3\" size=\"5\" value=\"\" />适用\r\n\t\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc3\"  type=\"radio\" tabindex=\"3\" size=\"5\" value=\"N\" />不适用\r\n\t</td>\r\n<%}else if(\"tbTSK202.html\"==value){%>\r\n\t<td><input name =\"tsk20201{{$index}}\" ng-model =\"l.allowedRbd\" class =\"required allowedRbd\" type =\"text\" \r\n\t\tstyle=\"width:125px\" placeholder=\"A/B/C/D\" maxLength =\"19\" upper-input=\"\" ng-disabled=\"!editStatus.listTsk202VO\" /></td>\r\n\t<td><input name =\"tsk20202{{$index}}\" ng-model =\"l.originalFareOffice\" \r\n\t\ttype =\"text\" style=\"width:50px\" maxLength =\"8\" ng-disabled=\"!editStatus.listTsk202VO\" /></td>\r\n\t<td><input name =\"tsk20203{{$index}}\" ng-model =\"l.originalFareIataNo\" \r\n\t\ttype =\"text\" style=\"width:50px\" maxLength=\"8\" ng-disabled=\"!editStatus.listTsk202VO\" /></td>\r\n\t<td><input name =\"tsk20204{{$index}}\" ng-model =\"l.originalFareDepartmentCode\" \r\n\t\ttype =\"text\" style=\"width:80px\" maxLength =\"8\" ng-disabled=\"!editStatus.listTsk202VO\" /></td>\r\n\t<td style =\"width:150px\">\r\n\t\t<span>原始运价&nbsp;</span><input name =\"tsk20205{{$index}}\" ng-model =\"l.originalFareBasis\" \r\n\t\ttype =\"text\" style=\"width:60px\" maxLength =\"10\" class =\"lettersOrNumber\" ng-disabled=\"!editStatus.listTsk202VO\" /><br/>\r\n\t\t新票面&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name =\"tsk20206{{$index}}\" ng-model =\"l.newFareBasis\" \r\n\t\t\ttype =\"text\" style=\"width:60px\" maxLength =\"10\" class =\"lettersOrNumber\" ng-disabled=\"!editStatus.listTsk202VO\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<select name =\"tsk20207{{$index}}\" ng-model =\"l.flightSpreadFactor\" \r\n\t\t\tclass =\"required\" style =\"width:130px\" ng-disabled=\"!editStatus.listTsk202VO\">\r\n\t\t\t<option value=\"0\">免差价</option>\r\n\t\t\t<option value =\"1\">收差价,ET计算差额</option>\r\n\t\t\t<option value =\"2\">收差价,自定义差额</option>\r\n\t\t</select><br/>\r\n\t\t<span ng-show =\"l.flightSpreadFactor=='2'\">\r\n\t\t\t<input name =\"tsk20208{{$index}}\" ng-class =\"{true:'required',false:''}[l.flightSpreadFactor=='2']\" \r\n\t\t\t\tng-model =\"l.flightSpreadAmount\" type =\"text\" style =\"width:59px;\" ng-disabled=\"!editStatus.listTsk202VO\"\r\n\t\t\t\tmaxLength =\"7\"  class =\"positiveInteger\" ng-class =\"{true:'required',false:''}[l.flightSpreadFactor=='2']\" />\r\n\t\t\t<select name =\"tsk20209{{$index}}\" ng-model =\"l.flightSpreadUnit\" style =\"width:60px;\"\r\n\t\t\t\t ng-class =\"{true:'required',false:''}[l.flightSpreadAmount!='']\" ng-disabled=\"!editStatus.listTsk202VO\">\r\n\t\t\t\t<option value =\"\">选择</option>\r\n\t\t\t\t<option value =\"CNY\">CNY</option>\r\n\t\t\t</select>\r\n\t\t</span>\r\n\t\t\r\n\t</td>\r\n\t<td>\r\n\t\t<a href=\"javascript:void(0)\" ng-click =\"customeEdit202Text(l.flightTourCodeText,'flightTourCodeText',$index)\">编辑TourCode文本</a><br>\r\n\t\t附加规则&nbsp;<input name =\"tsk20210{{$index}}\" ng-model =\"l.flightTourCodeFactor\" class =\"required zeorOrOtherNum\" \r\n\t\ttype =\"text\" style =\"width:38px\" maxLength =\"5\" class =\"nonNegativeInteger\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<a href=\"javascript:void(0)\" ng-click =\"customeEdit202Text(l.flightEiText,'flightEiText',$index)\">编辑备注文本</a><br>\r\n\t\t附加规则&nbsp;<input name =\"tsk20211{{$index}}\" ng-model =\"l.flightEiFactor\" class =\"required zeorOrOtherNum\" \r\n\t\ttype =\"text\" style=\"width:38px\" maxLength =\"5\" class =\"nonNegativeInteger\"/>\r\n\t</td>\r\n<%}else{%>\r\n\t<td colspan=\"{{column}}\">\r\n\t\t<h3>你传入的html模板不存在，请检查</h3>\r\n\t</td>\r\n<%}%>\r\n</tr>";

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "<%if(\"tb183.html\"==value){%>\r\n<tr>\r\n\t<th width=\"62px\">旅行社</th>\r\n\t<th width=\"100px\">航空公司/分销商</th>\r\n\t<th width=\"76px\">职责/功能码</th>\r\n\t<th width =\"80px\">区域类型</th>\r\n\t<th width =\"65px\">区域代码</th>\r\n\t<th width =\"150px\">发布对象类型</th>\r\n\t<th width =\"87px\">发布对象代码</th>\r\n\t<th width =\"110px\">权限</th>\r\n</tr>\r\n<%}else if(\"tb171.html\"==value){%>\r\n<tr>\r\n\t<th>航空公司</th>\r\n\t<th>票价类别</th>\r\n\t<th>运价类型</th>\r\n</tr>\r\n<%}else if (\"tb172.html\"==value){%>\r\n<tr>\r\n\t<th>大客户编码</th>\r\n</tr>\r\n<%}else if (\"tb173Ticket.html\"==value){%>\r\n<tr>\r\n\t<th>指定客票</th>\r\n</tr>\r\n<%}else if (\"tb173Tkt.html\"==value){%>\r\n<tr>\r\n\t<th>指定客票</th>\r\n</tr>\r\n<%}else if (\"tb165.html\"==value){%>\r\n<tr>\r\n\t<th>机型代码</th>\r\n</tr>\r\n<%}else if(\"tb186.html\"==value){%>\r\n<tr>\r\n\t<th>市场方</th>\r\n\t<th>承运方</th>\r\n\t<th>航班号</th>\r\n</tr>\r\n<%}else if (\"tb196.html\"==value){%>\r\n<tr>\r\n\t<th>行李件数</th>\r\n\t<th>行李子代码</th>\r\n</tr>\r\n<%}else if (\"tb198.html\"==value){%>\r\n<tr>\r\n\t<th>市场方/承运方</th>\r\n\t<th>航空公司</th>\r\n\t<th>订座舱位1</th>\r\n\t<th>订座舱位2</th>\r\n\t<th>订座舱位3</th>\r\n\t<th>订座舱位4</th>\r\n\t<th>订座舱位5</th>\r\n</tr>\r\n<%}else if(\"tb198UpGrade.html\"==value){%>\r\n<tr>\r\n\t<th ng-if = \"data.sel1.value=='UP'||data.sel1.value=='BDUP'\">市场方/承运方</th>\r\n\t<th ng-if = \"data.sel1.value=='UP'||data.sel1.value=='BDUP'\">航空公司</th>\r\n\t<th>订座舱位1</th>\r\n\t<th>订座舱位2</th>\r\n\t<th>订座舱位3</th>\r\n\t<th>订座舱位4</th>\r\n\t<th>订座舱位5</th>\r\n</tr>\r\n<%}else if (\"tb170.html\"==value){%>\r\n<tr>\r\n\t<th>销售地类型</th>\r\n\t<th>销售地代码</th>\r\n\t<th>金额</th>\r\n\t<th>货币类型</th>\r\n</tr>\r\n<%}else if(\"tb178geo1.html\"==value){%>\r\n<tr>\r\n\t<th>类型</th>\r\n\t<th>代码</th>\r\n\t<th>是否适用</th>\r\n</tr>\r\n<%}else if(\"tb178geo2.html\"==value){%>\r\n<tr>\r\n\t<th>类型</th>\r\n\t<th>代码</th>\r\n\t<th>是否适用</th>\r\n</tr>\r\n<%}else if(\"tb178geo3.html\"==value){%>\r\n<tr>\r\n\t<th>类型</th>\r\n\t<th>代码</th>\r\n\t<th>是否适用</th>\r\n</tr>\r\n<%}else if(\"tbTSK202.html\"==value){%>\r\n<tr>\r\n\t<th>&nbsp;</th>\r\n\t<th colspan =\"3\">原始运价</th>\r\n\t<th>&nbsp;</th>\r\n\t<th colspan =\"3\">新票填开</th>\r\n</tr>\t\r\n<tr>\r\n\t<th width =\"127\">兑换舱位</th>\r\n\t<th width =\"58\">office</th>\r\n\t<th width =\"58\">IATA_NO</th>\r\n\t<th width =\"103\">DepartmentCode</th>\r\n\t<th width =\"162\">farebasis</th>\r\n\t<th width =\"130\">差价</th>\r\n\t<th width =\"143\">TourCode</th>\r\n\t<th width =\"138\">签注</th>\r\n</tr>\t\r\n<%}%>\r\n</tr>";

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var util = __webpack_require__(17) ;
	    var app = __webpack_require__(20) ;
	    var _ = __webpack_require__(21) ;
	    

	    //区域校验
	    app.directive('geo',function(){
	        var obj = {'A':'areacode','C':'citycode','N':'countrycode','P':'airportcode','S':'statecode','Z':'zonecode'} ;
	        var values = _.values(obj); 
	        function resetAllSuccess (ctrl){
	            _.each(values, function(item){
	                ctrl.$setValidity(item,true);
	            });
	        };
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                ctrl.$parsers.push(function(viewValue){
	                    var flag = true ;
	                    var key = "" ;
	                    if(viewValue!=''){
	                        var geo = attrs['geo'] ;
	                        var geoSpecLocType = scope.data[geo] ;
	                        key = obj[geoSpecLocType] ;
	                        flag = util.isValidGeoLocal(viewValue,geoSpecLocType) ;
	                    }
	                    resetAllSuccess(ctrl) ;
	                    if(key!=null&&key.length>0){
	                        ctrl.$setValidity(key,flag);
	                    }
	                    return viewValue;
	                });
	            }
	        };
	    });



	    //letter
	     app.directive('letter',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                ctrl.$validators.letter = function(modelValue,viewValue){
	                    if(viewValue!=''){
	                        return util.isLetter(viewValue);
	                    }
	                    return true;
	                };
	            }
	        };
	    });

	    //lettersOrNumber
	    app.directive('lorn',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"?ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                if(!ctrl) return ;
	                ctrl.$validators.lorn = function(modelValue,viewValue){
	                    if(viewValue!=''){
	                        return util.islettersOrNumber(viewValue);
	                    }
	                    return true;
	                };
	            }
	        };
	    });

	    //positiveInteger(正整数不包括'0')
	    app.directive('pint',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"?ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                if(!ctrl) return ;
	                ctrl.$validators.pint = function(modelValue,viewValue){
	                    if(viewValue!=''){
	                        return util.isPositiveInteger(viewValue);
	                    }
	                    return true;
	                };
	            }
	        };
	    });


	    //nonNegativeInteger(包括‘0’)
	    app.directive('nnint',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"?ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                if(!ctrl) return ;
	                ctrl.$validators.nnint = function(modelValue,viewValue){
	                    if(viewValue!=''){
	                        return util.isNonNegativeInteger(viewValue);
	                    }
	                    return true;
	                };
	            }
	        };
	    });

	    //small
	    app.directive('smaller',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                ctrl.$validators.smaller = function(modelValue, viewValue) {
	                    var flag = true ;
	                    var compareVal = attrs['smaller'] ;
	                    if(viewValue!=''&&compareVal!=''){
	                        if(!isNaN(viewValue)&&!isNaN(compareVal)){//都为数值时
	                            var curInt = parseFloat(viewValue) ;
	                            var comInt = parseFloat(compareVal) ;
	                            if(curInt>comInt){
	                                flag = false;
	                            }
	                        }
	                    }
	                    return flag;
	                };
	                attrs.$observe('smaller', function() {
	                    ctrl.$validate();
	                });
	            }
	        };
	    });

	    //bigger
	    app.directive('bigger',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                ctrl.$validators.bigger = function(modelValue, viewValue) {
	                    var flag = true ;
	                    var compareVal = attrs['bigger'] ;
	                    if(viewValue!=''&&compareVal!=''){
	                        if(!isNaN(viewValue)&&!isNaN(compareVal)){//都为数值时
	                            var curInt = parseFloat(viewValue) ;
	                            var comInt = parseFloat(compareVal) ;
	                            if(curInt<comInt){
	                                flag = false;
	                            }
	                        }
	                    }
	                    return flag;
	                };
	                attrs.$observe('bigger', function() {
	                    ctrl.$validate();
	                });
	            }
	        }
	    });

	    //biggerDate
	    app.directive('bd',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                if (!ctrl) return;
	                ctrl.$validators.bd = function(modelValue, viewValue) {
	                    var compareVal = attrs['bd'] ;
	                    if(viewValue!=''&&compareVal!=''){
	                        return util.isBiggerDateThan(viewValue,compareVal) ;
	                    }
	                    return true;
	                };
	                attrs.$observe('bd', function() {
	                    ctrl.$validate();
	                });
	            }
	        }
	    });

	    //smallerDate
	    app.directive('sd',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                if (!ctrl) return;
	                ctrl.$validators.sd = function(modelValue, viewValue) {
	                    var compareVal = attrs['sd'] ;
	                    if(viewValue!=''&&compareVal!=''){
	                        return util.isSmallerDateThan(viewValue,compareVal) ; 
	                    }
	                    return true;
	                };
	                attrs.$observe('sd', function() {
	                    ctrl.$validate();
	                });
	            }
	        }
	    });
	    
	    
	    //biggerThanCurrent
	    app.directive('btc',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	            	if (!ctrl) return;
	                ctrl.$validators.btc = function(modelValue, viewValue) {
	                     var statusDes = scope.data.statusDes ;
		                 if(viewValue!=''&&!util.checkStatusIsDisable(statusDes)){
		                      return util.isBiggerThanCurrent(viewValue) ;
		                }
		                 return true ;
	                };
	            }
	        }
	    });
	    
	    
	    app.directive('dateoc',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                if (!ctrl) return;
	                ctrl.$validators.dateoc = function(modelValue, viewValue) {
			                if(viewValue!=''){
		                        return util.isDateOC(viewValue);
		                    }
		                    return true ;
	                };
	            }
	        }
	    });
	    
	  //自定义校验(三字码)
	    app.directive('threecode',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	            	if (!ctrl) return;
	                ctrl.$validators.threecode = function(modelValue, viewValue) {
			                if(viewValue!=''){
		                        return util.isThreecode(viewValue) ;
		                    }
		                    return true ;
	                };
	            }
	        }
	    });

	    app.directive('air',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	            	if (!ctrl) return;
	                ctrl.$validators.threecode = function(modelValue, viewValue) {
			                if(viewValue!=''){
		                        return util.isAir(viewValue);
		                    }
		                    return true ;
	                };
	            }
	        }
	    });

	    //发布对象校验
	    app.directive('publicobj',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                ctrl.$parsers.push(function(viewValue){
	                    var curType = attrs['publicobj'] ;
	                    var len = viewValue.length ;
	                    if(curType=='T'){
	                        if(len>6){
	                            ctrl.$setValidity('length6',false);
	                        }else{
	                            ctrl.$setValidity('length6',true);
	                        }
	                        ctrl.$setValidity('length8',true);
	                    }else{
	                        if(len>8){
	                            ctrl.$setValidity('length8',false);
	                        }else{
	                            ctrl.$setValidity('length8',true);
	                        }
	                        ctrl.$setValidity('length6',true);
	                    }
	                    return viewValue;
	                });
	            }
	        }
	    });
	    
	    
	    
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;//主要用来加载各个控制器（所有的控制器都将在这个文件中被加载）,除此之外再不用做其他，
	//因为我们可以有很多个控制器文件，按照具体需要进行添加。
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		 //需要的插件
		 __webpack_require__(36) ;
		 __webpack_require__(38) ;
		 //头部
		 __webpack_require__(44) ;
		 //基本信息部分
		 __webpack_require__(45) ;
		 //第一块信息
		 __webpack_require__(46) ;
		 //第二块信息
		 __webpack_require__(47) ;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);


/***/ },
/* 37 */
/***/ function(module, exports) {

	/*
	 * jQuery timepicker addon
	 * By: Trent Richardson [http://trentrichardson.com]
	 * Version 1.3
	 * Last Modified: 05/05/2013
	 *
	 * Copyright 2013 Trent Richardson
	 * You may use this project under MIT or GPL licenses.
	 * http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
	 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
	 */

	/*jslint evil: true, white: false, undef: false, nomen: false */
	(function($) {
		/*
		* Lets not redefine timepicker, Prevent "Uncaught RangeError: Maximum call stack size exceeded"
		*/
		$.ui.timepicker = $.ui.timepicker || {};
		if ($.ui.timepicker.version) {
			return;
		}

		/*
		* Extend jQueryUI, get it started with our version number
		*/
		$.extend($.ui, {
			timepicker: {
				version: "1.3"
			}
		});

		/* 
		* Timepicker manager.
		* Use the singleton instance of this class, $.timepicker, to interact with the time picker.
		* Settings for (groups of) time pickers are maintained in an instance object,
		* allowing multiple different settings on the same page.
		*/
		var Timepicker = function() {
			this.regional = []; // Available regional settings, indexed by language code
			this.regional[''] = { // Default regional settings
				currentText: 'Now',
				closeText: 'Done',
				amNames: ['AM', 'A'],
				pmNames: ['PM', 'P'],
				timeFormat: 'HH:mm',
				timeSuffix: '',
				timeOnlyTitle: 'Choose Time',
				timeText: 'Time',
				hourText: 'Hour',
				minuteText: 'Minute',
				secondText: 'Second',
				millisecText: 'Millisecond',
				microsecText: 'Microsecond',
				timezoneText: 'Time Zone',
				isRTL: false
			};
			this._defaults = { // Global defaults for all the datetime picker instances
				showButtonPanel: true,
				timeOnly: false,
				showHour: null,
				showMinute: null,
				showSecond: null,
				showMillisec: null,
				showMicrosec: null,
				showTimezone: null,
				showTime: true,
				stepHour: 1,
				stepMinute: 1,
				stepSecond: 1,
				stepMillisec: 1,
				stepMicrosec: 1,
				hour: 0,
				minute: 0,
				second: 0,
				millisec: 0,
				microsec: 0,
				timezone: null,
				hourMin: 0,
				minuteMin: 0,
				secondMin: 0,
				millisecMin: 0,
				microsecMin: 0,
				hourMax: 23,
				minuteMax: 59,
				secondMax: 59,
				millisecMax: 999,
				microsecMax: 999,
				minDateTime: null,
				maxDateTime: null,
				onSelect: null,
				hourGrid: 0,
				minuteGrid: 0,
				secondGrid: 0,
				millisecGrid: 0,
				microsecGrid: 0,
				alwaysSetTime: true,
				separator: ' ',
				altFieldTimeOnly: true,
				altTimeFormat: null,
				altSeparator: null,
				altTimeSuffix: null,
				pickerTimeFormat: null,
				pickerTimeSuffix: null,
				showTimepicker: true,
				timezoneList: null,
				addSliderAccess: false,
				sliderAccessArgs: null,
				controlType: 'slider',
				defaultValue: null,
				parse: 'strict'
			};
			$.extend(this._defaults, this.regional['']);
		};

		$.extend(Timepicker.prototype, {
			$input: null,
			$altInput: null,
			$timeObj: null,
			inst: null,
			hour_slider: null,
			minute_slider: null,
			second_slider: null,
			millisec_slider: null,
			microsec_slider: null,
			timezone_select: null,
			hour: 0,
			minute: 0,
			second: 0,
			millisec: 0,
			microsec: 0,
			timezone: null,
			hourMinOriginal: null,
			minuteMinOriginal: null,
			secondMinOriginal: null,
			millisecMinOriginal: null,
			microsecMinOriginal: null,
			hourMaxOriginal: null,
			minuteMaxOriginal: null,
			secondMaxOriginal: null,
			millisecMaxOriginal: null,
			microsecMaxOriginal: null,
			ampm: '',
			formattedDate: '',
			formattedTime: '',
			formattedDateTime: '',
			timezoneList: null,
			units: ['hour','minute','second','millisec', 'microsec'],
			support: {},
			control: null,

			/* 
			* Override the default settings for all instances of the time picker.
			* @param  settings  object - the new settings to use as defaults (anonymous object)
			* @return the manager object
			*/
			setDefaults: function(settings) {
				extendRemove(this._defaults, settings || {});
				return this;
			},

			/*
			* Create a new Timepicker instance
			*/
			_newInst: function($input, o) {
				var tp_inst = new Timepicker(),
					inlineSettings = {},
	            	fns = {},
			    	overrides, i;

				for (var attrName in this._defaults) {
					if(this._defaults.hasOwnProperty(attrName)){
						var attrValue = $input.attr('time:' + attrName);
						if (attrValue) {
							try {
								inlineSettings[attrName] = eval(attrValue);
							} catch (err) {
								inlineSettings[attrName] = attrValue;
							}
						}
					}
				}

			    overrides = {
			        beforeShow: function (input, dp_inst) {
			            if ($.isFunction(tp_inst._defaults.evnts.beforeShow)) {
			                return tp_inst._defaults.evnts.beforeShow.call($input[0], input, dp_inst, tp_inst);
			            }
			        },
			        onChangeMonthYear: function (year, month, dp_inst) {
			            // Update the time as well : this prevents the time from disappearing from the $input field.
			            tp_inst._updateDateTime(dp_inst);
			            if ($.isFunction(tp_inst._defaults.evnts.onChangeMonthYear)) {
			                tp_inst._defaults.evnts.onChangeMonthYear.call($input[0], year, month, dp_inst, tp_inst);
			            }
			        },
			        onClose: function (dateText, dp_inst) {
			            if (tp_inst.timeDefined === true && $input.val() !== '') {
			                tp_inst._updateDateTime(dp_inst);
			            }
			            if ($.isFunction(tp_inst._defaults.evnts.onClose)) {
			                tp_inst._defaults.evnts.onClose.call($input[0], dateText, dp_inst, tp_inst);
			            }
			        }
			    };
			    for (i in overrides) {
			        if (overrides.hasOwnProperty(i)) {
			            fns[i] = o[i] || null;
			        }
			    }

			    tp_inst._defaults = $.extend({}, this._defaults, inlineSettings, o, overrides, {
			        evnts:fns,
			        timepicker: tp_inst // add timepicker as a property of datepicker: $.datepicker._get(dp_inst, 'timepicker');
			    });
				tp_inst.amNames = $.map(tp_inst._defaults.amNames, function(val) {
					return val.toUpperCase();
				});
				tp_inst.pmNames = $.map(tp_inst._defaults.pmNames, function(val) {
					return val.toUpperCase();
				});

				// detect which units are supported
				tp_inst.support = detectSupport(
						tp_inst._defaults.timeFormat + 
						(tp_inst._defaults.pickerTimeFormat? tp_inst._defaults.pickerTimeFormat:'') + 
						(tp_inst._defaults.altTimeFormat? tp_inst._defaults.altTimeFormat:''));

				// controlType is string - key to our this._controls
				if(typeof(tp_inst._defaults.controlType) === 'string'){
					if(tp_inst._defaults.controlType == 'slider' && typeof(jQuery.ui.slider) === 'undefined'){
						tp_inst._defaults.controlType = 'select';
					}
					tp_inst.control = tp_inst._controls[tp_inst._defaults.controlType];
				}
				// controlType is an object and must implement create, options, value methods
				else{ 
					tp_inst.control = tp_inst._defaults.controlType;
				}

				// prep the timezone options
				var timezoneList = [-720,-660,-600,-570,-540,-480,-420,-360,-300,-270,-240,-210,-180,-120,-60,
						0,60,120,180,210,240,270,300,330,345,360,390,420,480,525,540,570,600,630,660,690,720,765,780,840];
				if (tp_inst._defaults.timezoneList !== null) {
					timezoneList = tp_inst._defaults.timezoneList;
				}
				var tzl=timezoneList.length,tzi=0,tzv=null;
				if (tzl > 0 && typeof timezoneList[0] !== 'object') {
					for(; tzi<tzl; tzi++){
						tzv = timezoneList[tzi];
						timezoneList[tzi] = { value: tzv, label: $.timepicker.timezoneOffsetString(tzv, tp_inst.support.iso8601) };
					}
				}
				tp_inst._defaults.timezoneList = timezoneList;

				// set the default units
				tp_inst.timezone = tp_inst._defaults.timezone !== null? $.timepicker.timezoneOffsetNumber(tp_inst._defaults.timezone) : 
								((new Date()).getTimezoneOffset()*-1);
				tp_inst.hour = tp_inst._defaults.hour < tp_inst._defaults.hourMin? tp_inst._defaults.hourMin : 
								tp_inst._defaults.hour > tp_inst._defaults.hourMax? tp_inst._defaults.hourMax : tp_inst._defaults.hour;
				tp_inst.minute = tp_inst._defaults.minute < tp_inst._defaults.minuteMin? tp_inst._defaults.minuteMin : 
								tp_inst._defaults.minute > tp_inst._defaults.minuteMax? tp_inst._defaults.minuteMax : tp_inst._defaults.minute;
				tp_inst.second = tp_inst._defaults.second < tp_inst._defaults.secondMin? tp_inst._defaults.secondMin : 
								tp_inst._defaults.second > tp_inst._defaults.secondMax? tp_inst._defaults.secondMax : tp_inst._defaults.second;
				tp_inst.millisec = tp_inst._defaults.millisec < tp_inst._defaults.millisecMin? tp_inst._defaults.millisecMin : 
								tp_inst._defaults.millisec > tp_inst._defaults.millisecMax? tp_inst._defaults.millisecMax : tp_inst._defaults.millisec;
				tp_inst.microsec = tp_inst._defaults.microsec < tp_inst._defaults.microsecMin? tp_inst._defaults.microsecMin : 
								tp_inst._defaults.microsec > tp_inst._defaults.microsecMax? tp_inst._defaults.microsecMax : tp_inst._defaults.microsec;
				tp_inst.ampm = '';
				tp_inst.$input = $input;

				if (o.altField) {
					tp_inst.$altInput = $(o.altField).css({
						cursor: 'pointer'
					}).focus(function() {
						$input.trigger("focus");
					});
				}

				if (tp_inst._defaults.minDate === 0 || tp_inst._defaults.minDateTime === 0) {
					tp_inst._defaults.minDate = new Date();
				}
				if (tp_inst._defaults.maxDate === 0 || tp_inst._defaults.maxDateTime === 0) {
					tp_inst._defaults.maxDate = new Date();
				}

				// datepicker needs minDate/maxDate, timepicker needs minDateTime/maxDateTime..
				if (tp_inst._defaults.minDate !== undefined && tp_inst._defaults.minDate instanceof Date) {
					tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime());
				}
				if (tp_inst._defaults.minDateTime !== undefined && tp_inst._defaults.minDateTime instanceof Date) {
					tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime());
				}
				if (tp_inst._defaults.maxDate !== undefined && tp_inst._defaults.maxDate instanceof Date) {
					tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime());
				}
				if (tp_inst._defaults.maxDateTime !== undefined && tp_inst._defaults.maxDateTime instanceof Date) {
					tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime());
				}
				tp_inst.$input.bind('focus', function() {
					tp_inst._onFocus();
				});

				return tp_inst;
			},

			/*
			* add our sliders to the calendar
			*/
			_addTimePicker: function(dp_inst) {
				var currDT = (this.$altInput && this._defaults.altFieldTimeOnly) ? this.$input.val() + ' ' + this.$altInput.val() : this.$input.val();

				this.timeDefined = this._parseTime(currDT);
				this._limitMinMaxDateTime(dp_inst, false);
				this._injectTimePicker();
			},

			/*
			* parse the time string from input value or _setTime
			*/
			_parseTime: function(timeString, withDate) {
				if (!this.inst) {
					this.inst = $.datepicker._getInst(this.$input[0]);
				}

				if (withDate || !this._defaults.timeOnly) {
					var dp_dateFormat = $.datepicker._get(this.inst, 'dateFormat');
					try {
						var parseRes = parseDateTimeInternal(dp_dateFormat, this._defaults.timeFormat, timeString, $.datepicker._getFormatConfig(this.inst), this._defaults);
						if (!parseRes.timeObj) {
							return false;
						}
						$.extend(this, parseRes.timeObj);
					} catch (err) {
						$.timepicker.log("Error parsing the date/time string: " + err +
										"\ndate/time string = " + timeString +
										"\ntimeFormat = " + this._defaults.timeFormat +
										"\ndateFormat = " + dp_dateFormat);
						return false;
					}
					return true;
				} else {
					var timeObj = $.datepicker.parseTime(this._defaults.timeFormat, timeString, this._defaults);
					if (!timeObj) {
						return false;
					}
					$.extend(this, timeObj);
					return true;
				}
			},

			/*
			* generate and inject html for timepicker into ui datepicker
			*/
			_injectTimePicker: function() {
				var $dp = this.inst.dpDiv,
					o = this.inst.settings,
					tp_inst = this,
					litem = '',
					uitem = '',
					show = null,
					max = {},
					gridSize = {},
					size = null,
					i=0,
					l=0;

				// Prevent displaying twice
				if ($dp.find("div.ui-timepicker-div").length === 0 && o.showTimepicker) {
					var noDisplay = ' style="display:none;"',
						html = '<div class="ui-timepicker-div'+ (o.isRTL? ' ui-timepicker-rtl' : '') +'"><dl>' + '<dt class="ui_tpicker_time_label"' + ((o.showTime) ? '' : noDisplay) + '>' + o.timeText + '</dt>' + 
									'<dd class="ui_tpicker_time"' + ((o.showTime) ? '' : noDisplay) + '></dd>';

					// Create the markup
					for(i=0,l=this.units.length; i<l; i++){
						litem = this.units[i];
						uitem = litem.substr(0,1).toUpperCase() + litem.substr(1);
						show = o['show'+uitem] !== null? o['show'+uitem] : this.support[litem];

						// Added by Peter Medeiros:
						// - Figure out what the hour/minute/second max should be based on the step values.
						// - Example: if stepMinute is 15, then minMax is 45.
						max[litem] = parseInt((o[litem+'Max'] - ((o[litem+'Max'] - o[litem+'Min']) % o['step'+uitem])), 10);
						gridSize[litem] = 0;

						html += '<dt class="ui_tpicker_'+ litem +'_label"' + (show ? '' : noDisplay) + '>' + o[litem +'Text'] + '</dt>' + 
									'<dd class="ui_tpicker_'+ litem +'"><div class="ui_tpicker_'+ litem +'_slider"' + (show ? '' : noDisplay) + '></div>';

						if (show && o[litem+'Grid'] > 0) {
							html += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';

							if(litem == 'hour'){
								for (var h = o[litem+'Min']; h <= max[litem]; h += parseInt(o[litem+'Grid'], 10)) {
									gridSize[litem]++;
									var tmph = $.datepicker.formatTime(this.support.ampm? 'hht':'HH', {hour:h}, o);									
									html += '<td data-for="'+litem+'">' + tmph + '</td>';
								}
							}
							else{
								for (var m = o[litem+'Min']; m <= max[litem]; m += parseInt(o[litem+'Grid'], 10)) {
									gridSize[litem]++;
									html += '<td data-for="'+litem+'">' + ((m < 10) ? '0' : '') + m + '</td>';
								}
							}

							html += '</tr></table></div>';
						}
						html += '</dd>';
					}
					
					// Timezone
					var showTz = o.showTimezone !== null? o.showTimezone : this.support.timezone;
					html += '<dt class="ui_tpicker_timezone_label"' + (showTz ? '' : noDisplay) + '>' + o.timezoneText + '</dt>';
					html += '<dd class="ui_tpicker_timezone" ' + (showTz ? '' : noDisplay) + '></dd>';

					// Create the elements from string
					html += '</dl></div>';
					var $tp = $(html);

					// if we only want time picker...
					if (o.timeOnly === true) {
						$tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all">' + '<div class="ui-datepicker-title">' + o.timeOnlyTitle + '</div>' + '</div>');
						$dp.find('.ui-datepicker-header, .ui-datepicker-calendar').hide();
					}
					
					// add sliders, adjust grids, add events
					for(i=0,l=tp_inst.units.length; i<l; i++){
						litem = tp_inst.units[i];
						uitem = litem.substr(0,1).toUpperCase() + litem.substr(1);
						show = o['show'+uitem] !== null? o['show'+uitem] : this.support[litem];

						// add the slider
						tp_inst[litem+'_slider'] = tp_inst.control.create(tp_inst, $tp.find('.ui_tpicker_'+litem+'_slider'), litem, tp_inst[litem], o[litem+'Min'], max[litem], o['step'+uitem]);

						// adjust the grid and add click event
						if (show && o[litem+'Grid'] > 0) {
							size = 100 * gridSize[litem] * o[litem+'Grid'] / (max[litem] - o[litem+'Min']);
							$tp.find('.ui_tpicker_'+litem+' table').css({
								width: size + "%",
								marginLeft: o.isRTL? '0' : ((size / (-2 * gridSize[litem])) + "%"),
								marginRight: o.isRTL? ((size / (-2 * gridSize[litem])) + "%") : '0',
								borderCollapse: 'collapse'
							}).find("td").click(function(e){
									var $t = $(this),
										h = $t.html(),
										n = parseInt(h.replace(/[^0-9]/g),10),
										ap = h.replace(/[^apm]/ig),
										f = $t.data('for'); // loses scope, so we use data-for

									if(f == 'hour'){
										if(ap.indexOf('p') !== -1 && n < 12){
											n += 12;
										}
										else{
											if(ap.indexOf('a') !== -1 && n === 12){
												n = 0;
											}
										}
									}
									
									tp_inst.control.value(tp_inst, tp_inst[f+'_slider'], litem, n);

									tp_inst._onTimeChange();
									tp_inst._onSelectHandler();
								}).css({
									cursor: 'pointer',
									width: (100 / gridSize[litem]) + '%',
									textAlign: 'center',
									overflow: 'hidden'
								});
						} // end if grid > 0
					} // end for loop

					// Add timezone options
					this.timezone_select = $tp.find('.ui_tpicker_timezone').append('<select></select>').find("select");
					$.fn.append.apply(this.timezone_select,
					$.map(o.timezoneList, function(val, idx) {
						return $("<option />").val(typeof val == "object" ? val.value : val).text(typeof val == "object" ? val.label : val);
					}));
					if (typeof(this.timezone) != "undefined" && this.timezone !== null && this.timezone !== "") {
						var local_timezone = (new Date(this.inst.selectedYear, this.inst.selectedMonth, this.inst.selectedDay, 12)).getTimezoneOffset()*-1;
						if (local_timezone == this.timezone) {
							selectLocalTimezone(tp_inst);
						} else {
							this.timezone_select.val(this.timezone);
						}
					} else {
						if (typeof(this.hour) != "undefined" && this.hour !== null && this.hour !== "") {
							this.timezone_select.val(o.timezone);
						} else {
							selectLocalTimezone(tp_inst);
						}
					}
					this.timezone_select.change(function() {
						tp_inst._onTimeChange();
						tp_inst._onSelectHandler();
					});
					// End timezone options
					
					// inject timepicker into datepicker
					var $buttonPanel = $dp.find('.ui-datepicker-buttonpane');
					if ($buttonPanel.length) {
						$buttonPanel.before($tp);
					} else {
						$dp.append($tp);
					}

					this.$timeObj = $tp.find('.ui_tpicker_time');

					if (this.inst !== null) {
						var timeDefined = this.timeDefined;
						this._onTimeChange();
						this.timeDefined = timeDefined;
					}

					// slideAccess integration: http://trentrichardson.com/2011/11/11/jquery-ui-sliders-and-touch-accessibility/
					if (this._defaults.addSliderAccess) {
						var sliderAccessArgs = this._defaults.sliderAccessArgs,
							rtl = this._defaults.isRTL;
						sliderAccessArgs.isRTL = rtl;
							
						setTimeout(function() { // fix for inline mode
							if ($tp.find('.ui-slider-access').length === 0) {
								$tp.find('.ui-slider:visible').sliderAccess(sliderAccessArgs);

								// fix any grids since sliders are shorter
								var sliderAccessWidth = $tp.find('.ui-slider-access:eq(0)').outerWidth(true);
								if (sliderAccessWidth) {
									$tp.find('table:visible').each(function() {
										var $g = $(this),
											oldWidth = $g.outerWidth(),
											oldMarginLeft = $g.css(rtl? 'marginRight':'marginLeft').toString().replace('%', ''),
											newWidth = oldWidth - sliderAccessWidth,
											newMarginLeft = ((oldMarginLeft * newWidth) / oldWidth) + '%',
											css = { width: newWidth, marginRight: 0, marginLeft: 0 };
										css[rtl? 'marginRight':'marginLeft'] = newMarginLeft;
										$g.css(css);
									});
								}
							}
						}, 10);
					}
					// end slideAccess integration

				}
			},

			/*
			* This function tries to limit the ability to go outside the
			* min/max date range
			*/
			_limitMinMaxDateTime: function(dp_inst, adjustSliders) {
				var o = this._defaults,
					dp_date = new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay);

				if (!this._defaults.showTimepicker) {
					return;
				} // No time so nothing to check here

				if ($.datepicker._get(dp_inst, 'minDateTime') !== null && $.datepicker._get(dp_inst, 'minDateTime') !== undefined && dp_date) {
					var minDateTime = $.datepicker._get(dp_inst, 'minDateTime'),
						minDateTimeDate = new Date(minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate(), 0, 0, 0, 0);

					if (this.hourMinOriginal === null || this.minuteMinOriginal === null || this.secondMinOriginal === null || this.millisecMinOriginal === null || this.microsecMinOriginal === null) {
						this.hourMinOriginal = o.hourMin;
						this.minuteMinOriginal = o.minuteMin;
						this.secondMinOriginal = o.secondMin;
						this.millisecMinOriginal = o.millisecMin;
						this.microsecMinOriginal = o.microsecMin;
					}

					if (dp_inst.settings.timeOnly || minDateTimeDate.getTime() == dp_date.getTime()) {
						this._defaults.hourMin = minDateTime.getHours();
						if (this.hour <= this._defaults.hourMin) {
							this.hour = this._defaults.hourMin;
							this._defaults.minuteMin = minDateTime.getMinutes();
							if (this.minute <= this._defaults.minuteMin) {
								this.minute = this._defaults.minuteMin;
								this._defaults.secondMin = minDateTime.getSeconds();
								if (this.second <= this._defaults.secondMin) {
									this.second = this._defaults.secondMin;
									this._defaults.millisecMin = minDateTime.getMilliseconds();
									if(this.millisec <= this._defaults.millisecMin) {
										this.millisec = this._defaults.millisecMin;
										this._defaults.microsecMin = minDateTime.getMicroseconds();
									} else {
										if (this.microsec < this._defaults.microsecMin) {
											this.microsec = this._defaults.microsecMin;
										}
										this._defaults.microsecMin = this.microsecMinOriginal;
									}
								} else {
									this._defaults.millisecMin = this.millisecMinOriginal;
									this._defaults.microsecMin = this.microsecMinOriginal;
								}
							} else {
								this._defaults.secondMin = this.secondMinOriginal;
								this._defaults.millisecMin = this.millisecMinOriginal;
								this._defaults.microsecMin = this.microsecMinOriginal;
							}
						} else {
							this._defaults.minuteMin = this.minuteMinOriginal;
							this._defaults.secondMin = this.secondMinOriginal;
							this._defaults.millisecMin = this.millisecMinOriginal;
							this._defaults.microsecMin = this.microsecMinOriginal;
						}
					} else {
						this._defaults.hourMin = this.hourMinOriginal;
						this._defaults.minuteMin = this.minuteMinOriginal;
						this._defaults.secondMin = this.secondMinOriginal;
						this._defaults.millisecMin = this.millisecMinOriginal;
						this._defaults.microsecMin = this.microsecMinOriginal;
					}
				}

				if ($.datepicker._get(dp_inst, 'maxDateTime') !== null && $.datepicker._get(dp_inst, 'maxDateTime') !== undefined && dp_date) {
					var maxDateTime = $.datepicker._get(dp_inst, 'maxDateTime'),
						maxDateTimeDate = new Date(maxDateTime.getFullYear(), maxDateTime.getMonth(), maxDateTime.getDate(), 0, 0, 0, 0);

					if (this.hourMaxOriginal === null || this.minuteMaxOriginal === null || this.secondMaxOriginal === null || this.millisecMaxOriginal === null) {
						this.hourMaxOriginal = o.hourMax;
						this.minuteMaxOriginal = o.minuteMax;
						this.secondMaxOriginal = o.secondMax;
						this.millisecMaxOriginal = o.millisecMax;
						this.microsecMaxOriginal = o.microsecMax;
					}

					if (dp_inst.settings.timeOnly || maxDateTimeDate.getTime() == dp_date.getTime()) {
						this._defaults.hourMax = maxDateTime.getHours();
						if (this.hour >= this._defaults.hourMax) {
							this.hour = this._defaults.hourMax;
							this._defaults.minuteMax = maxDateTime.getMinutes();
							if (this.minute >= this._defaults.minuteMax) {
								this.minute = this._defaults.minuteMax;
								this._defaults.secondMax = maxDateTime.getSeconds();
								if (this.second >= this._defaults.secondMax) {
									this.second = this._defaults.secondMax;
									this._defaults.millisecMax = maxDateTime.getMilliseconds();
									if (this.millisec >= this._defaults.millisecMax) {
										this.millisec = this._defaults.millisecMax;
										this._defaults.microsecMax = maxDateTime.getMicroseconds();
									} else {
										if (this.microsec > this._defaults.microsecMax) {
											this.microsec = this._defaults.microsecMax;
										}
										this._defaults.microsecMax = this.microsecMaxOriginal;
									}
								} else {
									this._defaults.millisecMax = this.millisecMaxOriginal;
									this._defaults.microsecMax = this.microsecMaxOriginal;
								}
							} else {
								this._defaults.secondMax = this.secondMaxOriginal;
								this._defaults.millisecMax = this.millisecMaxOriginal;
								this._defaults.microsecMax = this.microsecMaxOriginal;
							}
						} else {
							this._defaults.minuteMax = this.minuteMaxOriginal;
							this._defaults.secondMax = this.secondMaxOriginal;
							this._defaults.millisecMax = this.millisecMaxOriginal;
							this._defaults.microsecMax = this.microsecMaxOriginal;
						}
					} else {
						this._defaults.hourMax = this.hourMaxOriginal;
						this._defaults.minuteMax = this.minuteMaxOriginal;
						this._defaults.secondMax = this.secondMaxOriginal;
						this._defaults.millisecMax = this.millisecMaxOriginal;
						this._defaults.microsecMax = this.microsecMaxOriginal;
					}
				}

				if (adjustSliders !== undefined && adjustSliders === true) {
					var hourMax = parseInt((this._defaults.hourMax - ((this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour)), 10),
						minMax = parseInt((this._defaults.minuteMax - ((this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute)), 10),
						secMax = parseInt((this._defaults.secondMax - ((this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond)), 10),
						millisecMax = parseInt((this._defaults.millisecMax - ((this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec)), 10);
						microsecMax = parseInt((this._defaults.microsecMax - ((this._defaults.microsecMax - this._defaults.microsecMin) % this._defaults.stepMicrosec)), 10);

					if (this.hour_slider) {
						this.control.options(this, this.hour_slider, 'hour', { min: this._defaults.hourMin, max: hourMax });
						this.control.value(this, this.hour_slider, 'hour', this.hour - (this.hour % this._defaults.stepHour));
					}
					if (this.minute_slider) {
						this.control.options(this, this.minute_slider, 'minute', { min: this._defaults.minuteMin, max: minMax });
						this.control.value(this, this.minute_slider, 'minute', this.minute - (this.minute % this._defaults.stepMinute));
					}
					if (this.second_slider) {
						this.control.options(this, this.second_slider, 'second', { min: this._defaults.secondMin, max: secMax });
						this.control.value(this, this.second_slider, 'second', this.second - (this.second % this._defaults.stepSecond));
					}
					if (this.millisec_slider) {
						this.control.options(this, this.millisec_slider, 'millisec', { min: this._defaults.millisecMin, max: millisecMax });
						this.control.value(this, this.millisec_slider, 'millisec', this.millisec - (this.millisec % this._defaults.stepMillisec));
					}
					if (this.microsec_slider) {
						this.control.options(this, this.microsec_slider, 'microsec', { min: this._defaults.microsecMin, max: microsecMax });
						this.control.value(this, this.microsec_slider, 'microsec', this.microsec - (this.microsec % this._defaults.stepMicrosec));
					}
				}

			},

			/*
			* when a slider moves, set the internal time...
			* on time change is also called when the time is updated in the text field
			*/
			_onTimeChange: function() {
				var hour = (this.hour_slider) ? this.control.value(this, this.hour_slider, 'hour') : false,
					minute = (this.minute_slider) ? this.control.value(this, this.minute_slider, 'minute') : false,
					second = (this.second_slider) ? this.control.value(this, this.second_slider, 'second') : false,
					millisec = (this.millisec_slider) ? this.control.value(this, this.millisec_slider, 'millisec') : false,
					microsec = (this.microsec_slider) ? this.control.value(this, this.microsec_slider, 'microsec') : false,
					timezone = (this.timezone_select) ? this.timezone_select.val() : false,
					o = this._defaults,
					pickerTimeFormat = o.pickerTimeFormat || o.timeFormat,
					pickerTimeSuffix = o.pickerTimeSuffix || o.timeSuffix;

				if (typeof(hour) == 'object') {
					hour = false;
				}
				if (typeof(minute) == 'object') {
					minute = false;
				}
				if (typeof(second) == 'object') {
					second = false;
				}
				if (typeof(millisec) == 'object') {
					millisec = false;
				}
				if (typeof(microsec) == 'object') {
					microsec = false;
				}
				if (typeof(timezone) == 'object') {
					timezone = false;
				}

				if (hour !== false) {
					hour = parseInt(hour, 10);
				}
				if (minute !== false) {
					minute = parseInt(minute, 10);
				}
				if (second !== false) {
					second = parseInt(second, 10);
				}
				if (millisec !== false) {
					millisec = parseInt(millisec, 10);
				}
				if (microsec !== false) {
					microsec = parseInt(microsec, 10);
				}

				var ampm = o[hour < 12 ? 'amNames' : 'pmNames'][0];

				// If the update was done in the input field, the input field should not be updated.
				// If the update was done using the sliders, update the input field.
				var hasChanged = (hour != this.hour || minute != this.minute || second != this.second || millisec != this.millisec || microsec != this.microsec 
									|| (this.ampm.length > 0 && (hour < 12) != ($.inArray(this.ampm.toUpperCase(), this.amNames) !== -1)) 
									|| (this.timezone !== null && timezone != this.timezone));

				if (hasChanged) {

					if (hour !== false) {
						this.hour = hour;
					}
					if (minute !== false) {
						this.minute = minute;
					}
					if (second !== false) {
						this.second = second;
					}
					if (millisec !== false) {
						this.millisec = millisec;
					}
					if (microsec !== false) {
						this.microsec = microsec;
					}
					if (timezone !== false) {
						this.timezone = timezone;
					}

					if (!this.inst) {
						this.inst = $.datepicker._getInst(this.$input[0]);
					}

					this._limitMinMaxDateTime(this.inst, true);
				}
				if (this.support.ampm) {
					this.ampm = ampm;
				}

				// Updates the time within the timepicker
				this.formattedTime = $.datepicker.formatTime(o.timeFormat, this, o);
				if (this.$timeObj) {
					if(pickerTimeFormat === o.timeFormat){
						this.$timeObj.text(this.formattedTime + pickerTimeSuffix);
					}
					else{
						this.$timeObj.text($.datepicker.formatTime(pickerTimeFormat, this, o) + pickerTimeSuffix);
					}
				}

				this.timeDefined = true;
				if (hasChanged) {
					this._updateDateTime();
				}
			},

			/*
			* call custom onSelect.
			* bind to sliders slidestop, and grid click.
			*/
			_onSelectHandler: function() {
				var onSelect = this._defaults.onSelect || this.inst.settings.onSelect;
				var inputEl = this.$input ? this.$input[0] : null;
				if (onSelect && inputEl) {
					onSelect.apply(inputEl, [this.formattedDateTime, this]);
				}
			},

			/*
			* update our input with the new date time..
			*/
			_updateDateTime: function(dp_inst) {
				dp_inst = this.inst || dp_inst;
				var dt = $.datepicker._daylightSavingAdjust(new Date(dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay)),
					dateFmt = $.datepicker._get(dp_inst, 'dateFormat'),
					formatCfg = $.datepicker._getFormatConfig(dp_inst),
					timeAvailable = dt !== null && this.timeDefined;
				this.formattedDate = $.datepicker.formatDate(dateFmt, (dt === null ? new Date() : dt), formatCfg);
				var formattedDateTime = this.formattedDate;
				
				// if a slider was changed but datepicker doesn't have a value yet, set it
				if(dp_inst.lastVal===""){
	                dp_inst.currentYear=dp_inst.selectedYear;
	                dp_inst.currentMonth=dp_inst.selectedMonth;
	                dp_inst.currentDay=dp_inst.selectedDay;
	            }

				/*
				* remove following lines to force every changes in date picker to change the input value
				* Bug descriptions: when an input field has a default value, and click on the field to pop up the date picker. 
				* If the user manually empty the value in the input field, the date picker will never change selected value.
				*/
				//if (dp_inst.lastVal !== undefined && (dp_inst.lastVal.length > 0 && this.$input.val().length === 0)) {
				//	return;
				//}

				if (this._defaults.timeOnly === true) {
					formattedDateTime = this.formattedTime;
				} else if (this._defaults.timeOnly !== true && (this._defaults.alwaysSetTime || timeAvailable)) {
					formattedDateTime += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix;
				}

				this.formattedDateTime = formattedDateTime;

				if (!this._defaults.showTimepicker) {
					this.$input.val(this.formattedDate);
				} else if (this.$altInput && this._defaults.timeOnly === false && this._defaults.altFieldTimeOnly === true) {
					this.$altInput.val(this.formattedTime);
					this.$input.val(this.formattedDate);
				} else if (this.$altInput) {
					this.$input.val(formattedDateTime);
					var altFormattedDateTime = '',
						altSeparator = this._defaults.altSeparator ? this._defaults.altSeparator : this._defaults.separator,
						altTimeSuffix = this._defaults.altTimeSuffix ? this._defaults.altTimeSuffix : this._defaults.timeSuffix;
					
					if(!this._defaults.timeOnly){
						if (this._defaults.altFormat){
							altFormattedDateTime = $.datepicker.formatDate(this._defaults.altFormat, (dt === null ? new Date() : dt), formatCfg);
						}
						else{
							altFormattedDateTime = this.formattedDate;
						}

						if (altFormattedDateTime){
							altFormattedDateTime += altSeparator;
						}
					}

					if(this._defaults.altTimeFormat){
						altFormattedDateTime += $.datepicker.formatTime(this._defaults.altTimeFormat, this, this._defaults) + altTimeSuffix;
					}
					else{
						altFormattedDateTime += this.formattedTime + altTimeSuffix;
					}
					this.$altInput.val(altFormattedDateTime);
				} else {
					this.$input.val(formattedDateTime);
				}

				this.$input.trigger("change");
			},

			_onFocus: function() {
				if (!this.$input.val() && this._defaults.defaultValue) {
					this.$input.val(this._defaults.defaultValue);
					var inst = $.datepicker._getInst(this.$input.get(0)),
						tp_inst = $.datepicker._get(inst, 'timepicker');
					if (tp_inst) {
						if (tp_inst._defaults.timeOnly && (inst.input.val() != inst.lastVal)) {
							try {
								$.datepicker._updateDatepicker(inst);
							} catch (err) {
								$.timepicker.log(err);
							}
						}
					}
				}
			},

			/*
			* Small abstraction to control types
			* We can add more, just be sure to follow the pattern: create, options, value
			*/
			_controls: {
				// slider methods
				slider: {
					create: function(tp_inst, obj, unit, val, min, max, step){
						var rtl = tp_inst._defaults.isRTL; // if rtl go -60->0 instead of 0->60
						return obj.prop('slide', null).slider({
							orientation: "horizontal",
							value: rtl? val*-1 : val,
							min: rtl? max*-1 : min,
							max: rtl? min*-1 : max,
							step: step,
							slide: function(event, ui) {
								tp_inst.control.value(tp_inst, $(this), unit, rtl? ui.value*-1:ui.value);
								tp_inst._onTimeChange();
							},
							stop: function(event, ui) {
								tp_inst._onSelectHandler();
							}
						});	
					},
					options: function(tp_inst, obj, unit, opts, val){
						if(tp_inst._defaults.isRTL){
							if(typeof(opts) == 'string'){
								if(opts == 'min' || opts == 'max'){
									if(val !== undefined){
										return obj.slider(opts, val*-1);
									}
									return Math.abs(obj.slider(opts));
								}
								return obj.slider(opts);
							}
							var min = opts.min, 
								max = opts.max;
							opts.min = opts.max = null;
							if(min !== undefined){
								opts.max = min * -1;
							}
							if(max !== undefined){
								opts.min = max * -1;
							}
							return obj.slider(opts);
						}
						if(typeof(opts) == 'string' && val !== undefined){
								return obj.slider(opts, val);
						}
						return obj.slider(opts);
					},
					value: function(tp_inst, obj, unit, val){
						if(tp_inst._defaults.isRTL){
							if(val !== undefined){
								return obj.slider('value', val*-1);
							}
							return Math.abs(obj.slider('value'));
						}
						if(val !== undefined){
							return obj.slider('value', val);
						}
						return obj.slider('value');
					}
				},
				// select methods
				select: {
					create: function(tp_inst, obj, unit, val, min, max, step){
						var sel = '<select class="ui-timepicker-select" data-unit="'+ unit +'" data-min="'+ min +'" data-max="'+ max +'" data-step="'+ step +'">',
							format = tp_inst._defaults.pickerTimeFormat || tp_inst._defaults.timeFormat;

						for(var i=min; i<=max; i+=step){						
							sel += '<option value="'+ i +'"'+ (i==val? ' selected':'') +'>';
							if(unit == 'hour'){
								sel += $.datepicker.formatTime($.trim(format.replace(/[^ht ]/ig,'')), {hour:i}, tp_inst._defaults);
							}
							else if(unit == 'millisec' || unit == 'microsec' || i >= 10){ sel += i; }
							else {sel += '0'+ i.toString(); }
							sel += '</option>';
						}
						sel += '</select>';

						obj.children('select').remove();

						$(sel).appendTo(obj).change(function(e){
							tp_inst._onTimeChange();
							tp_inst._onSelectHandler();
						});

						return obj;
					},
					options: function(tp_inst, obj, unit, opts, val){
						var o = {},
							$t = obj.children('select');
						if(typeof(opts) == 'string'){
							if(val === undefined){
								return $t.data(opts);
							}
							o[opts] = val;	
						}
						else{ o = opts; }
						return tp_inst.control.create(tp_inst, obj, $t.data('unit'), $t.val(), o.min || $t.data('min'), o.max || $t.data('max'), o.step || $t.data('step'));
					},
					value: function(tp_inst, obj, unit, val){
						var $t = obj.children('select');
						if(val !== undefined){
							return $t.val(val);
						}
						return $t.val();
					}
				}
			} // end _controls

		});

		$.fn.extend({
			/*
			* shorthand just to use timepicker..
			*/
			timepicker: function(o) {
				o = o || {};
				var tmp_args = Array.prototype.slice.call(arguments);

				if (typeof o == 'object') {
					tmp_args[0] = $.extend(o, {
						timeOnly: true
					});
				}

				return $(this).each(function() {
					$.fn.datetimepicker.apply($(this), tmp_args);
				});
			},

			/*
			* extend timepicker to datepicker
			*/
			datetimepicker: function(o) {
				o = o || {};
				var tmp_args = arguments;

				if (typeof(o) == 'string') {
					if (o == 'getDate') {
						return $.fn.datepicker.apply($(this[0]), tmp_args);
					} else {
						return this.each(function() {
							var $t = $(this);
							$t.datepicker.apply($t, tmp_args);
						});
					}
				} else {
					return this.each(function() {
						var $t = $(this);
						$t.datepicker($.timepicker._newInst($t, o)._defaults);
					});
				}
			}
		});

		/*
		* Public Utility to parse date and time
		*/
		$.datepicker.parseDateTime = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
			var parseRes = parseDateTimeInternal(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings);
			if (parseRes.timeObj) {
				var t = parseRes.timeObj;
				parseRes.date.setHours(t.hour, t.minute, t.second, t.millisec);
				parseRex.date.setMicroseconds(t.microsec);
			}

			return parseRes.date;
		};

		/*
		* Public utility to parse time
		*/
		$.datepicker.parseTime = function(timeFormat, timeString, options) {		
			var o = extendRemove(extendRemove({}, $.timepicker._defaults), options || {}),
				iso8601 = (timeFormat.replace(/\'.*?\'/g,'').indexOf('Z') !== -1);

			// Strict parse requires the timeString to match the timeFormat exactly
			var strictParse = function(f, s, o){

				// pattern for standard and localized AM/PM markers
				var getPatternAmpm = function(amNames, pmNames) {
					var markers = [];
					if (amNames) {
						$.merge(markers, amNames);
					}
					if (pmNames) {
						$.merge(markers, pmNames);
					}
					markers = $.map(markers, function(val) {
						return val.replace(/[.*+?|()\[\]{}\\]/g, '\\$&');
					});
					return '(' + markers.join('|') + ')?';
				};

				// figure out position of time elements.. cause js cant do named captures
				var getFormatPositions = function(timeFormat) {
					var finds = timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|c{1}|t{1,2}|z|'.*?')/g),
						orders = {
							h: -1,
							m: -1,
							s: -1,
							l: -1,
							c: -1,
							t: -1,
							z: -1
						};

					if (finds) {
						for (var i = 0; i < finds.length; i++) {
							if (orders[finds[i].toString().charAt(0)] == -1) {
								orders[finds[i].toString().charAt(0)] = i + 1;
							}
						}
					}
					return orders;
				};

				var regstr = '^' + f.toString()
						.replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g, function (match) {
								var ml = match.length;
								switch (match.charAt(0).toLowerCase()) {
									case 'h': return ml === 1? '(\\d?\\d)':'(\\d{'+ml+'})';
									case 'm': return ml === 1? '(\\d?\\d)':'(\\d{'+ml+'})';
									case 's': return ml === 1? '(\\d?\\d)':'(\\d{'+ml+'})';
									case 'l': return '(\\d?\\d?\\d)';
									case 'c': return '(\\d?\\d?\\d)';
									case 'z': return '(z|[-+]\\d\\d:?\\d\\d|\\S+)?';
									case 't': return getPatternAmpm(o.amNames, o.pmNames);
									default:    // literal escaped in quotes
										return '(' + match.replace(/\'/g, "").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g, function (m) { return "\\" + m; }) + ')?';
								}
							})
						.replace(/\s/g, '\\s?') +
						o.timeSuffix + '$',
					order = getFormatPositions(f),
					ampm = '',
					treg;

				treg = s.match(new RegExp(regstr, 'i'));

				var resTime = {
					hour: 0,
					minute: 0,
					second: 0,
					millisec: 0,
					microsec: 0
				};

				if (treg) {
					if (order.t !== -1) {
						if (treg[order.t] === undefined || treg[order.t].length === 0) {
							ampm = '';
							resTime.ampm = '';
						} else {
							ampm = $.inArray(treg[order.t].toUpperCase(), o.amNames) !== -1 ? 'AM' : 'PM';
							resTime.ampm = o[ampm == 'AM' ? 'amNames' : 'pmNames'][0];
						}
					}

					if (order.h !== -1) {
						if (ampm == 'AM' && treg[order.h] == '12') {
							resTime.hour = 0; // 12am = 0 hour
						} else {
							if (ampm == 'PM' && treg[order.h] != '12') {
								resTime.hour = parseInt(treg[order.h], 10) + 12; // 12pm = 12 hour, any other pm = hour + 12
							} else {
								resTime.hour = Number(treg[order.h]);
							}
						}
					}

					if (order.m !== -1) {
						resTime.minute = Number(treg[order.m]);
					}
					if (order.s !== -1) {
						resTime.second = Number(treg[order.s]);
					}
					if (order.l !== -1) {
						resTime.millisec = Number(treg[order.l]);
					}
					if (order.c !== -1) {
						resTime.microsec = Number(treg[order.c]);
					}
					if (order.z !== -1 && treg[order.z] !== undefined) {
						resTime.timezone = $.timepicker.timezoneOffsetNumber(treg[order.z]);
					}


					return resTime;
				}
				return false;
			};// end strictParse

			// First try JS Date, if that fails, use strictParse
			var looseParse = function(f,s,o){
				try{
					var d = new Date('2012-01-01 '+ s);
					if(isNaN(d.getTime())){
						d = new Date('2012-01-01T'+ s);
						if(isNaN(d.getTime())){
							d = new Date('01/01/2012 '+ s);
							if(isNaN(d.getTime())){
								throw "Unable to parse time with native Date: "+ s;
							}
						}
					}

					return {
						hour: d.getHours(),
						minute: d.getMinutes(),
						second: d.getSeconds(),
						millisec: d.getMilliseconds(),
						microsec: d.getMicroseconds(),
						timezone: d.getTimezoneOffset()*-1
					};
				}
				catch(err){
					try{
						return strictParse(f,s,o);
					}
					catch(err2){
						$.timepicker.log("Unable to parse \ntimeString: "+ s +"\ntimeFormat: "+ f);
					}				
				}
				return false;
			}; // end looseParse
			
			if(typeof o.parse === "function"){
				return o.parse(timeFormat, timeString, o);
			}
			if(o.parse === 'loose'){
				return looseParse(timeFormat, timeString, o);
			}
			return strictParse(timeFormat, timeString, o);
		};

		/*
		* Public utility to format the time
		* format = string format of the time
		* time = a {}, not a Date() for timezones
		* options = essentially the regional[].. amNames, pmNames, ampm
		*/
		$.datepicker.formatTime = function(format, time, options) {
			options = options || {};
			options = $.extend({}, $.timepicker._defaults, options);
			time = $.extend({
				hour: 0,
				minute: 0,
				second: 0,
				millisec: 0,
				timezone: 0
			}, time);

			var tmptime = format,
				ampmName = options.amNames[0],
				hour = parseInt(time.hour, 10);

			if (hour > 11) {
				ampmName = options.pmNames[0];
			}

			tmptime = tmptime.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|('.*?'|".*?"))/g, function(match) {
			switch (match) {
				case 'HH':
					return ('0' + hour).slice(-2);
				case 'H':
					return hour;
				case 'hh':
					return ('0' + convert24to12(hour)).slice(-2);
				case 'h':
					return convert24to12(hour);
				case 'mm':
					return ('0' + time.minute).slice(-2);
				case 'm':
					return time.minute;
				case 'ss':
					return ('0' + time.second).slice(-2);
				case 's':
					return time.second;
				case 'l':
					return ('00' + time.millisec).slice(-3);
				case 'c':
					return ('00' + time.microsec).slice(-3);
				case 'z':
					return $.timepicker.timezoneOffsetString(time.timezone === null? options.timezone : time.timezone, false);
				case 'Z':
					return $.timepicker.timezoneOffsetString(time.timezone === null? options.timezone : time.timezone, true);
				case 'T': 
					return ampmName.charAt(0).toUpperCase();
				case 'TT': 
					return ampmName.toUpperCase();
				case 't':
					return ampmName.charAt(0).toLowerCase();
				case 'tt':
					return ampmName.toLowerCase();
				default:
					return match.replace(/\'/g, "") || "'";
				}
			});

			tmptime = $.trim(tmptime);
			return tmptime;
		};

		/*
		* the bad hack :/ override datepicker so it doesnt close on select
		// inspired: http://stackoverflow.com/questions/1252512/jquery-datepicker-prevent-closing-picker-when-clicking-a-date/1762378#1762378
		*/
		$.datepicker._base_selectDate = $.datepicker._selectDate;
		$.datepicker._selectDate = function(id, dateStr) {
			var inst = this._getInst($(id)[0]),
				tp_inst = this._get(inst, 'timepicker');

			if (tp_inst) {
				tp_inst._limitMinMaxDateTime(inst, true);
				inst.inline = inst.stay_open = true;
				//This way the onSelect handler called from calendarpicker get the full dateTime
				this._base_selectDate(id, dateStr);
				inst.inline = inst.stay_open = false;
				this._notifyChange(inst);
				this._updateDatepicker(inst);
			} else {
				this._base_selectDate(id, dateStr);
			}
		};

		/*
		* second bad hack :/ override datepicker so it triggers an event when changing the input field
		* and does not redraw the datepicker on every selectDate event
		*/
		$.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker;
		$.datepicker._updateDatepicker = function(inst) {

			// don't popup the datepicker if there is another instance already opened
			var input = inst.input[0];
			if ($.datepicker._curInst && $.datepicker._curInst != inst && $.datepicker._datepickerShowing && $.datepicker._lastInput != input) {
				return;
			}

			if (typeof(inst.stay_open) !== 'boolean' || inst.stay_open === false) {

				this._base_updateDatepicker(inst);

				// Reload the time control when changing something in the input text field.
				var tp_inst = this._get(inst, 'timepicker');
				if (tp_inst) {
					tp_inst._addTimePicker(inst);
				}
			}
		};

		/*
		* third bad hack :/ override datepicker so it allows spaces and colon in the input field
		*/
		$.datepicker._base_doKeyPress = $.datepicker._doKeyPress;
		$.datepicker._doKeyPress = function(event) {
			var inst = $.datepicker._getInst(event.target),
				tp_inst = $.datepicker._get(inst, 'timepicker');

			if (tp_inst) {
				if ($.datepicker._get(inst, 'constrainInput')) {
					var ampm = tp_inst.support.ampm,
						tz = tp_inst._defaults.showTimezone !== null? tp_inst._defaults.showTimezone : tp_inst.support.timezone,					
						dateChars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat')),
						datetimeChars = tp_inst._defaults.timeFormat.toString()
												.replace(/[hms]/g, '')
												.replace(/TT/g, ampm ? 'APM' : '')
												.replace(/Tt/g, ampm ? 'AaPpMm' : '')
												.replace(/tT/g, ampm ? 'AaPpMm' : '')
												.replace(/T/g, ampm ? 'AP' : '')
												.replace(/tt/g, ampm ? 'apm' : '')
												.replace(/t/g, ampm ? 'ap' : '') + 
												" " + tp_inst._defaults.separator + 
												tp_inst._defaults.timeSuffix + 
												(tz ? tp_inst._defaults.timezoneList.join('') : '') + 
												(tp_inst._defaults.amNames.join('')) + (tp_inst._defaults.pmNames.join('')) + 
												dateChars,
						chr = String.fromCharCode(event.charCode === undefined ? event.keyCode : event.charCode);
					return event.ctrlKey || (chr < ' ' || !dateChars || datetimeChars.indexOf(chr) > -1);
				}
			}

			return $.datepicker._base_doKeyPress(event);
		};

		/*
		* Fourth bad hack :/ override _updateAlternate function used in inline mode to init altField
		*/
		$.datepicker._base_updateAlternate = $.datepicker._updateAlternate;
		/* Update any alternate field to synchronise with the main field. */
		$.datepicker._updateAlternate = function(inst) {
			var tp_inst = this._get(inst, 'timepicker');
			if(tp_inst){
				var altField = tp_inst._defaults.altField;
				if (altField) { // update alternate field too
					var altFormat = tp_inst._defaults.altFormat || tp_inst._defaults.dateFormat,
						date = this._getDate(inst),
						formatCfg = $.datepicker._getFormatConfig(inst),
						altFormattedDateTime = '', 
						altSeparator = tp_inst._defaults.altSeparator ? tp_inst._defaults.altSeparator : tp_inst._defaults.separator, 
						altTimeSuffix = tp_inst._defaults.altTimeSuffix ? tp_inst._defaults.altTimeSuffix : tp_inst._defaults.timeSuffix,
						altTimeFormat = tp_inst._defaults.altTimeFormat !== null ? tp_inst._defaults.altTimeFormat : tp_inst._defaults.timeFormat;
					
					altFormattedDateTime += $.datepicker.formatTime(altTimeFormat, tp_inst, tp_inst._defaults) + altTimeSuffix;
					if(!tp_inst._defaults.timeOnly && !tp_inst._defaults.altFieldTimeOnly && date !== null){
						if(tp_inst._defaults.altFormat){
							altFormattedDateTime = $.datepicker.formatDate(tp_inst._defaults.altFormat, date, formatCfg) + altSeparator + altFormattedDateTime;
						}
						else{
							altFormattedDateTime = tp_inst.formattedDate + altSeparator + altFormattedDateTime;
						}
					}
					$(altField).val(altFormattedDateTime);
				}
			}
			else{
				$.datepicker._base_updateAlternate(inst);
			}
		};

		/*
		* Override key up event to sync manual input changes.
		*/
		$.datepicker._base_doKeyUp = $.datepicker._doKeyUp;
		$.datepicker._doKeyUp = function(event) {
			var inst = $.datepicker._getInst(event.target),
				tp_inst = $.datepicker._get(inst, 'timepicker');

			if (tp_inst) {
				if (tp_inst._defaults.timeOnly && (inst.input.val() != inst.lastVal)) {
					try {
						$.datepicker._updateDatepicker(inst);
					} catch (err) {
						$.timepicker.log(err);
					}
				}
			}

			return $.datepicker._base_doKeyUp(event);
		};

		/*
		* override "Today" button to also grab the time.
		*/
		$.datepicker._base_gotoToday = $.datepicker._gotoToday;
		$.datepicker._gotoToday = function(id) {
			var inst = this._getInst($(id)[0]),
				$dp = inst.dpDiv;
			this._base_gotoToday(id);
			var tp_inst = this._get(inst, 'timepicker');
			selectLocalTimezone(tp_inst);
			var now = new Date();
			this._setTime(inst, now);
			$('.ui-datepicker-today', $dp).click();
		};

		/*
		* Disable & enable the Time in the datetimepicker
		*/
		$.datepicker._disableTimepickerDatepicker = function(target) {
			var inst = this._getInst(target);
			if (!inst) {
				return;
			}

			var tp_inst = this._get(inst, 'timepicker');
			$(target).datepicker('getDate'); // Init selected[Year|Month|Day]
			if (tp_inst) {
				tp_inst._defaults.showTimepicker = false;
				tp_inst._updateDateTime(inst);
			}
		};

		$.datepicker._enableTimepickerDatepicker = function(target) {
			var inst = this._getInst(target);
			if (!inst) {
				return;
			}

			var tp_inst = this._get(inst, 'timepicker');
			$(target).datepicker('getDate'); // Init selected[Year|Month|Day]
			if (tp_inst) {
				tp_inst._defaults.showTimepicker = true;
				tp_inst._addTimePicker(inst); // Could be disabled on page load
				tp_inst._updateDateTime(inst);
			}
		};

		/*
		* Create our own set time function
		*/
		$.datepicker._setTime = function(inst, date) {
			var tp_inst = this._get(inst, 'timepicker');
			if (tp_inst) {
				var defaults = tp_inst._defaults;

				// calling _setTime with no date sets time to defaults
				tp_inst.hour = date ? date.getHours() : defaults.hour;
				tp_inst.minute = date ? date.getMinutes() : defaults.minute;
				tp_inst.second = date ? date.getSeconds() : defaults.second;
				tp_inst.millisec = date ? date.getMilliseconds() : defaults.millisec;
				tp_inst.microsec = date ? date.getMicroseconds() : defaults.microsec;

				//check if within min/max times.. 
				tp_inst._limitMinMaxDateTime(inst, true);

				tp_inst._onTimeChange();
				tp_inst._updateDateTime(inst);
			}
		};

		/*
		* Create new public method to set only time, callable as $().datepicker('setTime', date)
		*/
		$.datepicker._setTimeDatepicker = function(target, date, withDate) {
			var inst = this._getInst(target);
			if (!inst) {
				return;
			}

			var tp_inst = this._get(inst, 'timepicker');

			if (tp_inst) {
				this._setDateFromField(inst);
				var tp_date;
				if (date) {
					if (typeof date == "string") {
						tp_inst._parseTime(date, withDate);
						tp_date = new Date();
						tp_date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec);
						tp_date.setMicroseconds(tp_inst.microsec);
					} else {
						tp_date = new Date(date.getTime());
					}
					if (tp_date.toString() == 'Invalid Date') {
						tp_date = undefined;
					}
					this._setTime(inst, tp_date);
				}
			}

		};

		/*
		* override setDate() to allow setting time too within Date object
		*/
		$.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker;
		$.datepicker._setDateDatepicker = function(target, date) {
			var inst = this._getInst(target);
			if (!inst) {
				return;
			}

			var tp_inst = this._get(inst, 'timepicker'),
				tp_date = (date instanceof Date) ? new Date(date.getTime()) : date;
			
			// This is important if you are using the timezone option, javascript's Date 
			// object will only return the timezone offset for the current locale, so we 
			// adjust it accordingly.  If not using timezone option this won't matter..
			// If a timezone is different in tp, keep the timezone as is
			if(tp_inst && tp_inst.timezone != null){
				date = $.timepicker.timezoneAdjust(date, tp_inst.timezone);
				tp_date = $.timepicker.timezoneAdjust(tp_date, tp_inst.timezone);
			}

			this._updateDatepicker(inst);
			this._base_setDateDatepicker.apply(this, arguments);
			this._setTimeDatepicker(target, tp_date, true);
		};

		/*
		* override getDate() to allow getting time too within Date object
		*/
		$.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker;
		$.datepicker._getDateDatepicker = function(target, noDefault) {
			var inst = this._getInst(target);
			if (!inst) {
				return;
			}

			var tp_inst = this._get(inst, 'timepicker');

			if (tp_inst) {
				// if it hasn't yet been defined, grab from field
				if(inst.lastVal === undefined){
					this._setDateFromField(inst, noDefault);
				}

				var date = this._getDate(inst);
				if (date && tp_inst._parseTime($(target).val(), tp_inst.timeOnly)) {
					date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec);
					date.setMicroseconds(tp_inst.microsec);

					// This is important if you are using the timezone option, javascript's Date 
					// object will only return the timezone offset for the current locale, so we 
					// adjust it accordingly.  If not using timezone option this won't matter..
					if(tp_inst.timezone != null){
						date = $.timepicker.timezoneAdjust(date, tp_inst.timezone);
					}
				}
				return date;
			}
			return this._base_getDateDatepicker(target, noDefault);
		};

		/*
		* override parseDate() because UI 1.8.14 throws an error about "Extra characters"
		* An option in datapicker to ignore extra format characters would be nicer.
		*/
		$.datepicker._base_parseDate = $.datepicker.parseDate;
		$.datepicker.parseDate = function(format, value, settings) {
			var date;
			try {
				date = this._base_parseDate(format, value, settings);
			} catch (err) {
				// Hack!  The error message ends with a colon, a space, and
				// the "extra" characters.  We rely on that instead of
				// attempting to perfectly reproduce the parsing algorithm.
				if (err.indexOf(":") >= 0) {
					date = this._base_parseDate(format, value.substring(0,value.length-(err.length-err.indexOf(':')-2)), settings);
					$.timepicker.log("Error parsing the date string: " + err + "\ndate string = " + value + "\ndate format = " + format);
				} else {
					throw err;
				}
			}
			return date;
		};

		/*
		* override formatDate to set date with time to the input
		*/
		$.datepicker._base_formatDate = $.datepicker._formatDate;
		$.datepicker._formatDate = function(inst, day, month, year) {
			var tp_inst = this._get(inst, 'timepicker');
			if (tp_inst) {
				tp_inst._updateDateTime(inst);
				return tp_inst.$input.val();
			}
			return this._base_formatDate(inst);
		};

		/*
		* override options setter to add time to maxDate(Time) and minDate(Time). MaxDate
		*/
		$.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker;
		$.datepicker._optionDatepicker = function(target, name, value) {
			var inst = this._getInst(target),
		        name_clone;
			if (!inst) {
				return null;
			}

			var tp_inst = this._get(inst, 'timepicker');
			if (tp_inst) {
				var min = null,
					max = null,
					onselect = null,
					overrides = tp_inst._defaults.evnts,
					fns = {},
					prop;
			    if (typeof name == 'string') { // if min/max was set with the string
			        if (name === 'minDate' || name === 'minDateTime') {
			            min = value;
			        } else if (name === 'maxDate' || name === 'maxDateTime') {
			            max = value;
			        } else if (name === 'onSelect') {
			            onselect = value;
			        } else if (overrides.hasOwnProperty(name)) {
			            if (typeof (value) === 'undefined') {
			                return overrides[name];
			            }
			            fns[name] = value;
			            name_clone = {}; //empty results in exiting function after overrides updated
			        }
			    } else if (typeof name == 'object') { //if min/max was set with the JSON
			        if (name.minDate) {
			            min = name.minDate;
			        } else if (name.minDateTime) {
			            min = name.minDateTime;
			        } else if (name.maxDate) {
			            max = name.maxDate;
			        } else if (name.maxDateTime) {
			            max = name.maxDateTime;
			        }
			        for (prop in overrides) {
			            if (overrides.hasOwnProperty(prop) && name[prop]) {
			                fns[prop] = name[prop];
			            }
			        }
			    }
			    for (prop in fns) {
			        if (fns.hasOwnProperty(prop)) {
			            overrides[prop] = fns[prop];
			            if (!name_clone) { name_clone = $.extend({}, name);}
			            delete name_clone[prop];
			        }
			    }
			    if (name_clone && isEmptyObject(name_clone)) { return; }
			    if (min) { //if min was set
			        if (min === 0) {
			            min = new Date();
			        } else {
			            min = new Date(min);
			        }
			        tp_inst._defaults.minDate = min;
			        tp_inst._defaults.minDateTime = min;
			    } else if (max) { //if max was set
			        if (max === 0) {
			            max = new Date();
			        } else {
			            max = new Date(max);
			        }
			        tp_inst._defaults.maxDate = max;
			        tp_inst._defaults.maxDateTime = max;
			    } else if (onselect) {
			        tp_inst._defaults.onSelect = onselect;
			    }
			}
			if (value === undefined) {
				return this._base_optionDatepicker.call($.datepicker, target, name);
			}
			return this._base_optionDatepicker.call($.datepicker, target, name_clone || name, value);
		};
		
		/*
		* jQuery isEmptyObject does not check hasOwnProperty - if someone has added to the object prototype,
		* it will return false for all objects
		*/
		var isEmptyObject = function(obj) {
			var prop;
			for (prop in obj) {
				if (obj.hasOwnProperty(obj)) {
					return false;
				}
			}
			return true;
		};

		/*
		* jQuery extend now ignores nulls!
		*/
		var extendRemove = function(target, props) {
			$.extend(target, props);
			for (var name in props) {
				if (props[name] === null || props[name] === undefined) {
					target[name] = props[name];
				}
			}
			return target;
		};

		/*
		* Determine by the time format which units are supported
		* Returns an object of booleans for each unit
		*/
		var detectSupport = function(timeFormat){
			var tf = timeFormat.replace(/\'.*?\'/g,'').toLowerCase(), // removes literals
				isIn = function(f, t){ // does the format contain the token?
						return f.indexOf(t) !== -1? true:false; 
					};
			return {
					hour: isIn(tf,'h'),
					minute: isIn(tf,'m'),
					second: isIn(tf,'s'),
					millisec: isIn(tf,'l'),
					microsec: isIn(tf,'c'),
					timezone: isIn(tf,'z'),
					ampm: isIn('t') && isIn(timeFormat,'h'),
					iso8601: isIn(timeFormat, 'Z')
				};
		};

		/*
		* Converts 24 hour format into 12 hour
		* Returns 12 hour without leading 0
		*/
		var convert24to12 = function(hour) {
			if (hour > 12) {
				hour = hour - 12;
			}

			if (hour === 0) {
				hour = 12;
			}

			return String(hour);
		};

		/*
		* Splits datetime string into date ans time substrings.
		* Throws exception when date can't be parsed
		* Returns [dateString, timeString]
		*/
		var splitDateTime = function(dateFormat, dateTimeString, dateSettings, timeSettings) {
			try {
				// The idea is to get the number separator occurances in datetime and the time format requested (since time has 
				// fewer unknowns, mostly numbers and am/pm). We will use the time pattern to split.
				var separator = timeSettings && timeSettings.separator ? timeSettings.separator : $.timepicker._defaults.separator,
					format = timeSettings && timeSettings.timeFormat ? timeSettings.timeFormat : $.timepicker._defaults.timeFormat,
					timeParts = format.split(separator), // how many occurances of separator may be in our format?
					timePartsLen = timeParts.length,
					allParts = dateTimeString.split(separator),
					allPartsLen = allParts.length;

				if (allPartsLen > 1) {
					return [
							allParts.splice(0,allPartsLen-timePartsLen).join(separator),
							allParts.splice(0,timePartsLen).join(separator)
						];
				}

			} catch (err) {
				$.timepicker.log('Could not split the date from the time. Please check the following datetimepicker options' +
						"\nthrown error: " + err +
						"\ndateTimeString" + dateTimeString +
						"\ndateFormat = " + dateFormat +
						"\nseparator = " + timeSettings.separator +
						"\ntimeFormat = " + timeSettings.timeFormat);

				if (err.indexOf(":") >= 0) {
					// Hack!  The error message ends with a colon, a space, and
					// the "extra" characters.  We rely on that instead of
					// attempting to perfectly reproduce the parsing algorithm.
					var dateStringLength = dateTimeString.length - (err.length - err.indexOf(':') - 2),
						timeString = dateTimeString.substring(dateStringLength);

					return [$.trim(dateTimeString.substring(0, dateStringLength)), $.trim(dateTimeString.substring(dateStringLength))];

				} else {
					throw err;
				}
			}
			return [dateTimeString, ''];
		};

		/*
		* Internal function to parse datetime interval
		* Returns: {date: Date, timeObj: Object}, where
		*   date - parsed date without time (type Date)
		*   timeObj = {hour: , minute: , second: , millisec: , microsec: } - parsed time. Optional
		*/
		var parseDateTimeInternal = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
			var date;
			var splitRes = splitDateTime(dateFormat, dateTimeString, dateSettings, timeSettings);
			date = $.datepicker._base_parseDate(dateFormat, splitRes[0], dateSettings);
			if (splitRes[1] !== '') {
				var timeString = splitRes[1],
					parsedTime = $.datepicker.parseTime(timeFormat, timeString, timeSettings);

				if (parsedTime === null) {
					throw 'Wrong time format';
				}
				return {
					date: date,
					timeObj: parsedTime
				};
			} else {
				return {
					date: date
				};
			}
		};

		/*
		* Internal function to set timezone_select to the local timezone
		*/
		var selectLocalTimezone = function(tp_inst, date) {
			if (tp_inst && tp_inst.timezone_select) {
				var now = typeof date !== 'undefined' ? date : new Date();
				tp_inst.timezone_select.val(now.getTimezoneOffset()*-1);
			}
		};

		/*
		* Create a Singleton Insance
		*/
		$.timepicker = new Timepicker();

		/**
		 * Get the timezone offset as string from a date object (eg '+0530' for UTC+5.5)
		 * @param  number if not a number this value is returned
		 * @param boolean if true formats in accordance to iso8601 "+12:45"
		 * @return string
		 */
		$.timepicker.timezoneOffsetString = function(tzMinutes, iso8601) {
			if(isNaN(tzMinutes) || tzMinutes > 840){
				return tzMinutes;
			}

			var off = tzMinutes,
				minutes = off % 60,
				hours = (off - minutes) / 60,
				iso = iso8601? ':':'',
				tz = (off >= 0 ? '+' : '-') + ('0' + (hours * 101).toString()).slice(-2) + iso + ('0' + (minutes * 101).toString()).slice(-2);
			
			if(tz == '+00:00'){
				return 'Z';
			}
			return tz;
		};

		/**
		 * Get the number in minutes that represents a timezone string
		 * @param  string formated like "+0500", "-1245"
		 * @return number
		 */
		$.timepicker.timezoneOffsetNumber = function(tzString) {
			tzString = tzString.toString().replace(':',''); // excuse any iso8601, end up with "+1245"

			if(tzString.toUpperCase() === 'Z'){ // if iso8601 with Z, its 0 minute offset
				return 0;
			}

			if(!/^(\-|\+)\d{4}$/.test(tzString)){ // possibly a user defined tz, so just give it back
				return tzString;
			}

			return ((tzString.substr(0,1) =='-'? -1 : 1) * // plus or minus
						((parseInt(tzString.substr(1,2),10)*60) + // hours (converted to minutes)
						parseInt(tzString.substr(3,2),10))); // minutes
		};

		/**
		 * No way to set timezone in js Date, so we must adjust the minutes to compensate. (think setDate, getDate)
		 * @param  date
		 * @param  string formated like "+0500", "-1245"
		 * @return date
		 */
		$.timepicker.timezoneAdjust = function(date, toTimezone) {
			var toTz = $.timepicker.timezoneOffsetNumber(toTimezone);
			if(!isNaN(toTz)){
				var currTz = date.getTimezoneOffset()*-1,
					diff = currTz - toTz; // difference in minutes

				date.setMinutes(date.getMinutes()+diff);
			}
			return date;
		};

		/**
		 * Calls `timepicker()` on the `startTime` and `endTime` elements, and configures them to
		 * enforce date range limits.
		 * n.b. The input value must be correctly formatted (reformatting is not supported)
		 * @param  Element startTime
		 * @param  Element endTime
		 * @param  obj options Options for the timepicker() call
		 * @return jQuery
		 */
		$.timepicker.timeRange = function(startTime, endTime, options) {
			return $.timepicker.handleRange('timepicker', startTime, endTime, options);
		};

		/**
		 * Calls `datetimepicker` on the `startTime` and `endTime` elements, and configures them to
		 * enforce date range limits.
		 * @param  Element startTime
		 * @param  Element endTime
		 * @param  obj options Options for the `timepicker()` call. Also supports `reformat`,
		 *   a boolean value that can be used to reformat the input values to the `dateFormat`.
		 * @param  string method Can be used to specify the type of picker to be added
		 * @return jQuery
		 */
		$.timepicker.datetimeRange = function(startTime, endTime, options) {
			$.timepicker.handleRange('datetimepicker', startTime, endTime, options);
		};

		/**
		 * Calls `method` on the `startTime` and `endTime` elements, and configures them to
		 * enforce date range limits.
		 * @param  Element startTime
		 * @param  Element endTime
		 * @param  obj options Options for the `timepicker()` call. Also supports `reformat`,
		 *   a boolean value that can be used to reformat the input values to the `dateFormat`.
		 * @return jQuery
		 */
		$.timepicker.dateRange = function(startTime, endTime, options) {
			$.timepicker.handleRange('datepicker', startTime, endTime, options);
		};

		/**
		 * Calls `method` on the `startTime` and `endTime` elements, and configures them to
		 * enforce date range limits.
		 * @param  string method Can be used to specify the type of picker to be added
		 * @param  Element startTime
		 * @param  Element endTime
		 * @param  obj options Options for the `timepicker()` call. Also supports `reformat`,
		 *   a boolean value that can be used to reformat the input values to the `dateFormat`.
		 * @return jQuery
		 */
		$.timepicker.handleRange = function(method, startTime, endTime, options) {
			options = $.extend({}, {
				minInterval: 0, // min allowed interval in milliseconds
				maxInterval: 0, // max allowed interval in milliseconds
				start: {},      // options for start picker
				end: {}         // options for end picker
			}, options);

			$.fn[method].call(startTime, $.extend({
				onClose: function(dateText, inst) {
					checkDates($(this), endTime);
				},
				onSelect: function(selectedDateTime) {
					selected($(this), endTime, 'minDate');
				}
			}, options, options.start));
			$.fn[method].call(endTime, $.extend({
				onClose: function(dateText, inst) {
					checkDates($(this), startTime);
				},
				onSelect: function(selectedDateTime) {
					selected($(this), startTime, 'maxDate');
				}
			}, options, options.end));

			checkDates(startTime, endTime);
			selected(startTime, endTime, 'minDate');
			selected(endTime, startTime, 'maxDate');

			function checkDates(changed, other) {
				var startdt = startTime[method]('getDate'),
					enddt = endTime[method]('getDate'),
					changeddt = changed[method]('getDate');

				if(startdt !== null){
					var minDate = new Date(startdt.getTime()),
						maxDate = new Date(startdt.getTime());

					minDate.setMilliseconds(minDate.getMilliseconds() + options.minInterval);
					maxDate.setMilliseconds(maxDate.getMilliseconds() + options.maxInterval);

					if(options.minInterval > 0 && minDate > enddt){ // minInterval check
						endTime[method]('setDate',minDate);
					}
					else if(options.maxInterval > 0 && maxDate < enddt){ // max interval check
						endTime[method]('setDate',maxDate);
					}
					else if (startdt > enddt) {
						other[method]('setDate',changeddt);
					}
				}
			}

			function selected(changed, other, option) {
				if (!changed.val()) {
					return;
				}
				var date = changed[method].call(changed, 'getDate');
				if(date !== null && options.minInterval > 0){
					if(option == 'minDate'){
						date.setMilliseconds(date.getMilliseconds() + options.minInterval); 
					}
					if(option == 'maxDate'){
						date.setMilliseconds(date.getMilliseconds() - options.minInterval);
					}
				}
				if (date.getTime) {
					other[method].call(other, 'option', option, date);
				}
			}
			return $([startTime.get(0), endTime.get(0)]);
		};

		/**
		 * Log error or data to the console during error or debugging
		 * @param  Object err pass any type object to log to the console during error or debugging
		 * @return void
		 */
		$.timepicker.log = function(err){
			if(window.console){
				console.log(err);
			}
		};

		/*
		* Rough microsecond support
		*/
		if(!Date.prototype.getMicroseconds){
			Date.microseconds = 0;
			Date.prototype.getMicroseconds = function(){ return this.microseconds; };
			Date.prototype.setMicroseconds = function(m){ this.microseconds = m; return this; };
		}

		/*
		* Keep up with the version
		*/
		$.timepicker.version = "1.3";

	})(jQuery);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		var controllers = __webpack_require__(39) ;
		var jsonDate = __webpack_require__(24) ;
		var EditUtil = __webpack_require__(40) ;
		var commonUtil = __webpack_require__(23) ;
		var util = __webpack_require__(17) ;
		var ModalHelper = __webpack_require__(43) ;
		
		
		function cleanTipInfo() {
			$("#abortTipInfo").html("") ;
		} ;
		
		function addErrorTip(errMsg){
			$("#abortTipInfo").append("<li><span class ='marginRight15'></span><span class =\"modal-errorTip\">"+errMsg+"</span></li>") ;
		} ;
		
		function addSuccessTip(sucMsg){
			$("#abortTipInfo").append("<li><span class ='marginRight15'></span><span class =\"modal-successTip\">"+sucMsg+"</span></li>") ;
		} ;
		
		
		
		//最外层controller
		controllers.controller('EditController',['$scope','FormData','HttpOperService','TbShowHideServcie','FormEditStatusServcie','FormStatusService','CustomeEditTbStatusServcie','$timeout',function($scope,FormData,HttpOperService,TbShowHideServcie,FormEditStatusServcie,FormStatusService,CustomeEditTbStatusServcie,$timeout){
			$scope.contextPath = FormData.contextPath ;
			//保留一份原始数据，方便数据初始化时使用
			$scope.orgData = angular.copy(FormData) ;
			//页面上的form数据
			$scope.data = FormData ;
			//页面上所有表格的显示或隐藏的的状态数据
			$scope.tableStatus = TbShowHideServcie ;//TableStatusServcie
			//表格复用的自定义是否显示
			$scope.customeEditTbStatus = CustomeEditTbStatusServcie ;
			//对表单注册校验
			var validator = $("#s7_form").validate({meta : ""});
			window.validator = validator ;
			
			//页面上所有控件的状态数据
			$scope.editStatus = FormEditStatusServcie ;
			$scope.showStatus = FormStatusService ;
			var s7Id = $("#s7Id").val() ;
			$scope.data.id = s7Id ;
			//日期问题
			var currDate = new Date();
			var curMonthStr = commonUtil.getFullDayOrMonthStr(currDate.getMonth()+1)  ;
			var curDateStr = commonUtil.getFullDayOrMonthStr(currDate.getDate()) ;
			var nextDateStr= commonUtil.getFullDayOrMonthStr(currDate.getDate() +1) ;
			//当前日期
			$scope.currentDateStr = currDate.getFullYear() +'-'+curMonthStr+ '-'+curDateStr;
			//下一天日期
			$scope.nextDateStr = currDate.getFullYear() +'-'+curMonthStr+ '-'+nextDateStr ;
			//所有的表格定义信息都在这里
			$scope.tableData = jsonDate.tableData ;
			//-------------区域对应的表格显示隐藏开始--------//
			//第一次进入页面时需要加载的数据
			//console.info('准备初始化页面数据..........') ;
			var url = '';
			var promise = null;
			if(FormData.action=="add"){//1.新增
				url = $scope.contextPath+'/initPage4Add';
				promise = HttpOperService.getDataByUrl(url) ;
				EditUtil.initData.dealResultData4Add(promise,$scope) ;
			}else if (FormData.action=="update"){
				url = $scope.contextPath+'/initPage4Upate?s7Id='+$scope.data.id;
				promise = HttpOperService.getDataByUrl(url) ;
				EditUtil.initData.dealResult4Update(promise,$scope) ;
			}else if (FormData.action=="copy"){
				url = $scope.contextPath+'/initPage4Copy?s7Id='+$scope.data.id;
				promise = HttpOperService.getDataByUrl(url) ;
				//EditUtil.initData.dealResult4Update(promise,$scope) ;
				EditUtil.initData.dealResult4Copy(promise,$scope) ;
			}
			//console.info('页面部分数据其他处理.......') ;
			
			
			
			$scope.submitTbTSKCustomeEdit = function(){
				var tipDivId = "tskCustomeTipInfo" ;
				var modalHelper = new ModalHelper(tipDivId) ;
				//tbTSKCustomeEdit_type//tbTSKCustomeEdit_index//tbTSKCustomeEdit_value
				var tbTSKCustomeEdit_type = $("#tbTSKCustomeEdit_type").val() ;
				var tbTSKCustomeEdit_index = $("#tbTSKCustomeEdit_index").val() ;
				var tbTSKCustomeEdit_value = $("#tbTSKCustomeEdit_value").val() ;
				var maxLength = $("#tbTSKCustomeEdit_value").attr("maxlength") ;
				var len = util.getByteNumOfStr(tbTSKCustomeEdit_value) ;
				modalHelper.cleanTipInfo() ;
				if(len>maxLength){
					modalHelper.addErrorTip('最多输入'+maxLength+'个字节!') ;
					return ;
				}else{
					$scope.data.listTsk202VO[tbTSKCustomeEdit_index*1][tbTSKCustomeEdit_type] = tbTSKCustomeEdit_value ;
					$('#tbTSK202Modal').modal('hide') ;
				}
			}
			
			
	    }]) ;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		
		var controllers = angular.module("app.controllers",[]) ;
		return controllers ;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		var validateHelper = __webpack_require__(41) ;
		var util = __webpack_require__(42) ;
		var jsonDate = __webpack_require__(24) ;
		var jsonDataHelper = __webpack_require__(22) ;
		var _  = __webpack_require__(21) ;
		/**
		 * 处理表单特殊数据
		 * @param {Object} formData
		 */
		var initOtherData = function (formData){
			//处理旅行起始日期
			if(formData.firstTravelYear!=''&&formData.firstTravelMonth!=''&&formData.firstTravelDay!=''){
				formData.travelStartDate = formData.firstTravelYear+'-' +formData.firstTravelMonth +'-' +formData.firstTravelDay ;
			}
			//处理旅行结束日期
			if(formData.lastTravelYear!=''&&formData.lastTravelMonth!=''&&formData.lastTravelDay!=''){
				formData.travelEndDate = formData.lastTravelYear+'-' +formData.lastTravelMonth +'-' +formData.lastTravelDay ;
			}
			//星期
			var dayofWake = formData.dayOfWeek ;
			var len = dayofWake.length ;
			for(var i = 0 ; i < len ; i++){
				 var s = dayofWake.charAt(i);
				 var tmpStr = 'w'+s ;
				 formData.dayOfWeekShow[tmpStr] = true ;//选中checkbox
			}
			//处理页面上的复用字表号的placeholder显示字符串
			//
			$(":input[name=reuseList172VO]").attr("placeholder",formData['accountCodeTableNo172']) ;
			$(":input[name=reuseList173TicketVO]").attr("placeholder",formData['ticketDesignatorTableNo173']) ;
			$(":input[name=reuseList183VO]").attr("placeholder",formData['securityTableNo183']) ;
			$(":input[name=reuseList198VO]").attr("placeholder",formData['rbdTableNo198']) ;
			$(":input[name=reuseList198UpgradeVO]").attr("placeholder",formData['upgradeToRbdTableNo198']) ;
			$(":input[name=reuseList171VO]").attr("placeholder",formData['cxrResFareTableNo171']) ;
			$(":input[name=reuseList173TktVO]").attr("placeholder",formData['tktDesignatorTableNo173']) ;
			$(":input[name=reuseList186VO]").attr("placeholder",formData['carrierFlightTableNo186']) ;
			$(":input[name=reuseList170VO]").attr("placeholder",formData['serviceFeeCurTableNo170']) ;
			$(":input[name=reuseList196VO]").attr("placeholder",formData['textTableNo196']) ;
			$(":input[name=reuseList165VO]").attr("placeholder",formData['equipmentTypeTableNo165']) ;
			$(":input[name=reuseList178Loc1]").attr("placeholder",formData['list178Loc1Id']) ;
			$(":input[name=reuseList178Loc2]").attr("placeholder",formData['list178Loc2Id']) ;
			$(":input[name=reuseList178Loc3]").attr("placeholder",formData['list178Loc3Id']) ;
			//201暂时不支持$(":input[name=reuseList201VO]").attr("placeholder",formData['list201VO']) ;
			$(":input[name=reuseListTsk202VO]").attr("placeholder",formData['flightPassTableTsk202']) ;
			
		};
		
		/**
		 * @功能描述:处理表格被引用次数数据
		 * @param referenceMap 被引用的次数map数据
		 * @param editStatus 页面全局的编辑属性
		 * @param customeEditTbStatus 自定义表格显示状态
		 */
		var initCustomeEditTbData = function(editStatus,customeEditTbStatus,formData){
			var referenceMap = formData['subTbReferenceCountMap'] ;
			var keys = _.keys(referenceMap);
			_.each(keys,function(key){
				var tmp = referenceMap[key] || '0';
				var count = tmp*1 ;
				if(count>1){
					editStatus[key] = false;
					customeEditTbStatus[key] = true ;
				}
			}) ;
		}


		//这是一个私有的辅助方法
		var initTbData = function (list,flagData,tbname){
			if(list.length>0){
				flagData[tbname] = true ;
			}else{
				flagData[tbname] = false ;
			}
		};

		var initListData = function (s7VO,flagData){
			if(s7VO.list170VO.length>0){//170表格
				initTbData(s7VO.list170VO,flagData ,'list170VO') ;
			}
			if(s7VO.list201VO.length>0){//201表格
				initTbData(s7VO.list201VO,flagData,'list170VO') ;//----11
			}
			//198
			initTbData(s7VO.list198VO,flagData,'list198VO') ;//----9
			//198_2
			initTbData(s7VO.list198UpgradeVO,flagData,'list198UpgradeVO') ;//----10
			//list183VO
			initTbData(s7VO.list183VO,flagData,'list183VO') ;  //-----1
			//list186VO
			initTbData(s7VO.list186VO,flagData,'list186VO') ; //-----7
			//geo1 //list178Loc1
			initTbData(s7VO.list178Loc1,flagData,'list178Loc1') ;//--12
			//geo2 //list178Loc2
			initTbData(s7VO.list178Loc2,flagData,'list178Loc2') ;//---13
			//geo3 //list178Loc3
			initTbData(s7VO.list178Loc3,flagData ,'list178Loc3') ;//----14
			//196//备注例外行李
			initTbData(s7VO.list196VO,flagData ,'list196VO') ; //----8
			//165机型
			initTbData(s7VO.list165VO,flagData,'list165VO') ;//------6
			//171
			initTbData(s7VO.list171VO,flagData,'list171VO') ; //-----2
			initTbData(s7VO.list172VO,flagData,'list172VO') ; //-----3
			initTbData(s7VO.list173TicketVO,flagData,'list173TicketVO') ;//------4
			initTbData(s7VO.list173TktVO,flagData,'list173TktVO') ;//-----5
			
			//增加tsk202子表
			initTbData(s7VO.listTsk202VO,flagData,'listTsk202VO') ;//-----5
			
			
		};

		/**
		 * 这个方法只能为更新数据时，页面初始化时调用，相当于将页面上的，联动控件触发一下联动检查
		 */
		var init4Validate = function(editScope,data,globalEditStatus){/**这里需要重置数据的原因是因为有些value会影响到别的控件的显示*/
			var statusDes = data.statusDes ;
			//当状态为3的时候，页面不可编辑
			if(statusDes=='3'){
				for(var cname in globalEditStatus){
					globalEditStatus[cname] = false;
				}
			}
			validateHelper.changeServiceType(editScope,data,globalEditStatus) ;
			validateHelper.changeNoChargeNotAvailable(editScope,data,globalEditStatus) ;
			validateHelper.changeSpecifiedServiceFeeApp(editScope,data,globalEditStatus) ;
			//区域/部分/全程变化
			validateHelper.changeGeoSpecSectPortJourney(editScope,data,globalEditStatus) ;
			//折扣变化
			validateHelper.changeDiscount(editScope.$parent,data,globalEditStatus) ;
		};

		//填充页面上的select的初始数据//因为这些数据需要从数据库中查询
		var initScopeSelectList = function  (editScope,returnData) {
			editScope.serviceGroupList = returnData.serviceGroupList ;
			editScope.passengerTypeCodeList = returnData.passengerList ;
			editScope.frequentFlyerStatusList = returnData.ffpList ;
			var equipmentList = returnData.equipmentList ;
			//向返回来的数组中添加一个空的选择option
			equipmentList.splice(0,0,{"description":"选择","code":""}) ;
			editScope.equipmentList = equipmentList ;
			//提前购票时间单位
			editScope.advancedPurchasePeriodList = jsonDate.advancedPurchasePeriodList ;
			//延长类型
			//editScope.effectivePeriodTypeList = jsonDate.effectivePeriodTypeList ;
			editScope.effectivePeriodTypeList = {
					list:jsonDataHelper.getEffectivePeriodTypeList(editScope.data.basicInfoVo.subGroup) 
			}
			//延长时间单位
			editScope.effectivePeriodUnitList = jsonDate.effectivePeriodUnitList ;
			//免费/收费
			editScope.noChargeNotAvailableList = {
				list:jsonDataHelper.getNoChargeNotAvailableList(editScope.data.serviceType) 
			} ;
			//适用于
			editScope.specifiedServiceFeeAppList = {
				list:jsonDataHelper.getSpecifiedServiceFeeAppList(editScope.data.serviceType)
			} ;
			//区域/部分/全程
			editScope.geoSpecSectPortJourneyList={
				list:jsonDataHelper.getgeoSpecSectPortJourneyList(editScope.data.serviceType) 
			}
		};

		//处理edit页面上添加时的后数据处理
		var dealResultData4Add = function  (promise,editScope) {
			promise.then(function(returnData) {  // 调用承诺API获取数据 .resolve  
				//初始化数据、测试新增的时候才有意义，上线时此行代码没有意义
				initListData(editScope.data,editScope.tableStatus) ;
				//这段初始化数据方法要放在下面，因为内部从scope中取serviceType
				//不过在添加方法中无所谓了，修改方法中一定要放在下面
				initScopeSelectList(editScope, returnData) ;
		    }, function(error) {  // 处理错误 .reject  
		        console.error('初始化页面数据出错!'+error) ;
		    }); 
		} ;
		//处理edit页面上更新时的后数据处理
		var dealResult4Update = function (promise,editScope) {
			promise.then(function(returnData) {  // 调用承诺API获取数据 .resolve  
				//s7record的信息
				util.convertS7ToFormData(returnData.s7VO,editScope.data) ;//将查询的s7数据填充到formData中
				initListData(returnData.s7VO,editScope.tableStatus) ;
				//其他特殊数据处理
				initOtherData(editScope.data) ;
				//list163
				editScope.data.sel4 = returnData.list163 ;
				//这段初始化数据方法要放在下面，因为内部从scope中取serviceType
				//但是必须要放在验证之前，因为验证的时候需要对特殊的字段进行处理
				//这段代码一定要放在init4Validate()前面
				initScopeSelectList(editScope, returnData) ;
				//初始化校验页面数据
				init4Validate(editScope,editScope.data,editScope.editStatus) ;
				//处理表格被引用次数数据
				initCustomeEditTbData(editScope.editStatus,editScope.customeEditTbStatus,editScope.data)
		    }, function(error) {  // 处理错误 .reject  
		        console.error('初始化页面数据出错!' + error) ;
		    }); 

		};


		var dealResult4Copy = function  (promise,editScope) {
			promise.then(function(returnData) {  // 调用承诺API获取数据 .resolve  
				//s7record的信息
				util.convertS7ToFormData(returnData.s7VO,editScope.data) ;//将查询的s7数据填充到formData中
				initListData(returnData.s7VO,editScope.tableStatus) ;
				//其他特殊数据处理
				initOtherData(editScope.data) ;
				//list163
				editScope.data.sel4 = returnData.list163 ;
				//这段初始化数据方法要放在下面，因为内部从scope中取serviceType
				//这段代码一定要放在init4Validate()前面
				initScopeSelectList(editScope, returnData) ;
				//初始化校验页面数据
				init4Validate(editScope,editScope.data,editScope.editStatus) ;
				//前面部分与复制一样，但是要清空id
				editScope.data.id ="" ;
		    }, function(error) {  // 处理错误 .reject  
		        console.error('初始化页面数据出错!' + error) ;
		    }); 
		} ;



		//这边是要返回的方法的集合处
		var EditUtil = {
			initData:{/*初始化*/		
				dealResultData4Add:dealResultData4Add,
				dealResult4Update:dealResult4Update,
				dealResult4Copy:dealResult4Copy
			}

		} ;	

		return EditUtil ;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		var commonUtil = __webpack_require__(23) ;
		var _ = __webpack_require__(21) ;
		var jsonDataHelper = __webpack_require__(22) ;
		
		//js文件内部私有的工具类
		var _privateInnerUtil = {} ;
		_privateInnerUtil.checkIsPageClickFlag = function(isChangeSelectFlag){
		   //是否是页面点击触发的flag
			var pageClickFlag = true ;
			var tmpFlagStr = isChangeSelectFlag +"" ;
			if(tmpFlagStr=='false'){
			   pageClickFlag = false;
			}
			return pageClickFlag;
		}

		//所有置为可能为’可编辑‘的状态时都要判断status是否为3
		var setEditableByStatus = function(globalEditStatus,name,statusDes){
			var flag = commonUtil.getEditFlagByStatus(statusDes) ;
			globalEditStatus[name] = flag;
		};


		var NOTICE_TYPE_SINGLE = "singleChangeByFlagNotice" ;
		var NOTICE_TYPE_SERVICETYPE = "serviceTypeChangeNotice" ;



		var sendNotice2ForceDirctive4ServiceType = function  (scope,needDigest) {
			scope.$broadcast(NOTICE_TYPE_SERVICETYPE,needDigest+"") ;//scope.$broadcast('serviceTypeChangeNotice') ;
		};

		var sendNoticeToForceDirctive4Single = function(scope,needDigest,noticeName,showFlag){
			scope.$broadcast(NOTICE_TYPE_SINGLE,noticeName,showFlag+"",needDigest+"") ;//适用于
		};

		var sendNoticeToForceDirctive4SingleArr = function(scope,needDigest,noticeNameFlagList){
			var len = noticeNameFlagList.length ;
			for(var i = 0 ; i< len ; i++){
				var obj = noticeNameFlagList[i] ;
				var noticeName = obj.name ;
				var showFlag = obj.flag ;
				scope.$broadcast(NOTICE_TYPE_SINGLE,noticeName,showFlag+"",needDigest+"") ;//适用于
			}
		};

		/**
		 * 功能描述:'或/和'控件 更新
		 * @param editScope 页面上最外层的scope
		 * @param data      表单FormData服务
		 * @param globalEditStatus  页面是否可编辑的服务
		 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
		 */
		var updateSpecSevFeeAndOrIndicator = function (editScope,data,globalEditStatus) {
			//是否是页面点击触发的flag
			//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
			var statusDes = data.statusDes;
			var serviceType = data.serviceType ;
			var noChargeNotAvailable = data.noChargeNotAvailable ;
			//全额或折扣(全额:1,折扣:0)
			var discountOrNot = data.discountOrNot ;
			var specifiedServiceFeeApp = data.specifiedServiceFeeApp ;//适用于
			
			//start**********这部分是为了处理可能存在的历史数据问题进行的特殊置空处理
			if(_.contains(['H','C','P'],specifiedServiceFeeApp)){
				data.specSevFeeAndOrIndicator = '' ;
			}
			//end**********上面的这段特殊置空处理一定要注意(是为了update页面时，如果‘适用于’为‘H/C/P’则强制将‘里程费’和‘或/和’字段置为空)
			
			//serviceType 对'或/和'的影响
			//当服务类型为A、B、E时或/和一定为‘或’ 
			//当适用于为'H/C/P'时
			//2.判断是否可编辑
			if(_.contains(['A','B','E'], serviceType)||noChargeNotAvailable!=''||discountOrNot=='0'||_.contains(['H','C','P'],specifiedServiceFeeApp)){
				globalEditStatus.specSevFeeAndOrIndicator= false;
			}else{//当有机会设置为可编辑时继续判断//也就是说不为行李时才有机会可编辑
				setEditableByStatus(globalEditStatus,'specSevFeeAndOrIndicator',statusDes) ;
			}
		};
		/**
		 * 功能描述:更新‘收费组件’
		 * @param editScope 页面上最外层的scope
		 * @param data      表单FormData服务
		 * @param globalEditStatus  页面是否可编辑的服务
		 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
		 */
		var updateNoChargeNotAvailable = function(editScope,data,globalEditStatus){
			//是否是页面点击触发的flag
			//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
			var statusDes = data.statusDes;
			var serviceType = data.serviceType ;//serviceType
			//如果是免费则将下面的费用变为不可选择
			//下面的这点之所以没有设置为不可编辑的原因是因为，
			//2.判断是否可编辑
			if(serviceType=='C'||serviceType=='P'){//收费一定为收费且不可编辑
				globalEditStatus.noChargeNotAvailable= false;
			}else{//可编辑
				//还要判断当前status是否等于3
				setEditableByStatus(globalEditStatus,'noChargeNotAvailable',statusDes) ;
			}
			//免费/收费
			editScope.noChargeNotAvailableList.list= jsonDataHelper.getNoChargeNotAvailableList(serviceType) ;

		};
		//
		/**
		 * 功能描述:‘是否检查库存组件’更新
		 * @param editScope 页面上最外层的scope
		 * @param data      表单FormData服务
		 * @param globalEditStatus  页面是否可编辑的服务
		 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
		 */
		var updateAvailability = function(editScope,data,globalEditStatus){
			//是否是页面点击触发的flag
			//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
			var statusDes = data.statusDes;
			var serviceType = data.serviceType ;//serviceType
			//将是否检查库存设置为 ‘否’
			//2.判断是否可编辑
			if(_.contains(['A','B','E'],serviceType)){
				globalEditStatus.availability= false;
			}else{
				setEditableByStatus(globalEditStatus,'availability',statusDes) ;
			}
		} ;
		/**
		 * 功能描述:‘适用于组件’更新
		 * @param editScope 页面上最外层的scope
		 * @param data      表单FormData服务
		 * @param globalEditStatus  页面是否可编辑的服务
		 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
		 */
		var updateSpecifiedServiceFeeApp = function(editScope,data,globalEditStatus){
			var serviceType = data.serviceType ;//serviceType
			//适用于
			editScope.specifiedServiceFeeAppList.list = jsonDataHelper.getSpecifiedServiceFeeAppList(serviceType) ;
		};

		/**
		 * 功能描述:‘行李适用范围组件’更新
		 * @param editScope 页面上最外层的scope
		 * @param data      表单FormData服务
		 * @param globalEditStatus  页面是否可编辑的服务
		 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
		 */
		var updatebaggageTravelApplication = function(editScope,data,globalEditStatus){
			//是否是页面点击触发的flag
			//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
			var noChargeNotAvailable = data.noChargeNotAvailable ;
			var statusDes = data.statusDes ;
			//2.是否可编辑设置
			if(noChargeNotAvailable=='D'){
				globalEditStatus.baggageTravelApplication = false;
			}else{
				setEditableByStatus(globalEditStatus,'baggageTravelApplication',statusDes) ;
			}
		};
		
		/**
		 * 功能描述:‘是否可退组件’更新
		 * @param editScope 页面上最外层的scope
		 * @param data      表单FormData服务
		 * @param globalEditStatus  页面是否可编辑的服务
		 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
		 */
		var updateIndicatorReissueRefund = function(editScope,data,globalEditStatus){
			//是否是页面点击触发的flag
			//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
			var noChargeNotAvailable = data.noChargeNotAvailable ;
			var statusDes = data.statusDes ;
			//2.是否可编辑设置
			if(_.contains(['X','F','E'],noChargeNotAvailable)){//如果不可点击
				globalEditStatus.indicatorReissueRefund = false;
			}else{
				setEditableByStatus(globalEditStatus,'indicatorReissueRefund',statusDes) ;
			}
		};
		/**
		 * 功能描述:‘区域/部分/全程’更新
		 * @param editScope 页面上最外层的scope
		 * @param data      表单FormData服务
		 * @param globalEditStatus  页面是否可编辑的服务
		 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
		 */
		var updateGeoSpecSectPortJourney = function  (editScope,data,globalEditStatus) {
			//是否是页面点击触发的flag
			//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
			var serviceType = data.serviceType ;
			var statusDes = data.statusDes ;
			//2.判断是否可编辑
			if(_.contains(['B','E'], serviceType)){//不可编辑
				globalEditStatus.geoSpecSectPortJourney=false;
			}else{//如果没有被重置为不可编辑，则这里需要重置是否可编辑
				setEditableByStatus(globalEditStatus,'geoSpecSectPortJourney',statusDes) ;
			}
			editScope.geoSpecSectPortJourneyList.list = jsonDataHelper.getgeoSpecSectPortJourneyList(serviceType) ;
		};
		
		/**
		 * 功能描述:更新‘里程费’
		 */
		var updateSpecifiedServiceFeeMileage = function  (editScope,data,globalEditStatus) {
			var statusDes = data.statusDes ;
			//全额或折扣(全额:1,折扣:0)
			var discountOrNot = data.discountOrNot ;//是否打折
			var mileageExchangeIndicator = data.mileageExchangeIndicator ;//里程兑换标识
			var specifiedServiceFeeApp = data.specifiedServiceFeeApp ;//适用于
			//如果为折扣 则 里程费 必须为空,里程兑换标识为1或2时里程费字段必须为空//或则适用于为'H/C/P时'
			
			//start**********这部分是为了处理可能存在的历史数据问题进行的特殊置空处理
			if(_.contains(['H','C','P'],specifiedServiceFeeApp)){
				data.specifiedServiceFeeMileage = '' ;
			}
			//end**********上面的这段特殊置空处理一定要注意(是为了update页面时，如果‘适用于’为‘H/C/P’则强制将‘里程费’和‘或/和’字段置为空)
			
			if(discountOrNot=='0'||mileageExchangeIndicator=='1'||mileageExchangeIndicator=='2'||_.contains(['H','C','P'],specifiedServiceFeeApp)){
				globalEditStatus.specifiedServiceFeeMileage=false;
			}else{
				setEditableByStatus(globalEditStatus,'specifiedServiceFeeMileage',statusDes) ;
			}
		};
		
		/**
		 * 功能描述:更新‘里程兑换标识’
		 */
		var updateMileageExchangeIndicator = function (editScope,data,globalEditStatus){
			var statusDes = data.statusDes ;
			//是否收费
			var noChargeNotAvailable = data.noChargeNotAvailable ;
			//全额或折扣(全额:1,折扣:0)
			var discountOrNot = data.discountOrNot ;
			//‘或/和’
			var specSevFeeAndOrIndicator = data.specSevFeeAndOrIndicator ;
			//适用于字段为'H/C/P'
			var specifiedServiceFeeApp = data.specifiedServiceFeeApp ;
			//如果为折扣 则 里程费 必须为空
			if(noChargeNotAvailable!=''||discountOrNot=='0'||specSevFeeAndOrIndicator=='A'||_.contains(['H','C','P'],specifiedServiceFeeApp)){
				globalEditStatus.mileageExchangeIndicator=false;
			}else{
				setEditableByStatus(globalEditStatus,'mileageExchangeIndicator',statusDes) ;
			}
		};
		
		/**
		 * 功能描述:更新期限的延迟类型
		 */
		var updateEffectivePeriodType = function(editScope,data,globalEditStatus){
			var subGroup = data.basicInfoVo.subGroup ;//serviceType
			editScope.effectivePeriodTypeList.list = jsonDataHelper.getEffectivePeriodTypeList(subGroup) ;
		}
		
		
		
		


		module.exports = {
			changeServiceType:function(editScope,data,globalEditStatus){/*改变serviceType*/
				var statusDes = data.statusDes;
				var serviceType = data.serviceType || '' ;//serviceType
				//更新是否收费组件的信息
				updateNoChargeNotAvailable(editScope, data, globalEditStatus) ;
				//更新'或/和'组件的显隐及是否可编辑状态
				updateSpecSevFeeAndOrIndicator(editScope,data,globalEditStatus) ;
				//更新是否检查库存
				updateAvailability(editScope, data, globalEditStatus) ;
				//适用于
				updateSpecifiedServiceFeeApp(editScope, data, globalEditStatus) ;
				//区域/部分/全程
				updateGeoSpecSectPortJourney(editScope, data, globalEditStatus) ;
				//更新延迟期限类型的select
				updateEffectivePeriodType(editScope, data, globalEditStatus) ;
				
				//发送广播隐藏或显示组件
				//editScope.$broadcast('serviceTypeChangeNotice','false') ;//scope.$broadcast('serviceTypeChangeNotice') ;	
				sendNotice2ForceDirctive4ServiceType(editScope, 'false') ;
			},
			changeNoChargeNotAvailable:function(editScope,data,globalEditStatus){/**当改变是否收费的时候*/
				var serviceType = data.serviceType || '' ;
				var noChargeNotAvailable = data.noChargeNotAvailable || '';
				//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
				//console.info('serviceType : ' + serviceType) ;
				//服务类型是不是行李附加服务
				//var isBaggageFlag = commonUtil.checkBaggageServcie(serviceType) ;
				var in_flag = true ;
				if(noChargeNotAvailable==''){//如果不为收费这下面的置空
					in_flag = true ;
				}else{//免费的时候需要清空填写的信息
					in_flag = false;//隐藏 适用于，里程，金额
				}
				//console.info('是否为行李服务['+isBaggageFlag+']，收费类型为 ['+noChargeNotAvailable+']--X,E,F,G,H--时隐藏，判断结果flag : ' + in_flag) ;
				//var specifiedServiceFeeApp_specialFlag = true;
				//当收费类型为D/X/F/E时暂时不做区分是否为行李或则一般附加服务，这里全部都将适用于置为空
				//这个地方可能还存在一店暂时先把为d时适用于全部置空
				//specifiedServiceFeeApp_specialFlag = false ;//如果不为d，则进入其他的校验，按照其他的进行
				//当是否收费为D时  --行李适用范围必须为空
				//更新'行李适用范围'组件
				updatebaggageTravelApplication(editScope,data,globalEditStatus) ;
				//更新’或/和‘组件
				updateSpecSevFeeAndOrIndicator(editScope,data,globalEditStatus) ;
				//更新‘是否可退’组件
				updateIndicatorReissueRefund(editScope,data,globalEditStatus) ;
				var freeBaggageAllowancePiecesFlag = false ;//因为免费行李件件数控件只有在serviceType=='A'是才能显示
				//当是否收费为D/O时行李件数必修为空,行李类型必须为A,行李子代码必须为0DF
				if(serviceType=='A'){
					if(noChargeNotAvailable=='D'||noChargeNotAvailable=='O'){
						freeBaggageAllowancePiecesFlag = false ;
					}else{
						freeBaggageAllowancePiecesFlag = true ;
					}
				}
				//行李件数置为空//费用//里程//适用于//里程兑换标
				var noticeNameFlagList = [
					{"name":"freeBaggageAllowancePieces","flag":freeBaggageAllowancePiecesFlag},{"name":"list170VOAndlist201VO","flag":in_flag},
					{"name":"specifiedServiceFeeMileage","flag":in_flag},{"name":"specifiedServiceFeeApp","flag":in_flag}
				] ;
				sendNoticeToForceDirctive4SingleArr(editScope, "false", noticeNameFlagList) ;
				/*{"name":"specifiedServiceFeeApp","flag":in_flag}*/
				//这个地方是只有当适用于不为hcp，并且为收费时才应该显示
				/*var specifiedServiceFeeApp = data.specifiedServiceFeeApp ;
				var flag2 = true ;
				if(_.contains(['H','C','P'],specifiedServiceFeeApp)){
					flag2 = false;
				}else{
					if(noChargeNotAvailable==''){
						flag2 = true;
					}else{
						flag2 = false ;
					}
				}
				sendNoticeToForceDirctive4Single(editScope, "false", "mileageExchangeIndicator", flag2) ;*/
				updateMileageExchangeIndicator(editScope,data,globalEditStatus) ;
			},
			changeSpecifiedServiceFeeApp:function(editScope,data,globalEditStatus){/**当改变适用于的时候*/
				var serviceType = data.serviceType ||'';
				var noChargeNotAvailable = data.noChargeNotAvailable || '';
				var ssfa = data.specifiedServiceFeeApp || '' ;
				var in_flag = true ;
				//因为只有行李服务适用于才会有[H,C,P]，所以这里不需要判断serviceType是否为C，P
				if(ssfa=='H'||ssfa=='C'||ssfa=='P'){
					in_flag = false;
				}else{
					if(noChargeNotAvailable==''){//如果不为收费这下面的置空
						in_flag = true ;
					}else{//免费的时候需要清空填写的信息
						in_flag = false;//隐藏 适用于，里程，金额
					}
				}
				//console.info('serviceType : ['+serviceType+'] , ssfa : ['+ssfa+']  , in_flag : ['+in_flag+']' ) ;
				//$scope.FormEditStatusServcie.noChargeNotAvailable =in_flag;
				//170，201显示或隐藏
				//editScope.$broadcast('singleChangeByFlagNotice','list170VOAndlist201VO',in_flag+'','false') ;
				sendNoticeToForceDirctive4Single(editScope, "false", "list170VOAndlist201VO", in_flag) ;
				//当适用于改变的时候要更新 ‘里程积分兑换标识’状态
				updateMileageExchangeIndicator(editScope,data,globalEditStatus) ;
				//更新‘或/者’字段
				updateSpecSevFeeAndOrIndicator(editScope,data,globalEditStatus) ;
				//更新‘里程费’字段
				updateSpecifiedServiceFeeMileage(editScope,data,globalEditStatus) ;
				
			},
			changeGeoSpecSectPortJourney:function  (editScope,data,globalEditStatus) {
				/*var geoSpecSectPortJourney = data.geoSpecSectPortJourney || '' ;
				var noticeName = 'geoSpecLoc1AndType' ;
				var showFlag = true;
				if(geoSpecSectPortJourney==''){
					showFlag = false;
				}
				sendNoticeToForceDirctive4Single(editScope,'false',noticeName,showFlag+'') ;*/
			},
			changeDiscount:function(editScope,data,globalEditStatus){/*当改变折扣时*/
				//更新‘或/和’是否可编辑状态
				updateSpecSevFeeAndOrIndicator(editScope,data,globalEditStatus) ;
				//更新‘里程费’是否可编辑状态
				updateSpecifiedServiceFeeMileage(editScope,data,globalEditStatus) ;
				//更新'里程兑换标识'
				updateMileageExchangeIndicator(editScope,data,globalEditStatus) ;
			},
			changeSpecSevFeeAndOrIndicator:function(editScope,data,globalEditStatus){/*当改变‘或/和’时*/
				//更新'里程兑换标识'
				updateMileageExchangeIndicator(editScope,data,globalEditStatus) ;
			},
			changeMileageExchangeIndicator:function(editScope,data,globalEditStatus){/*当改变‘里程兑换标识’时*/
				//更新‘里程费’是否可编辑状态
				updateSpecifiedServiceFeeMileage(editScope,data,globalEditStatus) ;
			}
		} ;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var util = {};
		//将查询的s7数据转换为‘FormData’
		util.convertS7ToFormData = function(s7,formData){
			for(var p in formData) {
				var flag =  s7.hasOwnProperty(p);
				if(flag){
					var tmpStr = s7[p]  ;
					formData[p] =  tmpStr ;
				}
			}
			//2.填充部分特殊数据
			formData.sel1.showStr = s7.basicInfoVo.serviceGroupDescription ;
			formData.sel2.showStr = s7.basicInfoVo.subGroupDescription ;
			formData.sel3.showStr = s7.basicInfoVo.commercialName ;
			formData.sel1.value = s7.basicInfoVo.serviceGroup ;
			formData.sel2.value = s7.basicInfoVo.subGroup ;
			formData.sel3.value = s7.basicInfoVo.subCode ;
			
		}
		
		//提交表单时将formData转换为s7
		util.convertFormDataToS7 = function(formData){
			var s7 = {} ;
			angular.extend(s7,formData) ;
			util.initTravelDate(s7) ;
			util.initDayOfWeek(s7) ;
			//处理部分特殊数据
			//删除后台不存在的属性字段
			delete s7.sel1 ;
			delete s7.sel2 ;
			delete s7.sel3 ;
			delete s7.travelStartDate ;
			delete s7.travelEndDate ;
			delete s7.dayOfWeekShow ;
			return s7 ;
		}
		
		
		util.initTravelDate =function (s7){
			var arr1 = util.getDateArr(s7.travelStartDate) ;
			var arr2 = util.getDateArr(s7.travelEndDate) ;
			s7.firstTravelYear = arr1[0] ;
			s7.firstTravelMonth = arr1[1] ;
			s7.firstTravelDay = arr1[2] ;
			//
			s7.lastTravelYear = arr2[0] ;
			s7.lastTravelMonth = arr2[1] ;
			s7.lastTravelDay= arr2[2] ;
		}
		
		util.initDayOfWeek =function (s7){
			var dayOfWeekShow = s7.dayOfWeekShow ;
			var str = ""  ;
			var index = 1 ;
			for(var t in dayOfWeekShow){
	      	var value = dayOfWeekShow[t] ;
				if(value){
					str+= index;
				}
				index ++ ;
			}
			s7.dayOfWeek = str ;
		}
		
		//检查金额是否不为空
		var checkMemonyIsNotNull = function  (data) {
			var list170 = data['list170VO'] ;
			var list201 = data['list201VO'] ;
			if(list170.length==0&&list201.length==0){
				return false;
			}
			return true ;
		}

		//判断金额是否为空
		var testFreeIsNull = function  (data) {
			var list170 = data['list170VO'] ;
			var list201 = data['list201VO'] ;
			if(list170.length>0||list201.length>0){
				return false ;
			}
			return true;
		};



		//检查区域1字段是否为空
		var checkLoc1IsNull = function  (formData) {
			var geoSpecLoc1Type = formData['geoSpecLoc1Type'] || '' ;
			var geoSpecLoc1 = formData['geoSpecLoc1'] ;
			var list178Loc1 = formData['list178Loc1'] ;
			if( (geoSpecLoc1Type==''||geoSpecLoc1=='')&&list178Loc1.length==0){
				return true ;
			}
			return false;
		};
		//检查区域1字段是否为空
		var checkLoc2IsNull = function  (formData) {
			var geoSpecLoc2Type = formData['geoSpecLoc2Type'] || '' ;
			var geoSpecLoc2 = formData['geoSpecLoc2'] ;
			var list178Loc2 = formData['list178Loc2'] ;
			if( (geoSpecLoc2Type==''||geoSpecLoc2=='')&&list178Loc2.length==0){
				return true ;
			}
			return false;
		};

		//检查区域1字段是否为空
		var checkLoc3IsNull = function  (formData) {
			var geoSpecLoc3Type = formData['geoSpecLoc3Type'] || '' ;
			var geoSpecLoc3 = formData['geoSpecLoc3'] ;
			var list178Loc3 = formData['list178Loc3'] ;
			if( (geoSpecLoc3Type==''||geoSpecLoc3=='')&&list178Loc3.length==0){
				return true ;
			}
			return false;
		};



		//校验交单数据是否可以提交
		util.validFormData = function(formData ,orgFormData){
			var serviceType = formData['serviceType'] ;
			//第一个校验
			//其他校验
			//1.表格数据校验[删除表格中的非法数据:eg:第一个字段为空的假数据]
			util.delInValidList(formData) ;
			util.dealOtherData(formData) ;
			//如果适用于为h，c，p
			var hcpFlag = _.contains(['H','C','P'], formData['specifiedServiceFeeApp']) ;
			//console.info("--------------------> " +hcpFlag + "   , " + formData['specifiedServiceFeeApp'] )  ;
			/**1.当收费为收费时,如果适用于不为H,C,P时，金额字段必填，否则金额或则里程费两个不能同时为空*/
			if(formData['noChargeNotAvailable']==''&&!hcpFlag){
				var freeIsNullFlag = testFreeIsNull(formData) ;
				if(formData['specSevFeeAndOrIndicator']=='A'){//或、和字段值为A时
					if(freeIsNullFlag){
						$.showTuiErrorDialog('您选择的支付方式为金额和里程，请填写金额!') ;
						return false;
					}	
				}else{//
					if(formData['specifiedServiceFeeMileage'].length==0&&freeIsNullFlag){//如果里程费为空
						$.showTuiErrorDialog('请填写金额或里程费!') ;
						return false;
					}
				}
			}
			
			var loc1IsNullFlag = checkLoc1IsNull(formData) ;
			var loc2IsNullFlag = checkLoc2IsNull(formData) ;
			var loc3IsNullFlag = checkLoc3IsNull(formData) ;
			if(formData['geoSpecFromToWithin']!=''){//如果不为不限区域则区域必填
				if(loc1IsNullFlag){
					$.showTuiErrorDialog('【区域限制】选择的不是“不限区域”，【区域1】必填！');
					return false;
				}
			}
			if (formData['geoSpecFromToWithin'] == 'W') {
				if(!loc2IsNullFlag||!loc3IsNullFlag){
					$.showTuiErrorDialog('【区域限制】选择了“区域1内部”，【区域2】和【经过区域】不能有值！');
					return false;
				}
			}

			//当‘区域/部分/全程’
			var geoSpecSectPortJourney = formData['geoSpecSectPortJourney'] || '';
			//区域限制
			var geoSpecFromToWithin = formData['geoSpecFromToWithin'] || '';
			//经停类型
			var geoSpecStopConnDes = formData['geoSpecStopConnDes'] || '';
			if(geoSpecSectPortJourney==''){
				if(!loc1IsNullFlag){
					$.showTuiErrorDialog('【Sector/Portion/Journey】为空，【区域1】必须为空!');
					return false;
				}
			}else if(geoSpecSectPortJourney=='P'){//loc1必须有值
				var astr = '' ;
				var flag2= (loc2IsNullFlag&&geoSpecFromToWithin!='W'&&geoSpecStopConnDes!='T') ;
				if(loc1IsNullFlag&&flag2){
					astr = '【sector/portion/journey】选择了portion，【区域1】必填，且：【区域2】有值，或者【区域限制】选择“区域1内部”，或者【经停类型】字段填“T”!' ;
					$.showTuiErrorDialog(astr);
					return false;
				}else if (loc1IsNullFlag){
					astr = '【Sector/Portion/Journey】选择了Portion，【区域1】必填!' ;
					$.showTuiErrorDialog(astr);
					return false;
				}else if(flag2){
					astr = '【Sector/Portion/Journey】选择了Portion，【区域2】必填，或者【区域限制】选择“区域1内部”，或者【经停类型】字段填“T”!' ;
					$.showTuiErrorDialog(astr);
					return false;
				}
			}else if (geoSpecSectPortJourney=='J'){
				if(loc1IsNullFlag||loc2IsNullFlag){
					$.showTuiErrorDialog('【Sector/Portion/Journey】选择了Journey，【区域1】和【区域2】必填!');
					return false;
				}
			}
			//里程如果最大值没有填写则置为最大值5个9
			if(formData.mileageMaximum==''){
				formData.mileageMaximum = '99999' ;
			}
			return true ;
		}
		
		//处理表单其他数据
		util.dealOtherData = function(formData){
			var serviceType = formData.serviceType ;
			if(serviceType=='A'){
				formData.firstExcessOccurrence = "" ;
				formData.lastExcessOccurrence = "" ;
			}
			if(serviceType=='C'||serviceType=='P'){
				if(formData.firstExcessOccurrence.length>0){
					if(formData.lastExcessOccurrence == ""){//若后者不填写，则后者默认等于前者
						formData.lastExcessOccurrence = formData.firstExcessOccurrence ;
					}
				}
			}
		}
		
		util.strNotNull = function(str){
			var tmp = str || "" ;
			tmp = $.trim(tmp+"") ;
			var flag = false;
			if(tmp.length>0){
				flag = true ;
			}
			return flag ;
		}
		
		
		/**
		 * <pre>
		 * 	删除表格中无效数据
		 * </pre>
		 * @param {Object} formData
		 */
		util.delInValidList = function(formData){
			//170表格
			var t170 = [] ;
			angular.forEach(formData.list170VO,function(m){
				if(util.strNotNull(m.specFeeAmount)){//如果存在的话
					t170.push(m) ;
				}
			}) ;
			//list198VO
			var t198 = [] ;
			angular.forEach(formData.list198VO,function(m){
				if(util.strNotNull(m.mktOp)){
					t198.push(m) ;
				}
			}) ;
			formData.list198VO = t198 ;
			//list198UpgradeVO
			var t198up = [] ;
			angular.forEach(formData.list198UpgradeVO,function(m){
				if(util.strNotNull(m.rbd1)){
					t198up.push(m) ;
				}
			}) ;
			formData.list198UpgradeVO = t198up ;
			//list183VO
			var t183 = [] ;
			angular.forEach(formData.list183VO,function(m){
				var flag = false;
				for(var p in m){
					var v = m[p] ;
					if(util.strNotNull(v)){
						flag = true ;
						break ;
					}
				}
				if(flag){
					t183.push(m) ;	
				}
			}) ;
			formData.list183VO = t183 ;
			//list186VO
			var t186 = [] ;
			angular.forEach(formData.list186VO,function(m){
				if(util.strNotNull(m.fltNo1)){
					t186.push(m) ;
				}
			}) ;
			formData.list186VO = t186 ;
			//list178Loc1
			var tloc1 = [] ;
			angular.forEach(formData.list178Loc1,function(m){
				if(util.strNotNull(m.geoLocType)){
					tloc1.push(m) ;
				}
			}) ;
			formData.list178Loc1 = tloc1 ;
			//list178Loc2
			var tloc2 = [] ;
			angular.forEach(formData.list178Loc2,function(m){
				if(util.strNotNull(m.geoLocType)){
					tloc2.push(m) ;
				}
			}) ;
			formData.list178Loc2 = tloc2 ;
			//list178Loc3
			var tloc3 = [] ;
			angular.forEach(formData.list178Loc3,function(m){
				if(util.strNotNull(m.geoLocType.length)){
					tloc3.push(m) ;
				}
			}) ;
			formData.list178Loc3 = tloc3 ;
			//行李件数表格处理
			var t196 = [] ;
			angular.forEach(formData.list196VO,function(m){
				if(util.strNotNull(m.count)&&util.strNotNull(m.code)){
					t196.push(m) ;
				}
			}) ;
			formData.list196VO = t196 ;
			//171表格无效数据删除
			var t171 = [] ;
			angular.forEach(formData.list171VO,function(m){
				if(util.strNotNull(m.carrier)){
					t171.push(m) ;
				}
			}) ;
			formData.list171VO = t171 ;
			//172表格删除无效数据
			var t172 = [] ;
			angular.forEach(formData.list172VO,function(m){
				if(util.strNotNull(m.accountCode)){
					t172.push(m) ;
				}
			}) ;
			formData.list172VO = t172 ;
			//173-1表格删除无效数据
			var t173_1 = [] ;
			angular.forEach(formData.list173TicketVO,function(m){
				if(util.strNotNull(m.ticketDesignator)){
					t173_1.push(m) ;
				}
			}) ;
			formData.list173TicketVO = t173_1 ;
			//173-2表格删除无效数据
			var t173_2 = [] ;
			angular.forEach(formData.list173TktVO,function(m){
				if(m.ticketDesignator.length>0 ){
					t173_2.push(m) ;
				}
			}) ;
			formData.list173TktVO = t173_2 ;
			//165
			var t165 = [] ;
			angular.forEach(formData.list165VO,function(m){
				if(m.equipmentCode.length>0){//如果存在的话
					t165.push(m) ;
				}
			}) ;
			formData.list165VO = t165 ;
		}
		
		util.getDate = function (str) {
			var strs = str.split('-');
			var year = strs[0];
			var month = strs[1];
			var day = strs[2];
			return new Date(year, month-1, day);
		};
		
		util.getDateArr = function (str) {
			var arr = [] ;
			var year = '' ;
			var month = '' ;
			var day  = '' ;
			if(str.length>0){
				var infos = str.split('-');
				if(infos.length==3){
					arr.push(infos[0]) ;
					arr.push(infos[1]) ;
					arr.push(infos[2]) ;
				}
			}
			return arr ;
		};
		
		module.exports = util ;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * <pre>
	 * 	功能描述:所有的模态框辅助类
	 * </pre>
	 * @auther:yicj
	 * @email:626659321@qq.com
	 * @date:2016/05/03
	 * @example:
	 * html:'<ul id ="tskCustomeTipInfo">'
	 * js:'var ModalHelper = require('./lib/modal.helper') ; <br/>
	 * 	   var modalHelper = new ModalHelper("tskCustomeTipInfo");'
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		function ModalHelper(tipId){
			if(this==window){
				throw new Error("please new an ModalHelper object to use it !");
			}
			this.el = $("#"+tipId) ;
		} ;
		
		
		ModalHelper.prototype.cleanTipInfo = function(){
			this.el.html("") ;
		} ;
		
		ModalHelper.prototype.addErrorTip = function(errMsg){
			this.el.append("<li><span class ='modal-errorTip'>"+errMsg+"</span></li>") ;
		} ;
		ModalHelper.prototype.addSuccessTip = function(sucMsg){
			this.el.append("<li><span class =\"modal-successTip\">"+sucMsg+"</span></li>") ;
		} ;
		module.exports = ModalHelper;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;




/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		  var controllers = __webpack_require__(39) ;
		  var util = __webpack_require__(42) ;

		  //当提交的时候将页面上所有字段的$dirty全部置为true
		  function changeInputStatus4Submit(data,myForm){
		  		var keys1 = _.keys(data) ;
		  		var keys2 = _.keys(myForm) ;
		  		_.each(keys2,function(item){
		  			if(_.contains(keys1,item)){
		  				 myForm[item].$setDirty(true) ;
		  			}
		  		}) ;
		  } ;
		    //保存表格数据到后台
	      //headerController
		  controllers.controller('HeaderCtrl',['$scope','FormData','HttpOperService','$log',function($scope,FormData,HttpOperService,$log){
		  	  $scope.contextPath = FormData.contextPath ;
		  	  $scope.data = FormData ;
		  	   //提交表单数据
		  	  $scope.submitForm = function(saveOrSaveAndPublish){
				   var action = $scope.data.action ;
				    var sel3ShowStr =  $scope.data.sel3.showStr ;
				    var flag = validator.form() ;
				    var ngFlag = $scope.myForm.$valid ;
				    //$log.info('flag : ' + flag) ;
				    //$log.info('ngFlag : '  + ngFlag) ;
				    if(action=='add'&&sel3ShowStr==''){
				   		$.showTuiErrorDialog('请选择服务到最后一级！');
				     }else{
				     	changeInputStatus4Submit($scope.data,$scope.myForm) ;
					    if(flag&&ngFlag){
						   saveFormData(saveOrSaveAndPublish,$scope.data) ;
					    }
				     }
			   }
		  	    /**
				 * <pre>
				 * 	功能描述:保存表单数据
				 * </pre>
				 * @param {Object} operType  ['save','saveAndPublish']  点击‘保存’,‘保存并发布’
				 */
			      function saveFormData (operType,formData){
						var tokenId = $("#tokenId").val() ;
						var flag = false ;
						var s7 = util.convertFormDataToS7(formData) ;
						flag = util.validFormData(s7,formData) ;
						//flag = false;//本地测试禁止表单提交
						if(flag){//如果校验通过的话则提交表单数据到后台
							$.showTuiConfirmDialog('保存?', function() {
								var url = "" ;
								if(operType=='save'){
									if(formData.action == "add"||formData.action == "copy"){//新增数据的话
										url = formData.contextPath + "/addS7"
									}else if(formData.action=="update"){//更新数据的话
										url = formData.contextPath + "/updateS7" ;
									}
								}else if (operType=='saveAndPublish'){
									url = formData.contextPath + "/saveAndPublishS7" ;
								}
								var config = {"tokenId":tokenId} ;
								var promise = HttpOperService.postDate(url,s7,config) ;
								promise.then(function (data) {
									if (data.flag == 'true' ) {
										$.showTuiSuccessDialog('保存成功！', function() {
											$.showTuiWaitingDialog('即将返回查询界面!', 200, 60);
											window.location.href= formData.contextPath+'/oc/ocView' ;
										});
									} else {
										$.showTuiErrorDialog('保存数据出错！');
									}
								},function(error){
									$.showTuiErrorDialog('保存数据出错！');
								}) ;
							});
						}
				 }
		  	  
		  }])  ;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		  var controllers = __webpack_require__(39) ;
		  var jsonDataHelper = __webpack_require__(22) ;
		  var commonUtil = __webpack_require__(23) ;
		  var _ = __webpack_require__(21) ;
		  var validateHelper = __webpack_require__(41) ;
		  
		  
		  var clearAllReuseTbHistory = function(){
		  	//201暂时不支持复用，所以不用清空历史
		  	var namesArrs = ["reuseList172VO","reuseList173TicketVO","reuseList183VO","reuseList198VO","reuseList198UpgradeVO",
		  	"reuseList171VO","reuseList173TktVO","reuseList186VO","reuseList170VO","reuseList196VO","reuseList165VO",
		  	"reuseList178Loc1","reuseList178Loc2","reuseList178Loc3","reuseListTsk202VO"] ;
		  	for(var i=0 ; i<namesArrs.length;  i++){
		  		$(":input[name="+namesArrs[i]+"]").val("").attr("placeholder","") ;
		  	}
		  };
		  
		  var changeDefaultValueByServiceType = function(data){
			  var serviceType = data.serviceType ;
			  ////1.当为免费行李时，‘或/和’字段为空
			  if(_.contains(['A','B','E'], serviceType)){
				 data.specSevFeeAndOrIndicator= '' ;
			  }
			  //2.更新‘是否收费’的默认值
			  if(serviceType=='A'){
				 data.noChargeNotAvailable = 'F' ;//设置为免费
			  }else if (serviceType=='B'){
				 data.noChargeNotAvailable = 'F' ;//设置为免费
			  }else if (serviceType=='C'||serviceType=='P'){
				 data.noChargeNotAvailable = '' ;//设置为收费
			  }else if (serviceType=='E'){
				 data.noChargeNotAvailable = 'X' ;//设置为收费
			  }
			  //3.更新‘是否检查库存’
			  if(_.contains(['A','B','E'],serviceType)){
				 data.availability = 'N' ;
			  }
			  //4.更新‘区域/部分/全程’
			  if(_.contains(['B','E'], serviceType)){
				 data.geoSpecSectPortJourney = 'S' ;
			  }else if(serviceType=='F'){
				 data.geoSpecSectPortJourney = 'S' ;
			  }else{
				 data.geoSpecSectPortJourney = '' ;
			  }
			  
		  }
		  

	      var dealData4NewServiceType = function(data,orgData,l,FormEditStatusServcie,editScope){
	      		//第一部分:主要为点击事件后的页面表单赋值工作
				var serviceType = l.serviceType ;
				var carrCode = l.carrCode ;
				var serviceSubCode = l.serviceSubCode ;
				var commercialName = l.commercialName ;
				//第一步:重置表单数据
				//当点击的饿时候把整个表单重置//除了serviceType外的其他字段
				for(var pname in data){
					if(!_.contains(['sel1','sel2','sel3','sel4','firstMaintenanceDate'], pname)){
						data[pname] = angular.copy(orgData[pname]) ;
					}
				}
				//validator是绑定在window上的全局变量
				validator.resetForm();
				//第二步：填充当前选中的数据
				data.carrCode = carrCode ;
				data.serviceAndSubCode = serviceSubCode ;
				data.serviceType = serviceType ;
				//填充basicInfo信息start
				data.basicInfoVo.serviceGroup= l.attributesGroup ;
				data.basicInfoVo.subGroup= l.attributesSubgroup ;
				data.basicInfoVo.subCode= l.serviceSubCode ;
				//清除表格复用的信息
				clearAllReuseTbHistory() ;
				//填充basicInfo信息end
				data.sel3.showStr = '['+serviceSubCode+']'+commercialName ;
				data.sel3.value = serviceSubCode ;
				data.sel3.serviceGroup = l.attributesGroup ;
				//清空金额缓存数据(初始化为全额状态)
				data.discountOrNot = '1' ;
				data.list201VO = [] ;//数据初始化
				//赋默认值部分
				changeDefaultValueByServiceType(data) ;
				//第二部分：主要做页面的显隐以及是否可编辑工作
				validateHelper.changeServiceType(editScope,data,FormEditStatusServcie) ;
				editScope.myForm.$setPristine() ;
		  };



		  //页面第一个部分/////////选择附加服务部分/////////////////////////////////////////
		  //select级联controller
		   controllers.controller('BasicInfoCtrl',['$scope','HttpOperService','FormData','DEFAULT_SERVICETYPE','FormEditStatusServcie',function($scope,HttpOperService,FormData,DEFAULT_SERVICETYPE,FormEditStatusServcie){
				//chooseInput的输入数据
				$scope.chooseInputData = {
					"choose1":"",
					"choose2":"",
					"choose3":""
				} ;
		   		$scope.data = FormData ;
				$scope.showChooseFunc = function(){
					var str = "" ;
					var str1 = FormData.sel1.showStr || "" ;
					var str2 = FormData.sel2.showStr || "" ;
					var str3 = FormData.sel3.showStr || "" ;
					if(str1.length>0){
						str = str1 ;
					}
					if(str2.length>0){
						str += " > "+str2 ;
					}
					if(str3.length>0){
						str += " > "+str3 ;
					}
					return str ;
				};

				//choose第一个框中li点击事件
				$scope.subGroupQuery = function(showStr,serviceGroup){
					var contextPath = $scope.contextPath ;
					FormData.sel1.showStr = showStr ;
					FormData.sel1.value = serviceGroup ;
					//把第二个选项框以前保留的信息清空
					FormData.sel2.showStr = "" ;
					FormData.sel2.value = "" ;
					//把第三个选项框以前保留的信息清空
					FormData.sel3.showStr = "" ;
					FormData.sel3.value = "" ;
					FormData.sel3.serviceGroup = "" ;
					FormData.sel3.textTableNo163 = "" ;
					$scope.lastGroupList = [] ;
					$scope.lastGroupList2 = [] ;
					//清空formData信息
					FormData.serviceAndSubCode = "" ;
					FormData.serviceType = DEFAULT_SERVICETYPE ;//
					FormData.noChargeNotAvailable = "" ;//设置为默认
					var url = contextPath+"/basicInfo/queryBasicInfoByGroup" ;
					var carrier = $scope.data.carrCode  ;
					var jqeryData = {} ;//post方式提交
					var jueryParam = {carrier: carrier,serviceGroup:serviceGroup};//地址问号形式
					var promise =HttpOperService.postDate(url,jqeryData,jueryParam) ;
					promise.then(function(retData){
						$scope.subGroupList = retData ;
					},function(err){
						alert("查询出错!") ;
					}) ;
					$scope.data.basicInfoVo.serviceGroup= "";
					$scope.data.basicInfoVo.subGroup= "" ;
					$scope.data.basicInfoVo.subCode= "" ;
					$scope.data.sel4 = [];
				};

				//第二个li点击事件
				$scope.s5Query = function(showStr,subGroup){
					var contextPath = $scope.contextPath ;
					FormData.sel2.showStr = showStr ;
					FormData.sel2.value = subGroup ;
					//清空第三个选项框
					FormData.sel3.showStr = "" ;
					FormData.sel3.value = "" ;
					FormData.sel3.serviceGroup = "" ;
					FormData.sel3.textTableNo163 = "" ;
					$scope.lastGroupList = [] ;
					FormData.serviceAndSubCode = "" ;
					FormData.serviceType = DEFAULT_SERVICETYPE ;//
					$scope.lastGroupList2 = [] ;

					FormData.noChargeNotAvailable = "" ;//设置为默认
					var url = contextPath+"/s5/queryS5BySubGroup" ;
					var carrier = $scope.data.carrCode  ;
					var serviceGroup = FormData.sel1.value ;
					var jqeryData = {} ;//post方式提交
					var jueryParam = {carrier: carrier,serviceGroup:serviceGroup,subGroup:subGroup};//地址问号形式
					var promise =HttpOperService.postDate(url,jqeryData,jueryParam) ;
					promise.then(function(retData){
						$scope.lastGroupList = retData ;
					},function(err){
						alert("查询出错!") ;
					}) ;
					$scope.data.basicInfoVo.serviceGroup= "" ;
					$scope.data.basicInfoVo.subGroup= "" ;
					$scope.data.basicInfoVo.subCode= "" ;
					$scope.data.sel4 = [];
				};

				//第三个li点击事件
				$scope.lastChooseClick = function(l){
					//l.attributesGroup与上面的serviceGroup一样
					var serviceGroup = l.attributesGroup ;	
					var serviceType = l.serviceType ;
					var pageNeedNewRunderFlag = true ;
					//下面的这段暂时注释掉，以后可能需要根据点击要判断当前页面是否需要重置数据
					//点击本次li前的数据
					//var oldServiceGroup = $scope.data.sel3.serviceGroup ;
					//var oldServiceType = FormData.serviceType ;
					/*if(oldServiceGroup==serviceGroup){//表示之前点击过第三个li并且一直保持在第三个li上面
						if(oldServiceType==serviceType){//表示serviceGroup和serviceType都没有变，则页面不需要重新渲染
							pageNeedNewRunderFlag = false;
						}
					}*/
					//000000 这里暂时全都做页面重置(以后的重置方式最佳实践:1-->应该把force指令里面控制显隐的变量修改为只有serviceType一个。
					//000000 2-->然后对于比较特殊的页面元素例如:升舱，则特殊处理，在页面上直接用ng-show=’serviceGroup‘来控制显隐),
					//000000 这样后期才更利于需求的变化
					//后期做这个功能
					if(pageNeedNewRunderFlag){//只有当页面需要重新渲染时
						//console.info('本次点击需要重新刷新页面....') ;
						//处理点击后的数据
						dealData4NewServiceType($scope.data,$scope.orgData,l,FormEditStatusServcie, $scope.$parent) ;
						
					}
					//第四步:查询数据为后面显示准备
					var textTableNo163 = l.subCodeTableNo163||'' ;
					var oldTextTableNo163 = FormData.sel3.textTableNo163 ||'';
					if(oldTextTableNo163!=textTableNo163){//如果上次和这次不相同才需要重新渲染第四列
						textTableNo163 = textTableNo163*1 ;
						var url = FormData.contextPath+"/s7/query4ClickService" ;
						var queryParam = {"subCodeTableNo163":textTableNo163+"",
										  "carrCode":l.carrCode,
										  "serviceType":l.serviceType,
										  "serviceAndSubCode":l.serviceSubCode} ;
						var promise =HttpOperService.postDate(url,queryParam,{}) ;
						promise.then(function(retData){
							$scope.lastGroupList2 = retData.tb163List ;
						  	$scope.data.sel4 = retData.tb163List;
						  	$scope.data.sequenceNumber = retData.maxSequenceNumber*1+10 ;
						},function(err){
							alert("查询出错!") ;
						}) ;

					}
				};
		   }]) ;
		   // ng-show = "lastGroupList2.length>0"

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		var controllers = __webpack_require__(39) ;
		var jsonDate = __webpack_require__(24) ;
		var commonUtil = __webpack_require__(23) ;
		var jsonDataHelper = __webpack_require__(22) ;
		var _ = __webpack_require__(21) ;
		var validHelper = __webpack_require__(41) ;
		
		var _checkHaseErrorInfo = function  (inputEl) {
			if(inputEl.hasClass('error')){
				return true ;
			}
			return false;
		};
		
		var _delayValidateElement = function(inputEl){
			if(_checkHaseErrorInfo(inputEl)){
				setTimeout(function(){
					validator.element(inputEl) ;
				},100) ;
			}
		};

	   //页面第二个部分///////费用确定部分////////////////////////////////////////////////////////
	   controllers.controller('ChargeConfirmCtrl',['$scope','FormData','FormEditStatusServcie',function($scope,FormData,FormEditStatusServcie){
	   			$scope.data  = FormData ;
				//当选择免费或则收费时触发的事件
				//行李重量单位集合
				$scope.weightUnitList = jsonDate.weightUnitList ;
				//SPEC_SERVICE_FEE_COL_SUB//包含/扣除
				$scope.specServiceFeeColSubList = jsonDate.specServiceFeeColSubList ;
				//净价/销售价
				$scope.specServiceFeeNetSellList = jsonDate.specServiceFeeNetSellList ;
				$scope.baggageTravelApplicationList = jsonDate.baggageTravelApplicationList ;

				//当是否收费改变时触发的函数
				$scope.changeNoChargeNotAvailable = function  () {
					var editScope = $scope.$parent ;
					var data = $scope.data;
					var globalEditStatus = FormEditStatusServcie ;
					var noChargeNotAvailable = data.noChargeNotAvailable ;
					var serviceType = data.serviceType ;
					//1.赋默认值
					//1.1--‘行李适用范围组件’
					if(noChargeNotAvailable=='D'){
						data.baggageTravelApplication = '' ;
					}
					//1.2--‘是否可退组件’
					if(noChargeNotAvailable==''){
						data.indicatorReissueRefund='N'; 	
					}else if(_.contains(['X','F','E'],noChargeNotAvailable)){
						data.indicatorReissueRefund=''; 
					}
					//当为免费的时候清空170的子表复用号
					if(noChargeNotAvailable!=''){
						data.reuseList170VO = '' ;
						$(":input[name=reuseList170VO]").val('').attr('placeholder','') ;
					}
					//当为免费的时候‘里程兑换标识’隐藏
					if(noChargeNotAvailable!=''){
						data.mileageExchangeIndicator = '0' ;
					}
					//2.更新将被影响控件的编辑状态以及显隐
					validHelper.changeNoChargeNotAvailable(editScope,data,globalEditStatus) ;
				} ;

				//适用于改变时
				$scope.changeSpecifiedServiceFeeApp = function(){
					var globalEditStatus = FormEditStatusServcie ;
					var editScope = $scope.$parent ;
					var data = $scope.data ;
					var noChargeNotAvailable = data.noChargeNotAvailable || '';
					var ssfa = data.specifiedServiceFeeApp || '' ;
					//当hcp时 170和201都会被清空、否则不会改变170和201表的状态
					if(ssfa=='H'||ssfa=='C'||ssfa=='P'){//则将会隐藏170以及201所以需要将可能存在的子表号清空
						data.reuseList170VO = '' ;
						$(":input[name=reuseList170VO]").val('').attr('placeholder','') ;
						//里程积分兑换标识必须为空
						data.mileageExchangeIndicator = '0' ;
						//里程费为空
						data.specifiedServiceFeeMileage = ''
						//或/和字段为空
						data.specSevFeeAndOrIndicator = '' ;
						
					}
					validHelper.changeSpecifiedServiceFeeApp(editScope,data,globalEditStatus) ;
				};
				
				//当改变使用时间限制类型的时候
				$scope.changeUseDateLimitTye = function(type){
					type = type || '' ;
					var statusDes = $scope.data.statusDes ;
					var canEditFlag = commonUtil.getEditFlagByStatus(statusDes) ;
					if(canEditFlag){
						var oldType = $scope.data.useDateLimitTye ;
						if(oldType==type) return ;
						if(type==''){//如果为时间段
							$scope.data.useDateLimitTye = '' ;
							//将期限数据清空
							$scope.data.effectivePeriodType= '' ;
							$scope.data.effectivePeriodNumber = '' ;
							$scope.data.effectivePeriodUnit = '' ;
						}else if(type=='1'){//如果为期限
							$scope.data.useDateLimitTye = '1' ;
							//将时间段数据清空
							$scope.data.firstUseDate = '' ;
							$scope.data.lastUseDate = '' ;
						}
					}
				}
				
				//-------------区域对应的表格显示隐藏结束--------//
				$scope.changeEffectivePeriodType = function (){
					var input1 = $(':input[name=effectivePeriodNumber]') ;
					if($scope.data.effectivePeriodType==''){
						$scope.data.effectivePeriodNumber='';
						$scope.data.effectivePeriodUnit='';
						_delayValidateElement(input1) ;
					}else{
						$scope.data.effectivePeriodUnit='D';
					}
				}

				//table内部选择，全额或折扣
				$scope.clickDiscount2 = function(l){
					var type = l.discountType ;
					if(type=='1'){//全额
						l.discountNum = '' ;
					}else{
						l.onePriceNum = '' ;
					}
				};
				//金额选择全额或则折扣时
				$scope.clickDiscount = function(dt){
					//整个编辑状态为3的时候是不能编辑的
					var pageEditFlag = commonUtil.getEditFlagByStatus(FormData['statusDes']) ;
					if(!pageEditFlag)return ;
					//当点击时可以触发展开表格
					$scope.data.discountOrNot = dt ;
					if(dt=='1'){//全额
						$scope.data.list201VO = [] ;
					}else{//折扣
						//第三列一定要已选中
						$scope.data.list170VO = [] ;
						//将复用170数据清空
						$scope.data.reuseList170VO = '' ;
						$(":input[name='reuseList170VO']").val('') ;
						$scope.data.list201VO = [] ;//数据初始化
						//1.判断套餐/非套餐
						//2.套餐:显示每一条,非套餐的话总的显示一条
						var serviceGroup = $scope.data.sel1.value;    //BD
						if(serviceGroup!=null&&serviceGroup.length>2&&serviceGroup.indexOf('BD')===0){
							//说明是套餐
							var tmpArr = [] ;//[1]页面显示的字符串,[2]折扣类型,[3]一口价,[4]一口价单位,[5]折扣数
							for(var i = 0 ; i < $scope.data.sel4.length;i++){
								var l = $scope.data.sel4[i] ;
								var obj = {"subCode":l.subCode,"commercialName":l.commercialName,"discountType":'1',"onePriceNum":'',"discountNum":''};
								tmpArr.push(obj) ;
							}
							$scope.data.list201VO = tmpArr ;
						}else{//说明是非套餐
							$scope.data.list201VO = [] ;//数据初始化
							//显示str $scope.data.sel3.showStr
							var subCode = $scope.data.sel3.value ;
							var index = 2+subCode.length ;//'['+subCode+']'
							var sel3ShowStr = $scope.data.sel3.showStr ;
							var commercialName = sel3ShowStr.substring(index);
							//[1]页面显示的字符串,[2]折扣类型,[3]一口价,[4]一口价单位,[5]折扣数
							var obj = {"subCode":subCode,"commercialName":commercialName,"discountType":'1',"onePriceNum":'',"discountNum":''};
							$scope.data.list201VO = [obj] ;
						}
						//和/或--里程积分--里程兑换标识
						//当选择折扣时要更新这三个字段都必须为空且不可改变
						$scope.data.specSevFeeAndOrIndicator = "" ;
						$scope.data.specifiedServiceFeeMileage = "" ;
						$scope.data.mileageExchangeIndicator = "0" ;
					}
					//更新组件的状态
					validHelper.changeDiscount($scope.$parent,$scope.data,FormEditStatusServcie) ;
				};
				
				//当点击‘或/和’时
				$scope.clickSpecSevFeeAndOrIndicator = function(type){
					if(type=='A'){//当本字段的值为A--1.里程兑换标识必须为空2.折扣表标识值必须为0
						$scope.data.mileageExchangeIndicator ='0' ;
					}else{
						
					}
					validHelper.changeSpecSevFeeAndOrIndicator($scope.$parent,$scope.data,FormEditStatusServcie) ;
				}
				//当点击‘里程兑换标识’
				$scope.clickMileageExchangeIndicator = function(type){
					if(type='1'||type=='2'){
						$scope.data.specifiedServiceFeeMileage ='' ;
					}
					validHelper.changeMileageExchangeIndicator($scope.$parent,$scope.data,FormEditStatusServcie) ;
				}
				
	   }]) ;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		    var controllers = __webpack_require__(39) ;
			var jsonDate = __webpack_require__(24) ;
			var validHelper = __webpack_require__(41) ;
			var _checkHaseErrorInfo = function  (inputEl) {
				if(inputEl.hasClass('error')){
					return true ;
				}
				return false;
			};
			var _delayValidateElement = function(inputEl){
				if(_checkHaseErrorInfo(inputEl)){
					setTimeout(function(){
						validator.element(inputEl) ;
					},100) ;
				}
			};
		    //页面第三部分/////////规则详细部分/////////////////////////////////////////////////////////
		    controllers.controller('RuleDetailCtrl',['$scope','FormData','FormEditStatusServcie',function($scope,FormData,FormEditStatusServcie){
				$scope.data = FormData ;
				//$scope.NEW_ADD_STR = NEW_ADD_STR ;
				$scope.noCharge_notAvailableList = jsonDate.noCharge_notAvailableList ;
				//舱位list集合
				$scope.cabinList = jsonDate.cabinList ;
				//区域集合
			    $scope.geoLocTypeList = jsonDate.geoLocTypeList ;
				//退/改
				$scope.indicatorReissueRefundList = jsonDate.indicatorReissueRefundList ;
				//退款形式
				$scope.formOfRefundList = jsonDate.formOfRefundList ;
				$scope.geoSpecExceptionStopUnitList = jsonDate.geoSpecExceptionStopUnitList ;
				$scope.timeApplicationList = jsonDate.timeApplicationList ;
				
				$scope.getUpGradeTableTile = function(){
					var sel1Value = FormData.sel1.value ;
					var tmpStr = "" ;
					if(sel1Value=="SA"||sel1Value=="BDSA"){
						tmpStr = "座位属性表" ;
					}else if (sel1Value=="UP"||sel1Value=="BDUP"){
						tmpStr = "升舱属性表" ;
					}
					return tmpStr ;
				}
				
				var list = ["SA","BDSA","UP","BDUP"] ;
				$scope.showUpGradeTableFlag = function(){
					var flag = false;
					var index = list.indexOf(FormData.sel1.value) ;
					if(index!=-1){
						flag = true ;
					}
					if(flag){//如果为true，并且serviceType为M，或F时显示
						if($scope.data.serviceType=='M'||$scope.data.serviceType=='F'){
							flag = true ;
						}else{
							flag = false;
						}
					}
					return flag ;
				}
				
				var list2 = ['UP','BDUP'] ;
				$scope.showUpGradeServiceFlag = function(){//升舱到的服务等级
					var flag = false;
					var index = list2.indexOf(FormData.sel1.value) ;
					if(index!=-1){
						flag = true ;
					}
					if(flag){//如果为true，并且serviceType为M，或F时显示
						if($scope.data.serviceType=='M'||$scope.data.serviceType=='F'){
							flag = true ;
						}else{
							flag = false;
						}
					}
					return flag ;
				}
				
				
				//upGradeTable td input size //如果是座位属性表长度为10，订座属性表长度为3
				$scope.getUpGradeInputSize = function(){
					var sel1Value = FormData.sel1.value ;
					var len = 5 ;
					if(sel1Value=="SA"||sel1Value=="BDSA"){
						len = 10 ;
					}else if (sel1Value=="UP"||sel1Value=="BDUP"){
						len = 5 ;
					}
					return len ;
				}
				//data.list178Loc1开始
				//区域1 select改变
				$scope.selectChangeGeoSpecLoc1 = function (){
					$scope.data.geoSpecLoc1 = "" ;
					var inputElement = $(":input[name='geoSpecLoc1']") ;
					_delayValidateElement(inputElement) ;
				}
				//区域2 select改变
				$scope.selectChangeGeoSpecLoc2 = function (){
					$scope.data.geoSpecLoc2 = "" ;
					var inputElement = $(":input[name='geoSpecLoc2']") ;
					_delayValidateElement(inputElement) ;
				}
				//区域3 select改变
				$scope.selectChangeGeoSpecLoc3 = function (){
					$scope.data.geoSpecLoc3 = "" ;
					var inputElement = $(":input[name='geoSpecLoc3']") ;
					_delayValidateElement(inputElement) ;
				}
				
				//当区域、部分、全程select发生变化的时候
				$scope.changeGeoSpecSectPortJourney = function  () {
					var editScope = $scope.$parent ;
					var data = $scope.data;
					var globalEditStatus = FormEditStatusServcie ;
					validHelper.changeGeoSpecSectPortJourney(editScope,data,globalEditStatus) ;
				}

		  }]) ;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module){ 
		var app = angular.module('app.filter',[]); 
		//过滤choose1
		app.filter("serviceGroupFilter", function() {
		    var myFunc = function(data,inputStr){
				inputStr = inputStr || "" ;
		        var retData = [] ;
		        if(inputStr.length>0){
					inputStr = inputStr.toLowerCase() ;
		            angular.forEach(data,function(e){
		                if(e.serviceGroupDescription.toLowerCase().indexOf(inputStr)!=-1){
		                    retData.push(e) ;
		                }
		            }) ;
		        }else{
		            retData = data ;
		        }
		        return retData ;
		    }
		    return myFunc ;
		});
		
		//subGroupDescription
		app.filter("subGroupFilter", function() {
		    var myFunc = function(data,inputStr){
				inputStr = inputStr || "" ;
		        var retData = [] ;
		        if(inputStr.length>0){
					inputStr = inputStr.toLowerCase() ;
		            angular.forEach(data,function(e){
		                if(e.subGroupDescription.toLowerCase().indexOf(inputStr)!=-1){
		                    retData.push(e) ;
		                }
		            }) ;
		        }else{
		            retData = data ;
		        }
		        return retData ;
		    }
		    return myFunc ;
		});
		//lastGroupList
		app.filter("lastGroupFilter", function() {
		    var myFunc = function(data,inputStr){
				inputStr = inputStr || "" ;
		        var retData = [] ;
		        if(inputStr.length>0){
					inputStr = inputStr.toLowerCase() ;
		            angular.forEach(data,function(e){
						var tmpStr = "["+e.serviceSubCode+"]"+e.commercialName ;
		                if(tmpStr.toLowerCase().indexOf(inputStr)!=-1){
		                    retData.push(e) ;
		                }
		            }) ;
		        }else{
		            retData = data ;
		        }
		        return retData ;
		    }
		    return myFunc ;
		});
		
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* ========================================================================
	 * Bootstrap: modal.js v3.3.6
	 * http://getbootstrap.com/javascript/#modals
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	+function ($) {
	  'use strict';
	  // MODAL CLASS DEFINITION
	  // ======================
	  var Modal = function (element, options) {
	    this.options             = options
	    this.$body               = $(document.body)
	    this.$element            = $(element)
	    this.$dialog             = this.$element.find('.modal-dialog')
	    this.$backdrop           = null
	    this.isShown             = null
	    this.originalBodyPad     = null
	    this.scrollbarWidth      = 0
	    this.ignoreBackdropClick = false

	    if (this.options.remote) {
	      this.$element
	        .find('.modal-content')
	        .load(this.options.remote, $.proxy(function () {
	          this.$element.trigger('loaded.bs.modal')
	        }, this))
	    }
	  }

	  Modal.VERSION  = '3.3.6'

	  Modal.TRANSITION_DURATION = 300
	  Modal.BACKDROP_TRANSITION_DURATION = 150

	  Modal.DEFAULTS = {
	    backdrop: true,
	    keyboard: true,
	    show: true
	  }

	  Modal.prototype.toggle = function (_relatedTarget) {
	    return this.isShown ? this.hide() : this.show(_relatedTarget)
	  }

	  Modal.prototype.show = function (_relatedTarget) {
	    var that = this
	    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

	    this.$element.trigger(e)

	    if (this.isShown || e.isDefaultPrevented()) return

	    this.isShown = true

	    this.checkScrollbar()
	    this.setScrollbar()
	    this.$body.addClass('modal-open')

	    this.escape()
	    this.resize()

	    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

	    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
	      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
	        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
	      })
	    })

	    this.backdrop(function () {
	      var transition = $.support.transition && that.$element.hasClass('fade')

	      if (!that.$element.parent().length) {
	        that.$element.appendTo(that.$body) // don't move modals dom position
	      }

	      that.$element
	        .show()
	        .scrollTop(0)

	      that.adjustDialog()

	      if (transition) {
	        that.$element[0].offsetWidth // force reflow
	      }

	      that.$element.addClass('in')

	      that.enforceFocus()

	      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

	      transition ?
	        that.$dialog // wait for modal to slide in
	          .one('bsTransitionEnd', function () {
	            that.$element.trigger('focus').trigger(e)
	          })
	          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	        that.$element.trigger('focus').trigger(e)
	    })
	  }

	  Modal.prototype.hide = function (e) {
	    if (e) e.preventDefault()

	    e = $.Event('hide.bs.modal')

	    this.$element.trigger(e)

	    if (!this.isShown || e.isDefaultPrevented()) return

	    this.isShown = false

	    this.escape()
	    this.resize()

	    $(document).off('focusin.bs.modal')

	    this.$element
	      .removeClass('in')
	      .off('click.dismiss.bs.modal')
	      .off('mouseup.dismiss.bs.modal')

	    this.$dialog.off('mousedown.dismiss.bs.modal')

	    $.support.transition && this.$element.hasClass('fade') ?
	      this.$element
	        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
	        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	      this.hideModal()
	  }

	  Modal.prototype.enforceFocus = function () {
	    $(document)
	      .off('focusin.bs.modal') // guard against infinite focus loop
	      .on('focusin.bs.modal', $.proxy(function (e) {
	        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
	          this.$element.trigger('focus')
	        }
	      }, this))
	  }

	  Modal.prototype.escape = function () {
	    if (this.isShown && this.options.keyboard) {
	      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
	        e.which == 27 && this.hide()
	      }, this))
	    } else if (!this.isShown) {
	      this.$element.off('keydown.dismiss.bs.modal')
	    }
	  }

	  Modal.prototype.resize = function () {
	    if (this.isShown) {
	      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
	    } else {
	      $(window).off('resize.bs.modal')
	    }
	  }

	  Modal.prototype.hideModal = function () {
	    var that = this
	    this.$element.hide()
	    this.backdrop(function () {
	      that.$body.removeClass('modal-open')
	      that.resetAdjustments()
	      that.resetScrollbar()
	      that.$element.trigger('hidden.bs.modal')
	    })
	  }

	  Modal.prototype.removeBackdrop = function () {
	    this.$backdrop && this.$backdrop.remove()
	    this.$backdrop = null
	  }

	  Modal.prototype.backdrop = function (callback) {
	    var that = this
	    var animate = this.$element.hasClass('fade') ? 'fade' : ''

	    if (this.isShown && this.options.backdrop) {
	      var doAnimate = $.support.transition && animate

	      this.$backdrop = $(document.createElement('div'))
	        .addClass('modal-backdrop ' + animate)
	        .appendTo(this.$body)

	      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
	        if (this.ignoreBackdropClick) {
	          this.ignoreBackdropClick = false
	          return
	        }
	        if (e.target !== e.currentTarget) return
	        this.options.backdrop == 'static'
	          ? this.$element[0].focus()
	          : this.hide()
	      }, this))

	      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

	      this.$backdrop.addClass('in')

	      if (!callback) return

	      doAnimate ?
	        this.$backdrop
	          .one('bsTransitionEnd', callback)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callback()

	    } else if (!this.isShown && this.$backdrop) {
	      this.$backdrop.removeClass('in')

	      var callbackRemove = function () {
	        that.removeBackdrop()
	        callback && callback()
	      }
	      $.support.transition && this.$element.hasClass('fade') ?
	        this.$backdrop
	          .one('bsTransitionEnd', callbackRemove)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callbackRemove()

	    } else if (callback) {
	      callback()
	    }
	  }

	  // these following methods are used to handle overflowing modals

	  Modal.prototype.handleUpdate = function () {
	    this.adjustDialog()
	  }

	  Modal.prototype.adjustDialog = function () {
	    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight
		var clientHeight = $(window).height() ;
	    var height = this.$dialog.height() ;
	    var top = (clientHeight -height)/2 -50 ;
	    this.$element.css({
	      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
	      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : '',
	      top:top+"px"
	    });
	  }

	  Modal.prototype.resetAdjustments = function () {
	    this.$element.css({
	      paddingLeft: '',
	      paddingRight: '',
	      top:''
	    })
	  }

	  Modal.prototype.checkScrollbar = function () {
	    var fullWindowWidth = window.innerWidth
	    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
	      var documentElementRect = document.documentElement.getBoundingClientRect()
	      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
	    }
	    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
	    this.scrollbarWidth = this.measureScrollbar()
	  }

	  Modal.prototype.setScrollbar = function () {
	    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
	    this.originalBodyPad = document.body.style.paddingRight || ''
	    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
	  }

	  Modal.prototype.resetScrollbar = function () {
	    this.$body.css('padding-right', this.originalBodyPad)
	  }

	  Modal.prototype.measureScrollbar = function () { // thx walsh
	    var scrollDiv = document.createElement('div')
	    scrollDiv.className = 'modal-scrollbar-measure'
	    this.$body.append(scrollDiv)
	    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
	    this.$body[0].removeChild(scrollDiv)
	    return scrollbarWidth
	  }


	  // MODAL PLUGIN DEFINITION
	  // =======================

	  function Plugin(option, _relatedTarget) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.modal')
	      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

	      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
	      if (typeof option == 'string') data[option](_relatedTarget)
	      else if (options.show) data.show(_relatedTarget)
	    })
	  }

	  var old = $.fn.modal

	  $.fn.modal             = Plugin
	  $.fn.modal.Constructor = Modal


	  // MODAL NO CONFLICT
	  // =================

	  $.fn.modal.noConflict = function () {
	    $.fn.modal = old
	    return this
	  }


	  // MODAL DATA-API
	  // ==============

	  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
	    var $this   = $(this)
	    var href    = $this.attr('href')
	    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
	    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

	    if ($this.is('a')) e.preventDefault()

	    $target.one('show.bs.modal', function (showEvent) {
	      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
	      $target.one('hidden.bs.modal', function () {
	        $this.is(':visible') && $this.trigger('focus')
	      })
	    })
	    Plugin.call($target, option, this)
	  })

	}(jQuery);

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) ;


/***/ }
/******/ ]);