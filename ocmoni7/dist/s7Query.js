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

	/**
	 * Created by Administrator on 2016/5/12.
	 */
	//引入项目依赖的所有css文件
	__webpack_require__(137) ;

/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	var tui_core = __webpack_require__(47);
	module.exports = tui_core;


/***/ },

/***/ 47:
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

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	var tui_drag = __webpack_require__(49);
	module.exports = tui_drag;


/***/ },

/***/ 49:
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

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	var tui_dialog = __webpack_require__(51);
	module.exports = tui_dialog;


/***/ },

/***/ 51:
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

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	//require("./jquery_ui.datepicker-modify.css") ;
	//require("./jquery.ui.datepicker.css") ;
	__webpack_require__(58);
	__webpack_require__(59);

/***/ },

/***/ 58:
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

/***/ 59:
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

/***/ 65:
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

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	var moment = __webpack_require__(67);
	module.exports = moment ;


/***/ },

/***/ 67:
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

/***/ 68:
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

/***/ 69:
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

/***/ 70:
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

/***/ 71:
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

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	var underscore = __webpack_require__(76);
	module.exports = underscore;


/***/ },

/***/ 76:
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

/***/ 83:
/***/ function(module, exports) {

	//define(function(require, exports, module) {
		//通过require引入依赖
		//var $ = require('jquery');

		function Common() {

		};

		module.exports = Common;

		//将form中的值序列化为json数组
		Common.prototype.formSerializeObj = function(formId) {
			var arr = $('#' + formId).serializeArray();
			var result = {};
			for ( var i = 0; i < arr.length; i++) {
				result[arr[i].name] = arr[i].value;
			}
			return result;
		};

		//为了方便json的ajax请求，使用baseOptions对象
		Common.prototype.baseOptions = {
			'type' : 'POST',
			'dataType' : 'json',
			'contentType' : 'application/x-www-form-urlencoded; charset=UTF-8',
			'timeout' : 100000,
			'async' : false,
			'error' : function() {
				$.showTuiErrorDialog('系统响应异常！');
			}
		};
		
		
	/*	Common.prototype.dealAjaxRequest4JSObj = function(serverURL,jsObjData){//异步操作
			var defer = $.Deferred();
			var option = {
	    	   contentType:'application/json' ,
	    	   url:serverURL,
	    	   type: 'POST',
	    	   timeout : 100000, //超时时间设置，单位毫秒
	    	   data:JSON.stringify(jsObjData),
	    	   dataType:'json',
	    	   error: function (err) {
	    	   	  console.info(err) ;
	    	   	  $.showTuiErrorDialog('系统响应异常！');
	    	   },
	    	   success:function (result) { 
	    		   defer.resolve(result);
	    	   }
			};
	    	$.ajax(option); //发送ajax请
			return defer.promise() ;
		}
		
		
		Common.prototype.dealAjaxRequest4SimpleParam = function(serverURL,simpleJsonData){//异步操作
			 var defer = $.Deferred();
			 var option = {
	    	   url:serverURL,
	    	   type: 'POST',
	    	   contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	    	   timeout : 100000, //超时时间设置，单位毫秒
	    	   data:simpleJsonData,
	    	   dataType:'json',
	    	   error: function (err) {
	    	   	  console.info(err) ;
	    	   	  $.showTuiErrorDialog('系统响应异常！');
	    	   },
	    	   success:function (result) { 
	    		   defer.resolve(result);
	    	   }
			 };
	    	$.ajax(option); //发送ajax请
			return defer.promise() ;
		}*/
		
		Common.prototype.getDate = function() {
			var yxday = new Date();
			var month = yxday.getMonth() < 9 ? '0'
					+ (yxday.getMonth() + 1).toString() : (yxday.getMonth() + 1)
					.toString();
			var day = yxday.getDate() < 10 ? '0' + yxday.getDate().toString()
					: yxday.getDate().toString();

			return yxday.getFullYear().toString() + '-' + month + '-' + day;
		};
		
		Common.prototype.convetStr2Date = function(str) {
			str = str.replace(/-/g,"/");
			var date = new Date(str );
			return date ;
		};
		
	//});

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		var util = __webpack_require__(65) ;
		var httpUtil = {};
		var errInfo = "系统错误!" ;
		
		httpUtil.dealAjax4BaseOptions = function(baseOptions){
			var csrfInfo = util.getCSRFInfo() ;
			var data = baseOptions['data'];
			data = $.extend(data,csrfInfo) ;
			baseOptions['data'] = data ;
			$.ajax(baseOptions);
		}
		
		httpUtil.dealAjaxRequestWithoutParam = function(serverURL){//异步操作
			 var defer = $.Deferred();
			 var option = {
		   	   url:serverURL,
		   	   type: 'GET',
		   	   dataType:'json',
		   	   timeout : 100000, //超时时间设置，单位毫秒
		   	   error: function (err) {
		   		   defer.reject(err) ;
		   	   },
		   	   success:function (result) { 
		   		   defer.resolve(result);
		   	   }
			 };
		   	 $.ajax(option); //发送ajax请
		   	 return defer.promise();
		}
		
		httpUtil.dealAjaxRequest4SimpleParam = function(serverURL,simpleJsonData){//异步操作
			 var defer = $.Deferred();
			 var csrfInfo = util.getCSRFInfo() ;
			 simpleJsonData = $.extend(simpleJsonData,csrfInfo) ;
			 var option = {
		   	   url:serverURL,
		   	   type: 'POST',
		   	   timeout : 100000, //超时时间设置，单位毫秒
		   	   data:simpleJsonData,
		   	   dataType:'json',
		   	   error: function (err) {
		   		   defer.reject(err) ;
		   	   },
		   	   success:function (result) { 
		   		   defer.resolve(result);
		   	   }
			 };
			 $.ajax(option); //发送ajax请
			 return defer.promise() ;
		}
		
		httpUtil.dealAjaxRequest4JSObj = function(serverURL,jsObjData){//异步操作
			var defer = $.Deferred();
			var csrfInfo = util.getCSRFInfo() ;
			jsObjData = $.extend(jsObjData,csrfInfo) ;
			var option = {
		   	   contentType:'application/json' ,
		   	   url:serverURL,
		   	   type: 'POST',
		   	   timeout : 100000, //超时时间设置，单位毫秒
		   	   data:JSON.stringify(jsObjData),
		   	   dataType:'json',
		   	   error: function (err) {
		   		   defer.reject(err) ;
		   	   },
		   	   success:function (result) { 
		   		   defer.resolve(result);
		   	   }
			};
			$.ajax(option); //发送ajax请
			return defer.promise() ;
		}
		
		httpUtil.dealSYNCHAjaxRequestWithoutParam = function(serverURL){//同步操作无参数访问
			 var defer = $.Deferred();
			 var option = {
		   	   url:serverURL,
		   	   async : false,
		   	   type: 'GET',
		   	   dataType:'json',
		   	   timeout : 100000, //超时时间设置，单位毫秒
		   	   error: function (err) {
		   		   defer.reject(err) ;
		   	   },
		   	   success:function (result) { 
		   		   defer.resolve(result);
		   	   }
			 };
		   	 $.ajax(option); //发送ajax请
		   	 return defer.promise();
		}
		
		httpUtil.dealSYNCHAjaxRequest4SimpleParam = function(serverURL,simpleJsonData){//同步ajax访问
		   var defer = $.Deferred();
		   var csrfInfo = util.getCSRFInfo() ;
		   simpleJsonData = $.extend(simpleJsonData,csrfInfo) ;
		   var option = {
		   	   url:serverURL,
		   	   async : false,
		   	   type: 'POST',
		   	   timeout : 100000, //超时时间设置，单位毫秒
		   	   data:simpleJsonData,
		   	   dataType:'json',
		   	   error: function (err) {
		   		   defer.reject(err) ;
		   	   },
		   	   success:function (result) { 
		   		   defer.resolve(result);
		   	   }
		   };
	  	   $.ajax(option); //发送ajax请
		   return defer.promise() ;
		}
		
		httpUtil.dealSYNCHAjaxRequest4JSObj = function(serverURL,jsObjData){//同步操作
			var defer = $.Deferred();
			var csrfInfo = util.getCSRFInfo() ;
			jsObjData = $.extend(jsObjData,csrfInfo) ;
			var option = {
		   	   contentType:'application/json' ,
		   	   url:serverURL,
		   	   timeout : 100000, //超时时间设置，单位毫秒
		   	   async : false,
		   	   type: 'POST',
		   	   data:JSON.stringify(jsObjData),
		   	   dataType:'json',
		   	   error: function (err) {
		   		   defer.reject(err) ;
		   	   },
		   	   success:function (result) { 
		   		   defer.resolve(result);
		   	   }
			};
			$.ajax(option); //发送ajax请
			return defer.promise() ;
		}
		module.exports = httpUtil ;
		//return httpUtil ;
	//}) ;

/***/ },

