/*!
 * {compony travelsky-dbky ,
 *  author: yicj,
 *  email : 626659321@qq.com,
 * create-date:2016/05/05}
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//引入项目依赖的所有css文件
	var main = __webpack_require__(235);
	main.init();

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(27);

/***/ },

/***/ 61:
/***/ function(module, exports) {

	module.exports = vendor_997f7dcf;

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(31);

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(29);

/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(20);

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(14);

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(2);

/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	module.exports = 'ngMessages';


/***/ },

/***/ 68:
/***/ function(module, exports) {

	/**
	 * @license AngularJS v1.5.0
	 * (c) 2010-2016 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
	(function(window, angular, undefined) {'use strict';

	/* jshint ignore:start */
	// this code is in the core, but not in angular-messages.js
	var isArray = angular.isArray;
	var forEach = angular.forEach;
	var isString = angular.isString;
	var jqLite = angular.element;
	/* jshint ignore:end */

	/**
	 * @ngdoc module
	 * @name ngMessages
	 * @description
	 *
	 * The `ngMessages` module provides enhanced support for displaying messages within templates
	 * (typically within forms or when rendering message objects that return key/value data).
	 * Instead of relying on JavaScript code and/or complex ng-if statements within your form template to
	 * show and hide error messages specific to the state of an input field, the `ngMessages` and
	 * `ngMessage` directives are designed to handle the complexity, inheritance and priority
	 * sequencing based on the order of how the messages are defined in the template.
	 *
	 * Currently, the ngMessages module only contains the code for the `ngMessages`, `ngMessagesInclude`
	 * `ngMessage` and `ngMessageExp` directives.
	 *
	 * # Usage
	 * The `ngMessages` directive listens on a key/value collection which is set on the ngMessages attribute.
	 * Since the {@link ngModel ngModel} directive exposes an `$error` object, this error object can be
	 * used with `ngMessages` to display control error messages in an easier way than with just regular angular
	 * template directives.
	 *
	 * ```html
	 * <form name="myForm">
	 *   <label>
	 *     Enter text:
	 *     <input type="text" ng-model="field" name="myField" required minlength="5" />
	 *   </label>
	 *   <div ng-messages="myForm.myField.$error" role="alert">
	 *     <div ng-message="required">You did not enter a field</div>
	 *     <div ng-message="minlength, maxlength">
	 *       Your email must be between 5 and 100 characters long
	 *     </div>
	 *   </div>
	 * </form>
	 * ```
	 *
	 * Now whatever key/value entries are present within the provided object (in this case `$error`) then
	 * the ngMessages directive will render the inner first ngMessage directive (depending if the key values
	 * match the attribute value present on each ngMessage directive). In other words, if your errors
	 * object contains the following data:
	 *
	 * ```javascript
	 * <!-- keep in mind that ngModel automatically sets these error flags -->
	 * myField.$error = { minlength : true, required : true };
	 * ```
	 *
	 * Then the `required` message will be displayed first. When required is false then the `minlength` message
	 * will be displayed right after (since these messages are ordered this way in the template HTML code).
	 * The prioritization of each message is determined by what order they're present in the DOM.
	 * Therefore, instead of having custom JavaScript code determine the priority of what errors are
	 * present before others, the presentation of the errors are handled within the template.
	 *
	 * By default, ngMessages will only display one error at a time. However, if you wish to display all
	 * messages then the `ng-messages-multiple` attribute flag can be used on the element containing the
	 * ngMessages directive to make this happen.
	 *
	 * ```html
	 * <!-- attribute-style usage -->
	 * <div ng-messages="myForm.myField.$error" ng-messages-multiple>...</div>
	 *
	 * <!-- element-style usage -->
	 * <ng-messages for="myForm.myField.$error" multiple>...</ng-messages>
	 * ```
	 *
	 * ## Reusing and Overriding Messages
	 * In addition to prioritization, ngMessages also allows for including messages from a remote or an inline
	 * template. This allows for generic collection of messages to be reused across multiple parts of an
	 * application.
	 *
	 * ```html
	 * <script type="text/ng-template" id="error-messages">
	 *   <div ng-message="required">This field is required</div>
	 *   <div ng-message="minlength">This field is too short</div>
	 * </script>
	 *
	 * <div ng-messages="myForm.myField.$error" role="alert">
	 *   <div ng-messages-include="error-messages"></div>
	 * </div>
	 * ```
	 *
	 * However, including generic messages may not be useful enough to match all input fields, therefore,
	 * `ngMessages` provides the ability to override messages defined in the remote template by redefining
	 * them within the directive container.
	 *
	 * ```html
	 * <!-- a generic template of error messages known as "my-custom-messages" -->
	 * <script type="text/ng-template" id="my-custom-messages">
	 *   <div ng-message="required">This field is required</div>
	 *   <div ng-message="minlength">This field is too short</div>
	 * </script>
	 *
	 * <form name="myForm">
	 *   <label>
	 *     Email address
	 *     <input type="email"
	 *            id="email"
	 *            name="myEmail"
	 *            ng-model="email"
	 *            minlength="5"
	 *            required />
	 *   </label>
	 *   <!-- any ng-message elements that appear BEFORE the ng-messages-include will
	 *        override the messages present in the ng-messages-include template -->
	 *   <div ng-messages="myForm.myEmail.$error" role="alert">
	 *     <!-- this required message has overridden the template message -->
	 *     <div ng-message="required">You did not enter your email address</div>
	 *
	 *     <!-- this is a brand new message and will appear last in the prioritization -->
	 *     <div ng-message="email">Your email address is invalid</div>
	 *
	 *     <!-- and here are the generic error messages -->
	 *     <div ng-messages-include="my-custom-messages"></div>
	 *   </div>
	 * </form>
	 * ```
	 *
	 * In the example HTML code above the message that is set on required will override the corresponding
	 * required message defined within the remote template. Therefore, with particular input fields (such
	 * email addresses, date fields, autocomplete inputs, etc...), specialized error messages can be applied
	 * while more generic messages can be used to handle other, more general input errors.
	 *
	 * ## Dynamic Messaging
	 * ngMessages also supports using expressions to dynamically change key values. Using arrays and
	 * repeaters to list messages is also supported. This means that the code below will be able to
	 * fully adapt itself and display the appropriate message when any of the expression data changes:
	 *
	 * ```html
	 * <form name="myForm">
	 *   <label>
	 *     Email address
	 *     <input type="email"
	 *            name="myEmail"
	 *            ng-model="email"
	 *            minlength="5"
	 *            required />
	 *   </label>
	 *   <div ng-messages="myForm.myEmail.$error" role="alert">
	 *     <div ng-message="required">You did not enter your email address</div>
	 *     <div ng-repeat="errorMessage in errorMessages">
	 *       <!-- use ng-message-exp for a message whose key is given by an expression -->
	 *       <div ng-message-exp="errorMessage.type">{{ errorMessage.text }}</div>
	 *     </div>
	 *   </div>
	 * </form>
	 * ```
	 *
	 * The `errorMessage.type` expression can be a string value or it can be an array so
	 * that multiple errors can be associated with a single error message:
	 *
	 * ```html
	 *   <label>
	 *     Email address
	 *     <input type="email"
	 *            ng-model="data.email"
	 *            name="myEmail"
	 *            ng-minlength="5"
	 *            ng-maxlength="100"
	 *            required />
	 *   </label>
	 *   <div ng-messages="myForm.myEmail.$error" role="alert">
	 *     <div ng-message-exp="'required'">You did not enter your email address</div>
	 *     <div ng-message-exp="['minlength', 'maxlength']">
	 *       Your email must be between 5 and 100 characters long
	 *     </div>
	 *   </div>
	 * ```
	 *
	 * Feel free to use other structural directives such as ng-if and ng-switch to further control
	 * what messages are active and when. Be careful, if you place ng-message on the same element
	 * as these structural directives, Angular may not be able to determine if a message is active
	 * or not. Therefore it is best to place the ng-message on a child element of the structural
	 * directive.
	 *
	 * ```html
	 * <div ng-messages="myForm.myEmail.$error" role="alert">
	 *   <div ng-if="showRequiredError">
	 *     <div ng-message="required">Please enter something</div>
	 *   </div>
	 * </div>
	 * ```
	 *
	 * ## Animations
	 * If the `ngAnimate` module is active within the application then the `ngMessages`, `ngMessage` and
	 * `ngMessageExp` directives will trigger animations whenever any messages are added and removed from
	 * the DOM by the `ngMessages` directive.
	 *
	 * Whenever the `ngMessages` directive contains one or more visible messages then the `.ng-active` CSS
	 * class will be added to the element. The `.ng-inactive` CSS class will be applied when there are no
	 * messages present. Therefore, CSS transitions and keyframes as well as JavaScript animations can
	 * hook into the animations whenever these classes are added/removed.
	 *
	 * Let's say that our HTML code for our messages container looks like so:
	 *
	 * ```html
	 * <div ng-messages="myMessages" class="my-messages" role="alert">
	 *   <div ng-message="alert" class="some-message">...</div>
	 *   <div ng-message="fail" class="some-message">...</div>
	 * </div>
	 * ```
	 *
	 * Then the CSS animation code for the message container looks like so:
	 *
	 * ```css
	 * .my-messages {
	 *   transition:1s linear all;
	 * }
	 * .my-messages.ng-active {
	 *   // messages are visible
	 * }
	 * .my-messages.ng-inactive {
	 *   // messages are hidden
	 * }
	 * ```
	 *
	 * Whenever an inner message is attached (becomes visible) or removed (becomes hidden) then the enter
	 * and leave animation is triggered for each particular element bound to the `ngMessage` directive.
	 *
	 * Therefore, the CSS code for the inner messages looks like so:
	 *
	 * ```css
	 * .some-message {
	 *   transition:1s linear all;
	 * }
	 *
	 * .some-message.ng-enter {}
	 * .some-message.ng-enter.ng-enter-active {}
	 *
	 * .some-message.ng-leave {}
	 * .some-message.ng-leave.ng-leave-active {}
	 * ```
	 *
	 * {@link ngAnimate Click here} to learn how to use JavaScript animations or to learn more about ngAnimate.
	 */
	angular.module('ngMessages', [])

	   /**
	    * @ngdoc directive
	    * @module ngMessages
	    * @name ngMessages
	    * @restrict AE
	    *
	    * @description
	    * `ngMessages` is a directive that is designed to show and hide messages based on the state
	    * of a key/value object that it listens on. The directive itself complements error message
	    * reporting with the `ngModel` $error object (which stores a key/value state of validation errors).
	    *
	    * `ngMessages` manages the state of internal messages within its container element. The internal
	    * messages use the `ngMessage` directive and will be inserted/removed from the page depending
	    * on if they're present within the key/value object. By default, only one message will be displayed
	    * at a time and this depends on the prioritization of the messages within the template. (This can
	    * be changed by using the `ng-messages-multiple` or `multiple` attribute on the directive container.)
	    *
	    * A remote template can also be used to promote message reusability and messages can also be
	    * overridden.
	    *
	    * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.
	    *
	    * @usage
	    * ```html
	    * <!-- using attribute directives -->
	    * <ANY ng-messages="expression" role="alert">
	    *   <ANY ng-message="stringValue">...</ANY>
	    *   <ANY ng-message="stringValue1, stringValue2, ...">...</ANY>
	    *   <ANY ng-message-exp="expressionValue">...</ANY>
	    * </ANY>
	    *
	    * <!-- or by using element directives -->
	    * <ng-messages for="expression" role="alert">
	    *   <ng-message when="stringValue">...</ng-message>
	    *   <ng-message when="stringValue1, stringValue2, ...">...</ng-message>
	    *   <ng-message when-exp="expressionValue">...</ng-message>
	    * </ng-messages>
	    * ```
	    *
	    * @param {string} ngMessages an angular expression evaluating to a key/value object
	    *                 (this is typically the $error object on an ngModel instance).
	    * @param {string=} ngMessagesMultiple|multiple when set, all messages will be displayed with true
	    *
	    * @example
	    * <example name="ngMessages-directive" module="ngMessagesExample"
	    *          deps="angular-messages.js"
	    *          animations="true" fixBase="true">
	    *   <file name="index.html">
	    *     <form name="myForm">
	    *       <label>
	    *         Enter your name:
	    *         <input type="text"
	    *                name="myName"
	    *                ng-model="name"
	    *                ng-minlength="5"
	    *                ng-maxlength="20"
	    *                required />
	    *       </label>
	    *       <pre>myForm.myName.$error = {{ myForm.myName.$error | json }}</pre>
	    *
	    *       <div ng-messages="myForm.myName.$error" style="color:maroon" role="alert">
	    *         <div ng-message="required">You did not enter a field</div>
	    *         <div ng-message="minlength">Your field is too short</div>
	    *         <div ng-message="maxlength">Your field is too long</div>
	    *       </div>
	    *     </form>
	    *   </file>
	    *   <file name="script.js">
	    *     angular.module('ngMessagesExample', ['ngMessages']);
	    *   </file>
	    * </example>
	    */
	   .directive('ngMessages', ['$animate', function($animate) {
	     var ACTIVE_CLASS = 'ng-active';
	     var INACTIVE_CLASS = 'ng-inactive';

	     return {
	       require: 'ngMessages',
	       restrict: 'AE',
	       controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs) {
	         var ctrl = this;
	         var latestKey = 0;
	         var nextAttachId = 0;

	         this.getAttachId = function getAttachId() { return nextAttachId++; };

	         var messages = this.messages = {};
	         var renderLater, cachedCollection;

	         this.render = function(collection) {
	           collection = collection || {};

	           renderLater = false;
	           cachedCollection = collection;

	           // this is true if the attribute is empty or if the attribute value is truthy
	           var multiple = isAttrTruthy($scope, $attrs.ngMessagesMultiple) ||
	                          isAttrTruthy($scope, $attrs.multiple);

	           var unmatchedMessages = [];
	           var matchedKeys = {};
	           var messageItem = ctrl.head;
	           var messageFound = false;
	           var totalMessages = 0;

	           // we use != instead of !== to allow for both undefined and null values
	           while (messageItem != null) {
	             totalMessages++;
	             var messageCtrl = messageItem.message;

	             var messageUsed = false;
	             if (!messageFound) {
	               forEach(collection, function(value, key) {
	                 if (!messageUsed && truthy(value) && messageCtrl.test(key)) {
	                   // this is to prevent the same error name from showing up twice
	                   if (matchedKeys[key]) return;
	                   matchedKeys[key] = true;

	                   messageUsed = true;
	                   messageCtrl.attach();
	                 }
	               });
	             }

	             if (messageUsed) {
	               // unless we want to display multiple messages then we should
	               // set a flag here to avoid displaying the next message in the list
	               messageFound = !multiple;
	             } else {
	               unmatchedMessages.push(messageCtrl);
	             }

	             messageItem = messageItem.next;
	           }

	           forEach(unmatchedMessages, function(messageCtrl) {
	             messageCtrl.detach();
	           });

	           unmatchedMessages.length !== totalMessages
	              ? $animate.setClass($element, ACTIVE_CLASS, INACTIVE_CLASS)
	              : $animate.setClass($element, INACTIVE_CLASS, ACTIVE_CLASS);
	         };

	         $scope.$watchCollection($attrs.ngMessages || $attrs['for'], ctrl.render);

	         this.reRender = function() {
	           if (!renderLater) {
	             renderLater = true;
	             $scope.$evalAsync(function() {
	               if (renderLater) {
	                 cachedCollection && ctrl.render(cachedCollection);
	               }
	             });
	           }
	         };

	         this.register = function(comment, messageCtrl) {
	           var nextKey = latestKey.toString();
	           messages[nextKey] = {
	             message: messageCtrl
	           };
	           insertMessageNode($element[0], comment, nextKey);
	           comment.$$ngMessageNode = nextKey;
	           latestKey++;

	           ctrl.reRender();
	         };

	         this.deregister = function(comment) {
	           var key = comment.$$ngMessageNode;
	           delete comment.$$ngMessageNode;
	           removeMessageNode($element[0], comment, key);
	           delete messages[key];
	           ctrl.reRender();
	         };

	         function findPreviousMessage(parent, comment) {
	           var prevNode = comment;
	           var parentLookup = [];
	           while (prevNode && prevNode !== parent) {
	             var prevKey = prevNode.$$ngMessageNode;
	             if (prevKey && prevKey.length) {
	               return messages[prevKey];
	             }

	             // dive deeper into the DOM and examine its children for any ngMessage
	             // comments that may be in an element that appears deeper in the list
	             if (prevNode.childNodes.length && parentLookup.indexOf(prevNode) == -1) {
	               parentLookup.push(prevNode);
	               prevNode = prevNode.childNodes[prevNode.childNodes.length - 1];
	             } else {
	               prevNode = prevNode.previousSibling || prevNode.parentNode;
	             }
	           }
	         }

	         function insertMessageNode(parent, comment, key) {
	           var messageNode = messages[key];
	           if (!ctrl.head) {
	             ctrl.head = messageNode;
	           } else {
	             var match = findPreviousMessage(parent, comment);
	             if (match) {
	               messageNode.next = match.next;
	               match.next = messageNode;
	             } else {
	               messageNode.next = ctrl.head;
	               ctrl.head = messageNode;
	             }
	           }
	         }

	         function removeMessageNode(parent, comment, key) {
	           var messageNode = messages[key];

	           var match = findPreviousMessage(parent, comment);
	           if (match) {
	             match.next = messageNode.next;
	           } else {
	             ctrl.head = messageNode.next;
	           }
	         }
	       }]
	     };

	     function isAttrTruthy(scope, attr) {
	      return (isString(attr) && attr.length === 0) || //empty attribute
	             truthy(scope.$eval(attr));
	     }

	     function truthy(val) {
	       return isString(val) ? val.length : !!val;
	     }
	   }])

	   /**
	    * @ngdoc directive
	    * @name ngMessagesInclude
	    * @restrict AE
	    * @scope
	    *
	    * @description
	    * `ngMessagesInclude` is a directive with the purpose to import existing ngMessage template
	    * code from a remote template and place the downloaded template code into the exact spot
	    * that the ngMessagesInclude directive is placed within the ngMessages container. This allows
	    * for a series of pre-defined messages to be reused and also allows for the developer to
	    * determine what messages are overridden due to the placement of the ngMessagesInclude directive.
	    *
	    * @usage
	    * ```html
	    * <!-- using attribute directives -->
	    * <ANY ng-messages="expression" role="alert">
	    *   <ANY ng-messages-include="remoteTplString">...</ANY>
	    * </ANY>
	    *
	    * <!-- or by using element directives -->
	    * <ng-messages for="expression" role="alert">
	    *   <ng-messages-include src="expressionValue1">...</ng-messages-include>
	    * </ng-messages>
	    * ```
	    *
	    * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.
	    *
	    * @param {string} ngMessagesInclude|src a string value corresponding to the remote template.
	    */
	   .directive('ngMessagesInclude',
	     ['$templateRequest', '$document', '$compile', function($templateRequest, $document, $compile) {

	     return {
	       restrict: 'AE',
	       require: '^^ngMessages', // we only require this for validation sake
	       link: function($scope, element, attrs) {
	         var src = attrs.ngMessagesInclude || attrs.src;
	         $templateRequest(src).then(function(html) {
	           $compile(html)($scope, function(contents) {
	             element.after(contents);

	             // the anchor is placed for debugging purposes
	             var anchor = jqLite($document[0].createComment(' ngMessagesInclude: ' + src + ' '));
	             element.after(anchor);

	             // we don't want to pollute the DOM anymore by keeping an empty directive element
	             element.remove();
	           });
	         });
	       }
	     };
	   }])

	   /**
	    * @ngdoc directive
	    * @name ngMessage
	    * @restrict AE
	    * @scope
	    *
	    * @description
	    * `ngMessage` is a directive with the purpose to show and hide a particular message.
	    * For `ngMessage` to operate, a parent `ngMessages` directive on a parent DOM element
	    * must be situated since it determines which messages are visible based on the state
	    * of the provided key/value map that `ngMessages` listens on.
	    *
	    * More information about using `ngMessage` can be found in the
	    * {@link module:ngMessages `ngMessages` module documentation}.
	    *
	    * @usage
	    * ```html
	    * <!-- using attribute directives -->
	    * <ANY ng-messages="expression" role="alert">
	    *   <ANY ng-message="stringValue">...</ANY>
	    *   <ANY ng-message="stringValue1, stringValue2, ...">...</ANY>
	    * </ANY>
	    *
	    * <!-- or by using element directives -->
	    * <ng-messages for="expression" role="alert">
	    *   <ng-message when="stringValue">...</ng-message>
	    *   <ng-message when="stringValue1, stringValue2, ...">...</ng-message>
	    * </ng-messages>
	    * ```
	    *
	    * @param {expression} ngMessage|when a string value corresponding to the message key.
	    */
	  .directive('ngMessage', ngMessageDirectiveFactory())


	   /**
	    * @ngdoc directive
	    * @name ngMessageExp
	    * @restrict AE
	    * @priority 1
	    * @scope
	    *
	    * @description
	    * `ngMessageExp` is a directive with the purpose to show and hide a particular message.
	    * For `ngMessageExp` to operate, a parent `ngMessages` directive on a parent DOM element
	    * must be situated since it determines which messages are visible based on the state
	    * of the provided key/value map that `ngMessages` listens on.
	    *
	    * @usage
	    * ```html
	    * <!-- using attribute directives -->
	    * <ANY ng-messages="expression">
	    *   <ANY ng-message-exp="expressionValue">...</ANY>
	    * </ANY>
	    *
	    * <!-- or by using element directives -->
	    * <ng-messages for="expression">
	    *   <ng-message when-exp="expressionValue">...</ng-message>
	    * </ng-messages>
	    * ```
	    *
	    * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.
	    *
	    * @param {expression} ngMessageExp|whenExp an expression value corresponding to the message key.
	    */
	  .directive('ngMessageExp', ngMessageDirectiveFactory());

	function ngMessageDirectiveFactory() {
	  return ['$animate', function($animate) {
	    return {
	      restrict: 'AE',
	      transclude: 'element',
	      priority: 1, // must run before ngBind, otherwise the text is set on the comment
	      terminal: true,
	      require: '^^ngMessages',
	      link: function(scope, element, attrs, ngMessagesCtrl, $transclude) {
	        var commentNode = element[0];

	        var records;
	        var staticExp = attrs.ngMessage || attrs.when;
	        var dynamicExp = attrs.ngMessageExp || attrs.whenExp;
	        var assignRecords = function(items) {
	          records = items
	              ? (isArray(items)
	                    ? items
	                    : items.split(/[\s,]+/))
	              : null;
	          ngMessagesCtrl.reRender();
	        };

	        if (dynamicExp) {
	          assignRecords(scope.$eval(dynamicExp));
	          scope.$watchCollection(dynamicExp, assignRecords);
	        } else {
	          assignRecords(staticExp);
	        }

	        var currentElement, messageCtrl;
	        ngMessagesCtrl.register(commentNode, messageCtrl = {
	          test: function(name) {
	            return contains(records, name);
	          },
	          attach: function() {
	            if (!currentElement) {
	              $transclude(scope, function(elm) {
	                $animate.enter(elm, null, element);
	                currentElement = elm;

	                // Each time we attach this node to a message we get a new id that we can match
	                // when we are destroying the node later.
	                var $$attachId = currentElement.$$attachId = ngMessagesCtrl.getAttachId();

	                // in the event that the parent element is destroyed
	                // by any other structural directive then it's time
	                // to deregister the message from the controller
	                currentElement.on('$destroy', function() {
	                  if (currentElement && currentElement.$$attachId === $$attachId) {
	                    ngMessagesCtrl.deregister(commentNode);
	                    messageCtrl.detach();
	                  }
	                });
	              });
	            }
	          },
	          detach: function() {
	            if (currentElement) {
	              var elm = currentElement;
	              currentElement = null;
	              $animate.leave(elm);
	            }
	          }
	        });
	      }
	    };
	  }];

	  function contains(collection, key) {
	    if (collection) {
	      return isArray(collection)
	          ? collection.indexOf(key) >= 0
	          : collection.hasOwnProperty(key);
	    }
	  }
	}


	})(window, window.angular);


