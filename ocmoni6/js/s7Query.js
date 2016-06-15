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

}) ;