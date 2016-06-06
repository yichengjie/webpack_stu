/**
 * Created by Administrator on 2016/5/30.
 */
$(function(){


   /* $('.datepicker').datepicker({
        language:'zh-CN',
        format:'yyyy/mm/dd',
        startDate:new Date(),
        orientation: "bottom",
        autoclose:true
    });

    $('.datetimepicker').datetimepicker({
        locale: 'zh-cn'
    });*/
    var minDateStr = "2016-06-06" ;
    var minDate = new Date(minDateStr) ;
    //配置日期控件
    var optionObj = {} ;
    optionObj.dateFormat = "yy-mm-dd" ;
    optionObj.timeFormat = 'HH:mm' ;
    var updateModel = function(dateText){
        console.info('dateText : ' + dateText) ;
    }
    optionObj.onSelect = function(dateText,picker){
        updateModel(dateText) ;
    }
    optionObj.minDate = minDate ;
    optionObj.timeText="&nbsp;&nbsp;时间" ;
    optionObj.hourText ="&nbsp;&nbsp;时" ;
    optionObj.minuteText ="&nbsp;&nbsp;分" ;
    //optionObj.secondText = "&nbsp;&nbsp;秒" ;
    optionObj.currentText = "当前" ;
    optionObj.closeText = "关闭" ;
    optionObj.showButtonPanel = true ;
    //optionObj.showSecond = true ;
    $('.datepicker').datepicker({minDate:new Date(), showButtonPanel:true}) ;
    $('.datetimepicker').datetimepicker(optionObj) ;


    $('#autocomplete').autocomplete({
        minChars:0,
        lookup: function (query, done) {
            var result = {
                suggestions: [
                    { "value": "10011", "data": "10011" },
                    { "value": "10012", "data": "10012" },
                    { "value": "10013",  "data": "10013" }
                ]
            };
            done(result);
        },
        onSelect: function (suggestion) {
            alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        }
    });


    $('#saveBtn').click(function () {
        $.showTuiErrorDialog('请选择服务到最后一级！');
    }) ;

    $('#saveAndPublishBtn').click(function () {
        $.showTuiConfirmDialog('保存?', function() {
            alert('hello world') ;
        }) ;
    }) ;
}) ;