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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//引入项目依赖的所有css文件
	var main = __webpack_require__(86) ;
	main.init() ;





/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var tui_core = __webpack_require__(47);
	module.exports = tui_core;


/***/ },
/* 47 */
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var tui_drag = __webpack_require__(49);
	module.exports = tui_drag;


/***/ },
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var tui_dialog = __webpack_require__(51);
	module.exports = tui_dialog;


/***/ },
/* 51 */
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
				height:height||150,
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

		//确认框2（‘确认框’增加一个取消按钮的回调函数支持）
		$.showTuiConfirmDialog2=function(message,sureCallback,cancelCallback,width,height,option){
			var opt={
				title:'确认',
				width:width||300,
				height:height||160,
				message:message,
				mode:'no_title_window',
				style:'confirm',
				onConfirm:sureCallback,
				onCancel : cancelCallback,
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/5/6.
	 */
	//require('./tui_validator.css') ;
	__webpack_require__(53) ;
	__webpack_require__(54) ;
	__webpack_require__(55) ;
	__webpack_require__(56) ;

/***/ },
/* 53 */
/***/ function(module, exports) {

	/*
	 * Metadata - jQuery plugin for parsing metadata from elements
	 *
	 * Copyright (c) 2006 John Resig, Yehuda Katz, J�örn Zaefferer, Paul McLanahan
	 *
	 * Dual licensed under the MIT and GPL licenses:
	 *   http://www.opensource.org/licenses/mit-license.php
	 *   http://www.gnu.org/licenses/gpl.html
	 * Download by http://www.codefans.net
	 * Revision: $Id: jquery.metadata.js 3640 2007-10-11 18:34:38Z pmclanahan $
	 *
	 */

	/**
	 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
	 * in the JSON will become a property of the element itself.
	 *
	 * There are four supported types of metadata storage:
	 *
	 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
	 *          
	 *   class: Inside the class attribute, wrapped in curly braces: { }
	 *   
	 *   elem:  Inside a child element (e.g. a script tag). The
	 *          name parameter indicates *which* element.
	 *   html5: Values are stored in data-* attributes.
	 *          
	 * The metadata for an element is loaded the first time the element is accessed via jQuery.
	 *
	 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
	 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
	 * 
	 * @name $.metadata.setType
	 *
	 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
	 * @before $.metadata.setType("class")
	 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
	 * @desc Reads metadata from the class attribute
	 * 
	 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
	 * @before $.metadata.setType("attr", "data")
	 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
	 * @desc Reads metadata from a "data" attribute
	 * 
	 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
	 * @before $.metadata.setType("elem", "script")
	 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
	 * @desc Reads metadata from a nested script element
	 * 
	 * @example <p id="one" class="some_class" data-item_id="1" data-item_label="Label">This is a p</p>
	 * @before $.metadata.setType("html5")
	 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
	 * @desc Reads metadata from a series of data-* attributes
	 *
	 * @param String type The encoding type
	 * @param String name The name of the attribute to be used to get metadata (optional)
	 * @cat Plugins/Metadata
	 * @descr Sets the type of encoding to be used when loading metadata for the first time
	 * @type undefined
	 * @see metadata()
	 */

	(function($) {

	$.extend({
	  metadata : {
	    defaults : {
	      type: 'class',
	      name: 'metadata',
	      cre: /({.*})/,
	      single: 'metadata'
	    },
	    setType: function( type, name ){
	      this.defaults.type = type;
	      this.defaults.name = name;
	    },
	    get: function( elem, opts ){
	      var settings = $.extend({},this.defaults,opts);
	      // check for empty string in single property
	      if ( !settings.single.length ) settings.single = 'metadata';
	      
	      var data = $.data(elem, settings.single);
	      // returned cached data if it already exists
	      if ( data ) return data;
	      
	      data = "{}";
	      
	      var getData = function(data) {
	        if(typeof data != "string") return data;
	        
	        if( data.indexOf('{') < 0 ) {
	          data = eval("(" + data + ")");
	        }
	      }
	      
	      var getObject = function(data) {
	        if(typeof data != "string") return data;
	        
	        data = eval("(" + data + ")");
	        return data;
	      }
	      
	      if ( settings.type == "html5" ) {
	        var object = {};
	        $( elem.attributes ).each(function() {
	          var name = this.nodeName;
	          if(name.match(/^data-/)) name = name.replace(/^data-/, '');
	          else return true;
	          object[name] = getObject(this.nodeValue);
	        });
	      } else {
	        if ( settings.type == "class" ) {
	          var m = settings.cre.exec( elem.className );
	          if ( m )
	            data = m[1];
	        } else if ( settings.type == "elem" ) {
	          if( !elem.getElementsByTagName ) return;
	          var e = elem.getElementsByTagName(settings.name);
	          if ( e.length )
	            data = $.trim(e[0].innerHTML);
	        } else if ( elem.getAttribute != undefined ) {
	          var attr = elem.getAttribute( settings.name );
	          if ( attr )
	            data = attr;
	        }
	        object = getObject(data.indexOf("{") < 0 ? "{" + data + "}" : data);
	      }
	      
	      $.data( elem, settings.single, object );
	      return object;
	    }
	  }
	});

	/**
	 * Returns the metadata object for the first member of the jQuery object.
	 *
	 * @name metadata
	 * @descr Returns element's metadata object
	 * @param Object opts An object contianing settings to override the defaults
	 * @type jQuery
	 * @cat Plugins/Metadata
	 */
	$.fn.metadata = function( opts ){
	  return $.metadata.get( this[0], opts );
	};

	})(jQuery);

/***/ },
/* 54 */
/***/ function(module, exports) {

	/*!
	 * jQuery Validation Plugin v1.13.1
	 *
	 * http://jqueryvalidation.org/
	 *
	 * Copyright (c) 2014 Jörn Zaefferer
	 * Released under the MIT license
	 */
	(function( factory ) {
		/*if ( typeof define === "function" && define.amd ) {
			define( ["jquery"], factory );
		} else {
			factory( jQuery );
		}*/
		factory( jQuery );
	}(function( $ ) {

	$.extend($.fn, {
		// http://jqueryvalidation.org/validate/
		validate: function( options ) {
			// if nothing is selected, return nothing; can't chain anyway
			if ( !this.length ) {
				if ( options && options.debug && window.console ) {
					console.warn( "Nothing selected, can't validate, returning nothing." );
				}
				return;
			}
			// check if a validator for this form was already created
			var validator = $.data( this[ 0 ], "validator" );
			if ( validator ) {
				return validator;
			}
			// Add novalidate tag if HTML5.
			this.attr( "novalidate", "novalidate" );
			validator = new $.validator( options, this[ 0 ] );
			$.data( this[ 0 ], "validator", validator );
			if ( validator.settings.onsubmit ) {
				this.validateDelegate( ":submit", "click", function( event ) {
					if ( validator.settings.submitHandler ) {
						validator.submitButton = event.target;
					}
					// allow suppressing validation by adding a cancel class to the submit button
					if ( $( event.target ).hasClass( "cancel" ) ) {
						validator.cancelSubmit = true;
					}
					// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
					if ( $( event.target ).attr( "formnovalidate" ) !== undefined ) {
						validator.cancelSubmit = true;
					}
				});
				// validate the form on submit
				this.submit( function( event ) {
					if ( validator.settings.debug ) {
						// prevent form submit to be able to see console output
						event.preventDefault();
					}
					function handle() {
						var hidden, result;
						if ( validator.settings.submitHandler ) {
							if ( validator.submitButton ) {
								// insert a hidden input as a replacement for the missing submit button
								hidden = $( "<input type='hidden'/>" )
									.attr( "name", validator.submitButton.name )
									.val( $( validator.submitButton ).val() )
									.appendTo( validator.currentForm );
							}
							result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
							if ( validator.submitButton ) {
								// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
								hidden.remove();
							}
							if ( result !== undefined ) {
								return result;
							}
							return false;
						}
						return true;
					}
					// prevent submit for invalid forms or custom submit handlers
					if ( validator.cancelSubmit ) {
						validator.cancelSubmit = false;
						return handle();
					}
					if ( validator.form() ) {
						if ( validator.pendingRequest ) {
							validator.formSubmitted = true;
							return false;
						}
						return handle();
					} else {
						validator.focusInvalid();
						return false;
					}
				});
			}
			return validator;
		},//---------end validate

		// http://jqueryvalidation.org/valid/
		valid: function() {
			var valid, validator;
			if ( $( this[ 0 ] ).is( "form" ) ) {
				valid = this.validate().form();
			} else {
				valid = true;
				validator = $( this[ 0 ].form ).validate();
				this.each( function() {
					valid = validator.element( this ) && valid;
				});
			}
			return valid;
		},
		// attributes: space separated list of attributes to retrieve and remove
		removeAttrs: function( attributes ) {
			var result = {},
				$element = this;
			$.each( attributes.split( /\s/ ), function( index, value ) {
				result[ value ] = $element.attr( value );
				$element.removeAttr( value );
			});
			return result;
		},
		// http://jqueryvalidation.org/rules/
		rules: function( command, argument ) {
			var element = this[ 0 ],
				settings, staticRules, existingRules, data, param, filtered;

			if ( command ) {
				settings = $.data( element.form, "validator" ).settings;
				staticRules = settings.rules;
				existingRules = $.validator.staticRules( element );
				switch ( command ) {
				case "add":
					$.extend( existingRules, $.validator.normalizeRule( argument ) );
					// remove messages from rules, but allow them to be set separately
					delete existingRules.messages;
					staticRules[ element.name ] = existingRules;
					if ( argument.messages ) {
						settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
					}
					break;
				case "remove":
					if ( !argument ) {
						delete staticRules[ element.name ];
						return existingRules;
					}
					filtered = {};
					$.each( argument.split( /\s/ ), function( index, method ) {
						filtered[ method ] = existingRules[ method ];
						delete existingRules[ method ];
						if ( method === "required" ) {
							$( element ).removeAttr( "aria-required" );
						}
					});
					return filtered;
				}
			}
			//下面这段校验被定制为不从html5的data-xxx校验规则，以及不使用属性校验规则
			//oc中仅仅使用class校验
			data = $.validator.normalizeRules(
			$.extend(
				{},
				$.validator.metadataRules( element ),
				$.validator.classRules( element ),
				/*$.validator.attributeRules( element ),*/
				/*$.validator.dataRules( element ),*/
				$.validator.staticRules( element )
			), element );

			// make sure required is at front
			if ( data.required ) {
				param = data.required;
				delete data.required;
				data = $.extend( { required: param }, data );
				$( element ).attr( "aria-required", "true" );
			}

			// make sure remote is at back
			if ( data.remote ) {
				param = data.remote;
				delete data.remote;
				data = $.extend( data, { remote: param });
			}

			return data;
		}//-----end rules
	});

	// Custom selectors
	$.extend( $.expr[ ":" ], {
		// http://jqueryvalidation.org/blank-selector/
		blank: function( a ) {
			return !$.trim( "" + $( a ).val() );
		},
		// http://jqueryvalidation.org/filled-selector/
		filled: function( a ) {
			return !!$.trim( "" + $( a ).val() );
		},
		// http://jqueryvalidation.org/unchecked-selector/
		unchecked: function( a ) {
			return !$( a ).prop( "checked" );
		}
	});

	// constructor for validator
	$.validator = function( options, form ) {
		this.settings = $.extend( true, {}, $.validator.defaults, options );
		this.currentForm = form;
		this.init();
	};

	// http://jqueryvalidation.org/jQuery.validator.format/
	$.validator.format = function( source, params ) {
		if ( arguments.length === 1 ) {
			return function() {
				var args = $.makeArray( arguments );
				args.unshift( source );
				return $.validator.format.apply( this, args );
			};
		}
		if ( arguments.length > 2 && params.constructor !== Array  ) {
			params = $.makeArray( arguments ).slice( 1 );
		}
		if ( params.constructor !== Array ) {
			params = [ params ];
		}
		$.each( params, function( i, n ) {
			source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
				return n;
			});
		});
		return source;
	};//-----end format

	$.extend( $.validator, {

		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: "error",
			validClass: "valid",
			errorElement: "label",
			focusCleanup: false,
			focusInvalid: true,
			errorContainer: $( [] ),
			errorLabelContainer: $( [] ),
			onsubmit: true,
			ignore: ":hidden",
			ignoreTitle: false,
			onfocusin: function( element ) {
				this.lastActive = element;
				// Hide error label and remove error class on focus if enabled
				if ( this.settings.focusCleanup ) {
					if ( this.settings.unhighlight ) {
						this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
					}
					this.hideThese( this.errorsFor( element ) );
				}
			},
			onfocusout: function( element ) {
				/*if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
					this.element( element );
				}*/
				this.element( element );
			},
			onkeyup: function( element, event ) {
				if ( event.which === 9 && this.elementValue( element ) === "" ) {
					return;
				} else if ( element.name in this.submitted || element === this.lastElement ) {
					this.element( element );
				}
			},
			onclick: function( element ) {
				// click on selects, radiobuttons and checkboxes
				if ( element.name in this.submitted ) {
					this.element( element );

				// or option elements, check parent select in that case
				} else if ( element.parentNode.name in this.submitted ) {
					this.element( element.parentNode );
				}
			},
			highlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
				} else {
					$( element ).addClass( errorClass ).removeClass( validClass );
				}
			},
			unhighlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
				} else {
					$( element ).removeClass( errorClass ).addClass( validClass );
				}
			}
		},//----end defaults

		// http://jqueryvalidation.org/jQuery.validator.setDefaults/
		setDefaults: function( settings ) {
			$.extend( $.validator.defaults, settings );
		},

		messages: {
			required: "This field is required.",
			remote: "Please fix this field.",
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date.",
			dateISO: "Please enter a valid date ( ISO ).",
			number: "Please enter a valid number.",
			digits: "Please enter only digits.",
			creditcard: "Please enter a valid credit card number.",
			equalTo: "Please enter the same value again.",
			maxlength: $.validator.format( "Please enter no more than {0} characters." ),
			minlength: $.validator.format( "Please enter at least {0} characters." ),
			rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
			range: $.validator.format( "Please enter a value between {0} and {1}." ),
			max: $.validator.format( "Please enter a value less than or equal to {0}." ),
			min: $.validator.format( "Please enter a value greater than or equal to {0}." )
		},//------end messages

		autoCreateRanges: false,

		prototype: {

			init: function() {
				this.labelContainer = $( this.settings.errorLabelContainer );
				this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
				this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();

				var groups = ( this.groups = {} ),
					rules;
				$.each( this.settings.groups, function( key, value ) {
					if ( typeof value === "string" ) {
						value = value.split( /\s/ );
					}
					$.each( value, function( index, name ) {
						groups[ name ] = key;
					});
				});
				rules = this.settings.rules;
				$.each( rules, function( key, value ) {
					rules[ key ] = $.validator.normalizeRule( value );
				});

				function delegate( event ) {
					var validator = $.data( this[ 0 ].form, "validator" ),
						eventType = "on" + event.type.replace( /^validate/, "" ),
						settings = validator.settings;
					if ( settings[ eventType ] && !this.is( settings.ignore ) ) {
						settings[ eventType ].call( validator, this[ 0 ], event );
					}
				}
				$( this.currentForm )
					.validateDelegate( ":text, [type='password'], [type='file'], select, textarea, " +
						"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
						"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], " +
						"[type='range'], [type='color'], [type='radio'], [type='checkbox']",
						"focusin focusout keyup", delegate)
					// Support: Chrome, oldIE
					// "select" is provided as event.target when clicking a option
					.validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate);

				if ( this.settings.invalidHandler ) {
					$( this.currentForm ).bind( "invalid-form.validate", this.settings.invalidHandler );
				}

				// Add aria-required to any Static/Data/Class required fields before first validation
				// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
				$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
			},//-----------init end

			// http://jqueryvalidation.org/Validator.form/
			form: function() {//
				this.checkForm();
				$.extend( this.submitted, this.errorMap );
				this.invalid = $.extend({}, this.errorMap );
				if ( !this.valid() ) {
					$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
				}
				this.showErrors();
				return this.valid();//判断this.errorList.length ===0
			},

			checkForm: function() {
				this.prepareForm();
				for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
					this.check( elements[ i ] );
				}
				return this.valid();//判断errorList.length ===0
			},

			// http://jqueryvalidation.org/Validator.element/
			element: function( element ) {
				var cleanElement = this.clean( element ),
					checkElement = this.validationTargetFor( cleanElement ),
					result = true;

				this.lastElement = checkElement;

				if ( checkElement === undefined ) {
					delete this.invalid[ cleanElement.name ];
				} else {
					this.prepareElement( checkElement );
					this.currentElements = $( checkElement );

					result = this.check( checkElement ) !== false;
					if ( result ) {
						delete this.invalid[ checkElement.name ];
					} else {
						this.invalid[ checkElement.name ] = true;
					}
				}
				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !result );

				if ( !this.numberOfInvalids() ) {
					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();
				return result;
			},//------end element

			// http://jqueryvalidation.org/Validator.showErrors/
			showErrors: function( errors ) {
				if ( errors ) {
					// add items to error list and map
					$.extend( this.errorMap, errors );
					this.errorList = [];
					for ( var name in errors ) {
						this.errorList.push({
							message: errors[ name ],
							element: this.findByName( name )[ 0 ]
						});
					}
					// remove items from success list
					this.successList = $.grep( this.successList, function( element ) {
						return !( element.name in errors );
					});
				}
				if ( this.settings.showErrors ) {
					this.settings.showErrors.call( this, this.errorMap, this.errorList );
				} else {
					this.defaultShowErrors();
				}
			},//---------end showErrors

			// http://jqueryvalidation.org/Validator.resetForm/
			resetForm: function() {
				if ( $.fn.resetForm ) {
					$( this.currentForm ).resetForm();
				}
				this.submitted = {};
				this.lastElement = null;
				this.prepareForm();
				this.hideErrors();
				this.elements()
						.removeClass( this.settings.errorClass )
						.removeData( "previousValue" )
						.removeAttr( "aria-invalid" );
			},

			numberOfInvalids: function() {
				return this.objectLength( this.invalid );
			},

			objectLength: function( obj ) {
				/* jshint unused: false */
				var count = 0,
					i;
				for ( i in obj ) {
					count++;
				}
				return count;
			},

			hideErrors: function() {
				this.hideThese( this.toHide );
			},

			hideThese: function( errors ) {
				errors.not( this.containers ).text( "" );
				this.addWrapper( errors ).hide();
			},

			valid: function() {
				return this.size() === 0;
			},

			size: function() {
				return this.errorList.length;
			},

			focusInvalid: function() {
				if ( this.settings.focusInvalid ) {
					try {
						$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
						.filter( ":visible" )
						.focus()
						// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
						.trigger( "focusin" );
					} catch ( e ) {
						// ignore IE throwing errors when focusing hidden elements
					}
				}
			},

			findLastActive: function() {
				var lastActive = this.lastActive;
				return lastActive && $.grep( this.errorList, function( n ) {
					return n.element.name === lastActive.name;
				}).length === 1 && lastActive;
			},

			elements: function() {
				var validator = this,
					rulesCache = {};
				// select all valid inputs inside the form (no submit or reset buttons)
				return $( this.currentForm )
				.find( "input, select, textarea" )
				.not( ":submit, :reset, :image, [disabled], [readonly]" )
				.not( this.settings.ignore )
				.filter( function() {
					if ( !this.name && validator.settings.debug && window.console ) {
						console.error( "%o has no name assigned", this );
					}

					// select only the first element for each name, and only those with rules specified
					if ( this.name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
						return false;
					}

					rulesCache[ this.name ] = true;
					return true;
				});
			},//----end elements

			clean: function( selector ) {
				return $( selector )[ 0 ];
			},

			errors: function() {
				var errorClass = this.settings.errorClass.split( " " ).join( "." );
				var tmpStr = this.settings.errorElement + "." + errorClass ;
				var tmpErrorContext = this.errorContext ;//整个form元素
				//console.info(tmpStr) ;//label.error//
				//console.info(tmpErrorContext) ;
				var tmpErrors = $( tmpStr, tmpErrorContext) ;
				//console.info(tmpErrors) ;
				return  tmpErrors;
			},

			reset: function() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = $( [] );
				this.toHide = $( [] );
				this.currentElements = $( [] );
			},

			prepareForm: function() {
				this.reset();
				this.toHide = this.errors().add( this.containers );
			},

			prepareElement: function( element ) {
				this.reset();
				this.toHide = this.errorsFor( element );
			},

			elementValue: function( element ) {
				var val,
					$element = $( element ),
					type = element.type;

				if ( type === "radio" || type === "checkbox" ) {
					return $( "input[name='" + element.name + "']:checked" ).val();
				} else if ( type === "number" && typeof element.validity !== "undefined" ) {
					return element.validity.badInput ? false : $element.val();
				}

				val = $element.val();
				if ( typeof val === "string" ) {
					return val.replace(/\r/g, "" );
				}
				return val;
			},//-------end elementValue

			check: function( element ) {
				element = this.validationTargetFor( this.clean( element ) );

				var rules = $( element ).rules(),
					rulesCount = $.map( rules, function( n, i ) {
						return i;
					}).length,
					dependencyMismatch = false,
					val = this.elementValue( element ),
					result, method, rule;

				for ( method in rules ) {
					rule = { method: method, parameters: rules[ method ] };
					try {

						result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

						// if a method indicates that the field is optional and therefore valid,
						// don't mark it as valid when there are no other rules
						if ( result === "dependency-mismatch" && rulesCount === 1 ) {
							dependencyMismatch = true;
							continue;
						}
						dependencyMismatch = false;

						if ( result === "pending" ) {
							this.toHide = this.toHide.not( this.errorsFor( element ) );
							return;
						}

						if ( !result ) {
							this.formatAndAdd( element, rule );
							return false;
						}
					} catch ( e ) {
						if ( this.settings.debug && window.console ) {
							console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
						}
						throw e;
					}
				}
				if ( dependencyMismatch ) {
					return;
				}
				if ( this.objectLength( rules ) ) {
					this.successList.push( element );
				}
				return true;
			},//------end check

			// return the custom message for the given element and validation method
			// specified in the element's HTML5 data attribute
			// return the generic message if present and no method specific message is present
			customDataMessage: function( element, method ) {
				return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
					method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
			},

			// return the custom message for the given element name and validation method
			customMessage: function( name, method ) {
				var m = this.settings.messages[ name ];
				return m && ( m.constructor === String ? m : m[ method ]);
			},

			// return the first defined argument, allowing empty strings
			findDefined: function() {
				for ( var i = 0; i < arguments.length; i++) {
					if ( arguments[ i ] !== undefined ) {
						return arguments[ i ];
					}
				}
				return undefined;
			},

			defaultMessage: function( element, method ) {
				return this.findDefined(
					this.customMessage( element.name, method ),
					this.customDataMessage( element, method ),
					// title is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				);
			},

			formatAndAdd: function( element, rule ) {
				var message = this.defaultMessage( element, rule.method ),
					theregex = /\$?\{(\d+)\}/g;
				if ( typeof message === "function" ) {
					message = message.call( this, rule.parameters, element );
				} else if ( theregex.test( message ) ) {
					message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
				}
				this.errorList.push({
					message: message,
					element: element,
					method: rule.method
				});

				this.errorMap[ element.name ] = message;
				this.submitted[ element.name ] = message;
			},

			addWrapper: function( toToggle ) {
				if ( this.settings.wrapper ) {
					toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
				}
				return toToggle;
			},

			defaultShowErrors: function() {
				var i, elements, error;
				for ( i = 0; this.errorList[ i ]; i++ ) {
					error = this.errorList[ i ];
					if ( this.settings.highlight ) {
						this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
					}
					this.showLabel( error.element, error.message );
				}
				if ( this.errorList.length ) {
					this.toShow = this.toShow.add( this.containers );
				}
				if ( this.settings.success ) {
					for ( i = 0; this.successList[ i ]; i++ ) {
						this.showLabel( this.successList[ i ] );
					}
				}
				if ( this.settings.unhighlight ) {
					for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
						this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
					}
				}
				this.toHide = this.toHide.not( this.toShow );
				this.hideErrors();
				this.addWrapper( this.toShow ).show();
			},//----------end defaultShowErrors

			validElements: function() {
				return this.currentElements.not( this.invalidElements() );
			},

			invalidElements: function() {
				return $( this.errorList ).map(function() {
					return this.element;
				});
			},

			showLabel: function( element, message ) {//其中element为form中的表单组件
				var place, group, errorID,
					error = this.errorsFor( element ),
					elementID = this.idOrName( element ),
					describedBy = $( element ).attr( "aria-describedby" );
				//需要注意的地方，以前的validate，当校验过后，那个错误的label会一直存在，如果再次校验通过，则会把lable的html内容情况但是label还是存在的，
				//这样页面上的一行如果有两个控件如:最大值--最小值,则第二个校验错误显示就有问题
				//现在的方法是把之前的label移除document，然后全部都当新加
				var oldFlag =  error.length  ;
				//oldFlag = false;
				if (oldFlag) {
					// refresh error/success class
					error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
					// replace message on existing label
					error.html( message );
				} else {//新增
					// create error element
					error = $( "<" + this.settings.errorElement + ">" )
						.attr( "id", elementID + "-error" )
						.addClass( this.settings.errorClass )
						.html( message || "" );
					// Maintain reference to the element to be placed into the DOM
					place = error;
					if ( this.settings.wrapper ) {
						// make sure the element is visible, even in IE
						// actually showing the wrapped element is handled elsewhere
						place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
					}

					if ( this.labelContainer.length ) {
						this.labelContainer.append( place );
					} else if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement( place, $( element ) );
					} else {
						//var parent = $(element).parent() ;
						//parent.find("label.error").remove() ;
						//把父节点中的所有错误信息清除
						//place.insertAfter( element );//这是以前的代码
						//修改为在父节点下面追加
						/*var children = parent.children() ;
					  	var last = children.last() ;
					  	var inputPosition=last.position();
						var belowTipLeft=inputPosition.left+last.innerWidth()+9;
						var hinput = last.innerHeight() ;
						var htip = place.innerHeight() ;
						var dnum = hinput/2-htip/2 ;
						//console.info("dnum : "+dnum) ;
						var belowTipTop=inputPosition.top + (dnum-8);
						// style="position: absolute; z-index: 10; width: auto; height: auto;"
						place.css({ "position": "absolute", "z-index": "10" ,"left":belowTipLeft,"top":belowTipTop}) ;
						parent.append(place) ;*/
						//下面修改为在本元素的后面显示
						var elementPosition = $(element).position() ;
						var pleft = elementPosition.left;
						var ptop = elementPosition.top ;
						var width = $(element).outerWidth() ;//p.outerWidth()
						var pright = pleft+ width+5 ;
						//console.info("pright :["+pright+"] ,ptop : ["+ptop+"]") ;
						place.css({ "position": "absolute", "z-index": "10" ,"left":pright,"top":ptop}) ;
						place.insertAfter( element );

					}
					// Link error back to the element
					if ( error.is( "label" ) ) {
						// If the error is a label, then associate using 'for'
						error.attr( "for", elementID );
					} else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
						// If the element is not a child of an associated label, then it's necessary
						// to explicitly apply aria-describedby
						errorID = error.attr( "id" ).replace( /(:|\.|\[|\])/g, "\\$1");
						// Respect existing non-error aria-describedby
						if ( !describedBy ) {
							describedBy = errorID;
						} else if ( !describedBy.match( new RegExp( "\\b" + errorID + "\\b" ) ) ) {
							// Add to end of list if not already present
							describedBy += " " + errorID;
						}
						$( element ).attr( "aria-describedby", describedBy );

						// If this element is grouped, then assign to all elements in the same group
						group = this.groups[ element.name ];
						if ( group ) {
							$.each( this.groups, function( name, testgroup ) {
								if ( testgroup === group ) {
									$( "[name='" + name + "']", this.currentForm )
										.attr( "aria-describedby", error.attr( "id" ) );
								}
							});
						}
					}
				}
				//修改
				//error.prepend('<span class="errorIcon">!</span>') ;
				if ( !message && this.settings.success ) {
					error.text( "" );
					if ( typeof this.settings.success === "string" ) {
						error.addClass( this.settings.success );
					} else {
						this.settings.success( error, element );
					}
				}
				this.toShow = this.toShow.add( error );
			},//------end showLabel
			errorsFor: function( element ) {
				var name = this.idOrName( element );
				//console.info(name) ;//对应的form input的name或id
				var	describer = $( element ).attr( "aria-describedby" );
				//console.info(describer) ;//undefined
				var selector = "label[for='" + name + "'], label[for='" + name + "'] *";
				//console.info(selector) ;
				// aria-describedby should directly reference the error element
				if ( describer ) {
					selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
				}
				//console.info(selector) ;
				var curErr = this.errors().filter( selector );
				//console.info(curErr) ;
				return curErr ;
			},

			idOrName: function( element ) {
				return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
			},

			validationTargetFor: function( element ) {

				// If radio/checkbox, validate first element in group instead
				if ( this.checkable( element ) ) {
					element = this.findByName( element.name );
				}

				// Always apply ignore filter
				return $( element ).not( this.settings.ignore )[ 0 ];
			},

			checkable: function( element ) {//
				var tmpType = element.type ;
				var flag = ( /radio|checkbox/i ).test(tmpType);
				//console.info("tmpType : " + tmpType + " flag : " + flag) ;
				return flag ;
			},

			findByName: function( name ) {
				return $( this.currentForm ).find( "[name='" + name + "']" );
			},

			getLength: function( value, element ) {
				switch ( element.nodeName.toLowerCase() ) {
				case "select":
					return $( "option:selected", element ).length;
				case "input":
					if ( this.checkable( element ) ) {
						return this.findByName( element.name ).filter( ":checked" ).length;
					}
				}
				return value.length;
			},

			depend: function( param, element ) {
				return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
			},

			dependTypes: {
				"boolean": function( param ) {
					return param;
				},
				"string": function( param, element ) {
					return !!$( param, element.form ).length;
				},
				"function": function( param, element ) {
					return param( element );
				}
			},

			optional: function( element ) {//获得值，然后调用required方法并取反，即:如果验证通过则返回false,如果未通过返回‘dependency-mismatch’
				var val = this.elementValue( element );//取得值
				var fff = $.validator.methods.required.call( this, val, element ) ;
				//console.info('fff : ' + fff) ;
				return !fff && "dependency-mismatch";
			},

			startRequest: function( element ) {
				if ( !this.pending[ element.name ] ) {
					this.pendingRequest++;
					this.pending[ element.name ] = true;
				}
			},

			stopRequest: function( element, valid ) {
				this.pendingRequest--;
				// sometimes synchronization fails, make sure pendingRequest is never < 0
				if ( this.pendingRequest < 0 ) {
					this.pendingRequest = 0;
				}
				delete this.pending[ element.name ];
				if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
					$( this.currentForm ).submit();
					this.formSubmitted = false;
				} else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
					$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
					this.formSubmitted = false;
				}
			},//------end stopRequest

			previousValue: function( element ) {
				return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
					old: null,
					valid: true,
					message: this.defaultMessage( element, "remote" )
				});
			}

		},//------prototype

		classRuleSettings: {
			required: { required: true },
			email: { email: true },
			url: { url: true },
			date: { date: true },
			dateISO: { dateISO: true },
			number: { number: true },
			digits: { digits: true },
			creditcard: { creditcard: true }
		},

		addClassRules: function( className, rules ) {
			if ( className.constructor === String ) {
				this.classRuleSettings[ className ] = rules;
			} else {
				$.extend( this.classRuleSettings, className );
			}
		},

		classRules: function( element ) {
			var rules = {},
				classes = $( element ).attr( "class" );

			if ( classes ) {
				$.each( classes.split( " " ), function() {
					if ( this in $.validator.classRuleSettings ) {
						//{email: true}加到rules中去
						$.extend( rules, $.validator.classRuleSettings[ this ]);
					}
				});
			}
			return rules;
		},

		attributeRules: function( element ) {
			var rules = {},
				$element = $( element ),
				type = element.getAttribute( "type" ),
				method, value;

			for ( method in $.validator.methods ) {//遍历所有预定义好的校验方式eg:email ,require.....

				// support for <input required> in both html5 and older browsers
				if ( method === "required" ) {
					value = element.getAttribute( method );
					// Some browsers return an empty string for the required attribute
					// and non-HTML5 browsers might have required="" markup
					if ( value === "" ) {
						value = true;
					}
					// force non-HTML5 browsers to return bool
					value = !!value;
				} else {
					value = $element.attr( method );
				}

				// convert the value to a number for number inputs, and for text for backwards compability
				// allows type="date" and others to be compared as strings
				if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
					value = Number( value );
				}

				if ( value || value === 0 ) {
					rules[ method ] = value;
				} else if ( type === method && type !== "range" ) {
					// exception: the jquery validate 'range' method
					// does not test for the html5 'range' type
					rules[ method ] = true;
				}
			}

			// maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
			if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
				delete rules.maxlength;
			}

			return rules;
		},//-----end attributeRules

		dataRules: function( element ) {
			var method, value,
				rules = {}, $element = $( element );
			for ( method in $.validator.methods ) {
				value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
				if ( value !== undefined ) {
					rules[ method ] = value;
				}
			}
			return rules;
		},
		metadataRules: function(element) {
			if (!$.metadata) return {};
			var meta = $.data(element.form, 'validator').settings.meta;
			return meta ?
				$(element).metadata()[meta] :
				$(element).metadata();
		},
		staticRules: function( element ) {
			var rules = {},
				validator = $.data( element.form, "validator" );

			if ( validator.settings.rules ) {
				rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
			}
			return rules;
		},

		normalizeRules: function( rules, element ) {
			// handle dependency check
			$.each( rules, function( prop, val ) {
				// ignore rule when param is explicitly false, eg. required:false
				if ( val === false ) {
					delete rules[ prop ];
					return;
				}
				if ( val.param || val.depends ) {
					var keepRule = true;
					switch ( typeof val.depends ) {
					case "string":
						keepRule = !!$( val.depends, element.form ).length;
						break;
					case "function":
						keepRule = val.depends.call( element, element );
						break;
					}
					if ( keepRule ) {
						rules[ prop ] = val.param !== undefined ? val.param : true;
					} else {
						delete rules[ prop ];
					}
				}
			});

			// evaluate parameters
			$.each( rules, function( rule, parameter ) {
				rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
			});

			// clean number parameters
			$.each([ "minlength", "maxlength" ], function() {
				if ( rules[ this ] ) {
					rules[ this ] = Number( rules[ this ] );
				}
			});
			$.each([ "rangelength", "range" ], function() {
				var parts;
				if ( rules[ this ] ) {
					if ( $.isArray( rules[ this ] ) ) {
						rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
					} else if ( typeof rules[ this ] === "string" ) {
						parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
						rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
					}
				}
			});

			if ( $.validator.autoCreateRanges ) {
				// auto-create ranges
				if ( rules.min != null && rules.max != null ) {
					rules.range = [ rules.min, rules.max ];
					delete rules.min;
					delete rules.max;
				}
				if ( rules.minlength != null && rules.maxlength != null ) {
					rules.rangelength = [ rules.minlength, rules.maxlength ];
					delete rules.minlength;
					delete rules.maxlength;
				}
			}

			return rules;
		},//------end normalizeRules

		// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
		normalizeRule: function( data ) {
			if ( typeof data === "string" ) {
				var transformed = {};
				$.each( data.split( /\s/ ), function() {
					transformed[ this ] = true;
				});
				data = transformed;
			}
			return data;
		},

		// http://jqueryvalidation.org/jQuery.validator.addMethod/
		addMethod: function( name, method, message ) {
			$.validator.methods[ name ] = method;
			$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
			if ( method.length < 3 ) {
				$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
			}
		},

		methods: {
			// http://jqueryvalidation.org/required-method/
			required: function( value, element, param ) {
				// check if dependency is met
				if ( !this.depend( param, element ) ) {
					return "dependency-mismatch";
				}
				if ( element.nodeName.toLowerCase() === "select" ) {
					// could be an array for select-multiple or a string, both are fine this way
					var val = $( element ).val();
					return val && val.length > 0;
				}
				if ( this.checkable( element ) ) {
					return this.getLength( value, element ) > 0;
				}
				return $.trim( value ).length > 0;
			},

			// http://jqueryvalidation.org/email-method/
			email: function( value, element ) {
				// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
				// Retrieved 2014-01-14
				// If you have a problem with this implementation, report a bug against the above spec
				// Or use custom methods to implement your own email validation
				return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
			},

			// http://jqueryvalidation.org/url-method/
			url: function( value, element ) {
				// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
				return this.optional( element ) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( value );
			},

			// http://jqueryvalidation.org/date-method/
			date: function( value, element ) {
				return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
			},

			// http://jqueryvalidation.org/dateISO-method/
			dateISO: function( value, element ) {
				return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
			},

			// http://jqueryvalidation.org/number-method/
			number: function( value, element ) {
				return this.optional( element ) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
			},

			// http://jqueryvalidation.org/digits-method/
			digits: function( value, element ) {
				return this.optional( element ) || /^\d+$/.test( value );
			},

			// http://jqueryvalidation.org/creditcard-method/
			// based on http://en.wikipedia.org/wiki/Luhn/
			creditcard: function( value, element ) {
				if ( this.optional( element ) ) {
					return "dependency-mismatch";
				}
				// accept only spaces, digits and dashes
				if ( /[^0-9 \-]+/.test( value ) ) {
					return false;
				}
				var nCheck = 0,
					nDigit = 0,
					bEven = false,
					n, cDigit;

				value = value.replace( /\D/g, "" );

				// Basing min and max length on
				// http://developer.ean.com/general_info/Valid_Credit_Card_Types
				if ( value.length < 13 || value.length > 19 ) {
					return false;
				}

				for ( n = value.length - 1; n >= 0; n--) {
					cDigit = value.charAt( n );
					nDigit = parseInt( cDigit, 10 );
					if ( bEven ) {
						if ( ( nDigit *= 2 ) > 9 ) {
							nDigit -= 9;
						}
					}
					nCheck += nDigit;
					bEven = !bEven;
				}

				return ( nCheck % 10 ) === 0;
			},

			// http://jqueryvalidation.org/minlength-method/
			minlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || length >= param;
			},

			// http://jqueryvalidation.org/maxlength-method/
			maxlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || length <= param;
			},

			// http://jqueryvalidation.org/rangelength-method/
			rangelength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
			},

			// http://jqueryvalidation.org/min-method/
			min: function( value, element, param ) {
				return this.optional( element ) || value >= param;
			},

			// http://jqueryvalidation.org/max-method/
			max: function( value, element, param ) {
				return this.optional( element ) || value <= param;
			},

			// http://jqueryvalidation.org/range-method/
			range: function( value, element, param ) {
				return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
			},

			// http://jqueryvalidation.org/equalTo-method/
			equalTo: function( value, element, param ) {
				// bind to the blur event of the target in order to revalidate whenever the target field is updated
				// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
				var target = $( param );
				if ( this.settings.onfocusout ) {
					target.unbind( ".validate-equalTo" ).bind( "blur.validate-equalTo", function() {
						$( element ).valid();
					});
				}
				return value === target.val();
			},

			// http://jqueryvalidation.org/remote-method/
			remote: function( value, element, param ) {
				if ( this.optional( element ) ) {
					return "dependency-mismatch";
				}

				var previous = this.previousValue( element ),
					validator, data;

				if (!this.settings.messages[ element.name ] ) {
					this.settings.messages[ element.name ] = {};
				}
				previous.originalMessage = this.settings.messages[ element.name ].remote;
				this.settings.messages[ element.name ].remote = previous.message;

				param = typeof param === "string" && { url: param } || param;

				if ( previous.old === value ) {
					return previous.valid;
				}

				previous.old = value;
				validator = this;
				this.startRequest( element );
				data = {};
				data[ element.name ] = value;
				$.ajax( $.extend( true, {
					url: param,
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					context: validator.currentForm,
					success: function( response ) {
						var valid = response === true || response === "true",
							errors, message, submitted;

						validator.settings.messages[ element.name ].remote = previous.originalMessage;
						if ( valid ) {
							submitted = validator.formSubmitted;
							validator.prepareElement( element );
							validator.formSubmitted = submitted;
							validator.successList.push( element );
							delete validator.invalid[ element.name ];
							validator.showErrors();
						} else {
							errors = {};
							message = response || validator.defaultMessage( element, "remote" );
							errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
							validator.invalid[ element.name ] = true;
							validator.showErrors( errors );
						}
						previous.valid = valid;
						validator.stopRequest( element, valid );
					}
				}, param ) );
				return "pending";
			}

		}//--------end methods

	});//-----end validator

	$.format = function deprecated() {
		throw "$.format has been deprecated. Please use $.validator.format instead.";
	};

	// ajax mode: abort
	// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
	// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

	var pendingRequests = {},
		ajax;
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function( settings, _, xhr ) {
			var port = settings.port;
			if ( settings.mode === "abort" ) {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		ajax = $.ajax;
		$.ajax = function( settings ) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if ( mode === "abort" ) {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = ajax.apply(this, arguments);
				return pendingRequests[port];
			}
			return ajax.apply(this, arguments);
		};
	}

	// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
	// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target

	$.extend($.fn, {
		//this.validateDelegate( ":submit", "click", function( event ))
		validateDelegate: function( delegate, type, handler ) {
			return this.bind(type, function( event ) {
				var target = $(event.target);
				if ( target.is(delegate) ) {
					return handler.apply(target, arguments);
				}
			});
		}
	});

	}));


