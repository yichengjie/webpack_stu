var path = require('path') ;
var PKG_ENTRY_PATH= path.resolve('./pkg_entry');
var entryMap = {
	//css文件
    "commonStyle":PKG_ENTRY_PATH+"/commonStyleEntry.js",
    //下面是js文件
    "s7Edit": PKG_ENTRY_PATH+"/s7EditEntry.js",
    "s7Query": PKG_ENTRY_PATH+"/s7QueryEntry.js",
    "validate":PKG_ENTRY_PATH+"/validateEntry.js",
    "mileageQuery":PKG_ENTRY_PATH+"/mileageQueryEntry.js",
    "mileageEdit":PKG_ENTRY_PATH+"/mileageEditEntry.js",
    "datasourceQuery":PKG_ENTRY_PATH+"/datasourceQueryEntry.js",
    "datasourceEdit":PKG_ENTRY_PATH+"/datasourceEditEntry.js",/**/
    "occonfig":PKG_ENTRY_PATH+"/occonfigEntry.js"
} ;

module.exports = entryMap ;