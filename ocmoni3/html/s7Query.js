/**
 * Created by Administrator on 2016/5/27.
 */
$(function(){
    $("#moreQuerySection").hide() ;
    $("#showHideMoreQuerySectionBtn").click(function(){
        $("#moreQuerySection").slideToggle() ;
    }) ;
    $('.datepicker').datepicker({
        language:'zh-CN',
        format:'yyyy/mm/dd',
        startDate:new Date()
    });
}) ;