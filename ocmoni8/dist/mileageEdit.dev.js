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
	var main = __webpack_require__(90);
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

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	__webpack_require__(60);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(91);
	//require('jq_growl_lib') ;
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(96);
	__webpack_require__(97);
	var app = angular.module('app', ['ngMessages', 'app.service', 'app.controller', 'app.directive', 'app.validator']);
	/**页面加载完毕之后启动angualr**/
	module.exports = {
		init: function init() {
			angular.element(document).ready(function () {
				angular.bootstrap(document, ['app']);
			});
		}
	};
	//}) ;

/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(17);

/***/ },

/***/ 92:
/***/ function(module, exports) {

	'use strict';

	//define(function(require, exports, module) {
	var app = angular.module('app.service', []);
	app.factory('FormData', function () {
		return {
			id: '',
			action: '',
			carrCode: '', //航空公司
			contextPath: '',
			status: '1', //1:未生效的记录
			sequenceNumber: '', //序列号
			firstMaintenanceDate: '', //生效日期
			lastMaintenanceDate: '', //截止日期
			basicCurrencyUnit: '', //基准货币类型
			exchangeFactor: '', //兑换系数
			serviceType: '', //服务类型
			subCode: '', //服务子代码
			groupCode: '', //服务所在组
			frequentFlyerStatus: '', //常旅客等级
			geoSpecLoc1Type: '', //区域一类型
			geoSpecLoc1: '', //区域一代码
			geoSpecLoc2Type: '', //区域二类型
			geoSpecLoc2: '' //区域二代码
		};
	});
	//}) ;

/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module){ 
	var app = angular.module('app.service');
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

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	var app = angular.module('app.controller', []);
	var _ = __webpack_require__(74);
	var util = __webpack_require__(70);
	var moment = __webpack_require__(95);

	var dateTimeFormatStr = 'YYYY-MM-DD HH:mm';
	var dateFormatStr = "YYYY-MM-DD";
	var growlConfig = { info: { type: 'info', offset: { from: 'top', amount: 110 } },
		danger: { type: 'danger', offset: { from: 'top', amount: 110 } },
		success: { type: 'success', offset: { from: 'top', amount: 110 } } };

	function changeInputStatus4Submit(data, myForm) {
		var keys1 = _.keys(data);
		var keys2 = _.keys(myForm);
		_.each(keys2, function (item) {
			if (_.contains(keys1, item)) {
				myForm[item].$setDirty(true);
			}
		});
	}
	function convertVo2FormData(vo, formData) {
		for (var p in formData) {
			var flag = vo.hasOwnProperty(p);
			if (flag) {
				formData[p] = vo[p];
			}
		}
	}

	function resetFormData(targetObj, orgObj) {
		var keys = _.keys(orgObj);
		_.each(keys, function (key) {
			var val = orgObj[key];
			if (_.isArray(val)) {
				targetObj[key] = angular.copy(val);
			} else {
				targetObj[key] = val;
			}
		});
	}

	/*从list中选中第一条作为默认选中的值*/
	function _filterDefaultGroupCode(groupCodeList) {
		var groupCode = "";
		if (groupCodeList && groupCodeList.length > 0) {
			groupCode = groupCodeList[0]['value'] || "";
		}
		return groupCode;
	}

	function dealResult4Submit(targetObj, orgObj, myForm, HttpOperService) {
		var action = orgObj.action;
		var contextPath = $("#contextPath").val();
		if (action == 'add') {
			$.showTuiConfirmDialog2("保存成功,继续添加?", function () {
				resetFormData(targetObj, orgObj);
				myForm.$setPristine();
				var url = contextPath + "/mileage/getMaxSequenceNumberByCarrCode.action";
				//重新获取sequenceNum
				HttpOperService.get4JSONData(url).then(function (retData) {
					if (retData.flag == 'true') {
						var sequenceNumber = retData.sequenceNumber;
						targetObj.sequenceNumber = sequenceNumber;
					} else {
						$.bootstrapGrowl('获取序列号出错!', growlConfig.danger);
					}
				});
			}, function () {
				//返回查询页面
				window.location.href = contextPath + '/mileage/toMileageExchangeUI.action';
			});
		} else {
			//其他操作--比如修改
			$.bootstrapGrowl("保存成功，即将返回查询页面!", growlConfig.success);
			setTimeout(function () {
				window.location.href = contextPath + '/mileage/toMileageExchangeUI.action';
			}, 1500);
		}
	}

	app.controller('EditController', ['$scope', 'FormData', 'HttpOperService', function ($scope, FormData, HttpOperService) {
		$scope.data = FormData;
		//当前日期
		var currentDateTimeStr = moment().add('hour', 1).format("YYYY-MM-DD HH") + ":00";
		var currentDateStr = moment().format(dateFormatStr);
		$scope.currentDateStr = currentDateStr;
		var id = $("#id").val();
		var carrCode = $("#carrCode").val();
		var action = $("#action").val();
		var contextPath = $("#contextPath").val();
		FormData.id = id;
		FormData.action = action;
		FormData.carrCode = carrCode;
		FormData.contextPath = contextPath;
		if (action == 'add') {
			$scope.headerTipStr = "新增里程积分兑换";
			initPage4Add();
		} else if (action == 'update') {
			$scope.headerTipStr = "更新里程积分兑换";
			initPage4Update();
		}
		//这一步复制数据一定要放在基本数据初始化完毕以后，否则后面得基本数据无法使用
		$scope.orgData = angular.copy(FormData);
		$scope.orgData.firstMaintenanceDate = currentDateTimeStr;
		$scope.disabledEditFlag = false;
		//常旅客等级，从数据库配置中读取
		$scope.frequentFlyerStatusList = [];
		//服务所在组，从数据库配置中读取
		$scope.groupCodeList = [];

		function initPage4Add() {
			$scope.data.firstMaintenanceDate = currentDateTimeStr;
			$scope.data.lastMaintenanceDate = "";
			//console.info('初始化新增页面数据') ;
			// var carrCode = $scope.data.carrCode;
			var url = $scope.data.contextPath + "/mileage/initFormData.action";
			HttpOperService.get4JSONData(url).then(function (retData) {
				if (retData.flag == 'true' || retData.flag == true) {
					$scope.data.sequenceNumber = retData.sequenceNumber;
					$scope.frequentFlyerStatusList = retData.frequentFlyerStatusList;
					//retData.groupCodeList.splice(0, 0, {name:"选择",value:""});  
					$scope.groupCodeList = retData.groupCodeList;
					/*if(retData.frequentFlyerStatusList&&retData.frequentFlyerStatusList.length>0){
	    	$scope.data.frequentFlyerStatus = retData.frequentFlyerStatusList[0] ['value'];
	    }*/
					//var defaultGroupCode = _filterDefaultGroupCode(retData.groupCodeList) ;
					//$scope.data.groupCode = defaultGroupCode ;
					//原始数据也要同步更新
					//$scope.orgData.groupCode = defaultGroupCode ;
				} else {
					//growl.addErrorMessage("初始化页面出错!");
					//$.growl.error({ message: "初始化页面出错!" });
					$.bootstrapGrowl("初始化页面出错!", growlConfig.danger);
				}
			});
		}

		function initPage4Update() {
			//console.info('初始化修改页面数据') ;
			var url = $scope.data.contextPath + "/mileage/findMileageExchangeById.action?id=" + id;
			HttpOperService.get4JSONData(url).then(function (retData) {
				if (retData.flag == 'true' || retData.flag == true) {
					$scope.frequentFlyerStatusList = retData.frequentFlyerStatusList;
					$scope.groupCodeList = retData.groupCodeList;
					convertVo2FormData(retData.vo, $scope.data);
					//判断是否可以编辑页面
					var disabledEditFlag = util.checkMileageStatusIsDisabled($scope.data.status);
					$scope.disabledEditFlag = disabledEditFlag;
				} else {
					$.bootstrapGrowl("初始化页面出错!", growlConfig.danger);
				}
			}, function (err) {
				$.bootstrapGrowl("初始化页面出错!", growlConfig.danger);
			});
		}

		$scope.submitPage = function () {
			var serverURL = contextPath + "/mileage/saveMileageExchangeData.action";
			var ngFlag = $scope.myForm.$valid;
			changeInputStatus4Submit($scope.data, $scope.myForm);
			if (ngFlag) {
				$.showTuiConfirmDialog('保存?', function () {
					util.showLoading();
					var promise = HttpOperService.post4JSONData(serverURL, $scope.data, { "action": $scope.data.action });
					promise.then(function (retData) {
						util.hideLoading();
						if (retData.flag == true || retData.flag == 'true') {
							//保存数据成功后的业务逻辑处理//下一个任务使用下面的代码即可
							dealResult4Submit($scope.data, $scope.orgData, $scope.myForm, HttpOperService);
							/*$.bootstrapGrowl("保存成功，即将返回查询页面!",growlConfig.success) ;
	      		setTimeout(function() {
	      	window.location.href= $scope.data.contextPath+'/mileage/toMileageExchangeUI.action' ;
	      }, 1500);*/
						} else {
							$.bootstrapGrowl("保存数据出错!", growlConfig.danger);
						}
					}, function (err) {
						util.hideLoading();
						$.bootstrapGrowl("保存数据出错!", growlConfig.danger);
					});
				});
			}
		};

		//需求变更，屏蔽这两种行李类型,{"name":"逾重行李服务","value":"C"},{"name":"预付费行李服务","value":"P"}
		$scope.selectList = {
			"serviceTypeList": [{ "name": "选择", "value": "" }, { "name": "运价相关服务", "value": "F" }, { "name": "商品相关服务", "value": "M" }, { "name": "规则相关服务", "value": "R" }, { "name": "客票相关服务", "value": "T" }, { "name": "逾重行李服务", "value": "C" }, { "name": "预付费行李服务", "value": "P" }],
			"geoLocTypeList": [//区域集合
			{ "name": "请选择", "value": "" }, { "name": "大区", "value": "A" }, { "name": "城市", "value": "C" }, { "name": "国家", "value": "N" }, { "name": "机场", "value": "P" }, { "name": "州", "value": "S" }, { "name": "区域", "value": "Z" }]

		};
		$scope.backPage = function () {
			window.location.href = $scope.data.contextPath + '/mileage/toMileageExchangeUI.action';
		};

		$scope.changeGeoSpecLoc1Type = function () {
			$scope.data.geoSpecLoc1 = "";
		};

		$scope.changeGeoSpecLoc2Type = function () {
			$scope.data.geoSpecLoc2 = "";
		};
	}]);

	//}) ;

/***/ },

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(4);

