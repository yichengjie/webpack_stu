//define(function(require) {
  require('tui_core_lib') ;
  require('tui_drag_lib') ;
  require('tui_dialog_lib') ;
  require('jq_validate_lib');
  require('jq_datepicker_lib');
  var abrQuery = require('./abrquery');
  new abrQuery();
  
  var abrDelete = require('./abrdelete');
  var abrdelete = new abrDelete();
  abrdelete.init();
//});