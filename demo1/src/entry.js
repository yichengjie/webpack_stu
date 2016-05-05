//require("!style!css!./style.css");
require("./style.css");
//document.write("It works.");
var content = require("./content.js") ;
content.sayHello() ;
document.write(content.info);