"use strict"
class Records7Query{
    constructor(){
        initQueryPage() ;
        initVue(this) ;
    }
    query4Page({toPageNum,vmList,vmPageBar,orderName="default",isAsc=true} ){
        //let {toPageNum,vmList,vmPageBar} = config ;
		var pageSize =   vmPageBar.pageSize || 20 ;
		var serverURL = this.contextPath+"/mileage/query4Page.action" ;
		var simpleJsonData = {"toPageNum":toPageNum,"pageSize":pageSize} ;
		//清空历史数据
		vmList.splice(0,vmList.length);  
		vmPageBar.curPage =0 ;
		vmPageBar.pageCount = 0 ;
		vmPageBar.pgArr.splice(0,vmPageBar.pgArr.length) ;

        let ajaxing = queryDbApi(simpleJsonData) ;
        ajaxing.then(function(pageBean){
            let list = pageBean.recordList ;
            vmPageBar.curPage = pageBean.curPage ;
            vmPageBar.pageSize= pageBean.pageSize;
            pageBean.pageNumList.forEach(function(item){
                vmPageBar.pgArr.push(item) ;
            }) ;
            vmPageBar.pageCount = pageBean.pageCount;
            vmPageBar.recordCount = pageBean.recordCount ;
            vmPageBar.isQueryDB = true ;
            list.forEach(function(item){
                vmList.push(item) ;
            }) ;
        });
    }
    orderRecords7({titleName,ascFlag,vmList}){
        let orderTypeStr = ascFlag ? 'asc' : 'desc' ;
        let retArr = _.orderBy(vmList, [titleName], [orderTypeStr]);
        vmList.splice(0,vmList.length) ;
        retArr.forEach(item => vmList.push(item) ) ;
    }
}

//生成一个随机数
function random (min,max){
    return function(){
        return _.random(min,max);
    }
}

//查询数据库的api
function queryDbApi ({toPageNum,pageSize=10}){
    let records7List = [] ;
    //生成0-5的随机数
    let r = random(1,9) ;
    for(let i = 0 ; i < pageSize ; i ++){
        //let cur = _.random(0, 5);
        let obj = {"subcode":"OB"+ r(),"serviceType":"F"+ r(),"status": r(),"saleStartDate":"2016/01/0"+ r(),
                "saleEndDate":"2016/12/2"+ r(),"travelStartDate":"2016/01/0"+ r(),"travelEndDate":"2016/12/2"+ r(),
                "loc1":"11"+ r(),"loc2":"1234567"+ r(),"flyerStatus":""+ r(),"money":"99"+ r()+"CNY","descr":"描述" + r(),
                "lastUpdateUser":"yicj"+ r(),"lastUpdateDate":"2016/01/01 14:0"+ r()
        } ;
        records7List.push(obj) ;
    }
    var pageBean = {
        curPage:toPageNum,
        pageSize:pageSize,
        pageNumList:[1,2,3,4,5],
        pageCount:5,
        recordList:records7List,
        recordCount:100
    } ;
    loading() ;
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            hiding() ;
            resolve(pageBean) ;
        },300) ;
    }) ;
}


