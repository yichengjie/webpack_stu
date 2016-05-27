/**
 * Created by Administrator on 2016/5/27.
 */
$(function(){
    $('.query_mask').click(function (e) {
        $(".query_section").animate({left:'-350px'});
        $(".query_handle").show('slow') ;
        $(".query_mask").css({display:'none'}) ;
        e.stopPropagation() ;
    }) ;

    $('.query_handle').click(function (e) {
        $(".query_section").animate({left:'0px'});
        $(".query_handle").hide() ;
        $(".query_mask").css({display:'block'}) ;
        e.stopPropagation() ;
    }) ;
}) ;