/***/ },
/* 55 */
/***/ function(module, exports) {

	(function( factory ) {
		/*if ( typeof define === "function" && define.amd ) {
			define( ["jquery", "../jquery.validate"], factory );
		} else {
			factory( jQuery );
		}*/
		factory( jQuery );
	}(function( $ ) {

	/*
	 * Translated default messages for the jQuery validation plugin.
	 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
	 */
	$.extend($.validator.messages, {
		required: "这是必填字段",
		remote: "请修正此字段",
		email: "请输入有效的电子邮件地址",
		url: "请输入有效的网址",
		date: "请输入有效的日期",
		dateISO: "请输入有效的日期 (YYYY-MM-DD)",
		number: "请输入有效的数字",
		digits: "只能输入数字",
		creditcard: "请输入有效的信用卡号码",
		equalTo: "你的输入不相同",
		extension: "请输入有效的后缀",
		maxlength: $.validator.format("最多可以输入 {0} 个字符"),
		minlength: $.validator.format("最少要输入 {0} 个字符"),
		rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
		range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
		max: $.validator.format("请输入不大于 {0} 的数值"),
		min: $.validator.format("请输入不小于 {0} 的数值"),
		alphanumeric:'请输入字母、数字和下划线的组合(半角)',
	});

	}));

/***/ },
/* 56 */
/***/ function(module, exports) {

	/*!
	 * jQuery Validation Plugin v1.14.0
	 *
	 * http://jqueryvalidation.org/
	 *
	 * Copyright (c) 2015 Jörn Zaefferer
	 * Released under the MIT license
	 */
	(function( factory ) {
		/*if ( typeof define === "function" && define.amd ) {
			define( ["jquery", "./jquery.validate"], factory );
		} else {
			factory( jQuery );
		}*/
		factory( jQuery );
	}(function( $ ) {
		(function() {
			function stripHtml(value) {
				// remove html tags and space chars
				return value.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
				// remove punctuation
				.replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "");
			}
			$.validator.addMethod("maxWords", function(value, element, params) {
				return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length <= params;
			}, $.validator.format("请输入最多 {0} 个字."));
			$.validator.addMethod("minWords", function(value, element, params) {
				return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
			}, $.validator.format("请输入最少 {0} 个字."));
			$.validator.addMethod("rangeWords", function(value, element, params) {
				var valueStripped = stripHtml(value),
					regex = /\b\w+\b/g;
				return this.optional(element) || valueStripped.match(regex).length >= params[0] && valueStripped.match(regex).length <= params[1];
			}, $.validator.format("请输入 {0} 到 {1} 个字."));
		}());
		
		
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

		var getDate = function (str) {
			var strs = str.split('-');
			var year = strs[0];
			var month = strs[1];
			var day = strs[2];
			return new Date(year, month-1, day);
		};
		// TODO check if value starts with <, otherwise don't try stripping anything
		
		$.validator.addMethod("zeorOrOtherNum", function(value, element) {
			return this.optional(element) || /^[1-9]{0,}$|^[0]{1}$/.test(value) ;
		}, "除0外的其他值可多选。");
		
		//兑换仓位的特殊校验eg:/A/B/C/
		$.validator.addMethod("allowedRbd", function(value, element) {
			return this.optional(element) || /^[A-Za-z0-9\/]{0,}$/i.test(value);
		}, "格式不正确eg:/A/B/C/");
		
		$.validator.addMethod("strippedminlength", function(value, element, param) {
			return $(value).text().length >= param;
		}, $.validator.format("请输入至少 {0} 个字符"));

		$.validator.addMethod("integer", function(value, element) {
			return this.optional(element) || /^-?\d+$/.test(value);
		}, "请输入整数");

		$.validator.addMethod("positiveInteger", function(value, element) {
			return this.optional(element) || /^[1-9]{1}[0-9]{0,}$/.test(value);
		}, "请输入正整数");
		
		$.validator.addMethod("nonNegativeInteger", function(value, element) {
			return this.optional(element) || /^[0-9]{0,}$/.test(value);
		}, "请输入非负整数");

		$.validator.addMethod("alphanumeric", function(value, element) {
			return this.optional(element) || /^\w+$/i.test(value);
		}, "请输入数字、字母、下划线");

		$.validator.addMethod("letter", function(value, element) {
			return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
		}, "请输入字母");

		$.validator.addMethod("lettersOrNumber", function(value, element) {
			return this.optional(element) || /^[A-Za-z0-9]{0,}$/i.test(value);
		}, "请输入字母、数字");
		//
		$.validator.addMethod("letterswithbasicpunc", function(value, element) {
			return this.optional(element) || /^[a-z\-.,()'"\s]+$/i.test(value);
		}, "请输入字母或标点符号");

		$.validator.addMethod("dateNL", function(value, element) {
			return this.optional(element) || /^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(value);
		}, $.validator.messages.date);
		
		$.validator.addMethod("dateOC", function(value, element) {
			return this.optional(element) || isLegalDate(value,true);//可以超过20年
		}, "请输入合法的日期yyyy-mm-dd");
		
		$.validator.addMethod("nowhitespace", function(value, element) {
			return this.optional(element) || /^\S+$/i.test(value);
		}, "不能输入空格");
		jQuery.validator.addMethod( "notEqualTo", function( value, element, param ) {
			return this.optional(element) || !$.validator.methods.equalTo.call( this, value, element, param );
		}, "请输入不同的值." );

		$.validator.addMethod("time", function(value, element) {
			return this.optional(element) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test(value);
		}, "请输入合法时间, 从00:00 到 23:59");

		$.validator.addMethod("time12h", function(value, element) {
			return this.optional(element) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(value);
		}, "请输入合法时间 0到12之间 am/pm");

		/**
		 * Dutch phone numbers have 10 digits (or 11 and start with +31).
		 */
		$.validator.addMethod("phoneNL", function(value, element) {
			return this.optional(element) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test(value);
		}, "请输入有效的电话号码.");
		$.validator.addMethod("mobileNL", function(value, element) {
			return this.optional(element) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test(value);
		}, "请输入有效的手机号");
		$.validator.addMethod("ipv4", function(value, element) {
			return this.optional(element) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
		}, "请输入合法的ipv4地址.");

		$.validator.addMethod("ipv6", function(value, element) {
			return this.optional(element) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value);
		}, "请输入合法的ipv6地址.");

		// same as url, but TLD is optional
		$.validator.addMethod("url2", function(value, element) {
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		}, $.validator.messages.url);


		/**下部分是oc特有定制的校验 start**/
		$.validator.addMethod("areacode", function(value, element) {
			return this.optional(element) || /^[1-3]{1}$/i.test(value);
		}, "请输入正确的大区代码");

		$.validator.addMethod("citycode", function(value, element) {
			return this.optional(element) || /^[A-Z]{3}$/i.test(value);
		}, "请输入正确的城市三字码");

		$.validator.addMethod("airportcode", function(value, element) {
			return this.optional(element) || /^[A-Z]{3}$/i.test(value);
		}, "请输入正确的机场三字码");

		$.validator.addMethod("countrycode", function(value, element) {
			return this.optional(element) || /^[A-Z]{2}$/i.test(value);
		}, "请输入正确的国家二字码");

		$.validator.addMethod("statecode", function(value, element) {
			return this.optional(element) || /^[A-Z]{2}$/i.test(value);
		}, "请输入正确的州二字码");

		$.validator.addMethod("zonecode", function(value, element) {
			return this.optional(element) || /^[0-9]{3}$/i.test(value);
		}, "请输入正确的区域代码");

		$.validator.addMethod("office", function(value, element) {
			return this.optional(element) || /^[A-Za-z0-9]{1,6}$/g.test(value);
		}, "限输入6位数字或字母");


		$.validator.addMethod("iatanum", function(value, element) {
			return this.optional(element) || /^[0-9]{1,8}$/i.test(value);
		}, "请输入正确的IATA号");
		
		$.validator.addMethod("air", function(value, element) {
			return this.optional(element) || /^[a-zA-Z]{2}$|^[a-zA-Z]{1}[0-9]{1}$|^[0-9]{1}[a-zA-Z]{1}$/.test(value);
		}, "请输入正确的航空公司二字码");

		$.validator.addMethod("seatcode", function(value, element) {
			return this.optional(element) || /^[A-Z]{1}$/i.test(value);
		}, "请输入正确的座位属性");


		//当是否收费选择为D、O时子代码只能为ODF
		$.validator.addMethod("chargeDO", function(value, element) {
			return this.optional(element) || /^0DF$/i.test(value);
		}, "免费行李子代码仅支持[ 0DF ]");
		
		
		//tuiAlphanumericOrStart
		$.validator.addMethod("alphanumericOrStart", function(value, element) {
			return this.optional(element) || /^[A-Za-z0-9]{0,}$|^[\*]{1}$/.test(value) ;
		}, "请输入字母和数字的组合(半角)或仅输入*。");
		


		$.validator.addMethod("bigger", function(value, element,param) {
			var target = $( param );
			var startStr = target.val() ;
			var flag = true ;
			if(value.length>0&&startStr.length>0){
				if(!isNaN(startStr)&&!isNaN(value)){//都为数值时
					var start = parseFloat(target.val()) ;
					var end = parseFloat(value) ;
					flag = end >= start ;
				}
			}
			return this.optional(element) || flag;
		}, "最大值不能小于最小值");

		$.validator.addMethod("smaller", function(value, element,param) {
			var target = $( param );
			var endStr = target.val() ;
			var flag = true ;
			if(value.length>0&&endStr.length>0){
				if(!isNaN(endStr)&&!isNaN(value)){//都为数值时
					var start = parseFloat(value) ;
					var end = parseFloat(endStr) ;
					flag = (start <= end) ;
				}
			}
			return this.optional(element) || flag;
		}, "最小值不能大于最大值");


		$.validator.addMethod("biggerDate", function(value, element,param) {
			var target = $(param);
			var startStr = target.val() ;
			var flag = true ;
			if(value.length>0&&startStr.length>0){
				var startDate = getDate(startStr) ;
				var endDate = getDate(value) ;
				if(startDate>endDate){
					flag = false;
				}
			}
			return this.optional(element) || flag;
		}, "结束日期必须大于起始日期");


		$.validator.addMethod("biggerThanCurrent", function(value, element) {
			var currDate = new Date();
			currDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
			var valueDate = getDate(value) ;
			return this.optional(element) || valueDate>=currDate;
		}, "必须大于当前日期");


		$.validator.addMethod("biggerTime", function(value, element) {
			var target = $(param);
			var startStr = target.val() ;
			var endStr = value ;
			var flag = true ;
			if(startStr.length>0&&endStr.length>0){
				if(!isNaN(startStr)&&!isNaN(endStr)){
					var n1 = parseInt(startStr) ;
					var n2 = parseInt(endStr) ;
					if(n1>n2){
						flag = false;
					}
				}
			}
			return this.optional(element) || flag;
		}, "结束时刻必须大于开始时刻");




		/**下部分是oc特有定制的校验 end**/

		/**
		* Return true if the field value matches the given format RegExp
		*
		* @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
		* @result true
		*
		* @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
		* @result false
		*
		* @name $.validator.methods.pattern
		* @type Boolean
		* @cat Plugins/Validate/Methods
		*/
		$.validator.addMethod("pattern", function(value, element, param) {
			if (this.optional(element)) {
				return true;
			}
			if (typeof param === "string") {
				param = new RegExp("^(?:" + param + ")$");
			}
			return param.test(value);
		}, "输入不合法.");

		/*$.validator.addMethod("zipcodeUS", function(value, element) {
			return this.optional(element) || /^\d{5}(-\d{4})?$/.test(value);
		}, "The specified US ZIP Code is invalid");*/


	}));