/***/ 97:
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: modal.js v3.3.6
	 * http://getbootstrap.com/javascript/#modals
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */
	//define(function(require, exports, module) {
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

	//}) ;


/***/ },

/***/ 131:
/***/ function(module, exports) {

	/**
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
	//define(function (require, exports, module) {
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
	//}) ;




/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	//define(function(require) {
	  __webpack_require__(46);
	  __webpack_require__(48) ;
	  __webpack_require__(50);
	  __webpack_require__(57);
		
	  var util = __webpack_require__(65) ;
	  var S7Query = __webpack_require__(138);
	  new S7Query();
	  
	  var S7Publish = __webpack_require__(140);
	  var s7publish = new S7Publish();
	  s7publish.init();
	  
	  var S7Delete = __webpack_require__(141);
	  var s7delete = new S7Delete();
	  s7delete.init();
	  
	  //终止操作相关代码
	  var S7Abort = __webpack_require__(142) ;
	  var s7abort = new S7Abort() ;
	  s7abort.init() ;
	  //
	  var S7BatchImport = __webpack_require__(143) ;
	  new S7BatchImport().init() ;
	  
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
	  			var td = checkedR7s.parent('td') ;
	  			var s7Id = td.find(":input[name=s7id]").val() ;
	  			var appName = util.getAppName() ;
	  			var toUrl = "/"+appName+"/oc/toCopyS7UI.action?s7Id="+ s7Id;
	  			console.info(" s7Id : " + s7Id) ;
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
	    $(this).parent(".dropdown-oc").find(".dropdown-menu-oc").toggleClass('open') ;
	  }) ;

	  $(document).click(function(e){
	  	 e.stopPropagation() ;
	     $('.dropdown-menu-oc').removeClass('open') ;
	  }) ;
	//}) ;
	  


/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
	    //通过require引入依赖
	  	//var $ = require('jquery');
	  	var Common = __webpack_require__(83);
	  	var common = new Common();
	  	var Equipment = __webpack_require__(139);
		var equipment = new Equipment();
		var util = __webpack_require__(65) ;
		var _ = __webpack_require__(75) ;
		var httpClient = __webpack_require__(84) ;
		
		
	 	function S7Query() {
	 		this._init();
	    }

	    module.exports = S7Query;
	    
	    //初始化界面
	    S7Query.prototype._init = function() {
	    	var that = this;
	    	//注册日期插件
	    	$('#effectMaxDate').datepicker({showButtonPanel : true, clearBtn : true, yearSuffix : "", changeMonth : true, changeYear : true});
			$('#effectMinDate').datepicker({showButtonPanel : true, clearBtn : true, yearSuffix : "", changeMonth : true, changeYear : true});
			$(document).ready(function() {
				/* 实现大写的转换，在document的节点中，若有mode='upper'的属性，则将输入值都转换成大写 */
				$('[mode=upper]').each(function() {
					$(this).bind('keyup', function() {
						$(this).val($(this).val().toUpperCase());
					});
				});
				//查询机型列表
				equipment.query('F');
				$('#s7QueryBtn').click(function() {
					that.query();
				});
			});
			// s5子组按钮的监听
			$(document).delegate(':checkbox[name=s5check]', 'change', function() {
				if ($(this).is(':checked')) {
					$(this).parents('.data_section').find('table').find(':checkbox[name=s7check]').attr('checked','checked');
				} else {
					$(this).parents('.data_section').find('table').find(':checkbox[name=s7check]').removeAttr('checked');
				}
			});
	    };

	    //执行s7查询方法
	    S7Query.prototype.query = function() {
	    	var url = $('#s7QueryBtn').attr('url');
	  		var that = this;
	    	var param = this.getData();
			common.baseOptions['url'] = url;
			common.baseOptions['dataType'] ='json';
			common.baseOptions['data'] = param;
			common.baseOptions['success'] = function(datas){
				if (datas === null) {
					window.location.reload();
					return;
				}
				if(datas.length === 0) {
					$('#s7content').empty();
	        		$.showTuiMessageDialog('没有相应搜索条件下的结果！');
	        		return;
	            }
				var list = datas.list ;
				var tokenId = datas.tokenId ;
				//alert('tokenId'+tokenId);
				$('#tokenId').val(tokenId);
				that._resultData(list);
			};
			//$.ajax(common.baseOptions);
			httpClient.dealAjax4BaseOptions(common.baseOptions)  ;
	    };

	    //获取查询条件数据
	    S7Query.prototype.getData = function() {
			var paramTemp = {};
			//基础信息
			paramTemp['status'] = this.getStatusData('status');//发布状态
			paramTemp['effStatus'] = this.getStatusData('effStatus');//生效状态
			var server=$('#server').val();
			if(server ==='商务名称'){
				paramTemp['commercialName'] = $('#service').val();
			}else{
				paramTemp['subCode'] = $('#service').val();
			}
			paramTemp['effectMaxDate'] = $('#effectMaxDate').val();//生效日期上限
			paramTemp['effectMinDate'] = $('#effectMinDate').val();//生效日期下限
			// 机型
			paramTemp['equipment'] = this._getEquipment();
			//服务等级
			paramTemp['cabin'] = this.getCabinData('cabin');//服务等级
			//console.log(paramTemp['cabin'] );
			//获取优先级序号
			paramTemp['sequenceNumber'] = this.getSequenceNumber() ;
			//地理位置
			paramTemp['geoSpecLoc1Type'] = $('#geoSpecLoc1Type').attr('checked') ? $('#geoSpecLoc1Type').val() : '';//机场标识1
			paramTemp['geoSpecLoc1'] = $('#geoSpecLoc1').val();//区域1
			paramTemp['geoSpecLoc2Type'] = $('#geoSpecLoc2Type').attr('checked') ? $('#geoSpecLoc2Type').val() : '';//机场标识2
			paramTemp['geoSpecLoc2'] = $('#geoSpecLoc2').val();//区域2
			paramTemp['geoSpecLoc3Type'] = $('#geoSpecLoc3Type').attr('checked') ? $('#geoSpecLoc3Type').val() : '';//机场标识3
			paramTemp['geoSpecLoc3'] = $('#geoSpecLoc3').val();//经过区域
			paramTemp['carrCode'] = $('#carrCode').val();//航空公司
			return paramTemp;
		};
	    
	 	// 机型
	    S7Query.prototype._getEquipment = function() {
	    	var eqment = $('#s7_F_equipment').val();
	    	if(eqment !== '' && eqment !== null && typeof(eqment) !== 'undefined'){
	    		return (eqment.split('-'))[0];
	    	}else{
	    		return '';
	    	}
		};
		
		//从界面获取发布状态和生效状态
		S7Query.prototype.getStatusData = function(name) {
			var result = '';
			var tag = '';
			var array = document.getElementsByName(name);
	      	for(var i = 0; i < array.length; i++)
	      	{
			    if(array[i].checked === true)
			    {         
			        result += '1';
			    } else {
			    	result += '0';
			    }
	        }
	        for(var j = 0; j < array.length; j++)
	      	{
			    tag += '0';
	        }
	        //如果状态代码result的值都是0组成的字符串，则将result置为空字符串
	        if(result === tag) {
	        	result = '';
	        }
	        return result;
		};
		
		//从界面获取服务等级
		S7Query.prototype.getCabinData = function(name) {
			var result = '';
			var array = document.getElementsByName(name);
	      	for(var i = 0; i < array.length; i++)
	      	{
			    if(array[i].checked === true)
			    {         
			        result += array[i].value;
			    } 
	        }
	        return result;
		};
		
		//获取优先级序号
		S7Query.prototype.getSequenceNumber = function(){
			var sequenceNumber = $.trim($("#sequenceNumber").val());
			return sequenceNumber ;
		}
		
		
		//将后台返回结果放到前台显示
		S7Query.prototype._resultData = function(datas) {
			var tag_ctx = $('#tag_ctx').val();
			$('#s7content').empty();
			var s7Content = $('#s7content');
			var that = this;
			s7Content.html('');
			for	(var i = 0; i < datas.length; i++) {
				var s5 = datas[i];
				var s7list = s5.s7VoList;
				var contentContainer = $('<div name="contentContainer" class="data_section markDiv"></div>');
				var s5Container = $('<div class="helper_float_left route_layout"></div>');
				var s7Container = $('<div class="helper_float_right ocprice"></div>');
				var service = $('<div class="typelist"><span>' + s5.basicInfoVo.serviceGroupDescription + '</span>&nbsp;&gt;&nbsp;<span>' + s5.basicInfoVo.subGroupDescription + '</span>&nbsp;&gt;&nbsp;</div>' +
						'<div class="commo_name"><label for="chooseAll"><input name="s5check" type="checkbox"/><span class="gray">[</span>&nbsp;<span class="txt_subcode bold">' + s5.serviceSubCode + '</span>&nbsp;<span class="gray">]</span>' +
								'&nbsp;<span class="bold">' + s5.commercialName + '</span>' +
						'</label></div>');
				service.appendTo(s5Container);
				var table = $('<table cellspacing="0" cellpadding="0" border="0"></table>');
				var tbody = $('<tbody></tbody>');
				for (var j = 0; j < s7list.length; j++) {
					var s7 = s7list[j];
					var flystatus=' ';
					var freqFlyStatus=s7.frequentFlyerStatus;
					if(freqFlyStatus!==null&&freqFlyStatus!=undefined){
						flystatus=freqFlyStatus;
					}
					
					var s7Id = s7.id;
					var sequenceNumber=s7.sequenceNumber;
					var availability = (s7.noChargeNotAvailable === '') ? (that._getMoney(s7)) : that._getFeeAvailability(s7.noChargeNotAvailable);
					var tr_head = '<tr class="border_bottom">';
					var td1 = '<td><input name="s7check" type="checkbox"/><input name="s7id" value="'+ s7Id +'"type="hidden"/>' +
							  '<input name ="firstMaintenanceDate" value ="'+s7.firstMaintenanceDate+'" type ="hidden"/>' +
							  '<input name = "lastMaintenanceDate" value ="'+s7.lastMaintenanceDate+'" type ="hidden"/>'+
							  '<input type ="hidden" name ="statusDes" value ="'+s7.statusDes+'"/></td> ';
					var td2 = '<td><div class="imginfo"><img alt="" src="' + tag_ctx + '/resources/oc/src/images/products/' + that._getPicture(s7.serviceAndSubCode) + '"/></div></td>';
					var td3 = '<td><p class="desinfo" id="ocPriceDescription">'+ _formatDescription(s7.description) + '</p></td>';
					var td0 = '<td><span name="sequenceNumber">'+sequenceNumber+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td> ';
					
					var td4 = '<td><div class="price_time"><span name="firstMaintenanceDate">' + s7.firstMaintenanceDate + '</span>&nbsp;&mdash;&nbsp;<span name="lastMaintenanceDate">' + s7.lastMaintenanceDate + '</span><br>' +
							    '<span class="odcity">' + s7.geoSpecLoc1 + _showGeoSpecLocType(s7.geoSpecLoc1Type) + '</span>&nbsp;-&nbsp;<span class="odcity">' + s7.geoSpecLoc2 + _showGeoSpecLocType(s7.geoSpecLoc2Type) + '</span>' +
							    '<span class="helper_float_right ' + that._getColor(s7) + '">' + that._generateStatus(s7) + '</span><div class="clearfix"></div></div></td>';
					
					var td5 = '<td><div class="city_passenger"><div>' + that._getPassengerTypeCode(s7) + '</div><div class="bold">' + flystatus + '</div></div></td>';
					var td6 = '<td><div class="release_status"><span class="pricetag">' + availability + '</span></div></td>';
					var td7 = '<td><div class="helper_float_right operate_btn">' +
							     '<a href="#" title="查看详细" class="detail"></a>' +
							     _showS7Detail(s7Id) +
							     '<div title="删除" name="s7delete" class="delete"></div></div></td>';
				    var tr_tail = '</tr>';
			   	    $(tr_head + td1 + td2 + td3 + td0+td4 + td5 + td6 + td7 + tr_tail).appendTo(tbody);
				};
				tbody.appendTo(table);
				table.appendTo(s7Container);
				s5Container.appendTo(contentContainer);
				s7Container.appendTo(contentContainer);
				contentContainer.appendTo(s7Content);
				$('<div class="clearfix"></div>').appendTo(contentContainer);
			}
			// 根据发布状态和生效状态控制编辑和删除按钮
	   	    _editDeleteControl();
	   	    
		};
		
		_showS7Detail = function(id) {
			var tag_ctx = $('#tag_ctx').val();
			//var editDiv = '<a href="' + tag_ctx + '/oc/showS7Detail?id=' + id
			//		+ '" title="修改编辑" class="modify"></a>';
			var editDiv = '<a href="' + tag_ctx + '/oc/toUpdateS7UI.action?s7Id=' + id
				+ '" title="修改编辑" class="modify"></a>';		
			return editDiv;
		};
		
		/**
		 * 根据发布状态和生效状态控制编辑和删除按钮
		 */
		_editDeleteControl = function() {
			$('table tbody tr').each(function() {
				var trText = $(this).text();
				
				// 未发布、已发布未生效、已发布已生效三种状态的可以编辑
				if(trText.indexOf('未发布') < 0 && trText.indexOf('未生效') < 0 && trText.indexOf('已生效') < 0) {
					$(this).find('[title=修改编辑]').removeAttr('href');
					$(this).find('[title=修改编辑]').removeClass('modify');
					$(this).find('[title=修改编辑]').addClass('modifyOK');
				}
				// 未发布的可以删除
				if(trText.indexOf('未发布') < 0) {
					$(this).find('[title=删除]').removeClass('delete');
					$(this).find('[title=删除]').addClass('deleteOK');
				}
			});
		};
		
		//格式化显示可用状态
		S7Query.prototype._getFeeAvailability = function(noChargeNotAvailable) {
			var result = '';
			if (noChargeNotAvailable === 'E') {
				result = '免费';
			} else if (noChargeNotAvailable === 'X') {
				result = '不可用';
			}  
			return result;
		};
		
		//为发布状态字体添加颜色
		S7Query.prototype._getColor = function(s7) {
			var color = '';
			if (s7.statusDes === '1') {
				color = 'red';
			} else if (s7.statusDes === '2') {
				color = 'orange';
			} else if (s7.statusDes === '3') {
				color = '';
			} else if (s7.statusDes === '4' || s7.statusDes === '5') {
				color = 'gray';
			} 
			return color;
		};
		
		//格式化显示发布状态  
		//1 未发布  2 未生效（生效日期>当前日期）  3 已生效（生效日期<=当前日期）  4  已过期(截止日期<当前日期)  5  已取消(生效日期>截止日期)
		S7Query.prototype._generateStatus = function(s7) {
			var result = '';
			if (s7.statusDes === '1') {
				result = '未发布';
			} else if (s7.statusDes === '2') {
				result = '未生效';
			} else if (s7.statusDes === '3') {
				result = '已生效';
			}else if (s7.statusDes === '4') {
				result = '已过期';
			}else if (s7.statusDes === '5') {
				result = '已取消';
			}
			return result;
		};
		
		//格式化显示钱数
		S7Query.prototype._getMoney = function(s7) {
			var list170VO=s7.list170VO;
			//201表、
			var list201VO = s7.list201VO ;
			var money = '';
			var specFeeCurrency = '' ;
			if(list170VO.length>0){
				money = list170VO[0].specFeeAmount;
				specFeeCurrency = list170VO[0].specFeeCurrency ;// 
			}else if(list201VO.length>0){
				var t = list201VO[0].discountType ;
				if(t=="1"){//全额
					money = list201VO[0].onePriceNum ;
					specFeeCurrency = "CNY" ;
				}else{//折扣
					money = list201VO[0].discountNum ;
					specFeeCurrency = "%" ;
				}
			}else{
				money = '';
			}
			
			//这里单位不能写死为‘CNY’了，直接从数据库读取2015/08/13
			if(money !== ''){
				money += specFeeCurrency;
			}
			return money;
		};
		
		//格式化显示
		S7Query.prototype._getPassengerTypeCode = function(s7) {
			var passengerTypeCode=' ';
			var typeCode=s7.passengerTypeCode;
			if(typeCode!=null&&typeCode!=undefined){
				passengerTypeCode=typeCode;
			}		
			return passengerTypeCode;
		};
		
		//图片显示
		S7Query.prototype._getPicture = function(subCode) {
			/*var tag_ctx = $('#tag_ctx').val();
			var picName = '1E.jpg';
			var url =tag_ctx+ '/s7/isExitPic';
			var param = {};
			param['subCode'] = subCode;
			common.baseOptions['url'] = url;
			common.baseOptions['dataType'] ='json';
			common.baseOptions['data'] = param;
			common.baseOptions['success'] = function(datas){
				picName = datas;
			};
			$.ajax(common.baseOptions);
			return picName;*/
			var  picName = "1E.jpg";
			var imgArr = util.getCommonImgArr() ;
			var flag = _.contains(imgArr, subCode);
	        if(flag) {
	            picName = subCode + ".jpg";
	        }
			return picName ;
		};
		
		
		
		
		
		
		_formatDescription = function(description) {
			var displayLength = 170;  
	        var text = description;  
	        var result = ''; 
	        if (text === '' || typeof(text) === 'undefined') {
	        	return result;  
	        }
	        
	        var count = 0;  
	        for (var i = 0; i < displayLength; i++) {  
	            var _char = text.charAt(i);  
	            if ( /[^x00-xff]/.test(_char)) {
	                count ++;  //双字节字符，//[u4e00-u9fa5]中文  
	            }
	            if (count >= displayLength) {
	            	break;
	            }
	            result += _char;  
	            count++;
	        }  
	        if (result.length < text.length) {  
	            result += '......';  
	        }  
	        return result;  
		};
		
		_showGeoSpecLocType = function(geoSpecLocType) {
			if (geoSpecLocType !== '') {
				return '<b class="gray">(' + geoSpecLocType + ')</b>';
			} else {
				return '';
			}
		};
	//});