/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(7);

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(33);

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	var Headroom = __webpack_require__(83);
	module.exports = Headroom ;



/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * headroom.js v0.9.3 - Give your page some headroom. Hide your header until you need it
	 * Copyright (c) 2016 Nick Williams - http://wicky.nillia.ms/headroom.js
	 * License: MIT
	 */

	(function(root, factory) {
	  'use strict';

	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  else if (typeof exports === 'object') {
	    // COMMONJS
	    module.exports = factory();
	  }
	  else {
	    // BROWSER
	    root.Headroom = factory();
	  }
	}(this, function() {
	  'use strict';

	  /* exported features */
	  
	  var features = {
	    bind : !!(function(){}.bind),
	    classList : 'classList' in document.documentElement,
	    rAF : !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
	  };
	  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
	  
	  /**
	   * Handles debouncing of events via requestAnimationFrame
	   * @see http://www.html5rocks.com/en/tutorials/speed/animations/
	   * @param {Function} callback The callback to handle whichever event
	   */
	  function Debouncer (callback) {
	    this.callback = callback;
	    this.ticking = false;
	  }
	  Debouncer.prototype = {
	    constructor : Debouncer,
	  
	    /**
	     * dispatches the event to the supplied callback
	     * @private
	     */
	    update : function() {
	      this.callback && this.callback();
	      this.ticking = false;
	    },
	  
	    /**
	     * ensures events don't get stacked
	     * @private
	     */
	    requestTick : function() {
	      if(!this.ticking) {
	        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
	        this.ticking = true;
	      }
	    },
	  
	    /**
	     * Attach this as the event listeners
	     */
	    handleEvent : function() {
	      this.requestTick();
	    }
	  };
	  /**
	   * Check if object is part of the DOM
	   * @constructor
	   * @param {Object} obj element to check
	   */
	  function isDOMElement(obj) {
	    return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
	  }
	  
	  /**
	   * Helper function for extending objects
	   */
	  function extend (object /*, objectN ... */) {
	    if(arguments.length <= 0) {
	      throw new Error('Missing arguments in extend function');
	    }
	  
	    var result = object || {},
	        key,
	        i;
	  
	    for (i = 1; i < arguments.length; i++) {
	      var replacement = arguments[i] || {};
	  
	      for (key in replacement) {
	        // Recurse into object except if the object is a DOM element
	        if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
	          result[key] = extend(result[key], replacement[key]);
	        }
	        else {
	          result[key] = result[key] || replacement[key];
	        }
	      }
	    }
	  
	    return result;
	  }
	  
	  /**
	   * Helper function for normalizing tolerance option to object format
	   */
	  function normalizeTolerance (t) {
	    return t === Object(t) ? t : { down : t, up : t };
	  }
	  
	  /**
	   * UI enhancement for fixed headers.
	   * Hides header when scrolling down
	   * Shows header when scrolling up
	   * @constructor
	   * @param {DOMElement} elem the header element
	   * @param {Object} options options for the widget
	   */
	  function Headroom (elem, options) {
	    options = extend(options, Headroom.options);
	  
	    this.lastKnownScrollY = 0;
	    this.elem             = elem;
	    this.tolerance        = normalizeTolerance(options.tolerance);
	    this.classes          = options.classes;
	    this.offset           = options.offset;
	    this.scroller         = options.scroller;
	    this.initialised      = false;
	    this.onPin            = options.onPin;
	    this.onUnpin          = options.onUnpin;
	    this.onTop            = options.onTop;
	    this.onNotTop         = options.onNotTop;
	    this.onBottom         = options.onBottom;
	    this.onNotBottom      = options.onNotBottom;
	  }
	  Headroom.prototype = {
	    constructor : Headroom,
	  
	    /**
	     * Initialises the widget
	     */
	    init : function() {
	      if(!Headroom.cutsTheMustard) {
	        return;
	      }
	  
	      this.debouncer = new Debouncer(this.update.bind(this));
	      this.elem.classList.add(this.classes.initial);
	  
	      // defer event registration to handle browser 
	      // potentially restoring previous scroll position
	      setTimeout(this.attachEvent.bind(this), 100);
	  
	      return this;
	    },
	  
	    /**
	     * Unattaches events and removes any classes that were added
	     */
	    destroy : function() {
	      var classes = this.classes;
	  
	      this.initialised = false;
	      this.elem.classList.remove(classes.unpinned, classes.pinned, classes.top, classes.notTop, classes.initial);
	      this.scroller.removeEventListener('scroll', this.debouncer, false);
	    },
	  
	    /**
	     * Attaches the scroll event
	     * @private
	     */
	    attachEvent : function() {
	      if(!this.initialised){
	        this.lastKnownScrollY = this.getScrollY();
	        this.initialised = true;
	        this.scroller.addEventListener('scroll', this.debouncer, false);
	  
	        this.debouncer.handleEvent();
	      }
	    },
	    
	    /**
	     * Unpins the header if it's currently pinned
	     */
	    unpin : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
	        classList.add(classes.unpinned);
	        classList.remove(classes.pinned);
	        this.onUnpin && this.onUnpin.call(this);
	      }
	    },
	  
	    /**
	     * Pins the header if it's currently unpinned
	     */
	    pin : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(classList.contains(classes.unpinned)) {
	        classList.remove(classes.unpinned);
	        classList.add(classes.pinned);
	        this.onPin && this.onPin.call(this);
	      }
	    },
	  
	    /**
	     * Handles the top states
	     */
	    top : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.top)) {
	        classList.add(classes.top);
	        classList.remove(classes.notTop);
	        this.onTop && this.onTop.call(this);
	      }
	    },
	  
	    /**
	     * Handles the not top state
	     */
	    notTop : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.notTop)) {
	        classList.add(classes.notTop);
	        classList.remove(classes.top);
	        this.onNotTop && this.onNotTop.call(this);
	      }
	    },
	  
	    bottom : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.bottom)) {
	        classList.add(classes.bottom);
	        classList.remove(classes.notBottom);
	        this.onBottom && this.onBottom.call(this);
	      }
	    },
	  
	    /**
	     * Handles the not top state
	     */
	    notBottom : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.notBottom)) {
	        classList.add(classes.notBottom);
	        classList.remove(classes.bottom);
	        this.onNotBottom && this.onNotBottom.call(this);
	      }
	    },
	  
	    /**
	     * Gets the Y scroll position
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
	     * @return {Number} pixels the page has scrolled along the Y-axis
	     */
	    getScrollY : function() {
	      return (this.scroller.pageYOffset !== undefined)
	        ? this.scroller.pageYOffset
	        : (this.scroller.scrollTop !== undefined)
	          ? this.scroller.scrollTop
	          : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	    },
	  
	    /**
	     * Gets the height of the viewport
	     * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
	     * @return {int} the height of the viewport in pixels
	     */
	    getViewportHeight : function () {
	      return window.innerHeight
	        || document.documentElement.clientHeight
	        || document.body.clientHeight;
	    },
	  
	    /**
	     * Gets the physical height of the DOM element
	     * @param  {Object}  elm the element to calculate the physical height of which
	     * @return {int}     the physical height of the element in pixels
	     */
	    getElementPhysicalHeight : function (elm) {
	      return Math.max(
	        elm.offsetHeight,
	        elm.clientHeight
	      );
	    },
	  
	    /**
	     * Gets the physical height of the scroller element
	     * @return {int} the physical height of the scroller element in pixels
	     */
	    getScrollerPhysicalHeight : function () {
	      return (this.scroller === window || this.scroller === document.body)
	        ? this.getViewportHeight()
	        : this.getElementPhysicalHeight(this.scroller);
	    },
	  
	    /**
	     * Gets the height of the document
	     * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
	     * @return {int} the height of the document in pixels
	     */
	    getDocumentHeight : function () {
	      var body = document.body,
	        documentElement = document.documentElement;
	    
	      return Math.max(
	        body.scrollHeight, documentElement.scrollHeight,
	        body.offsetHeight, documentElement.offsetHeight,
	        body.clientHeight, documentElement.clientHeight
	      );
	    },
	  
	    /**
	     * Gets the height of the DOM element
	     * @param  {Object}  elm the element to calculate the height of which
	     * @return {int}     the height of the element in pixels
	     */
	    getElementHeight : function (elm) {
	      return Math.max(
	        elm.scrollHeight,
	        elm.offsetHeight,
	        elm.clientHeight
	      );
	    },
	  
	    /**
	     * Gets the height of the scroller element
	     * @return {int} the height of the scroller element in pixels
	     */
	    getScrollerHeight : function () {
	      return (this.scroller === window || this.scroller === document.body)
	        ? this.getDocumentHeight()
	        : this.getElementHeight(this.scroller);
	    },
	  
	    /**
	     * determines if the scroll position is outside of document boundaries
	     * @param  {int}  currentScrollY the current y scroll position
	     * @return {bool} true if out of bounds, false otherwise
	     */
	    isOutOfBounds : function (currentScrollY) {
	      var pastTop  = currentScrollY < 0,
	        pastBottom = currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
	      
	      return pastTop || pastBottom;
	    },
	  
	    /**
	     * determines if the tolerance has been exceeded
	     * @param  {int} currentScrollY the current scroll y position
	     * @return {bool} true if tolerance exceeded, false otherwise
	     */
	    toleranceExceeded : function (currentScrollY, direction) {
	      return Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance[direction];
	    },
	  
	    /**
	     * determine if it is appropriate to unpin
	     * @param  {int} currentScrollY the current y scroll position
	     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
	     * @return {bool} true if should unpin, false otherwise
	     */
	    shouldUnpin : function (currentScrollY, toleranceExceeded) {
	      var scrollingDown = currentScrollY > this.lastKnownScrollY,
	        pastOffset = currentScrollY >= this.offset;
	  
	      return scrollingDown && pastOffset && toleranceExceeded;
	    },
	  
	    /**
	     * determine if it is appropriate to pin
	     * @param  {int} currentScrollY the current y scroll position
	     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
	     * @return {bool} true if should pin, false otherwise
	     */
	    shouldPin : function (currentScrollY, toleranceExceeded) {
	      var scrollingUp  = currentScrollY < this.lastKnownScrollY,
	        pastOffset = currentScrollY <= this.offset;
	  
	      return (scrollingUp && toleranceExceeded) || pastOffset;
	    },
	  
	    /**
	     * Handles updating the state of the widget
	     */
	    update : function() {
	      var currentScrollY  = this.getScrollY(),
	        scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
	        toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);
	  
	      if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
	        return;
	      }
	  
	      if (currentScrollY <= this.offset ) {
	        this.top();
	      } else {
	        this.notTop();
	      }
	  
	      if(currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
	        this.bottom();
	      }
	      else {
	        this.notBottom();
	      }
	  
	      if(this.shouldUnpin(currentScrollY, toleranceExceeded)) {
	        this.unpin();
	      }
	      else if(this.shouldPin(currentScrollY, toleranceExceeded)) {
	        this.pin();
	      }
	  
	      this.lastKnownScrollY = currentScrollY;
	    }
	  };
	  /**
	   * Default options
	   * @type {Object}
	   */
	  Headroom.options = {
	    tolerance : {
	      up : 0,
	      down : 0
	    },
	    offset : 0,
	    scroller: window,
	    classes : {
	      pinned : 'headroom--pinned',
	      unpinned : 'headroom--unpinned',
	      top : 'headroom--top',
	      notTop : 'headroom--not-top',
	      bottom : 'headroom--bottom',
	      notBottom : 'headroom--not-bottom',
	      initial : 'headroom'
	    }
	  };
	  Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

	  return Headroom;
	}));

