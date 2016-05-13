define(function(require) {
  require('tui_core_lib') ;
  //tui-core一定要先与所有的tui插件前引入
  require('tui_drag_lib') ;
  require('tui_dialog_lib');

  var abrQuery = require('./abrquery');
  new abrQuery();
  
  var abrDelete = require('./abrdelete');
  var abrdelete = new abrDelete();
  abrdelete.init();
});