/***/ },

/***/ 139:
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		var Common = __webpack_require__(83);
		var common = new Common();
		var httpClient = __webpack_require__(84) ;
	  	
		function Equipment() {
			
		};
		
		module.exports = Equipment;
		
		/**
		 * 查询机型
		 */
		Equipment.prototype.query = function(type) {
			
			if (type === 'F') {
				var url = $('#s7_F_equipment').attr('url');
				var param = {};
				
				common.baseOptions['url'] = url;
				common.baseOptions['data'] = param;
				common.baseOptions['success'] = function(datas) {
					$('#s7_F_equipment').append('<option/>');
					for(var i = 0; i < datas.length; i++) {
						var equipment = '<option>'  + datas[i].code + '-' + datas[i].description +'</option>';
						$('#s7_F_equipment').append(equipment);
					}
				};
				//$.ajax(common.baseOptions);
				httpClient.dealAjax4BaseOptions(common.baseOptions)  ;
			}
			
			if (type === 'M') {
				var url = $('#s7_M_equipment').attr('url');
				var param = {};
				
				common.baseOptions['url'] = url;
				common.baseOptions['data'] = param;
				common.baseOptions['success'] = function(datas) {
					$('#s7_M_equipment').append('<option/>');
					for(var i = 0; i < datas.length; i++) {
						var equipment = '<option>'  + datas[i].code + '-' + datas[i].description +'</option>';
						$('#s7_M_equipment').append(equipment);
					}
				};
				//$.ajax(common.baseOptions);
				httpClient.dealAjax4BaseOptions(common.baseOptions)  ;
			}
		};
		
	//});

