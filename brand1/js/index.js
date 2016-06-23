/**
 * Created by Administrator on 2016/6/16.
 */
$(function(){
    //初始化headroom插件
    //$('#myheader').headroom();
    //.collapse('toggle')
    $(document).delegate('.brand_title .changeDownUpArrow','click',function(){
        //$(this).parents('.panel').find('.panel-body').collapse('toggle');
        //$(this).parents('.panel').find('.panel-body').toggle(300) ;
        $(this).parents('.panel').find('.panel-body').toggleClass('hidden') ;
        var isHidden = $(this).parents('.panel').find('.panel-body').hasClass('hidden') ;
        var showHideBtn = $(this).find('[data-name=showHideBody]');
        showHideBtn.removeClass('glyphicon-download') ;
        showHideBtn.removeClass('glyphicon-upload') ;
        if(isHidden){
            showHideBtn.addClass('glyphicon-download') ;
        }else{
            showHideBtn.addClass('glyphicon-upload') ;
        }
    }) ;
    //onmouseout
    /*$(document).delegate('.brand_title .descrImg','mouseover',function(){
        $(this).parents('.brand_title').find('.descrInfo').removeClass('hidden') ;
    }) ;
    $(document).delegate('.brand_title .descrImg','mouseout',function(){
        $(this).parents('.brand_title').find('.descrInfo').addClass('hidden') ;
    }) ;*/
    $('[data-toggle="tooltip"]').tooltip()
}) ;