/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	//require("./jquery_ui.datepicker-modify.css") ;
	//require("./jquery.ui.datepicker.css") ;
	__webpack_require__(58);
	__webpack_require__(59);

/***/ },
/* 58 */
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
/* 59 */
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
/* 60 */,
/* 61 */,
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	module.exports = 'ngMessages';


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * @license AngularJS v1.5.0
	 * (c) 2010-2016 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
	(function(window, angular, undefined) {'use strict';

	/* jshint ignore:start */
	// this code is in the core, but not in angular-messages.js
	var isArray = angular.isArray;
	var forEach = angular.forEach;
	var isString = angular.isString;
	var jqLite = angular.element;
	/* jshint ignore:end */

	/**
	 * @ngdoc module
	 * @name ngMessages
	 * @description
	 *
	 * The `ngMessages` module provides enhanced support for displaying messages within templates
	 * (typically within forms or when rendering message objects that return key/value data).
	 * Instead of relying on JavaScript code and/or complex ng-if statements within your form template to
	 * show and hide error messages specific to the state of an input field, the `ngMessages` and
	 * `ngMessage` directives are designed to handle the complexity, inheritance and priority
	 * sequencing based on the order of how the messages are defined in the template.
	 *
	 * Currently, the ngMessages module only contains the code for the `ngMessages`, `ngMessagesInclude`
	 * `ngMessage` and `ngMessageExp` directives.
	 *
	 * # Usage
	 * The `ngMessages` directive listens on a key/value collection which is set on the ngMessages attribute.
	 * Since the {@link ngModel ngModel} directive exposes an `$error` object, this error object can be
	 * used with `ngMessages` to display control error messages in an easier way than with just regular angular
	 * template directives.
	 *
	 * ```html
	 * <form name="myForm">
	 *   <label>
	 *     Enter text:
	 *     <input type="text" ng-model="field" name="myField" required minlength="5" />
	 *   </label>
	 *   <div ng-messages="myForm.myField.$error" role="alert">
	 *     <div ng-message="required">You did not enter a field</div>
	 *     <div ng-message="minlength, maxlength">
	 *       Your email must be between 5 and 100 characters long
	 *     </div>
	 *   </div>
	 * </form>
	 * ```
	 *
	 * Now whatever key/value entries are present within the provided object (in this case `$error`) then
	 * the ngMessages directive will render the inner first ngMessage directive (depending if the key values
	 * match the attribute value present on each ngMessage directive). In other words, if your errors
	 * object contains the following data:
	 *
	 * ```javascript
	 * <!-- keep in mind that ngModel automatically sets these error flags -->
	 * myField.$error = { minlength : true, required : true };
	 * ```
	 *
	 * Then the `required` message will be displayed first. When required is false then the `minlength` message
	 * will be displayed right after (since these messages are ordered this way in the template HTML code).
	 * The prioritization of each message is determined by what order they're present in the DOM.
	 * Therefore, instead of having custom JavaScript code determine the priority of what errors are
	 * present before others, the presentation of the errors are handled within the template.
	 *
	 * By default, ngMessages will only display one error at a time. However, if you wish to display all
	 * messages then the `ng-messages-multiple` attribute flag can be used on the element containing the
	 * ngMessages directive to make this happen.
	 *
	 * ```html
	 * <!-- attribute-style usage -->
	 * <div ng-messages="myForm.myField.$error" ng-messages-multiple>...</div>
	 *
	 * <!-- element-style usage -->
	 * <ng-messages for="myForm.myField.$error" multiple>...</ng-messages>
	 * ```
	 *
	 * ## Reusing and Overriding Messages
	 * In addition to prioritization, ngMessages also allows for including messages from a remote or an inline
	 * template. This allows for generic collection of messages to be reused across multiple parts of an
	 * application.
	 *
	 * ```html
	 * <script type="text/ng-template" id="error-messages">
	 *   <div ng-message="required">This field is required</div>
	 *   <div ng-message="minlength">This field is too short</div>
	 * </script>
	 *
	 * <div ng-messages="myForm.myField.$error" role="alert">
	 *   <div ng-messages-include="error-messages"></div>
	 * </div>
	 * ```
	 *
	 * However, including generic messages may not be useful enough to match all input fields, therefore,
	 * `ngMessages` provides the ability to override messages defined in the remote template by redefining
	 * them within the directive container.
	 *
	 * ```html
	 * <!-- a generic template of error messages known as "my-custom-messages" -->
	 * <script type="text/ng-template" id="my-custom-messages">
	 *   <div ng-message="required">This field is required</div>
	 *   <div ng-message="minlength">This field is too short</div>
	 * </script>
	 *
	 * <form name="myForm">
	 *   <label>
	 *     Email address
	 *     <input type="email"
	 *            id="email"
	 *            name="myEmail"
	 *            ng-model="email"
	 *            minlength="5"
	 *            required />
	 *   </label>
	 *   <!-- any ng-message elements that appear BEFORE the ng-messages-include will
	 *        override the messages present in the ng-messages-include template -->
	 *   <div ng-messages="myForm.myEmail.$error" role="alert">
	 *     <!-- this required message has overridden the template message -->
	 *     <div ng-message="required">You did not enter your email address</div>
	 *
	 *     <!-- this is a brand new message and will appear last in the prioritization -->
	 *     <div ng-message="email">Your email address is invalid</div>
	 *
	 *     <!-- and here are the generic error messages -->
	 *     <div ng-messages-include="my-custom-messages"></div>
	 *   </div>
	 * </form>
	 * ```
	 *
	 * In the example HTML code above the message that is set on required will override the corresponding
	 * required message defined within the remote template. Therefore, with particular input fields (such
	 * email addresses, date fields, autocomplete inputs, etc...), specialized error messages can be applied
	 * while more generic messages can be used to handle other, more general input errors.
	 *
	 * ## Dynamic Messaging
	 * ngMessages also supports using expressions to dynamically change key values. Using arrays and
	 * repeaters to list messages is also supported. This means that the code below will be able to
	 * fully adapt itself and display the appropriate message when any of the expression data changes:
	 *
	 * ```html
	 * <form name="myForm">
	 *   <label>
	 *     Email address
	 *     <input type="email"
	 *            name="myEmail"
	 *            ng-model="email"
	 *            minlength="5"
	 *            required />
	 *   </label>
	 *   <div ng-messages="myForm.myEmail.$error" role="alert">
	 *     <div ng-message="required">You did not enter your email address</div>
	 *     <div ng-repeat="errorMessage in errorMessages">
	 *       <!-- use ng-message-exp for a message whose key is given by an expression -->
	 *       <div ng-message-exp="errorMessage.type">{{ errorMessage.text }}</div>
	 *     </div>
	 *   </div>
	 * </form>
	 * ```
	 *
	 * The `errorMessage.type` expression can be a string value or it can be an array so
	 * that multiple errors can be associated with a single error message:
	 *
	 * ```html
	 *   <label>
	 *     Email address
	 *     <input type="email"
	 *            ng-model="data.email"
	 *            name="myEmail"
	 *            ng-minlength="5"
	 *            ng-maxlength="100"
	 *            required />
	 *   </label>
	 *   <div ng-messages="myForm.myEmail.$error" role="alert">
	 *     <div ng-message-exp="'required'">You did not enter your email address</div>
	 *     <div ng-message-exp="['minlength', 'maxlength']">
	 *       Your email must be between 5 and 100 characters long
	 *     </div>
	 *   </div>
	 * ```
	 *
	 * Feel free to use other structural directives such as ng-if and ng-switch to further control
	 * what messages are active and when. Be careful, if you place ng-message on the same element
	 * as these structural directives, Angular may not be able to determine if a message is active
	 * or not. Therefore it is best to place the ng-message on a child element of the structural
	 * directive.
	 *
	 * ```html
	 * <div ng-messages="myForm.myEmail.$error" role="alert">
	 *   <div ng-if="showRequiredError">
	 *     <div ng-message="required">Please enter something</div>
	 *   </div>
	 * </div>
	 * ```
	 *
	 * ## Animations
	 * If the `ngAnimate` module is active within the application then the `ngMessages`, `ngMessage` and
	 * `ngMessageExp` directives will trigger animations whenever any messages are added and removed from
	 * the DOM by the `ngMessages` directive.
	 *
	 * Whenever the `ngMessages` directive contains one or more visible messages then the `.ng-active` CSS
	 * class will be added to the element. The `.ng-inactive` CSS class will be applied when there are no
	 * messages present. Therefore, CSS transitions and keyframes as well as JavaScript animations can
	 * hook into the animations whenever these classes are added/removed.
	 *
	 * Let's say that our HTML code for our messages container looks like so:
	 *
	 * ```html
	 * <div ng-messages="myMessages" class="my-messages" role="alert">
	 *   <div ng-message="alert" class="some-message">...</div>
	 *   <div ng-message="fail" class="some-message">...</div>
	 * </div>
	 * ```
	 *
	 * Then the CSS animation code for the message container looks like so:
	 *
	 * ```css
	 * .my-messages {
	 *   transition:1s linear all;
	 * }
	 * .my-messages.ng-active {
	 *   // messages are visible
	 * }
	 * .my-messages.ng-inactive {
	 *   // messages are hidden
	 * }
	 * ```
	 *
	 * Whenever an inner message is attached (becomes visible) or removed (becomes hidden) then the enter
	 * and leave animation is triggered for each particular element bound to the `ngMessage` directive.
	 *
	 * Therefore, the CSS code for the inner messages looks like so:
	 *
	 * ```css
	 * .some-message {
	 *   transition:1s linear all;
	 * }
	 *
	 * .some-message.ng-enter {}
	 * .some-message.ng-enter.ng-enter-active {}
	 *
	 * .some-message.ng-leave {}
	 * .some-message.ng-leave.ng-leave-active {}
	 * ```
	 *
	 * {@link ngAnimate Click here} to learn how to use JavaScript animations or to learn more about ngAnimate.
	 */
	angular.module('ngMessages', [])

	   /**
	    * @ngdoc directive
	    * @module ngMessages
	    * @name ngMessages
	    * @restrict AE
	    *
	    * @description
	    * `ngMessages` is a directive that is designed to show and hide messages based on the state
	    * of a key/value object that it listens on. The directive itself complements error message
	    * reporting with the `ngModel` $error object (which stores a key/value state of validation errors).
	    *
	    * `ngMessages` manages the state of internal messages within its container element. The internal
	    * messages use the `ngMessage` directive and will be inserted/removed from the page depending
	    * on if they're present within the key/value object. By default, only one message will be displayed
	    * at a time and this depends on the prioritization of the messages within the template. (This can
	    * be changed by using the `ng-messages-multiple` or `multiple` attribute on the directive container.)
	    *
	    * A remote template can also be used to promote message reusability and messages can also be
	    * overridden.
	    *
	    * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.
	    *
	    * @usage
	    * ```html
	    * <!-- using attribute directives -->
	    * <ANY ng-messages="expression" role="alert">
	    *   <ANY ng-message="stringValue">...</ANY>
	    *   <ANY ng-message="stringValue1, stringValue2, ...">...</ANY>
	    *   <ANY ng-message-exp="expressionValue">...</ANY>
	    * </ANY>
	    *
	    * <!-- or by using element directives -->
	    * <ng-messages for="expression" role="alert">
	    *   <ng-message when="stringValue">...</ng-message>
	    *   <ng-message when="stringValue1, stringValue2, ...">...</ng-message>
	    *   <ng-message when-exp="expressionValue">...</ng-message>
	    * </ng-messages>
	    * ```
	    *
	    * @param {string} ngMessages an angular expression evaluating to a key/value object
	    *                 (this is typically the $error object on an ngModel instance).
	    * @param {string=} ngMessagesMultiple|multiple when set, all messages will be displayed with true
	    *
	    * @example
	    * <example name="ngMessages-directive" module="ngMessagesExample"
	    *          deps="angular-messages.js"
	    *          animations="true" fixBase="true">
	    *   <file name="index.html">
	    *     <form name="myForm">
	    *       <label>
	    *         Enter your name:
	    *         <input type="text"
	    *                name="myName"
	    *                ng-model="name"
	    *                ng-minlength="5"
	    *                ng-maxlength="20"
	    *                required />
	    *       </label>
	    *       <pre>myForm.myName.$error = {{ myForm.myName.$error | json }}</pre>
	    *
	    *       <div ng-messages="myForm.myName.$error" style="color:maroon" role="alert">
	    *         <div ng-message="required">You did not enter a field</div>
	    *         <div ng-message="minlength">Your field is too short</div>
	    *         <div ng-message="maxlength">Your field is too long</div>
	    *       </div>
	    *     </form>
	    *   </file>
	    *   <file name="script.js">
	    *     angular.module('ngMessagesExample', ['ngMessages']);
	    *   </file>
	    * </example>
	    */
	   .directive('ngMessages', ['$animate', function($animate) {
	     var ACTIVE_CLASS = 'ng-active';
	     var INACTIVE_CLASS = 'ng-inactive';

	     return {
	       require: 'ngMessages',
	       restrict: 'AE',
	       controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs) {
	         var ctrl = this;
	         var latestKey = 0;
	         var nextAttachId = 0;

	         this.getAttachId = function getAttachId() { return nextAttachId++; };

	         var messages = this.messages = {};
	         var renderLater, cachedCollection;

	         this.render = function(collection) {
	           collection = collection || {};

	           renderLater = false;
	           cachedCollection = collection;

	           // this is true if the attribute is empty or if the attribute value is truthy
	           var multiple = isAttrTruthy($scope, $attrs.ngMessagesMultiple) ||
	                          isAttrTruthy($scope, $attrs.multiple);

	           var unmatchedMessages = [];
	           var matchedKeys = {};
	           var messageItem = ctrl.head;
	           var messageFound = false;
	           var totalMessages = 0;

	           // we use != instead of !== to allow for both undefined and null values
	           while (messageItem != null) {
	             totalMessages++;
	             var messageCtrl = messageItem.message;

	             var messageUsed = false;
	             if (!messageFound) {
	               forEach(collection, function(value, key) {
	                 if (!messageUsed && truthy(value) && messageCtrl.test(key)) {
	                   // this is to prevent the same error name from showing up twice
	                   if (matchedKeys[key]) return;
	                   matchedKeys[key] = true;

	                   messageUsed = true;
	                   messageCtrl.attach();
	                 }
	               });
	             }

	             if (messageUsed) {
	               // unless we want to display multiple messages then we should
	               // set a flag here to avoid displaying the next message in the list
	               messageFound = !multiple;
	             } else {
	               unmatchedMessages.push(messageCtrl);
	             }

	             messageItem = messageItem.next;
	           }

	           forEach(unmatchedMessages, function(messageCtrl) {
	             messageCtrl.detach();
	           });

	           unmatchedMessages.length !== totalMessages
	              ? $animate.setClass($element, ACTIVE_CLASS, INACTIVE_CLASS)
	              : $animate.setClass($element, INACTIVE_CLASS, ACTIVE_CLASS);
	         };

	         $scope.$watchCollection($attrs.ngMessages || $attrs['for'], ctrl.render);

	         this.reRender = function() {
	           if (!renderLater) {
	             renderLater = true;
	             $scope.$evalAsync(function() {
	               if (renderLater) {
	                 cachedCollection && ctrl.render(cachedCollection);
	               }
	             });
	           }
	         };

	         this.register = function(comment, messageCtrl) {
	           var nextKey = latestKey.toString();
	           messages[nextKey] = {
	             message: messageCtrl
	           };
	           insertMessageNode($element[0], comment, nextKey);
	           comment.$$ngMessageNode = nextKey;
	           latestKey++;

	           ctrl.reRender();
	         };

	         this.deregister = function(comment) {
	           var key = comment.$$ngMessageNode;
	           delete comment.$$ngMessageNode;
	           removeMessageNode($element[0], comment, key);
	           delete messages[key];
	           ctrl.reRender();
	         };

	         function findPreviousMessage(parent, comment) {
	           var prevNode = comment;
	           var parentLookup = [];
	           while (prevNode && prevNode !== parent) {
	             var prevKey = prevNode.$$ngMessageNode;
	             if (prevKey && prevKey.length) {
	               return messages[prevKey];
	             }

	             // dive deeper into the DOM and examine its children for any ngMessage
	             // comments that may be in an element that appears deeper in the list
	             if (prevNode.childNodes.length && parentLookup.indexOf(prevNode) == -1) {
	               parentLookup.push(prevNode);
	               prevNode = prevNode.childNodes[prevNode.childNodes.length - 1];
	             } else {
	               prevNode = prevNode.previousSibling || prevNode.parentNode;
	             }
	           }
	         }

	         function insertMessageNode(parent, comment, key) {
	           var messageNode = messages[key];
	           if (!ctrl.head) {
	             ctrl.head = messageNode;
	           } else {
	             var match = findPreviousMessage(parent, comment);
	             if (match) {
	               messageNode.next = match.next;
	               match.next = messageNode;
	             } else {
	               messageNode.next = ctrl.head;
	               ctrl.head = messageNode;
	             }
	           }
	         }

	         function removeMessageNode(parent, comment, key) {
	           var messageNode = messages[key];

	           var match = findPreviousMessage(parent, comment);
	           if (match) {
	             match.next = messageNode.next;
	           } else {
	             ctrl.head = messageNode.next;
	           }
	         }
	       }]
	     };

	     function isAttrTruthy(scope, attr) {
	      return (isString(attr) && attr.length === 0) || //empty attribute
	             truthy(scope.$eval(attr));
	     }

	     function truthy(val) {
	       return isString(val) ? val.length : !!val;
	     }
	   }])

	   /**
	    * @ngdoc directive
	    * @name ngMessagesInclude
	    * @restrict AE
	    * @scope
	    *
	    * @description
	    * `ngMessagesInclude` is a directive with the purpose to import existing ngMessage template
	    * code from a remote template and place the downloaded template code into the exact spot
	    * that the ngMessagesInclude directive is placed within the ngMessages container. This allows
	    * for a series of pre-defined messages to be reused and also allows for the developer to
	    * determine what messages are overridden due to the placement of the ngMessagesInclude directive.
	    *
	    * @usage
	    * ```html
	    * <!-- using attribute directives -->
	    * <ANY ng-messages="expression" role="alert">
	    *   <ANY ng-messages-include="remoteTplString">...</ANY>
	    * </ANY>
	    *
	    * <!-- or by using element directives -->
	    * <ng-messages for="expression" role="alert">
	    *   <ng-messages-include src="expressionValue1">...</ng-messages-include>
	    * </ng-messages>
	    * ```
	    *
	    * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.
	    *
	    * @param {string} ngMessagesInclude|src a string value corresponding to the remote template.
	    */
	   .directive('ngMessagesInclude',
	     ['$templateRequest', '$document', '$compile', function($templateRequest, $document, $compile) {

	     return {
	       restrict: 'AE',
	       require: '^^ngMessages', // we only require this for validation sake
	       link: function($scope, element, attrs) {
	         var src = attrs.ngMessagesInclude || attrs.src;
	         $templateRequest(src).then(function(html) {
	           $compile(html)($scope, function(contents) {
	             element.after(contents);

	             // the anchor is placed for debugging purposes
	             var anchor = jqLite($document[0].createComment(' ngMessagesInclude: ' + src + ' '));
	             element.after(anchor);

	             // we don't want to pollute the DOM anymore by keeping an empty directive element
	             element.remove();
	           });
	         });
	       }
	     };
	   }])

	   /**
	    * @ngdoc directive
	    * @name ngMessage
	    * @restrict AE
	    * @scope
	    *
	    * @description
	    * `ngMessage` is a directive with the purpose to show and hide a particular message.
	    * For `ngMessage` to operate, a parent `ngMessages` directive on a parent DOM element
	    * must be situated since it determines which messages are visible based on the state
	    * of the provided key/value map that `ngMessages` listens on.
	    *
	    * More information about using `ngMessage` can be found in the
	    * {@link module:ngMessages `ngMessages` module documentation}.
	    *
	    * @usage
	    * ```html
	    * <!-- using attribute directives -->
	    * <ANY ng-messages="expression" role="alert">
	    *   <ANY ng-message="stringValue">...</ANY>
	    *   <ANY ng-message="stringValue1, stringValue2, ...">...</ANY>
	    * </ANY>
	    *
	    * <!-- or by using element directives -->
	    * <ng-messages for="expression" role="alert">
	    *   <ng-message when="stringValue">...</ng-message>
	    *   <ng-message when="stringValue1, stringValue2, ...">...</ng-message>
	    * </ng-messages>
	    * ```
	    *
	    * @param {expression} ngMessage|when a string value corresponding to the message key.
	    */
	  .directive('ngMessage', ngMessageDirectiveFactory())


	   /**
	    * @ngdoc directive
	    * @name ngMessageExp
	    * @restrict AE
	    * @priority 1
	    * @scope
	    *
	    * @description
	    * `ngMessageExp` is a directive with the purpose to show and hide a particular message.
	    * For `ngMessageExp` to operate, a parent `ngMessages` directive on a parent DOM element
	    * must be situated since it determines which messages are visible based on the state
	    * of the provided key/value map that `ngMessages` listens on.
	    *
	    * @usage
	    * ```html
	    * <!-- using attribute directives -->
	    * <ANY ng-messages="expression">
	    *   <ANY ng-message-exp="expressionValue">...</ANY>
	    * </ANY>
	    *
	    * <!-- or by using element directives -->
	    * <ng-messages for="expression">
	    *   <ng-message when-exp="expressionValue">...</ng-message>
	    * </ng-messages>
	    * ```
	    *
	    * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.
	    *
	    * @param {expression} ngMessageExp|whenExp an expression value corresponding to the message key.
	    */
	  .directive('ngMessageExp', ngMessageDirectiveFactory());

	function ngMessageDirectiveFactory() {
	  return ['$animate', function($animate) {
	    return {
	      restrict: 'AE',
	      transclude: 'element',
	      priority: 1, // must run before ngBind, otherwise the text is set on the comment
	      terminal: true,
	      require: '^^ngMessages',
	      link: function(scope, element, attrs, ngMessagesCtrl, $transclude) {
	        var commentNode = element[0];

	        var records;
	        var staticExp = attrs.ngMessage || attrs.when;
	        var dynamicExp = attrs.ngMessageExp || attrs.whenExp;
	        var assignRecords = function(items) {
	          records = items
	              ? (isArray(items)
	                    ? items
	                    : items.split(/[\s,]+/))
	              : null;
	          ngMessagesCtrl.reRender();
	        };

	        if (dynamicExp) {
	          assignRecords(scope.$eval(dynamicExp));
	          scope.$watchCollection(dynamicExp, assignRecords);
	        } else {
	          assignRecords(staticExp);
	        }

	        var currentElement, messageCtrl;
	        ngMessagesCtrl.register(commentNode, messageCtrl = {
	          test: function(name) {
	            return contains(records, name);
	          },
	          attach: function() {
	            if (!currentElement) {
	              $transclude(scope, function(elm) {
	                $animate.enter(elm, null, element);
	                currentElement = elm;

	                // Each time we attach this node to a message we get a new id that we can match
	                // when we are destroying the node later.
	                var $$attachId = currentElement.$$attachId = ngMessagesCtrl.getAttachId();

	                // in the event that the parent element is destroyed
	                // by any other structural directive then it's time
	                // to deregister the message from the controller
	                currentElement.on('$destroy', function() {
	                  if (currentElement && currentElement.$$attachId === $$attachId) {
	                    ngMessagesCtrl.deregister(commentNode);
	                    messageCtrl.detach();
	                  }
	                });
	              });
	            }
	          },
	          detach: function() {
	            if (currentElement) {
	              var elm = currentElement;
	              currentElement = null;
	              $animate.leave(elm);
	            }
	          }
	        });
	      }
	    };
	  }];

	  function contains(collection, key) {
	    if (collection) {
	      return isArray(collection)
	          ? collection.indexOf(key) >= 0
	          : collection.hasOwnProperty(key);
	    }
	  }
	}


	})(window, window.angular);