function initVue(s7){
    new Vue({
        el: '#app',
        data: {
            records7List:[],
            tableTitleOrder:{"subcode":true,"serviceType":true,"status":true,"saleStartDate":true,
                "saleEndDate":true,"travelStartDate":true,"travelEndDate":true,"loc1":true,
                "loc2":true,"flyerStatus":true,"money":true,"descr":true,"lastUpdateUser":true,
                "lastUpdateDate":true
            },
            orderTitleName:"",
            pageBar:{
			    "curPage":0,
			    "pageSize":0,
			    "pgArr":[],
			    "pageCount":0,
                "recordCount":0,
                "isQueryDB":false
		    },
            queryDBFlag:false,
            showMoreQuerySectionFlag:false,
            formData:{
                status:[],
                effStatus:[],
                subcode:"",
                startSequenceNumber:"",
                endSequenceNumber:"",
                serviceType:[],
                effectMinDate:"",
                effectMaxDate:"",
                travelStartDate:"",
                travelEndDate:"",
                passengerTypeCode:[],
                geoSpecLoc1:"",
                geoSpecLoc2:"",
                updateUser:"",
                updateStartDate:"",
                updateEndDate:""
            }
        },
        ready:function(){
            console.info('vue app is ready ...') ;
        },
        methods:{
            switchGeoLocValue:function(){
                let loc1 = this.formData.geoSpecLoc1 ;
                let loc2 = this.formData.geoSpecLoc2 ;
                this.formData.geoSpecLoc1 = loc2 ;
                this.formData.geoSpecLoc2 = loc1 ;
            },
            clickTableTitle:function(titleName){
               //1.更新当前排序呢的列名称
               this.orderTitleName = titleName ;
               //2.更新当前排序的状态(升序/倒序)
               let oldFlag = this.tableTitleOrder[titleName] ;
               let keys = Object.keys(this.tableTitleOrder) ;
               for(let key of keys){
                   this.tableTitleOrder[key] = true ;
               }
               this.tableTitleOrder[titleName] = !oldFlag ;
               //2.执行排序操作
               //let queryDBFlag = $("")
               if(this.queryDBFlag){//查询数据库
                   var config = {
                        toPageNum:1,
                        vmList:this.records7List ,
                        vmPageBar:this.pageBar,
                        orderName:this.orderTitleName,
                        isAsc:this.tableTitleOrder[this.orderTitleName]
                    } ;
                    s7.query4Page(config) ;
               }else{
                  s7.orderRecords7({titleName,ascFlag:!oldFlag,vmList:this.records7List}) ;
               }
            },
            queryS7:function(){
               var config = {
                    toPageNum:1,
                    vmList:this.records7List ,
                    vmPageBar:this.pageBar
                } ;
               s7.query4Page(config) ;
            },
            toPage:function(pnum){
                //触发查询操作
                //当前页数据更新
                //this.pageBar.curPage = pnum ;
                if(pnum!=this.pageBar.curPage){
                    var config = {
                        toPageNum:pnum,
                        vmList:this.records7List ,
                        vmPageBar:this.pageBar
                    } ;
                    s7.query4Page(config) ;
                }
            },
            toPerviousPage:function(){
                if(this.pageBar.curPage*1>1){
                    //触发查询操作
                    //this.pageBar.curPage = this.pageBar.curPage*1 -1 ;
                    var config = {
                        toPageNum:this.pageBar.curPage*1 -1,
                        vmList:this.records7List ,
                        vmPageBar:this.pageBar
                    } ;
                    s7.query4Page(config) ;
                }
            },
            toNextPage:function(){
                if(this.pageBar.curPage*1<this.pageBar.pageCount*1){
                    //触发查询操作
                    //this.pageBar.curPage = this.pageBar.curPage*1 +1 ;
                    var config = {
                        toPageNum:this.pageBar.curPage*1 +1,
                        vmList:this.records7List ,
                        vmPageBar:this.pageBar
                    } ;
                    s7.query4Page(config) ;
                }
            },
            pageConfirm:function(){
                var pageOkInput =  $("#pageOkInput").val() ;
                //将当前页数据更新
                var pageOkInputNum = pageOkInput*1 ;
                if(pageOkInputNum>0&&pageOkInputNum<=this.pageBar.pageCount*1){
                    var config = {
                        toPageNum:pageOkInput*1,
                        vmList:this.records7List ,
                        vmPageBar:this.pageBar
                    } ;
                    s7.query4Page(config) ;
                }else{
                    $("#pageOkInput").val(this.pageBar.curPage) ;
                }
            },
            checkAllRecords7:function(e){
                let flag = e.target.checked ;
                $(":checkbox[name='records7_checkbox']").prop('checked',flag) ;
            },
            checkRecords7Item:function(e){
                let flag = e.target.checked ;
                let checkAll = $("#checkAllRecords7") ; 
                let len1 = $(":checkbox[name='records7_checkbox']:checked").length ;
                let len2 =  $(":checkbox[name='records7_checkbox']").length ;
                if(len1<len2){
                    checkAll.prop('checked',false) ;
                }else{
                    checkAll.prop('checked',true) ;
                }
            }
        }
    }) ;
}



function initQueryPage(){
    //myheader
    // $("#showHideMoreQuerySectionBtn").click(function(){
    //     $("#moreQuerySection").slideToggle() ;
    // }) ;

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

    //
    // $(window).resize(function(){
    //     alert("Stop it!");
    // });
    // $('#myheader').resize(function(){
    //     console.info('resize : ....') ;
    // }) ;
    // $("#myheader").resize(function(e){
    //     // do something when #unicorns element resizes
    //     console.info('resize : ....') ;
    // });
}


function loading(){
    $.isLoading({
        'text': "加载中..." ,
        'class': "text-success glyphicon glyphicon-refresh",    // loader CSS class
        'tpl': '<span class="isloading-wrapper %wrapper%">%text%<i class="%class% icon-spin marginL5"></i></span>'
    });
}
function hiding(){
    $.isLoading( "hide" );
}

$(function(){
    new Records7Query() ;
}) ;