/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		// 通过require引入依赖
		//var $ = require('jquery');
		var Common = __webpack_require__(83);
		var httpClient = __webpack_require__(84) ;
		var moment = __webpack_require__(66) ;

		var common = new Common();

		function S7Publish() {

		};

		module.exports = S7Publish;

		/**
		 * 发布按钮绑定事件
		 */
		S7Publish.prototype.init = function() {
			
			$('#s7_publish').click(function() {
				// 数组存放符合条件的s7id
				var idArray = [];
				// 勾选的所有s7
				var checkedS7 = $('table').find(':checkbox[name=s7check][checked=checked]');
				if(checkedS7.length === 0) {
					$.showTuiErrorDialog('请至少选择一条记录！');
					return;
				}
				// 验证
				if (S7Publish._validate(idArray, checkedS7)) {
					var param = {};
					var url = $('#s7_publish').attr('url');
					for (var i = 0; i < idArray.length; i++) {
						param['s7IdList['+i+']'] = idArray[i];
					}
					common.baseOptions['url'] = url;
					common.baseOptions['data'] = param;
					common.baseOptions['success'] = function(datas) {
						if (datas === 'PUBISHSUCCESS' ) {
							$.showTuiSuccessDialog('发布成功！', function() {
								$("#s7QueryBtn").trigger('click') ;
							});
						} else {
							$.showTuiErrorDialog('系统异常，发布失败！');
						}
					};
					//$.ajax(common.baseOptions);	
					httpClient.dealAjax4BaseOptions(common.baseOptions)  ;
				}
			});
		};
		
		/**
		 * 对勾选的s7进行验证
		 */
		S7Publish._validate = function(idArray, checkedS7) {
			var allValidate = true;
			checkedS7.each(function() {
				//判断是否包含
				var status = $.trim($(this).siblings(':input[name=statusDes]').val()) ;
				var effDateText = $.trim($(this).siblings('[name=firstMaintenanceDate]').val());
				var discDateText = $.trim($(this).siblings('[name=lastMaintenanceDate]').val());
				var s7id = $.trim($(this).siblings(':input[name=s7id]').val());
				// 日期比较
				
				var sysDateStr = moment().format('YYYY-MM-DD') ;
				var sysDate = moment(sysDateStr,'YYYY-MM-DD') ;
				var effDate = moment(effDateText, 'YYYY-MM-DD');
				var discDate = moment(discDateText,'YYYY-MM-DD');
				if (status=='1') {
					if (effDate >= sysDate && discDate >= effDate) {
						idArray.push(s7id);
					} else {
						//$.showTuiErrorDialog('未发布数据中包含已生效/已过期数据！');
						$.showTuiErrorDialog('存在已生效/已过期的记录，请重新编辑生效截止日期！');
						allValidate = false;
						return false;
					}
				}
			});
			//如果不存在一个条可发布的记录，则不做任何反应
			if(idArray.length==0){
				return false;
			}
			return allValidate;
		};
	//});


