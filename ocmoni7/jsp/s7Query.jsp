<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.lang.Exception;"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>s7编译页面</title>
    <jsp:include page="/WEB-INF/pages/oc/oc_common.jsp"></jsp:include>
</head>
<body>

<div class="navbar-fixed-top">
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-9" aria-expanded="false">
                    <span class="sr-only">导航菜单</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Brand</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">附加服务</a></li>
                    <li><a href="#">数据源配置</a></li>
                    <li><a href="#">里程积分兑换</a></li>
                    <li><a href="#">运价校验</a></li>
                    <li><a href="#">批量导入</a></li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>

    <!--query section start-->
    <div class ="query_section">
        <form id="s7QueryForm" class="form-inline">
            <input id="tag_ctx" type="hidden" value="${pageContext.request.contextPath}" name="tag_ctx"/>
            <input id="carrCode" name="carrCode" type="hidden" value ="${sessionScope.carrCode}" />
            <input id="tokenId" type="hidden" value="" name="tokenId"/>
            <input type ="hidden" id ="contextPath" value="${pageContext.request.contextPath}"/>
            <!--query row1 start-->
            <div class="query_row">
                <span class="query_title">基础信息</span>
                <div class="form-group">
                    <div class="checkbox">
                        <input id ="releaseStatus01" name="status" type="checkbox"><label for="releaseStatus01">未发布</label>
                    </div>
                    <div class="checkbox">
                        <input id ="releaseStatus02" name ="status" type="checkbox"><label for="releaseStatus02">已发布</label>
                    </div>

                    <div class="checkbox">
                        <input  id ="effectStatus01" name="effStatus" type="checkbox"><label for="effectStatus01"> 未生效</label>
                    </div>
                    <div class="checkbox">
                        <input  id ="effectStatus02" name ="effStatus" type="checkbox"> <label for="effectStatus02">已生效</label>
                    </div>
                    <div class="checkbox">
                        <input  id ="effectStatus03" name ="effStatus" type="checkbox"> <label for="effectStatus03">已过期</label>
                    </div>
                </div>
                <span class="marginR15"></span>
                <div class="form-group">
                    <label  class="marginR5">服务</label>
                    <select id="server" class="form-control">
                        <option value="001">商务名称</option>
                        <option value="002">子代码</option>
                    </select>
                    <input type="text" id="service" name="service" class="form-control input-sm" style="width: 100px">
                </div>
                <div class="form-group">
                    <label class="marginR5">销售日期</label>
                    <input type="text" id="effectMinDate" name="effectMinDate"
                           class="form-control input-sm datepicker"  placeholder="起始日期" style="width: 100px">
                    <label for="effectMinDate" class="glyphicon glyphicon-th iconfont_box"></label>
                    <span class="marginL15"></span>
                    <input type="text" id="effectMaxDate" name="effectMaxDate"
                           class="form-control input-sm datepicker"  placeholder="结束日期" style="width: 100px">
                    <label for="effectMaxDate" class="glyphicon glyphicon-th iconfont_box"></label>
                </div>

                <div class="checkbox marginLR15">
                    <input  id ="moreInputBtn" type="checkbox"> <label for="moreInputBtn">更多条件</label>
                </div>
                <button type="submit" id="s7QueryBtn" url="${pageContext.request.contextPath}/s7/s7Query.action"
                        class="btn btn-default btn-sm btn-primary">查询</button>
            </div>
            <!--query row1 end-->

            <!--moreQuerySection start-->
            <div id ="srchInfoMore" style="display: none;" >
                <!--query row2 start-->
                <div class="query_row">
                    <span class="query_title">服务等级&nbsp;|&nbsp;机型</span>
                    <div class="form-group">
                        <div class="checkbox">
                            <input id ="cabinType04" value="R" name="name" type="checkbox"><label for="cabinType04">豪华头等舱</label>
                        </div>
                        <div class="checkbox">
                            <input id ="cabinType01" value="F" name="name" type="checkbox"><label for="cabinType01">头等舱</label>
                        </div>

                        <div class="checkbox">
                            <input  id ="cabinType05" value="J" name="name" type="checkbox"><label for="cabinType05"> 豪华商务舱</label>
                        </div>
                        <div class="checkbox">
                            <input  id ="cabinType02" value="C" name="name" type="checkbox"> <label for="cabinType02">商务舱</label>
                        </div>
                        <div class="checkbox">
                            <input  id ="cabinType06" value="P" name="name" type="checkbox"> <label for="cabinType06">豪华经济舱</label>
                        </div>
                        <div class="checkbox">
                            <input  id ="cabinType03" value="Y" name="name" type="checkbox"> <label for="cabinType03">经济舱</label>
                        </div>
                    </div>
                    <span class="marginR15"></span>
                    <div class="form-group">
                        <label   class="marginR5">机型</label>
                        <select id="s7_F_equipment" class="form-control" url="${pageContext.request.contextPath}/equipment/query.action" style="width: 100px">
                            <option value="">选择</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="marginR5">优先级序号</label>
                        <input type="text" id="sequenceNumber" name="sequenceNumber" maxlength="7" class="form-control input-sm"  style="width: 100px">
                    </div>
                </div>
                <!--query row2 end-->
                <!--query row3 start-->
                <div class="query_row">
                    <span class="query_title">地理位置</span>
                    <div class="form-group">
                        <label   class="marginR5">区域1</label>
                        <input type="text" id="geoSpecLoc1" name="geoSpecLoc1" mode="upper" maxlength="3"  class="form-control input-sm" style="width: 100px">
                    </div>
                    <div class="form-group">
                        <label class="marginR5">区域2</label>
                        <input type="text" id="geoSpecLoc2" name="geoSpecLoc2" mode="upper" maxlength="3"  class="form-control input-sm" style="width: 100px">
                    </div>
                    <div class="form-group">
                        <label class="marginR5">经过区域</label>
                        <input type="text" id="geoSpecLoc3" name="geoSpecLoc3" mode="upper" maxlength="3"  class="form-control input-sm" style="width: 100px">
                    </div>
                </div>
                <!--query row3 end-->
            </div>
            <!--moreQuerySection end-->
        </form>
    </div>
    <!--query section end-->