/***/ },
/* 64 */,
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		var dataFormatStr = "YYYY-MM-DD" ;
		var dataTimeFormatStr = "YYYY-MM-DD HH:mm" ;
		var moment = __webpack_require__(66) ;
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
		util.checkStatusIsDisabled = function(status){
			var flag = false ;
			if(status!=null){
				if(status == '3'){
					flag = true;
				}
			}
			return flag;
		};
		//判断里程积分兑换是否可编辑，当状态为2(已生效)不能编辑除了截止日期外的字段
		util.checkMileageStatusIsDisabled= function(status){
			status = status || '' ;
			if(status=='2'){
				return true ;
			}
			return false; 
		}
		
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
	   
	   
	   
	   //滑入滑出
	   function slideToggleDiv(divID){
	   	  $('#' + divID).slideToggle();
	   };
	   function slideUpDiv(divID){
	   	  $('#' + divID).slideUp();
	   };
	   function slideDownDiv(divID){
	      $('#' + divID).slideDown();
	   };

	   //淡入淡出
	   function fadeToggleDiv(divID){
	   	  $('#' + divID).fadeToggle();
	   };
	   function fadeInDiv(divID){
	   	  $('#' + divID).fadeIn();
	   };
	   function fadeOutDiv(divID){
	   	  $('#' + divID).fadeOut();
	   };
	   
	   util.slideToggleDiv = slideToggleDiv ;
	   util.slideUpDiv = slideUpDiv ;
	   util.slideDownDiv = slideDownDiv ;
	   util.fadeToggleDiv = fadeToggleDiv ;
	   util.fadeInDiv = fadeInDiv ;
	   util.fadeOutDiv = fadeOutDiv ;
	   

		module.exports = util ;
	//});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var moment = __webpack_require__(67);
	module.exports = moment ;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.10.6
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, function () { 'use strict';

	    var hookCallback;

	    function utils_hooks__hooks () {
	        return hookCallback.apply(null, arguments);
	    }

	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback (callback) {
	        hookCallback = callback;
	    }

	    function isArray(input) {
	        return Object.prototype.toString.call(input) === '[object Array]';
	    }

	    function isDate(input) {
	        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	    }

	    function map(arr, fn) {
	        var res = [], i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }

	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }

	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }

	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }

	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }

	        return a;
	    }

	    function create_utc__createUTC (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }

	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty           : false,
	            unusedTokens    : [],
	            unusedInput     : [],
	            overflow        : -2,
	            charsLeftOver   : 0,
	            nullInput       : false,
	            invalidMonth    : null,
	            invalidFormat   : false,
	            userInvalidated : false,
	            iso             : false
	        };
	    }

	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }

	    function valid__isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m);
	            m._isValid = !isNaN(m._d.getTime()) &&
	                flags.overflow < 0 &&
	                !flags.empty &&
	                !flags.invalidMonth &&
	                !flags.invalidWeekday &&
	                !flags.nullInput &&
	                !flags.invalidFormat &&
	                !flags.userInvalidated;

	            if (m._strict) {
	                m._isValid = m._isValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }
	        }
	        return m._isValid;
	    }

	    function valid__createInvalid (flags) {
	        var m = create_utc__createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        }
	        else {
	            getParsingFlags(m).userInvalidated = true;
	        }

	        return m;
	    }

	    var momentProperties = utils_hooks__hooks.momentProperties = [];

	    function copyConfig(to, from) {
	        var i, prop, val;

	        if (typeof from._isAMomentObject !== 'undefined') {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (typeof from._i !== 'undefined') {
	            to._i = from._i;
	        }
	        if (typeof from._f !== 'undefined') {
	            to._f = from._f;
	        }
	        if (typeof from._l !== 'undefined') {
	            to._l = from._l;
	        }
	        if (typeof from._strict !== 'undefined') {
	            to._strict = from._strict;
	        }
	        if (typeof from._tzm !== 'undefined') {
	            to._tzm = from._tzm;
	        }
	        if (typeof from._isUTC !== 'undefined') {
	            to._isUTC = from._isUTC;
	        }
	        if (typeof from._offset !== 'undefined') {
	            to._offset = from._offset;
	        }
	        if (typeof from._pf !== 'undefined') {
	            to._pf = getParsingFlags(from);
	        }
	        if (typeof from._locale !== 'undefined') {
	            to._locale = from._locale;
	        }

	        if (momentProperties.length > 0) {
	            for (i in momentProperties) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (typeof val !== 'undefined') {
	                    to[prop] = val;
	                }
	            }
	        }

	        return to;
	    }

	    var updateInProgress = false;

	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            utils_hooks__hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }

	    function isMoment (obj) {
	        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	    }

	    function absFloor (number) {
	        if (number < 0) {
	            return Math.ceil(number);
	        } else {
	            return Math.floor(number);
	        }
	    }

	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;

	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }

	        return value;
	    }

	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if ((dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }

	    function Locale() {
	    }

	    var locales = {};
	    var globalLocale;

	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }

	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0, j, next, locale, split;

	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return null;
	    }

	    function loadLocale(name) {
	        var oldLocale = null;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (!locales[name] && typeof module !== 'undefined' &&
	                module && module.exports) {
	            try {
	                oldLocale = globalLocale._abbr;
	                __webpack_require__(69)("./" + name);
	                // because defineLocale currently also sets the global locale, we
	                // want to undo that for lazy loaded locales
	                locale_locales__getSetGlobalLocale(oldLocale);
	            } catch (e) { }
	        }
	        return locales[name];
	    }

	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function locale_locales__getSetGlobalLocale (key, values) {
	        var data;
	        if (key) {
	            if (typeof values === 'undefined') {
	                data = locale_locales__getLocale(key);
	            }
	            else {
	                data = defineLocale(key, values);
	            }

	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            }
	        }

	        return globalLocale._abbr;
	    }

	    function defineLocale (name, values) {
	        if (values !== null) {
	            values.abbr = name;
	            locales[name] = locales[name] || new Locale();
	            locales[name].set(values);

	            // backwards compat for now: also set the locale
	            locale_locales__getSetGlobalLocale(name);

	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }

	    // returns locale data
	    function locale_locales__getLocale (key) {
	        var locale;

	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }

	        if (!key) {
	            return globalLocale;
	        }

	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }

	        return chooseLocale(key);
	    }

	    var aliases = {};

	    function addUnitAlias (unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }

	    function normalizeUnits(units) {
	        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	    }

	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;

	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }

	        return normalizedInput;
	    }

	    function makeGetSet (unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                get_set__set(this, unit, value);
	                utils_hooks__hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get_set__get(this, unit);
	            }
	        };
	    }

	    function get_set__get (mom, unit) {
	        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
	    }

	    function get_set__set (mom, unit, value) {
	        return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	    }

	    // MOMENTS

	    function getSet (units, value) {
	        var unit;
	        if (typeof units === 'object') {
	            for (unit in units) {
	                this.set(unit, units[unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (typeof this[units] === 'function') {
	                return this[units](value);
	            }
	        }
	        return this;
	    }

	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	    }

	    var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

	    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

	    var formatFunctions = {};

	    var formatTokenFunctions = {};

	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken (token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(func.apply(this, arguments), token);
	            };
	        }
	    }

	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }

	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens), i, length;

	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }

	        return function (mom) {
	            var output = '';
	            for (i = 0; i < length; i++) {
	                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	            }
	            return output;
	        };
	    }

	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }

	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

	        return formatFunctions[format](m);
	    }

	    function expandFormat(format, locale) {
	        var i = 5;

	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }

	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }

	        return format;
	    }

	    var match1         = /\d/;            //       0 - 9
	    var match2         = /\d\d/;          //      00 - 99
	    var match3         = /\d{3}/;         //     000 - 999
	    var match4         = /\d{4}/;         //    0000 - 9999
	    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	    var match1to2      = /\d\d?/;         //       0 - 99
	    var match1to3      = /\d{1,3}/;       //       0 - 999
	    var match1to4      = /\d{1,4}/;       //       0 - 9999
	    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

	    var matchUnsigned  = /\d+/;           //       0 - inf
	    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

	    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

	    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

	    // any word (or two) characters or numbers including two/three word month in arabic.
	    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

	    var regexes = {};

	    function isFunction (sth) {
	        // https://github.com/moment/moment/issues/2325
	        return typeof sth === 'function' &&
	            Object.prototype.toString.call(sth) === '[object Function]';
	    }


	    function addRegexToken (token, regex, strictRegex) {
	        regexes[token] = isFunction(regex) ? regex : function (isStrict) {
	            return (isStrict && strictRegex) ? strictRegex : regex;
	        };
	    }

	    function getParseRegexForToken (token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }

	        return regexes[token](config._strict, config._locale);
	    }

	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	            return p1 || p2 || p3 || p4;
	        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    var tokens = {};

	    function addParseToken (token, callback) {
	        var i, func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (typeof callback === 'number') {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }

	    function addWeekParseToken (token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }

	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }

	    var YEAR = 0;
	    var MONTH = 1;
	    var DATE = 2;
	    var HOUR = 3;
	    var MINUTE = 4;
	    var SECOND = 5;
	    var MILLISECOND = 6;

	    function daysInMonth(year, month) {
	        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	    }

	    // FORMATTING

	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });

	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });

	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });

	    // ALIASES

	    addUnitAlias('month', 'M');

	    // PARSING

	    addRegexToken('M',    match1to2);
	    addRegexToken('MM',   match1to2, match2);
	    addRegexToken('MMM',  matchWord);
	    addRegexToken('MMMM', matchWord);

	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });

	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });

	    // LOCALES

	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	    function localeMonths (m) {
	        return this._months[m.month()];
	    }

	    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	    function localeMonthsShort (m) {
	        return this._monthsShort[m.month()];
	    }

	    function localeMonthsParse (monthName, format, strict) {
	        var i, mom, regex;

	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }

	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = create_utc__createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function setMonth (mom, value) {
	        var dayOfMonth;

	        // TODO: Move this out of here!
	        if (typeof value === 'string') {
	            value = mom.localeData().monthsParse(value);
	            // TODO: Another silent failure?
	            if (typeof value !== 'number') {
	                return mom;
	            }
	        }

	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }

	    function getSetMonth (value) {
	        if (value != null) {
	            setMonth(this, value);
	            utils_hooks__hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get_set__get(this, 'Month');
	        }
	    }

	    function getDaysInMonth () {
	        return daysInMonth(this.year(), this.month());
	    }

	    function checkOverflow (m) {
	        var overflow;
	        var a = m._a;

	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	                -1;

	            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	                overflow = DATE;
	            }

	            getParsingFlags(m).overflow = overflow;
	        }

	        return m;
	    }

	    function warn(msg) {
	        if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }

	    function deprecate(msg, fn) {
	        var firstTime = true;

	        return extend(function () {
	            if (firstTime) {
	                warn(msg + '\n' + (new Error()).stack);
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }

	    var deprecations = {};

	    function deprecateSimple(name, msg) {
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }

	    utils_hooks__hooks.suppressDeprecationWarnings = false;

	    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

	    var isoDates = [
	        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
	        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
	        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
	        ['GGGG-[W]WW', /\d{4}-W\d{2}/],
	        ['YYYY-DDD', /\d{4}-\d{3}/]
	    ];

	    // iso time formats and regexes
	    var isoTimes = [
	        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
	        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
	        ['HH:mm', /(T| )\d\d:\d\d/],
	        ['HH', /(T| )\d\d/]
	    ];

	    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

	    // date from iso format
	    function configFromISO(config) {
	        var i, l,
	            string = config._i,
	            match = from_string__isoRegex.exec(string);

	        if (match) {
	            getParsingFlags(config).iso = true;
	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(string)) {
	                    config._f = isoDates[i][0];
	                    break;
	                }
	            }
	            for (i = 0, l = isoTimes.length; i < l; i++) {
	                if (isoTimes[i][1].exec(string)) {
	                    // match[6] should be 'T' or space
	                    config._f += (match[6] || ' ') + isoTimes[i][0];
	                    break;
	                }
	            }
	            if (string.match(matchOffset)) {
	                config._f += 'Z';
	            }
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }

	    // date from iso format or fallback
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);

	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }

	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    utils_hooks__hooks.createFromInputFallback = deprecate(
	        'moment construction falls back to js Date. This is ' +
	        'discouraged and will be removed in upcoming major ' +
	        'release. Please refer to ' +
	        'https://github.com/moment/moment/issues/1407 for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );

	    function createDate (y, m, d, h, M, s, ms) {
	        //can't just apply() to create a date:
	        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	        var date = new Date(y, m, d, h, M, s, ms);

	        //the date constructor doesn't accept years < 1970
	        if (y < 1970) {
	            date.setFullYear(y);
	        }
	        return date;
	    }

	    function createUTCDate (y) {
	        var date = new Date(Date.UTC.apply(null, arguments));
	        if (y < 1970) {
	            date.setUTCFullYear(y);
	        }
	        return date;
	    }

	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });

	    addFormatToken(0, ['YYYY',   4],       0, 'year');
	    addFormatToken(0, ['YYYYY',  5],       0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

	    // ALIASES

	    addUnitAlias('year', 'y');

	    // PARSING

	    addRegexToken('Y',      matchSigned);
	    addRegexToken('YY',     match1to2, match2);
	    addRegexToken('YYYY',   match1to4, match4);
	    addRegexToken('YYYYY',  match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);

	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });

	    // HELPERS

	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }

	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }

	    // HOOKS

	    utils_hooks__hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };

	    // MOMENTS

	    var getSetYear = makeGetSet('FullYear', false);

	    function getIsLeapYear () {
	        return isLeapYear(this.year());
	    }

	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

	    // ALIASES

	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');

	    // PARSING

	    addRegexToken('w',  match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W',  match1to2);
	    addRegexToken('WW', match1to2, match2);

	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	        week[token.substr(0, 1)] = toInt(input);
	    });

	    // HELPERS

	    // firstDayOfWeek       0 = sun, 6 = sat
	    //                      the day of the week that starts the week
	    //                      (usually sunday or monday)
	    // firstDayOfWeekOfYear 0 = sun, 6 = sat
	    //                      the first week is the week that contains the first
	    //                      of this day of the week
	    //                      (eg. ISO weeks use thursday (4))
	    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
	        var end = firstDayOfWeekOfYear - firstDayOfWeek,
	            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
	            adjustedMoment;


	        if (daysToDayOfWeek > end) {
	            daysToDayOfWeek -= 7;
	        }

	        if (daysToDayOfWeek < end - 7) {
	            daysToDayOfWeek += 7;
	        }

	        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
	        return {
	            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
	            year: adjustedMoment.year()
	        };
	    }

	    // LOCALES

	    function localeWeek (mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }

	    var defaultLocaleWeek = {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    };

	    function localeFirstDayOfWeek () {
	        return this._week.dow;
	    }

	    function localeFirstDayOfYear () {
	        return this._week.doy;
	    }

	    // MOMENTS

	    function getSetWeek (input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    function getSetISOWeek (input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

	    // ALIASES

	    addUnitAlias('dayOfYear', 'DDD');

	    // PARSING

	    addRegexToken('DDD',  match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });

	    // HELPERS

	    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
	        var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay(), dayOfYear;
	        if (d < firstDayOfWeek) {
	            d += 7;
	        }

	        weekday = weekday != null ? 1 * weekday : firstDayOfWeek;

	        dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday;

	        return {
	            year: dayOfYear > 0 ? year : year - 1,
	            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
	        };
	    }

	    // MOMENTS

	    function getSetDayOfYear (input) {
	        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	    }

	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }

	    function currentDateArray(config) {
	        var now = new Date();
	        if (config._useUTC) {
	            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
	        }
	        return [now.getFullYear(), now.getMonth(), now.getDate()];
	    }

	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray (config) {
	        var i, date, input = [], currentDate, yearToUse;

	        if (config._d) {
	            return;
	        }

	        currentDate = currentDateArray(config);

	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }

	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	            if (config._dayOfYear > daysInYear(yearToUse)) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }

	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }

	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }

	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	        }

	        // Check for 24:00:00.000
	        if (config._a[HOUR] === 24 &&
	                config._a[MINUTE] === 0 &&
	                config._a[SECOND] === 0 &&
	                config._a[MILLISECOND] === 0) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }

	        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }

	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }
	    }

	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp;

	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;

	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;

	            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
	            week = defaults(w.w, 1);

	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < dow) {
	                    ++week;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from begining of week
	                weekday = w.e + dow;
	            } else {
	                // default to begining of week
	                weekday = dow;
	            }
	        }
	        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

	        config._a[YEAR] = temp.year;
	        config._dayOfYear = temp.dayOfYear;
	    }

	    utils_hooks__hooks.ISO_8601 = function () {};

	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === utils_hooks__hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }

	        config._a = [];
	        getParsingFlags(config).empty = true;

	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i, parsedInput, tokens, token, skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0;

	        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                }
	                else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            }
	            else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }

	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }

	        // clear _12h flag if hour is <= 12
	        if (getParsingFlags(config).bigHour === true &&
	                config._a[HOUR] <= 12 &&
	                config._a[HOUR] > 0) {
	            getParsingFlags(config).bigHour = undefined;
	        }
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

	        configFromArray(config);
	        checkOverflow(config);
	    }


	    function meridiemFixWrap (locale, hour, meridiem) {
	        var isPm;

	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }

	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,

	            scoreToBeat,
	            i,
	            currentScore;

	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }

	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);

	            if (!valid__isValid(tempConfig)) {
	                continue;
	            }

	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;

	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

	            getParsingFlags(tempConfig).score = currentScore;

	            if (scoreToBeat == null || currentScore < scoreToBeat) {
	                scoreToBeat = currentScore;
	                bestMoment = tempConfig;
	            }
	        }

	        extend(config, bestMoment || tempConfig);
	    }

	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }

	        var i = normalizeObjectUnits(config._i);
	        config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];

	        configFromArray(config);
	    }

	    function createFromConfig (config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }

	        return res;
	    }

	    function prepareConfig (config) {
	        var input = config._i,
	            format = config._f;

	        config._locale = config._locale || locale_locales__getLocale(config._l);

	        if (input === null || (format === undefined && input === '')) {
	            return valid__createInvalid({nullInput: true});
	        }

	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }

	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (format) {
	            configFromStringAndFormat(config);
	        } else if (isDate(input)) {
	            config._d = input;
	        } else {
	            configFromInput(config);
	        }

	        return config;
	    }

	    function configFromInput(config) {
	        var input = config._i;
	        if (input === undefined) {
	            config._d = new Date();
	        } else if (isDate(input)) {
	            config._d = new Date(+input);
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (typeof(input) === 'object') {
	            configFromObject(config);
	        } else if (typeof(input) === 'number') {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            utils_hooks__hooks.createFromInputFallback(config);
	        }
	    }

	    function createLocalOrUTC (input, format, locale, strict, isUTC) {
	        var c = {};

	        if (typeof(locale) === 'boolean') {
	            strict = locale;
	            locale = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;

	        return createFromConfig(c);
	    }

	    function local__createLocal (input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }

	    var prototypeMin = deprecate(
	         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
	         function () {
	             var other = local__createLocal.apply(null, arguments);
	             return other < this ? this : other;
	         }
	     );

	    var prototypeMax = deprecate(
	        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
	        function () {
	            var other = local__createLocal.apply(null, arguments);
	            return other > this ? this : other;
	        }
	    );

	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return local__createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }

	    // TODO: Use [].sort instead?
	    function min () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isBefore', args);
	    }

	    function max () {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isAfter', args);
	    }

	    function Duration (duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;

	        // representation for dateAddRemove
	        this._milliseconds = +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 36e5; // 1000 * 60 * 60
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days +
	            weeks * 7;
	        // It is impossible translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months +
	            quarters * 3 +
	            years * 12;

	        this._data = {};

	        this._locale = locale_locales__getLocale();

	        this._bubble();
	    }

	    function isDuration (obj) {
	        return obj instanceof Duration;
	    }

	    function offset (token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset();
	            var sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	        });
	    }

	    offset('Z', ':');
	    offset('ZZ', '');

	    // PARSING

	    addRegexToken('Z',  matchOffset);
	    addRegexToken('ZZ', matchOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(input);
	    });

	    // HELPERS

	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;

	    function offsetFromString(string) {
	        var matches = ((string || '').match(matchOffset) || []);
	        var chunk   = matches[matches.length - 1] || [];
	        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        var minutes = +(parts[1] * 60) + toInt(parts[2]);

	        return parts[0] === '+' ? minutes : -minutes;
	    }

	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(+res._d + diff);
	            utils_hooks__hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return local__createLocal(input).local();
	        }
	    }

	    function getDateOffset (m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	    }

	    // HOOKS

	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    utils_hooks__hooks.updateOffset = function () {};

	    // MOMENTS

	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset (input, keepLocalTime) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(input);
	            }
	            if (Math.abs(input) < 16) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    utils_hooks__hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }

	    function getSetZone (input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }

	            this.utcOffset(input, keepLocalTime);

	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }

	    function setOffsetToUTC (keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }

	    function setOffsetToLocal (keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;

	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }

	    function setOffsetToParsedOffset () {
	        if (this._tzm) {
	            this.utcOffset(this._tzm);
	        } else if (typeof this._i === 'string') {
	            this.utcOffset(offsetFromString(this._i));
	        }
	        return this;
	    }

	    function hasAlignedHourOffset (input) {
	        input = input ? local__createLocal(input).utcOffset() : 0;

	        return (this.utcOffset() - input) % 60 === 0;
	    }

	    function isDaylightSavingTime () {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }

	    function isDaylightSavingTimeShifted () {
	        if (typeof this._isDSTShifted !== 'undefined') {
	            return this._isDSTShifted;
	        }

	        var c = {};

	        copyConfig(c, this);
	        c = prepareConfig(c);

	        if (c._a) {
	            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
	            this._isDSTShifted = this.isValid() &&
	                compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }

	        return this._isDSTShifted;
	    }

	    function isLocal () {
	        return !this._isUTC;
	    }

	    function isUtcOffset () {
	        return this._isUTC;
	    }

	    function isUtc () {
	        return this._isUTC && this._offset === 0;
	    }

	    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;

	    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	    var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

	    function create__createDuration (input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;

	        if (isDuration(input)) {
	            duration = {
	                ms : input._milliseconds,
	                d  : input._days,
	                M  : input._months
	            };
	        } else if (typeof input === 'number') {
	            duration = {};
	            if (key) {
	                duration[key] = input;
	            } else {
	                duration.milliseconds = input;
	            }
	        } else if (!!(match = aspNetRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y  : 0,
	                d  : toInt(match[DATE])        * sign,
	                h  : toInt(match[HOUR])        * sign,
	                m  : toInt(match[MINUTE])      * sign,
	                s  : toInt(match[SECOND])      * sign,
	                ms : toInt(match[MILLISECOND]) * sign
	            };
	        } else if (!!(match = create__isoRegex.exec(input))) {
	            sign = (match[1] === '-') ? -1 : 1;
	            duration = {
	                y : parseIso(match[2], sign),
	                M : parseIso(match[3], sign),
	                d : parseIso(match[4], sign),
	                h : parseIso(match[5], sign),
	                m : parseIso(match[6], sign),
	                s : parseIso(match[7], sign),
	                w : parseIso(match[8], sign)
	            };
	        } else if (duration == null) {// checks for null or undefined
	            duration = {};
	        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }

	        ret = new Duration(duration);

	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }

	        return ret;
	    }

	    create__createDuration.fn = Duration.prototype;

	    function parseIso (inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }

	    function positiveMomentsDifference(base, other) {
	        var res = {milliseconds: 0, months: 0};

	        res.months = other.month() - base.month() +
	            (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }

	        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

	        return res;
	    }

	    function momentsDifference(base, other) {
	        var res;
	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }

	        return res;
	    }

	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
	                tmp = val; val = period; period = tmp;
	            }

	            val = typeof val === 'string' ? +val : val;
	            dur = create__createDuration(val, period);
	            add_subtract__addSubtract(this, dur, direction);
	            return this;
	        };
	    }

	    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = duration._days,
	            months = duration._months;
	        updateOffset = updateOffset == null ? true : updateOffset;

	        if (milliseconds) {
	            mom._d.setTime(+mom._d + milliseconds * isAdding);
	        }
	        if (days) {
	            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
	        }
	        if (months) {
	            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
	        }
	        if (updateOffset) {
	            utils_hooks__hooks.updateOffset(mom, days || months);
	        }
	    }

	    var add_subtract__add      = createAdder(1, 'add');
	    var add_subtract__subtract = createAdder(-1, 'subtract');

	    function moment_calendar__calendar (time, formats) {
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || local__createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            diff = this.diff(sod, 'days', true),
	            format = diff < -6 ? 'sameElse' :
	                diff < -1 ? 'lastWeek' :
	                diff < 0 ? 'lastDay' :
	                diff < 1 ? 'sameDay' :
	                diff < 2 ? 'nextDay' :
	                diff < 7 ? 'nextWeek' : 'sameElse';
	        return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));
	    }

	    function clone () {
	        return new Moment(this);
	    }

	    function isAfter (input, units) {
	        var inputMs;
	        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this > +input;
	        } else {
	            inputMs = isMoment(input) ? +input : +local__createLocal(input);
	            return inputMs < +this.clone().startOf(units);
	        }
	    }

	    function isBefore (input, units) {
	        var inputMs;
	        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this < +input;
	        } else {
	            inputMs = isMoment(input) ? +input : +local__createLocal(input);
	            return +this.clone().endOf(units) < inputMs;
	        }
	    }

	    function isBetween (from, to, units) {
	        return this.isAfter(from, units) && this.isBefore(to, units);
	    }

	    function isSame (input, units) {
	        var inputMs;
	        units = normalizeUnits(units || 'millisecond');
	        if (units === 'millisecond') {
	            input = isMoment(input) ? input : local__createLocal(input);
	            return +this === +input;
	        } else {
	            inputMs = +local__createLocal(input);
	            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
	        }
	    }

	    function diff (input, units, asFloat) {
	        var that = cloneWithOffset(input, this),
	            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
	            delta, output;

	        units = normalizeUnits(units);

	        if (units === 'year' || units === 'month' || units === 'quarter') {
	            output = monthDiff(this, that);
	            if (units === 'quarter') {
	                output = output / 3;
	            } else if (units === 'year') {
	                output = output / 12;
	            }
	        } else {
	            delta = this - that;
	            output = units === 'second' ? delta / 1e3 : // 1000
	                units === 'minute' ? delta / 6e4 : // 1000 * 60
	                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	                delta;
	        }
	        return asFloat ? output : absFloor(output);
	    }

	    function monthDiff (a, b) {
	        // difference in months
	        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2, adjust;

	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }

	        return -(wholeMonthDiff + adjust);
	    }

	    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

	    function toString () {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }

	    function moment_format__toISOString () {
	        var m = this.clone().utc();
	        if (0 < m.year() && m.year() <= 9999) {
	            if ('function' === typeof Date.prototype.toISOString) {
	                // native implementation is ~50x faster, use it when we can
	                return this.toDate().toISOString();
	            } else {
	                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	            }
	        } else {
	            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    }

	    function format (inputString) {
	        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
	        return this.localeData().postformat(output);
	    }

	    function from (time, withoutSuffix) {
	        if (!this.isValid()) {
	            return this.localeData().invalidDate();
	        }
	        return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	    }

	    function fromNow (withoutSuffix) {
	        return this.from(local__createLocal(), withoutSuffix);
	    }

	    function to (time, withoutSuffix) {
	        if (!this.isValid()) {
	            return this.localeData().invalidDate();
	        }
	        return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	    }

	    function toNow (withoutSuffix) {
	        return this.to(local__createLocal(), withoutSuffix);
	    }

	    function locale (key) {
	        var newLocaleData;

	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = locale_locales__getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }

	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );

	    function localeData () {
	        return this._locale;
	    }

	    function startOf (units) {
	        units = normalizeUnits(units);
	        // the following switch intentionally omits break keywords
	        // to utilize falling through the cases.
	        switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	        }

	        // weeks are a special case
	        if (units === 'week') {
	            this.weekday(0);
	        }
	        if (units === 'isoWeek') {
	            this.isoWeekday(1);
	        }

	        // quarters are also special
	        if (units === 'quarter') {
	            this.month(Math.floor(this.month() / 3) * 3);
	        }

	        return this;
	    }

	    function endOf (units) {
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond') {
	            return this;
	        }
	        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	    }

	    function to_type__valueOf () {
	        return +this._d - ((this._offset || 0) * 60000);
	    }

	    function unix () {
	        return Math.floor(+this / 1000);
	    }

	    function toDate () {
	        return this._offset ? new Date(+this) : this._d;
	    }

	    function toArray () {
	        var m = this;
	        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	    }

	    function toObject () {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds()
	        };
	    }

	    function moment_valid__isValid () {
	        return valid__isValid(this);
	    }

	    function parsingFlags () {
	        return extend({}, getParsingFlags(this));
	    }

	    function invalidAt () {
	        return getParsingFlags(this).overflow;
	    }

	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });

	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });

	    function addWeekYearFormatToken (token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }

	    addWeekYearFormatToken('gggg',     'weekYear');
	    addWeekYearFormatToken('ggggg',    'weekYear');
	    addWeekYearFormatToken('GGGG',  'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

	    // ALIASES

	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');

	    // PARSING

	    addRegexToken('G',      matchSigned);
	    addRegexToken('g',      matchSigned);
	    addRegexToken('GG',     match1to2, match2);
	    addRegexToken('gg',     match1to2, match2);
	    addRegexToken('GGGG',   match1to4, match4);
	    addRegexToken('gggg',   match1to4, match4);
	    addRegexToken('GGGGG',  match1to6, match6);
	    addRegexToken('ggggg',  match1to6, match6);

	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	        week[token.substr(0, 2)] = toInt(input);
	    });

	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
	    });

	    // HELPERS

	    function weeksInYear(year, dow, doy) {
	        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
	    }

	    // MOMENTS

	    function getSetWeekYear (input) {
	        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
	        return input == null ? year : this.add((input - year), 'y');
	    }

	    function getSetISOWeekYear (input) {
	        var year = weekOfYear(this, 1, 4).year;
	        return input == null ? year : this.add((input - year), 'y');
	    }

	    function getISOWeeksInYear () {
	        return weeksInYear(this.year(), 1, 4);
	    }

	    function getWeeksInYear () {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }

	    addFormatToken('Q', 0, 0, 'quarter');

	    // ALIASES

	    addUnitAlias('quarter', 'Q');

	    // PARSING

	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });

	    // MOMENTS

	    function getSetQuarter (input) {
	        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	    }

	    addFormatToken('D', ['DD', 2], 'Do', 'date');

	    // ALIASES

	    addUnitAlias('date', 'D');

	    // PARSING

	    addRegexToken('D',  match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	    });

	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0], 10);
	    });

	    // MOMENTS

	    var getSetDayOfMonth = makeGetSet('Date', true);

	    addFormatToken('d', 0, 'do', 'day');

	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });

	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });

	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });

	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');

	    // ALIASES

	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');

	    // PARSING

	    addRegexToken('d',    match1to2);
	    addRegexToken('e',    match1to2);
	    addRegexToken('E',    match1to2);
	    addRegexToken('dd',   matchWord);
	    addRegexToken('ddd',  matchWord);
	    addRegexToken('dddd', matchWord);

	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
	        var weekday = config._locale.weekdaysParse(input);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });

	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });

	    // HELPERS

	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }

	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }

	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }

	        return null;
	    }

	    // LOCALES

	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	    function localeWeekdays (m) {
	        return this._weekdays[m.day()];
	    }

	    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	    function localeWeekdaysShort (m) {
	        return this._weekdaysShort[m.day()];
	    }

	    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	    function localeWeekdaysMin (m) {
	        return this._weekdaysMin[m.day()];
	    }

	    function localeWeekdaysParse (weekdayName) {
	        var i, mom, regex;

	        this._weekdaysParse = this._weekdaysParse || [];

	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            if (!this._weekdaysParse[i]) {
	                mom = local__createLocal([2000, 1]).day(i);
	                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function getSetDayOfWeek (input) {
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }

	    function getSetLocaleDayOfWeek (input) {
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }

	    function getSetISODayOfWeek (input) {
	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.
	        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
	    }

	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, function () {
	        return this.hours() % 12 || 12;
	    });

	    function meridiem (token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	        });
	    }

	    meridiem('a', true);
	    meridiem('A', false);

	    // ALIASES

	    addUnitAlias('hour', 'h');

	    // PARSING

	    function matchMeridiem (isStrict, locale) {
	        return locale._meridiemParse;
	    }

	    addRegexToken('a',  matchMeridiem);
	    addRegexToken('A',  matchMeridiem);
	    addRegexToken('H',  match1to2);
	    addRegexToken('h',  match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);

	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });

	    // LOCALES

	    function localeIsPM (input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return ((input + '').toLowerCase().charAt(0) === 'p');
	    }

	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	    function localeMeridiem (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }


	    // MOMENTS

	    // Setting the hour should keep the time, because the user explicitly
	    // specified which hour he wants. So trying to maintain the same hour (in
	    // a new timezone) makes sense. Adding/subtracting hours does not follow
	    // this rule.
	    var getSetHour = makeGetSet('Hours', true);

	    addFormatToken('m', ['mm', 2], 0, 'minute');

	    // ALIASES

	    addUnitAlias('minute', 'm');

	    // PARSING

	    addRegexToken('m',  match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);

	    // MOMENTS

	    var getSetMinute = makeGetSet('Minutes', false);

	    addFormatToken('s', ['ss', 2], 0, 'second');

	    // ALIASES

	    addUnitAlias('second', 's');

	    // PARSING

	    addRegexToken('s',  match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);

	    // MOMENTS

	    var getSetSecond = makeGetSet('Seconds', false);

	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });

	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });

	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });


	    // ALIASES

	    addUnitAlias('millisecond', 'ms');

	    // PARSING

	    addRegexToken('S',    match1to3, match1);
	    addRegexToken('SS',   match1to3, match2);
	    addRegexToken('SSS',  match1to3, match3);

	    var token;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }

	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }

	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }
	    // MOMENTS

	    var getSetMillisecond = makeGetSet('Milliseconds', false);

	    addFormatToken('z',  0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');

	    // MOMENTS

	    function getZoneAbbr () {
	        return this._isUTC ? 'UTC' : '';
	    }

	    function getZoneName () {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }

	    var momentPrototype__proto = Moment.prototype;

	    momentPrototype__proto.add          = add_subtract__add;
	    momentPrototype__proto.calendar     = moment_calendar__calendar;
	    momentPrototype__proto.clone        = clone;
	    momentPrototype__proto.diff         = diff;
	    momentPrototype__proto.endOf        = endOf;
	    momentPrototype__proto.format       = format;
	    momentPrototype__proto.from         = from;
	    momentPrototype__proto.fromNow      = fromNow;
	    momentPrototype__proto.to           = to;
	    momentPrototype__proto.toNow        = toNow;
	    momentPrototype__proto.get          = getSet;
	    momentPrototype__proto.invalidAt    = invalidAt;
	    momentPrototype__proto.isAfter      = isAfter;
	    momentPrototype__proto.isBefore     = isBefore;
	    momentPrototype__proto.isBetween    = isBetween;
	    momentPrototype__proto.isSame       = isSame;
	    momentPrototype__proto.isValid      = moment_valid__isValid;
	    momentPrototype__proto.lang         = lang;
	    momentPrototype__proto.locale       = locale;
	    momentPrototype__proto.localeData   = localeData;
	    momentPrototype__proto.max          = prototypeMax;
	    momentPrototype__proto.min          = prototypeMin;
	    momentPrototype__proto.parsingFlags = parsingFlags;
	    momentPrototype__proto.set          = getSet;
	    momentPrototype__proto.startOf      = startOf;
	    momentPrototype__proto.subtract     = add_subtract__subtract;
	    momentPrototype__proto.toArray      = toArray;
	    momentPrototype__proto.toObject     = toObject;
	    momentPrototype__proto.toDate       = toDate;
	    momentPrototype__proto.toISOString  = moment_format__toISOString;
	    momentPrototype__proto.toJSON       = moment_format__toISOString;
	    momentPrototype__proto.toString     = toString;
	    momentPrototype__proto.unix         = unix;
	    momentPrototype__proto.valueOf      = to_type__valueOf;

	    // Year
	    momentPrototype__proto.year       = getSetYear;
	    momentPrototype__proto.isLeapYear = getIsLeapYear;

	    // Week Year
	    momentPrototype__proto.weekYear    = getSetWeekYear;
	    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

	    // Quarter
	    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

	    // Month
	    momentPrototype__proto.month       = getSetMonth;
	    momentPrototype__proto.daysInMonth = getDaysInMonth;

	    // Week
	    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
	    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
	    momentPrototype__proto.weeksInYear    = getWeeksInYear;
	    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

	    // Day
	    momentPrototype__proto.date       = getSetDayOfMonth;
	    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
	    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
	    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
	    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

	    // Hour
	    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

	    // Minute
	    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

	    // Second
	    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

	    // Millisecond
	    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

	    // Offset
	    momentPrototype__proto.utcOffset            = getSetOffset;
	    momentPrototype__proto.utc                  = setOffsetToUTC;
	    momentPrototype__proto.local                = setOffsetToLocal;
	    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
	    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    momentPrototype__proto.isDST                = isDaylightSavingTime;
	    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
	    momentPrototype__proto.isLocal              = isLocal;
	    momentPrototype__proto.isUtcOffset          = isUtcOffset;
	    momentPrototype__proto.isUtc                = isUtc;
	    momentPrototype__proto.isUTC                = isUtc;

	    // Timezone
	    momentPrototype__proto.zoneAbbr = getZoneAbbr;
	    momentPrototype__proto.zoneName = getZoneName;

	    // Deprecations
	    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

	    var momentPrototype = momentPrototype__proto;

	    function moment__createUnix (input) {
	        return local__createLocal(input * 1000);
	    }

	    function moment__createInZone () {
	        return local__createLocal.apply(null, arguments).parseZone();
	    }

	    var defaultCalendar = {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    };

	    function locale_calendar__calendar (key, mom, now) {
	        var output = this._calendar[key];
	        return typeof output === 'function' ? output.call(mom, now) : output;
	    }

	    var defaultLongDateFormat = {
	        LTS  : 'h:mm:ss A',
	        LT   : 'h:mm A',
	        L    : 'MM/DD/YYYY',
	        LL   : 'MMMM D, YYYY',
	        LLL  : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    };

	    function longDateFormat (key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];

	        if (format || !formatUpper) {
	            return format;
	        }

	        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	            return val.slice(1);
	        });

	        return this._longDateFormat[key];
	    }

	    var defaultInvalidDate = 'Invalid date';

	    function invalidDate () {
	        return this._invalidDate;
	    }

	    var defaultOrdinal = '%d';
	    var defaultOrdinalParse = /\d{1,2}/;

	    function ordinal (number) {
	        return this._ordinal.replace('%d', number);
	    }

	    function preParsePostFormat (string) {
	        return string;
	    }

	    var defaultRelativeTime = {
	        future : 'in %s',
	        past   : '%s ago',
	        s  : 'a few seconds',
	        m  : 'a minute',
	        mm : '%d minutes',
	        h  : 'an hour',
	        hh : '%d hours',
	        d  : 'a day',
	        dd : '%d days',
	        M  : 'a month',
	        MM : '%d months',
	        y  : 'a year',
	        yy : '%d years'
	    };

	    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return (typeof output === 'function') ?
	            output(number, withoutSuffix, string, isFuture) :
	            output.replace(/%d/i, number);
	    }

	    function pastFuture (diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
	    }

	    function locale_set__set (config) {
	        var prop, i;
	        for (i in config) {
	            prop = config[i];
	            if (typeof prop === 'function') {
	                this[i] = prop;
	            } else {
	                this['_' + i] = prop;
	            }
	        }
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _ordinalParseLenient.
	        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	    }

	    var prototype__proto = Locale.prototype;

	    prototype__proto._calendar       = defaultCalendar;
	    prototype__proto.calendar        = locale_calendar__calendar;
	    prototype__proto._longDateFormat = defaultLongDateFormat;
	    prototype__proto.longDateFormat  = longDateFormat;
	    prototype__proto._invalidDate    = defaultInvalidDate;
	    prototype__proto.invalidDate     = invalidDate;
	    prototype__proto._ordinal        = defaultOrdinal;
	    prototype__proto.ordinal         = ordinal;
	    prototype__proto._ordinalParse   = defaultOrdinalParse;
	    prototype__proto.preparse        = preParsePostFormat;
	    prototype__proto.postformat      = preParsePostFormat;
	    prototype__proto._relativeTime   = defaultRelativeTime;
	    prototype__proto.relativeTime    = relative__relativeTime;
	    prototype__proto.pastFuture      = pastFuture;
	    prototype__proto.set             = locale_set__set;

	    // Month
	    prototype__proto.months       =        localeMonths;
	    prototype__proto._months      = defaultLocaleMonths;
	    prototype__proto.monthsShort  =        localeMonthsShort;
	    prototype__proto._monthsShort = defaultLocaleMonthsShort;
	    prototype__proto.monthsParse  =        localeMonthsParse;

	    // Week
	    prototype__proto.week = localeWeek;
	    prototype__proto._week = defaultLocaleWeek;
	    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
	    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

	    // Day of Week
	    prototype__proto.weekdays       =        localeWeekdays;
	    prototype__proto._weekdays      = defaultLocaleWeekdays;
	    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
	    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
	    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
	    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
	    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

	    // Hours
	    prototype__proto.isPM = localeIsPM;
	    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
	    prototype__proto.meridiem = localeMeridiem;

	    function lists__get (format, index, field, setter) {
	        var locale = locale_locales__getLocale();
	        var utc = create_utc__createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }

	    function list (format, index, field, count, setter) {
	        if (typeof format === 'number') {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';

	        if (index != null) {
	            return lists__get(format, index, field, setter);
	        }

	        var i;
	        var out = [];
	        for (i = 0; i < count; i++) {
	            out[i] = lists__get(format, i, field, setter);
	        }
	        return out;
	    }

	    function lists__listMonths (format, index) {
	        return list(format, index, 'months', 12, 'month');
	    }

	    function lists__listMonthsShort (format, index) {
	        return list(format, index, 'monthsShort', 12, 'month');
	    }

	    function lists__listWeekdays (format, index) {
	        return list(format, index, 'weekdays', 7, 'day');
	    }

	    function lists__listWeekdaysShort (format, index) {
	        return list(format, index, 'weekdaysShort', 7, 'day');
	    }

	    function lists__listWeekdaysMin (format, index) {
	        return list(format, index, 'weekdaysMin', 7, 'day');
	    }

	    locale_locales__getSetGlobalLocale('en', {
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal : function (number) {
	            var b = number % 10,
	                output = (toInt(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    // Side effect imports
	    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
	    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

	    var mathAbs = Math.abs;

	    function duration_abs__abs () {
	        var data           = this._data;

	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days         = mathAbs(this._days);
	        this._months       = mathAbs(this._months);

	        data.milliseconds  = mathAbs(data.milliseconds);
	        data.seconds       = mathAbs(data.seconds);
	        data.minutes       = mathAbs(data.minutes);
	        data.hours         = mathAbs(data.hours);
	        data.months        = mathAbs(data.months);
	        data.years         = mathAbs(data.years);

	        return this;
	    }

	    function duration_add_subtract__addSubtract (duration, input, value, direction) {
	        var other = create__createDuration(input, value);

	        duration._milliseconds += direction * other._milliseconds;
	        duration._days         += direction * other._days;
	        duration._months       += direction * other._months;

	        return duration._bubble();
	    }

	    // supports only 2.0-style add(1, 's') or add(duration)
	    function duration_add_subtract__add (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, 1);
	    }

	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function duration_add_subtract__subtract (input, value) {
	        return duration_add_subtract__addSubtract(this, input, value, -1);
	    }

	    function absCeil (number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }

	    function bubble () {
	        var milliseconds = this._milliseconds;
	        var days         = this._days;
	        var months       = this._months;
	        var data         = this._data;
	        var seconds, minutes, hours, years, monthsFromDays;

	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0))) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }

	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;

	        seconds           = absFloor(milliseconds / 1000);
	        data.seconds      = seconds % 60;

	        minutes           = absFloor(seconds / 60);
	        data.minutes      = minutes % 60;

	        hours             = absFloor(minutes / 60);
	        data.hours        = hours % 24;

	        days += absFloor(hours / 24);

	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));

	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;

	        data.days   = days;
	        data.months = months;
	        data.years  = years;

	        return this;
	    }

	    function daysToMonths (days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return days * 4800 / 146097;
	    }

	    function monthsToDays (months) {
	        // the reverse of daysToMonths
	        return months * 146097 / 4800;
	    }

	    function as (units) {
	        var days;
	        var months;
	        var milliseconds = this._milliseconds;

	        units = normalizeUnits(units);

	        if (units === 'month' || units === 'year') {
	            days   = this._days   + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            return units === 'month' ? months : months / 12;
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week'   : return days / 7     + milliseconds / 6048e5;
	                case 'day'    : return days         + milliseconds / 864e5;
	                case 'hour'   : return days * 24    + milliseconds / 36e5;
	                case 'minute' : return days * 1440  + milliseconds / 6e4;
	                case 'second' : return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	                default: throw new Error('Unknown unit ' + units);
	            }
	        }
	    }

	    // TODO: Use this.as('ms')?
	    function duration_as__valueOf () {
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }

	    function makeAs (alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }

	    var asMilliseconds = makeAs('ms');
	    var asSeconds      = makeAs('s');
	    var asMinutes      = makeAs('m');
	    var asHours        = makeAs('h');
	    var asDays         = makeAs('d');
	    var asWeeks        = makeAs('w');
	    var asMonths       = makeAs('M');
	    var asYears        = makeAs('y');

	    function duration_get__get (units) {
	        units = normalizeUnits(units);
	        return this[units + 's']();
	    }

	    function makeGetter(name) {
	        return function () {
	            return this._data[name];
	        };
	    }

	    var milliseconds = makeGetter('milliseconds');
	    var seconds      = makeGetter('seconds');
	    var minutes      = makeGetter('minutes');
	    var hours        = makeGetter('hours');
	    var days         = makeGetter('days');
	    var months       = makeGetter('months');
	    var years        = makeGetter('years');

	    function weeks () {
	        return absFloor(this.days() / 7);
	    }

	    var round = Math.round;
	    var thresholds = {
	        s: 45,  // seconds to minute
	        m: 45,  // minutes to hour
	        h: 22,  // hours to day
	        d: 26,  // days to month
	        M: 11   // months to year
	    };

	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }

	    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
	        var duration = create__createDuration(posNegDuration).abs();
	        var seconds  = round(duration.as('s'));
	        var minutes  = round(duration.as('m'));
	        var hours    = round(duration.as('h'));
	        var days     = round(duration.as('d'));
	        var months   = round(duration.as('M'));
	        var years    = round(duration.as('y'));

	        var a = seconds < thresholds.s && ['s', seconds]  ||
	                minutes === 1          && ['m']           ||
	                minutes < thresholds.m && ['mm', minutes] ||
	                hours   === 1          && ['h']           ||
	                hours   < thresholds.h && ['hh', hours]   ||
	                days    === 1          && ['d']           ||
	                days    < thresholds.d && ['dd', days]    ||
	                months  === 1          && ['M']           ||
	                months  < thresholds.M && ['MM', months]  ||
	                years   === 1          && ['y']           || ['yy', years];

	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }

	    // This function allows you to set a threshold for relative time strings
	    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        return true;
	    }

	    function humanize (withSuffix) {
	        var locale = this.localeData();
	        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }

	        return locale.postformat(output);
	    }

	    var iso_string__abs = Math.abs;

	    function iso_string__toISOString() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        var seconds = iso_string__abs(this._milliseconds) / 1000;
	        var days         = iso_string__abs(this._days);
	        var months       = iso_string__abs(this._months);
	        var minutes, hours, years;

	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes           = absFloor(seconds / 60);
	        hours             = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;

	        // 12 months -> 1 year
	        years  = absFloor(months / 12);
	        months %= 12;


	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        var Y = years;
	        var M = months;
	        var D = days;
	        var h = hours;
	        var m = minutes;
	        var s = seconds;
	        var total = this.asSeconds();

	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }

	        return (total < 0 ? '-' : '') +
	            'P' +
	            (Y ? Y + 'Y' : '') +
	            (M ? M + 'M' : '') +
	            (D ? D + 'D' : '') +
	            ((h || m || s) ? 'T' : '') +
	            (h ? h + 'H' : '') +
	            (m ? m + 'M' : '') +
	            (s ? s + 'S' : '');
	    }

	    var duration_prototype__proto = Duration.prototype;

	    duration_prototype__proto.abs            = duration_abs__abs;
	    duration_prototype__proto.add            = duration_add_subtract__add;
	    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
	    duration_prototype__proto.as             = as;
	    duration_prototype__proto.asMilliseconds = asMilliseconds;
	    duration_prototype__proto.asSeconds      = asSeconds;
	    duration_prototype__proto.asMinutes      = asMinutes;
	    duration_prototype__proto.asHours        = asHours;
	    duration_prototype__proto.asDays         = asDays;
	    duration_prototype__proto.asWeeks        = asWeeks;
	    duration_prototype__proto.asMonths       = asMonths;
	    duration_prototype__proto.asYears        = asYears;
	    duration_prototype__proto.valueOf        = duration_as__valueOf;
	    duration_prototype__proto._bubble        = bubble;
	    duration_prototype__proto.get            = duration_get__get;
	    duration_prototype__proto.milliseconds   = milliseconds;
	    duration_prototype__proto.seconds        = seconds;
	    duration_prototype__proto.minutes        = minutes;
	    duration_prototype__proto.hours          = hours;
	    duration_prototype__proto.days           = days;
	    duration_prototype__proto.weeks          = weeks;
	    duration_prototype__proto.months         = months;
	    duration_prototype__proto.years          = years;
	    duration_prototype__proto.humanize       = humanize;
	    duration_prototype__proto.toISOString    = iso_string__toISOString;
	    duration_prototype__proto.toString       = iso_string__toISOString;
	    duration_prototype__proto.toJSON         = iso_string__toISOString;
	    duration_prototype__proto.locale         = locale;
	    duration_prototype__proto.localeData     = localeData;

	    // Deprecations
	    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
	    duration_prototype__proto.lang = lang;

	    // Side effect imports

	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');

	    // PARSING

	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input, 10) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });

	    // Side effect imports


	    utils_hooks__hooks.version = '2.10.6';

	    setHookCallback(local__createLocal);

	    utils_hooks__hooks.fn                    = momentPrototype;
	    utils_hooks__hooks.min                   = min;
	    utils_hooks__hooks.max                   = max;
	    utils_hooks__hooks.utc                   = create_utc__createUTC;
	    utils_hooks__hooks.unix                  = moment__createUnix;
	    utils_hooks__hooks.months                = lists__listMonths;
	    utils_hooks__hooks.isDate                = isDate;
	    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
	    utils_hooks__hooks.invalid               = valid__createInvalid;
	    utils_hooks__hooks.duration              = create__createDuration;
	    utils_hooks__hooks.isMoment              = isMoment;
	    utils_hooks__hooks.weekdays              = lists__listWeekdays;
	    utils_hooks__hooks.parseZone             = moment__createInZone;
	    utils_hooks__hooks.localeData            = locale_locales__getLocale;
	    utils_hooks__hooks.isDuration            = isDuration;
	    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
	    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
	    utils_hooks__hooks.defineLocale          = defineLocale;
	    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
	    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
	    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;

	    var _moment = utils_hooks__hooks;

	    return _moment;

	}));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(68)(module)))

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./zh-cn": 70,
		"./zh-cn.js": 70,
		"./zh-tw": 71,
		"./zh-tw.js": 71
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 69;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : chinese (zh-cn)
	//! author : suupic : https://github.com/suupic
	//! author : Zeno Zeng : https://github.com/zenozeng

	;(function (global, factory) {
	    true ? factory(__webpack_require__(67)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var zh_cn = moment.defineLocale('zh-cn', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah点mm分',
	            LTS : 'Ah点m分s秒',
	            L : 'YYYY-MM-DD',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah点mm分',
	            LLLL : 'YYYY年MMMD日ddddAh点mm分',
	            l : 'YYYY-MM-DD',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah点mm分',
	            llll : 'YYYY年MMMD日ddddAh点mm分'
	        },
	        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	        meridiemHour: function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '凌晨' || meridiem === '早上' ||
	                    meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            } else {
	                // '中午'
	                return hour >= 11 ? hour : hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 600) {
	                return '凌晨';
	            } else if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : function () {
	                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
	            },
	            nextDay : function () {
	                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
	            },
	            lastDay : function () {
	                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
	            },
	            nextWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            lastWeek : function () {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            sameElse : 'LL'
	        },
	        ordinalParse: /\d{1,2}(日|月|周)/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            case 'M':
	                return number + '月';
	            case 'w':
	            case 'W':
	                return number + '周';
	            default:
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s内',
	            past : '%s前',
	            s : '几秒',
	            m : '1 分钟',
	            mm : '%d 分钟',
	            h : '1 小时',
	            hh : '%d 小时',
	            d : '1 天',
	            dd : '%d 天',
	            M : '1 个月',
	            MM : '%d 个月',
	            y : '1 年',
	            yy : '%d 年'
	        },
	        week : {
	            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
	            dow : 1, // Monday is the first day of the week.
	            doy : 4  // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return zh_cn;

	}));

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : traditional chinese (zh-tw)
	//! author : Ben : https://github.com/ben-lin

	;(function (global, factory) {
	    true ? factory(__webpack_require__(67)) :
	   typeof define === 'function' && define.amd ? define(['moment'], factory) :
	   factory(global.moment)
	}(this, function (moment) { 'use strict';


	    var zh_tw = moment.defineLocale('zh-tw', {
	        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat : {
	            LT : 'Ah點mm分',
	            LTS : 'Ah點m分s秒',
	            L : 'YYYY年MMMD日',
	            LL : 'YYYY年MMMD日',
	            LLL : 'YYYY年MMMD日Ah點mm分',
	            LLLL : 'YYYY年MMMD日ddddAh點mm分',
	            l : 'YYYY年MMMD日',
	            ll : 'YYYY年MMMD日',
	            lll : 'YYYY年MMMD日Ah點mm分',
	            llll : 'YYYY年MMMD日ddddAh點mm分'
	        },
	        meridiemParse: /早上|上午|中午|下午|晚上/,
	        meridiemHour : function (hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '早上' || meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '中午') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            }
	        },
	        meridiem : function (hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar : {
	            sameDay : '[今天]LT',
	            nextDay : '[明天]LT',
	            nextWeek : '[下]ddddLT',
	            lastDay : '[昨天]LT',
	            lastWeek : '[上]ddddLT',
	            sameElse : 'L'
	        },
	        ordinalParse: /\d{1,2}(日|月|週)/,
	        ordinal : function (number, period) {
	            switch (period) {
	            case 'd' :
	            case 'D' :
	            case 'DDD' :
	                return number + '日';
	            case 'M' :
	                return number + '月';
	            case 'w' :
	            case 'W' :
	                return number + '週';
	            default :
	                return number;
	            }
	        },
	        relativeTime : {
	            future : '%s內',
	            past : '%s前',
	            s : '幾秒',
	            m : '1分鐘',
	            mm : '%d分鐘',
	            h : '1小時',
	            hh : '%d小時',
	            d : '1天',
	            dd : '%d天',
	            M : '1個月',
	            MM : '%d個月',
	            y : '1年',
	            yy : '%d年'
	        }
	    });

	    return zh_tw;

	}));

