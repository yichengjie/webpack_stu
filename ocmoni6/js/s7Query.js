/**
 * Created by Administrator on 2016/5/27.
 */
$(function(){
    $("#moreQuerySection").hide() ;
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
}) ;