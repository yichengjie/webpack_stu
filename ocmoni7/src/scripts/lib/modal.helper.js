/**
 * <pre>
 * 	功能描述:所有的模态框辅助类
 * </pre>
 * @auther:yicj
 * @email:626659321@qq.com
 * @date:2016/05/03
 * @example:
 * html:'<ul id ="tskCustomeTipInfo">'
 * js:'var ModalHelper = require('./lib/modal.helper') ; <br/>
 * 	   var modalHelper = new ModalHelper("tskCustomeTipInfo");'
 */
//define(function (require, exports, module) {
	function ModalHelper(tipId){
		if(this==window){
			throw new Error("please new an ModalHelper object to use it !");
		}
		this.el = $("#"+tipId) ;
	} ;
	
	
	ModalHelper.prototype.cleanTipInfo = function(){
		this.el.html("") ;
	} ;
	
	ModalHelper.prototype.addErrorTip = function(errMsg){
		this.el.append("<li><span class ='text-danger'>"+errMsg+"</span></li>") ;
	} ;
	ModalHelper.prototype.addSuccessTip = function(sucMsg){
		this.el.append("<li><span class =\"text-success\">"+sucMsg+"</span></li>") ;
	} ;
	module.exports = ModalHelper;
//}) ;


