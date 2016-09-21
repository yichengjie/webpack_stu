"use strict"
class Records7Query{
    constructor(){
        initQueryPage() ;
        initVue(this) ;
    }
}


function initVue(s7){
    new Vue({
        el: '#app',
        data: {
            records7List:[1,2,3],
            tableTitleOrder:{"subcode":true,"serviceType":true,"status":true,"saleStartDate":true,
                "saleEndDate":true,"travelStartDate":true,"travelEndDate":true,"loc1":true,
                "loc2":true,"flyerStatus":true,"money":true,"descr":true,"lastUpdateUser":true,
                "lastUpdateDate":true},
        },
        ready:function(){
            console.info('vue app is ready ...') ;
        },
        methods:{
            clickTableTitle:function(titleName){
               let oldFlag = this.tableTitleOrder[titleName] ;
               let keys = Object.keys(this.tableTitleOrder) ;
               for(let key of keys){
                   this.tableTitleOrder[key] = true ;
               }
               this.tableTitleOrder[titleName] = !oldFlag ;
            }
        }
    }) ;
}





function initQueryPage(){
    //myheader
    var htmlStr2 = $("#mytemplate").html();
    $("#myheader").html(htmlStr2) ;
}

$(function(){
    new Records7Query() ;
}) ;