/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(17);

/***/ },

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(4);

/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	__webpack_require__(60);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(65);
	__webpack_require__(91);
	__webpack_require__(64);
	//require('ng_sanitize_lib') ;
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(238);
	__webpack_require__(242);
	var Headroom = __webpack_require__(82);
	var app = angular.module('app', ['ngMessages', 'app.services', 'app.controllers', 'app.directives']);

	/*app.config(['growlProvider', function(growlProvider) {
		growlProvider.globalTimeToLive(3000);
	}]);*/
	/**页面加载完毕之后启动angualr**/
	module.exports = {
		init: function init() {
			angular.element(document).ready(function () {
				angular.bootstrap(document, ['app']);
			});

			//初始化headroom插件
			var $myheader = $('#myheader');
			var headroom = new Headroom($myheader[0]);
			headroom.init();
		}
	};
	//}) ;

/***/ },

/***/ 236:
/***/ function(module, exports) {

	'use strict';

	//define(function(require, exports, module) {
	var app = angular.module('app.services', []);
	app.factory('FormData', function () {
	    return {
	        requestType: '', /*请求类型*/
	        requestTypeShow: '',
	        salesDate: '', /*销售地日期*/
	        pointOfSaleLocation: '', /*销售地*/
	        publicObjectType: '', /*发布对象类型*/
	        publicObjectCode: '', /*发布对象代码*/
	        departureAirportCode: '', /*始发地*/
	        arrivalAirportCode: '', /*目的地*/
	        departureDateTime: '', /*起飞时间*/
	        arrivalDateTime: '', /*到达时间*/
	        resBookDesigCode: '', /*市场方RBD*/
	        flightNumber: '', /*市场方航班号*/
	        marketingAirlineCode: '', /*市场方航空公司*/
	        operatingCarrierRBD: '', /*承运方RBD*/
	        operatingFlightNumber: '', /*承运方航班号*/
	        operatingAirlineCode: '', /*承运方航空公司*/
	        equipmentCode: '', /*机型*/
	        cabin: '', /*舱位等级*/
	        carrierCode: '', /*常旅客积分所在航司*/
	        frequentFlyerStatus: '', /*常旅客等级*/
	        mileage: '', /*里程数--界面上OC和ABR共用字段显示，转成XML则：ABR用这个节点结构。【里程数】字段界面不显示，程序默认赋值99999.*/
	        passengerTypeCode: '', /*旅客类型*/
	        subCode: '', /*服务子代码*/
	        currencyCode: '', /*货币种类*/
	        seatCharacteristics: '', /*提前订座(可填多个，多个用 / 分隔)*/
	        listUpgradeInfo: [], /*升舱到子表list*/
	        listGeneralTicketInfo: [], /*通用券子表list*/
	        syscode: '', /*CRS/ICS(仅Abr)*/
	        channelID: '', /*渠道(仅Abr)*/
	        officeID: '', /*office号（仅Abr）*/
	        /*listFreeInformation:[],*/ /*免费行李子表list*/
	        freeAmount: '', /*免费行李额*/
	        freeUnit: '', /*免费行李额单位*/
	        listBaggages: [], /*收费行李子表list*/
	        fareReference: '', /*基础运价 [美嘉航线]*/
	        filingAirlineCode: '', /*运价报备所在航司[美嘉航线]*/
	        departureAirportCode2: '', /*始发地[美嘉航线]*/
	        arrivalAirportCode2: '' /*目的地[美嘉航线]*/
	    };
	});
	app.factory('ShowHideTbStatus', function () {
	    return {
	        listUpgradeInfo: true,
	        listGeneralTicketInfo: false,
	        listBaggages: true
	    };
	});

	/*页面元素是否必填的状态**/
	app.factory('InputRequiredStatus', function () {
	    return {
	        salesDate: false, /*销售地日期*/
	        pointOfSaleLocation: false, /*销售地*/
	        departureAirportCode: false, /*始发地*/
	        arrivalAirportCode: false, /*目的地*/
	        marketingAirlineCode: false, /*市场方航空公司*/
	        resBookDesigCode: false,
	        cabin: false, /*舱位等级*/
	        carrierCode: false, /*常旅客积分所在航司*/
	        frequentFlyerStatus: false, /*常旅客等级*/
	        subCode: false, /*服务子代码*/
	        seatCharacteristics: false, /*提前订座(可填多个，多个用 / 分隔)*/
	        listUpgradeInfo: false, /*升舱到*/
	        listBaggages: false /*收费行李*/
	    };
	});
	//}) ;

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module){ 
	var app = angular.module('app.services');
	var util = __webpack_require__(70);
	// $q 是内置服务，所以可以直接使用  //HttpOperService//S7EditService
	app.factory('HttpOperService', ['$http', '$q', function ($http, $q) {
		return {
			get4JSONData: function get4JSONData(url) {
				var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行  
				$http({ method: 'GET', url: url }).success(function (data, status, headers, config) {
					deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了  
				}).error(function (data, status, headers, config) {
					deferred.reject(data); // 声明执行失败，即服务器返回错误  
				});
				return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
			},
			post4JSONData: function post4JSONData(url, queryParam, config) {
				var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行  
				var tmpCfg = {};
				if (config != null) {
					tmpCfg = config;
				}
				var csrfInfo = util.getCSRFInfo();
				tmpCfg = $.extend(tmpCfg, csrfInfo);
				$http({ method: 'POST', url: url, data: queryParam, params: tmpCfg }).success(function (data, status, headers, config) {
					deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了  
				}).error(function (data, status, headers, config) {
					deferred.reject(data); // 声明执行失败，即服务器返回错误  
				});
				return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
			}
		};
	}]);
	//}) ;

/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	var app = angular.module('app.controllers', []);
	var _ = __webpack_require__(74);
	var moment = __webpack_require__(95);
	var Clipboard = __webpack_require__(239); //粘贴板
	var jsonData = __webpack_require__(241);

	var growlConfig = { info: { type: 'info', offset: { from: 'top', amount: 110 } },
	    danger: { type: 'danger', offset: { from: 'top', amount: 110 } },
	    success: { type: 'success', offset: { from: 'top', amount: 110 } } };
	var requestTypeJson = {
	    "座选": "TSKOC", "升舱": "TSKOC", "餐食": "TSKOC",
	    "贵宾休息室": "TSKOC", "优先登机": "TSKOC", "FareLock": "TSKOC",
	    "通用券": "TSKOC", "预付费行李": "P", "逾重行李": "C"
	};

	function changeInputStatus4Submit(data, myForm) {
	    var keys1 = _.keys(data);
	    var keys2 = _.keys(myForm);
	    _.each(keys2, function (item) {
	        if (_.contains(keys1, item)) {
	            myForm[item].$setDirty(true);
	        }
	    });
	}

	function simplePropCopy(obj, org) {
	    for (var name in org) {
	        obj[name] = angular.copy(org[name]);
	    }
	}
	/**
	 * <pre>
	 * 		功能描述:重置表单数据
	 * </pre>
	 */
	function resetForm(data, orgData, myForm) {
	    var keys = _.keys(data);
	    _.each(keys, function (key) {
	        if (!_.contains(['marketingAirlineCode'], key)) {
	            var oldValue = orgData[key];
	            if (_.isArray(oldValue) || _.isObject(oldValue)) {
	                data[key] = angular.copy(oldValue);
	            } else {
	                data[key] = oldValue;
	            }
	        }
	    });
	    myForm.$setPristine();
	}

	function manualValidate(formData) {
	    var flag = true;
	    var requestTypeShow = formData['requestTypeShow'];
	    if (requestTypeShow == '升舱') {
	        var listUpgradeInfo = formData['listUpgradeInfo'];
	        if (listUpgradeInfo.length == 0) {
	            flag = false;
	            $.bootstrapGrowl("升舱至少填写一条记录!", growlConfig.danger);
	        }
	    } else if (requestTypeShow == '预付费行李' || requestTypeShow == '逾重行李') {
	        var listBaggages = formData['listBaggages'];
	        if (listBaggages.length == 0) {
	            flag = false;
	            $.bootstrapGrowl("收费行李至少填写一条记录!", growlConfig.danger);
	        }
	    }
	    return flag;
	}

	app.controller('EditController', ['$scope', 'FormData', 'HttpOperService', 'ShowHideTbStatus', 'InputRequiredStatus', function ($scope, FormData, HttpOperService, ShowHideTbStatus, InputRequiredStatus) {
	    $scope.data = FormData;
	    $scope.orgData = angular.copy(FormData);
	    $scope.showHideStatus = ShowHideTbStatus;
	    //$scope.showDetailPanelFlag = false;
	    //项目目录
	    $scope.contextPath = $("#contextPath").val();
	    //console.info('contextPath : ' +  $scope.contextPath) ;
	    var carrCode = $("#carrCode").val(); //marketingAirlineCode
	    //市场方航空公司被固定，不可随意修改
	    $scope.data.marketingAirlineCode = carrCode;
	    //显示正在加载中的标志
	    $scope.showLoadingFlag = false;
	    //页面元素是否必填的状态
	    $scope.requiredStatus = InputRequiredStatus;
	    //验证结果存放
	    $scope.validateResultData = {
	        back: false,
	        requestXML: '',
	        singleDataFlag: false,
	        singleData: { amount: '', currency: '', sequenceNumber: '', code: '' },
	        multiDataFlag: false,
	        all: { amount: '', currency: '' },
	        listData: [],
	        showDetailPanelFlag: false
	    };

	    $scope.orgValidateResultData = angular.copy($scope.validateResultData);

	    window.onscroll = function () {
	        var top = document.documentElement.scrollTop || document.body.scrollTop;
	        if ($scope.validateResultData.showDetailPanelFlag) {
	            $scope.$apply(function () {
	                $scope.validateResultData.showDetailPanelFlag = false;
	            });
	        }
	    };
	    //返回之前页面
	    $scope.backPage = function (e) {
	        //console.info('back page ......') ;
	        window.location.href = $scope.contextPath + '/oc/toQueryS7UI.action';
	    };
	    //清空页面数据
	    $scope.resetPage = function (e) {
	        //console.info('reset page ......') ;
	        //growl.addSuccessMessage("重置页面数据成功!");
	        $.bootstrapGrowl("重置页面数据成功!", growlConfig.success);
	        simplePropCopy($scope.validateResultData, $scope.orgValidateResultData);
	        resetForm($scope.data, $scope.orgData, $scope.myForm);
	    };

	    //注册jquery validate框架
	    //对表单注册校验
	    var validator = $("#myForm").validate({ meta: "" });
	    //提交表单
	    $scope.submitPage = function () {
	        //如果上次的校验还没有返回的话，将不进行重复校验
	        if ($scope.showLoadingFlag) {
	            //growl.addInfoMessage("校验中，请不要重复点击校验!");
	            $.bootstrapGrowl("校验中，请不要重复点击校验!", growlConfig.info);
	            return;
	        }
	        //将之前的历史清除//隐藏xml复制
	        $scope.validateResultData.back = false;
	        var url = $scope.contextPath + "/validate/submitPage.action";
	        var ngFlag = $scope.myForm.$valid;
	        //将结校验结果init
	        simplePropCopy($scope.validateResultData, $scope.orgValidateResultData);
	        //$scope.showDetailPanelFlag = false;
	        //将页面上所有字段的dirty置为true
	        changeInputStatus4Submit($scope.data, $scope.myForm);
	        var jqFlag = validator.form();
	        var config = {};
	        var queryParam = $scope.data;
	        var manualFlag = false;
	        if (ngFlag && jqFlag) {
	            manualFlag = manualValidate($scope.data);
	        }
	        if (ngFlag && jqFlag && manualFlag) {
	            //加载loading图标
	            //$.isLoading(loadingDefaults);
	            $scope.showLoadingFlag = true;
	            var promise = HttpOperService.post4JSONData(url, queryParam, config);
	            promise.then(function (data) {
	                $scope.validateResultData.back = true;
	                var retFlag = data.flag;
	                //隐藏加载图标
	                //$.isLoading( "hide" );
	                $scope.showLoadingFlag = false;
	                $scope.validateResultData.requestXML = data.requestXML;
	                if (retFlag == true || retFlag == 'true') {
	                    var tmpFlag = false;
	                    if (data.singleDataFlag == true || data.singleDataFlag == 'true') {
	                        //growl.addSuccessMessage("验证返回单条信息成功!");
	                        $.bootstrapGrowl("验证返回单条信息成功!", growlConfig.success);
	                        $scope.validateResultData.singleDataFlag = true;
	                        $scope.validateResultData.singleData = data.feeInfo;
	                        tmpFlag = true;
	                    } else {
	                        $scope.validateResultData.singleDataFlag = false;
	                    }
	                    if (data.multiDataFlag == true || data.multiDataFlag == 'true') {
	                        //growl.addSuccessMessage("验证返回多条信息成功!");
	                        $.bootstrapGrowl("验证返回多条信息成功!", growlConfig.success);
	                        $scope.validateResultData.multiDataFlag = true;
	                        $scope.validateResultData.listData = data.listFeeInfo;
	                        $scope.validateResultData.all.amount = data.amount;
	                        $scope.validateResultData.all.currency = data.currency;
	                        tmpFlag = true;
	                    } else {
	                        $scope.validateResultData.multiDataFlag = false;
	                    }
	                    //既不是单条数据也不是多条数据
	                    if (!tmpFlag) {
	                        //growl.addErrorMessage("返回的数据格式不合法!");
	                        $.bootstrapGrowl("返回的数据格式不合法!", growlConfig.danger);
	                    }
	                } else {
	                    $scope.validateResultData.singleDataFlag = false;
	                    $scope.validateResultData.multiDataFlag = false;
	                    //growl.addErrorMessage("校验出错!");
	                    $.bootstrapGrowl("校验出错!", growlConfig.danger);
	                }
	            }, function (err) {
	                $scope.validateResultData.back = true;
	                //growl.addErrorMessage("校验出错!");
	                $.bootstrapGrowl("校验出错!", growlConfig.danger);
	            });
	        } else {
	            $.bootstrapGrowl("验证未通过，表单填写存在错误!", growlConfig.danger);
	        }
	    };
	    //常旅客等级，从数据库配置中读取
	    $scope.frequentFlyerStatusList = [];
	    //旅客类型，从数据库配置中读取
	    $scope.passengerTypeCodeList = [];
	    //当前日期
	    var currentDateTimeStr = moment().format('YYYY-MM-DD HH:mm');
	    //免费行李的显示与隐藏
	    $scope.showHideFreeBaggageFlag = false;
	    $scope.showHideFreeBaggage = function () {
	        $scope.showHideFreeBaggageFlag = !$scope.showHideFreeBaggageFlag;
	        if ($scope.showHideFreeBaggageFlag) {
	            //如果将变成隐藏
	            $scope.data.freeAmount = '';
	            $scope.data.freeUnit = '';
	        }
	    };

	    var initPageDataUrl = $scope.contextPath + "/validate/initPageData.action";
	    var promise = HttpOperService.get4JSONData(initPageDataUrl);
	    promise.then(function (data) {
	        //将日期控件填充为当前的时间
	        $scope.data.salesDate = currentDateTimeStr;
	        $scope.data.departureDateTime = currentDateTimeStr;
	        $scope.data.arrivalDateTime = currentDateTimeStr;
	        if (data.flag == 'true' || data.flag == true) {
	            $scope.frequentFlyerStatusList = data.frequentFlyerStatusList;
	            $scope.passengerTypeCodeList = data.passengerTypeCodeList;
	        } else {
	            //console.error('初始化页面数据出错...') ;
	            //growl.addErrorMessage("初始化页面数据出错...");
	            $.bootstrapGrowl("初始化页面数据出错!", growlConfig.danger);
	        }
	    }, function (err) {
	        //console.info(err) ;
	        //growl.addErrorMessage("获取初始化页面数据出错，请检查网络!");
	        $.bootstrapGrowl("获取初始化页面数据出错，请检查网络!", growlConfig.danger);
	    });
	    //当改变发布对象类型的时候
	    $scope.changePublicObjectType = function (type) {
	        if (type == '') {
	            $scope.data.publicObjectCode = '';
	        }
	    };
	    //切换服务类型时
	    $scope.changeServiceType = function (e) {
	        var requestTypeShow = $scope.data.requestTypeShow;
	        var requestType = requestTypeJson[requestTypeShow] || '';
	        resetForm($scope.data, $scope.orgData, $scope.myForm);
	        $scope.data.requestTypeShow = requestTypeShow;
	        $scope.data.requestType = requestType;
	        //当切换服务类型时页面上的时间不被清空
	        _.each(['salesDate', 'departureDateTime', 'arrivalDateTime'], function (item) {
	            $scope.data[item] = currentDateTimeStr;
	        });

	        var keys = _.keys(jsonData.required4RequestTypeShow);
	        //改变input的是否必填的状态
	        _.each(keys, function (key) {
	            var valArr = jsonData.required4RequestTypeShow[key];
	            //判断当前input元素是否必填
	            var containsFlag = _.contains(valArr, requestTypeShow);
	            $scope.requiredStatus[key] = containsFlag;
	        });
	    };
	    //复制请求xml数据到粘贴板上
	    //粘贴板部分代码
	    var clipboard = new Clipboard('.copyXML');
	    clipboard.on('success', function (e) {
	        $scope.$apply(function () {
	            //growl.addSuccessMessage("复制内容到粘贴板上成功!");
	            $.bootstrapGrowl("复制内容到粘贴板上成功!", growlConfig.success);
	        });
	        e.clearSelection();
	    });
	    clipboard.on('error', function (e) {
	        $scope.$apply(function () {
	            //growl.addErrorMessage("复制内容到粘贴板上失败!");
	            $.bootstrapGrowl("复制内容到粘贴板上失败!", growlConfig.danger);
	        });
	    });

	    //当表格的tr被点击时的操作
	    $scope.selectTr = function (event) {
	        $(event.target).parents('tr').siblings('tr').removeClass('selectTd');
	        $(event.target).parents('tr').addClass('selectTd');
	    };
	    //显示隐藏验证结果明细
	    $scope.showValidateResultDetail = function () {
	        $scope.validateResultData.showDetailPanelFlag = !$scope.validateResultData.showDetailPanelFlag;
	    };
	}]);
	//}) ;

/***/ },

