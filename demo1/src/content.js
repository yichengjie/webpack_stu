
var htmlStr = require('./tpl/hello.html') ;
var content = {} ;
content.info ="It works from content.js." ;
content.sayHello = function(){
    console.info(htmlStr) ;
};
module.exports = content;