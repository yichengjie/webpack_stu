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