/***/ 239:
/***/ function(module, exports, __webpack_require__) {

	var clipboard = __webpack_require__(240);
	module.exports = clipboard;


/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/*!
	 * clipboard.js v1.5.9
	 * https://zenorocha.github.io/clipboard.js
	 *
	 * Licensed MIT © Zeno Rocha
	 */
	(function(f){
		if(true){
		module.exports=f()
		}else if(typeof define==="function"&&define.amd){
			define([],f)
		}else{
			var g;
			if(typeof window!=="undefined"){
				g=window
			}else if(typeof global!=="undefined"){
				g=global
			}else if(typeof self!=="undefined"){
				g=self
			}else{
				g=this
			}
			g.Clipboard = f()
		}
	})(function(){
		var define,module,exports;
		return (function e(t,n,r){
			function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	var matches = require('matches-selector')

	module.exports = function (element, selector, checkYoSelf) {
	  var parent = checkYoSelf ? element : element.parentNode

	  while (parent && parent !== document) {
	    if (matches(parent, selector)) return parent;
	    parent = parent.parentNode
	  }
	}

	},{"matches-selector":5}],2:[function(require,module,exports){
	var closest = require('closest');

	/**
	 * Delegates event to a selector.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @param {Boolean} useCapture
	 * @return {Object}
	 */
	function delegate(element, selector, type, callback, useCapture) {
	    var listenerFn = listener.apply(this, arguments);

	    element.addEventListener(type, listenerFn, useCapture);

	    return {
	        destroy: function() {
	            element.removeEventListener(type, listenerFn, useCapture);
	        }
	    }
	}

	/**
	 * Finds closest match and invokes callback.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Function}
	 */
	function listener(element, selector, type, callback) {
	    return function(e) {
	        e.delegateTarget = closest(e.target, selector, true);

	        if (e.delegateTarget) {
	            callback.call(element, e);
	        }
	    }
	}

	module.exports = delegate;

	},{"closest":1}],3:[function(require,module,exports){
	/**
	 * Check if argument is a HTML element.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.node = function(value) {
	    return value !== undefined
	        && value instanceof HTMLElement
	        && value.nodeType === 1;
	};

	/**
	 * Check if argument is a list of HTML elements.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.nodeList = function(value) {
	    var type = Object.prototype.toString.call(value);

	    return value !== undefined
	        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
	        && ('length' in value)
	        && (value.length === 0 || exports.node(value[0]));
	};

	/**
	 * Check if argument is a string.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.string = function(value) {
	    return typeof value === 'string'
	        || value instanceof String;
	};

	/**
	 * Check if argument is a function.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.fn = function(value) {
	    var type = Object.prototype.toString.call(value);

	    return type === '[object Function]';
	};

	},{}],4:[function(require,module,exports){
	var is = require('./is');
	var delegate = require('delegate');

	/**
	 * Validates all params and calls the right
	 * listener function based on its target type.
	 *
	 * @param {String|HTMLElement|HTMLCollection|NodeList} target
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listen(target, type, callback) {
	    if (!target && !type && !callback) {
	        throw new Error('Missing required arguments');
	    }

	    if (!is.string(type)) {
	        throw new TypeError('Second argument must be a String');
	    }

	    if (!is.fn(callback)) {
	        throw new TypeError('Third argument must be a Function');
	    }

	    if (is.node(target)) {
	        return listenNode(target, type, callback);
	    }
	    else if (is.nodeList(target)) {
	        return listenNodeList(target, type, callback);
	    }
	    else if (is.string(target)) {
	        return listenSelector(target, type, callback);
	    }
	    else {
	        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
	    }
	}

	/**
	 * Adds an event listener to a HTML element
	 * and returns a remove listener function.
	 *
	 * @param {HTMLElement} node
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listenNode(node, type, callback) {
	    node.addEventListener(type, callback);

	    return {
	        destroy: function() {
	            node.removeEventListener(type, callback);
	        }
	    }
	}

	/**
	 * Add an event listener to a list of HTML elements
	 * and returns a remove listener function.
	 *
	 * @param {NodeList|HTMLCollection} nodeList
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listenNodeList(nodeList, type, callback) {
	    Array.prototype.forEach.call(nodeList, function(node) {
	        node.addEventListener(type, callback);
	    });

	    return {
	        destroy: function() {
	            Array.prototype.forEach.call(nodeList, function(node) {
	                node.removeEventListener(type, callback);
	            });
	        }
	    }
	}

	/**
	 * Add an event listener to a selector
	 * and returns a remove listener function.
	 *
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listenSelector(selector, type, callback) {
	    return delegate(document.body, selector, type, callback);
	}

	module.exports = listen;

	},{"./is":3,"delegate":2}],5:[function(require,module,exports){

	/**
	 * Element prototype.
	 */

	var proto = Element.prototype;

	/**
	 * Vendor function.
	 */

	var vendor = proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	/**
	 * Expose `match()`.
	 */

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}
	},{}],6:[function(require,module,exports){
	function select(element) {
	    var selectedText;

	    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
	        element.focus();
	        element.setSelectionRange(0, element.value.length);

	        selectedText = element.value;
	    }
	    else {
	        if (element.hasAttribute('contenteditable')) {
	            element.focus();
	        }

	        var selection = window.getSelection();
	        var range = document.createRange();

	        range.selectNodeContents(element);
	        selection.removeAllRanges();
	        selection.addRange(range);

	        selectedText = selection.toString();
	    }

	    return selectedText;
	}

	module.exports = select;

	},{}],7:[function(require,module,exports){
	function E () {
		// Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E.prototype = {
		on: function (name, callback, ctx) {
	    var e = this.e || (this.e = {});

	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });

	    return this;
	  },

	  once: function (name, callback, ctx) {
	    var self = this;
	    function listener () {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    };

	    listener._ = callback
	    return this.on(name, listener, ctx);
	  },

	  emit: function (name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;

	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }

	    return this;
	  },

	  off: function (name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];

	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	          liveEvents.push(evts[i]);
	      }
	    }

	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	    (liveEvents.length)
	      ? e[name] = liveEvents
	      : delete e[name];

	    return this;
	  }
	};

	module.exports = E;

	},{}],8:[function(require,module,exports){
	(function (global, factory) {
	    if (typeof define === "function" && define.amd) {
	        define(['module', 'select'], factory);
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('select'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.select);
	        global.clipboardAction = mod.exports;
	    }
	})(this, function (module, _select) {
	    'use strict';

	    var _select2 = _interopRequireDefault(_select);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	        return typeof obj;
	    } : function (obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	    };

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }

	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();

	    var ClipboardAction = function () {
	        /**
	         * @param {Object} options
	         */

	        function ClipboardAction(options) {
	            _classCallCheck(this, ClipboardAction);

	            this.resolveOptions(options);
	            this.initSelection();
	        }

	        /**
	         * Defines base properties passed from constructor.
	         * @param {Object} options
	         */


	        ClipboardAction.prototype.resolveOptions = function resolveOptions() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this.action = options.action;
	            this.emitter = options.emitter;
	            this.target = options.target;
	            this.text = options.text;
	            this.trigger = options.trigger;

	            this.selectedText = '';
	        };

	        ClipboardAction.prototype.initSelection = function initSelection() {
	            if (this.text && this.target) {
	                throw new Error('Multiple attributes declared, use either "target" or "text"');
	            } else if (this.text) {
	                this.selectFake();
	            } else if (this.target) {
	                this.selectTarget();
	            } else {
	                throw new Error('Missing required attributes, use either "target" or "text"');
	            }
	        };

	        ClipboardAction.prototype.selectFake = function selectFake() {
	            var _this = this;

	            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

	            this.removeFake();

	            this.fakeHandler = document.body.addEventListener('click', function () {
	                return _this.removeFake();
	            });

	            this.fakeElem = document.createElement('textarea');
	            // Prevent zooming on iOS
	            this.fakeElem.style.fontSize = '12pt';
	            // Reset box model
	            this.fakeElem.style.border = '0';
	            this.fakeElem.style.padding = '0';
	            this.fakeElem.style.margin = '0';
	            // Move element out of screen horizontally
	            this.fakeElem.style.position = 'fixed';
	            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
	            // Move element to the same position vertically
	            this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
	            this.fakeElem.setAttribute('readonly', '');
	            this.fakeElem.value = this.text;

	            document.body.appendChild(this.fakeElem);

	            this.selectedText = (0, _select2.default)(this.fakeElem);
	            this.copyText();
	        };

	        ClipboardAction.prototype.removeFake = function removeFake() {
	            if (this.fakeHandler) {
	                document.body.removeEventListener('click');
	                this.fakeHandler = null;
	            }

	            if (this.fakeElem) {
	                document.body.removeChild(this.fakeElem);
	                this.fakeElem = null;
	            }
	        };

	        ClipboardAction.prototype.selectTarget = function selectTarget() {
	            this.selectedText = (0, _select2.default)(this.target);
	            this.copyText();
	        };

	        ClipboardAction.prototype.copyText = function copyText() {
	            var succeeded = undefined;

	            try {
	                succeeded = document.execCommand(this.action);
	            } catch (err) {
	                succeeded = false;
	            }

	            this.handleResult(succeeded);
	        };

	        ClipboardAction.prototype.handleResult = function handleResult(succeeded) {
	            if (succeeded) {
	                this.emitter.emit('success', {
	                    action: this.action,
	                    text: this.selectedText,
	                    trigger: this.trigger,
	                    clearSelection: this.clearSelection.bind(this)
	                });
	            } else {
	                this.emitter.emit('error', {
	                    action: this.action,
	                    trigger: this.trigger,
	                    clearSelection: this.clearSelection.bind(this)
	                });
	            }
	        };

	        ClipboardAction.prototype.clearSelection = function clearSelection() {
	            if (this.target) {
	                this.target.blur();
	            }

	            window.getSelection().removeAllRanges();
	        };

	        ClipboardAction.prototype.destroy = function destroy() {
	            this.removeFake();
	        };

	        _createClass(ClipboardAction, [{
	            key: 'action',
	            set: function set() {
	                var action = arguments.length <= 0 || arguments[0] === undefined ? 'copy' : arguments[0];

	                this._action = action;

	                if (this._action !== 'copy' && this._action !== 'cut') {
	                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
	                }
	            },
	            get: function get() {
	                return this._action;
	            }
	        }, {
	            key: 'target',
	            set: function set(target) {
	                if (target !== undefined) {
	                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
	                        this._target = target;
	                    } else {
	                        throw new Error('Invalid "target" value, use a valid Element');
	                    }
	                }
	            },
	            get: function get() {
	                return this._target;
	            }
	        }]);

	        return ClipboardAction;
	    }();

	    module.exports = ClipboardAction;
	});

	},{"select":6}],9:[function(require,module,exports){
	(function (global, factory) {
	    if (typeof define === "function" && define.amd) {
	        define(['module', './clipboard-action', 'tiny-emitter', 'good-listener'], factory);
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
	        global.clipboard = mod.exports;
	    }
	})(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
	    'use strict';

	    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

	    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

	    var _goodListener2 = _interopRequireDefault(_goodListener);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }

	        return call && (typeof call === "object" || typeof call === "function") ? call : self;
	    }

	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	        }

	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }

	    var Clipboard = function (_Emitter) {
	        _inherits(Clipboard, _Emitter);

	        /**
	         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
	         * @param {Object} options
	         */

	        function Clipboard(trigger, options) {
	            _classCallCheck(this, Clipboard);

	            var _this = _possibleConstructorReturn(this, _Emitter.call(this));

	            _this.resolveOptions(options);
	            _this.listenClick(trigger);
	            return _this;
	        }

	        /**
	         * Defines if attributes would be resolved using internal setter functions
	         * or custom functions that were passed in the constructor.
	         * @param {Object} options
	         */


	        Clipboard.prototype.resolveOptions = function resolveOptions() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
	            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
	            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
	        };

	        Clipboard.prototype.listenClick = function listenClick(trigger) {
	            var _this2 = this;

	            this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
	                return _this2.onClick(e);
	            });
	        };

	        Clipboard.prototype.onClick = function onClick(e) {
	            var trigger = e.delegateTarget || e.currentTarget;

	            if (this.clipboardAction) {
	                this.clipboardAction = null;
	            }

	            this.clipboardAction = new _clipboardAction2.default({
	                action: this.action(trigger),
	                target: this.target(trigger),
	                text: this.text(trigger),
	                trigger: trigger,
	                emitter: this
	            });
	        };

	        Clipboard.prototype.defaultAction = function defaultAction(trigger) {
	            return getAttributeValue('action', trigger);
	        };

	        Clipboard.prototype.defaultTarget = function defaultTarget(trigger) {
	            var selector = getAttributeValue('target', trigger);

	            if (selector) {
	                return document.querySelector(selector);
	            }
	        };

	        Clipboard.prototype.defaultText = function defaultText(trigger) {
	            return getAttributeValue('text', trigger);
	        };

	        Clipboard.prototype.destroy = function destroy() {
	            this.listener.destroy();

	            if (this.clipboardAction) {
	                this.clipboardAction.destroy();
	                this.clipboardAction = null;
	            }
	        };

	        return Clipboard;
	    }(_tinyEmitter2.default);

	    /**
	     * Helper function to retrieve attribute value.
	     * @param {String} suffix
	     * @param {Element} element
	     */
	    function getAttributeValue(suffix, element) {
	        var attribute = 'data-clipboard-' + suffix;

	        if (!element.hasAttribute(attribute)) {
	            return;
	        }

	        return element.getAttribute(attribute);
	    }

	    module.exports = Clipboard;
	});

	},{"./clipboard-action":8,"good-listener":4,"tiny-emitter":7}]},{},[9])(9)
	});

