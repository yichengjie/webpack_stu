//define(function(require, exports, module) {
	var _ = require('underscore_lib') ;
	var tableHtml = require('../tpls/table.html') ;
	var theadHtml = require('../tpls/thead.html') ;
	var trHtml = require('../tpls/tr.html') ;
	var app = angular.module("app.directive",[]) ;
	
	function outAllSelect(list){//将所有tr全部置为非选中状态
	    angular.forEach(list,function(l){
			l.selected = false ;
		}) ;
	}
	
	function checkCanAddOrDelete(action,status){
		if(action=='add'&&status=='1'){
			return true ;
		}
		return false;
	}
	
	
	app.directive('tableInfo', ['FormData',function(FormData){
		  return {
	        restrict: 'AE',
	        replace: true,
			template:function(elem,atrrs){
				return tableHtml ;
			},
			scope:{
				tableData:'=',
				list:'='
			},
			controllerAs:'ctrl',
			controller:['$scope',function($scope){
				$scope.data = FormData ;//status
				//新增一行记录
				this.tbAddLine = function(){
					outAllSelect($scope.list) ;
					var obj = angular.copy($scope.tableData) ;
					$scope.list.push(obj) ;
				};
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
				};
				$scope.clickTr = function(l){
					outAllSelect($scope.list) ;
					l.selected = true ;
				};
				//特殊的一些table select data
				$scope.selectList ={
					"publishObjectList":[{"name":"V","value":"V"}]
				} ;
				
	        }],
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
						element.find(".delete_line").bind('click',function(){
							var flag = checkCanAddOrDelete(scope.data.action,scope.data.status) ;
							if (flag) {//当前表格可以编辑时
								scope.$apply(function  () {
									ctrl.tbDelLine() ;
								}) ;
							}
						}) ;
						element.find(".add_line").bind('click',function(){
							var flag = checkCanAddOrDelete(scope.data.action,scope.data.status) ;
							if (flag) {//当前表格可以编辑时
								scope.$apply(function  () {
									ctrl.tbAddLine() ;
								}) ;
							}
						}) ;
					}
				};
			}
	    };
	}]);
	
	
	
	 
	//显示隐藏表格
	app.directive('showHideTable',['TbShowHideServcie',function(TbShowHideServcie){
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {},
	        controller:['$scope',function($scope){
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
	
	
	/*app.directive('ocError',function(){
		return {
			restrict:'AE',
			replace:true,
			scope:{
				error:"="
			},
			template:function(element,attrs){
				var name = attrs.name ;
				var str = 
					'<label ng-show ="error.'+name+'.flag" class="tui_input_error" style="position: absolute; z-index: 10; width: auto; height: auto;" for="'+name+'" generated="true">'+
						'<span class="icon_error" style="margin:-1px 6px 0 0;"></span><span ng-bind="error.'+name+'.tip"></span>'+
				    '</label>' ;
				return  str ;
			}
		}
	}) ;*/
	
	app.directive('setFocus', function(){
	  return {
        restrict: 'AE',
        replace: true,
		scope:true,
		link: function(scope, elem, attrs) {
             elem.trigger('click') ;
        }
      };
    });
	
	app.directive("upperInput",function(){
	    return{
	        restrict:'A',
	        require:'ngModel',
	        link:function(scope,element,attrs,ngModel){
	            if (!ngModel)
	                return; // do nothing if no ng-model
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
	    };
	}) ;
	
	

	
	 /*//显示隐藏表格
	 app.directive('showHideTable',function(){
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {
	            tbInfo:'='
	        },
	        controller:['$scope','$element','$attrs',function($scope,$element,$attrs){
				var showTbBtnTip = "填写表格" ;
				var hideTbBtnTip = "收起表格" ;
	            $scope.showHideTable = function(){
	                $scope.tbInfo.flag = ! $scope.tbInfo.flag ;
	                if($scope.tbInfo.flag){//如果当前为显示状态
	                    $scope.tbInfo.title = hideTbBtnTip ;
	                }else{
	                    $scope.tbInfo.title = showTbBtnTip ;
	                }
	            }
	        }],
	        template: '<div style="padding-top: 7px">' +
	                      '<a href = "javascript:void(0)" ng-click = "showHideTable();" ng-bind = "tbInfo.title"></a>' +
	                      '<div ng-show = "tbInfo.flag" ng-transclude=""></div>' +
	                  '</div>',
	        transclude:true
	    }
	}) ;*/
	
	
	
	
	//初始化日期控件
	app.directive('datepicker',function(){
	    return{
	        restrict: 'A',
	        scope: true,
	        link: function (scope,elem,attr) {
	            var currDate = new Date();
	            $(elem).datepicker({minDate:currDate, showButtonPanel:true});
	        }
	    };
	}) ;
	 
	//判断是否能修改value值
	app.directive('canChage',function(){
		return{
			restrict:'A',
			replace:true,
			scope:true,
			link: function(scope, elem, attrs) {
				var name = attrs['canChage'] ;
				var flag = false;
				var status = scope.data.status ;
				if(status=="1"){//未生效的数据源
					flag = true ;
				}else if(status=="2"){
					//只能改截止日期和序列号
					if(name=="effDate"||name=="sequcenceNumber"){
						flag = true; 
					}
				}
				if(!flag){
					attrs.$set("disabled","disabled") ;
				}
	        }
		} ;
	}) ;
	 
//}) ;
