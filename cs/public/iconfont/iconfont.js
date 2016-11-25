;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-sort-small" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M352 448l320 0-160-192L352 448z"  ></path>'+
      ''+
      '<path d="M672 576 352 576l160 192L672 576z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-bitian" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M492.326938 388.886031l39.3451 0-3.934612 109.617583 100.05581-38.22458 12.398378 37.103036-103.44193 30.927383 69.677942 82.624812-30.332842 24.178679-64.095807-88.824001-64.095807 88.824001-30.377868-24.178679 69.722968-82.624812-103.44193-30.927383 12.398378-37.103036 100.605326 38.22458L492.326938 388.886031z" fill="#d81e06" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-sort-small1" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M352 448l320 0-160-192L352 448z" fill="#ff0030" ></path>'+
      ''+
      '<path d="M672 576 352 576l160 192L672 576z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-sort-small-copy" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M352 448l320 0-160-192L352 448z"  ></path>'+
      ''+
      '<path d="M672 576 352 576l160 192L672 576z" fill="#d81e06" ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
