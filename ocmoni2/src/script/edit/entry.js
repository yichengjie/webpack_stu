//这里一定要注意，tui-core必须先与tui的datepicker引入，
//否则会报错，可能是tui的bug，目前还不知道具体是什么原因
//这些文件也会绑定到全局的jquery 对象上去
require('../lib/tui-core/index') ;
//tui-core一定要先与所有的tui插件前引入
require('../lib/tui-drag/index') ;
require('../lib/tui-dialog/index') ;
//一定要注意tui插件的引入顺序问题，否则可能会报错
//下面引入的是jquery的插件，会绑定到全局的jquery对象上去
require("../lib/modal") ;
require('../lib/autocomplete/index') ;
require('../lib/datepicker/index') ;
require('../lib/timepicker/index') ;
require('../lib/jquery-validate/index') ;
////////////////
require('angular') ;
//require('moment') ;
require('angular-messages') ;
require('angular-bindonce') ;
var main = require('./main') ;
main.init() ;



