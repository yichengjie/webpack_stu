/**
 * Created by Administrator on 2016/5/27.
 */
$(function(){
    //$("#moreQuerySection").hide() ;
    $("#showHideMoreQuerySectionBtn").click(function(){
        $("#moreQuerySection").slideToggle() ;
    }) ;
    $('.datepicker').datepicker({minDate:new Date(), showButtonPanel:true});



    $(".dropdown-oc").find(".dropdown-trigger").click(function (e) {
        e.stopPropagation() ;
        $(".dropdown-menu-oc").removeClass('open') ;
        $(this).parents(".dropdown-oc").find(".dropdown-menu-oc").toggleClass('open') ;
    }) ;

    $(document).click(function(e){
        e.stopPropagation() ;
        $('.dropdown-menu-oc').removeClass('open') ;
    }) ;



    function loading(){
        $.isLoading({
            'text': "加载中..." ,
            'class': "text-success glyphicon glyphicon-refresh",    // loader CSS class
            'tpl': '<span class="isloading-wrapper %wrapper%">%text%<i class="%class% icon-spin marginL5"></i></span>'
        });
    }
    function hide(){
        $.isLoading( "hide" );
    }
    $('#queryBtn').click(function () {
        loading() ;
        setTimeout(hide,1500) ;
    }) ;

    //初始化headroom插件
    $('#myheader').headroom();

    initQueryPage() ;

    //checkAll
    $(document).delegate(':checkbox[name=checkAll]','click',function(e){
        var cflag = $(this).prop('checked') ;
        $(this).parents('.s7list_panel').find(':checkbox[name=item_checkbox]').prop('checked',cflag) ;
    }) ;


    $(document).delegate(':checkbox[name=item_checkbox]','click',function(e){
        //判断是不是所有的item都选中，如果全部选中，则选中全选checkbox，否则不选中全选checkbox
        var len1 = $(this).parents('.s7list_panel').find(':checkbox[name=item_checkbox]').length ;
        var len2 = $(this).parents('.s7list_panel').find(':checkbox[name=item_checkbox]:checked').length ;
        if(len1!=len2){
            $(this).parents('.s7list_panel').find(':checkbox[name=checkAll]').prop('checked',false) ;
        }else{
            $(this).parents('.s7list_panel').find(':checkbox[name=checkAll]').prop('checked',true) ;
        }
    }) ;

    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){ // enter 键
            console.info('触发查询按钮的click事件，进行查询') ;
        }
    };

}) ;



function initQueryPage(){
    var htmlStr = $("#mytemplate").html() ;
    for(var i = 0 ;i < 30 ; i++){
        $('#list_s7_container').append(htmlStr) ;
    }
}


function toAddUI(){
    window.location.href = "s7Edit.html" ;
}