</div>
<!--navgation is end-->


<!--main content start-->
<div class="container-fluid main_content" >
    <div class="pull-right clearfix" style="margin-bottom: 8px">
        <button class="btn btn-success btn-sm" onclick="location.href='${pageContext.request.contextPath}/oc/toAddS7UI.action'">新建</button>
        <button class="btn btn-default btn-sm" id="copyRecord7Btn">复制</button>
        <button class="btn btn-default btn-sm" id="s7_publish" url="${pageContext.request.contextPath}/s7/s7publish.action">发布</button>
        <button class="btn btn-default btn-sm" id = "abortBtn">截止</button>
        <div class ="dropdown-oc">
            <div class="btn-group">
                <button class="btn btn-default btn-sm">批量导入</button>
                <button class="btn btn-default btn-sm dropdown-trigger"><i class="glyphicon glyphicon-triangle-bottom"></i></button>
            </div>
            <ul class ="dropdown-menu-oc">
                <li onclick="location.href='${pageContext.request.contextPath}/ocimport/download.action'">下载模板</li>
            </ul>
        </div>
    </div>
    <span class="clearfix"></span>

    <!--s7显示主区域-->
    <div id="s7list_container">


    </div>
</div>
<!--main content end-->

<!-- 批量截止【 模态框 】start-->
<div class="modal fade" id ="abortModal">
    <div class="modal-dialog" style = "width:400px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">批量截止操作</h4>
            </div>
            <div class="modal-body">
                <div class ="row">
                    <label class="col-sm-2"><span class="marginRight15"></span>截止日期</label>
                    <div class="col-sm-6">
                        <input type="text" class="input_normal" tabindex="3"  id="lastMaintenanceDate"
                               name="lastMaintenanceDate"  readonly="readonly"/>
                        <label class="datebox icon iconfont icon-riqi"  for="lastMaintenanceDate"></label>
                    </div>
                </div>
                <br />
                <div>
                    <ul id ="abortTipInfo"></ul>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" id ="abortModalConfirm"
                        url ="${pageContext.request.contextPath}/s7/batchObortR7.action">确定</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- 批量截止【 模态框 】end-->


<!-- 批量导入 modal start -->
<div class="modal fade" id ="batchImportModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">批量导入操作</h4>
            </div>
            <div class="modal-body">
                <div class ="row">
                    <div class ="col-sm-1">
                    </div>
                    <div class ="col-sm-10">
                        <p>文件&nbsp;:&nbsp;<span id ="batchImportFileName"></span></p>
                    </div>
                </div>
                <br/>
                <div class ="row">
                    <div class ="col-sm-1">

                    </div>
                    <div class ="col-sm-10">
                        <ul id ="batchImportTipInfo"></ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" id ="submitBatchImportFormBtn">导入</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- 批量导入 modal end -->
<form method="post"  enctype="multipart/form-data" id ="batchImportForm">
    <input type="file" name ="file" id ="batchImportFileInput" style="display: none"/>
</form>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/components/jquery/jquery.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/oc/dist/s7Query.js"></script>
</body>
</html>