/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		// 通过require引入依赖
		//var $ = require('jquery');
		var Common = __webpack_require__(83);
		var common = new Common();
		var httpClient = __webpack_require__(84) ;

		function S7Delete() {

		};

		module.exports = S7Delete;

		/**
		 * 发布按钮绑定事件
		 */
		S7Delete.prototype.init = function() {
			
			$(document).delegate('.delete[name=s7delete]', 'click', function() {
				//删除s7id
				var s7id = $(this).parents('tr').find(':input[name=s7id]').attr('value');
				var deletedS7 = $(this);
				var param = {};
				var url = $('#s7_delete').attr('url');
				param['s7Id'] = s7id;
				param['tokenId'] = $('#tokenId').val();
				common.baseOptions['url'] = url;
				common.baseOptions['data'] = param;
				common.baseOptions['success'] = function(datas) {
					if (datas === null) {
						window.location.reload();
						return;
					}
					if (datas === 'SUCCESS' ) {
						$.showTuiSuccessDialog('删除成功！', function() {
							if (deletedS7.parents('table').find('tr').length === 1) {
								deletedS7.parents('div[name=contentContainer]').remove();
							}
							deletedS7.parents('tr').remove();
						});
					} else {
						$.showTuiErrorDialog('系统异常，删除失败！');
					}
				};
				//$.ajax(common.baseOptions);	
				httpClient.dealAjax4BaseOptions(common.baseOptions)  ;
			});
		};
	//});