/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		/*
	  * "座选","升舱","餐食","贵宾休息室","优先登机","预付费行李","逾重行李","FareLock","通用券"
	  */
		var jsonData = {
			required4RequestTypeShow: {
				salesDate: ["座选", "升舱", "餐食", "贵宾休息室", "优先登机", "预付费行李", "逾重行李"], /*销售地日期*/
				pointOfSaleLocation: ["座选", "升舱", "餐食", "贵宾休息室", "优先登机", "预付费行李", "逾重行李"], /*销售地*/
				departureAirportCode: ["座选", "升舱", "餐食", "贵宾休息室", "优先登机", "预付费行李", "逾重行李"], /*始发地*/
				arrivalAirportCode: ["座选", "升舱", "餐食", "贵宾休息室", "优先登机", "预付费行李", "逾重行李"], /*目的地*/
				marketingAirlineCode: ["座选", "升舱", "餐食", "贵宾休息室", "优先登机", "预付费行李", "逾重行李"], /*市场方航空公司*/
				cabin: ['升舱'], /*舱位等级*/
				resBookDesigCode: ["升舱"],
				carrierCode: ["座选"], /*常旅客积分所在航司*/
				frequentFlyerStatus: ["座选"], /*常旅客等级*/
				subCode: ["座选", "升舱", "餐食", "贵宾休息室", "优先登机"], /*服务子代码*/
				seatCharacteristics: ["座选"], /*提前订座(可填多个，多个用 / 分隔)*/
				listUpgradeInfo: ["升舱"], /*升舱到*/
				listBaggages: ["预付费行李", "逾重行李"] /*收费行李*/
			}
		};

		module.exports = jsonData;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	var util = __webpack_require__(70);
	var app = angular.module('app.directives', []);
	//var listUpgradeInfoHtml = require('./tpls/listUpgradeInfo.html') ;
	//var listGeneralTicketInfoHtml = require('./tpls/listGeneralTicketInfo.html') ;
	//var listFreeInformationHtml = require('./tpls/listFreeInformation.html') ;
	//var listBaggagesHtml = require('./tpls/listBaggages.html') ;


	app.directive('showHideTable', ['ShowHideTbStatus', function (ShowHideTbStatus) {
	    return {
	        restrict: 'E',
	        scope: {},
	        replace: true,
	        template: function template(elem, attrs) {
	            var tbname = attrs['tbname'];
	            var str = '<a href="javascript:void(0)" >' + '<span ng-show="!showHideStatus.' + tbname + '">显示表格</span>' + '<span ng-show="showHideStatus.' + tbname + '">收起表格</span>' + '</a>';
	            return str;
	        },
	        link: function link(scope, elem, attrs) {
	            scope.showHideStatus = ShowHideTbStatus;
	            var tbname = attrs['tbname'];
	            elem.bind('click', function () {
	                scope.$apply(function () {
	                    ShowHideTbStatus[tbname] = !scope.showHideStatus[tbname];
	                });
	            });
	        }
	    };
	}]);

	app.directive('addDelete', function () {
	    return {
	        restrict: 'E',
	        scope: { list: '=' },
	        replace: true,
	        template: function template(elem, attrs) {
	            var str = '<div class="table_footer">' + '<button type ="button" class="btn btn-success btn-sm add_line">增加一行</button>' + '<button type ="button" class="btn btn-default btn-sm delete_line">删除一行</button>' + '</div>';
	            return str;
	        },
	        link: function link(scope, elem, attrs) {
	            var tbname = attrs['tbname'];
	            elem.find('.add_line').bind('click', function (event) {
	                var obj = null;
	                if ('listUpgradeInfo' == tbname) {
	                    //升舱到--[McRbd,OcRbd,McCabin,OcCabin]
	                    obj = { mcRbd: '', ocRbd: '', mcCabin: '', ocCabin: '' };
	                } else if ('listGeneralTicketInfo' == tbname) {
	                    //通用券--[TotalTicketNumber,PassengerNumber]
	                    obj = { totalTicketNumber: '', passengerNumber: '' };
	                } else if ('listBaggages' == tbname) {
	                    //收费行李--[Weight,WeightUnit,Size,SizeUnit,SubCode]
	                    obj = { weight: '', weightUnit: 'KG', size: '', sizeUnit: 'LCM', subCode: '' };
	                }
	                if (obj != null) {
	                    scope.$apply(function () {
	                        scope.list.push(obj);
	                    });
	                }
	                //将刚添加的一行背景色改变
	                elem.prev().find('tr').removeClass('selectTd').last().addClass('selectTd');
	            });
	            elem.find('.delete_line').bind('click', function (event) {
	                var len = scope.list.length;
	                if (len >= 1) {
	                    var index = len - 1;
	                    elem.prev().find('tbody tr').each(function (i) {
	                        if ($(this).hasClass('selectTd')) {
	                            index = i;
	                            return false;
	                        }
	                    });
	                    console.info('删除第[' + index + ']条记录!');
	                    scope.$apply(function () {
	                        scope.list.splice(index, 1);
	                    });
	                }
	            });
	        }
	    };
	});

	//日期插件
	app.directive('datepicker', function () {
	    return {
	        restrict: 'A',
	        scope: {},
	        require: 'ngModel',
	        link: function link(scope, elem, attr, ctrl) {
	            if (!ctrl) return;
	            //配置日期控件
	            var optionObj = {};
	            optionObj.dateFormat = "yy-mm-dd";
	            var updateModel = function updateModel(dateText) {
	                scope.$apply(function () {
	                    //调用angular内部的工具更新双向绑定关系
	                    ctrl.$setViewValue(dateText);
	                });
	            };
	            optionObj.onSelect = function (dateText, picker) {
	                updateModel(dateText);
	                // elem.focus() ;
	                //调用jquery-validate框架校验输入框的输入
	                //validator.element(elem) ;
	                if (scope.select) {
	                    scope.$apply(function () {
	                        scope.select({ date: dateText });
	                    });
	                }
	            };
	            optionObj.showButtonPanel = true;
	            /*ctrl.$render = function(){
	             //console.info('这个方法好像只有在第一次加载的收执行.......') ;
	             //下面这段步骤1和步骤2千万不能弄混了，1必须在前面
	             //1.将后台ng-model中的数据填充到页面上
	             elem.datepicker('setDate',ctrl.$viewValue || '') ;//最后期发现是setDate的时候会根据最新的日期设置显示的页面上的html日期字符串
	             //2.下面写这个的原因是如果我们的日期控件设置了最小日期的话，当我们修改数据时，
	             //如果从数据库中读取的字段日期小于最小日期，datepicker会自动的将控件的日期设置为今天的日期,
	             //而这时angular并不知道，所有这里手动设置为页面上的html字符串,只有第一次加载时才可能出现这个问题
	             var viewView = ctrl.$viewValue ;
	             var textValue = $(elem).val() ;
	             if(viewView!=textValue){
	             ctrl.$setViewValue(textValue);
	             }
	             }*/
	            elem.datepicker(optionObj);
	        }
	    };
	});

	app.directive('datetimepicker', [function () {
	    return {
	        restrict: 'A',
	        scope: true,
	        require: '?ngModel',
	        link: function link(scope, iElement, iAttrs, ctrl) {
	            if (!ctrl) return;
	            //var currentDateTimeStr = iAttrs['datetimepicker'] ;
	            //配置日期控件
	            var optionObj = {};
	            optionObj.dateFormat = "yy-mm-dd";
	            optionObj.timeFormat = 'HH:mm';
	            var updateModel = function updateModel(dateText) {
	                scope.$apply(function () {
	                    //调用angular内部的工具更新双向绑定关系
	                    ctrl.$setViewValue(dateText);
	                });
	            };
	            optionObj.onSelect = function (dateText, picker) {
	                updateModel(dateText);
	                if (scope.select) {
	                    scope.$apply(function () {
	                        scope.select({ date: dateText });
	                    });
	                }
	            };
	            optionObj.timeText = "&nbsp;&nbsp;时间";
	            optionObj.hourText = "&nbsp;&nbsp;时";
	            optionObj.minuteText = "&nbsp;&nbsp;分";
	            //optionObj.secondText = "&nbsp;&nbsp;秒" ;
	            optionObj.currentText = "当前";
	            optionObj.closeText = "关闭";
	            optionObj.showButtonPanel = true;
	            //optionObj.showSecond = true ;
	            iElement.datetimepicker(optionObj);
	        }
	    };
	}]);

	app.directive("upperInput", function () {
	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: function link(scope, element, attrs, ngModel) {
	            if (!ngModel) return; // do nothing if no ng-model
	            // Specify how UI should be updated
	            ngModel.$render = function () {
	                var tmp = ngModel.$viewValue || '';
	                tmp = tmp.toUpperCase();
	                element.val(tmp);
	                ngModel.$setViewValue(tmp);
	            };
	            // Listen for change events to enable binding
	            element.bind('blur', function () {
	                scope.$apply(read);
	            });
	            //read(); // initialize
	            /// Write data to the model
	            function read() {
	                var tmp = ngModel.$viewValue || '';
	                tmp = tmp.toUpperCase();
	                ngModel.$setViewValue(tmp);
	                element.val(tmp);
	            }
	        }
	    };
	});

	//自定义校验(三字码)
	app.directive('threecode', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            ctrl.$parsers.push(function (viewValue) {
	                var flag = true;
	                if (viewValue != '') {
	                    if (!util.isThreecode(viewValue)) {
	                        flag = false;
	                    }
	                }
	                ctrl.$setValidity('threecode', flag);
	                return viewValue;
	            });
	        }
	    };
	});

	app.directive('air', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            ctrl.$parsers.push(function (viewValue) {
	                var flag = true;
	                if (viewValue != '') {
	                    if (!util.isAir(viewValue)) {
	                        flag = false;
	                    }
	                }
	                ctrl.$setValidity('air', flag);
	                return viewValue;
	            });
	        }
	    };
	});

	app.directive('integer', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            ctrl.$parsers.push(function (viewValue) {
	                var flag = true;
	                if (viewValue != '') {
	                    if (!util.isInteger(viewValue)) {
	                        flag = false;
	                    }
	                }
	                ctrl.$setValidity('integer', flag);
	                return viewValue;
	            });
	        }
	    };
	});

	//发布对象校验
	app.directive('pubt', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            ctrl.$validators.pubt = function (modelValue, viewValue) {
	                var curType = scope.data.publicObjectType;
	                var flag = true;
	                if (viewValue != '') {
	                    if (viewValue != undefined) {
	                        var len = viewValue.length;
	                        if (curType == 'T') {
	                            //不能超过6位长度
	                            if (len > 6) {
	                                flag = false;
	                            }
	                        }
	                    }
	                }
	                return flag;
	            };
	            attrs.$observe('pubt', function () {
	                ctrl.$validate();
	            });
	        }
	    };
	});

	app.directive('pubo', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            ctrl.$validators.pubo = function (modelValue, viewValue) {
	                var curType = scope.data.publicObjectType;
	                var flag = true;
	                if (viewValue != '') {
	                    if (viewValue != undefined) {
	                        var len = viewValue.length;
	                        if (curType != 'T') {
	                            //不能超过6位长度
	                            if (len > 8) {
	                                flag = false;
	                            }
	                        }
	                    }
	                }
	                return flag;
	            };
	            attrs.$observe('pubo', function () {
	                ctrl.$validate();
	            });
	        }
	    };
	});

	//发布对象校验
	/* app.directive('publicobj',function(){
	     return {
	         restrict:"A",
	         scope:true,
	         require:"ngModel",
	         link:function(scope,ele,attrs,ctrl){
	             ctrl.$parsers.push(function(viewValue){
	                 var curType = attrs['publicobj'] ;
	                 var len = viewValue.length ;
	                 if(curType=='T'){
	                     if(len>6){
	                         ctrl.$setValidity('length6',false);
	                     }else{
	                         ctrl.$setValidity('length6',true);
	                     }
	                     ctrl.$setValidity('length8',true);
	                 }else{
	                     if(len>8){
	                         ctrl.$setValidity('length8',false);
	                     }else{
	                         ctrl.$setValidity('length8',true);
	                     }
	                     ctrl.$setValidity('length6',true);
	                 }
	                 return viewValue;
	             });
	         }
	     }
	 });*/

	/* app.directive('publicobj',function(){
	 		
	 	
	 }) ;*/

	/*app.directive('linkTable',['ShowHideTbStatus',function (ShowHideTbStatus) {
	    return{
	        restrict:'E',
	        scope:{list:'='},
	        replace:true,
	        template: function (elem,attrs) {
	            var tbname = attrs['tbname'] ;
	            var str = '<a href="javascript:void(0)" >' +
	                '<span ng-show="!showHideStatus.'+tbname+'">自定义表格</span>' +
	                '<span ng-show="showHideStatus.'+tbname+'">取消自定义</span>' +
	                '</a>' ;
	            return str ;
	        },
	        link: function (scope,elem,attrs) {
	            scope.showHideStatus = ShowHideTbStatus ;
	            var tbname = attrs['tbname'] ;
	            elem.bind('click', function () {
	                var nextFlag = !scope.showHideStatus[tbname] ;
	                scope.$apply(function () {
	                    ShowHideTbStatus[tbname] =nextFlag;
	                    if(!nextFlag){//如果是取消自定义，则要清空表格数据
	                        scope.list = [] ;
	                    }
	                })
	            }) ;
	        }
	    } ;
	}]) ;*/
	//table子表
	/*app.directive('tableInfo',['ShowHideTbStatus',function (ShowHideTbStatus) {
	    return {
	        restrict:'E',
	        scope:{
	            list:'='
	        },
	        replace:true,
	        template: function (elem,attrs) {
	            var tbname = attrs['tbname'] ;
	            var tmpStr = '<div class = "table_layout" style="width:500px;">子表信息不符无法显示</div>' ;
	            if('listUpgradeInfo'==tbname){
	                tmpStr = listUpgradeInfoHtml ;
	            }else if('listGeneralTicketInfo'==tbname){
	                tmpStr = listGeneralTicketInfoHtml ;
	            }else if('listFreeInformation'==tbname){
	                tmpStr = listFreeInformationHtml ;
	            }else if('listBaggages'==tbname){
	                tmpStr = listBaggagesHtml ;
	            }
	            return tmpStr ;
	        },
	        controller: ['$scope','$element','$attrs',function ($scope,$element,$attrs) {
	            $scope.showHideStatus = ShowHideTbStatus ;
	            $scope.selectTr = function (event) {
	                $(event.target).parents('tr').siblings('tr').removeClass('selectTd')  ;
	                $(event.target).parents('tr').addClass('selectTd') ;
	            }
	        }],
	        link: function (scope,elem,attrs) {
	            var tbname = attrs['tbname'] ;
	            elem.find('.add_line').bind('click', function (event) {
	                var obj = null ;
	                var max = 100;
	                if('listUpgradeInfo'==tbname){//升舱到--[McRbd,OcRbd,McCabin,OcCabin]
	                    obj = {mcRbd:'',ocRbd:'',mcCabin:'',ocCabin:''} ;
	                }else if('listGeneralTicketInfo'==tbname){//通用券--[TotalTicketNumber,PassengerNumber]
	                    obj = {totalTicketNumber:'',passengerNumber:''} ;
	                }else if('listBaggages'==tbname){//收费行李--[Weight,WeightUnit,Size,SizeUnit,SubCode]
	                    obj = {weight:'',weightUnit:'',size:'',sizeUnit:'',subCode:''} ;
	                }
	                if(obj!=null){
	                    scope.$apply(function(){
	                        scope.list.push(obj) ;
	                    }) ;
	                }
	                //将刚添加的一行背景色改变
	                elem.find('tr').removeClass('selectTd').last().addClass('selectTd') ;
	            }) ;
	            elem.find('.delete_line').bind('click', function (event) {
	                var len = scope.list.length ;
	                if(len>=1){
	                    var index = len-1 ;
	                    elem.find('tbody tr').each(function (i) {
	                        if($(this).hasClass('selectTd') ){
	                            index = i ;
	                            return false ;
	                        };
	                    });
	                    console.info('删除第['+index+']条记录!') ;
	                    scope.$apply(function(){
	                        scope.list.splice(index,1) ;
	                    }) ;
	                }
	            }) ;
	        }
	    } ;
	}]) ;*/

	//}) ;

/***/ }

/******/ });