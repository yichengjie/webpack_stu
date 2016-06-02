/**
 * Created by Administrator on 2016/5/30.
 */
$(function(){
    $('.datepicker').datepicker({
        language:'zh-CN',
        format:'yyyy/mm/dd',
        startDate:new Date(),
        orientation: "bottom",
        autoclose:true
    });
}) ;