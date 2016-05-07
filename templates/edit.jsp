<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/WEB-INF/pages/oc/oc_common.jsp"></jsp:include>
<title>附加服务</title>
<!-- 窗口内部样式-->
<!--
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/tui/styles/tui_global.css"/>
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/tui/styles/tui_content.css" />-->
<!-- <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/tui/components/tuiDialog/tui_dialog.css" /> -->
<!--
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/tui/components/tuiValidate/tui_validator.css" />
-->
<!-- <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/tui/components/tuiDatepicker/jquery_ui.datepicker-modify.css" />
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/oc/styles/jquery.ui.datepicker.css" />
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/oc/styles/jquery-ui-timepicker-addon.css" /> -->
<!-- 
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/oc/styles/oc_style.css" />
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/oc/styles/oc_row.css" />
 -->
 <!--
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/oc/components/autocomplete/jquery.autocomplete.css"/>
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/oc/components/iconfont/iconfont.css"/>
-->
<style type="text/css">
	.queryReuseInput{width:130px}
	/*开发版本
    input.ng-invalid {border: 1px solid red;}
    input.ng-valid{border: 1px solid green;}*/
	/*上线版本*/
	.ng-pristine{}
    select.ng-dirty.ng-invalid,input.ng-dirty.ng-invalid{border:1px solid Red;}
    .ng-dirty.ng-valid ~ span.ok{color:green; display:inline;}
    .ng-dirty.ng-invalid ~ span.ko{color:red; display:inline;}
</style>

</head>
<body>
	<input id="carrCode"  type="hidden" value='${sessionScope.carrCode}' />
	<input id="contextPath"  type="hidden" value='${pageContext.request.contextPath}' />
	<input id="action"  type="hidden" value="${action}" />
	<input id="s7Id"  type="hidden" value="${s7Id}"/>
	<input id="tokenId"  type="hidden" value="${tokenId}"/>
	<div id="loading" class ="loading"></div>
	