/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		//var $ = require("jquery");
		__webpack_require__(97) ;
		var Common = __webpack_require__(83) ;
		var common = new Common() ;
		var httpClient = __webpack_require__(84) ;
		var ModalHelper = __webpack_require__(131) ;
		var modalHelper = null ;
		
		function S7Abort(){
		
		} ;
		module.exports = S7Abort;
		
		
		S7Abort.prototype.init = function(){
			modalHelper = new ModalHelper('abortTipInfo')
			var self = this ;
			var dateStr = common.getDate() ;
			//因为日期和前面的输入框有点距离所以这里修正一下隔阂距离
			//$("#lastMaintenanceDate").parent().find(".input_date_btn").css({"margin-left": "-8px"}) ;
			//初始化日期控件
			$("#lastMaintenanceDate").datepicker({dateFormat:"yy-mm-dd",showButtonPanel:true,minDate:dateStr});
			//当页面上的截止按钮被点击的时候
			$("#abortBtn").bind('click',function(e){
				e.preventDefault() ;
				e.stopPropagation() ;
				var checkedR7s = $(":checkbox[name=s7check]:checked") ;
	  			var len = checkedR7s.length ;
	  			//len = 1 ;//测试方便这里把len=1 ;
	  			if(len>0){//显示模态框
	  				//选择的记录中不能包含已过期的记录
	  				var hasExpiredItemFlag = false;
	  				checkedR7s.each(function(){
	  					var statusDes = $(this).siblings(":input[name=statusDes]").val() ;
	  					if(statusDes=="4"){
	  						hasExpiredItemFlag = true ;
	  					}
	  				}) ;
	  				if(hasExpiredItemFlag){
	  					$.showTuiErrorDialog('包含‘已过期’的记录，无法截止!');
	  				}else{
	  					$('#abortModal').modal('show') ;
	  					self.cleanInputInfo() ;
	  				}
	  			}else{
	  				$.showTuiErrorDialog('至少选择一条需要截止的记录!');
	  			}
			}) ;
			
			$("#abortModalConfirm").bind('click',function(e){
				e.preventDefault() ;
				e.stopPropagation() ;
				//将所有的提示信息先清除干净
				self.cleanTipInfo() ;
				var flag = self.checkInputDateValid() ;
				if(flag){
					//1.隐藏模态框
					self.addSuccessTip("操作中请稍后.....") ;
					self.canNotOperModal() ;
					//2.保存数据到数据库
					var promise = self.saveData2DB() ;
					$.when(promise).done(function(data){
						self.deal4Result(data) ;
					}).fail(function(err){
						self.cleanTipInfo() ;
						self.addErrorTip("操作失败!") ;
					}) ;
				}
			}) ;
			
		};
		
		//功能描述处理点击截止后的结果
		S7Abort.prototype.deal4Result = function(retData){
			var self = this ;
			var lastMaintenanceDate = $("#lastMaintenanceDate").val() ;
			//清理所有的提示信息
			self.cleanTipInfo() ;
			if(retData.flag=='true'){
				self.addSuccessTip("操作成功,2秒后将关闭窗口...") ;
				//更新页面上的数据
				var checkedR7s = $(":checkbox[name=s7check]:checked") ;
				checkedR7s.each(function(){
					$(this).parents("tr").find("span[name=lastMaintenanceDate]").html(lastMaintenanceDate) ;
				}) ;
				//将所有勾选的checkbox取消勾选
				checkedR7s.prop("checked",false);
			}else{
				self.addErrorTip("操作失败,2秒后将关闭窗口...") ;
			}
			//两秒钟后关闭模态框
			setTimeout(function(){
				self.canOperModal() ;//模态框可以操作
				$('#abortModal').modal('hide') ;//关闭模态框
			},2000) ;
		};
		
		//报错数据到数据库
		S7Abort.prototype.saveData2DB = function(){
			var checkedR7s = $(":checkbox[name=s7check]:checked") ;
			var ids = "" ;
			checkedR7s.each(function(){
				var curId = $(this).siblings(':input[name=s7id]').val() ;
				ids += curId+"," ;
			}) ;
			//去掉最后一个逗号
			var idsLen = ids.length ;
			if(idsLen>1){
				ids = ids.substring(0,idsLen-1) ;
			}
			var lastMaintenanceDate = $("#lastMaintenanceDate").val() ;
			var jsonParam = {"lastMaintenanceDate":lastMaintenanceDate,"ids":ids};
			var serverUrl = $("#abortModalConfirm").attr('url')  ;
			//console.info("serverUrl : " + serverUrl) ;
			return httpClient.dealAjaxRequest4SimpleParam(serverUrl,jsonParam) ;
		};
		
		//隐藏确认按钮
		S7Abort.prototype.canNotOperModal = function(){
			$("#abortModalConfirm").addClass("hidden") ;//hidden
		} ;
		
		S7Abort.prototype.canOperModal = function(){
			$("#abortModalConfirm").removeClass("hidden") ;
		} ;
		
		//检查输入的日期是否合法
		S7Abort.prototype.checkInputDateValid = function(){
			var flag = false;
			var self = this ;
			var checkedR7s = $(":checkbox[name=s7check]:checked") ;
			var inputDateStr = $.trim($("#lastMaintenanceDate").val()) ;
			var inputDate = common.convetStr2Date(inputDateStr) ;
			if(inputDateStr.length==0){
				self.addErrorTip("截止日期必填!") ;
			}else{
				var allBigger = true ;
				var checkedStartDateArr = [] ;
				checkedR7s.each(function(){
					var curStartDate = $(this).siblings(":input[name=firstMaintenanceDate]").val() ;
					checkedStartDateArr.push(common.convetStr2Date(curStartDate));
				}) ;
				var len =checkedStartDateArr.length ;
				for(var i = 0 ; i < len ; i++){
					var t = checkedStartDateArr[i] ;
					if(inputDate<t){
						allBigger = false;
					}
				}
				//如果大于所有记录的起始日期
				if(allBigger){
					flag = true ;
				}else{
					self.addErrorTip("截止日期必须大于所有记录的起始日期!") ;
				}
			}
			return flag ;
		} ;
		
		
		S7Abort.prototype.cleanInputInfo = function(){
			$("#lastMaintenanceDate").val("") ;
			this.cleanTipInfo() ;
		} ;
		
		S7Abort.prototype.cleanTipInfo = function(){
			modalHelper.cleanTipInfo() ;
		} ;
		
		S7Abort.prototype.addErrorTip = function(errMsg){
			modalHelper.addErrorTip(errMsg) ;
		} ;
		
		S7Abort.prototype.addSuccessTip = function(sucMsg){
			modalHelper.addSuccessTip(sucMsg) ;
		} ;
	//}) ;

