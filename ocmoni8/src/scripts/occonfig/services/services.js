
	var app = angular.module('app.service',[]) ;
	app.factory('FormData', function(){
		return {
			"carrCode":"",
			"sel1":{"showStr":"","value":""},
		    "sel2":{"showStr":"","value":""},
		    "sel3":{"showStr":"","value":"","textTableNo163":"","serviceGroup":"","serviceType":""},
		   "sel4":[],
		   "serviceType":"F"
		};});