<div ng-controller="EditController" >
	<!-- 兑换子表 ---文本编辑 modal -->
	<div class="modal fade" id ="tbTSK202Modal" data-backdrop="static">
	  <div class="modal-dialog" style = "width:450px;">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">自定义文本</h4>
	      </div>
	      <div class="modal-body">
	      		<input type ="hidden" id ="tbTSKCustomeEdit_type" value =""/>
	      		<input type ="hidden" id ="tbTSKCustomeEdit_index" value =""/>
	        <div>
	        	<textarea style="width:400px;height:60px;" id ="tbTSKCustomeEdit_value" maxlength ="80" ></textarea>
	        </div>
	        <div>
	            <ul id ="tskCustomeTipInfo"></ul>
	        </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary" ng-click ="submitTbTSKCustomeEdit()" >确定</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<!-- 头部导航栏 -->
	<div class="main_box helper_padding_0" ng-controller ="HeaderCtrl" >
		<header-nav id ="myheader" class ="hidden"></header-nav>
	</div>
	<!--主内容部分 -->
	<div id="EditMainBoxDiv"  class="main_box edit_main_box hidden">
	<form id="s7_form"  novalidate="novalidate"  name ="myForm">
			<div  force=""  org-data="orgData"> <!-- force start -->
				<!-----------------------------------------页面第一部分------------------------------------------ -->
				<!-- 附加服务 start  (chooseShowFlag)-->
				<div class="data_section markDiv" ng-controller="BasicInfoCtrl">
				<div class="title_layout row">
					<div class ="col-sm-1 text-right title">1.选择附加服务</div>
					<div class ="col-sm-9">
						<div class="input_outer">
							<div class = "serviceInputDiv" ng-bind = "showChooseFunc()"></div>
						</div>
						<span class="necessary"></span><span class="gray">必须选择到最后一级</span>
					</div>
				</div>
				<!-- 附加服务选择框-->
				<div class="service_choose_layout" ng-if="data.action=='add'" >
					<s><i></i></s>
					<div class="service_choose">
						<choose-div  html-url="choose1.html">
							<input type="text" class="input_normal chooseInputWidth"
						   		   ng-model="chooseInputData.choose1"  tabindex="1" value="" placeholder="选择服务分组" />
						</choose-div>
						<choose-div  html-url="choose2.html">
							<input type="text" class="input_normal chooseInputWidth"
								   ng-model="chooseInputData.choose2"  tabindex="1" value="" placeholder="选择服务分组" />
						</choose-div>
						<choose-div  html-url="choose3.html">
							<input type="text" class="input_normal chooseInputWidth" 
					   			   ng-model="chooseInputData.choose3" tabindex="1" value="" placeholder="选择服务" />
						</choose-div>
						<choose-div  html-url="choose4.html" ng-show = "lastGroupList2.length>0">
							服务详细
						</choose-div>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
				</div>
				<!------------------------------------------页面第二部分-------------------------- ------------------->
				<!-- 页面第二部分:确定费用费用 start -->
				<div class="data_section markDiv block_edit_layout" ng-controller="ChargeConfirmCtrl">
					<div class="title_layout row">
						<div class="col-sm-1"><h2>2.确定费用</h2></div>
						<div class="col-sm-6">
							<span class="helper_color_blue_2 ">描述</span>
							<span class="helper_color_blue_2 ">&nbsp;|&nbsp;费用</span>
						</div>
					</div>
					<!--描述start-->
					<div class="row">
						<div class="col-sm-1"><h4>描述</h4></div>
						<div class="col-sm-10 block_edit2">
							<div class="row row_from" ng-show= "showStatus.firstMaintenanceDate.showFlag" >
							    <label class="col-sm-1_5 input_title"><span class="necessary"></span><span>销售生效日期</span></label>
							    <div class="col-sm-9">
							    	<input ng-model="data.firstMaintenanceDate" name="firstMaintenanceDate" datepicker="{{currentDateStr}}"
							    		ng-disabled="!editStatus.firstMaintenanceDate" type="text" id ="firstMaintenanceDate"
										ng-required="true" dateoc="" btc="" class="normal_input" />
									<label for="firstMaintenanceDate" class ="datebox icon iconfont icon-riqi"></label>
									<span ng-messages="myForm.firstMaintenanceDate.$error" ng-if="myForm.firstMaintenanceDate.$dirty">
	                                   	<span class="errorInfo_validate" ng-message="required">必填字段。</span>
	                                   	<span class="errorInfo_validate" ng-message="dateoc">请输入合法的日期yyyy-mm-dd。</span>
	                                   	<span class="errorInfo_validate" ng-message="btc">必须大于当前日期。</span>
	                                </span>
							    </div>
							</div>
							
							<div class="row row_from" ng-show= "showStatus.lastMaintenanceDate.showFlag" >
							    <label class="col-sm-1_5 input_title">销售截止日期</label>
							    <div class="col-sm-9">
							    	<input ng-model="data.lastMaintenanceDate" name ="lastMaintenanceDate" datepicker="{{currentDateStr}}" 
										type="text"  dateoc=""  btc=""  bd="{{data.firstMaintenanceDate}}"  id ="lastMaintenanceDate"
										class="normal_input"/>
									<label for="lastMaintenanceDate" class ="datebox icon iconfont icon-riqi"></label>
									<span ng-messages="myForm.lastMaintenanceDate.$error" ng-if="myForm.lastMaintenanceDate.$dirty">
	                                   	<span class="errorInfo_validate" ng-message="dateoc">请输入合法的日期yyyy-mm-dd。</span>
	                                   	<span class="errorInfo_validate" ng-message="btc">必须大于当前日期。</span>
	                                   	<span class="errorInfo_validate" ng-message="bd">结束日期必须大于起始日期。</span>
	                                </span>
							    </div>
							</div>
							
							<div class="row row_from" ng-if="data.basicInfoVo.subGroup=='FP'">
								 <label class="col-sm-1_5 input_title">使用时间限制</label>
								  <div class="col-sm-9">
								  		<span class ="discountBtn" ng-class ="{'discountCheck':data.useDateLimitTye==''}"
								  		 	ng-click ="changeUseDateLimitTye('')">时间段</span>
										<span class ="discountBtn" ng-class ="{'discountCheck':data.useDateLimitTye=='1'}" 
											ng-click ="changeUseDateLimitTye('1')">期限</span>
										<br/>
								  		<div class = "table_layout" style="width: 316px;display:inline-block;">
									  		<div ng-show ="data.useDateLimitTye==''">
												<input ng-model="data.firstUseDate" name="firstUseDate" ng-disabled="!editStatus.firstUseDate"
													datepicker="{{currentDateStr}}" readonly="readonly" type="text" id ="firstUseDate" btc="" 
													class ="useDateInfo"/>
												<label for="firstUseDate" class ="datebox icon iconfont icon-riqi"></label>
												<i class="icon iconfont icon-xiangyou"></i>
												<input ng-model="data.lastUseDate" name ="lastUseDate" ng-disabled="!editStatus.firstUseDate"
													datepicker="{{currentDateStr}}" type="text"  id ="lastUseDate" readonly="readonly" 
													btc ="" bd="{{data.firstUseDate}}"  class ="useDateInfo" />
												<label for="lastUseDate" class ="datebox icon iconfont icon-riqi"></label>
											</div>
											<div ng-show ="data.useDateLimitTye=='1'">
												<select name="effectivePeriodType" ng-model="data.effectivePeriodType" 
													ng-disabled="!editStatus.effectivePeriodType" class="select_width"
													ng-options="d.value as d.name for d in effectivePeriodTypeList.list"   
													ng-change="changeEffectivePeriodType()">
												</select>
										    	<input  name="effectivePeriodNumber"  ng-model="data.effectivePeriodNumber" class="two_input" 
										    			maxLength = "3" nnint ="" ng-required="data.effectivePeriodType!=''">
												<select name="effectivePeriodUnit" ng-model="data.effectivePeriodUnit" 
													ng-disabled="!editStatus.effectivePeriodUnit || data.effectivePeriodType==''" 
													ng-options="d.value as d.name for d in effectivePeriodUnitList" class="two_input" 
													ng-required="data.effectivePeriodNumber!=''">
										</select>
											</div>
								  		</div>
										<span ng-messages="myForm.firstUseDate.$error" >
		                                   	<span class="errorInfo_validate" ng-message="btc">起始日期必须大于当前！</span>
		                                </span>
										<span ng-messages="myForm.lastUseDate.$error" >
		                                   	<span class="errorInfo_validate" ng-message="btc">结束日期必须大于当前！</span>
		                                   	<span class="errorInfo_validate" ng-message="bd">结束日期必须大于起始日期！</span>
		                                </span>
								  		<span ng-messages="myForm.effectivePeriodNumber.$error" >
		                                   	<span class="errorInfo_validate" ng-message="required">期限不能为空！</span>
		                                   	<span class="errorInfo_validate" ng-message="nnint">请输入数字!</span>
		                                </span>
								  </div>
							</div>
							
							<div class="row row_from" ng-if="data.basicInfoVo.subGroup=='FL'">
								 <label class="col-sm-1_5 input_title">使用时间限制</label>
								 <div class="col-sm-9">
								  	<span class ="discountBtn discountCheck">期限</span><br/>
								  	<div class = "table_layout" style="width: 316px;display:inline-block;">
										<select name="effectivePeriodType" ng-model="data.effectivePeriodType" 
												ng-disabled="!editStatus.effectivePeriodType" ng-change="changeEffectivePeriodType()"
												ng-options="d.value as d.name for d in effectivePeriodTypeList" class="select_width"> 
										</select>
								    	<input  name="effectivePeriodNumber"  ng-model="data.effectivePeriodNumber" class="two_input" maxLength = "3"
								    			ng-disabled="!editStatus.effectivePeriodNumber || data.effectivePeriodType==''"  type="text" 
								    			nnint ="" ng-required="data.effectivePeriodType!=''"/>
										<select name="effectivePeriodUnit" ng-model="data.effectivePeriodUnit" 
												ng-disabled="!editStatus.effectivePeriodUnit || data.effectivePeriodType==''" 
												ng-options="d.value as d.name for d in effectivePeriodUnitList"  class="two_input">
										</select>
									</div>
									<span ng-messages="myForm.effectivePeriodNumber.$error" >
	                                   	<span class="errorInfo_validate" ng-message="required">期限不能为空！</span>
	                                   	<span class="errorInfo_validate" ng-message="nnint">请输入数字!</span>
	                                </span>
								 </div>
							</div>
							
							<div class="row row_from" ng-show= "showStatus.serviceNumberMinAndMaximum.showFlag" >
							    <label class="col-sm-1_5 input_title">服务套数</label>
							    <div class="col-sm-9">
							    	<input type = "text" ng-model = "data.serviceNumberMinimum"  maxLength = "3"  
							    		ng-disabled="!editStatus.serviceNumberMinimum" name ="serviceNumberMinimum" 
										class = "rangeInput" id="serviceNumberMinimum" nnint="" smaller="{{data.serviceNumberMaximum}}" />
									    <i class="icon iconfont icon-xiangyou"></i>
									<input type = "text" ng-model = "data.serviceNumberMaximum" maxLength = "3" name="serviceNumberMaximum"
									   ng-disabled="!editStatus.serviceNumberMaximum" nnint="" bigger="{{data.serviceNumberMinimum}}" 
									   id = "serviceNumberMaximum" class = "rangeInput" />
									<span ng-messages="myForm.serviceNumberMinimum.$error" ng-if="myForm.serviceNumberMinimum.$dirty">
	                                   	<span class="errorInfo_validate" ng-message="nnint">最小值请输入非负数</span>
	                                   	<span class="errorInfo_validate" ng-message="smaller">最大值不能小于最小值</span>
	                                </span>
									<span ng-messages="myForm.serviceNumberMaximum.$error" ng-if="myForm.serviceNumberMaximum.$dirty">
	                                   	<span class="errorInfo_validate" ng-message="nnint">最大值请输入非负整数</span>
	                                   	<span class="errorInfo_validate" ng-message="bigger">最大值不能小于最小值</span>
	                                </span>
							    </div>
							</div>
							
							 <div class="row row_from" ng-show= "showStatus.description.showFlag" >
							    <label class="col-sm-1_5 input_title">描述</label>
							    <div class="col-sm-9">
							    	<textarea  ng-model="data.description" style="width:566px;height:65px;" ng-disabled="!editStatus.description"
										placeholder="描述信息"></textarea>
							    </div>
							</div>
							<div class="row row_from" ng-show= "showStatus.fareBasis.showFlag" >
							    <label class="col-sm-1_5 input_title">产品代号</label>
							    <div class="col-sm-9">
							    	<input ng-model="data.fareBasis" name ="fareBasis" upper-input="" ng-disabled="!editStatus.fareBasis"
								 		 lorn ="" maxlength="20" type="text" class="normal_input" />
								 	<span ng-messages="myForm.fareBasis.$error" ng-if="myForm.fareBasis.$dirty">
	                                   	<span class="errorInfo_validate" ng-message="lorn">请输入字母或数字!</span>
	                                </span>
							    </div>
							</div>
							<div class="row row_from" ng-show= "showStatus.availability.showFlag" >
							    <label class="col-sm-1_5 input_title">是否检查库存</label>
							    <div class="col-sm-9">
							    	<input  type="radio" ng-model="data.availability" value="N" name="availability" 
							    		ng-disabled="!editStatus.availability" />
					 				<label class="paddingLR5">否</label>
					 				<input  type="radio" ng-model="data.availability" value="Y" name="availability" 
					 					ng-disabled="!editStatus.availability"/>
									<label>是</label>
							    </div>
							</div>
						</div><!--描述block end-->
					</div><!--描述 row end-->
				
					<!--行李start-->
					<div class="row block_box"  ng-if ="data.serviceType=='A'||data.serviceType=='C'||data.serviceType=='P'">
						<div class="col-sm-1"><h4>行李</h4></div>
						<div class="col-sm-10 block_edit2">
							<div class="row row_from" ng-show= "showStatus.freeBaggageAllowancePieces.showFlag" >
							    <label class="col-sm-1_5 input_title">免费行李件数</label>
							    <div class="col-sm-9">
							    	<input ng-model="data.freeBaggageAllowancePieces" name="freeBaggageAllowancePieces" 
							    		ng-disabled="!editStatus.freeBaggageAllowancePieces" 
								 		pint="" class="two_input" maxlength="2" type="text" />
									<span>&nbsp;件</span>
									<span ng-messages="myForm.freeBaggageAllowancePieces.$error" 
										ng-if="myForm.freeBaggageAllowancePieces.$dirty">
	                                   	<span class="errorInfo_validate" ng-message="pint">请输入正整数!</span>
	                                </span>
							    </div>
							</div>
							<div class="row row_from" ng-show= "showStatus.firstAndLastExcessOccurrence.showFlag" >
							    <label class="col-sm-1_5 input_title">收费行李件数</label>
							    <div class="col-sm-9">
							    	<input ng-model="data.firstExcessOccurrence" ng-disabled="!editStatus.firstExcessOccurrence" 
							    		pint ="" smaller="{{data.lastExcessOccurrence}}
							    		" class="rangeInput" name ="firstExcessOccurrence" 
									 	id="firstExcessOccurrence" maxlength="2" type="text" />
									 <i class="icon iconfont icon-xiangyou"></i><!--rangeInput text-info-->
									 <input ng-model="data.lastExcessOccurrence" ng-disabled="!editStatus.lastExcessOccurrence" 
									 	 class="rangeInput"  maxlength="2" pint ="" bigger ="{{data.firstExcessOccurrence}}"
										 name ="lastExcessOccurrence" id="lastExcessOccurrence" type="text" />
									 <span>&nbsp;件</span>
									 <span ng-messages="myForm.firstExcessOccurrence.$error" ng-if="myForm.firstExcessOccurrence.$dirty">
	                                   	<span class="errorInfo_validate" ng-message="pint">起始值必须为正整数!</span>
	                                   	<span class="errorInfo_validate" ng-message="smaller">最小值要小于最大值!</span>
	                                 </span>
	                                 <span ng-messages="myForm.lastExcessOccurrence.$error" ng-if="myForm.lastExcessOccurrence.$dirty">
	                                   	<span class="errorInfo_validate" ng-message="pint">结束值必须为正整数!</span>
	                                   	<span class="errorInfo_validate" ng-message="bigger">最大值要大于最小值!</span>
	                                 </span>
							    </div>
							</div>
							 <div class="row row_from" ng-show= "showStatus.freeBaggageAllowanceWeight.showFlag" >
							    <label class="col-sm-1_5 input_title">行李重量</label>
							    <div class="col-sm-9">
							    	 <input ng-model="data.freeBaggageAllowanceWeight" ng-disabled="!editStatus.freeBaggageAllowanceWeight" 
							    	    pint ="" class="two_input" name="freeBaggageAllowanceWeight" maxlength="4" type="text" />&nbsp;
									 <select ng-model = "data.freeBaggageAllowanceUnit" ng-disabled="!editStatus.freeBaggageAllowanceUnit"
										 ng-options="o.value as o.name for o in weightUnitList" class="two_input" 
										 name ="freeBaggageAllowanceUnit" ng-required ="data.freeBaggageAllowanceWeight!=''">
									 </select>
									 <span ng-messages="myForm.freeBaggageAllowanceWeight.$error" ng-if="myForm.freeBaggageAllowanceWeight.$dirty">
	                                   	<span class="errorInfo_validate" ng-message="pint">请输入正整数!</span>
	                                 </span>
	                                 <span ng-messages="myForm.freeBaggageAllowanceUnit.$error">
	                                   	<span class="errorInfo_validate" ng-message="required">重量单位不能为空!</span>
	                                 </span>
							    </div>
							</div>
							<div class="row row_from" ng-show= "showStatus.baggageTravelApplication.showFlag" >
							    <label class="col-sm-1_5 input_title">行李适用范围</label>
							    <div class="col-sm-9">
							    	<select ng-model = "data.baggageTravelApplication" style="width:200px;" 
								    	ng-disabled="!editStatus.baggageTravelApplication"
										ng-options="o.value as o.name for o in baggageTravelApplicationList" >
									</select>
							    </div>
							</div>
							<div class="row row_from" ng-show= "showStatus.list196VO.showFlag">
							    <label class="col-sm-1_5 input_title">备注例外行李</label>
							    <div class="col-sm-9">
							    	<show-hide-table tname="list196VO"></show-hide-table>
							    	<oc-complete  tbname="list196VO" ng-hide ="data.statusDes=='3'"></oc-complete>
							    	<div class = "table_layout" style ="width:275px" ng-show="tableStatus.list196VO">
										<table-info  table-data="tableData.list196VO"  
											list = "data.list196VO"  html-url="tb196.html" tbname="list196VO" >
										</table-info>
									</div>
							    </div>
							</div>
						</div><!--行李bolck end-->
					</div><!--行李 row end-->
				
					<!--费用 start-->
					<div class="row block_box">
						<div class="col-sm-1"><h4>费用</h4></div>
						<div class="col-sm-10 block_edit2">
							 <div class="row row_from" ng-show= "showStatus.noChargeNotAvailable.showFlag" >
							    <label class="col-sm-1_5 input_title">是否收费</label>
							    <div class="col-sm-9">
							    	<select ng-model="data.noChargeNotAvailable" style="width:200px;" 
							    		 ng-options="a.value as a.name for a in noChargeNotAvailableList.list"
										 ng-change="changeNoChargeNotAvailable()" ng-disabled="!editStatus.noChargeNotAvailable">
									</select>
							    </div>
							</div>
							 <div class="row row_from" ng-show= "showStatus.list170VOAndlist201VO.showFlag" >
							 	<!--当‘或/和’字段为‘和’时，当适用于不为'H,C,P'则金额必填(也就是说当为H、C、P时金额必须为空)-->
								<label class="col-sm-1_5 input_title">
									<span class="necessary" 
									  ng-show="data.noChargeNotAvailable==''||(data.specSevFeeAndOrIndicator=='A'&&data.specifiedServiceFeeApp!='H'&&data.specifiedServiceFeeApp!='C'&&data.specifiedServiceFeeApp!='P')">
									</span>金额
							    </label>
								<!--当为行李时不存在折扣-->
								<div class="col-sm-9" ng-if="data.serviceType=='A'||data.serviceType=='C'||data.serviceType=='P'||data.serviceType=='B'||data.serviceType=='E'">
									<span class="discountBtn discountCheck marginRight15">全额</span>
									<show-hide-table tname = "list170VO"></show-hide-table> 
									<oc-complete tbname="list170VO" ng-hide ="data.statusDes=='3'"></oc-complete>
									<div class = "table_layout" style ="width:560px" ng-if="tableStatus.list170VO">
										<table-info  table-data="tableData.list170VO"  tbname="list170VO" 
											list="data.list170VO" html-url="tb170.html">
										</table-info>
									</div>
								</div>
								<!--当为普通服务时-->
							    <div class="col-sm-9" ng-if="data.serviceType!='A'&&data.serviceType!='C'&&data.serviceType!='P'&&data.serviceType!='B'&&data.serviceType!='E'" >
							    	<span ng-show = "data.sel3.value.length>0" class ="marginRight15">
										<span ng-click="clickDiscount('1')"  class ="discountBtn"
											ng-class ="{true:'discountCheck',false:''}[data.discountOrNot=='1']" >全额
										</span>
										<span ng-click="clickDiscount('0')" class ="discountBtn marginRight15"
											ng-class ="{true:'discountCheck',false:''}[data.discountOrNot=='0']">折扣 
										</span>
									</span>
									<show-hide-table tname = "list170VO"></show-hide-table> 
									<!--折扣的时候不支持表格复用-->
									<oc-complete tbname="list170VO" ng-hide ="data.discountOrNot=='0'||data.statusDes=='3'" ></oc-complete>
									<span class="marginLeft15"></span>
									<div class = "table_layout" style ="width:560px" ng-if="tableStatus.list170VO&&data.discountOrNot=='1'">
										<table-info  table-data="tableData.list170VO"  tbname="list170VO" 
											list="data.list170VO" html-url="tb170.html">
										</table-info>
									</div>
									<div class = "table_layout" style="width: 600px;" ng-if="tableStatus.list170VO&&data.discountOrNot=='0'">
										<table>
											<tbody>
											<tr bindonce ng-repeat="l in data.list201VO">
												<td bo-bind="'['+l.subCode+']'+l.commercialName"></td>
												<td>
													<input type ="radio"  ng-model ="l.discountType" ng-click = "clickDiscount2(l)" 
														   ng-disabled="!editStatus.list201VO" value= "1" />一口价
													<input  name="{{'t20102'+$index}}" ng-model = "l.onePriceNum" 
															ng-class="{true:'required',false:'inputDisabled'}[l.discountType=='1']"
														   ng-disabled="!editStatus.list201VO||l.discountType!='1'"
														   type ="text" maxLength = "8" class ="digits rangeInput" />CNY
												</td>
												<td>
													<input type ="radio" ng-model ="l.discountType" ng-click = "clickDiscount2(l)" 
														ng-disabled="!editStatus.list201VO" value= "0"  />折扣
													<input  name="{{'t20104'+$index}}" type="text" ng-model = "l.discountNum"  maxLength="3"
													  class ="{number:true,min:0,max:100} rangeInput" 
													  ng-class ="{true:'required',false:'inputDisabled'}[l.discountType=='0']"
													  ng-disabled="!editStatus.list201VO||l.discountType!='0'" />&nbsp;%
												</td>
											</tr>
											</tbody>
										</table>
									</div>
							    </div>
							</div>


							<div class="row row_from" ng-show= "showStatus.specSevFeeAndOrIndicator.showFlag" >
							    <label class="col-sm-1_5 input_title">或/和</label>
							    <div class="col-sm-9">
							    	<input ng-model="data.specSevFeeAndOrIndicator" name ="specSevFeeAndOrIndicator" type="radio" 
							    	 	value="" ng-disabled="!editStatus.specSevFeeAndOrIndicator" ng-change ="clickSpecSevFeeAndOrIndicator('')" />或者
									<span class="paddingLR5"></span>
									<input ng-model="data.specSevFeeAndOrIndicator" name ="specSevFeeAndOrIndicator" type="radio" 
									 	value="A" ng-disabled="!editStatus.specSevFeeAndOrIndicator" ng-change ="clickSpecSevFeeAndOrIndicator('A')" />和
							    </div>
							</div>
							<!-- 新增里程积分兑换start -->
							<div class="row row_from"   ng-show= "showStatus.mileageExchangeIndicator.showFlag" >
								<!-- showStatus.mileageExchangeIndicator.showFlag -->
							    <label class="col-sm-1_5 input_title">里程兑换标识</label>
							    <div class="col-sm-9">
							    	<input type ="radio"  ng-model ="data.mileageExchangeIndicator"  value ="0" 
							    		name ="mileageExchangeIndicator" ng-disabled="!editStatus.mileageExchangeIndicator" 
							    		ng-change="clickMileageExchangeIndicator('')"/>
							    	<span class ="marginRight15">不兑换</span>
							    	<input type ="radio"  ng-model ="data.mileageExchangeIndicator"  value ="1" 
							    		name ="mileageExchangeIndicator" ng-disabled="!editStatus.mileageExchangeIndicator" 
							    		ng-change="clickMileageExchangeIndicator('1')"/>
							    	<span class ="marginRight15">兑换，用里程支付</span>
							    	<input type ="radio"  ng-model ="data.mileageExchangeIndicator" value ="2" 
							    		name ="mileageExchangeIndicator" ng-disabled="!editStatus.mileageExchangeIndicator" 
							    		ng-change="clickMileageExchangeIndicator('2')"/>
							    	<span class ="marginRight15">兑换，用里程或金额支付</span>
							    </div>
							</div>
							<!-- 新增里程积分兑换end -->
							<div class="row row_from"  >
							    <label class="col-sm-1_5 input_title" >
							    	<span class="necessary" ng-show="data.specSevFeeAndOrIndicator=='A'">
							    	</span> <span>里程费</span>
							     </label>
							    <div class="col-sm-9">
							    	<input ng-model="data.specifiedServiceFeeMileage" ng-disabled="!editStatus.specifiedServiceFeeMileage" 
									  maxLength = "8" type="text"  class="normal_input" name="specifiedServiceFeeMileage" nnint =""
									  ng-required ="data.specSevFeeAndOrIndicator=='A'" />
									 <span ng-messages="myForm.specifiedServiceFeeMileage.$error" >
									 	<span class="errorInfo_validate" ng-message="required">当‘或/和’为‘和’时里程费必填!</span>
	                                   	<span class="errorInfo_validate" ng-message="nnint">请输入非负整数!</span>
	                                   	
	                                 </span>
							    </div>
							</div>
							
							<div class="row row_from" ng-show= "showStatus.specifiedServiceFeeApp.showFlag" >
							    <label class="col-sm-1_5 input_title"><span>适用于</span></label>
							    <div class="col-sm-9">
							    	<select ng-model="data.specifiedServiceFeeApp" ng-disabled="!editStatus.specifiedServiceFeeApp" 
										style="width:200px" name="specifiedServiceFeeApp"  ng-change="changeSpecifiedServiceFeeApp()"
										ng-options="a.value as a.name for a in specifiedServiceFeeAppList.list">
										<option value="">选择</option>
								   </select>
							    </div>
							</div>
							<div class="row row_from" ng-show= "showStatus.specServiceFeeColSub.showFlag" >
							    <label class="col-sm-1_5 input_title">包含/扣除</label>
							    <div class="col-sm-9">
							    	<select ng-model="data.specServiceFeeColSub" ng-disabled="!editStatus.specServiceFeeColSub"  
							    		class="select_width" ng-options="a.value as a.name for a in specServiceFeeColSubList">
									</select>
							    </div>
							</div>
							 <div class="row row_from" ng-show= "showStatus.specServiceFeeNetSell.showFlag" >
							    <label class="col-sm-1_5 input_title">净价/销售价</label>
							    <div class="col-sm-9">
							    	<select ng-model="data.specServiceFeeNetSell"  ng-disabled="!editStatus.specServiceFeeNetSell"  
							    		class="select_width" ng-options="a.value as a.name for a in specServiceFeeNetSellList">
									</select>
							    </div>
							</div>
							 <div class="row row_from" ng-show= "showStatus.indicatorComission.showFlag" >
							    <label class="col-sm-1_5 input_title">有无代理费</label>
							    <div class="col-sm-9">
							    	<input ng-model="data.indicatorComission"  name ="indicatorComission"  
							    		ng-disabled="!editStatus.indicatorComission"  type="radio" value="Y" />有
									<span class="paddingLR5"></span>
									<input ng-model="data.indicatorComission" name ="indicatorComission" 
										ng-disabled="!editStatus.indicatorComission" type="radio" value="N" />无
							    </div>
							</div>
							<div class="row row_from" ng-show= "showStatus.taxApplication.showFlag" >
							    <label class="col-sm-1_5 input_title">有无税费</label>
							    <div class="col-sm-9">
							    	<input ng-model="data.taxApplication" name ="taxApplication"  
							    		ng-disabled="!editStatus.taxApplication" type="radio" value="Y" />
									<label class="paddingLR5">有</label>
									<input ng-model="data.taxApplication" name ="taxApplication"  
										ng-disabled="!editStatus.taxApplication" type="radio"  value="" />
									<label>无</label>
							    </div>
							</div>
						</div><!--费用 block end-->
					</div><!-- row 费用 end-->
				</div><!--最外层div-->
				
				
				
				<!-- ------------------------------页面第三部分:规则详细 start -------------------------->
				<div class="data_section markDiv block_edit_layout" ng-controller="RuleDetailCtrl">
				<div class="title_layout row">
					<div class="col-sm-1"><h2>3.规则详细</h2></div>
					<div class="col-sm-6">
						<span class="helper_color_blue_2">序号</span>
						<span class="helper_color_blue_2 ">&nbsp;|&nbsp;旅客</span>
						<span class="helper_color_blue_2 ">&nbsp;|&nbsp;发布</span>
						<span class="helper_color_blue_2 ">&nbsp;|&nbsp;航程</span>
						<span class="helper_color_blue_2 ">&nbsp;|&nbsp;航班</span>
						<span class="helper_color_blue_2 ">&nbsp;|&nbsp;购买</span>
						<span class="helper_color_blue_2 ">&nbsp;|&nbsp;票价</span>
						<span class="helper_color_blue_2 ">&nbsp;|&nbsp;票证</span>
						<span class="helper_color_blue_2 ">&nbsp;|&nbsp;退款</span>
					</div>
				</div>
				
				<!--序号start -->
				<div class="row">
					<div class="col-sm-1"><h4>序号</h4></div>
					<div class="col-sm-10 block_edit2">
						<div class="row row_from" ng-show= "showStatus.sequenceNumber.showFlag" >
						    <label class="col-sm-1_5 input_title">优先级序号</label>
						    <div class="col-sm-9">
						    	<input ng-model="data.sequenceNumber" ng-disabled="!editStatus.sequenceNumber" type="text"  
								class="normal_input" placeholder="序号越小，优先级越高" maxlength ="7" name="sequenceNumber" 
								ng-required ="data.action==UPDATE_STR" pint =""/>
								<span ng-messages="myForm.sequenceNumber.$error" ng-if="myForm.sequenceNumber.$dirty">
                                    <span class="errorInfo_validate" ng-message="required">必填字段!</span>
                                    <span class="errorInfo_validate" ng-message="pint">请输入正整数！</span>
                                </span>
						    </div>
						</div>
					</div>
				</div><!--序号end -->
				<!--旅客start -->
				<div class="row block_box">
					<div class="col-sm-1"><h4>旅客</h4></div>
					<div class="col-sm-10 block_edit2">
						<div class="row row_from" ng-show= "showStatus.passengerTypeCode.showFlag" >
						    <label class="col-sm-1_5 input_title">旅客类型</label>
						    <div class="col-sm-9">
						    	<select ng-model="data.passengerTypeCode"  ng-disabled="!editStatus.passengerTypeCode" class="select_width"
										ng-options="a.psgrTypeCode as a.psgrTypeDesc for a in passengerTypeCodeList">
									<option value="">请选择</option>
								</select>
						    </div>
						</div>
				
						<div class="row row_from" ng-show= "showStatus.minAndMaxPassengerAge.showFlag" >
						    <label class="col-sm-1_5 input_title">年龄范围</label>
						    <div class="col-sm-9">
						    	<input type = "text" ng-model = "data.minPassengerAge"  maxLength = "2"  ng-disabled="!editStatus.minPassengerAge"
									class = "rangeInput" pint ="" smaller ="{{data.maxPassengerAge}}" name ="minPassengerAge" id="minPassengerAge" />
								 <i class="icon iconfont icon-xiangyou"></i>
								<input type = "text" ng-model = "data.maxPassengerAge" maxLength = "2"   ng-disabled="!editStatus.maxPassengerAge"
									class ="rangeInput" pint =""  bigger ="{{data.minPassengerAge}}" name="maxPassengerAge" id ="maxPassengerAge"/>
								<span ng-messages="myForm.minPassengerAge.$error">
                                    <span class="errorInfo_validate" ng-message="pint">请输入正整数！</span>
                                     <span class="errorInfo_validate" ng-message="smaller">年龄最小值不能大于最大值！</span>
                                </span>
                                <span ng-messages="myForm.maxPassengerAge.$error" >
                                    <span class="errorInfo_validate" ng-message="pint">请输入正整数！</span>
                                     <span class="errorInfo_validate" ng-message="bigger">年龄最大值不能小于最小值！</span>
                                </span>
							</div>
						</div>
						
						<div class="row row_from" ng-show= "showStatus.allowancePeopleMinAndMaximum.showFlag" >
						    <label class="col-sm-1_5 input_title">服务适用人数范围</label>
						    <div class="col-sm-9">
						    	<input type = "text" ng-model = "data.allowancePeopleMinimum"  maxLength = "3"  
						    		ng-disabled="!editStatus.allowancePeopleMinimum" pint ="" smaller ="{{data.allowancePeopleMaximum}}"
									class = "rangeInput" name ="allowancePeopleMinimum" id="allowancePeopleMinimum" />
								 <i class="icon iconfont icon-xiangyou"></i>
								<input type = "text" ng-model = "data.allowancePeopleMaximum" maxLength = "3"   
									ng-disabled="!editStatus.allowancePeopleMaximum" pint ="" bigger ="{{data.allowancePeopleMinimum}}"
									class = "rangeInput" name="allowancePeopleMaximum" id ="allowancePeopleMaximum"/>
								<span ng-messages="myForm.allowancePeopleMinimum.$error">
                                    <span class="errorInfo_validate" ng-message="pint">请输入正整数！</span>
                                     <span class="errorInfo_validate" ng-message="smaller">人数最小值不能大于最大值！</span>
                                </span>
                                <span ng-messages="myForm.allowancePeopleMaximum.$error" >
                                    <span class="errorInfo_validate" ng-message="pint">请输入正整数！</span>
                                     <span class="errorInfo_validate" ng-message="bigger">人数最大值不能小于最小值！</span>
                                </span>
							</div>
						</div>
				
						<div class="row row_from" ng-show= "showStatus.firstAndLastPassengerOccurrence.showFlag" >
						    <label class="col-sm-1_5 input_title">旅客序号范围</label>
						    <div class="col-sm-9">
						    	<input type = "text" ng-model = "data.firstPassengerOccurrence" maxLength = "3" 
								     ng-disabled="!editStatus.firstPassengerOccurrence" class = "{positiveInteger:true} rangeInput" 
								     id="firstPassengerOccurrence" name="firstPassengerOccurrence" pint ="" smaller ="{{data.lastPassengerOccurrence}}"/>
								     <i class="icon iconfont icon-xiangyou"></i>
								<input type = "text" ng-model = "data.lastPassengerOccurrence"  maxLength = "3"  class="rangeInput"
									 ng-disabled="!editStatus.lastPassengerOccurrence" pint ="" bigger ="{{data.firstPassengerOccurrence}}"
									 name ="lastPassengerOccurrence" id ="lastPassengerOccurrence"/>
								<span ng-messages="myForm.firstPassengerOccurrence.$error">
                                    <span class="errorInfo_validate" ng-message="pint">请输入正整数！</span>
                                     <span class="errorInfo_validate" ng-message="smaller">序号最小数不能大于最大值！</span>
                                </span>
                                <span ng-messages="myForm.lastPassengerOccurrence.$error" >
                                    <span class="errorInfo_validate" ng-message="pint">请输入正整数！</span>
                                     <span class="errorInfo_validate" ng-message="bigger">序号最大值不能小于最小值！</span>
                                </span>
						    </div>
						</div>
				
						<div class="row row_from" ng-show= "showStatus.frequentFlyerStatus.showFlag" >
						    <label class="col-sm-1_5 input_title">常旅客状态</label>
						    <div class="col-sm-9">
						    	<select ng-model="data.frequentFlyerStatus" ng-disabled="!editStatus.frequentFlyerStatus" 
						    		class="select_width" ng-options="b.ffpStatus as b.description for b in frequentFlyerStatusList">
						    		<option value="">选择</option>
								</select>
						    </div>
						</div>
				
						
						
						<div class="row row_from" ng-show= "showStatus.customerIndexScoreMinAndMaximum.showFlag" >
						    <label class="col-sm-1_5 input_title">客户积分范围</label>
						    <div class="col-sm-9">
						    	<input type="text" ng-model="data.customerIndexScoreMinimum" maxLength="6" pint =""
						    		ng-disabled="!editStatus.customerIndexScoreMinimum" smaller ="{{data.customerIndexScoreMaxmum}}"
						    		class = "rangeInput" name="customerIndexScoreMinimum" id="customerIndexScoreMinimum" >
						    		 <i class="icon iconfont icon-xiangyou"></i><!--rangeInput-->
								<input type = "text" ng-model = "data.customerIndexScoreMaxmum"  maxLength = "6"  pint =""
									ng-disabled="!editStatus.customerIndexScoreMaxmum" id="customerIndexScoreMaxmum" 
									bigger ="{{data.customerIndexScoreMinimum}}" class = "rangeInput" name="customerIndexScoreMaxmum"  />
								<span ng-messages="myForm.customerIndexScoreMinimum.$error">
                                    <span class="errorInfo_validate" ng-message="pint">请输入正整数！</span>
                                     <span class="errorInfo_validate" ng-message="smaller">积分最小数不能大于最大值！</span>
                                </span>
                                <span ng-messages="myForm.customerIndexScoreMaxmum.$error" >
                                    <span class="errorInfo_validate" ng-message="pint">请输入正整数！</span>
                                     <span class="errorInfo_validate" ng-message="bigger">积分最大值不能小于最小值！</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.list172VO.showFlag" >
						    <label class="col-sm-1_5 input_title">大客户/特殊客户表</label>
						    <div class="col-sm-9">
						    	<show-hide-table tname="list172VO"></show-hide-table>
						    	<oc-complete  tbname="list172VO" ng-hide ="data.statusDes=='3'"></oc-complete>
						    	<div class = "table_layout" style ="width:150px" ng-show="tableStatus.list172VO">
									<table-info table-data = "tableData.list172VO" tbname="list172VO"
										 list = "data.list172VO" html-url = "tb172.html" >
									</table-info>
								</div>
						    </div>
						</div>
						
					</div>
				</div><!--旅客end -->
				
				<!--发布start-->
				<div class="row block_box">
					<div class="col-sm-1"><h4>发布</h4></div>
					<div class="col-sm-10 block_edit2">
						<div class="row row_from" ng-show= "showStatus.list183VO.showFlag" >
						    <label class="col-sm-1_5 input_title">发布对象</label>
						    <div class="col-sm-9">
						    	<show-hide-table tname="list183VO"></show-hide-table>
						    	<oc-complete tbname="list183VO" ng-hide ="data.statusDes=='3'"></oc-complete>
						    	<div class = "table_layout" style ="width:750px" ng-show="tableStatus.list183VO" >
									<table-info table-data = "tableData.list183VO" list = "data.list183VO" 
										tbname="list183VO"  html-url = "tb183.html">
									</table-info>
								</div>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.publicPrivateIndicator.showFlag" >
						    <label class="col-sm-1_5 input_title">公布/私有</label>
						    <div class="col-sm-9">
						    	<input ng-model="data.publicPrivateIndicator" name = "publicPrivateIndicator" 
									ng-disabled="!editStatus.publicPrivateIndicator" type="radio" value="" />
								<span class="paddingLR5">公布</span>
								<input ng-model="data.publicPrivateIndicator" name ="publicPrivateIndicator"  
									ng-disabled="!editStatus.publicPrivateIndicator" type="radio" value="P" />
								<span>私有</span>
						    </div>
						</div>
					</div>
				</div><!--发布end-->
				<!--航程start-->
				<div class="row block_box">
					<div class="col-sm-1"><h4>航程</h4></div>
					<div class="col-sm-10 block_edit2">
						<div class="row row_from" ng-show= "showStatus.geoSpecFromToWithin.showFlag" >
						    <label class="col-sm-1_5 input_title">区域限制</label>
						    <div class="col-sm-9">
						    	<input ng-model = "data.geoSpecFromToWithin" ng-disabled="!editStatus.geoSpecFromToWithin" 
									value=""  name="geoSpecFromToWithin" checked="checked" type="radio"/><span  class="paddingLR5">不限区域</span>
								<input ng-model = "data.geoSpecFromToWithin" ng-disabled="!editStatus.geoSpecFromToWithin" 
									value="1" name="geoSpecFromToWithin" type="radio" /><span  class="paddingLR5">区域1→区域2</span>
								<input  ng-model = "data.geoSpecFromToWithin" ng-disabled="!editStatus.geoSpecFromToWithin"  
									value="2" name="geoSpecFromToWithin" type="radio"  /><span  class="paddingLR5">区域2→区域1</span>
								<input  ng-model = "data.geoSpecFromToWithin" ng-disabled="!editStatus.geoSpecFromToWithin" 
									value="W" name="geoSpecFromToWithin" type="radio"  /><span  class="paddingLR5">区域1内部</span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.geoSpecSectPortJourney.showFlag" >
						    <label class="col-sm-1_5 input_title">
						    	<span class="necessary" ng-show="data.serviceType=='F'"></span>
						    	Sector/Portion/Journey
						    </label>
						    <div class="col-sm-9">
						    	<select ng-model="data.geoSpecSectPortJourney"  ng-disabled="!editStatus.geoSpecSectPortJourney" 
									class = "select_width" name="geoSpecSectPortJourney" ng-change="changeGeoSpecSectPortJourney()"
									ng-options="d.value as d.name for d in geoSpecSectPortJourneyList.list" >
								</select>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.geoSpecTravelIndicator.showFlag" >
						    <label class="col-sm-1_5 input_title">指定区域</label>
						    <div class="col-sm-9">
						    	<input ng-model="data.geoSpecTravelIndicator"  ng-disabled="!editStatus.geoSpecTravelIndicator"
						    		maxLength = "2" type="text" placeholder="" class="normal_input" />
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.geoSpecExceptionStopTimeAndUnit.showFlag" >
						    <label class="col-sm-1_5 input_title">经停时间</label>
						    <div class="col-sm-9">
						    	<input ng-model="data.geoSpecExceptionStopTime" name="geoSpecExceptionStopTime" 
						    		ng-disabled="!editStatus.geoSpecExceptionStopTime" type="text" 
						    		class="two_input"  nnint ="" ng-required ="data.geoSpecExceptionStopUnit!=''" />
								<select name ="geoSpecExceptionStopUnit" ng-model="data.geoSpecExceptionStopUnit" class ="two_input"
									ng-required ="data.geoSpecExceptionStopTime!=''" ng-disabled="!editStatus.geoSpecExceptionStopUnit"  >
									<option bindonce ng-repeat ="l in geoSpecExceptionStopUnitList" value="{{l.value}}" bo-text="l.name"></option>
								</select>
								<span ng-messages="myForm.geoSpecExceptionStopTime.$error" >
                                    <span class="errorInfo_validate" ng-message="required">经停时间不能为空！</span>
                                    <span class="errorInfo_validate" ng-message="bigger">请输入非负整数！</span>
                                </span>
                                <span ng-messages="myForm.geoSpecExceptionStopUnit.$error" >
                                    <span class="errorInfo_validate" ng-message="required">经停单位不能为空！</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.geoSpecStopConnDes.showFlag" >
						    <label class="col-sm-1_5 input_title">经停类型</label>
						    <div class="col-sm-9">
						    	<input ng-model="data.geoSpecStopConnDes" ng-disabled="!editStatus.geoSpecStopConnDes"
									maxLength = "1" upper-input="" type="text" class="normal_input" letter =""  name ="geoSpecStopConnDes"/>
								<span ng-messages="myForm.geoSpecStopConnDes.$error" >
                                    <span class="errorInfo_validate" ng-message="letter">请输入字母!</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.geoSpecLoc1AndType.showFlag" >
						    <label class="col-sm-1_5 input_title">区域1</label>
						    <div class="col-sm-9">
						    	<select name="geoSpecLoc1Type" ng-model="data.geoSpecLoc1Type" ng-options="b.value as b.name for b in geoLocTypeList"
									 ng-disabled="data.list178Loc1.length>0||tableStatus.list178Loc1||!editStatus.geoSpecLoc1Type"
									 ng-change="selectChangeGeoSpecLoc1()" class="two_input">
								</select>
								<input name = "geoSpecLoc1" ng-model = "data.geoSpecLoc1" upper-input  type="text" class="two_input"
										 geo-max-length = "data.geoSpecLoc1Type"  ng-disabled="!editStatus.geoSpecLoc1" 
										 ng-required ="data.geoSpecLoc1Type!=''" geo="geoSpecLoc1Type" placeholder="代码"/>
								<link-table ng-if="data.geoSpecLoc1Type==''" tbname="list178Loc1" list="data.list178Loc1" strtip="自定义区域"></link-table>
								<oc-complete ng-hide="data.geoSpecLoc1Type!=''||data.statusDes=='3'" tbname="list178Loc1"></oc-complete>
								<span ng-messages="myForm.geoSpecLoc1.$error" >
                                    <span class="errorInfo_validate" ng-message="required">区域不能为空!</span>
                                    <span class="errorInfo_validate" ng-message="areacode">请输入正确的大区代码!</span>
                                    <span class="errorInfo_validate" ng-message="citycode">请输入正确的城市三字码!</span>
                                    <span class="errorInfo_validate" ng-message="countrycode">请输入正确的国家二字码!</span>
                                    <span class="errorInfo_validate" ng-message="airportcode">请输入正确的机场三字码!</span>
                                    <span class="errorInfo_validate" ng-message="statecode">请输入正确的州二字码!</span>
                                    <span class="errorInfo_validate" ng-message="zonecode">请输入正确的区域代码!</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.list178Loc1.showFlag" >
						    <label class="col-sm-1_5 input_title"></label>
						    <div class="col-sm-9">
						    	<div class = "table_layout" style ="width:460px" ng-show="tableStatus.list178Loc1">
							    	<table-info   html-url = "tb178geo1.html" tbname="list178Loc1" 
							    		table-data="tableData.list178Loc1"  list="data.list178Loc1" >
									</table-info>
								</div>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.geoSpecLoc2AndType.showFlag" >
						    <label class="col-sm-1_5 input_title">区域2</label>
						    <div class="col-sm-9">
								<select name="geoSpecLoc2Type"  ng-model="data.geoSpecLoc2Type" ng-change="selectChangeGeoSpecLoc2()"
									ng-options="b.value as b.name for b in geoLocTypeList" class="two_input"
									ng-disabled="data.list178Loc2.length>0||tableStatus.list178Loc2||!editStatus.geoSpecLoc2Type">
								</select>
								<input name ="geoSpecLoc2" ng-model = "data.geoSpecLoc2" upper-input ng-disabled="!editStatus.geoSpecLoc2" 
										type="text" geo-max-length = "data.geoSpecLoc2Type"  class="two_input" placeholder="代码"
										 geo="geoSpecLoc2Type" />
								<span ng-messages="myForm.geoSpecLoc2.$error" >
                                    <span class="errorInfo_validate" ng-message="required">区域不能为空!</span>
                                    <span class="errorInfo_validate" ng-message="areacode">请输入正确的大区代码!</span>
                                    <span class="errorInfo_validate" ng-message="citycode">请输入正确的城市三字码!</span>
                                    <span class="errorInfo_validate" ng-message="countrycode">请输入正确的国家二字码!</span>
                                    <span class="errorInfo_validate" ng-message="airportcode">请输入正确的机场三字码!</span>
                                    <span class="errorInfo_validate" ng-message="statecode">请输入正确的州二字码!</span>
                                    <span class="errorInfo_validate" ng-message="zonecode">请输入正确的区域代码!</span>
                                </span>
								<link-table ng-if = "data.geoSpecLoc2Type==''" tbname = "list178Loc2" list = "data.list178Loc2" strtip="自定义区域"></link-table>
								<oc-complete ng-hide="data.geoSpecLoc2Type!=''||data.statusDes=='3'" tbname="list178Loc2"></oc-complete>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.list178Loc2.showFlag" >
						    <label class="col-sm-1_5 input_title"></label>
						    <div class="col-sm-9">
						    	<div class = "table_layout" style ="width:460px" ng-show="tableStatus.list178Loc2" >
							    	<table-info html-url="tb178geo2.html" tbname="list178Loc2" 
							    		table-data="tableData.list178Loc2" list="data.list178Loc2">
									</table-info>
								</div>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.geoSpecLoc3AndType.showFlag" >
						    <label class="col-sm-1_5 input_title">经过区域</label>
						    <div class="col-sm-9">
						    	<select name="geoSpecLoc3Type" ng-model="data.geoSpecLoc3Type" ng-change="selectChangeGeoSpecLoc3()"
									ng-options="b.value as b.name for b in geoLocTypeList"  class="two_input"
									ng-disabled="data.list178Loc3.length>0||tableStatus.list178Loc3||!editStatus.geoSpecLoc3Type">
								</select>
								<input name="geoSpecLoc3" ng-model = "data.geoSpecLoc3" upper-input="" ng-disabled="!editStatus.geoSpecLoc3"
									 class="two_input" geo-max-length="data.geoSpecLoc3Type" placeholder="代码"  type="text"
									 geo="geoSpecLoc3Type"/>
								<span ng-messages="myForm.geoSpecLoc3.$error" >
                                    <span class="errorInfo_validate" ng-message="required">区域不能为空!</span>
                                    <span class="errorInfo_validate" ng-message="areacode">请输入正确的大区代码!</span>
                                    <span class="errorInfo_validate" ng-message="citycode">请输入正确的城市三字码!</span>
                                    <span class="errorInfo_validate" ng-message="countrycode">请输入正确的国家二字码!</span>
                                    <span class="errorInfo_validate" ng-message="airportcode">请输入正确的机场三字码!</span>
                                    <span class="errorInfo_validate" ng-message="statecode">请输入正确的州二字码!</span>
                                    <span class="errorInfo_validate" ng-message="zonecode">请输入正确的区域代码!</span>
                                </span>
								<link-table ng-if="data.geoSpecLoc3Type==''" tbname="list178Loc3" list="data.list178Loc3" strtip="自定义区域"></link-table>
								<oc-complete ng-hide="data.geoSpecLoc3Type!=''||data.statusDes=='3'" tbname="list178Loc3"></oc-complete>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.list178Loc3.showFlag" >
						    <label class="col-sm-1_5 input_title"></label>
						    <div class="col-sm-9">
						    	<div class = "table_layout" style ="width:460px" ng-show="tableStatus.list178Loc3">
							    	<table-info   html-url="tb178geo3.html" tbname="list178Loc3" 
							    		table-data="tableData.list178Loc3"  list="data.list178Loc3" >
									</table-info>
								</div>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.mileageMinAndMaximum.showFlag" >
						    <label class="col-sm-1_5 input_title">里程范围</label>
						    <div class="col-sm-9">
						    	<input type = "text" ng-model = "data.mileageMinimum" maxLength = "6" ng-disabled="!editStatus.mileageMinimum"
									class ="rangeInput"  name="mileageMinimum"  nnint ="" smaller ="{{data.mileageMaximum}}" id="mileageMinimum"/>
									  <i class="icon iconfont icon-xiangyou"></i><!--rangeInput-->
								<input type = "text" ng-model = "data.mileageMaximum" maxLength = "6" ng-disabled="!editStatus.mileageMaximum"
									class ="rangeInput" name="mileageMaximum" nnint ="" bigger ="{{data.mileageMinimum}}" id ="mileageMaximum"/>
								<span ng-messages="myForm.mileageMinimum.$error">
                                    <span class="errorInfo_validate" ng-message="nnint">请输入非负整数！</span>
                                     <span class="errorInfo_validate" ng-message="smaller">里程最小数不能大于最大值！</span>
                                </span>
                                <span ng-messages="myForm.mileageMaximum.$error" >
                                    <span class="errorInfo_validate" ng-message="nnint">请输入非负整数！</span>
                                     <span class="errorInfo_validate" ng-message="bigger">里程最大值不能小于最小值！</span>
                                </span>
							</div>
						</div>
						<div class="row row_from" ng-show= "showStatus.indicatorInterline.showFlag" >
						    <label class="col-sm-1_5 input_title">是否联程</label>
						    <div class="col-sm-9">
						    	<input ng-model="data.indicatorInterline" name ="indicatorInterline"  
									ng-disabled="!editStatus.indicatorInterline" type="radio" value="Y" />
								<span class="paddingLR5">是</span>
								<input ng-model="data.indicatorInterline" name ="indicatorInterline"  
									ng-disabled="!editStatus.indicatorInterline" type="radio" value="N" />
								<span>否</span>
						    </div>
						</div>
					</div><!--航程 block end-->
				</div><!--航程 end -->
				<!--航班 start-->
				<div class="row block_box">
					<div class="col-sm-1"><h4>航班</h4></div>
					<div class="col-sm-10 block_edit2">
						<div class="row row_from" ng-show= "showStatus.travelStartDate.showFlag" >
						    <label class="col-sm-1_5 input_title">旅行开始日期</label>
						    <div class="col-sm-9">
						    	<input ng-model="data.travelStartDate" ng-disabled="!editStatus.travelStartDate"
						    		name="travelStartDate" id ="travelStartDate" dateoc="" sd ="{{data.travelEndDate}}" class="normal_input" 
									datepicker="{{nextDateStr}}"  type="text" class="normal_input" readonly="readonly" />
								<label for="travelStartDate" class ="datebox icon iconfont icon-riqi"></label>
								<span ng-messages="myForm.travelStartDate.$error">
                                    <span class="errorInfo_validate" ng-message="sd">旅行开始日期必须小于截止日期!</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.travelEndDate.showFlag" >
						    <label class="col-sm-1_5 input_title">旅行结束日期</label>
						    <div class="col-sm-9">
						    	<input ng-model="data.travelEndDate" name="travelEndDate" id="travelEndDate" type="text" datepicker="{{nextDateStr}}" 
						    		 ng-disabled="!editStatus.travelEndDate" bd="{{data.travelStartDate}}" class="normal_input" readonly="readonly"/>
						    	<label for="travelEndDate" class ="datebox icon iconfont icon-riqi"></label>
						    	<span ng-messages="myForm.travelEndDate.$error">
                                    <span class="errorInfo_validate" ng-message="bd">旅行结束日期必须大于开始日期!</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.startTime.showFlag" >
						    <label class="col-sm-1_5 input_title">开始时刻</label>
						    <div class="col-sm-9">
						    	<input timepicker ="" name="startTime" id ="startTime" ng-required ="data.stopTime.length>0" 
						    		ng-disabled="!editStatus.startTime"  ng-model = "data.startTime" 
						    		type="text" readonly="readonly" class="normal_input" />
						    	<span ng-messages="myForm.startTime.$error">
                                    <span class="errorInfo_validate" ng-message="required">本字段不能为空!</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.stopTime.showFlag" >
						    <label class="col-sm-1_5 input_title">结束时刻</label>
						    <div class="col-sm-9">
						    	<input timepicker ="" name="stopTime" id ="stopTime" ng-required ="data.startTime.length>0" 
						    		readonly="readonly" type="text" class="normal_input" 
						    		ng-model = "data.stopTime" ng-disabled="!editStatus.stopTime"  />
						    	<span ng-messages="myForm.stopTime.$error">
                                    <span class="errorInfo_validate" ng-message="required">本字段不能为空!</span>
                                </span>
						    </div>
						</div>
						 <div class="row row_from" ng-show= "showStatus.timeApplication.showFlag" >
						    <label class="col-sm-1_5 input_title">应用范围</label>
						    <div class="col-sm-9">
						    	<select ng-model="data.timeApplication"  ng-disabled="!editStatus.timeApplication" 
									ng-options="d.value as d.name for d in timeApplicationList" class = "select_width" >
								</select>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.dayOfWeek.showFlag" >
						    <label class="col-sm-1_5 input_title">星期</label>
						    <div class="col-sm-9">
						    	<input name = "dayOfWeek" ng-model = "data.dayOfWeekShow.w1"  ng-disabled="!editStatus.dayOfWeek" type="checkbox" />
								<span  class="paddingLR5">星期一</span>
								<input name = "dayOfWeek"  ng-model = "data.dayOfWeekShow.w2" ng-disabled="!editStatus.dayOfWeek" type="checkbox"/>
								<span  class="paddingLR5">星期二</span>
								<input name = "dayOfWeek"  ng-model = "data.dayOfWeekShow.w3" ng-disabled="!editStatus.dayOfWeek" type="checkbox"/>
								<span class="paddingLR5">星期三</span>
								<input name = "dayOfWeek"  ng-model = "data.dayOfWeekShow.w4" ng-disabled="!editStatus.dayOfWeek" type="checkbox"/>
								<span class="paddingLR5">星期四</span>
								<input name = "dayOfWeek" ng-model = "data.dayOfWeekShow.w5"  ng-disabled="!editStatus.dayOfWeek" type="checkbox"/>
								<span class="paddingLR5">星期五</span>
								<input name = "dayOfWeek" ng-model = "data.dayOfWeekShow.w6"  ng-disabled="!editStatus.dayOfWeek" type="checkbox" />
								<span class="paddingLR5">星期六</span>
								<input name = "dayOfWeek"  ng-model = "data.dayOfWeekShow.w7" ng-disabled="!editStatus.dayOfWeek" type="checkbox"/>
								<span class="paddingLR5">星期日</span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.equipmentAndlist165.showFlag" >
						    <label class="col-sm-1_5 input_title">机型</label>
						    <div class="col-sm-9">
						    	<select ng-model="data.equipment"  class = "select_width"  
						    	    ng-disabled="data.list165VO>0||tableStatus.list165VO||!editStatus.equipment"
									ng-options="d.code as d.description for d in equipmentList">
								</select>&nbsp; &nbsp;
								<link-table list="data.list165VO" tbname="list165VO" strtip="自定义机型" 
								ng-hide="data.equipment!=''||data.statusDes=='3'" ></link-table>
								<oc-complete ng-hide="data.equipment!=''||data.statusDes=='3'" tbname="list165VO"></oc-complete>
								<div class = "table_layout" style ="width:150px" ng-show="tableStatus.list165VO">
									<table-info list="data.list165VO" table-data="tableData.list165VO" 
										html-url="tb165.html" tbname="list165VO">
									</table-info>
								</div>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.list186VO.showFlag" >
						    <label class="col-sm-1_5 input_title">航班号</label>
						    <div class="col-sm-9">
						    	<show-hide-table tname="list186VO"></show-hide-table>
						    	<oc-complete ng-hide="data.statusDes=='3'" tbname="list186VO"></oc-complete>
						    	<div class = "table_layout" style ="width:450px" ng-show="tableStatus.list186VO">
									<table-info table-data="tableData.list186VO"  
										list="data.list186VO" html-url="tb186.html" tbname="list186VO">
									</table-info>
								</div>
						    </div>
						</div>
						<div class="row row_from"  >
						    <label class="col-sm-1_5 input_title">舱位等级</label>
						    <div class="col-sm-9">
						    	<select ng-model="data.cabin" class="select_width" ng-disabled="!editStatus.cabin"
									ng-options="o.value as o.name for o in cabinList">
								</select>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.list198VO.showFlag" >
						    <label class="col-sm-1_5 input_title">订座属性表</label>
						    <div class="col-sm-9">
						    	<show-hide-table tname="list198VO"></show-hide-table>
						    	<oc-complete  tbname="list198VO" ng-hide ="data.statusDes=='3'"></oc-complete>
						    	<div class = "table_layout" style ="width:600px" ng-show="tableStatus.list198VO">
									<table-info  table-data = "tableData.list198VO"  
											list = "data.list198VO" html-url = "tb198.html" tbname="list198VO">
									</table-info>
								</div>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.upgradeToCabin.showFlag" >
						    <label class="col-sm-1_5 input_title">升舱到的服务等级</label>
						    <div class="col-sm-9">
						    	<select name ="upgradeToCabin" ng-model="data.upgradeToCabin" class="select_width" 
						    		ng-required ="data.sel1.value=='UP'||data.sel1.value=='BDUP'"
									ng-disabled="!editStatus.upgradeToCabin" >
									 <option value="">选择</option>
									 <option bindonce ng-repeat="l in cabinList" ng-selected="data.upgradeToCabin==l.value" 
									 	     bo-value="l.value" bo-bind="l.name">
									</option>  
								</select>
								<span ng-messages="myForm.upgradeToCabin.$error">
                                    <span class="errorInfo_validate" ng-message="required">必填字段。</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.list198UpgradeVO.showFlag&&data.sel3.value!=''" >
						    <label class="col-sm-1_5 input_title">
						    	<span ng-show="data.sel1.value=='SA'||data.sel1.value=='BDSA'">座位属性表</span>
						    	<span ng-show="data.sel1.value=='UP'||data.sel1.value=='BDUP'">升舱属性表</span></label>
						    <div class="col-sm-9">
						    	<show-hide-table tname="list198UpgradeVO"></show-hide-table>
						    	<oc-complete  tbname="list198UpgradeVO" ng-hide ="data.statusDes=='3'"></oc-complete>
								<div class = "table_layout" style ="width:660px" ng-show="tableStatus.list198UpgradeVO">
									<table-info tbname="list198UpgradeVO" table-data = "tableData.list198UpgradeVO" 
										 list = "data.list198UpgradeVO" html-url="tb198UpGrade.html">
									</table-info>
								</div>
						    </div>
						</div>
					</div><!--航班block end-->
				</div><!--航班 end-->
				<!--购买 start -->
				<div class="row block_box" ng-show="data.serviceType!='A'&&data.serviceType!='B'&&data.serviceType!='E'">
					<div class="col-sm-1"><h4>购买</h4></div>
					<div class="col-sm-10 block_edit2">
						 <div class="row row_from" ng-show= "showStatus.advancedPurchasePeriodAndUnit.showFlag" >
						    <label class="col-sm-1_5 input_title">提前购票时间</label>
						    <div class="col-sm-9">
						    	<input name = "advancedPurchasePeriod" ng-model="data.advancedPurchasePeriod" 
						    		ng-disabled="!editStatus.advancedPurchasePeriod" nnint =""
						    		class="two_input" maxLength = "3" type="text"/>
								<select name="advancedPurchaseUnit" ng-model="data.advancedPurchaseUnit" ng-disabled="!editStatus.advancedPurchaseUnit" 
										ng-options="d.value as d.name for d in advancedPurchasePeriodList" class="two_input" 
										ng-required ="data.advancedPurchasePeriod!=''" >
										<option value="">选择</option>
								</select>
								<span ng-messages="myForm.advancedPurchasePeriod.$error">
                                    <span class="errorInfo_validate" ng-message="nnint">请输入非负整数。</span>
                                </span>
                                <span ng-messages="myForm.advancedPurchaseUnit.$error">
                                    <span class="errorInfo_validate" ng-message="required">单位不能为空。</span>
                                </span>
						    </div>
						</div>
					</div>
				</div><!--购买 end -->
				
				<!-- 兑换start -->
				<div class="row block_box" ng-show="data.basicInfoVo.subGroup=='FP'">
					<div class="col-sm-1"><h4>兑换</h4></div>
					<div class="col-sm-10 block_edit2">
						<div class="row row_from" >
						    <label class="col-sm-1_5 input_title">允许兑换的服务</label>
						    <div class="col-sm-9">航班</div>
						</div>
						<div class="row row_from" >
						    <label class="col-sm-1 input_title">兑换信息</label>
						    <div class="col-sm-10">
						    	<show-hide-table tname="listTsk202VO"></show-hide-table>
						    	<oc-complete  tbname="listTsk202VO" ng-hide ="data.statusDes=='3'"></oc-complete>
						    	<div class = "table_layout" style="width:900px;" ng-show="tableStatus.listTsk202VO">
						    	   <div class ="pull-right"><strong>TourCode/签注附加规则 :</strong> &nbsp;0=无附加规则;1=附加EMD票号;2=附加套票数和共享人数</div>
						    	   <table-info table-data="tableData.listTsk202VO" tbname="listTsk202VO" 
									   list = "data.listTsk202VO" html-url="tbTSK202.html" >
								   </table-info>
								</div>
						    </div>
						</div>
					</div>
				</div><!-- 兑换end -->
				
				<!--票价开始-->
				<div class="row block_box">
					<div class="col-sm-1"><h4>票价</h4></div>
					<div class="col-sm-10 block_edit2">
						<div class="row row_from" ng-show= "showStatus.tourCode.showFlag" >
						    <label class="col-sm-1_5 input_title">旅行编码</label>
						    <div class="col-sm-9">
						    	<input type = "text" ng-model = "data.tourCode" name ="tourCode" ng-disabled="!editStatus.tourCode" 
								 class = "normal_input" lorn ="" placeholder="" maxLength = "15" />
								 <span ng-messages="myForm.tourCode.$error">
                                    <span class="errorInfo_validate" ng-message="lorn">请输入字母、数字。</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.list173TicketVO.showFlag" >
						    <label class="col-sm-1_5 input_title">TICKET DESIGNATOR</label>
						    <div class="col-sm-9">
						    	<show-hide-table tname="list173TicketVO"></show-hide-table>
						    	<oc-complete  tbname="list173TicketVO" ng-hide ="data.statusDes=='3'"></oc-complete>
						    	<div class = "table_layout" style="width:150px;"  ng-show="tableStatus.list173TicketVO">
									<table-info table-data="tableData.list173TicketVO" tbname="list173TicketVO"
										 list = "data.list173TicketVO" html-url="tb173Ticket.html" >
									</table-info>
								</div>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.tariff.showFlag" >
						    <label class="col-sm-1_5 input_title">TARIFF NO.</label>
						    <div class="col-sm-9">
						    	<input type = "text" ng-model = "data.tariff" maxLength = "3"  ng-disabled="!editStatus.tariff" 
						    	class = "normal_input" lorn ="" name ="tariff"/>
						    	<span ng-messages="myForm.tariff.$error">
                                    <span class="errorInfo_validate" ng-message="lorn">请输入字母、数字。</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.rule.showFlag" >
						    <label class="col-sm-1_5 input_title">RULE NO.</label>
						    <div class="col-sm-9">
						    	<input type = "text" ng-model = "data.rule" maxLength = "4"  ng-disabled="!editStatus.rule"
						    	 class = "normal_input" name ="rule" />
						    	<span ng-messages="myForm.rule.$error">
                                    <span class="errorInfo_validate" ng-message="lorn">请输入字母、数字。</span>
                                </span>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.list173TktVO.showFlag" >
						    <label class="col-sm-1_5 input_title">RESULTING TICKET DESIGNATOR</label>
						    <div class="col-sm-9">
						    	<show-hide-table tname="list173TktVO"></show-hide-table>
						    	<oc-complete  tbname="list173TktVO" ng-hide ="data.statusDes=='3'"></oc-complete>
						    	<div class = "table_layout" style ="width:150px" ng-show="tableStatus.list173TktVO">
									<table-info  table-data = "tableData.list173TktVO" tbname="list173TktVO"
										list = "data.list173TktVO" html-url = "tb173Tkt.html" >
									</table-info>
						    	</div>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.list171VO.showFlag" >
						    <label class="col-sm-1_5 input_title">客票舱位等级表</label>
						    <div class="col-sm-9">
						    	<show-hide-table tname="list171VO"></show-hide-table>
						    	<oc-complete  tbname="list171VO" ng-hide ="data.statusDes=='3'"></oc-complete>
						    	<div class = "table_layout" style ="width:450px" ng-show="tableStatus.list171VO">
									<table-info  table-data="tableData.list171VO" tbname="list171VO" 
										 list = "data.list171VO" html-url = "tb171.html">
									</table-info>
								</div>
						    </div>
						</div>
					</div><!--票价block end-->
				</div><!--票价 end-->
				<!-- 票证start -->
				<div class="row block_box" ng-show = "data.serviceType=='F'||data.serviceType=='R'||data.serviceType=='T'||data.serviceType=='P'">
					<div class="col-sm-1"><h4>票证</h4></div>
					<div class="col-sm-10 block_edit2">
						<div class="row row_from" ng-show= "showStatus.advancedPurchaseTktIssue.showFlag" >
						    <label class="col-sm-1_5 input_title">与机票同时出票</label>
						    <div class="col-sm-9">
						    	<input ng-model="data.advancedPurchaseTktIssue" name ="advancedPurchaseTktIssue" 
									ng-disabled="!editStatus.advancedPurchaseTktIssue"  type="radio" value="" />
								<span class="paddingLR5">是</span>
								<input ng-model="data.advancedPurchaseTktIssue" name ="advancedPurchaseTktIssue"  
									ng-disabled="!editStatus.advancedPurchaseTktIssue"  type="radio" value="X" />否
						    </div>
						</div>
					</div><!-- 票证 block end -->
				</div><!-- 票证 end -->
				<!-- 退款start -->
				<div class="row block_box">
					<div class="col-sm-1"><h4>退款</h4></div>
					<div class="col-sm-10 block_edit2">
						<div class="row row_from" ng-show= "showStatus.indicatorReissueRefund.showFlag" >
						    <label class="col-sm-1_5 input_title">
						    	是否可退
						    </label>
						    <div class="col-sm-9">
						    	<select ng-model="data.indicatorReissueRefund"  class = "select_width" 
						    		ng-disabled="!editStatus.indicatorReissueRefund" name="indicatorReissueRefund"
									ng-options="d.value as d.name for d in indicatorReissueRefundList" >
									<option value="">选择</option>
								</select>
						    </div>
						</div>
						<div class="row row_from" ng-show= "showStatus.formOfRefund.showFlag" >
						    <label class="col-sm-1_5 input_title">退款形式</label>
						    <div class="col-sm-9">
						    	<select ng-model="data.formOfRefund"  class = "select_width" ng-disabled="!editStatus.formOfRefund"
									ng-options="d.value as d.name for d in formOfRefundList" >
								</select>
						    </div>
						</div>
						 
					</div><!-- 退款block end -->
				</div><!-- 退款 end -->
				</div>
			</div><!-- force end -->
	</form>
	</div> <!-- edit main box end -->
</div><!-- edit controller end -->
</body>
<!--js lib --><!--jquery validte 校验lib引入-->
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/tui/scripts/jquery.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/components/moment/moment.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/scripts/sea-modules/jquery/validate/jquery.metadata.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/scripts/sea-modules/jquery/validate/jquery.validate.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/scripts/sea-modules/jquery/validate/messages_zh.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/scripts/sea-modules/jquery/validate/additional-methods.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/scripts/sea-modules/angular/angularjs/1.4.3/angular.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/scripts/sea-modules/angular/bindonce/bindonce.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/components/autocomplete/jquery.autocomplete.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/scripts/sea-modules/angular/messages/angular-messages.js"></script>
<!-- 
<script src="${pageContext.request.contextPath}/resources/oc/scripts/sea-modules/seajs/seajs/2.1.1/sea.js"></script>
<script src="${pageContext.request.contextPath}/resources/oc/scripts/config/config.js"></script> 
 -->
 <script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/dist/edit/main.71c85eb1802acff87050.js"></script>
</html>
