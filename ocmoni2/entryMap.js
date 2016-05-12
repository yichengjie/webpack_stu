var path = require('path') ;
var PKG_ENTRY_PATH= path.resolve('./src/pkg_entry');
var entryMap = {//css文件
    "common_style":PKG_ENTRY_PATH+"/common_style_entry.js",
    //下面是js文件
    "s7_edit": PKG_ENTRY_PATH+"/s7_edit_entry.js",
    "s7_query": PKG_ENTRY_PATH+"/s7_query_entry.js",
    "validate":PKG_ENTRY_PATH+"/validate_entry.js",
    "mileage_query":PKG_ENTRY_PATH+"/mileage_query_entry.js",
    "mileage_edit":PKG_ENTRY_PATH+"/mileage_edit_entry.js",
    "abr_query":PKG_ENTRY_PATH+"/abr_query_entry.js",
    "abr_edit":PKG_ENTRY_PATH+"/abr_edit_entry.js"
} ;

module.exports = entryMap ;