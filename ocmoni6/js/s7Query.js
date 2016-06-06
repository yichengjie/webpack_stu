/**
 * Created by Administrator on 2016/5/27.
 */
$(function(){
    $("#moreQuerySection").hide() ;
    $("#showHideMoreQuerySectionBtn").click(function(){
        $("#moreQuerySection").slideToggle() ;
    }) ;
    $('.datepicker').datepicker({minDate:new Date(), showButtonPanel:true});
}) ;