/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

	//define(function(require, exports, module) {
		var util = __webpack_require__(65) ;
		__webpack_require__(144) ;
		var modalHelper = new (__webpack_require__(131))('batchImportTipInfo') ;
		
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
				  	var serverUrl = "/"+appName+"/ocimport/resolve.action?_csrf="+csrfInfo._csrf;
				  	var fileName = $("#batchImportFileInput").val() ;
				  	if (fileName === '') {
						//$.showTuiErrorDialog('请选择文件！');
						addErrorTip("请选择文件！") ;
						$("#submitBatchImportFormBtn").addClass("hidden") ;
						return;
					}
					var point = fileName.lastIndexOf(".");
					var type = fileName.substr(point);
					if (type !== '.xls' && type !== '.xlsx') {
						//$.showTuiErrorDialog('文件格式错误！');
						addErrorTip("文件格式有误，仅支持*.xls和*.xlsx格式") ;
						$("#submitBatchImportFormBtn").addClass("hidden") ;
						return;
					}else{
						self.submitForm(serverUrl) ;
					}
			  }) ;
		}
		
		
		s7BatchImport.prototype.submitForm = function(serverUrl){
			$("#submitBatchImportFormBtn").addClass("hidden") ;
			addSuccessTip("数据正在导入中，请耐心等待……") ;
			
			$.ajaxFileUpload({
				url:serverUrl, //用于文件上传的服务器端请求地址
				type:'post',
				formId:'batchImportForm',
				timeout:100000,
				secureuri:false, //一般设置为false
				dataType:'json', //返回值类型 一般设置为json
				success:function(data, status){
					//$("#submitBatchImportFormBtn").removeClass("hidden") ;
					//console.info(data.flag);
					cleanAllInputInfo ();
					if(data.flag=='true'|| data.flag==true){
						addSuccessTip("导入操作成功,2秒后关闭窗口!") ;
						setTimeout(function(){
							$("#batchImportModal").modal("hide") ;
						},2000) ;
					}else{
						cleanTipInfo() ;
						addErrorTip("错误信息提示：") ;
						for(var i=0;i<data.errorList.length;i++){
							addErrorTip((i+1)+"."+data.errorList[i]) ;
						}
					}
				},
				error:function(xmlHttpRequest, status, error) {
					//$("#submitBatchImportFormBtn").removeClass("hidden") ;
					cleanAllInputInfo ();
					cleanTipInfo() ;
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
	    	
	    	modalHelper.addErrorTip(errMsg) ;
	    } ;
			
	    function addSuccessTip(sucMsg){
	    	cleanTipInfo() ;
	    	modalHelper.addSuccessTip(sucMsg) ;
	    } ;
	//}) ;

/***/ },

/***/ 144:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	jQuery.extend({


	    createUploadIframe: function (id, uri) {
	        //create frame
	        var frameId = 'jUploadFrame' + id;
	        var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
	        if (window.ActiveXObject) {
	            if (typeof uri == 'boolean') {
	                iframeHtml += ' src="' + 'javascript:false' + '"';

	            }
	            else if (typeof uri == 'string') {
	                iframeHtml += ' src="' + uri + '"';

	            }
	        }
	        iframeHtml += ' />';
	        jQuery(iframeHtml).appendTo(document.body);

	        return jQuery('#' + frameId).get(0);
	    },

	    ajaxFileUpload: function (s) {
	        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
	        s = jQuery.extend({}, jQuery.ajaxSettings, s);
	        var id = new Date().getTime()
	        var io = jQuery.createUploadIframe(id, s.secureuri);
	        var frameId = 'jUploadFrame' + id;
	        // Watch for a new set of requests
	        if (s.global && !jQuery.active++) {
	            jQuery.event.trigger("ajaxStart");
	        }
	        var requestDone = false;
	        // Create the request object
	        var xml = {}
	        if (s.global)
	            jQuery.event.trigger("ajaxSend", [xml, s]);
	        // Wait for a response to come back
	        var uploadCallback = function (isTimeout) {
	            var io = document.getElementById(frameId);
	            try {
	                if (io.contentWindow) {
	                    xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
	                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;

	                } else if (io.contentDocument) {
	                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
	                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
	                }
	            } catch (e) {
	                jQuery.handleError(s, xml, null, e);
	            }
	            if (xml || isTimeout == "timeout") {
	                requestDone = true;
	                var status;
	                try {
	                    status = isTimeout != "timeout" ? "success" : "error";
	                    // Make sure that the request was successful or notmodified
	                    if (status != "error") {
	                        // process the data (runs the xml through httpData regardless of callback)
	                        var data = jQuery.uploadHttpData(xml, s.dataType);
	                        // If a local callback was specified, fire it and pass it the data
	                        if (s.success)
	                            s.success(data, status);

	                        // Fire the global callback
	                        if (s.global)
	                            jQuery.event.trigger("ajaxSuccess", [xml, s]);
	                    } else
	                        jQuery.handleError(s, xml, status);
	                } catch (e) {
	                    status = "error";
	                    jQuery.handleError(s, xml, status, e);
	                }

	                // The request was completed
	                if (s.global)
	                    jQuery.event.trigger("ajaxComplete", [xml, s]);

	                // Handle the global AJAX counter
	                if (s.global && ! --jQuery.active)
	                    jQuery.event.trigger("ajaxStop");

	                // Process result
	                if (s.complete)
	                    s.complete(xml, status);

	                jQuery(io).unbind()

	                setTimeout(function () {
	                    try {
	                        jQuery(io).remove();
	                    } catch (e) {
	                        jQuery.handleError(s, xml, null, e);
	                    }

	                }, 100)

	                xml = null

	            }
	        }
	        // Timeout checker
	        if (s.timeout > 0) {
	            setTimeout(function () {
	                // Check to see if the request is still happening
	                if (!requestDone) uploadCallback("timeout");
	            }, s.timeout);
	        }
	        try {
	            var form = jQuery('#' + s.formId);
	            form.attr('action', s.url);
	            form.attr('method', 'POST');
	            form.attr('target', frameId);
	            if (form.encoding) {
	            	form.attr('encoding', 'multipart/form-data');
	            }
	            else {
	            	form.attr('enctype', 'multipart/form-data');
	            }
	            form.submit();
	        } catch (e) {
	            jQuery.handleError(s, xml, null, e);
	        }

	        jQuery('#' + frameId).load(uploadCallback);
	//        return { abort: function () { } };

	    },

	    uploadHttpData: function (r, type) {
	        var data = !type;
	        if (!type)
	            data = r.responseText;
	        if (type == "xml")
	            data = r.responseXML;
	        //data = type == "xml" || data ? r.responseXML : r.responseText;
	        // If the type is "script", eval it in global context
	        if (type == "script")
	            jQuery.globalEval(data);
	        // Get the JavaScript object, if JSON is used.
	        if (type == "json") {
	            ////////////Fix the issue that it always throws the error "unexpected token '<'"///////////////  
	            data = r.responseText;
	            var start = data.indexOf(">");
	            if (start != -1) {
	                var end = data.indexOf("<", start + 1);
	                if (end != -1) {
	                    data = data.substring(start + 1, end);
	                }
	            }
	            ///////////////////////////////////////////////////////////////////////////////////////////////  
	            eval("data = " + data);
	        }
	        // evaluate scripts within html
	        if (type == "html")
	            jQuery("<div>").html(data).evalScripts();

	        return data;
	    },

	    handleError: function (s, xhr, status, e) {
	        // If a local callback was specified, fire it
	        if (s.error) {
	            s.error.call(s.context || s, xhr, status, e);
	        }

	        // Fire the global callback
	        if (s.global) {
	            (s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [xhr, s, e]);
	        }
	    }
	})
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }

/******/ });