/***/ },

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	var util = __webpack_require__(70);
	var _ = __webpack_require__(74);
	var app = angular.module('app.directive', []);

	app.directive('datetimepicker', [function () {
	    return {
	        restrict: 'A',
	        scope: true,
	        require: '?ngModel',
	        link: function link(scope, iElement, iAttrs, ctrl) {
	            if (!ctrl) return;
	            var minDateStr = iAttrs['datetimepicker'];
	            var minDate = new Date(minDateStr);
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
	            optionObj.minDate = minDate;
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
	            if (!ngModel) {
	                return;
	            }
	            ngModel.$render = function () {
	                var tmp = ngModel.$viewValue || '';
	                tmp = tmp.toUpperCase();
	                element.val(tmp);
	                ngModel.$setViewValue(tmp);
	            };
	            $(element).bind('blur', function () {
	                scope.$apply(read);
	            });
	            function read() {
	                var tmp = ngModel.$viewValue || '';
	                tmp = tmp.toUpperCase();
	                ngModel.$setViewValue(tmp);
	                element.val(tmp);
	            }
	        }
	    };
	});

	//区域长度限制
	app.directive('geoMaxLength', function () {
	    return {
	        restrict: 'AE',
	        replace: true,
	        scope: true,
	        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
	            $scope.getGeoLengthByType = function (type) {
	                type = type || "";
	                var obj = { 'A': '1', 'C': '3', 'N': '2', 'P': '3', 'S': '2', 'Z': '3' };
	                var len = eval("obj['" + type + "']") || 0;
	                return len;
	            };
	        }],
	        link: function link(scope, element, attrs) {
	            scope.$watch(attrs['geoMaxLength'], myWatchCallbackFunc);
	            function myWatchCallbackFunc() {
	                var geoMaxLength = attrs['geoMaxLength'];
	                var value = scope.$eval(geoMaxLength);
	                var len = scope.getGeoLengthByType(value);
	                element.attr('maxlength', len); //设置长度
	            }
	        }
	    };
	});

	//}) ;

