"use strict"

function initTooltip(){
    setTimeout(function(){
        $("[data-toggle='tooltip']").tooltip();
    },300)
}

class Records7Query{
    constructor(){
        initQueryPage() ;
        //initVue(this) ;
    }
    query4Page({toPageNum=1,vmList,vmPageBar,orderName="lastUpdateDate",isAsc=true} ){
        orderName = orderName==''?'lastUpdateDate':orderName ;
        //let {toPageNum,vmList,vmPageBar} = config ;
		var pageSize =   vmPageBar.pageSize || 10 ;
		var serverURL = this.contextPath+"/mileage/query4Page.action" ;
		var simpleJsonData = {toPageNum,pageSize,orderName,isAsc} ;
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
            initTooltip() ;
        });
    }
}

//排序数据
function orderListData(list,titleName,ascFlag){
    if(titleName&&titleName.length>0&&titleName!=='default'){
        let orderTypeStr = ascFlag ? 'asc' : 'desc' ;
        let retArr = _.orderBy(list, [titleName], [orderTypeStr]);
        list.splice(0,list.length) ;
        retArr.forEach(item => list.push(item) ) ;
    }
}


//生成一个随机数
function random (min,max){
    return function(){
        return _.random(min,max);
    }
}

//查询数据库的api
function queryDbApi ({toPageNum,pageSize,orderName,isAsc}){
    
    let records7List = [] ;
    //生成0-5的随机数
    let r = random(1,9) ;
    let min = toPageNum *10 ;
    let r2 = random(min ,min +pageSize) ;
    for(let i = 0 ; i < pageSize ; i ++){
        //let cur = _.random(0, 5);
        let obj = {"subcode":"OB"+ r(),"serviceType":"F"+ r(),"status": r2(),"saleStartDate":"2016/01/0"+ r(),
                "saleEndDate":"2016/12/2"+ r(),"travelStartDate":"2016/01/0"+ r(),"travelEndDate":"2016/12/2"+ r(),
                "loc1":"11"+ r(),"loc2":"1234567"+ r(),"flyerStatus":""+ r(),"money":"99"+ r()+"CNY","descr":"描述" + r(),
                "lastUpdateUser":"yicj"+ r(),"lastUpdateDate":"2016/01/01 14:0"+ r()
        } ;
        records7List.push(obj) ;
    }


    orderListData(records7List,orderName,isAsc) ;
    var pageBean = {
        curPage:toPageNum,
        pageSize:pageSize,
        pageNumList:[1,2,3,4,5],
        pageCount:5,
        recordList:records7List,
        recordCount:100
    } ;
    showLoading() ;
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            hideHideing() ;
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
            },/**所有列的排序状态 */
            orderTitleName:"",/**当前排序的列名称 */
            queryDBFlag:false,/**是否针对所有记录进行排序 */
            showMoreQuerySectionFlag:false,/**显示更多查询条件 */
            dealPageOrderFlag:false,/**是否进行过页面静态排序 */
            pageBar:{
			    "curPage":0,
			    "pageSize":0,
			    "pgArr":[],
			    "pageCount":0,
                "recordCount":0,
                "isQueryDB":false
		    },
            formData:{
                statusArr:[],/**发布状态 */
                effStatusArr:[],/**生效状态 */
                subcode:"",
                startSequenceNumber:"", 
                endSequenceNumber:"",
                serviceTypeArr:[],/**服务等级(服务类型) */
                effectMinDate:"",
                effectMaxDate:"",
                travelStartDate:"",
                travelEndDate:"",
                passengerTypeCodeArr:[],/**常旅客等级 */
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
                  let toPageNum = this.pageBar.curPage*1 ;
                  this.queryDB(toPageNum) ;
               }else{
                  this.dealPageOrderFlag = true;
                  let list = this.records7List ;
                  let ascFlag = !oldFlag ;
                  orderListData(list,titleName,ascFlag) ;
               }
            },
            queryDB:function(toPageNum){
                //当没有选中对所有记录进行排序是，如果是查询数据库操作，
                //都应该对之前的排序状态进行清空操作
                $("#checkAllRecords7").prop('checked',false) ;
                if(!this.queryDBFlag){//没有勾选查询全部时，清除排序状态
                    this._clearOrderStatusOnPage() ;
                }
                this.dealPageOrderFlag = false;
                var config = {
                    toPageNum:1,
                    vmList:this.records7List ,
                    vmPageBar:this.pageBar,
                    orderName:this.orderTitleName,
                    isAsc:this.tableTitleOrder[this.orderTitleName]
                } ;
                if(toPageNum&&toPageNum>0){
                  config.toPageNum = toPageNum ; 
                }
                //如果为空的话表示是默认排序
                // if(this.orderTitleName==''){
                //     this.orderTitleName = "lastUpdateDate" ;
                // }
                s7.query4Page(config) ;
            },
            _clearOrderStatusOnPage:function(){/**清楚页面上排序状态 */
                let keys = Object.keys(this.tableTitleOrder) ;
                keys.forEach(key=>{
                    this.tableTitleOrder[key] = true ;
                }) ;
                this.orderTitleName = "" ;
                this.dealPageOrderFlag = false;
            },
            handleClickQuery:function(){/**点击查询按钮时 */
               //当点击查询按钮的时候清楚页面上的所有的排序状态
               this._clearOrderStatusOnPage() ;
               //清楚所有的排序状态，保持默认排序
               let toPageNum = 1 ;
               this.queryDB(toPageNum) ;
            },
            toPage:function(pnum){
                //触发查询操作
                //this.pageBar.curPage = pnum ;
                if(pnum!=this.pageBar.curPage){
                    let toPageNum = pnum ;
                    this.queryDB(toPageNum) ;
                }
            },
            toPerviousPage:function(){
                if(this.pageBar.curPage*1>1){
                    //触发查询操作
                    //this.pageBar.curPage = this.pageBar.curPage*1 -1 ;
                    let toPageNum = this.pageBar.curPage*1 -1 ;
                    this.queryDB(toPageNum) ;
                }
            },
            toNextPage:function(){
                if(this.pageBar.curPage*1<this.pageBar.pageCount*1){
                    //触发查询操作
                    //this.pageBar.curPage = this.pageBar.curPage*1 +1 ;
                    let toPageNum = this.pageBar.curPage*1 +1;
                    this.queryDB(toPageNum) ;
                }
            },
            pageConfirm:function(){
                var pageOkInput =  $("#pageOkInput").val() ;
                //将当前页数据更新
                var pageOkInputNum = pageOkInput*1 ;
                if(pageOkInputNum>0&&pageOkInputNum<=this.pageBar.pageCount*1){
                    let toPageNum = pageOkInput*1;
                    this.queryDB(toPageNum) ;
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
}


function showLoading(){
    $.isLoading({
        'text': "加载中..." ,
        'class': "text-success glyphicon glyphicon-refresh",    // loader CSS class
        'tpl': '<span class="isloading-wrapper %wrapper%">%text%<i class="%class% icon-spin marginL5"></i></span>'
    });
}
function hideHideing(){
    $.isLoading( "hide" );
}

$(function(){
   let recordS7 =  new Records7Query() ;
   initVue(recordS7) ;
}) ;