/***/ },
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var underscore = __webpack_require__(76);
	module.exports = underscore;


/***/ },
/* 76 */
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
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		__webpack_require__(46) ;
		__webpack_require__(48) ;
		__webpack_require__(50);
	  	__webpack_require__(52);
		__webpack_require__(57) ;
		__webpack_require__(87) ;
		__webpack_require__(89) ;
		__webpack_require__(62) ;
		__webpack_require__(91) ;
		__webpack_require__(92) ;
		__webpack_require__(93) ;
		__webpack_require__(94) ;
		__webpack_require__(95) ;
		var app = angular.module('app',['ngMessages','app.service','app.controller','app.directive','app.validator']); 
		/**页面加载完毕之后启动angualr**/
		module.exports = { 
	 		init: function(){ 
				angular.element(document).ready(function() {
				     angular.bootstrap(document, ['app']);
				});
	 		} 
	 	} 
	//}) ;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);

/***/ },
/* 88 */
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
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var tui_core = __webpack_require__(90);
	module.exports = tui_core;


/***/ },
/* 90 */
/***/ function(module, exports) {

	// Generated by CoffeeScript 1.9.3

	/*
	jQuery Growl
	Copyright 2015 Kevin Sylvestre
	1.3.1
	 */

	(function() {
	  "use strict";
	  var $, Animation, Growl,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  $ = jQuery;

	  Animation = (function() {
	    function Animation() {}

	    Animation.transitions = {
	      "webkitTransition": "webkitTransitionEnd",
	      "mozTransition": "mozTransitionEnd",
	      "oTransition": "oTransitionEnd",
	      "transition": "transitionend"
	    };

	    Animation.transition = function($el) {
	      var el, ref, result, type;
	      el = $el[0];
	      ref = this.transitions;
	      for (type in ref) {
	        result = ref[type];
	        if (el.style[type] != null) {
	          return result;
	        }
	      }
	    };

	    return Animation;

	  })();

	  Growl = (function() {
	    Growl.settings = {
	      namespace: 'growl',
	      duration: 3200,
	      close: "&#215;",
	      location: "default",
	      style: "default",
	      size: "medium"
	    };

	    Growl.growl = function(settings) {
	      if (settings == null) {
	        settings = {};
	      }
	      this.initialize();
	      return new Growl(settings);
	    };

	    Growl.initialize = function() {
	      return $("body:not(:has(#growls))").append('<div id="growls" />');
	    };

	    function Growl(settings) {
	      if (settings == null) {
	        settings = {};
	      }
	      this.container = bind(this.container, this);
	      this.content = bind(this.content, this);
	      this.html = bind(this.html, this);
	      this.$growl = bind(this.$growl, this);
	      this.$growls = bind(this.$growls, this);
	      this.animate = bind(this.animate, this);
	      this.remove = bind(this.remove, this);
	      this.dismiss = bind(this.dismiss, this);
	      this.present = bind(this.present, this);
	      this.cycle = bind(this.cycle, this);
	      this.close = bind(this.close, this);
	      this.click = bind(this.click, this);
	      this.unbind = bind(this.unbind, this);
	      this.bind = bind(this.bind, this);
	      this.render = bind(this.render, this);
	      this.settings = $.extend({}, Growl.settings, settings);
	      this.$growls().attr('class', this.settings.location);
	      this.render();
	    }

	    Growl.prototype.render = function() {
	      var $growl;
	      $growl = this.$growl();
	      this.$growls().append($growl);
	      if (this.settings.fixed) {
	        this.present();
	      } else {
	        this.cycle();
	      }
	    };

	    Growl.prototype.bind = function($growl) {
	      if ($growl == null) {
	        $growl = this.$growl();
	      }
	      $growl.on("click", this.click);
	      return $growl.on("contextmenu", this.close).find("." + this.settings.namespace + "-close").on("click", this.close);
	    };

	    Growl.prototype.unbind = function($growl) {
	      if ($growl == null) {
	        $growl = this.$growl();
	      }
	      $growl.off("click", this.click);
	      return $growl.off("contextmenu", this.close).find("." + this.settings.namespace + "-close").off("click", this.close);
	    };

	    Growl.prototype.click = function(event) {
	      if (this.settings.url != null) {
	        event.preventDefault();
	        event.stopPropagation();
	        return window.open(this.settings.url);
	      }
	    };

	    Growl.prototype.close = function(event) {
	      var $growl;
	      event.preventDefault();
	      event.stopPropagation();
	      $growl = this.$growl();
	      return $growl.stop().queue(this.dismiss).queue(this.remove);
	    };

	    Growl.prototype.cycle = function() {
	      var $growl;
	      $growl = this.$growl();
	      return $growl.queue(this.present).delay(this.settings.duration).queue(this.dismiss).queue(this.remove);
	    };

	    Growl.prototype.present = function(callback) {
	      var $growl;
	      $growl = this.$growl();
	      this.bind($growl);
	      return this.animate($growl, this.settings.namespace + "-incoming", 'out', callback);
	    };

	    Growl.prototype.dismiss = function(callback) {
	      var $growl;
	      $growl = this.$growl();
	      this.unbind($growl);
	      return this.animate($growl, this.settings.namespace + "-outgoing", 'in', callback);
	    };

	    Growl.prototype.remove = function(callback) {
	      this.$growl().remove();
	      return callback();
	    };

	    Growl.prototype.animate = function($element, name, direction, callback) {
	      var transition;
	      if (direction == null) {
	        direction = 'in';
	      }
	      transition = Animation.transition($element);
	      $element[direction === 'in' ? 'removeClass' : 'addClass'](name);
	      $element.offset().position;
	      $element[direction === 'in' ? 'addClass' : 'removeClass'](name);
	      if (callback == null) {
	        return;
	      }
	      if (transition != null) {
	        $element.one(transition, callback);
	      } else {
	        callback();
	      }
	    };

	    Growl.prototype.$growls = function() {
	      return this.$_growls != null ? this.$_growls : this.$_growls = $('#growls');
	    };

	    Growl.prototype.$growl = function() {
	      return this.$_growl != null ? this.$_growl : this.$_growl = $(this.html());
	    };

	    Growl.prototype.html = function() {
	      return this.container(this.content());
	    };

	    Growl.prototype.content = function() {
	      return "<div class='" + this.settings.namespace + "-close'>" + this.settings.close + "</div>\n<div class='" + this.settings.namespace + "-title'>" + this.settings.title + "</div>\n<div class='" + this.settings.namespace + "-message'>" + this.settings.message + "</div>";
	    };

	    Growl.prototype.container = function(content) {
	      return "<div class='" + this.settings.namespace + " " + this.settings.namespace + "-" + this.settings.style + " " + this.settings.namespace + "-" + this.settings.size + "'>\n  " + content + "\n</div>";
	    };

	    return Growl;

	  })();

	  this.Growl = Growl;

	  $.growl = function(options) {
	    if (options == null) {
	      options = {};
	    }
	    return Growl.growl(options);
	  };

	  $.growl.error = function(options) {
	    var settings;
	    if (options == null) {
	      options = {};
	    }
	    settings = {
	      title: "",/*这里面是title信息*/
	      style: "error"
	    };
	    return $.growl($.extend(settings, options));
	  };

	  $.growl.notice = function(options) {
	    var settings;
	    if (options == null) {
	      options = {};
	    }
	    settings = {
	      title: "",/*这里面是title信息*/
	      style: "notice"
	    };
	    return $.growl($.extend(settings, options));
	  };

	  $.growl.warning = function(options) {
	    var settings;
	    if (options == null) {
	      options = {};
	    }
	    settings = {
	      title: "",/*这里面是title信息*/
	      style: "warning"
	    };
	    return $.growl($.extend(settings, options));
	  };

	}).call(this);


/***/ },
/* 91 */
/***/ function(module, exports) {

	//define(function(require, exports, module) {
		var app = angular.module('app.service',[]) ;
		app.factory('FormData', function(){
		  return {
			  id:'',
			  action:'',
			  carrCode:'',//航空公司
			  contextPath:'',
		      status:'1',//1:未生效的记录
			  sequenceNumber:'',//序列号
			  firstMaintenanceDate:'',//生效日期
			  lastMaintenanceDate:'',//截止日期
			  basicCurrencyUnit:'',//基准货币类型
			  exchangeFactor:'',//兑换系数
			  serviceType:'F',//服务类型
			  subCode:'',//服务子代码
			  groupCode:'',//服务所在组
			  frequentFlyerStatus:'',//常旅客等级
			  geoSpecLoc1Type:'',//区域一类型
			  geoSpecLoc1:'',//区域一代码
			  geoSpecLoc2Type:'',//区域二类型
			  geoSpecLoc2:''//区域二代码
		  };
		}) ;
	//}) ;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module){ 
		var app = angular.module('app.service') ;
		var util = __webpack_require__(65) ;
		// $q 是内置服务，所以可以直接使用  //HttpOperService//S7EditService
		app.factory('HttpOperService', ['$http', '$q', function ($http, $q) {  
		  return {  
			    get4JSONData : function(url) {
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
			    post4JSONData:function(url,queryParam,config){
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
	//}) ;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		var app = angular.module('app.controller',[]) ;
		var _ = __webpack_require__(75) ;
		var util = __webpack_require__(65) ;
		var moment = __webpack_require__(66) ;
		
		var dateTimeFormatStr = 'YYYY-MM-DD HH:mm' ;
		var dateFormatStr = "YYYY-MM-DD" ; 
		
		function changeInputStatus4Submit(data,myForm){
	        var keys1 = _.keys(data) ;
	        var keys2 = _.keys(myForm) ;
	        _.each(keys2,function(item){
	            if(_.contains(keys1,item)){
	                myForm[item].$setDirty(true) ;
	            }
	        }) ;
	    }
		function convertVo2FormData(vo,formData){
			for(var p in formData) {
				var flag =  vo.hasOwnProperty(p);
				if(flag){
					formData[p] = vo[p]  ;
				}
			}
		}	
		app.controller('EditController',['$scope','FormData','HttpOperService',function($scope,FormData,HttpOperService){
			$scope.data = FormData ;
			var id =  $("#id").val() ;
			var carrCode = $("#carrCode").val() ;
			var action = $("#action").val() ;
			var contextPath = $("#contextPath").val() ;
			FormData.id = id ;
			FormData.action = action ;
			FormData.carrCode = carrCode ;
			FormData.contextPath = contextPath ;
			if(action=='add'){
				$scope.headerTipStr ="新增里程积分兑换" ;
				initPage4Add() ;
			}else if(action=='update'){
				$scope.headerTipStr ="更新里程积分兑换" ;
				initPage4Update() ;
			}
			
			
			$scope.disabledEditFlag = false;
			/*$.growl({ title: "Growl", message: "The kitten is awake!", url: "/kittens" });
		    $.growl.error({ message: "The kitten is attacking!" });
		    $.growl.notice({ message: "The kitten is cute!" });
		    $.growl.warning({ message: "The kitten is ugly!" });*/
			//growl.addSuccessMessage("This adds a success message");
	        //growl.addErrorMessage("This adds a error message");
			//常旅客等级，从数据库配置中读取
	        $scope.frequentFlyerStatusList = [] ;
	        //服务所在组，从数据库配置中读取
	        $scope.groupCodeList = [];
	        //当前日期
	        var currentDateTimeStr = moment().add('hour',1).format("YYYY-MM-DD HH") +":00" ;
	        var currentDateStr = moment().format(dateFormatStr) ;
	        $scope.currentDateStr = currentDateStr ;
	        
			function initPage4Add(){
				 //console.info('初始化新增页面数据') ;
				// var carrCode = $scope.data.carrCode;
				 var url = $scope.data.contextPath +"/mileage/initFormData.action" ; 
				 HttpOperService.get4JSONData(url).then(function(retData){
					 $scope.data.firstMaintenanceDate = currentDateTimeStr;
					 $scope.data.lastMaintenanceDate = "";
					 if (retData.flag == 'true' ||retData.flag==true) {
							$scope.data.sequenceNumber = retData.sequenceNumber;
							$scope.frequentFlyerStatusList = retData.frequentFlyerStatusList ;
							$scope.groupCodeList = retData.groupCodeList;
							/*if(retData.frequentFlyerStatusList&&retData.frequentFlyerStatusList.length>0){
								$scope.data.frequentFlyerStatus = retData.frequentFlyerStatusList[0] ['value'];
							}*/
							if(retData.groupCodeList && retData.groupCodeList.length>0){
								$scope.data.groupCode = retData.groupCodeList[0] ['value'];
							}
						} else {
							//growl.addErrorMessage("初始化页面出错!");
							$.growl.error({ message: "初始化页面出错!" });
						}
					}
				 );
			}
			function initPage4Update(){
				//console.info('初始化修改页面数据') ;
				var url = $scope.data.contextPath +"/mileage/findMileageExchangeById.action?id="+id ;
				 HttpOperService.get4JSONData(url).then(function(retData){
					 if (retData.flag == 'true' ||retData.flag==true) {
						 $scope.frequentFlyerStatusList = retData.frequentFlyerStatusList ;
						 $scope.groupCodeList = retData.groupCodeList;
						 convertVo2FormData(retData.vo,$scope.data);
						 //判断是否可以编辑页面
						 var disabledEditFlag = util.checkMileageStatusIsDisabled($scope.data.status) ;
						 $scope.disabledEditFlag = disabledEditFlag ;
					 }else{
						// growl.addErrorMessage("初始化页面出错!");
						$.growl.error({ message: "初始化页面出错!" });
					 }
				 },function(err){
					//console.info(JSON.stringify(err));
					//growl.addErrorMessage("初始化页面出错!");
					$.growl.error({ message: "初始化页面出错!" });
				 });
				 
			}
			
			
			$scope.submitPage = function(){
					var serverURL =contextPath+ "/mileage/saveMileageExchangeData.action" ;  
					var ngFlag = $scope.myForm.$valid ;
					//var jqFlag = validator.form() ;
					changeInputStatus4Submit($scope.data,$scope.myForm) ;
					//console.info("ngFlag : " + ngFlag ) ;
					if(ngFlag){
						$.showTuiConfirmDialog('保存?', function() {
							var promise = HttpOperService.post4JSONData(serverURL,$scope.data,{"action":$scope.data.action})  ;
							promise.then(function(retData){
								if(retData.flag==true||retData.flag=='true'){
									$.growl.notice({ message: "保存成功，即将返回查询页面!" });
						  			setTimeout(function() {
										window.location.href= $scope.data.contextPath+'/mileage/toMileageExchangeUI.action' ;
									}, 2000);
								}else{
									$.growl.error({ message: "保存数据出错!" });
								}
							},function(err){
								//console.info(JSON.stringify(err)) ;
								//growl.addErrorMessage("保存数据出错!");
								$.growl.error({ message: "保存数据出错!" });
							}) ;
						});
					}
			}
			
			//需求变更，屏蔽这两种行李类型,{"name":"逾重行李服务","value":"C"},{"name":"预付费行李服务","value":"P"}
			$scope.selectList = {
					"serviceTypeList":[
					    {"name":"运价相关服务","value":"F"},{"name":"商品相关服务","value":"M"},
					    {"name":"规则相关服务","value":"R"},{"name":"客票相关服务","value":"T"},
					    {"name":"逾重行李服务","value":"C"},{"name":"预付费行李服务","value":"P"}
					],
					"geoLocTypeList":[//区域集合
			            {"name":"请选择","value":""},
	    				{"name":"大区","value":"A"},{"name":"城市","value":"C"},
	    				{"name":"国家","value":"N"},{"name":"机场","value":"P"},
	    				{"name":"州","value":"S"},{"name":"区域","value":"Z"}
			        ]
			
			} ;
			$scope.backPage = function(){
				 window.location.href= $scope.data.contextPath+'/mileage/toMileageExchangeUI.action' ;
			}
			
			$scope.changeGeoSpecLoc1Type = function(){
				$scope.data.geoSpecLoc1 = "" ;
			}
			
			$scope.changeGeoSpecLoc2Type = function(){
				$scope.data.geoSpecLoc2 = "" ;
			}
			
		}]) ;
		
	//}) ;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		var util = __webpack_require__(65) ;
		var _ = __webpack_require__(75) ;
		var app = angular.module('app.directive',[]) ;
		
		app.directive('datetimepicker', [function () {
	        return {
	            restrict: 'A',
	            scope:true,
	            require:'?ngModel',
	            link: function (scope, iElement, iAttrs,ctrl) {
	                if(!ctrl) return ;
	                var minDateStr = iAttrs['datetimepicker'] ;
	                var minDate = new Date(minDateStr) ;
	                //配置日期控件
	                var optionObj = {} ;
	                optionObj.dateFormat = "yy-mm-dd" ;
	                optionObj.timeFormat = 'HH:mm' ;
	                var updateModel = function(dateText){
	                    scope.$apply(function  () {
	                        //调用angular内部的工具更新双向绑定关系
	                        ctrl.$setViewValue(dateText) ;
	                    }) ;
	                }
	                optionObj.onSelect = function(dateText,picker){
	                    updateModel(dateText) ;
	                    if(scope.select){
	                        scope.$apply(function  () {
	                            scope.select({date:dateText}) ;
	                        }) ;
	                    }
	                }
	                 optionObj.minDate = minDate ;
	                optionObj.timeText="&nbsp;&nbsp;时间" ;
	                optionObj.hourText ="&nbsp;&nbsp;时" ;
	                optionObj.minuteText ="&nbsp;&nbsp;分" ;
	                //optionObj.secondText = "&nbsp;&nbsp;秒" ;
	                optionObj.currentText = "当前" ;
	                optionObj.closeText = "关闭" ;
	                optionObj.showButtonPanel = true ;
	                //optionObj.showSecond = true ;
	                iElement.datetimepicker(optionObj) ;
	            }
	        };
	    }]) ;
		
		app.directive("upperInput",function(){
	        return{
	            restrict:'A',
	            require:'ngModel',
	            link:function(scope,element,attrs,ngModel){
	                if (!ngModel){
	                	return; 
	                }
	                ngModel.$render = function() {
	                    var tmp = ngModel.$viewValue || '' ;
	                    tmp = tmp.toUpperCase() ;
	                    element.val(tmp);
	                    ngModel.$setViewValue(tmp);
	                };
	                $(element).bind('blur', function() {
	                    scope.$apply(read);
	                });
	                function read() {
	                    var tmp = ngModel.$viewValue || '';
	                    tmp = tmp.toUpperCase() ;
	                    ngModel.$setViewValue(tmp);
	                    element.val(tmp);
	                }
	            }
	        }
	    }) ;
		
		
		
	    //区域长度限制
	    app.directive('geoMaxLength',function(){
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
	    
	//}) ;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		var util = __webpack_require__(65) ;
		 var _ = __webpack_require__(75) ;
		var app = angular.module("app.validator",[]) ;
		
		
		app.directive('letterOrNum',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"?ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                if(!ctrl) return ;
	                ctrl.$validators.letterOrNum = function(modelValue,viewValue){
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
	    
	     //自定义校验(三字码)(必须为3位长度)
	    app.directive('threecode2',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	            	if(!ctrl) return ;
	            	ctrl.$validators.threecode2 = function(modelValue,viewValue){
	                    if(viewValue!=''){
	                        return util.isThreecode2(viewValue);
	                    }
	                    return true;
	                };
	            }
	        }
	    });
	    
	    app.directive('remoteValidate',['HttpOperService',function(HttpOperService){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"?ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                if(!ctrl) return ;
	                ctrl.$parsers.push(function(viewValue){
	                    if(viewValue!=''){
								var url =scope.data.contextPath+"/mileage/checkSequenceNumberNotExist.action";
								var param = {"id":scope.data.id,"sequcenceNumber":viewValue}	                    	
						    	var promise = HttpOperService.post4JSONData(url,param) ;
						    	promise.then(function(retData){
						    		if(retData.flag=='true'){
						    				if(retData.existFlag=='true'){
						    					 ctrl.$setValidity('remoteValidate',true);
											}else{
												ctrl.$setValidity('remoteValidate',false);
											}
						    		}else{
						    			ctrl.$setValidity('remoteValidate',false);
						    		}
						    	}) ;
	                    }
	                    ctrl.$setValidity('remoteValidate',true);
	                    return viewValue;
	                });
	            }
	        };
	    }]);
	    
	      //biggerDate
	    app.directive('biggerDateTime',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                if (!ctrl) return;
	                ctrl.$validators.biggerDateTime = function(modelValue, viewValue) {
	                    var compareVal = attrs['biggerDateTime'] ;
	                    if(viewValue!=''&&compareVal!=''){
	                        return util.isBiggerDateTimeThan(viewValue,compareVal) ;
	                    }
	                    return true;
	                };
	                attrs.$observe('biggerDateTime', function() {
	                    ctrl.$validate();
	                });
	            }
	        }
	    });

	    //smallerDate
	    app.directive('smallerDateTime',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	                if (!ctrl) return;
	                ctrl.$validators.smallerDateTime = function(modelValue, viewValue) {
	                    var compareVal = attrs['smallerDateTime'] ;
	                    if(viewValue!=''&&compareVal!=''){
	                        return util.isSmallerDateTimeThan(viewValue,compareVal) ; 
	                    }
	                    return true;
	                };
	                attrs.$observe('smallerDateTime', function() {
	                    ctrl.$validate();
	                });
	            }
	        }
	    });
	    
	    
	    //biggerThanCurrent(disabled的控件不做校验)
	    app.directive('biggerDateTimeCurrent',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	            	if (!ctrl) return;
	                ctrl.$validators.biggerDateTimeCurrent = function(modelValue, viewValue) {
	                	//注意这里判断当前控件是否是不可编辑状态，
	                	//如果属于不可编辑状态，则不判断大于当前日期
	                     var status = scope.data.status ;
		                 if(viewValue!=''&&!util.checkMileageStatusIsDisabled(status)){
		                      return util.isBiggerDateTimeThanCurrent(viewValue) ;
		                }
		                 return true ;
	                };
	            }
	        }
	    });
	    
	    
	    //biggerThanCurrent(disabled的控件也做校验)
	    app.directive('biggerDateTimeCurrent2',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	            	if (!ctrl) return;
	                ctrl.$validators.biggerDateTimeCurrent2 = function(modelValue, viewValue) {
	                	//注意这里判断当前控件是否是不可编辑状态，
	                	//如果属于不可编辑状态，则不判断大于当前日期
	                     var status = scope.data.status ;
		                 if(viewValue!=''){
		                      return util.isBiggerDateTimeThanCurrent(viewValue) ;
		                }
		                 return true ;
	                };
	            }
	        }
	    });
	    
	    
	    app.directive('integer',function(){
	        return {
	            restrict:"A",
	            scope:true,
	            require:"ngModel",
	            link:function(scope,ele,attrs,ctrl){
	            	 if (!ctrl) return;
	            	 ctrl.$validators.integer = function(modelValue, viewValue) {
	 	                 if(viewValue!=''){
	 	                      return util.isInteger(viewValue) ;
	 	                }
	 	                 return true ;
	                 };
	            }
	        }
	    });
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
	            	if (!ctrl) return;
	                ctrl.$parsers.push(function(viewValue){
	                    var flag = true ;
	                    var key = "" ;
	                    if(viewValue!=''){
	                    	var geoSpecLocType = attrs['geo'] ;
	                        key = obj[geoSpecLocType] ;
	                        flag = util.isValidGeoLocal(viewValue,geoSpecLocType) ;
	                    }
	                    resetAllSuccess(ctrl) ;
	                    if(key!=null&&key.length>0){
	                        ctrl.$setValidity(key,flag);
	                    }
	                    return viewValue;
	                });
	                
	                attrs.$observe('geo', function() {
	                	var viewValue = ctrl.$viewValue ;
	                	var flag = true ;
	                    var key = "" ;
	                    if(viewValue!=''){
	                    	var geoSpecLocType = attrs['geo'] ;
	                        key = obj[geoSpecLocType] ;
	                        flag = util.isValidGeoLocal(viewValue,geoSpecLocType) ;
	                    }
	                    resetAllSuccess(ctrl) ;
	                    if(key!=null&&key.length>0){
	                        ctrl.$setValidity(key,flag);
	                    }
	                }) ;
	                
	            }
	        };
	    });
	//}) ;

/***/ }
/******/ ]);