/***/ },

/***/ 97:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	var util = __webpack_require__(70);
	var _ = __webpack_require__(74);
	var app = angular.module("app.validator", []);

	app.directive('datetimeoc', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.datetimeoc = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.isDateTimeOC(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

	app.directive('letterOrNum', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "?ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.letterOrNum = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.islettersOrNumber(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

	//positiveInteger(正整数不包括'0')
	app.directive('pint', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "?ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.pint = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.isPositiveInteger(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

	//nonNegativeInteger(包括‘0’)
	app.directive('nnint', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "?ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.nnint = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.isNonNegativeInteger(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

	//自定义校验(三字码)(必须为3位长度)
	app.directive('threecode2', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.threecode2 = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.isThreecode2(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

	app.directive('remoteValidate', ['HttpOperService', function (HttpOperService) {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "?ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$parsers.push(function (viewValue) {
	                if (viewValue != '') {
	                    var url = scope.data.contextPath + "/mileage/checkSequenceNumberNotExist.action";
	                    var param = { "id": scope.data.id, "sequcenceNumber": viewValue };
	                    var promise = HttpOperService.post4JSONData(url, param);
	                    promise.then(function (retData) {
	                        if (retData.flag == 'true') {
	                            if (retData.existFlag == 'true') {
	                                ctrl.$setValidity('remoteValidate', true);
	                            } else {
	                                ctrl.$setValidity('remoteValidate', false);
	                            }
	                        } else {
	                            ctrl.$setValidity('remoteValidate', false);
	                        }
	                    });
	                }
	                ctrl.$setValidity('remoteValidate', true);
	                return viewValue;
	            });
	        }
	    };
	}]);

	//biggerDate
	app.directive('biggerDateTime', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.biggerDateTime = function (modelValue, viewValue) {
	                var compareVal = attrs['biggerDateTime'];
	                if (viewValue != '' && compareVal != '') {
	                    return util.isBiggerDateTimeThan(viewValue, compareVal);
	                }
	                return true;
	            };
	            attrs.$observe('biggerDateTime', function () {
	                ctrl.$validate();
	            });
	        }
	    };
	});

	//smallerDate
	app.directive('smallerDateTime', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.smallerDateTime = function (modelValue, viewValue) {
	                var compareVal = attrs['smallerDateTime'];
	                if (viewValue != '' && compareVal != '') {
	                    return util.isSmallerDateTimeThan(viewValue, compareVal);
	                }
	                return true;
	            };
	            attrs.$observe('smallerDateTime', function () {
	                ctrl.$validate();
	            });
	        }
	    };
	});

	//biggerThanCurrent(disabled的控件不做校验)
	app.directive('biggerDateTimeCurrent', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.biggerDateTimeCurrent = function (modelValue, viewValue) {
	                //注意这里判断当前控件是否是不可编辑状态，
	                //如果属于不可编辑状态，则不判断大于当前日期
	                var status = scope.data.status;
	                if (viewValue != '' && !util.checkMileageStatusIsDisabled(status)) {
	                    return util.isBiggerDateTimeThanCurrent(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

	//biggerThanCurrent(disabled的控件也做校验)
	app.directive('biggerDateTimeCurrent2', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.biggerDateTimeCurrent2 = function (modelValue, viewValue) {
	                //注意这里判断当前控件是否是不可编辑状态，
	                //如果属于不可编辑状态，则不判断大于当前日期
	                var status = scope.data.status;
	                if (viewValue != '') {
	                    return util.isBiggerDateTimeThanCurrent(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

	app.directive('integer', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.integer = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.isInteger(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});
	//区域校验
	app.directive('geo', function () {
	    var obj = { 'A': 'areacode', 'C': 'citycode', 'N': 'countrycode', 'P': 'airportcode', 'S': 'statecode', 'Z': 'zonecode' };
	    var values = _.values(obj);
	    function resetAllSuccess(ctrl) {
	        _.each(values, function (item) {
	            ctrl.$setValidity(item, true);
	        });
	    }
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$parsers.push(function (viewValue) {
	                var flag = true;
	                var key = "";
	                if (viewValue != '') {
	                    var geoSpecLocType = attrs['geo'];
	                    key = obj[geoSpecLocType];
	                    flag = util.isValidGeoLocal(viewValue, geoSpecLocType);
	                }
	                resetAllSuccess(ctrl);
	                if (key != null && key.length > 0) {
	                    ctrl.$setValidity(key, flag);
	                }
	                return viewValue;
	            });

	            attrs.$observe('geo', function () {
	                var viewValue = ctrl.$viewValue;
	                var flag = true;
	                var key = "";
	                if (viewValue != '') {
	                    var geoSpecLocType = attrs['geo'];
	                    key = obj[geoSpecLocType];
	                    flag = util.isValidGeoLocal(viewValue, geoSpecLocType);
	                }
	                resetAllSuccess(ctrl);
	                if (key != null && key.length > 0) {
	                    ctrl.$setValidity(key, flag);
	                }
	            });
	        }
	    };
	});
	//}) ;

/***/ }

/******/ });