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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//引入项目依赖的所有css文件
	var main = __webpack_require__(107);
	main.init();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(27);

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = vendor_997f7dcf;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(31);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(29);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(20);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(14);

/***/ },
/* 66 */,
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	module.exports = 'ngMessages';


/***/ },
/* 68 */
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
/* 69 */,
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(7);

/***/ },
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(33);

/***/ },
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var Headroom = __webpack_require__(83);
	module.exports = Headroom ;



/***/ },
/* 83 */
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
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(17);

/***/ },
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(4);

/***/ },
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(25);

/***/ },
/* 100 */,
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(102);

/***/ },
/* 102 */
/***/ function(module, exports) {

	(function () {
		"use strict";
		/**
		 * Bindonce - Zero watches binding for AngularJs
		 * @version v0.3.1
		 * @link https://github.com/Pasvaz/bindonce
		 * @author Pasquale Vazzana <pasqualevazzana@gmail.com>
		 * @license MIT License, http://www.opensource.org/licenses/MIT
		 */

		var bindonceModule = angular.module('pasvaz.bindonce', []);

		bindonceModule.directive('bindonce', function ()
		{
			var toBoolean = function (value)
			{
				if (value && value.length !== 0)
				{
					var v = angular.lowercase("" + value);
					value = !(v === 'f' || v === '0' || v === 'false' || v === 'no' || v === 'n' || v === '[]');
				}
				else
				{
					value = false;
				}
				return value;
			};

			var msie = parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10);
			if (isNaN(msie))
			{
				msie = parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10);
			}

			var bindonceDirective =
			{
				restrict: "AM",
				controller: ['$scope', '$element', '$attrs', '$interpolate', function ($scope, $element, $attrs, $interpolate)
				{
					var showHideBinder = function (elm, attr, value)
					{
						var show = (attr === 'show') ? '' : 'none';
						var hide = (attr === 'hide') ? '' : 'none';
						elm.css('display', toBoolean(value) ? show : hide);
					};
					var classBinder = function (elm, value)
					{
						if (angular.isObject(value) && !angular.isArray(value))
						{
							var results = [];
							angular.forEach(value, function (value, index)
							{
								if (value) results.push(index);
							});
							value = results;
						}
						if (value)
						{
							elm.addClass(angular.isArray(value) ? value.join(' ') : value);
						}
					};

					var ctrl =
					{
						watcherRemover: undefined,
						binders: [],
						group: $attrs.boName,
						element: $element,
						ran: false,

						addBinder: function (binder)
						{
							this.binders.push(binder);

							// In case of late binding (when using the directive bo-name/bo-parent)
							// it happens only when you use nested bindonce, if the bo-children
							// are not dom children the linking can follow another order
							if (this.ran)
							{
								this.runBinders();
							}
						},

						setupWatcher: function (bindonceValue)
						{
							var that = this;
							this.watcherRemover = $scope.$watch(bindonceValue, function (newValue)
							{
								if (newValue === undefined) return;
								that.removeWatcher();
								that.runBinders();
							}, true);
						},

						removeWatcher: function ()
						{
							if (this.watcherRemover !== undefined)
							{
								this.watcherRemover();
								this.watcherRemover = undefined;
							}
						},

						runBinders: function ()
						{
							while (this.binders.length > 0)
							{
								var binder = this.binders.shift();
								if (this.group && this.group != binder.group) continue;
								var value = binder.scope.$eval((binder.interpolate) ? $interpolate(binder.value) : binder.value);
								switch (binder.attr)
								{
									case 'boIf':
										if (toBoolean(value))
										{
											binder.transclude(binder.scope.$new(), function (clone)
											{
												var parent = binder.element.parent();
												var afterNode = binder.element && binder.element[binder.element.length - 1];
												var parentNode = parent && parent[0] || afterNode && afterNode.parentNode;
												var afterNextSibling = (afterNode && afterNode.nextSibling) || null;
												angular.forEach(clone, function (node)
												{
													parentNode.insertBefore(node, afterNextSibling);
												});
											});
										}
										break;
									case 'boSwitch':
										var selectedTranscludes, switchCtrl = binder.controller[0];
										if ((selectedTranscludes = switchCtrl.cases['!' + value] || switchCtrl.cases['?']))
										{
											binder.scope.$eval(binder.attrs.change);
											angular.forEach(selectedTranscludes, function (selectedTransclude)
											{
												selectedTransclude.transclude(binder.scope.$new(), function (clone)
												{
													var parent = selectedTransclude.element.parent();
													var afterNode = selectedTransclude.element && selectedTransclude.element[selectedTransclude.element.length - 1];
													var parentNode = parent && parent[0] || afterNode && afterNode.parentNode;
													var afterNextSibling = (afterNode && afterNode.nextSibling) || null;
													angular.forEach(clone, function (node)
													{
														parentNode.insertBefore(node, afterNextSibling);
													});

												});
											});
										}
										break;
									case 'boSwitchWhen':
										var ctrl = binder.controller[0];
										ctrl.cases['!' + binder.attrs.boSwitchWhen] = (ctrl.cases['!' + binder.attrs.boSwitchWhen] || []);
										ctrl.cases['!' + binder.attrs.boSwitchWhen].push({ transclude: binder.transclude, element: binder.element });
										break;
									case 'boSwitchDefault':
										var ctrl = binder.controller[0];
										ctrl.cases['?'] = (ctrl.cases['?'] || []);
										ctrl.cases['?'].push({ transclude: binder.transclude, element: binder.element });
										break;
									case 'hide':
									case 'show':
										showHideBinder(binder.element, binder.attr, value);
										break;
									case 'class':
										classBinder(binder.element, value);
										break;
									case 'text':
										binder.element.text(value);
										break;
									case 'html':
										binder.element.html(value);
										break;
									case 'style':
										binder.element.css(value);
										break;
									case 'src':
										binder.element.attr(binder.attr, value);
										if (msie) binder.element.prop('src', value);
										break;
									case 'attr':
										angular.forEach(binder.attrs, function (attrValue, attrKey)
										{
											var newAttr, newValue;
											if (attrKey.match(/^boAttr./) && binder.attrs[attrKey])
											{
												newAttr = attrKey.replace(/^boAttr/, '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
												newValue = binder.scope.$eval(binder.attrs[attrKey]);
												binder.element.attr(newAttr, newValue);
											}
										});
										break;
									case 'href':
									case 'alt':
									case 'title':
									case 'id':
									case 'value':
										binder.element.attr(binder.attr, value);
										break;
								}
							}
							this.ran = true;
						}
					};

					return ctrl;
				}],

				link: function (scope, elm, attrs, bindonceController)
				{
					var value = (attrs.bindonce) ? scope.$eval(attrs.bindonce) : true;
					if (value !== undefined)
					{
						bindonceController.runBinders();
					}
					else
					{
						bindonceController.setupWatcher(attrs.bindonce);
						elm.bind("$destroy", bindonceController.removeWatcher);
					}
				}
			};

			return bindonceDirective;
		});

		angular.forEach(
		[
			{ directiveName: 'boShow', attribute: 'show' },
			{ directiveName: 'boHide', attribute: 'hide' },
			{ directiveName: 'boClass', attribute: 'class' },
			{ directiveName: 'boText', attribute: 'text' },
			{ directiveName: 'boBind', attribute: 'text' },
			{ directiveName: 'boHtml', attribute: 'html' },
			{ directiveName: 'boSrcI', attribute: 'src', interpolate: true },
			{ directiveName: 'boSrc', attribute: 'src' },
			{ directiveName: 'boHrefI', attribute: 'href', interpolate: true },
			{ directiveName: 'boHref', attribute: 'href' },
			{ directiveName: 'boAlt', attribute: 'alt' },
			{ directiveName: 'boTitle', attribute: 'title' },
			{ directiveName: 'boId', attribute: 'id' },
			{ directiveName: 'boStyle', attribute: 'style' },
			{ directiveName: 'boValue', attribute: 'value' },
			{ directiveName: 'boAttr', attribute: 'attr' },

			{ directiveName: 'boIf', transclude: 'element', terminal: true, priority: 1000 },
			{ directiveName: 'boSwitch', require: 'boSwitch', controller: function () { this.cases = {}; } },
			{ directiveName: 'boSwitchWhen', transclude: 'element', priority: 800, require: '^boSwitch', },
			{ directiveName: 'boSwitchDefault', transclude: 'element', priority: 800, require: '^boSwitch', }
		],
		function (boDirective)
		{
			var childPriority = 200;
			return bindonceModule.directive(boDirective.directiveName, function ()
			{
				var bindonceDirective =
				{
					priority: boDirective.priority || childPriority,
					transclude: boDirective.transclude || false,
					terminal: boDirective.terminal || false,
					require: ['^bindonce'].concat(boDirective.require || []),
					controller: boDirective.controller,
					compile: function (tElement, tAttrs, transclude)
					{
						return function (scope, elm, attrs, controllers)
						{
							var bindonceController = controllers[0];
							var name = attrs.boParent;
							if (name && bindonceController.group !== name)
							{
								var element = bindonceController.element.parent();
								bindonceController = undefined;
								var parentValue;

								while (element[0].nodeType !== 9 && element.length)
								{
									if ((parentValue = element.data('$bindonceController'))
										&& parentValue.group === name)
									{
										bindonceController = parentValue;
										break;
									}
									element = element.parent();
								}
								if (!bindonceController)
								{
									throw new Error("No bindonce controller: " + name);
								}
							}

							bindonceController.addBinder(
							{
								element: elm,
								attr: boDirective.attribute || boDirective.directiveName,
								attrs: attrs,
								value: attrs[boDirective.directiveName],
								interpolate: boDirective.interpolate,
								group: name,
								transclude: transclude,
								controller: controllers.slice(1),
								scope: scope
							});
						};
					}
				};

				return bindonceDirective;
			});
		})
	})();


/***/ },
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	//var pathStr = require.resolve('src/main') ;
	//console.info("path : " + pathStr) ;
	__webpack_require__(60);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(65);
	__webpack_require__(91);
	__webpack_require__(64);
	__webpack_require__(108);
	__webpack_require__(101);
	__webpack_require__(67);
	__webpack_require__(109);
	var Headroom = __webpack_require__(82);

	__webpack_require__(113);
	__webpack_require__(99);
	module.exports = {
		init: function init() {
			angular.element(document).ready(function () {
				angular.bootstrap(document, ['app']);
				pageLoadComplete();
			});
			//初始化headroom插件
			var $myheader = $('#myheader');
			var headroom = new Headroom($myheader[0]);
			headroom.init();
		}
	};

	function pageLoadComplete() {
		$("body").addClass("helper_background_color1");
		$("#loading").addClass('hidden');
		$("#EditMainBoxDiv").removeClass('hidden');
		$("#myheader").removeClass('hidden');
	}
	//});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(12);

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(110);

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * selectize.js (v0.12.1)
	 * Copyright (c) 2013–2015 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	/*jshint curly:false */
	/*jshint browser:true */

	(function(root, factory) {
		/*if (typeof define === 'function' && define.amd) {
			define(['jquery','sifter','microplugin'], factory);
		} else if (typeof exports === 'object') {
			module.exports = factory(
					require('jquery'), 
					require('sifter'), 
					require('microplugin')
					);
		} else {
			root.Selectize = factory(root.jQuery, root.Sifter, root.MicroPlugin);
		}*/
		module.exports = factory(
				jQuery, 
				__webpack_require__(111), 
				__webpack_require__(112)
				);
	}(this, function($, Sifter, MicroPlugin) {
		'use strict';

		var highlight = function($element, pattern) {
			if (typeof pattern === 'string' && !pattern.length) return;
			var regex = (typeof pattern === 'string') ? new RegExp(pattern, 'i') : pattern;
		
			var highlight = function(node) {
				var skip = 0;
				if (node.nodeType === 3) {
					var pos = node.data.search(regex);
					if (pos >= 0 && node.data.length > 0) {
						var match = node.data.match(regex);
						var spannode = document.createElement('span');
						spannode.className = 'highlight';
						var middlebit = node.splitText(pos);
						var endbit = middlebit.splitText(match[0].length);
						var middleclone = middlebit.cloneNode(true);
						spannode.appendChild(middleclone);
						middlebit.parentNode.replaceChild(spannode, middlebit);
						skip = 1;
					}
				} else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
					for (var i = 0; i < node.childNodes.length; ++i) {
						i += highlight(node.childNodes[i]);
					}
				}
				return skip;
			};
		
			return $element.each(function() {
				highlight(this);
			});
		};
		
		var MicroEvent = function() {};
		MicroEvent.prototype = {
			on: function(event, fct){
				this._events = this._events || {};
				this._events[event] = this._events[event] || [];
				this._events[event].push(fct);
			},
			off: function(event, fct){
				var n = arguments.length;
				if (n === 0) return delete this._events;
				if (n === 1) return delete this._events[event];
		
				this._events = this._events || {};
				if (event in this._events === false) return;
				this._events[event].splice(this._events[event].indexOf(fct), 1);
			},
			trigger: function(event /* , args... */){
				this._events = this._events || {};
				if (event in this._events === false) return;
				for (var i = 0; i < this._events[event].length; i++){
					this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
				}
			}
		};
		
		/**
		 * Mixin will delegate all MicroEvent.js function in the destination object.
		 *
		 * - MicroEvent.mixin(Foobar) will make Foobar able to use MicroEvent
		 *
		 * @param {object} the object which will support MicroEvent
		 */
		MicroEvent.mixin = function(destObject){
			var props = ['on', 'off', 'trigger'];
			for (var i = 0; i < props.length; i++){
				destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
			}
		};
		
		var IS_MAC        = /Mac/.test(navigator.userAgent);
		
		var KEY_A         = 65;
		var KEY_COMMA     = 188;
		var KEY_RETURN    = 13;
		var KEY_ESC       = 27;
		var KEY_LEFT      = 37;
		var KEY_UP        = 38;
		var KEY_P         = 80;
		var KEY_RIGHT     = 39;
		var KEY_DOWN      = 40;
		var KEY_N         = 78;
		var KEY_BACKSPACE = 8;
		var KEY_DELETE    = 46;
		var KEY_SHIFT     = 16;
		var KEY_CMD       = IS_MAC ? 91 : 17;
		var KEY_CTRL      = IS_MAC ? 18 : 17;
		var KEY_TAB       = 9;
		
		var TAG_SELECT    = 1;
		var TAG_INPUT     = 2;
		
		// for now, android support in general is too spotty to support validity
		var SUPPORTS_VALIDITY_API = !/android/i.test(window.navigator.userAgent) && !!document.createElement('form').validity;
		
		var isset = function(object) {
			return typeof object !== 'undefined';
		};
		
		/**
		 * Converts a scalar to its best string representation
		 * for hash keys and HTML attribute values.
		 *
		 * Transformations:
		 *   'str'     -> 'str'
		 *   null      -> ''
		 *   undefined -> ''
		 *   true      -> '1'
		 *   false     -> '0'
		 *   0         -> '0'
		 *   1         -> '1'
		 *
		 * @param {string} value
		 * @returns {string|null}
		 */
		var hash_key = function(value) {
			if (typeof value === 'undefined' || value === null) return null;
			if (typeof value === 'boolean') return value ? '1' : '0';
			return value + '';
		};
		
		/**
		 * Escapes a string for use within HTML.
		 *
		 * @param {string} str
		 * @returns {string}
		 */
		var escape_html = function(str) {
			return (str + '')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;');
		};
		
		/**
		 * Escapes "$" characters in replacement strings.
		 *
		 * @param {string} str
		 * @returns {string}
		 */
		var escape_replace = function(str) {
			return (str + '').replace(/\$/g, '$$$$');
		};
		
		var hook = {};
		
		/**
		 * Wraps `method` on `self` so that `fn`
		 * is invoked before the original method.
		 *
		 * @param {object} self
		 * @param {string} method
		 * @param {function} fn
		 */
		hook.before = function(self, method, fn) {
			var original = self[method];
			self[method] = function() {
				fn.apply(self, arguments);
				return original.apply(self, arguments);
			};
		};
		
		/**
		 * Wraps `method` on `self` so that `fn`
		 * is invoked after the original method.
		 *
		 * @param {object} self
		 * @param {string} method
		 * @param {function} fn
		 */
		hook.after = function(self, method, fn) {
			var original = self[method];
			self[method] = function() {
				var result = original.apply(self, arguments);
				fn.apply(self, arguments);
				return result;
			};
		};
		
		/**
		 * Wraps `fn` so that it can only be invoked once.
		 *
		 * @param {function} fn
		 * @returns {function}
		 */
		var once = function(fn) {
			var called = false;
			return function() {
				if (called) return;
				called = true;
				fn.apply(this, arguments);
			};
		};
		
		/**
		 * Wraps `fn` so that it can only be called once
		 * every `delay` milliseconds (invoked on the falling edge).
		 *
		 * @param {function} fn
		 * @param {int} delay
		 * @returns {function}
		 */
		var debounce = function(fn, delay) {
			var timeout;
			return function() {
				var self = this;
				var args = arguments;
				window.clearTimeout(timeout);
				timeout = window.setTimeout(function() {
					fn.apply(self, args);
				}, delay);
			};
		};
		
		/**
		 * Debounce all fired events types listed in `types`
		 * while executing the provided `fn`.
		 *
		 * @param {object} self
		 * @param {array} types
		 * @param {function} fn
		 */
		var debounce_events = function(self, types, fn) {
			var type;
			var trigger = self.trigger;
			var event_args = {};
		
			// override trigger method
			self.trigger = function() {
				var type = arguments[0];
				if (types.indexOf(type) !== -1) {
					event_args[type] = arguments;
				} else {
					return trigger.apply(self, arguments);
				}
			};
		
			// invoke provided function
			fn.apply(self, []);
			self.trigger = trigger;
		
			// trigger queued events
			for (type in event_args) {
				if (event_args.hasOwnProperty(type)) {
					trigger.apply(self, event_args[type]);
				}
			}
		};
		
		/**
		 * A workaround for http://bugs.jquery.com/ticket/6696
		 *
		 * @param {object} $parent - Parent element to listen on.
		 * @param {string} event - Event name.
		 * @param {string} selector - Descendant selector to filter by.
		 * @param {function} fn - Event handler.
		 */
		var watchChildEvent = function($parent, event, selector, fn) {
			$parent.on(event, selector, function(e) {
				var child = e.target;
				while (child && child.parentNode !== $parent[0]) {
					child = child.parentNode;
				}
				e.currentTarget = child;
				return fn.apply(this, [e]);
			});
		};
		
		/**
		 * Determines the current selection within a text input control.
		 * Returns an object containing:
		 *   - start
		 *   - length
		 *
		 * @param {object} input
		 * @returns {object}
		 */
		var getSelection = function(input) {
			var result = {};
			if ('selectionStart' in input) {
				result.start = input.selectionStart;
				result.length = input.selectionEnd - result.start;
			} else if (document.selection) {
				input.focus();
				var sel = document.selection.createRange();
				var selLen = document.selection.createRange().text.length;
				sel.moveStart('character', -input.value.length);
				result.start = sel.text.length - selLen;
				result.length = selLen;
			}
			return result;
		};
		
		/**
		 * Copies CSS properties from one element to another.
		 *
		 * @param {object} $from
		 * @param {object} $to
		 * @param {array} properties
		 */
		var transferStyles = function($from, $to, properties) {
			var i, n, styles = {};
			if (properties) {
				for (i = 0, n = properties.length; i < n; i++) {
					styles[properties[i]] = $from.css(properties[i]);
				}
			} else {
				styles = $from.css();
			}
			$to.css(styles);
		};
		
		/**
		 * Measures the width of a string within a
		 * parent element (in pixels).
		 *
		 * @param {string} str
		 * @param {object} $parent
		 * @returns {int}
		 */
		var measureString = function(str, $parent) {
			if (!str) {
				return 0;
			}
		
			var $test = $('<test>').css({
				position: 'absolute',
				top: -99999,
				left: -99999,
				width: 'auto',
				padding: 0,
				whiteSpace: 'pre'
			}).text(str).appendTo('body');
		
			transferStyles($parent, $test, [
				'letterSpacing',
				'fontSize',
				'fontFamily',
				'fontWeight',
				'textTransform'
			]);
		
			var width = $test.width();
			$test.remove();
		
			return width;
		};
		
		/**
		 * Sets up an input to grow horizontally as the user
		 * types. If the value is changed manually, you can
		 * trigger the "update" handler to resize:
		 *
		 * $input.trigger('update');
		 *
		 * @param {object} $input
		 */
		var autoGrow = function($input) {
			var currentWidth = null;
		
			var update = function(e, options) {
				var value, keyCode, printable, placeholder, width;
				var shift, character, selection;
				e = e || window.event || {};
				options = options || {};
		
				if (e.metaKey || e.altKey) return;
				if (!options.force && $input.data('grow') === false) return;
		
				value = $input.val();
				if (e.type && e.type.toLowerCase() === 'keydown') {
					keyCode = e.keyCode;
					printable = (
						(keyCode >= 97 && keyCode <= 122) || // a-z
						(keyCode >= 65 && keyCode <= 90)  || // A-Z
						(keyCode >= 48 && keyCode <= 57)  || // 0-9
						keyCode === 32 // space
					);
		
					if (keyCode === KEY_DELETE || keyCode === KEY_BACKSPACE) {
						selection = getSelection($input[0]);
						if (selection.length) {
							value = value.substring(0, selection.start) + value.substring(selection.start + selection.length);
						} else if (keyCode === KEY_BACKSPACE && selection.start) {
							value = value.substring(0, selection.start - 1) + value.substring(selection.start + 1);
						} else if (keyCode === KEY_DELETE && typeof selection.start !== 'undefined') {
							value = value.substring(0, selection.start) + value.substring(selection.start + 1);
						}
					} else if (printable) {
						shift = e.shiftKey;
						character = String.fromCharCode(e.keyCode);
						if (shift) character = character.toUpperCase();
						else character = character.toLowerCase();
						value += character;
					}
				}
		
				placeholder = $input.attr('placeholder');
				if (!value && placeholder) {
					value = placeholder;
				}
		
				width = measureString(value, $input) + 4;
				if (width !== currentWidth) {
					currentWidth = width;
					$input.width(width);
					$input.triggerHandler('resize');
				}
			};
		
			$input.on('keydown keyup update blur', update);
			update();
		};
		
		var Selectize = function($input, settings) {
			var key, i, n, dir, input, self = this;
			input = $input[0];
			input.selectize = self;
		
			// detect rtl environment
			var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
			dir = computedStyle ? computedStyle.getPropertyValue('direction') : input.currentStyle && input.currentStyle.direction;
			dir = dir || $input.parents('[dir]:first').attr('dir') || '';
		
			// setup default state
			$.extend(self, {
				order            : 0,
				settings         : settings,
				$input           : $input,
				tabIndex         : $input.attr('tabindex') || '',
				tagType          : input.tagName.toLowerCase() === 'select' ? TAG_SELECT : TAG_INPUT,
				rtl              : /rtl/i.test(dir),
		
				eventNS          : '.selectize' + (++Selectize.count),
				highlightedValue : null,
				isOpen           : false,
				isDisabled       : false,
				isRequired       : $input.is('[required]'),
				isInvalid        : false,
				isLocked         : false,
				isFocused        : false,
				isInputHidden    : false,
				isSetup          : false,
				isShiftDown      : false,
				isCmdDown        : false,
				isCtrlDown       : false,
				ignoreFocus      : false,
				ignoreBlur       : false,
				ignoreHover      : false,
				hasOptions       : false,
				currentResults   : null,
				lastValue        : '',
				caretPos         : 0,
				loading          : 0,
				loadedSearches   : {},
		
				$activeOption    : null,
				$activeItems     : [],
		
				optgroups        : {},
				options          : {},
				userOptions      : {},
				items            : [],
				renderCache      : {},
				onSearchChange   : settings.loadThrottle === null ? self.onSearchChange : debounce(self.onSearchChange, settings.loadThrottle)
			});
		
			// search system
			self.sifter = new Sifter(this.options, {diacritics: settings.diacritics});
		
			// build options table
			if (self.settings.options) {
				for (i = 0, n = self.settings.options.length; i < n; i++) {
					self.registerOption(self.settings.options[i]);
				}
				delete self.settings.options;
			}
		
			// build optgroup table
			if (self.settings.optgroups) {
				for (i = 0, n = self.settings.optgroups.length; i < n; i++) {
					self.registerOptionGroup(self.settings.optgroups[i]);
				}
				delete self.settings.optgroups;
			}
		
			// option-dependent defaults
			self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? 'single' : 'multi');
			if (typeof self.settings.hideSelected !== 'boolean') {
				self.settings.hideSelected = self.settings.mode === 'multi';
			}
		
			self.initializePlugins(self.settings.plugins);
			self.setupCallbacks();
			self.setupTemplates();
			self.setup();
		};
		
		// mixins
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		
		MicroEvent.mixin(Selectize);
		MicroPlugin.mixin(Selectize);
		
		// methods
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		
		$.extend(Selectize.prototype, {
		
			/**
			 * Creates all elements and sets up event bindings.
			 */
			setup: function() {
				var self      = this;
				var settings  = self.settings;
				var eventNS   = self.eventNS;
				var $window   = $(window);
				var $document = $(document);
				var $input    = self.$input;
		
				var $wrapper;
				var $control;
				var $control_input;
				var $dropdown;
				var $dropdown_content;
				var $dropdown_parent;
				var inputMode;
				var timeout_blur;
				var timeout_focus;
				var classes;
				var classes_plugins;
		
				inputMode         = self.settings.mode;
				classes           = $input.attr('class') || '';
		
				$wrapper          = $('<div>').addClass(settings.wrapperClass).addClass(classes).addClass(inputMode);
				$control          = $('<div>').addClass(settings.inputClass).addClass('items').appendTo($wrapper);
				$control_input    = $('<input type="text" autocomplete="off" />').appendTo($control).attr('tabindex', $input.is(':disabled') ? '-1' : self.tabIndex);
				$dropdown_parent  = $(settings.dropdownParent || $wrapper);
				$dropdown         = $('<div>').addClass(settings.dropdownClass).addClass(inputMode).hide().appendTo($dropdown_parent);
				$dropdown_content = $('<div>').addClass(settings.dropdownContentClass).appendTo($dropdown);
		
				if(self.settings.copyClassesToDropdown) {
					$dropdown.addClass(classes);
				}
		
				$wrapper.css({
					width: $input[0].style.width
				});
		
				if (self.plugins.names.length) {
					classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
					$wrapper.addClass(classes_plugins);
					$dropdown.addClass(classes_plugins);
				}
		
				if ((settings.maxItems === null || settings.maxItems > 1) && self.tagType === TAG_SELECT) {
					$input.attr('multiple', 'multiple');
				}
		
				if (self.settings.placeholder) {
					$control_input.attr('placeholder', settings.placeholder);
				}
		
				// if splitOn was not passed in, construct it from the delimiter to allow pasting universally
				if (!self.settings.splitOn && self.settings.delimiter) {
					var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
					self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
				}
		
				if ($input.attr('autocorrect')) {
					$control_input.attr('autocorrect', $input.attr('autocorrect'));
				}
		
				if ($input.attr('autocapitalize')) {
					$control_input.attr('autocapitalize', $input.attr('autocapitalize'));
				}
		
				self.$wrapper          = $wrapper;
				self.$control          = $control;
				self.$control_input    = $control_input;
				self.$dropdown         = $dropdown;
				self.$dropdown_content = $dropdown_content;
		
				$dropdown.on('mouseenter', '[data-selectable]', function() { return self.onOptionHover.apply(self, arguments); });
				$dropdown.on('mousedown click', '[data-selectable]', function() { return self.onOptionSelect.apply(self, arguments); });
				watchChildEvent($control, 'mousedown', '*:not(input)', function() { return self.onItemSelect.apply(self, arguments); });
				autoGrow($control_input);
		
				$control.on({
					mousedown : function() { return self.onMouseDown.apply(self, arguments); },
					click     : function() { return self.onClick.apply(self, arguments); }
				});
		
				$control_input.on({
					mousedown : function(e) { e.stopPropagation(); },
					keydown   : function() { return self.onKeyDown.apply(self, arguments); },
					keyup     : function() { return self.onKeyUp.apply(self, arguments); },
					keypress  : function() { return self.onKeyPress.apply(self, arguments); },
					resize    : function() { self.positionDropdown.apply(self, []); },
					blur      : function() { return self.onBlur.apply(self, arguments); },
					focus     : function() { self.ignoreBlur = false; return self.onFocus.apply(self, arguments); },
					paste     : function() { return self.onPaste.apply(self, arguments); }
				});
		
				$document.on('keydown' + eventNS, function(e) {
					self.isCmdDown = e[IS_MAC ? 'metaKey' : 'ctrlKey'];
					self.isCtrlDown = e[IS_MAC ? 'altKey' : 'ctrlKey'];
					self.isShiftDown = e.shiftKey;
				});
		
				$document.on('keyup' + eventNS, function(e) {
					if (e.keyCode === KEY_CTRL) self.isCtrlDown = false;
					if (e.keyCode === KEY_SHIFT) self.isShiftDown = false;
					if (e.keyCode === KEY_CMD) self.isCmdDown = false;
				});
		
				$document.on('mousedown' + eventNS, function(e) {
					if (self.isFocused) {
						// prevent events on the dropdown scrollbar from causing the control to blur
						if (e.target === self.$dropdown[0] || e.target.parentNode === self.$dropdown[0]) {
							return false;
						}
						// blur on click outside
						if (!self.$control.has(e.target).length && e.target !== self.$control[0]) {
							self.blur(e.target);
						}
					}
				});
		
				$window.on(['scroll' + eventNS, 'resize' + eventNS].join(' '), function() {
					if (self.isOpen) {
						self.positionDropdown.apply(self, arguments);
					}
				});
				$window.on('mousemove' + eventNS, function() {
					self.ignoreHover = false;
				});
		
				// store original children and tab index so that they can be
				// restored when the destroy() method is called.
				this.revertSettings = {
					$children : $input.children().detach(),
					tabindex  : $input.attr('tabindex')
				};
		
				$input.attr('tabindex', -1).hide().after(self.$wrapper);
		
				if ($.isArray(settings.items)) {
					self.setValue(settings.items);
					delete settings.items;
				}
		
				// feature detect for the validation API
				if (SUPPORTS_VALIDITY_API) {
					$input.on('invalid' + eventNS, function(e) {
						e.preventDefault();
						self.isInvalid = true;
						self.refreshState();
					});
				}
		
				self.updateOriginalInput();
				self.refreshItems();
				self.refreshState();
				self.updatePlaceholder();
				self.isSetup = true;
		
				if ($input.is(':disabled')) {
					self.disable();
				}
		
				self.on('change', this.onChange);
		
				$input.data('selectize', self);
				$input.addClass('selectized');
				self.trigger('initialize');
		
				// preload options
				if (settings.preload === true) {
					self.onSearchChange('');
				}
		
			},
		
			/**
			 * Sets up default rendering functions.
			 */
			setupTemplates: function() {
				var self = this;
				var field_label = self.settings.labelField;
				var field_optgroup = self.settings.optgroupLabelField;
		
				var templates = {
					'optgroup': function(data) {
						return '<div class="optgroup">' + data.html + '</div>';
					},
					'optgroup_header': function(data, escape) {
						return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
					},
					'option': function(data, escape) {
						return '<div class="option">' + escape(data[field_label]) + '</div>';
					},
					'item': function(data, escape) {
						return '<div class="item">' + escape(data[field_label]) + '</div>';
					},
					'option_create': function(data, escape) {
						return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
					}
				};
		
				self.settings.render = $.extend({}, templates, self.settings.render);
			},
		
			/**
			 * Maps fired events to callbacks provided
			 * in the settings used when creating the control.
			 */
			setupCallbacks: function() {
				var key, fn, callbacks = {
					'initialize'      : 'onInitialize',
					'change'          : 'onChange',
					'item_add'        : 'onItemAdd',
					'item_remove'     : 'onItemRemove',
					'clear'           : 'onClear',
					'option_add'      : 'onOptionAdd',
					'option_remove'   : 'onOptionRemove',
					'option_clear'    : 'onOptionClear',
					'optgroup_add'    : 'onOptionGroupAdd',
					'optgroup_remove' : 'onOptionGroupRemove',
					'optgroup_clear'  : 'onOptionGroupClear',
					'dropdown_open'   : 'onDropdownOpen',
					'dropdown_close'  : 'onDropdownClose',
					'type'            : 'onType',
					'load'            : 'onLoad',
					'focus'           : 'onFocus',
					'blur'            : 'onBlur'
				};
		
				for (key in callbacks) {
					if (callbacks.hasOwnProperty(key)) {
						fn = this.settings[callbacks[key]];
						if (fn) this.on(key, fn);
					}
				}
			},
		
			/**
			 * Triggered when the main control element
			 * has a click event.
			 *
			 * @param {object} e
			 * @return {boolean}
			 */
			onClick: function(e) {
				var self = this;
		
				// necessary for mobile webkit devices (manual focus triggering
				// is ignored unless invoked within a click event)
				if (!self.isFocused) {
					self.focus();
					e.preventDefault();
				}
			},
		
			/**
			 * Triggered when the main control element
			 * has a mouse down event.
			 *
			 * @param {object} e
			 * @return {boolean}
			 */
			onMouseDown: function(e) {
				var self = this;
				var defaultPrevented = e.isDefaultPrevented();
				var $target = $(e.target);
		
				if (self.isFocused) {
					// retain focus by preventing native handling. if the
					// event target is the input it should not be modified.
					// otherwise, text selection within the input won't work.
					if (e.target !== self.$control_input[0]) {
						if (self.settings.mode === 'single') {
							// toggle dropdown
							self.isOpen ? self.close() : self.open();
						} else if (!defaultPrevented) {
							self.setActiveItem(null);
						}
						return false;
					}
				} else {
					// give control focus
					if (!defaultPrevented) {
						window.setTimeout(function() {
							self.focus();
						}, 0);
					}
				}
			},
		
			/**
			 * Triggered when the value of the control has been changed.
			 * This should propagate the event to the original DOM
			 * input / select element.
			 */
			onChange: function() {
				this.$input.trigger('change');
			},
		
			/**
			 * Triggered on <input> paste.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onPaste: function(e) {
				var self = this;
				if (self.isFull() || self.isInputHidden || self.isLocked) {
					e.preventDefault();
				} else {
					// If a regex or string is included, this will split the pasted
					// input and create Items for each separate value
					if (self.settings.splitOn) {
						setTimeout(function() {
							var splitInput = $.trim(self.$control_input.val() || '').split(self.settings.splitOn);
							for (var i = 0, n = splitInput.length; i < n; i++) {
								self.createItem(splitInput[i]);
							}
						}, 0);
					}
				}
			},
		
			/**
			 * Triggered on <input> keypress.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyPress: function(e) {
				if (this.isLocked) return e && e.preventDefault();
				var character = String.fromCharCode(e.keyCode || e.which);
				if (this.settings.create && this.settings.mode === 'multi' && character === this.settings.delimiter) {
					this.createItem();
					e.preventDefault();
					return false;
				}
			},
		
			/**
			 * Triggered on <input> keydown.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyDown: function(e) {
				var isInput = e.target === this.$control_input[0];
				var self = this;
		
				if (self.isLocked) {
					if (e.keyCode !== KEY_TAB) {
						e.preventDefault();
					}
					return;
				}
		
				switch (e.keyCode) {
					case KEY_A:
						if (self.isCmdDown) {
							self.selectAll();
							return;
						}
						break;
					case KEY_ESC:
						if (self.isOpen) {
							e.preventDefault();
							e.stopPropagation();
							self.close();
						}
						return;
					case KEY_N:
						if (!e.ctrlKey || e.altKey) break;
					case KEY_DOWN:
						if (!self.isOpen && self.hasOptions) {
							self.open();
						} else if (self.$activeOption) {
							self.ignoreHover = true;
							var $next = self.getAdjacentOption(self.$activeOption, 1);
							if ($next.length) self.setActiveOption($next, true, true);
						}
						e.preventDefault();
						return;
					case KEY_P:
						if (!e.ctrlKey || e.altKey) break;
					case KEY_UP:
						if (self.$activeOption) {
							self.ignoreHover = true;
							var $prev = self.getAdjacentOption(self.$activeOption, -1);
							if ($prev.length) self.setActiveOption($prev, true, true);
						}
						e.preventDefault();
						return;
					case KEY_RETURN:
						if (self.isOpen && self.$activeOption) {
							self.onOptionSelect({currentTarget: self.$activeOption});
							e.preventDefault();
						}
						return;
					case KEY_LEFT:
						self.advanceSelection(-1, e);
						return;
					case KEY_RIGHT:
						self.advanceSelection(1, e);
						return;
					case KEY_TAB:
						if (self.settings.selectOnTab && self.isOpen && self.$activeOption) {
							self.onOptionSelect({currentTarget: self.$activeOption});
		
							// Default behaviour is to jump to the next field, we only want this
							// if the current field doesn't accept any more entries
							if (!self.isFull()) {
								e.preventDefault();
							}
						}
						if (self.settings.create && self.createItem()) {
							e.preventDefault();
						}
						return;
					case KEY_BACKSPACE:
					case KEY_DELETE:
						self.deleteSelection(e);
						return;
				}
		
				if ((self.isFull() || self.isInputHidden) && !(IS_MAC ? e.metaKey : e.ctrlKey)) {
					e.preventDefault();
					return;
				}
			},
		
			/**
			 * Triggered on <input> keyup.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyUp: function(e) {
				var self = this;
		
				if (self.isLocked) return e && e.preventDefault();
				var value = self.$control_input.val() || '';
				if (self.lastValue !== value) {
					self.lastValue = value;
					self.onSearchChange(value);
					self.refreshOptions();
					self.trigger('type', value);
				}
			},
		
			/**
			 * Invokes the user-provide option provider / loader.
			 *
			 * Note: this function is debounced in the Selectize
			 * constructor (by `settings.loadDelay` milliseconds)
			 *
			 * @param {string} value
			 */
			onSearchChange: function(value) {
				var self = this;
				var fn = self.settings.load;
				if (!fn) return;
				if (self.loadedSearches.hasOwnProperty(value)) return;
				self.loadedSearches[value] = true;
				self.load(function(callback) {
					fn.apply(self, [value, callback]);
				});
			},
		
			/**
			 * Triggered on <input> focus.
			 *
			 * @param {object} e (optional)
			 * @returns {boolean}
			 */
			onFocus: function(e) {
				var self = this;
				var wasFocused = self.isFocused;
		
				if (self.isDisabled) {
					self.blur();
					e && e.preventDefault();
					return false;
				}
		
				if (self.ignoreFocus) return;
				self.isFocused = true;
				if (self.settings.preload === 'focus') self.onSearchChange('');
		
				if (!wasFocused) self.trigger('focus');
		
				if (!self.$activeItems.length) {
					self.showInput();
					self.setActiveItem(null);
					self.refreshOptions(!!self.settings.openOnFocus);
				}
		
				self.refreshState();
			},
		
			/**
			 * Triggered on <input> blur.
			 *
			 * @param {object} e
			 * @param {Element} dest
			 */
			onBlur: function(e, dest) {
				var self = this;
				if (!self.isFocused) return;
				self.isFocused = false;
		
				if (self.ignoreFocus) {
					return;
				} else if (!self.ignoreBlur && document.activeElement === self.$dropdown_content[0]) {
					// necessary to prevent IE closing the dropdown when the scrollbar is clicked
					self.ignoreBlur = true;
					self.onFocus(e);
					return;
				}
		
				var deactivate = function() {
					self.close();
					self.setTextboxValue('');
					self.setActiveItem(null);
					self.setActiveOption(null);
					self.setCaret(self.items.length);
					self.refreshState();
		
					// IE11 bug: element still marked as active
					(dest || document.body).focus();
		
					self.ignoreFocus = false;
					self.trigger('blur');
				};
		
				self.ignoreFocus = true;
				if (self.settings.create && self.settings.createOnBlur) {
					self.createItem(null, false, deactivate);
				} else {
					deactivate();
				}
			},
		
			/**
			 * Triggered when the user rolls over
			 * an option in the autocomplete dropdown menu.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onOptionHover: function(e) {
				if (this.ignoreHover) return;
				this.setActiveOption(e.currentTarget, false);
			},
		
			/**
			 * Triggered when the user clicks on an option
			 * in the autocomplete dropdown menu.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onOptionSelect: function(e) {
				var value, $target, $option, self = this;
		
				if (e.preventDefault) {
					e.preventDefault();
					e.stopPropagation();
				}
		
				$target = $(e.currentTarget);
				if ($target.hasClass('create')) {
					self.createItem(null, function() {
						if (self.settings.closeAfterSelect) {
							self.close();
						}
					});
				} else {
					value = $target.attr('data-value');
					if (typeof value !== 'undefined') {
						self.lastQuery = null;
						self.setTextboxValue('');
						self.addItem(value);
						if (self.settings.closeAfterSelect) {
							self.close();
						} else if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
							self.setActiveOption(self.getOption(value));
						}
					}
				}
			},
		
			/**
			 * Triggered when the user clicks on an item
			 * that has been selected.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onItemSelect: function(e) {
				var self = this;
		
				if (self.isLocked) return;
				if (self.settings.mode === 'multi') {
					e.preventDefault();
					self.setActiveItem(e.currentTarget, e);
				}
			},
		
			/**
			 * Invokes the provided method that provides
			 * results to a callback---which are then added
			 * as options to the control.
			 *
			 * @param {function} fn
			 */
			load: function(fn) {
				var self = this;
				var $wrapper = self.$wrapper.addClass(self.settings.loadingClass);
		
				self.loading++;
				fn.apply(self, [function(results) {
					self.loading = Math.max(self.loading - 1, 0);
					if (results && results.length) {
						self.addOption(results);
						self.refreshOptions(self.isFocused && !self.isInputHidden);
					}
					if (!self.loading) {
						$wrapper.removeClass(self.settings.loadingClass);
					}
					self.trigger('load', results);
				}]);
			},
		
			/**
			 * Sets the input field of the control to the specified value.
			 *
			 * @param {string} value
			 */
			setTextboxValue: function(value) {
				var $input = this.$control_input;
				var changed = $input.val() !== value;
				if (changed) {
					$input.val(value).triggerHandler('update');
					this.lastValue = value;
				}
			},
		
			/**
			 * Returns the value of the control. If multiple items
			 * can be selected (e.g. <select multiple>), this returns
			 * an array. If only one item can be selected, this
			 * returns a string.
			 *
			 * @returns {mixed}
			 */
			getValue: function() {
				if (this.tagType === TAG_SELECT && this.$input.attr('multiple')) {
					return this.items;
				} else {
					return this.items.join(this.settings.delimiter);
				}
			},
		
			/**
			 * Resets the selected items to the given value.
			 *
			 * @param {mixed} value
			 */
			setValue: function(value, silent) {
				var events = silent ? [] : ['change'];
		
				debounce_events(this, events, function() {
					this.clear(silent);
					this.addItems(value, silent);
				});
			},
		
			/**
			 * Sets the selected item.
			 *
			 * @param {object} $item
			 * @param {object} e (optional)
			 */
			setActiveItem: function($item, e) {
				var self = this;
				var eventName;
				var i, idx, begin, end, item, swap;
				var $last;
		
				if (self.settings.mode === 'single') return;
				$item = $($item);
		
				// clear the active selection
				if (!$item.length) {
					$(self.$activeItems).removeClass('active');
					self.$activeItems = [];
					if (self.isFocused) {
						self.showInput();
					}
					return;
				}
		
				// modify selection
				eventName = e && e.type.toLowerCase();
		
				if (eventName === 'mousedown' && self.isShiftDown && self.$activeItems.length) {
					$last = self.$control.children('.active:last');
					begin = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$last[0]]);
					end   = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$item[0]]);
					if (begin > end) {
						swap  = begin;
						begin = end;
						end   = swap;
					}
					for (i = begin; i <= end; i++) {
						item = self.$control[0].childNodes[i];
						if (self.$activeItems.indexOf(item) === -1) {
							$(item).addClass('active');
							self.$activeItems.push(item);
						}
					}
					e.preventDefault();
				} else if ((eventName === 'mousedown' && self.isCtrlDown) || (eventName === 'keydown' && this.isShiftDown)) {
					if ($item.hasClass('active')) {
						idx = self.$activeItems.indexOf($item[0]);
						self.$activeItems.splice(idx, 1);
						$item.removeClass('active');
					} else {
						self.$activeItems.push($item.addClass('active')[0]);
					}
				} else {
					$(self.$activeItems).removeClass('active');
					self.$activeItems = [$item.addClass('active')[0]];
				}
		
				// ensure control has focus
				self.hideInput();
				if (!this.isFocused) {
					self.focus();
				}
			},
		
			/**
			 * Sets the selected item in the dropdown menu
			 * of available options.
			 *
			 * @param {object} $object
			 * @param {boolean} scroll
			 * @param {boolean} animate
			 */
			setActiveOption: function($option, scroll, animate) {
				var height_menu, height_item, y;
				var scroll_top, scroll_bottom;
				var self = this;
		
				if (self.$activeOption) self.$activeOption.removeClass('active');
				self.$activeOption = null;
		
				$option = $($option);
				if (!$option.length) return;
		
				self.$activeOption = $option.addClass('active');
		
				if (scroll || !isset(scroll)) {
		
					height_menu   = self.$dropdown_content.height();
					height_item   = self.$activeOption.outerHeight(true);
					scroll        = self.$dropdown_content.scrollTop() || 0;
					y             = self.$activeOption.offset().top - self.$dropdown_content.offset().top + scroll;
					scroll_top    = y;
					scroll_bottom = y - height_menu + height_item;
		
					if (y + height_item > height_menu + scroll) {
						self.$dropdown_content.stop().animate({scrollTop: scroll_bottom}, animate ? self.settings.scrollDuration : 0);
					} else if (y < scroll) {
						self.$dropdown_content.stop().animate({scrollTop: scroll_top}, animate ? self.settings.scrollDuration : 0);
					}
		
				}
			},
		
			/**
			 * Selects all items (CTRL + A).
			 */
			selectAll: function() {
				var self = this;
				if (self.settings.mode === 'single') return;
		
				self.$activeItems = Array.prototype.slice.apply(self.$control.children(':not(input)').addClass('active'));
				if (self.$activeItems.length) {
					self.hideInput();
					self.close();
				}
				self.focus();
			},
		
			/**
			 * Hides the input element out of view, while
			 * retaining its focus.
			 */
			hideInput: function() {
				var self = this;
		
				self.setTextboxValue('');
				self.$control_input.css({opacity: 0, position: 'absolute', left: self.rtl ? 10000 : -10000});
				self.isInputHidden = true;
			},
		
			/**
			 * Restores input visibility.
			 */
			showInput: function() {
				this.$control_input.css({opacity: 1, position: 'relative', left: 0});
				this.isInputHidden = false;
			},
		
			/**
			 * Gives the control focus.
			 */
			focus: function() {
				var self = this;
				if (self.isDisabled) return;
		
				self.ignoreFocus = true;
				self.$control_input[0].focus();
				window.setTimeout(function() {
					self.ignoreFocus = false;
					self.onFocus();
				}, 0);
			},
		
			/**
			 * Forces the control out of focus.
			 *
			 * @param {Element} dest
			 */
			blur: function(dest) {
				this.$control_input[0].blur();
				this.onBlur(null, dest);
			},
		
			/**
			 * Returns a function that scores an object
			 * to show how good of a match it is to the
			 * provided query.
			 *
			 * @param {string} query
			 * @param {object} options
			 * @return {function}
			 */
			getScoreFunction: function(query) {
				return this.sifter.getScoreFunction(query, this.getSearchOptions());
			},
		
			/**
			 * Returns search options for sifter (the system
			 * for scoring and sorting results).
			 *
			 * @see https://github.com/brianreavis/sifter.js
			 * @return {object}
			 */
			getSearchOptions: function() {
				var settings = this.settings;
				var sort = settings.sortField;
				if (typeof sort === 'string') {
					sort = [{field: sort}];
				}
		
				return {
					fields      : settings.searchField,
					conjunction : settings.searchConjunction,
					sort        : sort
				};
			},
		
			/**
			 * Searches through available options and returns
			 * a sorted array of matches.
			 *
			 * Returns an object containing:
			 *
			 *   - query {string}
			 *   - tokens {array}
			 *   - total {int}
			 *   - items {array}
			 *
			 * @param {string} query
			 * @returns {object}
			 */
			search: function(query) {
				var i, value, score, result, calculateScore;
				var self     = this;
				var settings = self.settings;
				var options  = this.getSearchOptions();
		
				// validate user-provided result scoring function
				if (settings.score) {
					calculateScore = self.settings.score.apply(this, [query]);
					if (typeof calculateScore !== 'function') {
						throw new Error('Selectize "score" setting must be a function that returns a function');
					}
				}
		
				// perform search
				if (query !== self.lastQuery) {
					self.lastQuery = query;
					result = self.sifter.search(query, $.extend(options, {score: calculateScore}));
					self.currentResults = result;
				} else {
					result = $.extend(true, {}, self.currentResults);
				}
		
				// filter out selected items
				if (settings.hideSelected) {
					for (i = result.items.length - 1; i >= 0; i--) {
						if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
							result.items.splice(i, 1);
						}
					}
				}
		
				return result;
			},
		
			/**
			 * Refreshes the list of available options shown
			 * in the autocomplete dropdown menu.
			 *
			 * @param {boolean} triggerDropdown
			 */
			refreshOptions: function(triggerDropdown) {
				var i, j, k, n, groups, groups_order, option, option_html, optgroup, optgroups, html, html_children, has_create_option;
				var $active, $active_before, $create;
		
				if (typeof triggerDropdown === 'undefined') {
					triggerDropdown = true;
				}
		
				var self              = this;
				var query             = $.trim(self.$control_input.val());
				var results           = self.search(query);
				var $dropdown_content = self.$dropdown_content;
				var active_before     = self.$activeOption && hash_key(self.$activeOption.attr('data-value'));
		
				// build markup
				n = results.items.length;
				if (typeof self.settings.maxOptions === 'number') {
					n = Math.min(n, self.settings.maxOptions);
				}
		
				// render and group available options individually
				groups = {};
				groups_order = [];
		
				for (i = 0; i < n; i++) {
					option      = self.options[results.items[i].id];
					option_html = self.render('option', option);
					optgroup    = option[self.settings.optgroupField] || '';
					optgroups   = $.isArray(optgroup) ? optgroup : [optgroup];
		
					for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
						optgroup = optgroups[j];
						if (!self.optgroups.hasOwnProperty(optgroup)) {
							optgroup = '';
						}
						if (!groups.hasOwnProperty(optgroup)) {
							groups[optgroup] = [];
							groups_order.push(optgroup);
						}
						groups[optgroup].push(option_html);
					}
				}
		
				// sort optgroups
				if (this.settings.lockOptgroupOrder) {
					groups_order.sort(function(a, b) {
						var a_order = self.optgroups[a].$order || 0;
						var b_order = self.optgroups[b].$order || 0;
						return a_order - b_order;
					});
				}
		
				// render optgroup headers & join groups
				html = [];
				for (i = 0, n = groups_order.length; i < n; i++) {
					optgroup = groups_order[i];
					if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].length) {
						// render the optgroup header and options within it,
						// then pass it to the wrapper template
						html_children = self.render('optgroup_header', self.optgroups[optgroup]) || '';
						html_children += groups[optgroup].join('');
						html.push(self.render('optgroup', $.extend({}, self.optgroups[optgroup], {
							html: html_children
						})));
					} else {
						html.push(groups[optgroup].join(''));
					}
				}
		
				$dropdown_content.html(html.join(''));
		
				// highlight matching terms inline
				if (self.settings.highlight && results.query.length && results.tokens.length) {
					for (i = 0, n = results.tokens.length; i < n; i++) {
						highlight($dropdown_content, results.tokens[i].regex);
					}
				}
		
				// add "selected" class to selected options
				if (!self.settings.hideSelected) {
					for (i = 0, n = self.items.length; i < n; i++) {
						self.getOption(self.items[i]).addClass('selected');
					}
				}
		
				// add create option
				has_create_option = self.canCreate(query);
				if (has_create_option) {
					$dropdown_content.prepend(self.render('option_create', {input: query}));
					$create = $($dropdown_content[0].childNodes[0]);
				}
		
				// activate
				self.hasOptions = results.items.length > 0 || has_create_option;
				if (self.hasOptions) {
					if (results.items.length > 0) {
						$active_before = active_before && self.getOption(active_before);
						if ($active_before && $active_before.length) {
							$active = $active_before;
						} else if (self.settings.mode === 'single' && self.items.length) {
							$active = self.getOption(self.items[0]);
						}
						if (!$active || !$active.length) {
							if ($create && !self.settings.addPrecedence) {
								$active = self.getAdjacentOption($create, 1);
							} else {
								$active = $dropdown_content.find('[data-selectable]:first');
							}
						}
					} else {
						$active = $create;
					}
					self.setActiveOption($active);
					if (triggerDropdown && !self.isOpen) { self.open(); }
				} else {
					self.setActiveOption(null);
					if (triggerDropdown && self.isOpen) { self.close(); }
				}
			},
		
			/**
			 * Adds an available option. If it already exists,
			 * nothing will happen. Note: this does not refresh
			 * the options list dropdown (use `refreshOptions`
			 * for that).
			 *
			 * Usage:
			 *
			 *   this.addOption(data)
			 *
			 * @param {object|array} data
			 */
			addOption: function(data) {
				var i, n, value, self = this;
		
				if ($.isArray(data)) {
					for (i = 0, n = data.length; i < n; i++) {
						self.addOption(data[i]);
					}
					return;
				}
		
				if (value = self.registerOption(data)) {
					self.userOptions[value] = true;
					self.lastQuery = null;
					self.trigger('option_add', value, data);
				}
			},
		
			/**
			 * Registers an option to the pool of options.
			 *
			 * @param {object} data
			 * @return {boolean|string}
			 */
			registerOption: function(data) {
				var key = hash_key(data[this.settings.valueField]);
				if (!key || this.options.hasOwnProperty(key)) return false;
				data.$order = data.$order || ++this.order;
				this.options[key] = data;
				return key;
			},
		
			/**
			 * Registers an option group to the pool of option groups.
			 *
			 * @param {object} data
			 * @return {boolean|string}
			 */
			registerOptionGroup: function(data) {
				var key = hash_key(data[this.settings.optgroupValueField]);
				if (!key) return false;
		
				data.$order = data.$order || ++this.order;
				this.optgroups[key] = data;
				return key;
			},
		
			/**
			 * Registers a new optgroup for options
			 * to be bucketed into.
			 *
			 * @param {string} id
			 * @param {object} data
			 */
			addOptionGroup: function(id, data) {
				data[this.settings.optgroupValueField] = id;
				if (id = this.registerOptionGroup(data)) {
					this.trigger('optgroup_add', id, data);
				}
			},
		
			/**
			 * Removes an existing option group.
			 *
			 * @param {string} id
			 */
			removeOptionGroup: function(id) {
				if (this.optgroups.hasOwnProperty(id)) {
					delete this.optgroups[id];
					this.renderCache = {};
					this.trigger('optgroup_remove', id);
				}
			},
		
			/**
			 * Clears all existing option groups.
			 */
			clearOptionGroups: function() {
				this.optgroups = {};
				this.renderCache = {};
				this.trigger('optgroup_clear');
			},
		
			/**
			 * Updates an option available for selection. If
			 * it is visible in the selected items or options
			 * dropdown, it will be re-rendered automatically.
			 *
			 * @param {string} value
			 * @param {object} data
			 */
			updateOption: function(value, data) {
				var self = this;
				var $item, $item_new;
				var value_new, index_item, cache_items, cache_options, order_old;
		
				value     = hash_key(value);
				value_new = hash_key(data[self.settings.valueField]);
		
				// sanity checks
				if (value === null) return;
				if (!self.options.hasOwnProperty(value)) return;
				if (typeof value_new !== 'string') throw new Error('Value must be set in option data');
		
				order_old = self.options[value].$order;
		
				// update references
				if (value_new !== value) {
					delete self.options[value];
					index_item = self.items.indexOf(value);
					if (index_item !== -1) {
						self.items.splice(index_item, 1, value_new);
					}
				}
				data.$order = data.$order || order_old;
				self.options[value_new] = data;
		
				// invalidate render cache
				cache_items = self.renderCache['item'];
				cache_options = self.renderCache['option'];
		
				if (cache_items) {
					delete cache_items[value];
					delete cache_items[value_new];
				}
				if (cache_options) {
					delete cache_options[value];
					delete cache_options[value_new];
				}
		
				// update the item if it's selected
				if (self.items.indexOf(value_new) !== -1) {
					$item = self.getItem(value);
					$item_new = $(self.render('item', data));
					if ($item.hasClass('active')) $item_new.addClass('active');
					$item.replaceWith($item_new);
				}
		
				// invalidate last query because we might have updated the sortField
				self.lastQuery = null;
		
				// update dropdown contents
				if (self.isOpen) {
					self.refreshOptions(false);
				}
			},
		
			/**
			 * Removes a single option.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			removeOption: function(value, silent) {
				var self = this;
				value = hash_key(value);
		
				var cache_items = self.renderCache['item'];
				var cache_options = self.renderCache['option'];
				if (cache_items) delete cache_items[value];
				if (cache_options) delete cache_options[value];
		
				delete self.userOptions[value];
				delete self.options[value];
				self.lastQuery = null;
				self.trigger('option_remove', value);
				self.removeItem(value, silent);
			},
		
			/**
			 * Clears all options.
			 */
			clearOptions: function() {
				var self = this;
		
				self.loadedSearches = {};
				self.userOptions = {};
				self.renderCache = {};
				self.options = self.sifter.items = {};
				self.lastQuery = null;
				self.trigger('option_clear');
				self.clear();
			},
		
			/**
			 * Returns the jQuery element of the option
			 * matching the given value.
			 *
			 * @param {string} value
			 * @returns {object}
			 */
			getOption: function(value) {
				return this.getElementWithValue(value, this.$dropdown_content.find('[data-selectable]'));
			},
		
			/**
			 * Returns the jQuery element of the next or
			 * previous selectable option.
			 *
			 * @param {object} $option
			 * @param {int} direction  can be 1 for next or -1 for previous
			 * @return {object}
			 */
			getAdjacentOption: function($option, direction) {
				var $options = this.$dropdown.find('[data-selectable]');
				var index    = $options.index($option) + direction;
		
				return index >= 0 && index < $options.length ? $options.eq(index) : $();
			},
		
			/**
			 * Finds the first element with a "data-value" attribute
			 * that matches the given value.
			 *
			 * @param {mixed} value
			 * @param {object} $els
			 * @return {object}
			 */
			getElementWithValue: function(value, $els) {
				value = hash_key(value);
		
				if (typeof value !== 'undefined' && value !== null) {
					for (var i = 0, n = $els.length; i < n; i++) {
						if ($els[i].getAttribute('data-value') === value) {
							return $($els[i]);
						}
					}
				}
		
				return $();
			},
		
			/**
			 * Returns the jQuery element of the item
			 * matching the given value.
			 *
			 * @param {string} value
			 * @returns {object}
			 */
			getItem: function(value) {
				return this.getElementWithValue(value, this.$control.children());
			},
		
			/**
			 * "Selects" multiple items at once. Adds them to the list
			 * at the current caret position.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			addItems: function(values, silent) {
				var items = $.isArray(values) ? values : [values];
				for (var i = 0, n = items.length; i < n; i++) {
					this.isPending = (i < n - 1);
					this.addItem(items[i], silent);
				}
			},
		
			/**
			 * "Selects" an item. Adds it to the list
			 * at the current caret position.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			addItem: function(value, silent) {
				var events = silent ? [] : ['change'];
		
				debounce_events(this, events, function() {
					var $item, $option, $options;
					var self = this;
					var inputMode = self.settings.mode;
					var i, active, value_next, wasFull;
					value = hash_key(value);
		
					if (self.items.indexOf(value) !== -1) {
						if (inputMode === 'single') self.close();
						return;
					}
		
					if (!self.options.hasOwnProperty(value)) return;
					if (inputMode === 'single') self.clear(silent);
					if (inputMode === 'multi' && self.isFull()) return;
		
					$item = $(self.render('item', self.options[value]));
					wasFull = self.isFull();
					self.items.splice(self.caretPos, 0, value);
					self.insertAtCaret($item);
					if (!self.isPending || (!wasFull && self.isFull())) {
						self.refreshState();
					}
		
					if (self.isSetup) {
						$options = self.$dropdown_content.find('[data-selectable]');
		
						// update menu / remove the option (if this is not one item being added as part of series)
						if (!self.isPending) {
							$option = self.getOption(value);
							value_next = self.getAdjacentOption($option, 1).attr('data-value');
							self.refreshOptions(self.isFocused && inputMode !== 'single');
							if (value_next) {
								self.setActiveOption(self.getOption(value_next));
							}
						}
		
						// hide the menu if the maximum number of items have been selected or no options are left
						if (!$options.length || self.isFull()) {
							self.close();
						} else {
							self.positionDropdown();
						}
		
						self.updatePlaceholder();
						self.trigger('item_add', value, $item);
						self.updateOriginalInput({silent: silent});
					}
				});
			},
		
			/**
			 * Removes the selected item matching
			 * the provided value.
			 *
			 * @param {string} value
			 */
			removeItem: function(value, silent) {
				var self = this;
				var $item, i, idx;
		
				$item = (typeof value === 'object') ? value : self.getItem(value);
				value = hash_key($item.attr('data-value'));
				i = self.items.indexOf(value);
		
				if (i !== -1) {
					$item.remove();
					if ($item.hasClass('active')) {
						idx = self.$activeItems.indexOf($item[0]);
						self.$activeItems.splice(idx, 1);
					}
		
					self.items.splice(i, 1);
					self.lastQuery = null;
					if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
						self.removeOption(value, silent);
					}
		
					if (i < self.caretPos) {
						self.setCaret(self.caretPos - 1);
					}
		
					self.refreshState();
					self.updatePlaceholder();
					self.updateOriginalInput({silent: silent});
					self.positionDropdown();
					self.trigger('item_remove', value, $item);
				}
			},
		
			/**
			 * Invokes the `create` method provided in the
			 * selectize options that should provide the data
			 * for the new item, given the user input.
			 *
			 * Once this completes, it will be added
			 * to the item list.
			 *
			 * @param {string} value
			 * @param {boolean} [triggerDropdown]
			 * @param {function} [callback]
			 * @return {boolean}
			 */
			createItem: function(input, triggerDropdown) {
				var self  = this;
				var caret = self.caretPos;
				input = input || $.trim(self.$control_input.val() || '');
		
				var callback = arguments[arguments.length - 1];
				if (typeof callback !== 'function') callback = function() {};
		
				if (typeof triggerDropdown !== 'boolean') {
					triggerDropdown = true;
				}
		
				if (!self.canCreate(input)) {
					callback();
					return false;
				}
		
				self.lock();
		
				var setup = (typeof self.settings.create === 'function') ? this.settings.create : function(input) {
					var data = {};
					data[self.settings.labelField] = input;
					data[self.settings.valueField] = input;
					return data;
				};
		
				var create = once(function(data) {
					self.unlock();
		
					if (!data || typeof data !== 'object') return callback();
					var value = hash_key(data[self.settings.valueField]);
					if (typeof value !== 'string') return callback();
		
					self.setTextboxValue('');
					self.addOption(data);
					self.setCaret(caret);
					self.addItem(value);
					self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
					callback(data);
				});
		
				var output = setup.apply(this, [input, create]);
				if (typeof output !== 'undefined') {
					create(output);
				}
		
				return true;
			},
		
			/**
			 * Re-renders the selected item lists.
			 */
			refreshItems: function() {
				this.lastQuery = null;
		
				if (this.isSetup) {
					this.addItem(this.items);
				}
		
				this.refreshState();
				this.updateOriginalInput();
			},
		
			/**
			 * Updates all state-dependent attributes
			 * and CSS classes.
			 */
			refreshState: function() {
				var invalid, self = this;
				if (self.isRequired) {
					if (self.items.length) self.isInvalid = false;
					self.$control_input.prop('required', invalid);
				}
				self.refreshClasses();
			},
		
			/**
			 * Updates all state-dependent CSS classes.
			 */
			refreshClasses: function() {
				var self     = this;
				var isFull   = self.isFull();
				var isLocked = self.isLocked;
		
				self.$wrapper
					.toggleClass('rtl', self.rtl);
		
				self.$control
					.toggleClass('focus', self.isFocused)
					.toggleClass('disabled', self.isDisabled)
					.toggleClass('required', self.isRequired)
					.toggleClass('invalid', self.isInvalid)
					.toggleClass('locked', isLocked)
					.toggleClass('full', isFull).toggleClass('not-full', !isFull)
					.toggleClass('input-active', self.isFocused && !self.isInputHidden)
					.toggleClass('dropdown-active', self.isOpen)
					.toggleClass('has-options', !$.isEmptyObject(self.options))
					.toggleClass('has-items', self.items.length > 0);
		
				self.$control_input.data('grow', !isFull && !isLocked);
			},
		
			/**
			 * Determines whether or not more items can be added
			 * to the control without exceeding the user-defined maximum.
			 *
			 * @returns {boolean}
			 */
			isFull: function() {
				return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
			},
		
			/**
			 * Refreshes the original <select> or <input>
			 * element to reflect the current state.
			 */
			updateOriginalInput: function(opts) {
				var i, n, options, label, self = this;
				opts = opts || {};
		
				if (self.tagType === TAG_SELECT) {
					options = [];
					for (i = 0, n = self.items.length; i < n; i++) {
						label = self.options[self.items[i]][self.settings.labelField] || '';
						options.push('<option value="' + escape_html(self.items[i]) + '" selected="selected">' + escape_html(label) + '</option>');
					}
					if (!options.length && !this.$input.attr('multiple')) {
						options.push('<option value="" selected="selected"></option>');
					}
					self.$input.html(options.join(''));
				} else {
					self.$input.val(self.getValue());
					self.$input.attr('value',self.$input.val());
				}
		
				if (self.isSetup) {
					if (!opts.silent) {
						self.trigger('change', self.$input.val());
					}
				}
			},
		
			/**
			 * Shows/hide the input placeholder depending
			 * on if there items in the list already.
			 */
			updatePlaceholder: function() {
				if (!this.settings.placeholder) return;
				var $input = this.$control_input;
		
				if (this.items.length) {
					$input.removeAttr('placeholder');
				} else {
					$input.attr('placeholder', this.settings.placeholder);
				}
				$input.triggerHandler('update', {force: true});
			},
		
			/**
			 * Shows the autocomplete dropdown containing
			 * the available options.
			 */
			open: function() {
				var self = this;
		
				if (self.isLocked || self.isOpen || (self.settings.mode === 'multi' && self.isFull())) return;
				self.focus();
				self.isOpen = true;
				self.refreshState();
				self.$dropdown.css({visibility: 'hidden', display: 'block'});
				self.positionDropdown();
				self.$dropdown.css({visibility: 'visible'});
				self.trigger('dropdown_open', self.$dropdown);
			},
		
			/**
			 * Closes the autocomplete dropdown menu.
			 */
			close: function() {
				var self = this;
				var trigger = self.isOpen;
		
				if (self.settings.mode === 'single' && self.items.length) {
					self.hideInput();
				}
		
				self.isOpen = false;
				self.$dropdown.hide();
				self.setActiveOption(null);
				self.refreshState();
		
				if (trigger) self.trigger('dropdown_close', self.$dropdown);
			},
		
			/**
			 * Calculates and applies the appropriate
			 * position of the dropdown.
			 */
			positionDropdown: function() {
				var $control = this.$control;
				var offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
				offset.top += $control.outerHeight(true);
		
				this.$dropdown.css({
					width : $control.outerWidth(),
					top   : offset.top,
					left  : offset.left
				});
			},
		
			/**
			 * Resets / clears all selected items
			 * from the control.
			 *
			 * @param {boolean} silent
			 */
			clear: function(silent) {
				var self = this;
		
				if (!self.items.length) return;
				self.$control.children(':not(input)').remove();
				self.items = [];
				self.lastQuery = null;
				self.setCaret(0);
				self.setActiveItem(null);
				self.updatePlaceholder();
				self.updateOriginalInput({silent: silent});
				self.refreshState();
				self.showInput();
				self.trigger('clear');
			},
		
			/**
			 * A helper method for inserting an element
			 * at the current caret position.
			 *
			 * @param {object} $el
			 */
			insertAtCaret: function($el) {
				var caret = Math.min(this.caretPos, this.items.length);
				if (caret === 0) {
					this.$control.prepend($el);
				} else {
					$(this.$control[0].childNodes[caret]).before($el);
				}
				this.setCaret(caret + 1);
			},
		
			/**
			 * Removes the current selected item(s).
			 *
			 * @param {object} e (optional)
			 * @returns {boolean}
			 */
			deleteSelection: function(e) {
				var i, n, direction, selection, values, caret, option_select, $option_select, $tail;
				var self = this;
		
				direction = (e && e.keyCode === KEY_BACKSPACE) ? -1 : 1;
				selection = getSelection(self.$control_input[0]);
		
				if (self.$activeOption && !self.settings.hideSelected) {
					option_select = self.getAdjacentOption(self.$activeOption, -1).attr('data-value');
				}
		
				// determine items that will be removed
				values = [];
		
				if (self.$activeItems.length) {
					$tail = self.$control.children('.active:' + (direction > 0 ? 'last' : 'first'));
					caret = self.$control.children(':not(input)').index($tail);
					if (direction > 0) { caret++; }
		
					for (i = 0, n = self.$activeItems.length; i < n; i++) {
						values.push($(self.$activeItems[i]).attr('data-value'));
					}
					if (e) {
						e.preventDefault();
						e.stopPropagation();
					}
				} else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
					if (direction < 0 && selection.start === 0 && selection.length === 0) {
						values.push(self.items[self.caretPos - 1]);
					} else if (direction > 0 && selection.start === self.$control_input.val().length) {
						values.push(self.items[self.caretPos]);
					}
				}
		
				// allow the callback to abort
				if (!values.length || (typeof self.settings.onDelete === 'function' && self.settings.onDelete.apply(self, [values]) === false)) {
					return false;
				}
		
				// perform removal
				if (typeof caret !== 'undefined') {
					self.setCaret(caret);
				}
				while (values.length) {
					self.removeItem(values.pop());
				}
		
				self.showInput();
				self.positionDropdown();
				self.refreshOptions(true);
		
				// select previous option
				if (option_select) {
					$option_select = self.getOption(option_select);
					if ($option_select.length) {
						self.setActiveOption($option_select);
					}
				}
		
				return true;
			},
		
			/**
			 * Selects the previous / next item (depending
			 * on the `direction` argument).
			 *
			 * > 0 - right
			 * < 0 - left
			 *
			 * @param {int} direction
			 * @param {object} e (optional)
			 */
			advanceSelection: function(direction, e) {
				var tail, selection, idx, valueLength, cursorAtEdge, $tail;
				var self = this;
		
				if (direction === 0) return;
				if (self.rtl) direction *= -1;
		
				tail = direction > 0 ? 'last' : 'first';
				selection = getSelection(self.$control_input[0]);
		
				if (self.isFocused && !self.isInputHidden) {
					valueLength = self.$control_input.val().length;
					cursorAtEdge = direction < 0
						? selection.start === 0 && selection.length === 0
						: selection.start === valueLength;
		
					if (cursorAtEdge && !valueLength) {
						self.advanceCaret(direction, e);
					}
				} else {
					$tail = self.$control.children('.active:' + tail);
					if ($tail.length) {
						idx = self.$control.children(':not(input)').index($tail);
						self.setActiveItem(null);
						self.setCaret(direction > 0 ? idx + 1 : idx);
					}
				}
			},
		
			/**
			 * Moves the caret left / right.
			 *
			 * @param {int} direction
			 * @param {object} e (optional)
			 */
			advanceCaret: function(direction, e) {
				var self = this, fn, $adj;
		
				if (direction === 0) return;
		
				fn = direction > 0 ? 'next' : 'prev';
				if (self.isShiftDown) {
					$adj = self.$control_input[fn]();
					if ($adj.length) {
						self.hideInput();
						self.setActiveItem($adj);
						e && e.preventDefault();
					}
				} else {
					self.setCaret(self.caretPos + direction);
				}
			},
		
			/**
			 * Moves the caret to the specified index.
			 *
			 * @param {int} i
			 */
			setCaret: function(i) {
				var self = this;
		
				if (self.settings.mode === 'single') {
					i = self.items.length;
				} else {
					i = Math.max(0, Math.min(self.items.length, i));
				}
		
				if(!self.isPending) {
					// the input must be moved by leaving it in place and moving the
					// siblings, due to the fact that focus cannot be restored once lost
					// on mobile webkit devices
					var j, n, fn, $children, $child;
					$children = self.$control.children(':not(input)');
					for (j = 0, n = $children.length; j < n; j++) {
						$child = $($children[j]).detach();
						if (j <  i) {
							self.$control_input.before($child);
						} else {
							self.$control.append($child);
						}
					}
				}
		
				self.caretPos = i;
			},
		
			/**
			 * Disables user input on the control. Used while
			 * items are being asynchronously created.
			 */
			lock: function() {
				this.close();
				this.isLocked = true;
				this.refreshState();
			},
		
			/**
			 * Re-enables user input on the control.
			 */
			unlock: function() {
				this.isLocked = false;
				this.refreshState();
			},
		
			/**
			 * Disables user input on the control completely.
			 * While disabled, it cannot receive focus.
			 */
			disable: function() {
				var self = this;
				self.$input.prop('disabled', true);
				self.$control_input.prop('disabled', true).prop('tabindex', -1);
				self.isDisabled = true;
				self.lock();
			},
		
			/**
			 * Enables the control so that it can respond
			 * to focus and user input.
			 */
			enable: function() {
				var self = this;
				self.$input.prop('disabled', false);
				self.$control_input.prop('disabled', false).prop('tabindex', self.tabIndex);
				self.isDisabled = false;
				self.unlock();
			},
		
			/**
			 * Completely destroys the control and
			 * unbinds all event listeners so that it can
			 * be garbage collected.
			 */
			destroy: function() {
				var self = this;
				var eventNS = self.eventNS;
				var revertSettings = self.revertSettings;
		
				self.trigger('destroy');
				self.off();
				self.$wrapper.remove();
				self.$dropdown.remove();
		
				self.$input
					.html('')
					.append(revertSettings.$children)
					.removeAttr('tabindex')
					.removeClass('selectized')
					.attr({tabindex: revertSettings.tabindex})
					.show();
		
				self.$control_input.removeData('grow');
				self.$input.removeData('selectize');
		
				$(window).off(eventNS);
				$(document).off(eventNS);
				$(document.body).off(eventNS);
		
				delete self.$input[0].selectize;
			},
		
			/**
			 * A helper method for rendering "item" and
			 * "option" templates, given the data.
			 *
			 * @param {string} templateName
			 * @param {object} data
			 * @returns {string}
			 */
			render: function(templateName, data) {
				var value, id, label;
				var html = '';
				var cache = false;
				var self = this;
				var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
		
				if (templateName === 'option' || templateName === 'item') {
					value = hash_key(data[self.settings.valueField]);
					cache = !!value;
				}
		
				// pull markup from cache if it exists
				if (cache) {
					if (!isset(self.renderCache[templateName])) {
						self.renderCache[templateName] = {};
					}
					if (self.renderCache[templateName].hasOwnProperty(value)) {
						return self.renderCache[templateName][value];
					}
				}
		
				// render markup
				html = self.settings.render[templateName].apply(this, [data, escape_html]);
		
				// add mandatory attributes
				if (templateName === 'option' || templateName === 'option_create') {
					html = html.replace(regex_tag, '<$1 data-selectable');
				}
				if (templateName === 'optgroup') {
					id = data[self.settings.optgroupValueField] || '';
					html = html.replace(regex_tag, '<$1 data-group="' + escape_replace(escape_html(id)) + '"');
				}
				if (templateName === 'option' || templateName === 'item') {
					html = html.replace(regex_tag, '<$1 data-value="' + escape_replace(escape_html(value || '')) + '"');
				}
		
				// update cache
				if (cache) {
					self.renderCache[templateName][value] = html;
				}
		
				return html;
			},
		
			/**
			 * Clears the render cache for a template. If
			 * no template is given, clears all render
			 * caches.
			 *
			 * @param {string} templateName
			 */
			clearCache: function(templateName) {
				var self = this;
				if (typeof templateName === 'undefined') {
					self.renderCache = {};
				} else {
					delete self.renderCache[templateName];
				}
			},
		
			/**
			 * Determines whether or not to display the
			 * create item prompt, given a user input.
			 *
			 * @param {string} input
			 * @return {boolean}
			 */
			canCreate: function(input) {
				var self = this;
				if (!self.settings.create) return false;
				var filter = self.settings.createFilter;
				return input.length
					&& (typeof filter !== 'function' || filter.apply(self, [input]))
					&& (typeof filter !== 'string' || new RegExp(filter).test(input))
					&& (!(filter instanceof RegExp) || filter.test(input));
			}
		
		});
		
		
		Selectize.count = 0;
		Selectize.defaults = {
			options: [],
			optgroups: [],
		
			plugins: [],
			delimiter: ',',
			splitOn: null, // regexp or string for splitting up values from a paste command
			persist: true,
			diacritics: true,
			create: false,
			createOnBlur: false,
			createFilter: null,
			highlight: true,
			openOnFocus: true,
			maxOptions: 1000,
			maxItems: null,
			hideSelected: null,
			addPrecedence: false,
			selectOnTab: false,
			preload: false,
			allowEmptyOption: false,
			closeAfterSelect: false,
		
			scrollDuration: 60,
			loadThrottle: 300,
			loadingClass: 'loading',
		
			dataAttr: 'data-data',
			optgroupField: 'optgroup',
			valueField: 'value',
			labelField: 'text',
			optgroupLabelField: 'label',
			optgroupValueField: 'value',
			lockOptgroupOrder: false,
		
			sortField: '$order',
			searchField: ['text'],
			searchConjunction: 'and',
		
			mode: null,
			wrapperClass: 'selectize-control',
			inputClass: 'selectize-input',
			dropdownClass: 'selectize-dropdown',
			dropdownContentClass: 'selectize-dropdown-content',
		
			dropdownParent: null,
		
			copyClassesToDropdown: true,
		
			/*
			load                 : null, // function(query, callback) { ... }
			score                : null, // function(search) { ... }
			onInitialize         : null, // function() { ... }
			onChange             : null, // function(value) { ... }
			onItemAdd            : null, // function(value, $item) { ... }
			onItemRemove         : null, // function(value) { ... }
			onClear              : null, // function() { ... }
			onOptionAdd          : null, // function(value, data) { ... }
			onOptionRemove       : null, // function(value) { ... }
			onOptionClear        : null, // function() { ... }
			onOptionGroupAdd     : null, // function(id, data) { ... }
			onOptionGroupRemove  : null, // function(id) { ... }
			onOptionGroupClear   : null, // function() { ... }
			onDropdownOpen       : null, // function($dropdown) { ... }
			onDropdownClose      : null, // function($dropdown) { ... }
			onType               : null, // function(str) { ... }
			onDelete             : null, // function(values) { ... }
			*/
		
			render: {
				/*
				item: null,
				optgroup: null,
				optgroup_header: null,
				option: null,
				option_create: null
				*/
			}
		};
		
		
		$.fn.selectize = function(settings_user) {
			var defaults             = $.fn.selectize.defaults;
			var settings             = $.extend({}, defaults, settings_user);
			var attr_data            = settings.dataAttr;
			var field_label          = settings.labelField;
			var field_value          = settings.valueField;
			var field_optgroup       = settings.optgroupField;
			var field_optgroup_label = settings.optgroupLabelField;
			var field_optgroup_value = settings.optgroupValueField;
		
			/**
			 * Initializes selectize from a <input type="text"> element.
			 *
			 * @param {object} $input
			 * @param {object} settings_element
			 */
			var init_textbox = function($input, settings_element) {
				var i, n, values, option;
		
				var data_raw = $input.attr(attr_data);
		
				if (!data_raw) {
					var value = $.trim($input.val() || '');
					if (!settings.allowEmptyOption && !value.length) return;
					values = value.split(settings.delimiter);
					for (i = 0, n = values.length; i < n; i++) {
						option = {};
						option[field_label] = values[i];
						option[field_value] = values[i];
						settings_element.options.push(option);
					}
					settings_element.items = values;
				} else {
					settings_element.options = JSON.parse(data_raw);
					for (i = 0, n = settings_element.options.length; i < n; i++) {
						settings_element.items.push(settings_element.options[i][field_value]);
					}
				}
			};
		
			/**
			 * Initializes selectize from a <select> element.
			 *
			 * @param {object} $input
			 * @param {object} settings_element
			 */
			var init_select = function($input, settings_element) {
				var i, n, tagName, $children, order = 0;
				var options = settings_element.options;
				var optionsMap = {};
		
				var readData = function($el) {
					var data = attr_data && $el.attr(attr_data);
					if (typeof data === 'string' && data.length) {
						return JSON.parse(data);
					}
					return null;
				};
		
				var addOption = function($option, group) {
					$option = $($option);
		
					var value = hash_key($option.attr('value'));
					if (!value && !settings.allowEmptyOption) return;
		
					// if the option already exists, it's probably been
					// duplicated in another optgroup. in this case, push
					// the current group to the "optgroup" property on the
					// existing option so that it's rendered in both places.
					if (optionsMap.hasOwnProperty(value)) {
						if (group) {
							var arr = optionsMap[value][field_optgroup];
							if (!arr) {
								optionsMap[value][field_optgroup] = group;
							} else if (!$.isArray(arr)) {
								optionsMap[value][field_optgroup] = [arr, group];
							} else {
								arr.push(group);
							}
						}
						return;
					}
		
					var option             = readData($option) || {};
					option[field_label]    = option[field_label] || $option.text();
					option[field_value]    = option[field_value] || value;
					option[field_optgroup] = option[field_optgroup] || group;
		
					optionsMap[value] = option;
					options.push(option);
		
					if ($option.is(':selected')) {
						settings_element.items.push(value);
					}
				};
		
				var addGroup = function($optgroup) {
					var i, n, id, optgroup, $options;
		
					$optgroup = $($optgroup);
					id = $optgroup.attr('label');
		
					if (id) {
						optgroup = readData($optgroup) || {};
						optgroup[field_optgroup_label] = id;
						optgroup[field_optgroup_value] = id;
						settings_element.optgroups.push(optgroup);
					}
		
					$options = $('option', $optgroup);
					for (i = 0, n = $options.length; i < n; i++) {
						addOption($options[i], id);
					}
				};
		
				settings_element.maxItems = $input.attr('multiple') ? null : 1;
		
				$children = $input.children();
				for (i = 0, n = $children.length; i < n; i++) {
					tagName = $children[i].tagName.toLowerCase();
					if (tagName === 'optgroup') {
						addGroup($children[i]);
					} else if (tagName === 'option') {
						addOption($children[i]);
					}
				}
			};
		
			return this.each(function() {
				if (this.selectize) return;
		
				var instance;
				var $input = $(this);
				var tag_name = this.tagName.toLowerCase();
				var placeholder = $input.attr('placeholder') || $input.attr('data-placeholder');
				if (!placeholder && !settings.allowEmptyOption) {
					placeholder = $input.children('option[value=""]').text();
				}
		
				var settings_element = {
					'placeholder' : placeholder,
					'options'     : [],
					'optgroups'   : [],
					'items'       : []
				};
		
				if (tag_name === 'select') {
					init_select($input, settings_element);
				} else {
					init_textbox($input, settings_element);
				}
		
				instance = new Selectize($input, $.extend(true, {}, defaults, settings_element, settings_user));
			});
		};
		
		$.fn.selectize.defaults = Selectize.defaults;
		$.fn.selectize.support = {
			validity: SUPPORTS_VALIDITY_API
		};
		
		
		Selectize.define('drag_drop', function(options) {
			if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
			if (this.settings.mode !== 'multi') return;
			var self = this;
		
			self.lock = (function() {
				var original = self.lock;
				return function() {
					var sortable = self.$control.data('sortable');
					if (sortable) sortable.disable();
					return original.apply(self, arguments);
				};
			})();
		
			self.unlock = (function() {
				var original = self.unlock;
				return function() {
					var sortable = self.$control.data('sortable');
					if (sortable) sortable.enable();
					return original.apply(self, arguments);
				};
			})();
		
			self.setup = (function() {
				var original = self.setup;
				return function() {
					original.apply(this, arguments);
		
					var $control = self.$control.sortable({
						items: '[data-value]',
						forcePlaceholderSize: true,
						disabled: self.isLocked,
						start: function(e, ui) {
							ui.placeholder.css('width', ui.helper.css('width'));
							$control.css({overflow: 'visible'});
						},
						stop: function() {
							$control.css({overflow: 'hidden'});
							var active = self.$activeItems ? self.$activeItems.slice() : null;
							var values = [];
							$control.children('[data-value]').each(function() {
								values.push($(this).attr('data-value'));
							});
							self.setValue(values);
							self.setActiveItem(active);
						}
					});
				};
			})();
		
		});
		
		Selectize.define('dropdown_header', function(options) {
			var self = this;
		
			options = $.extend({
				title         : 'Untitled',
				headerClass   : 'selectize-dropdown-header',
				titleRowClass : 'selectize-dropdown-header-title',
				labelClass    : 'selectize-dropdown-header-label',
				closeClass    : 'selectize-dropdown-header-close',
		
				html: function(data) {
					return (
						'<div class="' + data.headerClass + '">' +
							'<div class="' + data.titleRowClass + '">' +
								'<span class="' + data.labelClass + '">' + data.title + '</span>' +
								'<a href="javascript:void(0)" class="' + data.closeClass + '">&times;</a>' +
							'</div>' +
						'</div>'
					);
				}
			}, options);
		
			self.setup = (function() {
				var original = self.setup;
				return function() {
					original.apply(self, arguments);
					self.$dropdown_header = $(options.html(options));
					self.$dropdown.prepend(self.$dropdown_header);
				};
			})();
		
		});
		
		Selectize.define('optgroup_columns', function(options) {
			var self = this;
		
			options = $.extend({
				equalizeWidth  : true,
				equalizeHeight : true
			}, options);
		
			this.getAdjacentOption = function($option, direction) {
				var $options = $option.closest('[data-group]').find('[data-selectable]');
				var index    = $options.index($option) + direction;
		
				return index >= 0 && index < $options.length ? $options.eq(index) : $();
			};
		
			this.onKeyDown = (function() {
				var original = self.onKeyDown;
				return function(e) {
					var index, $option, $options, $optgroup;
		
					if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
						self.ignoreHover = true;
						$optgroup = this.$activeOption.closest('[data-group]');
						index = $optgroup.find('[data-selectable]').index(this.$activeOption);
		
						if(e.keyCode === KEY_LEFT) {
							$optgroup = $optgroup.prev('[data-group]');
						} else {
							$optgroup = $optgroup.next('[data-group]');
						}
		
						$options = $optgroup.find('[data-selectable]');
						$option  = $options.eq(Math.min($options.length - 1, index));
						if ($option.length) {
							this.setActiveOption($option);
						}
						return;
					}
		
					return original.apply(this, arguments);
				};
			})();
		
			var getScrollbarWidth = function() {
				var div;
				var width = getScrollbarWidth.width;
				var doc = document;
		
				if (typeof width === 'undefined') {
					div = doc.createElement('div');
					div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
					div = div.firstChild;
					doc.body.appendChild(div);
					width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
					doc.body.removeChild(div);
				}
				return width;
			};
		
			var equalizeSizes = function() {
				var i, n, height_max, width, width_last, width_parent, $optgroups;
		
				$optgroups = $('[data-group]', self.$dropdown_content);
				n = $optgroups.length;
				if (!n || !self.$dropdown_content.width()) return;
		
				if (options.equalizeHeight) {
					height_max = 0;
					for (i = 0; i < n; i++) {
						height_max = Math.max(height_max, $optgroups.eq(i).height());
					}
					$optgroups.css({height: height_max});
				}
		
				if (options.equalizeWidth) {
					width_parent = self.$dropdown_content.innerWidth() - getScrollbarWidth();
					width = Math.round(width_parent / n);
					$optgroups.css({width: width});
					if (n > 1) {
						width_last = width_parent - width * (n - 1);
						$optgroups.eq(n - 1).css({width: width_last});
					}
				}
			};
		
			if (options.equalizeHeight || options.equalizeWidth) {
				hook.after(this, 'positionDropdown', equalizeSizes);
				hook.after(this, 'refreshOptions', equalizeSizes);
			}
		
		
		});
		
		Selectize.define('remove_button', function(options) {
			if (this.settings.mode === 'single') return;
		
			options = $.extend({
				label     : '&times;',
				title     : 'Remove',
				className : 'remove',
				append    : true
			}, options);
		
			var self = this;
			var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';
		
			/**
			 * Appends an element as a child (with raw HTML).
			 *
			 * @param {string} html_container
			 * @param {string} html_element
			 * @return {string}
			 */
			var append = function(html_container, html_element) {
				var pos = html_container.search(/(<\/[^>]+>\s*)$/);
				return html_container.substring(0, pos) + html_element + html_container.substring(pos);
			};
		
			this.setup = (function() {
				var original = self.setup;
				return function() {
					// override the item rendering method to add the button to each
					if (options.append) {
						var render_item = self.settings.render.item;
						self.settings.render.item = function(data) {
							return append(render_item.apply(this, arguments), html);
						};
					}
		
					original.apply(this, arguments);
		
					// add event listener
					this.$control.on('click', '.' + options.className, function(e) {
						e.preventDefault();
						if (self.isLocked) return;
		
						var $item = $(e.currentTarget).parent();
						self.setActiveItem($item);
						if (self.deleteSelection()) {
							self.setCaret(self.items.length);
						}
					});
		
				};
			})();
		
		});
		
		Selectize.define('restore_on_backspace', function(options) {
			var self = this;
		
			options.text = options.text || function(option) {
				return option[this.settings.labelField];
			};
		
			this.onKeyDown = (function() {
				var original = self.onKeyDown;
				return function(e) {
					var index, option;
					if (e.keyCode === KEY_BACKSPACE && this.$control_input.val() === '' && !this.$activeItems.length) {
						index = this.caretPos - 1;
						if (index >= 0 && index < this.items.length) {
							option = this.options[this.items[index]];
							if (this.deleteSelection(e)) {
								this.setTextboxValue(options.text.apply(this, [option]));
								this.refreshOptions(true);
							}
							e.preventDefault();
							return;
						}
					}
					return original.apply(this, arguments);
				};
			})();
		});
		

		return Selectize;
	}));

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * sifter.js
	 * Copyright (c) 2013 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.Sifter = factory();
		}
	}(this, function() {

		/**
		 * Textually searches arrays and hashes of objects
		 * by property (or multiple properties). Designed
		 * specifically for autocomplete.
		 *
		 * @constructor
		 * @param {array|object} items
		 * @param {object} items
		 */
		var Sifter = function(items, settings) {
			this.items = items;
			this.settings = settings || {diacritics: true};
		};

		/**
		 * Splits a search string into an array of individual
		 * regexps to be used to match results.
		 *
		 * @param {string} query
		 * @returns {array}
		 */
		Sifter.prototype.tokenize = function(query) {
			query = trim(String(query || '').toLowerCase());
			if (!query || !query.length) return [];

			var i, n, regex, letter;
			var tokens = [];
			var words = query.split(/ +/);

			for (i = 0, n = words.length; i < n; i++) {
				regex = escape_regex(words[i]);
				if (this.settings.diacritics) {
					for (letter in DIACRITICS) {
						if (DIACRITICS.hasOwnProperty(letter)) {
							regex = regex.replace(new RegExp(letter, 'g'), DIACRITICS[letter]);
						}
					}
				}
				tokens.push({
					string : words[i],
					regex  : new RegExp(regex, 'i')
				});
			}

			return tokens;
		};

		/**
		 * Iterates over arrays and hashes.
		 *
		 * ```
		 * this.iterator(this.items, function(item, id) {
		 *    // invoked for each item
		 * });
		 * ```
		 *
		 * @param {array|object} object
		 */
		Sifter.prototype.iterator = function(object, callback) {
			var iterator;
			if (is_array(object)) {
				iterator = Array.prototype.forEach || function(callback) {
					for (var i = 0, n = this.length; i < n; i++) {
						callback(this[i], i, this);
					}
				};
			} else {
				iterator = function(callback) {
					for (var key in this) {
						if (this.hasOwnProperty(key)) {
							callback(this[key], key, this);
						}
					}
				};
			}

			iterator.apply(object, [callback]);
		};

		/**
		 * Returns a function to be used to score individual results.
		 *
		 * Good matches will have a higher score than poor matches.
		 * If an item is not a match, 0 will be returned by the function.
		 *
		 * @param {object|string} search
		 * @param {object} options (optional)
		 * @returns {function}
		 */
		Sifter.prototype.getScoreFunction = function(search, options) {
			var self, fields, tokens, token_count;

			self        = this;
			search      = self.prepareSearch(search, options);
			tokens      = search.tokens;
			fields      = search.options.fields;
			token_count = tokens.length;

			/**
			 * Calculates how close of a match the
			 * given value is against a search token.
			 *
			 * @param {mixed} value
			 * @param {object} token
			 * @return {number}
			 */
			var scoreValue = function(value, token) {
				var score, pos;

				if (!value) return 0;
				value = String(value || '');
				pos = value.search(token.regex);
				if (pos === -1) return 0;
				score = token.string.length / value.length;
				if (pos === 0) score += 0.5;
				return score;
			};

			/**
			 * Calculates the score of an object
			 * against the search query.
			 *
			 * @param {object} token
			 * @param {object} data
			 * @return {number}
			 */
			var scoreObject = (function() {
				var field_count = fields.length;
				if (!field_count) {
					return function() { return 0; };
				}
				if (field_count === 1) {
					return function(token, data) {
						return scoreValue(data[fields[0]], token);
					};
				}
				return function(token, data) {
					for (var i = 0, sum = 0; i < field_count; i++) {
						sum += scoreValue(data[fields[i]], token);
					}
					return sum / field_count;
				};
			})();

			if (!token_count) {
				return function() { return 0; };
			}
			if (token_count === 1) {
				return function(data) {
					return scoreObject(tokens[0], data);
				};
			}

			if (search.options.conjunction === 'and') {
				return function(data) {
					var score;
					for (var i = 0, sum = 0; i < token_count; i++) {
						score = scoreObject(tokens[i], data);
						if (score <= 0) return 0;
						sum += score;
					}
					return sum / token_count;
				};
			} else {
				return function(data) {
					for (var i = 0, sum = 0; i < token_count; i++) {
						sum += scoreObject(tokens[i], data);
					}
					return sum / token_count;
				};
			}
		};

		/**
		 * Returns a function that can be used to compare two
		 * results, for sorting purposes. If no sorting should
		 * be performed, `null` will be returned.
		 *
		 * @param {string|object} search
		 * @param {object} options
		 * @return function(a,b)
		 */
		Sifter.prototype.getSortFunction = function(search, options) {
			var i, n, self, field, fields, fields_count, multiplier, multipliers, get_field, implicit_score, sort;

			self   = this;
			search = self.prepareSearch(search, options);
			sort   = (!search.query && options.sort_empty) || options.sort;

			/**
			 * Fetches the specified sort field value
			 * from a search result item.
			 *
			 * @param  {string} name
			 * @param  {object} result
			 * @return {mixed}
			 */
			get_field = function(name, result) {
				if (name === '$score') return result.score;
				return self.items[result.id][name];
			};

			// parse options
			fields = [];
			if (sort) {
				for (i = 0, n = sort.length; i < n; i++) {
					if (search.query || sort[i].field !== '$score') {
						fields.push(sort[i]);
					}
				}
			}

			// the "$score" field is implied to be the primary
			// sort field, unless it's manually specified
			if (search.query) {
				implicit_score = true;
				for (i = 0, n = fields.length; i < n; i++) {
					if (fields[i].field === '$score') {
						implicit_score = false;
						break;
					}
				}
				if (implicit_score) {
					fields.unshift({field: '$score', direction: 'desc'});
				}
			} else {
				for (i = 0, n = fields.length; i < n; i++) {
					if (fields[i].field === '$score') {
						fields.splice(i, 1);
						break;
					}
				}
			}

			multipliers = [];
			for (i = 0, n = fields.length; i < n; i++) {
				multipliers.push(fields[i].direction === 'desc' ? -1 : 1);
			}

			// build function
			fields_count = fields.length;
			if (!fields_count) {
				return null;
			} else if (fields_count === 1) {
				field = fields[0].field;
				multiplier = multipliers[0];
				return function(a, b) {
					return multiplier * cmp(
						get_field(field, a),
						get_field(field, b)
					);
				};
			} else {
				return function(a, b) {
					var i, result, a_value, b_value, field;
					for (i = 0; i < fields_count; i++) {
						field = fields[i].field;
						result = multipliers[i] * cmp(
							get_field(field, a),
							get_field(field, b)
						);
						if (result) return result;
					}
					return 0;
				};
			}
		};

		/**
		 * Parses a search query and returns an object
		 * with tokens and fields ready to be populated
		 * with results.
		 *
		 * @param {string} query
		 * @param {object} options
		 * @returns {object}
		 */
		Sifter.prototype.prepareSearch = function(query, options) {
			if (typeof query === 'object') return query;

			options = extend({}, options);

			var option_fields     = options.fields;
			var option_sort       = options.sort;
			var option_sort_empty = options.sort_empty;

			if (option_fields && !is_array(option_fields)) options.fields = [option_fields];
			if (option_sort && !is_array(option_sort)) options.sort = [option_sort];
			if (option_sort_empty && !is_array(option_sort_empty)) options.sort_empty = [option_sort_empty];

			return {
				options : options,
				query   : String(query || '').toLowerCase(),
				tokens  : this.tokenize(query),
				total   : 0,
				items   : []
			};
		};

		/**
		 * Searches through all items and returns a sorted array of matches.
		 *
		 * The `options` parameter can contain:
		 *
		 *   - fields {string|array}
		 *   - sort {array}
		 *   - score {function}
		 *   - filter {bool}
		 *   - limit {integer}
		 *
		 * Returns an object containing:
		 *
		 *   - options {object}
		 *   - query {string}
		 *   - tokens {array}
		 *   - total {int}
		 *   - items {array}
		 *
		 * @param {string} query
		 * @param {object} options
		 * @returns {object}
		 */
		Sifter.prototype.search = function(query, options) {
			var self = this, value, score, search, calculateScore;
			var fn_sort;
			var fn_score;

			search  = this.prepareSearch(query, options);
			options = search.options;
			query   = search.query;

			// generate result scoring function
			fn_score = options.score || self.getScoreFunction(search);

			// perform search and sort
			if (query.length) {
				self.iterator(self.items, function(item, id) {
					score = fn_score(item);
					if (options.filter === false || score > 0) {
						search.items.push({'score': score, 'id': id});
					}
				});
			} else {
				self.iterator(self.items, function(item, id) {
					search.items.push({'score': 1, 'id': id});
				});
			}

			fn_sort = self.getSortFunction(search, options);
			if (fn_sort) search.items.sort(fn_sort);

			// apply limits
			search.total = search.items.length;
			if (typeof options.limit === 'number') {
				search.items = search.items.slice(0, options.limit);
			}

			return search;
		};

		// utilities
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		var cmp = function(a, b) {
			if (typeof a === 'number' && typeof b === 'number') {
				return a > b ? 1 : (a < b ? -1 : 0);
			}
			a = asciifold(String(a || ''));
			b = asciifold(String(b || ''));
			if (a > b) return 1;
			if (b > a) return -1;
			return 0;
		};

		var extend = function(a, b) {
			var i, n, k, object;
			for (i = 1, n = arguments.length; i < n; i++) {
				object = arguments[i];
				if (!object) continue;
				for (k in object) {
					if (object.hasOwnProperty(k)) {
						a[k] = object[k];
					}
				}
			}
			return a;
		};

		var trim = function(str) {
			return (str + '').replace(/^\s+|\s+$|/g, '');
		};

		var escape_regex = function(str) {
			return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
		};

		var is_array = Array.isArray || (typeof $ !== 'undefined' && $.isArray) || function(object) {
			return Object.prototype.toString.call(object) === '[object Array]';
		};

		var DIACRITICS = {
			'a': '[aÀÁÂÃÄÅàáâãäåĀāąĄ]',
			'c': '[cÇçćĆčČ]',
			'd': '[dđĐďĎð]',
			'e': '[eÈÉÊËèéêëěĚĒēęĘ]',
			'i': '[iÌÍÎÏìíîïĪī]',
			'l': '[lłŁ]',
			'n': '[nÑñňŇńŃ]',
			'o': '[oÒÓÔÕÕÖØòóôõöøŌō]',
			'r': '[rřŘ]',
			's': '[sŠšśŚ]',
			't': '[tťŤ]',
			'u': '[uÙÚÛÜùúûüůŮŪū]',
			'y': '[yŸÿýÝ]',
			'z': '[zŽžżŻźŹ]'
		};

		var asciifold = (function() {
			var i, n, k, chunk;
			var foreignletters = '';
			var lookup = {};
			for (k in DIACRITICS) {
				if (DIACRITICS.hasOwnProperty(k)) {
					chunk = DIACRITICS[k].substring(2, DIACRITICS[k].length - 1);
					foreignletters += chunk;
					for (i = 0, n = chunk.length; i < n; i++) {
						lookup[chunk.charAt(i)] = k;
					}
				}
			}
			var regexp = new RegExp('[' +  foreignletters + ']', 'g');
			return function(str) {
				return str.replace(regexp, function(foreignletter) {
					return lookup[foreignletter];
				}).toLowerCase();
			};
		})();


		// export
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		return Sifter;
	}));



/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * microplugin.js
	 * Copyright (c) 2013 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.MicroPlugin = factory();
		}
	}(this, function() {
		var MicroPlugin = {};

		MicroPlugin.mixin = function(Interface) {
			Interface.plugins = {};

			/**
			 * Initializes the listed plugins (with options).
			 * Acceptable formats:
			 *
			 * List (without options):
			 *   ['a', 'b', 'c']
			 *
			 * List (with options):
			 *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
			 *
			 * Hash (with options):
			 *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
			 *
			 * @param {mixed} plugins
			 */
			Interface.prototype.initializePlugins = function(plugins) {
				var i, n, key;
				var self  = this;
				var queue = [];

				self.plugins = {
					names     : [],
					settings  : {},
					requested : {},
					loaded    : {}
				};

				if (utils.isArray(plugins)) {
					for (i = 0, n = plugins.length; i < n; i++) {
						if (typeof plugins[i] === 'string') {
							queue.push(plugins[i]);
						} else {
							self.plugins.settings[plugins[i].name] = plugins[i].options;
							queue.push(plugins[i].name);
						}
					}
				} else if (plugins) {
					for (key in plugins) {
						if (plugins.hasOwnProperty(key)) {
							self.plugins.settings[key] = plugins[key];
							queue.push(key);
						}
					}
				}

				while (queue.length) {
					self.require(queue.shift());
				}
			};

			Interface.prototype.loadPlugin = function(name) {
				var self    = this;
				var plugins = self.plugins;
				var plugin  = Interface.plugins[name];

				if (!Interface.plugins.hasOwnProperty(name)) {
					throw new Error('Unable to find "' +  name + '" plugin');
				}

				plugins.requested[name] = true;
				plugins.loaded[name] = plugin.fn.apply(self, [self.plugins.settings[name] || {}]);
				plugins.names.push(name);
			};

			/**
			 * Initializes a plugin.
			 *
			 * @param {string} name
			 */
			Interface.prototype.require = function(name) {
				var self = this;
				var plugins = self.plugins;

				if (!self.plugins.loaded.hasOwnProperty(name)) {
					if (plugins.requested[name]) {
						throw new Error('Plugin has circular dependency ("' + name + '")');
					}
					self.loadPlugin(name);
				}

				return plugins.loaded[name];
			};

			/**
			 * Registers a plugin.
			 *
			 * @param {string} name
			 * @param {function} fn
			 */
			Interface.define = function(name, fn) {
				Interface.plugins[name] = {
					'name' : name,
					'fn'   : fn
				};
			};
		};

		var utils = {
			isArray: Array.isArray || function(vArg) {
				return Object.prototype.toString.call(vArg) === '[object Array]';
			}
		};

		return MicroPlugin;
	}));

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//define(function(require, exports, module) {
	//require("ui-router") ;
	__webpack_require__(114);
	__webpack_require__(119);
	__webpack_require__(132);
	__webpack_require__(218);
	var _ = __webpack_require__(74);
	//var editallHtml = require("./tpls/edit.all.html") ;
	//把需要的模块全部加载到testApp中
	var app = angular.module('app', ['pasvaz.bindonce', 'ngMessages', 'app.factory', 'app.controllers', 'app.directives', 'app.filter']);
	app.constant('DEFAULT_SERVICETYPE', 'F'); //默认的serviceType
	//}) ;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//define(function(require, exports, module){ 
	__webpack_require__(115);
	__webpack_require__(117);
	__webpack_require__(118);
	//}) ;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module){ 
	var app = __webpack_require__(116);
	app.factory('FormData', ['DEFAULT_SERVICETYPE', function (DEFAULT_SERVICETYPE) {
		var contextPath = $.trim($("#contextPath").val());
		var carrCode = $.trim($("#carrCode").val());
		var action = $.trim($("#action").val());
		//console.log("[contextPath : "+contextPath+"],[carrCode : "+carrCode+"],[action:"+action+"]") ;
		return {
			"id": "",
			"status": "",
			"statusDes": "",
			"contextPath": contextPath,
			"carrCode": carrCode,
			"serviceAndSubCode": "",
			"serviceType": DEFAULT_SERVICETYPE, /*s7中包含信息//默认值为"F"//根据选择的s5决定是"F"/"M"*/
			"action": action,
			"sel1": { "showStr": "", "value": "" },
			"sel2": { "showStr": "", "value": "" },
			"sel3": { "showStr": "", "value": "", "textTableNo163": "", "serviceGroup": "", "serviceType": "" },
			"sel4": [],
			"basicInfoVo": {
				"id": "",
				"subCode": "",
				"indCxr": "",
				"subDescription": "",
				"ftmCode": "",
				"carrCode": "",
				"ftmDescription": "",
				"serviceGroup": "",
				"serviceGroupDescription": "",
				"subGroup": "",
				"subGroupDescription": "",
				"serveceType": "",
				"commercialName": "" //商务名称
			},
			"firstMaintenanceDate": "", /*-----------页面第二部分开始--------------*/
			"lastMaintenanceDate": "",
			"description": "", /*描述*/
			"fareBasis": "", /*运价基础*/
			"discountCode": "", /*折扣代码*/
			"freeBaggageAllowancePieces": "", /*免费行李件数*/
			"firstExcessOccurrence": "", /*收费行李件数起点*/
			"lastExcessOccurrence": "", /*收费行李件数结束*/
			"freeBaggageAllowanceWeight": "", /*免费重量*/
			"freeBaggageAllowanceUnit": "", /*免费单位*/
			"noChargeNotAvailable": "", /*"E"的时候"免费"//s7中包含信息*/
			"baggageTravelApplication": "",
			"textTableNo196": "",
			"list196VO": [/*备注例外行李*/],
			"discountOrNot": "1", /*是否打折，这个字段不会保存到数据库*/
			"discountRuleTableNo201": "",
			"list201VO": [],
			"serviceFeeCurTableNo170": "",
			"list170VO": [],
			/*-------------页面第二部分结束---------------------------*/
			"mileageMinimum": "", /*里程//新增字段*/
			"mileageMaximum": "", /*里程//新增字段*/
			"specifiedServiceFeeApp": "", /*适用于//新增字段*/
			"specServiceFeeColSub": "", /*包含，扣除//新增字段*/
			"specServiceFeeNetSell": "", /*净价/销售价//新增字段*/
			"specSevFeeAndOrIndicator": "", /*或、和//新增字段*/
			"specifiedServiceFeeMileage": "", /*里程费//新增字段*/
			"mileageExchangeIndicator": "", /*里程兑换标识*/
			"availability": "N", /*必须检查可用性（查库存）*/
			"sequenceNumber": "", /*优先级序号--------------------页面第三部分开始---------------------------*/
			"passengerTypeCode": "", /*旅客类型*/
			"minPassengerAge": "", /*最小年龄--新增字段*/
			"maxPassengerAge": "", /*最大年龄--新增字段*/
			"firstPassengerOccurrence": "", /*个数范围    第几个到第几个【数字】//新增字段*/
			"lastPassengerOccurrence": "", /*个数范围    第几个到第几个【数字】//新增字段*/
			"customerIndexScoreMinimum": "", /*客户积分范围【数字】//新增*/
			"customerIndexScoreMaxmum": "", /*客户积分范围【数字】//新增*/
			"frequentFlyerStatus": "", /*常旅客状态*/
			"accountCodeTableNo172": "", /*大客户/特殊客户表（T172）--子表//新增*/
			"list172VO": [],
			"ticketDesignatorTableNo173": "", /*指定客票表（T173）--子表//新增*/
			"list173TicketVO": [],
			"tktDesignatorTableNo173": "", /*173*/
			"list173TktVO": [],
			"tourCode": "", /*旅行编码（关联客票）【字母或数字】--新增*/
			"cabin": "", /*服务等级*/
			"upgradeToCabin": "",
			"rbdTableNo198": "", /*暂时没啥用,后台也不使用这个字段*/
			"list198VO": [], /*订座属性表*/
			"upgradeToRbdTableNo198": "", /*暂时没啥用，后台也不是该字段*/
			"list198UpgradeVO": [], /*座位属性表，或则升舱属性表*/
			"securityTableNo183": "", //发布安全表//暂时没啥用，后台也不是该字段*/
			"list183VO": [], //安全发布表*/
			"publicPrivateIndicator": "", /*公有、私有//新增字段*/
			"carrierFlightTableNo186": "", /*航班信息表//暂时没啥用，后台也不是该字段*/
			"list186VO": [],
			"taxApplication": "Y", /*是否含税费,新增字段*/
			"tariff": "", /*税费*/
			"rule": "", /*规则*/
			"cxrResFareTableNo171": "", /*客票舱位等级表*/
			"list171VO": [], /*客票舱位等级表*/
			"equipment": "", /*机型*/
			"equipmentTypeTableNo165": "",
			"list165VO": [],
			"startTime": "", /*开始时刻*/
			"stopTime": "", /*结束时刻*/
			"timeApplication": "D", /*应用范围,新增字段*/
			"dayOfWeek": "", /*星期 -- 新增字段*/
			"dayOfWeekShow": { "w1": false, "w2": false, "w3": false, "w4": false, "w5": false, "w6": false, "w7": false }, /*前台数据，后台无对应的属性*/
			"advancedPurchasePeriod": "", /*提前购票时间--新增字段*/
			"advancedPurchaseUnit": "", /*时间单位 -- 新增字段*/
			"advancedPurchaseTktIssue": "", /*是否与机票同时出票 -- 新增字段*/
			"indicatorReissueRefund": "", /*退、改 -- 新增字段*/
			"formOfRefund": "", /*退款形式--新增字段*/
			"indicatorComission": "Y", /*(是否有)代理费--新增字段*/
			"indicatorInterline": "Y", /*是*/
			"firstTravelYear": "",
			"firstTravelMonth": "",
			"firstTravelDay": "",
			"lastTravelYear": "",
			"lastTravelMonth": "",
			"lastTravelDay": "",
			"travelStartDate": "", /*这个是中间数据，后台不存在对应的属性*/
			"travelEndDate": "", /*这个是中间数据，后台不存在对应的属性*/
			"list178Loc1Id": "", /*区域1表格id*/
			"list178Loc1": [], /*区域1对应的表格*/
			"list178Loc2Id": "", /*区域2表格id*/
			"list178Loc2": [], /*区域2对应的表格*/
			"list178Loc3Id": "", /*区域3表格id*/
			"list178Loc3": [], /*区域2对应的表格*/
			"geoSpecFromToWithin": "", /*区域限制*/
			"geoSpecSectPortJourney": "P", /*航段限制-目前返回的是定死的字符串‘P’*/
			"geoSpecLoc1Type": "", /*区域1类型*/
			"geoSpecLoc1": "", /*区域1代码*/
			"geoSpecLoc2Type": "", /*区域2类型*/
			"geoSpecLoc2": "", /*区域2代码*/
			"geoSpecLoc3Type": "", /*区域3类型*/
			"geoSpecLoc3": "", /*区域3代码 下面的都是新增 的字段*/
			"geoSpecTravelIndicator": "", /*指定区域*/
			"geoSpecExceptionStopTime": "", /*经停时间,新增字段*/
			"geoSpecExceptionStopUnit": "", /*经停单位*/
			"geoSpecStopConnDes": "", /*经停类型(限输入1位字母)*/
			"effectivePeriodType": "", /*延长类型*/
			"effectivePeriodNumber": "", /*延长时长*/
			"effectivePeriodUnit": "", /*延长时间单位*/
			"reuseList172VO": "",
			"reuseList173TicketVO": "",
			"reuseList183VO": "",
			"reuseList198VO": "",
			"reuseList198UpgradeVO": "",
			"reuseList171VO": "",
			"reuseList173TktVO": "",
			"reuseList186VO": "",
			"reuseList170VO": "",
			"reuseList196VO": "",
			"reuseList165VO": "",
			"reuseList201VO": "",
			"reuseList178Loc1": "",
			"reuseList178Loc2": "",
			"reuseList178Loc3": "",
			"reuseListTsk202VO": "",
			"allowancePeopleMinimum": "", /*服务适用范围起始*/
			"allowancePeopleMaximum": "", /*服务适用范围截止*/
			"serviceNumberMinimum": "", /*服务套数范围起始*/
			"serviceNumberMaximum": "", /*服务套数终止*/
			"firstUseDate": "", /*使用生效日期*/
			"lastUseDate": "", /*使用截止日期*/
			"useDateLimitTye": "", /*使用时间限制类型[时间段:‘’]或则[期限:'1']*/
			"flightPassTableTsk202": "",
			"listTsk202VO": [],
			"allowedService": "FLT", /*允许兑换的服务ALL:不限，FLT:航班--默认值，SVS:服务*/
			"subTbReferenceCountMap": {
				"list172VO": "0",
				"list173TicketVO": "0",
				"list183VO": "0",
				"list198VO": "0",
				"list198UpgradeVO": "0",
				"list171VO": "0",
				"list173TktVO": "0",
				"list186VO": "0",
				"list170VO": "0",
				"list196VO": "0",
				"list165VO": "0",
				"list201VO": "0",
				"list178Loc1": "0",
				"list178Loc2": "0",
				"list178Loc3": "0",
				"listTsk202VO": "0"
			}
		};
	}]);
	//});

/***/ },
/* 116 */
/***/ function(module, exports) {

	'use strict';

	//define(function(require, exports, module){ 
	var app = angular.module('app.factory', []);
	//require('angular-resource') ;
	module.exports = app;
	//return app ;
	//}) ;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//define(function(require, exports, module){ 
	var services = __webpack_require__(116);
	services.factory("TbShowHideServcie", function () {
		return {
			"list183VO": false,
			"list171VO": false,
			"list172VO": false,
			"list173TicketVO": false,
			"list173TktVO": false,
			"list165VO": false,
			"list186VO": false,
			"list196VO": false,
			"list198VO": false,
			"list198UpgradeVO": false,
			"list170VO": true,
			"list178Loc1": false,
			"list178Loc2": false,
			"list178Loc3": false,
			"listTsk202VO": false
		};
	});

	//自定义表格按钮是否显示service
	services.factory("CustomeEditTbStatusServcie", function () {
		return {
			"list183VO": false,
			"list171VO": false,
			"list172VO": false,
			"list173TicketVO": false,
			"list173TktVO": false,
			"list165VO": false,
			"list186VO": false,
			"list196VO": false,
			"list198VO": false,
			"list198UpgradeVO": false,
			"list170VO": false,
			"list178Loc1": false,
			"list178Loc2": false,
			"list178Loc3": false,
			"listTsk202VO": false
		};
	});

	services.factory("ListVo2tbNoMap", function () {
		return {
			"list183VO": "securityTableNo183",
			"list171VO": "cxrResFareTableNo171",
			"list172VO": "accountCodeTableNo172",
			"list173TicketVO": "ticketDesignatorTableNo173",
			"list173TktVO": "tktDesignatorTableNo173",
			"list165VO": "equipmentTypeTableNo165",
			"list186VO": "carrierFlightTableNo186",
			"list196VO": "textTableNo196",
			"list198VO": "rbdTableNo198",
			"list198UpgradeVO": "upgradeToRbdTableNo198",
			"list170VO": "serviceFeeCurTableNo170",
			"list178Loc1": "list178Loc1Id",
			"list178Loc2": "list178Loc2Id",
			"list178Loc3": "list178Loc3Id",
			"listTsk202VO": "flightPassTableTsk202"
		};
	});

	/*控制页面上的控件是否可编辑*/
	services.factory("FormEditStatusServcie", function () {
		return {
			"firstMaintenanceDate": true,
			"lastMaintenanceDate": true,
			"description": true,
			"fareBasis": true,
			"discountCode": true,
			"availability": true,
			"freeBaggageAllowancePieces": true,
			"firstExcessOccurrence": true,
			"lastExcessOccurrence": true,
			"freeBaggageAllowanceWeight": true,
			"freeBaggageAllowanceUnit": true,
			"baggageTravelApplication": true,
			"list196VO": true,
			"noChargeNotAvailable": true,
			"list170VO": true,
			"list201VO": true,
			"specSevFeeAndOrIndicator": true,
			"specifiedServiceFeeMileage": true,
			"specifiedServiceFeeApp": true,
			"specServiceFeeColSub": true,
			"specServiceFeeNetSell": true,
			"indicatorComission": true,
			"taxApplication": true,
			"sequenceNumber": true,
			"passengerTypeCode": true,
			"minPassengerAge": true,
			"maxPassengerAge": true,
			"firstPassengerOccurrence": true,
			"lastPassengerOccurrence": true,
			"frequentFlyerStatus": true,
			"mileageMinimum": true,
			"mileageMaximum": true,
			"customerIndexScoreMinimum": true,
			"customerIndexScoreMaxmum": true,
			"list172VO": true,
			"list183VO": true,
			"publicPrivateIndicator": true,
			"geoSpecFromToWithin": true,
			"geoSpecSectPortJourney": true,
			"geoSpecTravelIndicator": true,
			"geoSpecExceptionStopTime": true,
			"geoSpecExceptionStopUnit": true,
			"geoSpecStopConnDes": true,
			"geoSpecLoc1Type": true,
			"geoSpecLoc1": true,
			"list178Loc1": true,
			"geoSpecLoc2Type": true,
			"geoSpecLoc2": true,
			"list178Loc2": true,
			"geoSpecLoc3Type": true,
			"geoSpecLoc3": true,
			"list178Loc3": true,
			"travelStartDate": true,
			"travelEndDate": true,
			"startTime": true,
			"stopTime": true,
			"timeApplication": true,
			"dayOfWeek": true,
			"equipment": true,
			"list165VO": true,
			"list186VO": true,
			"cabin": true,
			"list198VO": true,
			"upgradeToCabin": true,
			"list198UpgradeVO": true,
			"advancedPurchasePeriod": true,
			"advancedPurchaseUnit": true,
			"tourCode": true,
			"list173TicketVO": true,
			"tariff": true,
			"rule": true,
			"list173TktVO": true,
			"list171VO": true,
			"advancedPurchaseTktIssue": true,
			"indicatorReissueRefund": true,
			"formOfRefund": true,
			"indicatorInterline": true,
			"allowancePeopleMinimum": true,
			"allowancePeopleMaximum": true,
			"effectivePeriodType": true,
			"effectivePeriodNumber": true,
			"effectivePeriodUnit": true,
			"serviceNumberMinimum": true,
			"serviceNumberMaximum": true,
			"firstUseDate": true,
			"lastUseDate": true,
			"mileageExchangeIndicator": true,
			"listTsk202VO": true
		};
	});

	//整个页面的组件在serviceType为xxx时应该显示到页面上(控制显隐关系)
	services.factory("FormStatusService", function () {
		return {
			"firstMaintenanceDate": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["firstMaintenanceDate"],
				"showFlag": true
			},
			"lastMaintenanceDate": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["lastMaintenanceDate"],
				"showFlag": true
			},
			"description": {
				"typeList": ["F", "M", "R", "T", "B", "E"],
				"groupList": [],
				"nameList": ["description"],
				"showFlag": true
			},
			"fareBasis": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["fareBasis"],
				"showFlag": true
			},
			"discountCode": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["discountCode"],
				"showFlag": true
			},
			"availability": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["availability"],
				"showFlag": true
			},
			"freeBaggageAllowancePieces": {
				"typeList": ["A"],
				"groupList": [],
				"nameList": ["freeBaggageAllowancePieces"],
				"showFlag": true
			},
			"firstAndLastExcessOccurrence": {
				"typeList": ["C", "P"],
				"groupList": [],
				"nameList": ["firstExcessOccurrence", "lastExcessOccurrence"],
				"showFlag": true
			},
			"freeBaggageAllowanceWeight": {
				"typeList": ["A", "C", "P"],
				"groupList": [],
				"nameList": ["freeBaggageAllowanceWeight", "freeBaggageAllowanceUnit"],
				"showFlag": true
			},
			"baggageTravelApplication": {
				"typeList": ["A", "C", "P"],
				"groupList": [],
				"nameList": ["baggageTravelApplication"],
				"showFlag": true
			},
			"list196VO": {
				"typeList": ["A", "C", "P"],
				"groupList": [],
				"nameList": ["list196VO"],
				"showFlag": true
			},
			"noChargeNotAvailable": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["noChargeNotAvailable"],
				"showFlag": true
			},
			"list170VOAndlist201VO": {
				"typeList": ["F", "M", "R", "T", "C", "P"],
				"groupList": [],
				"nameList": ["list170VO", "list201VO"],
				"showFlag": true
			},
			"specSevFeeAndOrIndicator": {
				"typeList": ["F", "M", "R", "T", "C", "P"],
				"groupList": [],
				"nameList": ["specSevFeeAndOrIndicator"],
				"showFlag": true
			},
			"specifiedServiceFeeMileage": {
				"typeList": ["F", "M", "R", "T", "C", "P"],
				"groupList": [],
				"nameList": ["specifiedServiceFeeMileage"],
				"showFlag": true
			},
			"specifiedServiceFeeApp": {
				"typeList": ["F", "M", "R", "T", "C", "P"],
				"groupList": [],
				"nameList": ["specifiedServiceFeeApp"],
				"showFlag": true
			},
			"specServiceFeeColSub": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["specServiceFeeColSub"],
				"showFlag": true
			},
			"specServiceFeeNetSell": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["specServiceFeeNetSell"],
				"showFlag": true
			},
			"indicatorComission": {
				"typeList": ["F", "M", "R", "T", "C", "P"],
				"groupList": [],
				"nameList": ["indicatorComission"],
				"showFlag": true
			},
			"taxApplication": {
				"typeList": ["F", "M", "R", "T", "C", "P"],
				"groupList": [],
				"nameList": ["taxApplication"],
				"showFlag": true
			},
			"sequenceNumber": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["sequenceNumber"],
				"showFlag": true
			},
			"passengerTypeCode": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["passengerTypeCode"],
				"showFlag": true
			},
			"minAndMaxPassengerAge": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["minPassengerAge", "maxPassengerAge"],
				"showFlag": true
			},
			"firstAndLastPassengerOccurrence": {
				"typeList": ["F", "M", "R", "T"],
				"groupList": [],
				"nameList": ["firstPassengerOccurrence", "lastPassengerOccurrence"],
				"showFlag": true
			},
			"frequentFlyerStatus": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["frequentFlyerStatus"],
				"showFlag": true
			},
			"mileageMinAndMaximum": {
				"typeList": ["F", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["mileageMinimum", "mileageMaximum"],
				"showFlag": true
			},
			"customerIndexScoreMinAndMaximum": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["customerIndexScoreMinimum", "customerIndexScoreMaxmum"],
				"showFlag": true
			},
			"list172VO": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["list172VO"],
				"showFlag": true
			},
			"list183VO": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["list183VO"],
				"showFlag": true
			},
			"publicPrivateIndicator": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["publicPrivateIndicator"],
				"showFlag": true
			},
			"geoSpecFromToWithin": {
				"typeList": ["F", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["geoSpecFromToWithin"],
				"showFlag": true
			},
			"geoSpecSectPortJourney": {
				"typeList": ["F", "R", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["geoSpecSectPortJourney"],
				"showFlag": true
			},
			"geoSpecTravelIndicator": {
				"typeList": ["F", "R", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["geoSpecTravelIndicator"],
				"showFlag": true
			},
			"geoSpecExceptionStopTimeAndUnit": {
				"typeList": ["F", "R", "A", "C", "P"],
				"groupList": [],
				"nameList": ["geoSpecExceptionStopTime", "geoSpecExceptionStopUnit"],
				"showFlag": true
			},
			"geoSpecStopConnDes": {
				"typeList": ["F", "R", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["geoSpecStopConnDes"],
				"showFlag": true
			},
			"geoSpecLoc1AndType": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["geoSpecLoc1Type", "geoSpecLoc1"],
				"showFlag": true
			},
			"list178Loc1": {
				"typeList": ["F", "M", "A", "C", "P", "T"],
				"groupList": [],
				"nameList": ["list178Loc1"],
				"showFlag": true
			},
			"geoSpecLoc2AndType": {
				"typeList": ["F", "R", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["geoSpecLoc2Type", "geoSpecLoc2"],
				"showFlag": true
			},
			"list178Loc2": {
				"typeList": ["F", "M", "A", "C", "P", "T"],
				"groupList": [],
				"nameList": ["list178Loc2"],
				"showFlag": true
			},
			"geoSpecLoc3AndType": {
				"typeList": ["F", "R", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["geoSpecLoc3Type", "geoSpecLoc3"],
				"showFlag": true
			},
			"list178Loc3": {
				"typeList": ["F", "M", "A", "C", "P", "T"],
				"groupList": [],
				"nameList": ["list178Loc3"],
				"showFlag": true
			},
			"travelStartDate": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["travelStartDate"],
				"showFlag": true
			},
			"travelEndDate": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["travelEndDate"],
				"showFlag": true
			},
			"startTime": {
				"typeList": ["F", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["startTime"],
				"showFlag": true
			},
			"stopTime": {
				"typeList": ["F", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["stopTime"],
				"showFlag": true
			},
			"timeApplication": {
				"typeList": ["hidden"],
				"groupList": [],
				"nameList": ["timeApplication"],
				"showFlag": true
			},
			"dayOfWeek": {
				"typeList": ["F", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["dayOfWeek"],
				"showFlag": true
			},
			"equipmentAndlist165": {
				"typeList": ["F", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["equipment", "list165VO"],
				"showFlag": true
			},
			"list186VO": {
				"typeList": ["F", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": [],
				"nameList": ["list186VO"],
				"showFlag": true
			},
			"cabin": {
				"typeList": ["F", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["cabin"],
				"showFlag": true
			},
			"list198VO": {
				"typeList": ["F", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["list198VO"],
				"showFlag": true
			},
			"upgradeToCabin": {
				"typeList": ["F", "M"],
				"groupList": ["UP", "BDUP"],
				"nameList": ["upgradeToCabin"],
				"showFlag": true
			},
			"list198UpgradeVO": {
				"typeList": ["F", "M"],
				"groupList": ["UP", "BDUP", "SA", "BDSA"],
				"nameList": ["list198UpgradeVO"],
				"showFlag": true
			},
			"advancedPurchasePeriodAndUnit": {
				"typeList": ["F", "M", "R", "T", "C", "P"],
				"groupList": [],
				"nameList": ["advancedPurchasePeriod", "advancedPurchaseUnit"],
				"showFlag": true
			},
			"tourCode": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["tourCode"],
				"showFlag": true
			},
			"list173TicketVO": {
				"typeList": ["F", "M", "R", "T", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["list173TicketVO"],
				"showFlag": true
			},
			"tariff": {
				"typeList": ["F", "R", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["tariff"],
				"showFlag": true
			},
			"rule": {
				"typeList": ["F", "R", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["rule"],
				"showFlag": true
			},
			"list173TktVO": {
				"typeList": ["F", "R", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["list173TktVO"],
				"showFlag": true
			},
			"list171VO": {
				"typeList": ["F", "R", "A", "B", "C", "P"],
				"groupList": [],
				"nameList": ["list171VO"],
				"showFlag": true
			},
			"advancedPurchaseTktIssue": {
				"typeList": ["F", "R", "T", "P"],
				"groupList": [],
				"nameList": ["advancedPurchaseTktIssue"],
				"showFlag": true
			},
			"indicatorReissueRefund": {
				"typeList": ["F", "M", "A", "C", "P", "T"],
				"groupList": [],
				"nameList": ["indicatorReissueRefund"],
				"showFlag": true
			},
			"formOfRefund": {
				"typeList": ["F", "M", "R", "T", "C", "P"],
				"groupList": [],
				"nameList": ["formOfRefund"],
				"showFlag": true
			},
			"indicatorInterline": {
				"typeList": ["F", "M", "R", "T", "C", "P"],
				"groupList": [],
				"nameList": ["indicatorInterline"],
				"showFlag": true
			},
			"allowancePeopleMinAndMaximum": { /*服务适用人数范围*/
				"typeList": ["F", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": ["FP"],
				"nameList": ["allowancePeopleMinimum", "allowancePeopleMaximum"],
				"showFlag": true
			},
			"effectivePeriodInfo": { /*延长时间*/
				"typeList": ["F", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": ["FL", "FP"],
				"nameList": ["effectivePeriodType", "effectivePeriodNumber", "effectivePeriodUnit"],
				"showFlag": true
			},
			"serviceNumberMinAndMaximum": { /*服务套数*/
				"typeList": ["F", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": ["FP"],
				"nameList": ["serviceNumberMinimum", "serviceNumberMaximum"],
				"showFlag": true
			},
			"firstAndLastUseDate": { /*期限开始*/
				"typeList": ["F", "R", "T", "A", "B", "C", "E", "P"],
				"groupList": ["FP"],
				"nameList": ["firstUseDate", "lastUseDate"],
				"showFlag": true
			},
			"mileageExchangeIndicator": {
				"typeList": ["F", "M", "R", "T", "C", "P"],
				"groupList": [],
				"nameList": ["mileageExchangeIndicator"],
				"showFlag": true
			}
		};
	});
	//}) ;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module){ 
	var app = __webpack_require__(116);
	var util = __webpack_require__(70);
	// $q 是内置服务，所以可以直接使用  //HttpOperService//S7EditService
	app.factory('HttpOperService', ['$http', '$q', function ($http, $q) {
		return {
			getDataByUrl: function getDataByUrl(url) {
				var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行  
				$http({ method: 'GET', url: url }).success(function (data, status, headers, config) {
					deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了  
				}).error(function (data, status, headers, config) {
					deferred.reject(data); // 声明执行失败，即服务器返回错误  
				});
				return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
			},
			postDate: function postDate(url, queryParam, config) {
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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//define(function(require, exports, module){ 
	__webpack_require__(120); //公共指令
	__webpack_require__(125); //基本信息指令
	//require("./tb198UpGradeDirective") ;//[座位属性表/升舱属性]table198指令
	__webpack_require__(126); //规则明细指令
	__webpack_require__(127); //规则明细指令
	//require("./select2Directive") ;//暂时不适用这个指令
	//加入校验指令
	__webpack_require__(131);
	//}) ;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		var directives = __webpack_require__(121);
		var _ = __webpack_require__(74);
		var jsonDataHelper = __webpack_require__(122);
		var commonUtil = __webpack_require__(123);

		var convertFirstCharUpper = function convertFirstCharUpper(str) {
			str = str || "";
			return str.replace(/(\w)/, function (v) {
				return v.toUpperCase();
			});
		};

		//显示隐藏表格
		directives.directive('showHideTable', ['TbShowHideServcie', function (TbShowHideServcie) {
			return {
				restrict: 'E',
				replace: true,
				scope: {},
				controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
					$scope.tableStatus = TbShowHideServcie;
				}],
				template: function template(elem, attrs) {
					var tname = attrs['tname'];
					var tmpStr = "tableStatus." + tname;
					var html = '<a  href = "javascript:void(0)"><span ng-show="' + tmpStr + '" >收起表格</span><span ng-show="!' + tmpStr + '">填写表格</span></a>';
					return html;
				},
				transclude: true,
				link: function link(scope, element, attrs) {
					element.bind('click', function () {
						var tname = attrs['tname'];
						scope.$apply(function () {
							scope.tableStatus[tname] = !scope.tableStatus[tname];
						});
					});
				}
			};
		}]);

		var _fillData4AutoComplete = function _fillData4AutoComplete(suggestion, tbname, FormData, FormEditStatusServcie, HttpOperService, customeEditStatus, tbnoName) {
			//scope.showCustomeEditFlag = true;
			var tbNO = suggestion.data;
			var url = FormData.contextPath + "/s7/queryTableInfoByTbNO.action?tbNO=" + tbNO + "&tbname=" + tbname;
			var promise = HttpOperService.getDataByUrl(url);
			var oldTbNo = FormData[tbnoName];
			var subTbReferenceCount = FormData['subTbReferenceCountMap'][tbname] * 1;
			var reusePropName = "reuse" + convertFirstCharUpper(tbname);
			promise.then(function (retData) {
				var list = jsonDataHelper.convert2TableDataList(retData.list, tbname);
				//如果当前标号与复用标号相同的话，并且是只被当前r7引用的话，说明不是复用，而是修改自己的记录
				if (subTbReferenceCount <= 1 && oldTbNo == tbNO) {
					//如果和之前的标号相同，并且被r7引用条数不大于1的话,可编辑
					//1.设置表格可编辑
					FormEditStatusServcie[tbname] = true;
					//2.清除复用标志
					FormData[reusePropName] = '';
					//3.隐藏自定义表格按钮
					customeEditStatus[tbname] = true;
				} else {
					FormEditStatusServcie[tbname] = false;
					//显示自定义表格按钮
					customeEditStatus[tbname] = true;
				}
				FormData[tbname] = list;
			}, function (error) {
				console.info('获取数据出错!' + error);
			});
		};

		directives.directive('ocComplete', ['FormEditStatusServcie', 'FormData', 'HttpOperService', 'ListVo2tbNoMap', 'TbShowHideServcie', 'CustomeEditTbStatusServcie', function (FormEditStatusServcie, FormData, HttpOperService, ListVo2tbNoMap, TbShowHideServcie, CustomeEditTbStatusServcie) {
			return {
				restrict: 'E',
				replace: true,
				scope: true,
				template: function template(elem, attrs) {
					//获取当前页面控件是否是非编辑状态
					var str = "";
					var tbname = attrs['tbname'];
					var reuseTablePropName = "reuse" + convertFirstCharUpper(tbname);
					var tbnoName = ListVo2tbNoMap[tbname];
					var potest = "placeholder" + convertFirstCharUpper(tbname);
					//var botext = "data."+tbnoName ;
					var sotext = "customeEditStatus." + tbname;
					str = '<span class="table_reuse">' + '<label class ="text-info">复用表号:</label>' + '<span style="position: relative;">' + '<input type="text" name="' + reuseTablePropName + '" ng-disable ="data.statusDes==\'3\'" class="autocomplete common_input" placeholder="{{::' + potest + '}}"  style="width: 100px"/>' + '<i class="glyphicon glyphicon-search gray" style="position: absolute;right: 10px;"></i>' + '</span>' + '<span class ="text-danger myhand marginL10" name="customeEdit"  ng-show="' + sotext + '" >自定义表格</span>' + '</span>';
					return str;
				},
				link: function link(scope, elem, attrs) {
					scope.data = FormData;
					var tbname = attrs['tbname'];
					var tbnoName = ListVo2tbNoMap[tbname];
					//是否显示自定义表格
					scope.customeEditStatus = CustomeEditTbStatusServcie;
					/*elem.find("i").bind('click',function(event){
	    	event.stopPropagation() ;
	    	event.preventDefault() ;
	    	//elem.find('input').focus() ;
	    }) ;*/
					//点击自定义表格按钮
					elem.find('span[name="customeEdit"]').bind('click', function (event) {
						//scope.showCustomeEditFlag = false;
						scope.customeEditStatus[tbname] = false;
						//1.清除复用的表号
						var reuseTablePropName = "reuse" + convertFirstCharUpper(tbname);
						FormData[reuseTablePropName] = '';
						//2.清除复用的list数据
						//var list = FormData[tbname] ;
						//获取当前页面控件是否是非编辑状态
						var editFlag = commonUtil.getEditFlagByStatus(FormData.statusDes);
						elem.find(':input').val('');
						scope.$apply(function () {
							FormEditStatusServcie[tbname] = editFlag;
							FormData[tbname] = [];
						});
						//清空placeholder提示
						elem.find(':input').removeAttr('placeholder');
						//只要被点击自定义就需要把这里置为-1，表示当前是自定义字表数据
						FormData[tbnoName] = '-1';
						/*//根据本引用次数判断是否清除源字表号(1.如果被引用一次则源表号任可重复利用，2.如果被多次引用则将源标号置为空)
	     var referenceCount = FormData.subTbReferenceCountMap[tbname] ;
	     if(referenceCount>1){
	     	//console.info('【'+referenceCount+'】被引用次数大于一，需要把源子表号置为空...') ;
	     	FormData[tbnoName] = '' ;
	     }*/
					});
					elem.find(".autocomplete").autocomplete({
						minChars: 0,
						serviceUrl: scope.data.contextPath + '/s7/queryTableNoByTableName.action',
						/*noCache:true,*/
						onSelect: function onSelect(suggestion) {
							//判断当前是否有数据，并且当前数据是否可编辑,如果这样的话要给出提示信息
							var list = FormData[tbname];
							var editFlag = commonUtil.getEditFlagByStatus(FormData.statusDes);
							var reuseTablePropName = "reuse" + convertFirstCharUpper(tbname);
							var reuseTableNo = FormData[reuseTablePropName];
							//判断当前表格是否可编辑
							var tbEditAbleFlag = FormEditStatusServcie[tbname];
							//当前表格如果可编辑那么
							if (list.length > 0 && editFlag && reuseTableNo == '' && tbEditAbleFlag) {
								$.showTuiConfirmDialog2('确定放弃已编辑的内容？', function () {
									var selectedTableNo = suggestion.data;
									var reuseTablePropName = "reuse" + convertFirstCharUpper(tbname);
									FormData[reuseTablePropName] = selectedTableNo;
									_fillData4AutoComplete(suggestion, tbname, FormData, FormEditStatusServcie, HttpOperService, scope.customeEditStatus, tbnoName);
									//将表格置为显示状态
									TbShowHideServcie[tbname] = true;
								}, function () {
									FormData[reuseTablePropName] = '';
									elem.find(':input').val('');
								});
							} else {
								var selectedTableNo = suggestion.data;
								var reuseTablePropName = "reuse" + convertFirstCharUpper(tbname);
								FormData[reuseTablePropName] = selectedTableNo;
								_fillData4AutoComplete(suggestion, tbname, FormData, FormEditStatusServcie, HttpOperService, scope.customeEditStatus, tbnoName);
								//将表格置为显示状态
								TbShowHideServcie[tbname] = true;
							}
						},
						paramName: 'q',
						params: { "tbname": tbname },
						transformResult: function transformResult(response) {
							var jsonData = JSON.parse(response);
							var flag = jsonData.flag;
							//console.info('flag : ' + flag) ;
							if (flag == 'true') {
								return {
									suggestions: $.map(jsonData.list, function (dataItem) {
										return { value: dataItem + "", data: dataItem };
									})
								};
							} else {
								//console.info('获取表格出错...') ;
								return {
									suggestions: []
								};
							}
						}
					});
				}
			};
		}]);

		//刚添加的一行表格td需要触发focus函数,否则如果直接点击页头部分的保存按钮将无法进行tui的require等校验//不知道为什么
		directives.directive('setFocus', function () {
			return {
				restrict: 'AE',
				replace: true,
				scope: true,
				link: function link(scope, elem, attrs) {
					elem.trigger('click');
				}
			};
		});

		//区域长度限制
		directives.directive('geoMaxLength', function () {
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

		function _convertStr2Json(jsonStr) {
			var str = jsonStr || '';
			str += '';
			var retJson = {};
			try {
				var retStr = str.replace(/'/g, '"');
				retJson = JSON.parse(retStr);
			} catch (e) {
				console.info(e);
			}
			return retJson;
		}

		//tui长度限制属性
		directives.directive('tuiMaxLength', function () {
			function _splitMaxLengtAttr(str) {
				str = str || '';
				str += '';
				var arr = [];
				var str1 = "";
				var str2 = "";
				try {
					var start1 = str.indexOf('{');
					var end1 = str.indexOf('}');
					str1 = str.substr(start1, end1 + 1);
					var start2 = str.indexOf('[');
					var end2 = str.indexOf(']');
					str2 = str.substring(start2 + 1, end2);
				} catch (e) {
					console.info(e);
				}
				if (str1.length > 0 && str2.length > 0) {
					arr[0] = str1;
					arr[1] = str2;
				}
				return arr;
			}
			return {
				restrict: 'AE',
				replace: true,
				scope: true,
				link: function link(scope, element, attrs) {
					var attrStr = attrs['tuiMaxLength'];
					var infoArr = _splitMaxLengtAttr(attrStr);
					var str1 = "";
					var str2 = "";
					var jsonObj = {};
					//填写的字符串是否格式完好
					var goodStrFlag = false;
					if (infoArr.length == 2) {
						goodStrFlag = true;
						str1 = infoArr[0];
						str2 = infoArr[1];
						jsonObj = _convertStr2Json(str1);
					}
					if (goodStrFlag) {
						scope.$watch(attrs['tuiMaxLength'], function () {
							var value2 = scope.$eval(str2);
							var valueAtrr = jsonObj[value2];
							element.attr('maxlength', valueAtrr);
						});
					}
				}
			};
		});

		directives.directive("upperInput", function () {
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
		//178表格显示隐藏的链接指令
		directives.directive('linkTable', ['TbShowHideServcie', 'FormEditStatusServcie', function (TbShowHideServcie, FormEditStatusServcie) {
			return {
				restrict: 'AE',
				replace: true,
				scope: {
					list: '=',
					tbname: '@'
				},
				controller: ['$scope', function ($scope) {
					$scope.showStatus = TbShowHideServcie;
					$scope.editStatus = FormEditStatusServcie;
					//点击显示隐藏表格事件处理
					$scope.myClick = function () {
						var tbname = $scope.tbname;
						$scope.showStatus[tbname] = !$scope.showStatus[tbname];
						if (!$scope.showStatus[tbname]) {
							////点击取消自定义区域
							var len = $scope.list.length;
							if ($scope.editStatus[tbname]) {
								//如何表格可编辑则清空数据
								outAllSelect();
								$scope.list.splice(0, len);
							}
						}
					};
					function outAllSelect() {
						//将所有tr全部置为非选中状态
						angular.forEach($scope.list, function (l) {
							l.selected = false;
						});
					}
				}],
				template: function template(elem, attrs) {
					var strtip = attrs['strtip'];
					var tbname = attrs['tbname'];
					var tmp = "showStatus." + tbname;
					var retstr = '<a href="javascript:void(0)"><span ng-show="!' + tmp + '">' + strtip + '</span><span ng-show="' + tmp + '">取消自定义</span></a>';
					return retstr;
				},
				link: function link(scope, elem, attrs) {
					elem.bind('click', function () {
						scope.$apply(function () {
							scope.myClick();
						});
					});
				}
			};
		}]);

		//日期时间插件
		directives.directive('datetimepicker', [function () {
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
						validator.element(iElement);
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
					optionObj.minDate = minDate;
					optionObj.showButtonPanel = true;
					//optionObj.showSecond = true ;
					iElement.datetimepicker(optionObj);
				}
			};
		}]);
		//日期插件
		directives.directive('datepicker', function () {
			return {
				restrict: 'A',
				scope: true,
				require: 'ngModel',
				link: function link(scope, elem, attr, ctrl) {
					if (!ctrl) return;
					var minDateStr = attr['datepicker'];
					var minDate = new Date(minDateStr);
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
						// validator.element(elem) ;
						if (scope.select) {
							scope.$apply(function () {
								scope.select({ date: dateText });
							});
						}
					};
					optionObj.minDate = minDate;
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
		//时间插件
		directives.directive('timepicker', function () {
			return {
				restrict: 'A',
				scope: {},
				link: function link(scope, elem, attr) {
					var timeVar = {
						controlType: 'select',
						timeFormat: 'HHmm',
						timeOnly: true,
						timeOnlyTitle: '选择时间', //Choose Time
						timeText: '时间', //Time
						hourText: '小时', //Hou
						minuteText: '分钟', //Minute
						currentText: '当前', //Current
						closeText: '关闭' //Close
					};
					$(elem).datetimepicker(timeVar);
				}
			};
		});

		//重置数据
		var resetDataByFlag = function resetDataByFlag(nameList, flag, data, orgData) {
			if (!flag) {
				//如果隐藏这需要重置数据
				for (var i = 0; i < nameList.length; i++) {
					var curName = nameList[i];
					var oldValue = orgData[curName];
					var tmpValue = "";
					if (_.isArray(oldValue)) {
						//如果是数组则
						tmpValue = [];
					} else if (_.isObject(oldValue)) {
						tmpValue = angular.copy(oldValue);
					}
					data[curName] = tmpValue;
				}
			}
		};

		var getFlagByServiceTypeAndServiceGroup = function getFlagByServiceTypeAndServiceGroup(typeList, groupList, serviceType, serviceGroup) {
			var flag = _.contains(typeList, serviceType);
			if (flag && groupList && groupList.length > 0) {
				flag = _.contains(groupList, serviceGroup);
			}
			return flag;
		};

		directives.directive('force', ['FormStatusService', 'FormData', function (FormStatusService, FormData) {
			return {
				restrict: 'A',
				scope: { orgData: '=' },
				link: function link(scope, elem, attrs) {
					//
					//@param : event 事件本身
					//@param ：needDigest ： 是否需要手动进行脏数据检查
					scope.$on('serviceTypeChangeNotice', function (event, needDigest) {
						for (var fname in FormStatusService) {
							var typeList = FormStatusService[fname]['typeList'];
							var groupList = FormStatusService[fname]['groupList'];
							var serviceType = FormData.serviceType;
							var serviceGroup = FormData.sel1.value;
							var oldFlag = FormStatusService[fname]['showFlag'];
							var flag = getFlagByServiceTypeAndServiceGroup(typeList, groupList, serviceType, serviceGroup);
							/*if(fname=='mileageExchangeIndicator'){
	      	console.info('oldFlag : ' + oldFlag) ;
	      	console.info('serviceTypeChangeNotice --->  fname : [' + fname + ']-- flag : [' + flag + ']   , serviceType : ['+serviceType+'] , typeList ['+typeList+'] , groupList :['+groupList+']  , servcieGroup : ['+serviceGroup+'] ') ;
	      }*/
							//console.info('serviceTypeChangeNotice --->  fname : [' + fname + ']-- flag : [' + flag + ']   , serviceType : ['+serviceType+'] , typeList ['+typeList+'] , groupList :['+groupList+']  , servcieGroup : ['+serviceGroup+'] ') ;
							if (oldFlag == !flag) {
								//如果不同
								var nameList = FormStatusService[fname]['nameList'];
								resetDataByFlag(nameList, flag, FormData, scope.orgData);
								FormStatusService[fname]['showFlag'] = flag;
								/*if(fname=='mileageExchangeIndicator'){
	       	console.info("FormStatusService[fname]['showFlag'] : " + FormStatusService[fname]['showFlag'])
	       }*/
								if (needDigest && needDigest == 'true') {
									scope.$digest();
								}
							}
						}
					});
					// @param :event :自带的事件本身
					// @param :in_fname : 传入的forceName
					// @param :in_flag :传入的隐藏显示的falg----第一要传递字符串
					// @param :needDigest ：是否需要手动脏数据检查  第一要传递字符串
					scope.$on('singleChangeByFlagNotice', function (event, in_fname, in_flag, needDigest) {
						var fname = in_fname;
						var newFlag = in_flag == 'true' ? true : false;
						var oldFlag = FormStatusService[fname]['showFlag'];
						//console.info("singleChangeByFlagNotice -------> fname : ["+fname+"] , newFlag : ["+newFlag+"] , oldFlag : ["+oldFlag+"] ") ;
						//****这里需要修复一个bug,typeList如果判断为显示，说明传过来的flag才真正应该为true,如果typeList判断为false那么无论外面传入的是否为true，都因该被置为false
						var typeList = FormStatusService[fname]['typeList'];
						var groupList = FormStatusService[fname]['groupList'];
						var serviceType = FormData.serviceType;
						var serviceGroup = FormData.sel1.value;
						var typeFlag = getFlagByServiceTypeAndServiceGroup(typeList, groupList, serviceType, serviceGroup);
						//如果根据typeList判断因该隐藏，那么一定为隐藏，否则根据传入的flag做判断
						if (typeFlag == false) {
							newFlag = false;
						}
						if (newFlag == !oldFlag) {
							//当前显隐与将要的显隐相反时
							var nameList = FormStatusService[fname]['nameList'];
							resetDataByFlag(nameList, newFlag, FormData, scope.orgData);
							FormStatusService[fname]['showFlag'] = newFlag;
							if (needDigest && needDigest == 'true') {
								scope.$digest();
							}
						} else {
							//console.info('当前显隐与将要发生的显隐相同，不需要切换') ;
						}
					});
				}
			};
		}]);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 121 */
/***/ function(module, exports) {

	'use strict';

	//define(function(require, exports, module){ 
	var directives = angular.module('app.directives', []);
	module.exports = directives;
	// return directives ;
	//}) ;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function (require, exports, module) {
	var _ = __webpack_require__(74);
	var util = __webpack_require__(123);
	var editJsonData = __webpack_require__(124);

	module.exports = {
		getNoChargeNotAvailableList: function getNoChargeNotAvailableList(serviceType) {
			var tmp = serviceType || '';
			var retArr = []; //{"name":"免费，行李规则遵循市场方航空公司规则","value":"D"},{"name":"免费，行李规则遵循承运方航空公司规则","value":"O"}
			var defaultArr = [{ "name": "收费", "value": "" }, { "name": "不适用", "value": "X" }, { "name": "免费，不出EMD单", "value": "F" }, { "name": "免费，出EMD单", "value": "E" }, { "name": "免费，不出EMD单，不要求预定", "value": "G" }, { "name": "免费，出EMD单，不要求预定", "value": "H" }];
			var abrAllArr = [{ "name": "收费", "value": "" }, { "name": "不适用", "value": "X" }, { "name": "免费，不出EMD单", "value": "F" }, { "name": "免费，出EMD单", "value": "E" }, { "name": "免费，不出EMD单，不要求预定", "value": "G" }, { "name": "免费，出EMD单，不要求预定", "value": "H" }, { "name": "免费，行李规则遵循市场方航空公司规则", "value": "D" }, { "name": "免费，行李规则遵循承运方航空公司规则", "value": "O" }];
			if (tmp == 'A') {
				//A为免费行李，要显示待确认
				retArr = abrAllArr;
			} else if (tmp == 'B') {
				retArr = [{ "name": "免费，不出EMD单", "value": "F" }];
			} else if (tmp == 'E') {
				retArr = [{ "name": "不适用", "value": "X" }];
			} else if (tmp == 'C' || tmp == 'P') {
				retArr = abrAllArr;
			} else {
				retArr = defaultArr;
			}
			return retArr;
		},
		getSpecifiedServiceFeeAppList: function getSpecifiedServiceFeeAppList(serviceType) {
			/**适用于**/
			var tmp = serviceType || '';
			var arr = [{ "name": "每一个票价组成部分算一次服务费用", "value": "1" }, { "name": "每一个票价组成部分算一半的服务费用", "value": "2" }, { "name": "每用一次服务算一次服务费用", "value": "3" }, { "name": "匹配的部分航程算一次服务费用", "value": "4" }, { "name": "往返程服务费用【F/R/T】", "value": "5" }];
			switch (tmp) {
				case 'F':
					arr = [{ "name": "每一个票价组成部分算一次服务费用", "value": "1" }, { "name": "每一个票价组成部分算一半的服务费用", "value": "2" }, { "name": "每用一次服务算一次服务费用", "value": "3" }, { "name": "匹配的部分航程算一次服务费用", "value": "4" }, { "name": "往返程服务费用【F/R/T】", "value": "5" }];
					break;
				case 'M':
					arr = [{ "name": "每用一次服务算一次服务费用", "value": "3" }];
					break;
				case 'R':
					arr = [{ "name": "往返程服务费用【F/R/T】", "value": "5" }];
					break;
				case 'T':
					arr = [{ "name": "每用一次服务算一次服务费用", "value": "3" }, { "name": "往返程服务费用【F/R/T】", "value": "5" }];
					break;
				case 'A':
					arr = [];
					break;
				case 'B':
					arr = [];
					break;
				case 'C':
					arr = [{ "name": "按托运点收费", "value": "3" }, { "name": "按全行程收费", "value": "4" }, { "name": "每公斤按公布运价的0.5%收费", "value": "H" }, { "name": "每公斤按公布运价的1%收费", "value": "C" }, { "name": "每公斤按公布运价的1.5%收费", "value": "P" }, { "name": "按每公斤收费", "value": "K" }, { "name": "按每5公斤收费", "value": "F" }];
					break;
				case 'E':
					arr = [];
					break;
				case 'P':
					arr = [{ "name": "按托运点收费", "value": "3" }, { "name": "按全行程收费", "value": "4" }, { "name": "每公斤按公布运价的0.5%收费", "value": "H" }, { "name": "每公斤按公布运价的1%收费", "value": "C" }, { "name": "每公斤按公布运价的1.5%收费", "value": "P" }, { "name": "按每公斤收费", "value": "K" }, { "name": "按每5公斤收费", "value": "F" }];
					break;
				default:
					console.info('传入的serviceType有问题');
			}
			return arr;
		},
		getgeoSpecSectPortJourneyList: function getgeoSpecSectPortJourneyList(serviceType, subGroup) {
			var tmp = serviceType || ''; //geoSpecSectPortJourneyList
			var tmp2 = subGroup || '';
			var arr = [{ "name": "Sector", "value": "S" }, { "name": "Portion", "value": "P" }, { "name": "Journey", "value": "J" }];
			var isBaggageFlag = util.checkBaggageServcie(tmp);
			if (_.contains(['B', 'E'], tmp)) {
				arr = [{ "name": "Sector", "value": "S" }];
			} else if (_.contains(['A', 'C', 'P'], tmp)) {
				arr = [{ "name": "选择", "value": "" }, { "name": "Portion", "value": "P" }, { "name": "Journey", "value": "J" }];
			} else if (_.contains(['M', 'R', 'T'], tmp)) {
				arr = [{ "name": "选择", "value": "" }];
			} else if (tmp == 'F') {
				if (tmp2 == 'FP') {
					arr = [{ "name": "Portion", "value": "P" }, { "name": "Journey", "value": "J" }];
				} else {
					arr = [{ "name": "Sector", "value": "S" }, { "name": "Portion", "value": "P" }, { "name": "Journey", "value": "J" }];
				}
				//arr = [{"name":"Sector","value":"S"},{"name":"Portion","value":"P"},{"name":"Journey","value":"J"}] ;
			}
			return arr;
		},
		convert2TableDataList: function convert2TableDataList(list, tbname) {
			list = list || [];
			var len = list.length;
			var retList = [];
			var tmpObj = editJsonData['tableData'][tbname]['addObj'] || {};
			var propArr = [];
			for (var prop in tmpObj) {
				if (prop != 'selected') {
					propArr.push(prop);
				}
			}
			_.each(list, function (item) {
				var obj = {};
				_.each(propArr, function (prop) {
					obj[prop] = item[prop] + '';
				});
				retList.push(obj);
			});
			return retList;
		},
		getEffectivePeriodTypeList: function getEffectivePeriodTypeList(subGroup) {
			var arr = [{ "name": "选择", "value": "" }, { "name": "距购买服务后", "value": "A" }, { "name": "距服务兑换后", "value": "B" }, { "name": "距航班起飞前", "value": "D" }];
			if (subGroup == 'FP') {
				arr = [{ "name": "选择", "value": "" }, { "name": "距购买服务后", "value": "A" }];
			} else if (subGroup == 'FL') {
				arr = [{ "name": "选择", "value": "" }, { "name": "距服务兑换后", "value": "B" }, { "name": "距航班起飞前", "value": "D" }];
			}
			return arr;
		}
	};

	//}) ;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function (require, exports, module) {
	var _ = __webpack_require__(74);
	module.exports = {
		checkCommonServcie: function checkCommonServcie(serviceType) {
			//判断服务类型是不是一般附加服务
			var arr = ['F', 'M', 'R', 'T'];
			var flag = _.contains(arr, serviceType);
			return flag;
		},
		checkBaggageServcie: function checkBaggageServcie(serviceType) {
			//判断服务类型是不是行李附加服务
			var arr = ['A', 'B', 'C', 'E', 'P'];
			var flag = _.contains(arr, serviceType);
			return flag;
		},
		getFullDayOrMonthStr: function getFullDayOrMonthStr(dateOrMonthNum) {
			//获得日或月的字符串
			if (dateOrMonthNum < 10) {
				return "0" + dateOrMonthNum;
			}
			return dateOrMonthNum + "";
		},
		getEditFlagByStatus: function getEditFlagByStatus(statusDes) {
			//通过status获取是否可编辑的flag
			if (statusDes == '3') {
				return false;
			} else {
				return true;
			}
		}
	};
	//}) ;

/***/ },
/* 124 */
/***/ function(module, exports) {

	"use strict";

	//define(function (require, exports, module) {
	var jsonData = {
	  advancedPurchasePeriodList: [//提前购票时间单位
	  { "name": "分", "value": "N" }, { "name": "小时", "value": "H" }, { "name": "天", "value": "D" }, { "name": "月", "value": "M" }], //advancedPurchasePeriodList end
	  tableData: {
	    "list170VO": {
	      "addObj": { "saleGeographicPointType": "", "saleGeographicPoint": "", "specFeeAmount": "", "specFeeCurrency": "CNY", "selected": true }
	    },
	    "list198VO": {
	      "addObj": { "mktOp": "", "cxr": "", "rbd1": "", "rbd2": "", "rbd3": "", "rbd4": "", "rbd5": "", "selected": true }
	    },
	    "list198UpgradeVO": {
	      "addObj": { "mktOp": "E", "cxr": "", "rbd1": "", "rbd2": "", "rbd3": "", "rbd4": "", "rbd5": "", "selected": true }
	    },
	    "list196VO": {
	      "addObj": { "count": "", "code": "", "selected": true }
	    },
	    "list186VO": {
	      "addObj": { "mktCarrier": "", "optCarrier": "", "fltNo1": "", "fltNo2": "", "selected": true }
	    },
	    "list183VO": {
	      "addObj": { "travelAgency": "", "carrierGds": "", "dutyFunctionCode": "", "geographicSpecificationType": "", "geographicSpecification": "", "codeType": "", "code": "", "viewBookTkt": 1, "selected": true }
	    },
	    "list165VO": {
	      "addObj": { "equipmentCode": "", "selected": true }
	    },
	    "list171VO": {
	      "addObj": { "carrier": "", "resFareClassCode": "", "fareTypeCode": "", "selected": true }
	    },
	    "list172VO": {
	      "addObj": { "accountCode": "", "selected": true }
	    },
	    "list173TicketVO": {
	      "addObj": { "ticketDesignator": "", "selected": true }
	    },
	    "list173TktVO": {
	      "addObj": { "ticketDesignator": "", "selected": true }
	    },
	    "list178Loc1": {
	      "addObj": { "geoLocType": "", "geoLocSpec": "", "appl": "", "selected": true }
	    },
	    "list178Loc2": {
	      "addObj": { "geoLocType": "", "geoLocSpec": "", "appl": "", "selected": true }
	    },
	    "list178Loc3": {
	      "addObj": { "geoLocType": "", "geoLocSpec": "", "appl": "", "selected": true }
	    },
	    "listTsk202VO": { /*originalFareErspNo*/
	      "addObj": { "allowedRbd": "", "originalFareOffice": "", "originalFareIataNo": "", "originalFareErspNo": "",
	        "originalFareDepartmentCode": "", "originalFareBasis": "", "newFareBasis": "", "flightSpreadFactor": "0",
	        "flightSpreadAmount": "", "flightSpreadUnit": "", "flightTourCodeFactor": "", "flightTourCodeText": "",
	        "flightEiFactor": "", "flightEiText": "", "selected": true
	      }
	    }
	  }, //table end
	  weightUnitList: [//行李重量单位集合
	  { "name": "选择", "value": "" }, { "name": "千克", "value": "K" }, { "name": "磅", "value": "P" }],
	  specServiceFeeColSubList: [//SPEC_SERVICE_FEE_COL_SUB//包含/扣除
	  { "name": "包含在票价中", "value": "I" }, { "name": "单独收费", "value": "" }],
	  noChargeNotAvailableList: [//免费/收费
	  { "name": "收费", "value": "" }, { "name": "不适用", "value": "X" }, { "name": "免费，不出EMD单", "value": "F" }, { "name": "免费，出EMD单", "value": "E" }, { "name": "免费，不出EMD单，不要求预定", "value": "G" }, { "name": "免费，出EMD单，不要求预定", "value": "H" }, { "name": "免费，行李规则遵循市场方航空公司规则", "value": "D" }, { "name": "免费，行李规则遵循承运方航空公司规则", "value": "O" }],
	  specServiceFeeNetSellList: [//净价/销售价
	  { "name": "销售价", "value": "" }, { "name": "净价", "value": "N" }],
	  baggageTravelApplicationList: [{ "name": "必须匹配所有的航段", "value": "A" }, { "name": "至少匹配一个航段", "value": "S" }, { "name": "必须匹配旅行航段中的主航段", "value": "M" }, { "name": "必须匹配整个行程的每一段", "value": "J" }, { "name": "不限制", "value": "" }],
	  noCharge_notAvailableList: [{ "name": "收费", "value": "" }, { "name": "不适用", "value": "X" }, { "name": "免费，不出EMD单", "value": "F" }, { "name": "免费，出EMD单", "value": "E" }, { "name": "免费，不出EMD单，不要求预定", "value": "G" }, { "name": "免费，出EMD单，不要求预定", "value": "H" }, { "name": "免费，行李规则遵循市场方航空公司规则", "value": "D" }, { "name": "免费，行李规则遵循承运方航空公司规则", "value": "O" }],
	  cabinList: [//舱位list集合
	  { "name": "选择", "value": "" }, { "name": "豪华头等舱", "value": "R" }, { "name": "头等舱", "value": "F" }, { "name": "豪华商务舱", "value": "J" }, { "name": "商务舱", "value": "C" }, { "name": "豪华经济舱", "value": "P" }, { "name": "经济舱", "value": "Y" }],
	  geoLocTypeList: [//区域集合
	  { "name": "选择", "value": "" }, { "name": "大区", "value": "A" }, { "name": "城市", "value": "C" }, { "name": "国家", "value": "N" }, { "name": "机场", "value": "P" }, { "name": "州", "value": "S" }, { "name": "区域", "value": "Z" }],
	  indicatorReissueRefundList: [{ "name": "不可退款", "value": "N" }, { "name": "可退款", "value": "Y" }, { "name": "可改", "value": "R" }],
	  formOfRefundList: [//退款形式
	  { "name": "选择", "value": "" }, { "name": "按原付款渠道退款", "value": "1" }, { "name": "按电子凭证退款", "value": "2" }],

	  geoSpecExceptionStopUnitList: [{ "name": "选择", "value": "" }, { "name": "分", "value": "N" }, { "name": "小时", "value": "H" }, { "name": "天", "value": "D" }, { "name": "月", "value": "M" }],
	  timeApplicationList: [{ "name": "选择", "value": "" }, { "name": "分别", "value": "D" }, { "name": "之间", "value": "R" }],
	  effectivePeriodTypeList: [//effective_period_type//延长类型
	  { "name": "选择", "value": "" }, { "name": "距购买服务后", "value": "A" }, { "name": "距服务兑换后", "value": "B" }, { "name": "距航班起飞前", "value": "D" }],
	  effectivePeriodUnitList: [//effective_period_unit//延长时间单位
	  { "name": "天", "value": "D" }, { "name": "月", "value": "M" }, { "name": "小时", "value": "H" }]
	};
	module.exports = jsonData;
	//return jsonDate ;
	//}) ;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
		var _ = __webpack_require__(74);
		var directives = __webpack_require__(121);
		//var headerHtml = require("../tpls/header.html") ;
		//var chooseDivHtml = require("../tpls/choose_div.html") ;
		//var chooseUlHtml = require("../tpls/choose-ul.html") ;
		/*directives.directive('headerNav', function() {
	    return {
	        restrict: 'E',
	        replace: true,
	 	scope:true,
	        template: function(elem,attrs){
	        	var action  = $.trim($("#action").val()) ;
	        	var headerTipStr = "" ;
	        	 if(action=="add"){
	    			 headerTipStr = "新建服务费用" ;
	    		  }else{//表示为修改页面跳转过来的
	    		  	  headerTipStr = "更新服务费用" ;
	    		  }
	        	 var template = _.template(headerHtml);
	        	 var str = template({headerTipStr: headerTipStr});
	        	return str ;
	        },
	        link:function(scope,elem,attrs){
	        	scope.backPage = function (){
	        		  var contextPath = $.trim($("#contextPath").val());
	    			  window.location.href= contextPath+'/oc/toQueryS7UI.action' ;
	    		  }
	        }
	    };
	 });*/

		/*directives.directive('chooseDiv', function() {
	    return {
	        restrict: 'AE',
	        replace: true,
	 	scope:true,
	 	transclude:true,
	        template: chooseDivHtml,
	 	compile: function compile(tElement, tAttrs, transclude){
	 		var urlStr = tAttrs['htmlUrl'] ;
	 		var template = _.template(chooseUlHtml);
	 		var htmlStr = template({value: urlStr});
	 		var tmpDiv = tElement.find('div.service_list') ;
	 		tmpDiv.append(htmlStr) ;
	 	}
	    };
	 });*/
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module){ 
	var directives = __webpack_require__(121);
	directives.directive('geoSpecInput', function () {
			return {
					restrict: 'E',
					replace: true,
					scope: true,
					template: geoSpecInputHtml,
					transclude: true
			};
	});
	//}) ;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//define(function(require, exports, module){ 
	var directives = __webpack_require__(121);
	var tableHtml = __webpack_require__(128);
	var trHtml = __webpack_require__(129);
	var theadHtml = __webpack_require__(130);
	var _ = __webpack_require__(74);
	//重置数据
	function reseat198VO(l198) {
		if (l198) {
			l198.cxr = "";
			l198.rbd1 = "";
			l198.rbd2 = "";
			l198.rbd3 = "";
			l198.rbd4 = "";
			l198.rbd5 = "";
		}
	}
	function outAllSelect(list) {
		//将所有tr全部置为非选中状态
		angular.forEach(list, function (l) {
			l.selected = false;
		});
	}

	directives.directive('tableInfo', ['FormEditStatusServcie', 'FormData', function (FormEditStatusServcie, FormData) {
		return {
			restrict: 'AE',
			replace: true,
			template: function template(elem, atrrs) {
				return tableHtml;
			},
			scope: {
				tableData: '=',
				list: '='
			},
			controller: ['$scope', function ($scope) {
				$scope.data = FormData;
				$scope.editStatus = FormEditStatusServcie;
				//新增一行记录
				this.tbAddLine = function () {
					outAllSelect($scope.list);
					var obj = angular.copy($scope.tableData.addObj);
					$scope.list.push(obj);
				};
				//删除一行记录
				this.tbDelLine = function () {
					var len = $scope.list.length;
					if (len >= 1) {
						var num = len - 1;
						angular.forEach($scope.list, function (l, index) {
							if (l.selected) {
								num = index;
							}
						});
						outAllSelect($scope.list);
						$scope.list.splice(num, 1);
					}
				};

				$scope.clickTr = function (l) {
					outAllSelect($scope.list);
					l.selected = true;
				};
				//下面是特殊的部分，select可能会存在//如果你的表格比较特殊的话可能需要修改修改下面的部分代码
				/**这一部分算是半工作能够部分(因为有的表格会使用这部分数据，但是有的表格不使用这部分数据)**/
				$scope.geoSpecTypeList = [{ "name": "选择", "value": "" }, { "name": "大区", "value": "A" }, { "name": "城市", "value": "C" }, { "name": "国家", "value": "N" }, { "name": "机场", "value": "P" }, { "name": "州", "value": "S" }, { "name": "区域", "value": "Z" }];
				$scope.codeTypeList = [{ "name": "选择", "value": "" }, { "name": "代理人office号", "value": "T" }, { "name": "IATA号", "value": "I" }, { "name": "Department/Identifier", "value": "X" }, { "name": "CRS/CXR Department Code", "value": "V" }, { "name": "ERSP No", "value": "E" }, { "name": "LNIATA Number (CRT Address)", "value": "L" }, { "name": "Airline specific codes", "value": "A" }];
				//市场方/承运方
				$scope.marketingOpreratingList = [{ "name": "选择", "value": "" }, { "name": "市场方", "value": "M" }, { "name": "承运方", "value": "O" }, { "name": "市场方/承运方", "value": "E" }];

				//市场方/承运方(升舱的时候不存在空，所以特殊定制)
				$scope.marketingOpreratingList2 = [{ "name": "市场方", "value": "M" }, { "name": "承运方", "value": "O" }, { "name": "市场方/承运方", "value": "E" }];

				/*********183特殊部分开始*******************/
				$scope.selectChange183Tb1 = function (l183) {
					l183.geographicSpecification = "";
				};
				$scope.selectChange183Tb2 = function (l183) {
					l183.code = "";
				};
				$scope.viewBookTktList = [// 权限list
				{ "name": "查看/订票/出票", "value": 1 }, { "name": "仅查看", "value": 2 }];
				/*********183特殊部分结束*******************/

				/*********198特殊部分开始*******************/
				$scope.selectChange198Tb = function (l198) {
					reseat198VO(l198);
				};

				$scope.selectChange198TbUpGrade = function (l198UpGrade) {
					reseat198VO(l198UpGrade);
				};
				/*********198特殊部分结束*******************/
				/*********170特殊部分开始*******************/
				$scope.selectChange170Tb = function (l170) {
					reseat170VO(l170);
				};
				function reseat170VO(l170) {
					if (l170) {
						l170.saleGeographicPoint = "";
					}
				}
				/*********170特殊部分结束*******************/
				//178表格的区域select框发生变化时触发的函数
				$scope.selectChange178Tb = function (l178) {
					l178.geoLocSpec = "";
				};
				//tsk202子表的特殊处理函数
				$scope.customeEdit202Text = function (oldValue, type, index) {
					//tbTSKCustomeEdit_type//tbTSKCustomeEdit_index//tbTSKCustomeEdit_value
					$("#tbTSKCustomeEdit_type").val(type);
					$("#tbTSKCustomeEdit_index").val(index);
					$("#tbTSKCustomeEdit_value").val(oldValue);
					//显示的时候清除可能存在的错误提示
					$("#tskCustomeTipInfo").html("");
					$("#tbTSK202Modal").modal("show");
					$("#tbTSKCustomeEdit_value").focus();
					if ("flightTourCodeText" == type) {
						//13个字
						$("#tbTSKCustomeEdit_value").attr("maxLength", 13);
					} else if ("flightEiText" == type) {
						//80个字
						$("#tbTSKCustomeEdit_value").attr("maxLength", 80);
					}
				};
				//
				$scope.changeFlightSpreadFactor = function (l) {
					var flightSpreadFactor = l.flightSpreadFactor;
					l.flightSpreadAmount = "";
					if (flightSpreadFactor == "2") {
						l.flightSpreadUnit = "CNY";
					} else {
						l.flightSpreadUnit = "";
					}
				};
			}],
			controllerAs: 'ctrl',
			compile: function compile(tElement, tAttrs, transclude) {
				var urlStr = tAttrs['htmlUrl'];
				var headerTeplate = _.template(theadHtml);
				var bodyTemplate = _.template(trHtml);
				var headStr = headerTeplate({ value: urlStr });
				var bodyStr = bodyTemplate({ value: urlStr });
				var tableElement = angular.element(tElement);
				tableElement.find('thead').append(headStr);
				tableElement.find('tbody').append(bodyStr);
				return {
					post: function post(scope, element, attrs, ctrl) {
						var tbname = attrs['tbname'];
						element.find(".delete_line").bind('click', function () {
							if (scope.editStatus[tbname]) {
								//当当前表格可以编辑时
								scope.$apply(function () {
									ctrl.tbDelLine();
								});
							} else {
								//console.info('表格['+tbname+']当前的状态为：不可编辑') ;
							}
						});
						element.find(".add_line").bind('click', function () {
							if (scope.editStatus[tbname]) {
								//当当前表格可以编辑时
								scope.$apply(function () {
									ctrl.tbAddLine();
								});
							} else {
								//console.info('表格['+tbname+']当前的状态为：不可编辑') ;
							}
						});
					}
				};
			}
		};
	}]);

	//}) ;

/***/ },
/* 128 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n<table>\r\n<thead>\r\n</thead>\r\n<tbody>\r\n</tbody>\r\n</table>\r\n<div class=\"table_footer\">\r\n    <button type =\"button\" class=\"btn btn-success btn-sm add_line\">增加一行</button>\r\n    <button type =\"button\" class=\"btn btn-default btn-sm delete_line\">删除一行</button>\r\n</div>\r\n</div>\r\n";

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = "<tr ng-repeat = \"l in list\"   ng-click = \"clickTr(l);\" ng-class = \"{true:'selected_td',false:''}[l.selected]\">\r\n<%if(\"tb183.html\"==value){%>\r\n\t<td>\r\n\t\t<input  name=\"{{'t1831'+$index}}\" ng-model = \"l.travelAgency\" class =\"common_input\" style=\"width:97%;\"\r\n\t\t\tmaxlength = \"1\" type=\"text\" ng-disabled=\"!editStatus.list183VO\"  upper-input=\"\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1832'+$index}}\"  ng-model = \"l.carrierGds\" class =\"common_input\" style=\"width:97%;\"\r\n\t\t\tmaxlength = \"3\" ng-disabled=\"!editStatus.list183VO\"  type=\"text\"  />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1833'+$index}}\"  ng-model = \"l.dutyFunctionCode\"  class =\"common_input\" style=\"width:97%;\"\r\n\t\t\tmaxlength = \"2\" ng-disabled=\"!editStatus.list183VO\"  type=\"text\"  />\r\n\t</td>\r\n\t<td>\r\n\t\t<select  ng-model=\"l.geographicSpecificationType\" style=\"width:90%;\" class =\"common_input\"  \r\n\t\t\tng-change=\"selectChange183Tb1(l)\" class =\"common_input\"\r\n\t\t\tng-disabled=\"!editStatus.list183VO\" ng-options=\"c.value as c.name for c in geoSpecTypeList\" >\r\n\t\t</select>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1835'+$index}}\" style=\"width:97%;\" ng-model = \"l.geographicSpecification\" ng-disabled=\"!editStatus.list183VO\"  \r\n\t\t\tupper-input=\"\" geo-max-length = \"l.geographicSpecificationType\"  type=\"text\"  class =\"common_input\"\r\n\t\t\tng-class = \"{'A':'required areacode','C':'required citycode','N':'required countrycode','P':'required airportcode','S':'required statecode','Z':'required zonecode'}[l.geographicSpecificationType]\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<select  name =\"{{'t1836'+$index}}\" ng-model=\"l.codeType\" style=\"width:97%;\" \r\n\t\t\t\tng-disabled=\"!editStatus.list183VO\"  ng-change=\"selectChange183Tb2(l)\"  \r\n\t\t\t\tclass =\"required common_input\">\r\n\t\t\t<option bindonce  ng-repeat=\"t in codeTypeList\"  ng-selected =\"t.value==l.codeType\"   bo-value=\"t.value\" bo-bind=\"t.name\" ></option>  \r\n\t\t</select>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1837'+$index}}\"  style=\"width:97%;\" ng-model = \"l.code\" upper-input  ng-disabled=\"!editStatus.list183VO\" type=\"text\" \r\n\t\t\t   ng-class = \"{'T':'office required','I':'iatanum required','X':'required','V':'required','E':'required','L':'required','A':'required'}[l.codeType]\"  \r\n\t\t\t   tui-max-length = \"{'T':'6','I':'8','X':'8','V':'8','E':'8','L':'8','A':'8'}[l.codeType]\"  class =\"common_input\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<select ng-model=\"l.viewBookTkt\"style=\"width:97%;\"  ng-disabled=\"!editStatus.list183VO\" \r\n\t\t\t\tng-options=\"d.value as d.name for d in viewBookTktList\"  class =\"common_input\">\r\n\t\t</select>\r\n\t</td>\r\n<%}else if(\"tb171.html\"==value){%>\r\n\t<td>\r\n\t\t<input name=\"{{'t1711'+$index}}\" ng-model = \"l.carrier\"  ng-disabled=\"!editStatus.list171VO\"  upper-input=\"\" style=\"width:97%;\" \r\n\t\t\tset-focus=\"\" class = \"common_input air required\" type = \"text\" tabindex=\"1\" maxlength=\"2\"  size = \"16\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input  ng-model = \"l.resFareClassCode\"  ng-disabled=\"!editStatus.list171VO\" style=\"width:97%;\"\r\n\t\t\ttype = \"text\" tabindex=\"1\" maxlength=\"16\"  size = \"16\"  class =\"common_input\" />\r\n\t</td>\r\n\t<td >\r\n\t\t<input  ng-model = \"l.fareTypeCode\"  ng-disabled=\"!editStatus.list171VO\" style=\"width:97%;\"\r\n\t\t\t\ttype = \"text\" tabindex=\"1\" maxlength=\"3\"  size = \"16\"  class =\"common_input\"/>\r\n\t</td>\r\n<%}else if (\"tb172.html\"==value){%>\r\n\t<td>\r\n\t\t<input  ng-model = \"l.accountCode\"  ng-disabled=\"!editStatus.list172VO\"  type = \"text\" \r\n\t\t\ttabindex=\"1\" maxlength=\"20\"  size = \"16\"  class =\"common_input\" style=\"width:97%;\" />\r\n\t</td>\r\n<%}else if (\"tb173Ticket.html\"==value){%>\r\n\t<td>\r\n\t\t<input  ng-model = \"l.ticketDesignator\"  ng-disabled=\"!editStatus.list173TicketVO\"  type = \"text\" \r\n\t\t\t\ttabindex=\"1\" maxlength=\"10\"  size = \"16\"  class =\"common_input\"  style=\"width:97%;\"/>\r\n\t</td>\r\n<%}else if (\"tb173Tkt.html\"==value){%>\r\n\t<td>\r\n\t\t<input  ng-model = \"l.ticketDesignator\"  ng-disabled=\"!editStatus.list173TktVO\" type = \"text\" tabindex=\"1\"\r\n\t\t\t maxlength=\"10\"  size = \"16\"   class =\"common_input\" style=\"width:97%;\"/>\r\n\t</td>\r\n<%}else if (\"tb165.html\"==value){%>\r\n\t<td>\r\n\t\t<input name=\"{{'t1651'+$index}}\" ng-model = \"l.equipmentCode\"  ng-disabled=\"!editStatus.list165VO\"  style=\"width:97%;\" \r\n\t\t\tupper-input=\"\" class = \"lettersOrNumber common_input\" maxlength = \"3\" type = \"text\" size = \"16\"  />\r\n\t</td>\r\n<%}else if(\"tb186.html\"==value){%>\r\n\t<td>\r\n\t\t<input name=\"{{'t1861'+$index}}\" ng-model = \"l.mktCarrier\" ng-disabled=\"!editStatus.list186VO\" set-focus  \r\n\t\t\ttype=\"text\" maxlength = \"3\" tabindex=\"3\" size=\"5\" class=\"required common_input\" style=\"width:97%;\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input ng-model = \"l.optCarrier\" maxlength =\"3\" ng-disabled=\"!editStatus.list186VO\"  \r\n\t\t\ttype=\"text\" tabindex=\"3\" size=\"5\" class =\"common_input\" style=\"width:97%;\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1863'+$index}}\" ng-model = \"l.fltNo1\" maxlength = \"4\" style =\"width:47%;\"\r\n\t\t\tng-disabled=\"!editStatus.list186VO\" type=\"text\" tabindex=\"3\"  class=\"required common_input\"  />-\r\n\t\t<input ng-model = \"l.fltNo2\" maxlength =\"4\" ng-disabled=\"!editStatus.list186VO\"  type=\"text\" \r\n\t\t\ttabindex=\"3\" class =\"common_input\"  class =\"common_input\" style =\"width:47%;\" />\r\n</td>\r\n<%}else if (\"tb196.html\"==value){%>\r\n\t<td>\r\n\t\t<input name=\"{{'t1961'+$index}}\" ng-model = \"l.count\"  ng-disabled=\"!editStatus.list196VO\" style=\"width:97%;\"\r\n\t\t\t   maxlength = \"2\"  type=\"text\" tabindex=\"3\" size=\"15\" class=\"positiveInteger common_input\"/>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1962'+$index}}\" ng-model = \"l.code\"  upper-input set-focus  maxlength = \"3\"  type=\"text\"\r\n\t\t\tng-disabled=\"!editStatus.list196VO\"   size=\"15\"  class=\"lettersOrNumber common_input\" style=\"width:97%;\" />\r\n\t</td>\r\n<%}else if (\"tb198.html\"==value){%>\r\n\t<td >\r\n\t\t<select ng-model=\"l.mktOp\" ng-disabled=\"!editStatus.list198VO\"   class =\"common_input\" style =\"width:96%\"\r\n\t\t\tng-change = \"selectChange198Tb(l)\" ng-options=\"b.value as b.name for b in marketingOpreratingList\" >\r\n\t\t</select>  \r\n\t</td>\r\n\t<td >\r\n\t\t<input name=\"{{'t1982'+$index}}\" ng-model = \"l.cxr\" upper-input ng-disabled=\"!editStatus.list198VO\"  maxlength = \"2\"  \r\n\t\t  type =\"text\" ng-class = \"{true:'air required',false:''}[l.mktOp.length>0]\"  \r\n\t\t  class=\"common_input\" style =\"width:96%\" ng-readonly=\"l.mktOp==''\"/>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1983'+$index}}\" ng-model = \"l.rbd1\" upper-input ng-disabled=\"!editStatus.list198VO\"  maxlength = \"1\" \r\n\t\t   type=\"text\" tabindex=\"3\"  class =\"common_input required seatcode\" style =\"width:96%\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1984'+$index}}\" ng-model = \"l.rbd2\" upper-input ng-disabled=\"!editStatus.list198VO\"  maxlength = \"1\"  \r\n\t\t\ttype=\"text\" class =\"common_input seatcode\" style =\"width:96%\"/>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1985'+$index}}\" ng-model = \"l.rbd3\"  upper-input ng-disabled=\"!editStatus.list198VO\" maxlength = \"1\"  \r\n\t\t\ttype=\"text\"  class =\"common_input seatcode\" style =\"width:96%\"/>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1986'+$index}}\" ng-model = \"l.rbd4\"  upper-input ng-disabled=\"!editStatus.list198VO\" \r\n\t\t\tclass =\"common_input seatcode\" maxlength = \"1\"   style =\"width:96%\" type=\"text\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t1987'+$index}}\" ng-model = \"l.rbd5\" upper-input  ng-disabled=\"!editStatus.list198VO\" maxlength = \"1\"  \r\n\t\t\ttabindex=\"3\"  style =\"width:96%\" type=\"text\" class =\"common_input seatcode\"  />\r\n\t</td>\r\n<%}else if(\"tb198UpGrade.html\"==value){%>\r\n\t<td ng-if = \"data.sel1.value=='UP'||data.sel1.value=='BDUP'\">\r\n\t\t<select ng-change=\"selectChange198TbUpGrade(l)\" ng-model=\"l.mktOp\" ng-disabled=\"!editStatus.list198UpgradeVO\"  style=\"width:97%;\"\r\n\t\t\t ng-options=\"b.value as b.name for b in marketingOpreratingList2\" class =\"common_input\" >\r\n\t\t</select>  \r\n\t</td>\r\n\t<td ng-if = \"data.sel1.value=='UP'||data.sel1.value=='BDUP'\">\r\n\t\t<input name =\"{{'t198ug1'+$index}}\" ng-model = \"l.cxr\" upper-input ng-disabled=\"!editStatus.list198UpgradeVO\" \r\n\t\t\t   class=\"required air common_input\" maxlength=\"2\"  type=\"text\" tabindex=\"3\" style=\"width:97%;\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"{{'t198ug2'+$index}}\" ng-model = \"l.rbd1\" upper-input set-focus ng-disabled=\"!editStatus.list198UpgradeVO\" \r\n\t\t\tclass=\"required seatcode common_input\" maxlength=\"1\"  type=\"text\" tabindex=\"3\" style=\"width:97%;\"  />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"{{'t198ug3'+$index}}\" ng-model = \"l.rbd2\" upper-input ng-disabled=\"!editStatus.list198UpgradeVO\"  \r\n\t\t\tclass=\"seatcode common_input\" maxlength=\"1\" type=\"text\" tabindex=\"3\" style=\"width:97%;\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"{{'t198ug4'+$index}}\" ng-model = \"l.rbd3\" upper-input  ng-disabled=\"!editStatus.list198UpgradeVO\"  \r\n\t\t\tclass=\"seatcode common_input\" maxlength=\"1\" type=\"text\" tabindex=\"3\" style=\"width:97%;\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"{{'t198ug5'+$index}}\" ng-model = \"l.rbd4\" upper-input ng-disabled=\"!editStatus.list198UpgradeVO\"  \r\n\t\t\tclass=\"seatcode common_input\" maxlength=\"1\" type=\"text\" tabindex=\"3\" style=\"width:97%;\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"{{'t198ug6'+$index}}\" ng-model = \"l.rbd5\" upper-input ng-disabled=\"!editStatus.list198UpgradeVO\"  \r\n\t\t\tclass=\"seatcode common_input\" maxlength=\"1\" type=\"text\" tabindex=\"3\" style=\"width:97%;\"  />\r\n\t</td>\r\n<%}else if (\"tb170.html\"==value){%>\r\n\t<td>\r\n\t\t<select ng-model=\"l.saleGeographicPointType\"  ng-disabled=\"!editStatus.list170VO\"  style=\"width:97%;\"\r\n\t\t\t\tng-options=\"o.value as o.name for o in geoSpecTypeList\" ng-change=\"selectChange170Tb(l)\" class =\"common_input\">\r\n\t\t</select>\r\n\t</td>\r\n\t<td>\r\n\t\t<input name = \"{{'t1701'+$index}}\"  ng-model = \"l.saleGeographicPoint\" ng-disabled=\"!editStatus.list170VO\" \r\n\t\t\t   upper-input geo-max-length = \"l.saleGeographicPointType\"  class =\"common_input\" style=\"width:97%;\"\r\n\t\t\t   ng-class = \"{'A':'required areacode','C':'required citycode','N':'required countrycode','P':'required airportcode','S':'required statecode','Z':'required zonecode'}[l.saleGeographicPointType]\"\r\n\t\t\t   type = \"text\"  />\r\n\t</td>\r\n\t<td >\r\n\t\t<input  name=\"{{'t1702'+$index}}\" ng-model = \"l.specFeeAmount\" class = \"required nonNegativeInteger common_input\"  set-focus=\"\" type = \"text\" \r\n\t\t\tng-disabled=\"!editStatus.list170VO\" tabindex=\"1\" maxlength=\"7\"  style=\"width:97%;\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name = \"{{'t1703'+$index}}\" ng-model = \"l.specFeeCurrency\" upper-input  type = \"text\" \r\n\t\t\tstyle=\"width:97%;\" maxlength=\"3\"  ng-disabled=\"!editStatus.list170VO\" class = \"letter common_input\" \r\n\t\t\tng-class = \"{true:'required',false:''}[l.saleGeographicPointType.length>0]\" />\r\n\t</td>\r\n<%}else if(\"tb178geo1.html\"==value){%>\r\n\t<td>\r\n\t\t<select ng-model=\"l.geoLocType\" ng-disabled=\"!editStatus.list178Loc1\"  class = \"common_input\" style=\"width:97%;\"\r\n\t\t\tng-options=\"b.value as b.name for b in geoSpecTypeList\" ng-change=\"selectChange178Tb(l)\" >\r\n\t\t</select>  \r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t17812'+$index}}\" ng-model = \"l.geoLocSpec\" geo-max-length = \"l.geoLocType\" upper-input  \r\n\t\t\tng-disabled=\"!editStatus.list178Loc1\" type=\"text\" tabindex=\"3\" style=\"width:97%;\" class=\"common_input\"\r\n\t\t\tng-class = \"{'A':'required areacode','C':'required citycode','N':'required countrycode','P':'required airportcode','S':'required statecode','Z':'required zonecode'}[l.geoLocType]\" />\r\n\t</td>\r\n\t<td>\r\n\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc1\"  type=\"radio\" tabindex=\"3\"  value=\"\" />适用\r\n\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc1\"  type=\"radio\" tabindex=\"3\"  value=\"N\" />不适用\r\n\t</td>\r\n<%}else if(\"tb178geo2.html\"==value){%>\r\n\t<td>\r\n\t\t<select ng-model=\"l.geoLocType\" ng-disabled=\"!editStatus.list178Loc2\"  class = \"common_input\" style=\"width:97%;\"\r\n\t\t\tng-options=\"b.value as b.name for b in geoSpecTypeList\" ng-change=\"selectChange178Tb(l)\" >\r\n\t\t</select>  \r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t17822'+$index}}\" ng-model = \"l.geoLocSpec\" geo-max-length = \"l.geoLocType\" upper-input=\"\"  \r\n\t\t\tng-disabled=\"!editStatus.list178Loc2\" type=\"text\" tabindex=\"3\" style=\"width:97%;\" class=\"common_input\"\r\n\t\t\tng-class = \"{'A':'required areacode','C':'required citycode','N':'required countrycode','P':'required airportcode','S':'required statecode','Z':'required zonecode'}[l.geoLocType]\" />\r\n\t</td>\r\n\t<td>\r\n\t\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc2\"  type=\"radio\" tabindex=\"3\"  value=\"\" />适用\r\n\t\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc2\"  type=\"radio\" tabindex=\"3\"  value=\"N\" />不适用\r\n\t</td>\r\n<%}else if(\"tb178geo3.html\"==value){%>\r\n\t<td>\r\n\t\t<select ng-model=\"l.geoLocType\" ng-disabled=\"!editStatus.list178Loc3\"  class = \"common_input\" style=\"width:97%;\"\r\n\t\t\tng-options=\"b.value as b.name for b in geoSpecTypeList\" ng-change=\"selectChange178Tb(l)\" >\r\n\t\t</select>  \r\n\t</td>\r\n\t<td>\r\n\t\t<input name=\"{{'t17832'+$index}}\" ng-model = \"l.geoLocSpec\" geo-max-length = \"l.geoLocType\" upper-input  \r\n\t\t\tng-disabled=\"!editStatus.list178Loc3\" type=\"text\" tabindex=\"3\" style=\"width:97%;\" class=\"common_input\"\r\n\t\t\tng-class = \"{'A':'required areacode','C':'required citycode','N':'required countrycode','P':'required airportcode','S':'required statecode','Z':'required zonecode'}[l.geoLocType]\" />\r\n\t</td>\r\n\t<td>\r\n\t\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc3\"  type=\"radio\" tabindex=\"3\" value=\"\" />适用\r\n\t\t   <input ng-model = \"l.appl\" ng-disabled=\"!editStatus.list178Loc3\"  type=\"radio\" tabindex=\"3\" value=\"N\" />不适用\r\n\t</td>\r\n<%}else if(\"tbTSK202.html\"==value){%>\r\n\t<td>\r\n\t\t<input name =\"tsk20201{{$index}}\" ng-model =\"l.allowedRbd\" class =\"required allowedRbd common_input\" type =\"text\" \r\n\t\tstyle=\"width:96%;\" placeholder=\"A/B/C/D\" maxlength =\"19\" upper-input=\"\" ng-disabled=\"!editStatus.listTsk202VO\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"tsk20202{{$index}}\" ng-model =\"l.originalFareOffice\" class =\"common_input\" \r\n\t\ttype =\"text\" style=\"width: 98%;\" maxlength =\"8\" ng-disabled=\"!editStatus.listTsk202VO\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"tsk20203{{$index}}\" ng-model =\"l.originalFareIataNo\"  class =\"common_input\"\r\n\t\ttype =\"text\" style=\"width:98%;\" maxlength=\"8\" ng-disabled=\"!editStatus.listTsk202VO\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<input name =\"tsk20204{{$index}}\" ng-model =\"l.originalFareErspNo\" class =\"lettersOrNumber common_input\"\r\n\t\t\ttype =\"text\" style=\"width:93%;\" maxlength=\"8\"  />\r\n\t</td>\t\r\n\t<td>\r\n\t\t<input name =\"tsk20205{{$index}}\" ng-model =\"l.originalFareDepartmentCode\" class =\"common_input\"\r\n\t\ttype =\"text\" style=\"width:96%\" maxlength =\"8\" ng-disabled=\"!editStatus.listTsk202VO\" />\r\n\t</td>\r\n\t<td>\r\n\t\t<span style=\"display:inline-block;width: 35%;\">原始运价</span>\r\n\t\t<input name =\"tsk20206{{$index}}\" ng-model =\"l.originalFareBasis\" class =\"common_input\"\r\n\t\t\ttype =\"text\" style=\"width:62%;\" maxlength =\"10\" class =\"lettersOrNumber\" ng-disabled=\"!editStatus.listTsk202VO\" />\r\n\t\t <div style=\"padding-top: 2px\">\r\n\t\t \t<span style=\"display:inline-block;width: 35%\">新票面</span>\r\n\t\t \t<input name =\"tsk20207{{$index}}\" ng-model =\"l.newFareBasis\" class =\"common_input\"\r\n\t\t\t\ttype =\"text\" style=\"width:62%\" maxlength =\"10\" class =\"lettersOrNumber\" ng-disabled=\"!editStatus.listTsk202VO\" />\r\n\t\t </div>\r\n\t\t\r\n\t</td>\r\n\t<td>\r\n\t\t<select name =\"tsk20208{{$index}}\" ng-model =\"l.flightSpreadFactor\"  ng-change =\"changeFlightSpreadFactor(l)\"\r\n\t\t\tclass =\"required common_input\" style =\"width:98%\" ng-disabled=\"!editStatus.listTsk202VO\">\r\n\t\t\t<option value=\"0\">免差价</option>\r\n\t\t\t<option value =\"1\">收差价,ET计算差额</option>\r\n\t\t\t<option value =\"2\">收差价,自定义差额</option>\r\n\t\t</select>\r\n\t\t<div style=\"margin-top: 2px\" ng-show =\"l.flightSpreadFactor=='2'\">\r\n\t\t\t<input name =\"tsk20209{{$index}}\" ng-class =\"{true:'required',false:''}[l.flightSpreadFactor=='2']\" \r\n\t\t\t\tng-model =\"l.flightSpreadAmount\" type =\"text\" style=\"width: 51%\"  ng-disabled=\"!editStatus.listTsk202VO\"\r\n\t\t\t\tmaxlength =\"7\"  class =\"positiveInteger common_input\" ng-class =\"{true:'required',false:''}[l.flightSpreadFactor=='2']\" />\r\n\t\t\t<span style=\"float: right;width:45%;margin-right: 2px;\">\r\n\t\t\t\t<select name =\"tsk20210{{$index}}\" ng-model =\"l.flightSpreadUnit\" class =\"common_input\"\r\n\t\t\t\t\t ng-class =\"{true:'required',false:''}[l.flightSpreadAmount!='']\" ng-disabled=\"!editStatus.listTsk202VO\">\r\n\t\t\t\t\t<option value =\"\">选择</option>\r\n\t\t\t\t\t<option value =\"CNY\">CNY</option>\r\n\t\t\t\t\t<option value =\"USD\">USD</option>\r\n\t\t\t\t\t<option value =\"HKD\">HKD</option>\r\n\t\t\t\t\t<option value =\"EUR\">EUR</option>\r\n\t\t\t\t\t<option value =\"RUB\">RUB</option>\r\n\t\t\t\t\t<option value =\"CAD\">CAD</option>\r\n\t\t\t\t</select>\r\n\t\t\t</span>\r\n\t\t\t<span class=\"clearfix\"></span>\r\n\t\t</div>\r\n\t</td>\r\n\t<td>\r\n\t\t<a href=\"javascript:void(0)\" ng-click =\"customeEdit202Text(l.flightTourCodeText,'flightTourCodeText',$index)\">编辑TourCode文本</a><br>\r\n\t\t<span style=\"display:inline-block;width: 48%\">附加规则</span>\r\n\t\t<input name =\"tsk20211{{$index}}\" ng-model =\"l.flightTourCodeFactor\" class =\"required zeorOrOtherNum nonNegativeInteger common_input\" \r\n\t\t\ttype =\"text\" style =\"width:48%\" maxlength =\"5\" placeholder =\"如:123\"/>\r\n\t</td>\r\n\t<td>\r\n\t\t<a href=\"javascript:void(0)\" ng-click =\"customeEdit202Text(l.flightEiText,'flightEiText',$index)\">编辑备注文本</a><br>\r\n\t\t<span style=\"display:inline-block;width: 48%\">附加规则</span>\r\n\t\t<input name =\"tsk20212{{$index}}\" ng-model =\"l.flightEiFactor\" class =\"required zeorOrOtherNum nonNegativeInteger common_input\" \r\n\t\ttype =\"text\" style=\"width:48%\" maxlength =\"5\" placeholder =\"如:123\"/>\r\n\t</td>\r\n<%}else{%>\r\n\t<td colspan=\"{{column}}\">\r\n\t\t<h3>你传入的html模板不存在，请检查</h3>\r\n\t</td>\r\n<%}%>\r\n</tr>";

/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = "<%if(\"tb183.html\"==value){%>\r\n<tr>\r\n\t<th width=\"62\">旅行社</th>\r\n\t<th width=\"98\">航空公司/分销商</th>\r\n\t<th width=\"74\">职责/功能码</th>\r\n\t<th width =\"78\">区域类型</th>\r\n\t<th width =\"63\">区域代码</th>\r\n\t<th width =\"160\">发布对象类型</th>\r\n\t<th width =\"90\">发布对象代码</th>\r\n\t<th width =\"127\">权限</th>\r\n</tr>\r\n<%}else if(\"tb171.html\"==value){%>\r\n<tr>\r\n\t<th width =\"100\">航空公司</th>\r\n\t<th width =\"100\">票价类别</th>\r\n\t<th width =\"100\">运价类型</th>\r\n</tr>\r\n<%}else if (\"tb172.html\"==value){%>\r\n<tr>\r\n\t<th width =\"100\">大客户编码</th>\r\n</tr>\r\n<%}else if (\"tb173Ticket.html\"==value){%>\r\n<tr>\r\n\t<th width =\"100\">指定客票</th>\r\n</tr>\r\n<%}else if (\"tb173Tkt.html\"==value){%>\r\n<tr>\r\n\t<th width =\"100\">指定客票</th>\r\n</tr>\r\n<%}else if (\"tb165.html\"==value){%>\r\n<tr>\r\n\t<th width =\"100\">机型代码</th>\r\n</tr>\r\n<%}else if(\"tb186.html\"==value){%>\r\n<tr>\r\n\t<th width =\"100\">市场方</th>\r\n\t<th width =\"100\">承运方</th>\r\n\t<th width =\"150\">航班号</th>\r\n</tr>\r\n<%}else if (\"tb196.html\"==value){%>\r\n<tr>\r\n\t<th>行李件数</th>\r\n\t<th>行李子代码</th>\r\n</tr>\r\n<%}else if (\"tb198.html\"==value){%>\r\n<tr>\r\n\t<th width=\"120\">市场方/承运方</th>\r\n\t<th width =\"80\">航空公司</th>\r\n\t<th width =\"80\">订座舱位1</th>\r\n\t<th width =\"80\">订座舱位2</th>\r\n\t<th width =\"80\">订座舱位3</th>\r\n\t<th width =\"80\">订座舱位4</th>\r\n\t<th width =\"80\">订座舱位5</th>\r\n</tr>\r\n<%}else if(\"tb198UpGrade.html\"==value){%>\r\n<tr>\r\n\t<th width=\"120\" ng-if = \"data.sel1.value=='UP'||data.sel1.value=='BDUP'\">市场方/承运方</th>\r\n\t<th width =\"80\" ng-if = \"data.sel1.value=='UP'||data.sel1.value=='BDUP'\">航空公司</th>\r\n\t<th width =\"80\">订座舱位1</th>\r\n\t<th width =\"80\">订座舱位2</th>\r\n\t<th width =\"80\">订座舱位3</th>\r\n\t<th width =\"80\">订座舱位4</th>\r\n\t<th width =\"80\">订座舱位5</th>\r\n</tr>\r\n<%}else if (\"tb170.html\"==value){%>\r\n<tr>\r\n\t<th width =\"110\">销售地类型</th>\r\n\t<th width =\"110\">销售地代码</th>\r\n\t<th width =\"110\">金额</th>\r\n\t<th width =\"110\">货币类型</th>\r\n</tr>\r\n<%}else if(\"tb178geo1.html\"==value){%>\r\n<tr>\r\n\t<th width =\"100\">类型</th>\r\n\t<th width =\"100\">代码</th>\r\n\t<th width =\"150\">是否适用</th>\r\n</tr>\r\n<%}else if(\"tb178geo2.html\"==value){%>\r\n<tr>\r\n\t<th width =\"100\">类型</th>\r\n\t<th width =\"100\">代码</th>\r\n\t<th width =\"150\">是否适用</th>\r\n</tr>\r\n<%}else if(\"tb178geo3.html\"==value){%>\r\n<tr>\r\n\t<th width =\"100\">类型</th>\r\n\t<th width =\"100\">代码</th>\r\n\t<th width =\"150\">是否适用</th>\r\n</tr>\r\n<%}else if(\"tbTSK202.html\"==value){%>\r\n<tr>\r\n\t<th>&nbsp;</th>\r\n\t<th colspan =\"4\">原始运价</th>\r\n\t<th>&nbsp;</th>\r\n\t<th colspan =\"3\">新票填开</th>\r\n</tr>\t\r\n<tr>\r\n\t<th width =\"127\">兑换舱位</th>\r\n\t<th width =\"58\">office</th>\r\n\t<th width =\"58\">IATA_NO</th>\r\n\t<th width =\"68\">ERSP_NO</th>\r\n\t<th width =\"83\">Dep_Code</th>\r\n\t<th width =\"162\">farebasis</th>\r\n\t<th width =\"130\">差价</th>\r\n\t<th width =\"143\">TourCode</th>\r\n\t<th width =\"138\">签注</th>\r\n</tr>\t\r\n<%}%>";

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function(require, exports, module) {
	var util = __webpack_require__(70);
	var app = __webpack_require__(121);
	var _ = __webpack_require__(74);

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

	//letter
	app.directive('letter', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            ctrl.$validators.letter = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.isLetter(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

	//lettersOrNumber
	app.directive('lorn', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "?ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.lorn = function (modelValue, viewValue) {
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

	//small
	app.directive('smaller', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            ctrl.$validators.smaller = function (modelValue, viewValue) {
	                var flag = true;
	                var compareVal = attrs['smaller'];
	                if (viewValue != '' && compareVal != '') {
	                    if (!isNaN(viewValue) && !isNaN(compareVal)) {
	                        //都为数值时
	                        var curInt = parseFloat(viewValue);
	                        var comInt = parseFloat(compareVal);
	                        if (curInt > comInt) {
	                            flag = false;
	                        }
	                    }
	                }
	                return flag;
	            };
	            attrs.$observe('smaller', function () {
	                ctrl.$validate();
	            });
	        }
	    };
	});

	//bigger
	app.directive('bigger', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            ctrl.$validators.bigger = function (modelValue, viewValue) {
	                var flag = true;
	                var compareVal = attrs['bigger'];
	                if (viewValue != '' && compareVal != '') {
	                    if (!isNaN(viewValue) && !isNaN(compareVal)) {
	                        //都为数值时
	                        var curInt = parseFloat(viewValue);
	                        var comInt = parseFloat(compareVal);
	                        if (curInt < comInt) {
	                            flag = false;
	                        }
	                    }
	                }
	                return flag;
	            };
	            attrs.$observe('bigger', function () {
	                ctrl.$validate();
	            });
	        }
	    };
	});

	//biggerDate
	app.directive('bd', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.bd = function (modelValue, viewValue) {
	                var compareVal = attrs['bd'];
	                if (viewValue != '' && compareVal != '') {
	                    return util.isBiggerDateThan(viewValue, compareVal);
	                }
	                return true;
	            };
	            attrs.$observe('bd', function () {
	                ctrl.$validate();
	            });
	        }
	    };
	});

	//smallerDate
	app.directive('sd', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.sd = function (modelValue, viewValue) {
	                var compareVal = attrs['sd'];
	                if (viewValue != '' && compareVal != '') {
	                    return util.isSmallerDateThan(viewValue, compareVal);
	                }
	                return true;
	            };
	            attrs.$observe('sd', function () {
	                ctrl.$validate();
	            });
	        }
	    };
	});

	//biggerThanCurrent
	app.directive('btc', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.btc = function (modelValue, viewValue) {
	                var statusDes = scope.data.statusDes;
	                if (viewValue != '' && !util.checkStatusIsDisabled(statusDes)) {
	                    return util.isBiggerThanCurrent(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});
	//biggerThanCurrent(无论是否可编辑都进行字段合法性校验)
	app.directive('btc2', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.btc2 = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.isBiggerThanCurrent(viewValue);
	                }
	                return true;
	            };
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
	                var statusDes = scope.data.statusDes;
	                if (viewValue != '' && !util.checkStatusIsDisabled(statusDes)) {
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
	app.directive('dateoc', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.dateoc = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.isDateOC(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

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
	//自定义校验(三字码)
	app.directive('threecode', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.threecode = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.isThreecode(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

	app.directive('air', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$validators.threecode = function (modelValue, viewValue) {
	                if (viewValue != '') {
	                    return util.isAir(viewValue);
	                }
	                return true;
	            };
	        }
	    };
	});

	//发布对象校验
	app.directive('publicobj', function () {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            ctrl.$parsers.push(function (viewValue) {
	                var curType = attrs['publicobj'];
	                var len = viewValue.length;
	                if (curType == 'T') {
	                    if (len > 6) {
	                        ctrl.$setValidity('length6', false);
	                    } else {
	                        ctrl.$setValidity('length6', true);
	                    }
	                    ctrl.$setValidity('length8', true);
	                } else {
	                    if (len > 8) {
	                        ctrl.$setValidity('length8', false);
	                    } else {
	                        ctrl.$setValidity('length8', true);
	                    }
	                    ctrl.$setValidity('length6', true);
	                }
	                return viewValue;
	            });
	        }
	    };
	});

	//}) ;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//主要用来加载各个控制器（所有的控制器都将在这个文件中被加载）,除此之外再不用做其他，
	//因为我们可以有很多个控制器文件，按照具体需要进行添加。
	//define(function(require, exports, module) {
	//需要的插件
	__webpack_require__(133);
	//头部
	__webpack_require__(214);
	//基本信息部分
	__webpack_require__(215);
	//第一块信息
	__webpack_require__(216);
	//第二块信息
	__webpack_require__(217);
	//});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function (require, exports, module) {
	var controllers = __webpack_require__(134);
	var jsonDate = __webpack_require__(124);
	var EditUtil = __webpack_require__(135);
	var commonUtil = __webpack_require__(123);
	var util = __webpack_require__(70);
	var ModalHelper = __webpack_require__(213);
	var moment = __webpack_require__(95);
	//import {} from '../busi/BasicInfoControllerBusi.js' ;

	//最外层controller
	controllers.controller('EditController', ['$scope', 'FormData', 'HttpOperService', 'TbShowHideServcie', 'FormEditStatusServcie', 'FormStatusService', 'CustomeEditTbStatusServcie', '$timeout', function ($scope, FormData, HttpOperService, TbShowHideServcie, FormEditStatusServcie, FormStatusService, CustomeEditTbStatusServcie, $timeout) {
		$scope.contextPath = FormData.contextPath;
		//是否是新版页面
		$scope.newVersionFlag = true;
		//保留一份原始数据，方便数据初始化时使用
		$scope.orgData = angular.copy(FormData);
		//页面上的form数据
		$scope.data = FormData;
		//页面上所有表格的显示或隐藏的的状态数据
		$scope.tableStatus = TbShowHideServcie; //TableStatusServcie
		//表格复用的自定义是否显示
		$scope.customeEditTbStatus = CustomeEditTbStatusServcie;
		//对表单注册校验
		var validator = $("#s7_form").validate({ meta: "" });
		window.validator = validator;
		//页面上所有控件的状态数据
		$scope.editStatus = FormEditStatusServcie;
		$scope.showStatus = FormStatusService;
		var s7Id = $("#s7Id").val();
		$scope.data.id = s7Id;
		//日期问题
		var currDate = new Date();
		var curMonthStr = commonUtil.getFullDayOrMonthStr(currDate.getMonth() + 1);
		var curDateStr = commonUtil.getFullDayOrMonthStr(currDate.getDate());
		var nextDateStr = commonUtil.getFullDayOrMonthStr(currDate.getDate() + 1);
		//当前日期
		$scope.currentDateStr = currDate.getFullYear() + '-' + curMonthStr + '-' + curDateStr;
		//下一天日期
		$scope.nextDateStr = currDate.getFullYear() + '-' + curMonthStr + '-' + nextDateStr;
		//所有的表格定义信息都在这里
		$scope.tableData = jsonDate.tableData;
		//-------------区域对应的表格显示隐藏开始--------//
		//第一次进入页面时需要加载的数据
		//console.info('准备初始化页面数据..........') ;
		var url = '';
		var promise = null;
		if (FormData.action == "add") {
			//1.新增
			url = $scope.contextPath + '/s7/initPage4Add.action';
			promise = HttpOperService.getDataByUrl(url);
			EditUtil.initData.dealResultData4Add(promise, $scope); //serviceChooseList
			var nowStr = moment().add(1, "hours").format('YYYY-MM-DD HH');
			//moment().format('MMMM Do YYYY, h:mm:ss a'//起始日期会被设置默认值
			FormData.firstMaintenanceDate = nowStr + ":00";
			//var dateStr = moment().format('YYYY-MM-DD');
			//FormData.lastMaintenanceDate = dateStr+" 23:59";
		} else if (FormData.action == "update") {
			url = $scope.contextPath + '/s7/initPage4Upate.action?s7Id=' + $scope.data.id;
			promise = HttpOperService.getDataByUrl(url);
			EditUtil.initData.dealResult4Update(promise, $scope);
			$scope.newVersionFlag = false;
		} else if (FormData.action == "copy") {
			url = $scope.contextPath + '/s7/initPage4Copy.action?s7Id=' + $scope.data.id;
			promise = HttpOperService.getDataByUrl(url);
			//EditUtil.initData.dealResult4Update(promise,$scope) ;
			EditUtil.initData.dealResult4Copy(promise, $scope);
			$scope.newVersionFlag = false;
		}

		$scope.submitTbTSKCustomeEdit = function () {
			var tipDivId = "tskCustomeTipInfo";
			var modalHelper = new ModalHelper(tipDivId);
			//tbTSKCustomeEdit_type//tbTSKCustomeEdit_index//tbTSKCustomeEdit_value
			var tbTSKCustomeEdit_type = $("#tbTSKCustomeEdit_type").val();
			var tbTSKCustomeEdit_index = $("#tbTSKCustomeEdit_index").val();
			var tbTSKCustomeEdit_value = $("#tbTSKCustomeEdit_value").val();
			var maxLength = $("#tbTSKCustomeEdit_value").attr("maxlength");
			var len = util.getByteNumOfStr(tbTSKCustomeEdit_value);
			modalHelper.cleanTipInfo();
			if (len > maxLength) {
				modalHelper.addErrorTip('最多输入' + maxLength + '个字节!');
				return;
			} else {
				$scope.data.listTsk202VO[tbTSKCustomeEdit_index * 1][tbTSKCustomeEdit_type] = tbTSKCustomeEdit_value;
				$('#tbTSK202Modal').modal('hide');
			}
		};
	}]);

	//}) ;

/***/ },
/* 134 */
/***/ function(module, exports) {

	"use strict";

	//define(function (require, exports, module) {
	var controllers = angular.module("app.controllers", []);
	module.exports = controllers;
	//return controllers ;
	//}) ;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getIterator2 = __webpack_require__(136);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _map = __webpack_require__(189);

	var _map2 = _interopRequireDefault(_map);

	var _BasicInfoControllerBusi = __webpack_require__(209);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//define(function (require, exports, module) {
	var validateHelper = __webpack_require__(211);
	var S7FormDataUtil = __webpack_require__(212);
	var jsonDate = __webpack_require__(124);
	var jsonDataHelper = __webpack_require__(122);
	var _ = __webpack_require__(74);
	var util = __webpack_require__(70);


	/**
	 * 处理表单特殊数据
	 * @param {Object} formData
	 */
	var initOtherData = function initOtherData(formData) {
		//处理旅行起始日期
		if (formData.firstTravelYear != '' && formData.firstTravelMonth != '' && formData.firstTravelDay != '') {
			formData.travelStartDate = formData.firstTravelYear + '-' + formData.firstTravelMonth + '-' + formData.firstTravelDay;
		}
		//处理旅行结束日期
		if (formData.lastTravelYear != '' && formData.lastTravelMonth != '' && formData.lastTravelDay != '') {
			formData.travelEndDate = formData.lastTravelYear + '-' + formData.lastTravelMonth + '-' + formData.lastTravelDay;
		}
		//星期
		var dayofWake = formData.dayOfWeek;
		var len = dayofWake.length;
		for (var i = 0; i < len; i++) {
			var s = dayofWake.charAt(i);
			var tmpStr = 'w' + s;
			formData.dayOfWeekShow[tmpStr] = true; //选中checkbox
		}
		//处理页面上的复用字表号的placeholder显示字符串
		//
		//		$(":input[name=reuseList172VO]").attr("placeholder",formData['accountCodeTableNo172']) ;
		//		$(":input[name=reuseList173TicketVO]").attr("placeholder",formData['ticketDesignatorTableNo173']) ;
		//		$(":input[name=reuseList183VO]").attr("placeholder",formData['securityTableNo183']) ;
		//		$(":input[name=reuseList198VO]").attr("placeholder",formData['rbdTableNo198']) ;
		//		$(":input[name=reuseList198UpgradeVO]").attr("placeholder",formData['upgradeToRbdTableNo198']) ;
		//		$(":input[name=reuseList171VO]").attr("placeholder",formData['cxrResFareTableNo171']) ;
		//		$(":input[name=reuseList173TktVO]").attr("placeholder",formData['tktDesignatorTableNo173']) ;
		//		$(":input[name=reuseList186VO]").attr("placeholder",formData['carrierFlightTableNo186']) ;
		//		$(":input[name=reuseList170VO]").attr("placeholder",formData['serviceFeeCurTableNo170']) ;
		//		$(":input[name=reuseList196VO]").attr("placeholder",formData['textTableNo196']) ;
		//		$(":input[name=reuseList165VO]").attr("placeholder",formData['equipmentTypeTableNo165']) ;
		//		$(":input[name=reuseList178Loc1]").attr("placeholder",formData['list178Loc1Id']) ;
		//		$(":input[name=reuseList178Loc2]").attr("placeholder",formData['list178Loc2Id']) ;
		//		$(":input[name=reuseList178Loc3]").attr("placeholder",formData['list178Loc3Id']) ;
		//		//201暂时不支持$(":input[name=reuseList201VO]").attr("placeholder",formData['list201VO']) ;
		//		$(":input[name=reuseListTsk202VO]").attr("placeholder",formData['flightPassTableTsk202']) ;
	};

	var initAutoCompletePlaceholder = function initAutoCompletePlaceholder(editScope) {
		var formData = editScope.data;
		var nameList = [{ "key": "placeholderList172VO", "value": "accountCodeTableNo172" }, { "key": "placeholderList173TicketVO", "value": "ticketDesignatorTableNo173" }, { "key": "placeholderList183VO", "value": "securityTableNo183" }, { "key": "placeholderList198VO", "value": "rbdTableNo198" }, { "key": "placeholderList198UpgradeVO", "value": "upgradeToRbdTableNo198" }, { "key": "placeholderList171VO", "value": "cxrResFareTableNo171" }, { "key": "placeholderList173TktVO", "value": "tktDesignatorTableNo173" }, { "key": "placeholderList186VO", "value": "carrierFlightTableNo186" }, { "key": "placeholderList170VO", "value": "serviceFeeCurTableNo170" }, { "key": "placeholderList196VO", "value": "textTableNo196" }, { "key": "placeholderList165VO", "value": "equipmentTypeTableNo165" }, { "key": "placeholderList178Loc1", "value": "list178Loc1Id" }, { "key": "placeholderList178Loc2", "value": "list178Loc2Id" }, { "key": "placeholderList178Loc3", "value": "list178Loc3Id" }, { "key": "placeholderListTsk202VO", "value": "flightPassTableTsk202" }];
		//201暂时不支持$(":input[name=reuseList201VO]").attr("placeholder",formData['list201VO']) ;
		for (var i = 0; i < nameList.length; i++) {
			var key = nameList[i]['key'];
			var value = nameList[i]['value'];
			//console.info('['+key+']--['+value+'] --['+formData[value]+']') ;
			editScope[key] = formData[value];
		}
	};

	/**
	 * @功能描述:处理表格被引用次数数据
	 * @param referenceMap 被引用的次数map数据
	 * @param editStatus 页面全局的编辑属性
	 * @param customeEditTbStatus 自定义表格显示状态
	 */
	var initCustomeEditTbData = function initCustomeEditTbData(editStatus, customeEditTbStatus, formData) {
		var referenceMap = formData['subTbReferenceCountMap'];
		var keys = _.keys(referenceMap);
		_.each(keys, function (key) {
			var tmp = referenceMap[key] || '0';
			var count = tmp * 1;
			if (count > 1) {
				editStatus[key] = false;
				customeEditTbStatus[key] = true;
			}
		});
	};

	//这是一个私有的辅助方法
	var initTbData = function initTbData(list, flagData, tbname) {
		if (list.length > 0) {
			flagData[tbname] = true;
		} else {
			flagData[tbname] = false;
		}
	};

	var initListData = function initListData(s7VO, flagData) {
		if (s7VO.list170VO.length > 0) {
			//170表格
			initTbData(s7VO.list170VO, flagData, 'list170VO');
		}
		if (s7VO.list201VO.length > 0) {
			//201表格
			initTbData(s7VO.list201VO, flagData, 'list170VO'); //----11
		}
		//198
		initTbData(s7VO.list198VO, flagData, 'list198VO'); //----9
		//198_2
		initTbData(s7VO.list198UpgradeVO, flagData, 'list198UpgradeVO'); //----10
		//list183VO
		initTbData(s7VO.list183VO, flagData, 'list183VO'); //-----1
		//list186VO
		initTbData(s7VO.list186VO, flagData, 'list186VO'); //-----7
		//geo1 //list178Loc1
		initTbData(s7VO.list178Loc1, flagData, 'list178Loc1'); //--12
		//geo2 //list178Loc2
		initTbData(s7VO.list178Loc2, flagData, 'list178Loc2'); //---13
		//geo3 //list178Loc3
		initTbData(s7VO.list178Loc3, flagData, 'list178Loc3'); //----14
		//196//备注例外行李
		initTbData(s7VO.list196VO, flagData, 'list196VO'); //----8
		//165机型
		initTbData(s7VO.list165VO, flagData, 'list165VO'); //------6
		//171
		initTbData(s7VO.list171VO, flagData, 'list171VO'); //-----2
		initTbData(s7VO.list172VO, flagData, 'list172VO'); //-----3
		initTbData(s7VO.list173TicketVO, flagData, 'list173TicketVO'); //------4
		initTbData(s7VO.list173TktVO, flagData, 'list173TktVO'); //-----5

		//增加tsk202子表
		initTbData(s7VO.listTsk202VO, flagData, 'listTsk202VO'); //-----5

	};

	/**
	 * 这个方法只能为更新数据时，页面初始化时调用，相当于将页面上的，联动控件触发一下联动检查
	 */
	var init4Validate = function init4Validate(editScope, data, globalEditStatus) {
		/**这里需要重置数据的原因是因为有些value会影响到别的控件的显示*/
		var statusDes = data.statusDes;
		//当状态为3的时候，页面不可编辑
		if (statusDes == '3') {
			for (var cname in globalEditStatus) {
				globalEditStatus[cname] = false;
			}
		}
		validateHelper.changeServiceType(editScope, data, globalEditStatus);
		validateHelper.changeNoChargeNotAvailable(editScope, data, globalEditStatus);
		validateHelper.changeSpecifiedServiceFeeApp(editScope, data, globalEditStatus);
		//区域/部分/全程变化
		validateHelper.changeGeoSpecSectPortJourney(editScope, data, globalEditStatus);
		//折扣变化
		validateHelper.changeDiscount(editScope.$parent, data, globalEditStatus);
	};

	//填充页面上的select的初始数据//因为这些数据需要从数据库中查询
	var initScopeSelectList = function initScopeSelectList(editScope, returnData) {
		editScope.serviceGroupList = returnData.serviceGroupList;
		editScope.passengerTypeCodeList = returnData.passengerList;
		editScope.frequentFlyerStatusList = returnData.ffpList;
		var equipmentList = returnData.equipmentList;
		//向返回来的数组中添加一个空的选择option
		equipmentList.splice(0, 0, { "description": "选择", "code": "" });
		editScope.equipmentList = equipmentList;
		//提前购票时间单位
		editScope.advancedPurchasePeriodList = jsonDate.advancedPurchasePeriodList;
		//延长类型
		//editScope.effectivePeriodTypeList = jsonDate.effectivePeriodTypeList ;
		editScope.effectivePeriodTypeList = {
			list: jsonDataHelper.getEffectivePeriodTypeList(editScope.data.basicInfoVo.subGroup)
		};
		//延长时间单位
		editScope.effectivePeriodUnitList = jsonDate.effectivePeriodUnitList;
		//免费/收费
		editScope.noChargeNotAvailableList = {
			list: jsonDataHelper.getNoChargeNotAvailableList(editScope.data.serviceType)
		};
		//适用于
		editScope.specifiedServiceFeeAppList = {
			list: jsonDataHelper.getSpecifiedServiceFeeAppList(editScope.data.serviceType)
		};
		var subGroup = editScope.data.basicInfoVo.subGroup || '';
		//区域/部分/全程
		editScope.geoSpecSectPortJourneyList = {
			list: jsonDataHelper.getgeoSpecSectPortJourneyList(editScope.data.serviceType, subGroup)
		};
	};

	//处理edit页面上添加时的后数据处理
	var dealResultData4Add = function dealResultData4Add(promise, editScope) {
		promise.then(function (returnData) {
			// 调用承诺API获取数据 .resolve  
			if (returnData.flag == true || returnData.flag == 'true') {
				//初始化数据、测试新增的时候才有意义，上线时此行代码没有意义
				initListData(editScope.data, editScope.tableStatus);
				//这段初始化数据方法要放在下面，因为内部从scope中取serviceType
				//不过在添加方法中无所谓了，修改方法中一定要放在下面
				initScopeSelectList(editScope, returnData);
				var serviceChooseList = returnData.serviceChooseList;
				var options = (0, _BasicInfoControllerBusi.convertChooseList2ChooseOptions)(serviceChooseList);
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = (0, _getIterator3.default)(options), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var option = _step.value;

						selectize.addOption(option);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				var serviceChooseMap = new _map2.default();
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = (0, _getIterator3.default)(serviceChooseList), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var item = _step2.value;

						serviceChooseMap.set(item.id, item);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				editScope.serviceChooseMap = serviceChooseMap;
			} else {
				util.toastDanger('初始化页面数据出错!');
			}
		}, function (error) {
			// 处理错误 .reject  
			//console.error('初始化页面数据出错!'+error) ;
			util.toastDanger('初始化页面数据出错!');
		});
	};
	//处理edit页面上更新时的后数据处理
	var dealResult4Update = function dealResult4Update(promise, editScope) {
		promise.then(function (returnData) {
			// 调用承诺API获取数据 .resolve  
			if (returnData.flag == true || returnData.flag == 'true') {
				//s7record的信息
				S7FormDataUtil.convertS7ToFormData(returnData.s7VO, editScope.data); //将查询的s7数据填充到formData中
				initListData(returnData.s7VO, editScope.tableStatus);
				//其他特殊数据处理
				initOtherData(editScope.data);
				//list163
				editScope.data.sel4 = returnData.list163;
				//这段初始化数据方法要放在下面，因为内部从scope中取serviceType
				//但是必须要放在验证之前，因为验证的时候需要对特殊的字段进行处理
				//这段代码一定要放在init4Validate()前面
				initScopeSelectList(editScope, returnData);
				//初始化校验页面数据
				init4Validate(editScope, editScope.data, editScope.editStatus);
				//处理表格被引用次数数据
				initCustomeEditTbData(editScope.editStatus, editScope.customeEditTbStatus, editScope.data);
				//初始化placeholder
				initAutoCompletePlaceholder(editScope);
			} else {
				util.toastDanger('初始化页面数据出错!');
			}
		}, function (error) {
			// 处理错误 .reject  
			//console.error('初始化页面数据出错!' + error) ;
			util.toastDanger('初始化页面数据出错!');
		});
	};

	var dealResult4Copy = function dealResult4Copy(promise, editScope) {
		promise.then(function (returnData) {
			// 调用承诺API获取数据 .resolve  
			//s7record的信息
			S7FormDataUtil.convertS7ToFormData(returnData.s7VO, editScope.data); //将查询的s7数据填充到formData中
			initListData(returnData.s7VO, editScope.tableStatus);
			//其他特殊数据处理
			initOtherData(editScope.data);
			//list163
			editScope.data.sel4 = returnData.list163;
			//这段初始化数据方法要放在下面，因为内部从scope中取serviceType
			//这段代码一定要放在init4Validate()前面
			initScopeSelectList(editScope, returnData);
			//初始化校验页面数据
			init4Validate(editScope, editScope.data, editScope.editStatus);
			//前面部分与复制一样，但是要清空id
			editScope.data.id = "";
			//复制的时候自标号全部被置为空，所以不需要重置placeholder
			//initAutoCompletePlaceholder(editScope) ;
		}, function (error) {
			// 处理错误 .reject  
			//console.error('初始化页面数据出错!' + error) ;
			util.toastDanger('初始化页面数据出错!');
		});
	};

	//这边是要返回的方法的集合处
	var EditUtil = {
		initData: { /*初始化*/
			dealResultData4Add: dealResultData4Add,
			dealResult4Update: dealResult4Update,
			dealResult4Copy: dealResult4Copy
		}

	};
	module.exports = EditUtil;
	//return EditUtil ;
	//}) ;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(138);
	__webpack_require__(184);
	module.exports = __webpack_require__(186);

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(139);
	var global        = __webpack_require__(150)
	  , hide          = __webpack_require__(154)
	  , Iterators     = __webpack_require__(142)
	  , TO_STRING_TAG = __webpack_require__(181)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(140)
	  , step             = __webpack_require__(141)
	  , Iterators        = __webpack_require__(142)
	  , toIObject        = __webpack_require__(143);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(147)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 140 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 141 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 142 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(144)
	  , defined = __webpack_require__(146);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(145);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 145 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 146 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(148)
	  , $export        = __webpack_require__(149)
	  , redefine       = __webpack_require__(164)
	  , hide           = __webpack_require__(154)
	  , has            = __webpack_require__(165)
	  , Iterators      = __webpack_require__(142)
	  , $iterCreate    = __webpack_require__(166)
	  , setToStringTag = __webpack_require__(180)
	  , getPrototypeOf = __webpack_require__(182)
	  , ITERATOR       = __webpack_require__(181)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 148 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(150)
	  , core      = __webpack_require__(151)
	  , ctx       = __webpack_require__(152)
	  , hide      = __webpack_require__(154)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 150 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 151 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(153);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 153 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(155)
	  , createDesc = __webpack_require__(163);
	module.exports = __webpack_require__(159) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(156)
	  , IE8_DOM_DEFINE = __webpack_require__(158)
	  , toPrimitive    = __webpack_require__(162)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(159) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(157);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 157 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(159) && !__webpack_require__(160)(function(){
	  return Object.defineProperty(__webpack_require__(161)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(160)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 160 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(157)
	  , document = __webpack_require__(150).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(157);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 163 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(154);

/***/ },
/* 165 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(167)
	  , descriptor     = __webpack_require__(163)
	  , setToStringTag = __webpack_require__(180)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(154)(IteratorPrototype, __webpack_require__(181)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(156)
	  , dPs         = __webpack_require__(168)
	  , enumBugKeys = __webpack_require__(178)
	  , IE_PROTO    = __webpack_require__(175)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(161)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(179).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(155)
	  , anObject = __webpack_require__(156)
	  , getKeys  = __webpack_require__(169);

	module.exports = __webpack_require__(159) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(170)
	  , enumBugKeys = __webpack_require__(178);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(165)
	  , toIObject    = __webpack_require__(143)
	  , arrayIndexOf = __webpack_require__(171)(false)
	  , IE_PROTO     = __webpack_require__(175)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(143)
	  , toLength  = __webpack_require__(172)
	  , toIndex   = __webpack_require__(174);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(173)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 173 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(173)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(176)('keys')
	  , uid    = __webpack_require__(177);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(150)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 177 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 178 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(150).document && document.documentElement;

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(155).f
	  , has = __webpack_require__(165)
	  , TAG = __webpack_require__(181)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(176)('wks')
	  , uid        = __webpack_require__(177)
	  , Symbol     = __webpack_require__(150).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(165)
	  , toObject    = __webpack_require__(183)
	  , IE_PROTO    = __webpack_require__(175)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(146);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(185)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(147)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(173)
	  , defined   = __webpack_require__(146);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(156)
	  , get      = __webpack_require__(187);
	module.exports = __webpack_require__(151).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(188)
	  , ITERATOR  = __webpack_require__(181)('iterator')
	  , Iterators = __webpack_require__(142);
	module.exports = __webpack_require__(151).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(145)
	  , TAG = __webpack_require__(181)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(190), __esModule: true };

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(191);
	__webpack_require__(184);
	__webpack_require__(138);
	__webpack_require__(192);
	__webpack_require__(206);
	module.exports = __webpack_require__(151).Map;

/***/ },
/* 191 */
/***/ function(module, exports) {

	

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(193);

	// 23.1 Map Objects
	module.exports = __webpack_require__(201)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(155).f
	  , create      = __webpack_require__(167)
	  , redefineAll = __webpack_require__(194)
	  , ctx         = __webpack_require__(152)
	  , anInstance  = __webpack_require__(195)
	  , defined     = __webpack_require__(146)
	  , forOf       = __webpack_require__(196)
	  , $iterDefine = __webpack_require__(147)
	  , step        = __webpack_require__(141)
	  , setSpecies  = __webpack_require__(199)
	  , DESCRIPTORS = __webpack_require__(159)
	  , fastKey     = __webpack_require__(200).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(154);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 195 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(152)
	  , call        = __webpack_require__(197)
	  , isArrayIter = __webpack_require__(198)
	  , anObject    = __webpack_require__(156)
	  , toLength    = __webpack_require__(172)
	  , getIterFn   = __webpack_require__(187)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(156);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(142)
	  , ITERATOR   = __webpack_require__(181)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(150)
	  , core        = __webpack_require__(151)
	  , dP          = __webpack_require__(155)
	  , DESCRIPTORS = __webpack_require__(159)
	  , SPECIES     = __webpack_require__(181)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(177)('meta')
	  , isObject = __webpack_require__(157)
	  , has      = __webpack_require__(165)
	  , setDesc  = __webpack_require__(155).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(160)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(150)
	  , $export        = __webpack_require__(149)
	  , meta           = __webpack_require__(200)
	  , fails          = __webpack_require__(160)
	  , hide           = __webpack_require__(154)
	  , redefineAll    = __webpack_require__(194)
	  , forOf          = __webpack_require__(196)
	  , anInstance     = __webpack_require__(195)
	  , isObject       = __webpack_require__(157)
	  , setToStringTag = __webpack_require__(180)
	  , dP             = __webpack_require__(155).f
	  , each           = __webpack_require__(202)(0)
	  , DESCRIPTORS    = __webpack_require__(159);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(152)
	  , IObject  = __webpack_require__(144)
	  , toObject = __webpack_require__(183)
	  , toLength = __webpack_require__(172)
	  , asc      = __webpack_require__(203);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(204);

	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(157)
	  , isArray  = __webpack_require__(205)
	  , SPECIES  = __webpack_require__(181)('species');

	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(145);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(149);

	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(207)('Map')});

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(188)
	  , from    = __webpack_require__(208);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(196);

	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classCallCheck2 = __webpack_require__(210);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _getIterator2 = __webpack_require__(136);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	exports.dealData4NewServiceType = dealData4NewServiceType;
	exports.getShowChooseFuncStr = getShowChooseFuncStr;
	exports.clearChoose3Info = clearChoose3Info;
	exports.initNewVersionServcieChoose = initNewVersionServcieChoose;
	exports.convertChooseList2ChooseOptions = convertChooseList2ChooseOptions;

	var _underscore_lib = __webpack_require__(74);

	var _underscore_lib2 = _interopRequireDefault(_underscore_lib);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var validateHelper = __webpack_require__(211);

	/*BaseInfoController操作相关的方法**/
	function dealData4NewServiceType(_ref) {
		var data = _ref.data;
		var orgData = _ref.orgData;
		var chooseItem = _ref.chooseItem;
		var FormEditStatusServcie = _ref.FormEditStatusServcie;
		var rootScope = _ref.rootScope;

		//data,orgData,l,FormEditStatusServcie,editScope
		//第一部分:主要为点击事件后的页面表单赋值工作
		var carrCode = chooseItem.carrCode;
		var serviceType = chooseItem.serviceType;
		var serviceSubCode = chooseItem.serviceSubCode;
		var serviceGroup = chooseItem.attributesGroup;
		var subGroup = chooseItem.attributesSubgroup;
		//第一步:重置表单数据
		//当点击的饿时候把整个表单重置//除了serviceType外的其他字段
		for (var pname in data) {
			if (!_underscore_lib2.default.contains(['sel1', 'sel2', 'sel3', 'sel4', 'firstMaintenanceDate'], pname)) {
				data[pname] = angular.copy(orgData[pname]);
			}
		}
		//validator是绑定在window上的全局变量
		validator.resetForm();
		//第二步：填充当前选中的数据
		data.carrCode = carrCode;
		data.serviceAndSubCode = serviceSubCode;
		data.serviceType = serviceType;
		//填充basicInfo信息start
		data.basicInfoVo.serviceGroup = serviceGroup;
		data.basicInfoVo.subGroup = subGroup;
		data.basicInfoVo.subCode = serviceSubCode;
		//清除表格复用的信息
		_clearAllReuseTbHistory();
		//清空金额缓存数据(初始化为全额状态)
		data.discountOrNot = '1';
		data.list201VO = []; //数据初始化
		//赋默认值部分
		_changeDefaultValueByServiceType(data);
		//第二部分：主要做页面的显隐以及是否可编辑工作
		validateHelper.changeServiceType(rootScope, data, FormEditStatusServcie);
		rootScope.myForm.$setPristine();
	}
	/*获取需要显示在 ‘选择附加服务’输入框中的 文字描述*/
	function getShowChooseFuncStr(FormData) {
		var str = "";
		var str1 = FormData.sel1.showStr || "";
		var str2 = FormData.sel2.showStr || "";
		var str3 = FormData.sel3.showStr || "";
		if (str1.length > 0) {
			str = str1;
		}
		if (str2.length > 0) {
			str += " > " + str2;
		}
		if (str3.length > 0) {
			str += " > " + str3;
		}
		return str;
	}
	/*清空第三个服务选择框中的类容*/
	function clearChoose3Info(_ref2) {
		var FormData = _ref2.FormData;
		var lastGroupList = _ref2.lastGroupList;
		var lastGroupList2 = _ref2.lastGroupList2;
		var initServiceType = _ref2.initServiceType;

		//FormData,lastGroupList,lastGroupList2,initServiceType
		//把第三个选项框以前保留的信息清空
		FormData.sel3.showStr = "";
		FormData.sel3.value = "";
		FormData.sel3.textTableNo163 = "";
		lastGroupList = [];
		lastGroupList2 = [];
		FormData.serviceAndSubCode = "";
		FormData.serviceType = initServiceType; //
		FormData.noChargeNotAvailable = ""; //设置为默认
		/////////////////////////////////////////
		FormData.basicInfoVo.serviceGroup = "";
		FormData.basicInfoVo.subGroup = "";
		FormData.basicInfoVo.subCode = "";
		FormData.sel4 = [];
	}

	/*var handleChangeSelect = function(val) {
	    console.log("你选择的 value : " + val);
	};*/

	function initNewVersionServcieChoose(callback) {
		var options = [];
		var $select = $('#select-links').selectize({
			valueField: 'id',
			labelField: 'text',
			searchField: ['text'],
			sortField: [{ field: 'groupDescription', direction: 'desc' }],
			onChange: callback,
			options: options,
			render: {
				option: function option(item, escape) {
					var label = item.text;
					var caption = item.serviceType;
					return '<div>' + '<span>' + escape(label) + '</span>' + '<span class="serviceTypeSpan">' + escape(caption) + '</span>' + '</div>';
				}
			}
		});
		var selectize = $select[0].selectize;
		return selectize;
	}
	/**将后台查询过来的list转为提示框需要的数据形式*/
	function convertChooseList2ChooseOptions(list) {
		//F/M/R/T------航班服务/商品服务/规则服务/客票服务
		//A/B/C/E/P----免费行李/随携行李/逾重行李/禁运行李/预付费行李
		var objMap = { "F": "航班服务", "M": "商品服务", "R": "规则服务", "T": "客票服务",
			"A": "免费行李", "B": "随携行李", "C": "逾重行李", "E": "禁运行李", "P": "预付费行李" };
		var options = [];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = (0, _getIterator3.default)(list), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _step$value = _step.value;
				var id = _step$value.id;
				var serviceType = _step$value.serviceType;
				var serviceSubCode = _step$value.serviceSubCode;
				var _step$value$commercia = _step$value.commercialName;
				var commercialName = _step$value$commercia === undefined ? "空" : _step$value$commercia;
				var _step$value$serviceGr = _step$value.serviceGroupDescription;
				var serviceGroupDescription = _step$value$serviceGr === undefined ? "空" : _step$value$serviceGr;
				var _step$value$subGroupD = _step$value.subGroupDescription;
				var subGroupDescription = _step$value$subGroupD === undefined ? "空" : _step$value$subGroupD;

				var text = _dealNullStr(serviceGroupDescription) + " > " + _dealNullStr(subGroupDescription) + " > [" + serviceSubCode + "] " + commercialName;
				var groupDescription = serviceGroupDescription;
				options.push({ id: id, text: text, groupDescription: groupDescription, serviceType: serviceType });
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return options;
	}

	function _dealNullStr(str) {
		var tmp = str || "空";
		return tmp;
	}

	/*当serviceType改变的时候，给页面上的一些元素赋默认值  private method*/
	function _changeDefaultValueByServiceType(data) {
		var serviceType = data.serviceType;
		////1.当为免费行李时，‘或/和’字段为空
		if (_underscore_lib2.default.contains(['A', 'B', 'E'], serviceType)) {
			data.specSevFeeAndOrIndicator = '';
		}
		//2.更新‘是否收费’的默认值
		if (serviceType == 'A') {
			data.noChargeNotAvailable = 'F'; //设置为免费
		} else if (serviceType == 'B') {
			data.noChargeNotAvailable = 'F'; //设置为免费
		} else if (serviceType == 'C' || serviceType == 'P') {
			data.noChargeNotAvailable = ''; //设置为收费
		} else if (serviceType == 'E') {
			data.noChargeNotAvailable = 'X'; //设置为收费
		}
		//3.更新‘是否检查库存’
		if (_underscore_lib2.default.contains(['A', 'B', 'E'], serviceType)) {
			data.availability = 'N';
		}
		//当服务为通用券（subgroup为FP）时，【sector/portion/journey】字段的值默认取值为journey（J=journey），且不可编辑
		var subgroup = data.basicInfoVo.subGroup;
		//4.更新‘区域/部分/全程’
		if (_underscore_lib2.default.contains(['B', 'E'], serviceType)) {
			data.geoSpecSectPortJourney = 'S';
		} else if (serviceType == 'F') {
			if (subgroup == 'FP') {
				//这里其实可以在下面直接判断当subgroup为fp时区域部分全程为‘J’
				data.geoSpecSectPortJourney = 'J';
			} else {
				data.geoSpecSectPortJourney = 'S';
			}
		} else {
			data.geoSpecSectPortJourney = '';
		}
	}

	/*清空复用的历史信息 private method */
	function _clearAllReuseTbHistory() {
		//201暂时不支持复用，所以不用清空历史
		var namesArrs = ["reuseList172VO", "reuseList173TicketVO", "reuseList183VO", "reuseList198VO", "reuseList198UpgradeVO", "reuseList171VO", "reuseList173TktVO", "reuseList186VO", "reuseList170VO", "reuseList196VO", "reuseList165VO", "reuseList178Loc1", "reuseList178Loc2", "reuseList178Loc3", "reuseListTsk202VO"];
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = (0, _getIterator3.default)(namesArrs), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var name = _step2.value;

				$(":input[name=" + name + "]").val("").attr("placeholder", "");
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	}

	var BasicInfoControllerBusi = function BasicInfoControllerBusi() {
		(0, _classCallCheck3.default)(this, BasicInfoControllerBusi);

		console.info('BasicInfoControllerClass is create .');
	};

	exports.default = BasicInfoControllerBusi;

/***/ },
/* 210 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function (require, exports, module) {
	var commonUtil = __webpack_require__(123);
	var _ = __webpack_require__(74);
	var jsonDataHelper = __webpack_require__(122);

	//js文件内部私有的工具类
	var _privateInnerUtil = {};
	_privateInnerUtil.checkIsPageClickFlag = function (isChangeSelectFlag) {
		//是否是页面点击触发的flag
		var pageClickFlag = true;
		var tmpFlagStr = isChangeSelectFlag + "";
		if (tmpFlagStr == 'false') {
			pageClickFlag = false;
		}
		return pageClickFlag;
	};

	//所有置为可能为’可编辑‘的状态时都要判断status是否为3
	var setEditableByStatus = function setEditableByStatus(globalEditStatus, name, statusDes) {
		var flag = commonUtil.getEditFlagByStatus(statusDes);
		globalEditStatus[name] = flag;
	};

	var NOTICE_TYPE_SINGLE = "singleChangeByFlagNotice";
	var NOTICE_TYPE_SERVICETYPE = "serviceTypeChangeNotice";

	var sendNotice2ForceDirctive4ServiceType = function sendNotice2ForceDirctive4ServiceType(scope, needDigest) {
		scope.$broadcast(NOTICE_TYPE_SERVICETYPE, needDigest + ""); //scope.$broadcast('serviceTypeChangeNotice') ;
	};

	var sendNoticeToForceDirctive4Single = function sendNoticeToForceDirctive4Single(scope, needDigest, noticeName, showFlag) {
		scope.$broadcast(NOTICE_TYPE_SINGLE, noticeName, showFlag + "", needDigest + ""); //适用于
	};

	var sendNoticeToForceDirctive4SingleArr = function sendNoticeToForceDirctive4SingleArr(scope, needDigest, noticeNameFlagList) {
		var len = noticeNameFlagList.length;
		for (var i = 0; i < len; i++) {
			var obj = noticeNameFlagList[i];
			var noticeName = obj.name;
			var showFlag = obj.flag;
			scope.$broadcast(NOTICE_TYPE_SINGLE, noticeName, showFlag + "", needDigest + ""); //适用于
		}
	};

	/**
	 * 功能描述:'或/和'控件 更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateSpecSevFeeAndOrIndicator = function updateSpecSevFeeAndOrIndicator(editScope, data, globalEditStatus) {
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var statusDes = data.statusDes;
		var serviceType = data.serviceType;
		var noChargeNotAvailable = data.noChargeNotAvailable;
		//全额或折扣(全额:1,折扣:0)
		var discountOrNot = data.discountOrNot;
		var specifiedServiceFeeApp = data.specifiedServiceFeeApp; //适用于

		//start**********这部分是为了处理可能存在的历史数据问题进行的特殊置空处理
		if (_.contains(['H', 'C', 'P'], specifiedServiceFeeApp)) {
			data.specSevFeeAndOrIndicator = '';
		}
		//end**********上面的这段特殊置空处理一定要注意(是为了update页面时，如果‘适用于’为‘H/C/P’则强制将‘里程费’和‘或/和’字段置为空)

		//serviceType 对'或/和'的影响
		//当服务类型为A、B、E时或/和一定为‘或’ 
		//当适用于为'H/C/P'时
		//2.判断是否可编辑
		if (_.contains(['A', 'B', 'E'], serviceType) || noChargeNotAvailable != '' || discountOrNot == '0' || _.contains(['H', 'C', 'P'], specifiedServiceFeeApp)) {
			globalEditStatus.specSevFeeAndOrIndicator = false;
		} else {
			//当有机会设置为可编辑时继续判断//也就是说不为行李时才有机会可编辑
			setEditableByStatus(globalEditStatus, 'specSevFeeAndOrIndicator', statusDes);
		}
	};
	/**
	 * 功能描述:更新‘收费组件’
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateNoChargeNotAvailable = function updateNoChargeNotAvailable(editScope, data, globalEditStatus) {
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var statusDes = data.statusDes;
		var serviceType = data.serviceType; //serviceType
		//如果是免费则将下面的费用变为不可选择
		//下面的这点之所以没有设置为不可编辑的原因是因为，
		//2.判断是否可编辑
		/*if(serviceType=='C'||serviceType=='P'){//收费一定为收费且不可编辑
	 	globalEditStatus.noChargeNotAvailable= false;
	 }else{//可编辑
	 	//还要判断当前status是否等于3
	 	setEditableByStatus(globalEditStatus,'noChargeNotAvailable',statusDes) ;
	 }*/

		//免费/收费
		editScope.noChargeNotAvailableList.list = jsonDataHelper.getNoChargeNotAvailableList(serviceType);
	};
	//
	/**
	 * 功能描述:‘是否检查库存组件’更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateAvailability = function updateAvailability(editScope, data, globalEditStatus) {
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var statusDes = data.statusDes;
		var serviceType = data.serviceType; //serviceType
		//将是否检查库存设置为 ‘否’
		//2.判断是否可编辑
		if (_.contains(['A', 'B', 'E'], serviceType)) {
			globalEditStatus.availability = false;
		} else {
			setEditableByStatus(globalEditStatus, 'availability', statusDes);
		}
	};
	/**
	 * 功能描述:‘适用于组件’更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateSpecifiedServiceFeeApp = function updateSpecifiedServiceFeeApp(editScope, data, globalEditStatus) {
		var serviceType = data.serviceType; //serviceType
		//适用于
		editScope.specifiedServiceFeeAppList.list = jsonDataHelper.getSpecifiedServiceFeeAppList(serviceType);
	};

	/**
	 * 功能描述:‘行李适用范围组件’更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updatebaggageTravelApplication = function updatebaggageTravelApplication(editScope, data, globalEditStatus) {
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var noChargeNotAvailable = data.noChargeNotAvailable;
		var statusDes = data.statusDes;
		//2.是否可编辑设置
		if (noChargeNotAvailable == 'D') {
			globalEditStatus.baggageTravelApplication = false;
		} else {
			setEditableByStatus(globalEditStatus, 'baggageTravelApplication', statusDes);
		}
	};

	/**
	 * 功能描述:‘是否可退组件’更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateIndicatorReissueRefund = function updateIndicatorReissueRefund(editScope, data, globalEditStatus) {
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		//是否收费
		var noChargeNotAvailable = data.noChargeNotAvailable;
		var statusDes = data.statusDes;
		//2.是否可编辑设置
		if (_.contains(['X', 'F', 'E'], noChargeNotAvailable)) {
			//如果不可点击
			globalEditStatus.indicatorReissueRefund = false;
		} else {
			setEditableByStatus(globalEditStatus, 'indicatorReissueRefund', statusDes);
		}
	};
	/**
	 * 功能描述:‘区域/部分/全程’更新
	 * @param editScope 页面上最外层的scope
	 * @param data      表单FormData服务
	 * @param globalEditStatus  页面是否可编辑的服务
	 * @param isChangeSelectFlag 是否是页面改变select的值触发的标志
	 */
	var updateGeoSpecSectPortJourney = function updateGeoSpecSectPortJourney(editScope, data, globalEditStatus) {
		//是否是页面点击触发的flag
		//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
		var serviceType = data.serviceType;
		//当服务为通用券（subgroup为FP）时，【sector/portion/journey】字段的值默认取值为journey（J=journey），且不可编辑
		var subGroup = data.basicInfoVo.subGroup || '';
		var statusDes = data.statusDes;
		//2.判断是否可编辑
		if (_.contains(['B', 'E'], serviceType)) {
			//不可编辑//开放||subGroup=='FP'时不可编辑
			globalEditStatus.geoSpecSectPortJourney = false;
		} else {
			//如果没有被重置为不可编辑，则这里需要重置是否可编辑
			setEditableByStatus(globalEditStatus, 'geoSpecSectPortJourney', statusDes);
		}
		editScope.geoSpecSectPortJourneyList.list = jsonDataHelper.getgeoSpecSectPortJourneyList(serviceType, subGroup);
	};

	/**
	 * 功能描述:更新‘里程费’
	 */
	var updateSpecifiedServiceFeeMileage = function updateSpecifiedServiceFeeMileage(editScope, data, globalEditStatus) {
		var statusDes = data.statusDes;
		//全额或折扣(全额:1,折扣:0)
		var discountOrNot = data.discountOrNot; //是否打折
		var mileageExchangeIndicator = data.mileageExchangeIndicator; //里程兑换标识
		var specifiedServiceFeeApp = data.specifiedServiceFeeApp; //适用于
		//如果为折扣 则 里程费 必须为空,里程兑换标识为1或2时里程费字段必须为空//或则适用于为'H/C/P时'

		//start**********这部分是为了处理可能存在的历史数据问题进行的特殊置空处理
		if (_.contains(['H', 'C', 'P'], specifiedServiceFeeApp)) {
			data.specifiedServiceFeeMileage = '';
		}
		//end**********上面的这段特殊置空处理一定要注意(是为了update页面时，如果‘适用于’为‘H/C/P’则强制将‘里程费’和‘或/和’字段置为空)

		if (discountOrNot == '0' || mileageExchangeIndicator == '1' || mileageExchangeIndicator == '2' || _.contains(['H', 'C', 'P'], specifiedServiceFeeApp)) {
			globalEditStatus.specifiedServiceFeeMileage = false;
		} else {
			setEditableByStatus(globalEditStatus, 'specifiedServiceFeeMileage', statusDes);
		}
	};

	/**
	 * 功能描述:更新‘里程兑换标识’
	 */
	var updateMileageExchangeIndicator = function updateMileageExchangeIndicator(editScope, data, globalEditStatus) {
		var statusDes = data.statusDes;
		//是否收费
		var noChargeNotAvailable = data.noChargeNotAvailable;
		//全额或折扣(全额:1,折扣:0)
		var discountOrNot = data.discountOrNot;
		//‘或/和’
		var specSevFeeAndOrIndicator = data.specSevFeeAndOrIndicator;
		//适用于字段为'H/C/P'
		var specifiedServiceFeeApp = data.specifiedServiceFeeApp;
		//如果为折扣 则 里程费 必须为空
		if (noChargeNotAvailable != '' || discountOrNot == '0' || specSevFeeAndOrIndicator == 'A' || _.contains(['H', 'C', 'P'], specifiedServiceFeeApp)) {
			globalEditStatus.mileageExchangeIndicator = false;
		} else {
			setEditableByStatus(globalEditStatus, 'mileageExchangeIndicator', statusDes);
		}
	};

	/**
	 * 功能描述:更新期限的延迟类型
	 */
	var updateEffectivePeriodType = function updateEffectivePeriodType(editScope, data, globalEditStatus) {
		var subGroup = data.basicInfoVo.subGroup; //serviceType
		editScope.effectivePeriodTypeList.list = jsonDataHelper.getEffectivePeriodTypeList(subGroup);
	};

	module.exports = {
		changeServiceType: function changeServiceType(editScope, data, globalEditStatus) {
			/*改变serviceType*/
			var statusDes = data.statusDes;
			var serviceType = data.serviceType || ''; //serviceType
			//更新是否收费组件的信息
			updateNoChargeNotAvailable(editScope, data, globalEditStatus);
			//更新'或/和'组件的显隐及是否可编辑状态
			updateSpecSevFeeAndOrIndicator(editScope, data, globalEditStatus);
			//更新是否检查库存
			updateAvailability(editScope, data, globalEditStatus);
			//适用于
			updateSpecifiedServiceFeeApp(editScope, data, globalEditStatus);
			//区域/部分/全程
			updateGeoSpecSectPortJourney(editScope, data, globalEditStatus);
			//更新延迟期限类型的select
			updateEffectivePeriodType(editScope, data, globalEditStatus);

			//发送广播隐藏或显示组件
			//editScope.$broadcast('serviceTypeChangeNotice','false') ;//scope.$broadcast('serviceTypeChangeNotice') ;	
			sendNotice2ForceDirctive4ServiceType(editScope, 'false');
		},
		changeNoChargeNotAvailable: function changeNoChargeNotAvailable(editScope, data, globalEditStatus) {
			/**当改变是否收费的时候*/
			var serviceType = data.serviceType || '';
			var noChargeNotAvailable = data.noChargeNotAvailable || '';
			//var pageClickFlag = _privateInnerUtil.checkIsPageClickFlag(isChangeSelectFlag) ;
			//console.info('serviceType : ' + serviceType) ;
			//服务类型是不是行李附加服务
			//var isBaggageFlag = commonUtil.checkBaggageServcie(serviceType) ;
			var in_flag = true;
			if (noChargeNotAvailable == '') {
				//如果不为收费这下面的置空
				in_flag = true;
			} else {
				//免费的时候需要清空填写的信息
				in_flag = false; //隐藏 适用于，里程，金额,或/和,里程兑换标识
			}
			//console.info('是否为行李服务['+isBaggageFlag+']，收费类型为 ['+noChargeNotAvailable+']--X,E,F,G,H--时隐藏，判断结果flag : ' + in_flag) ;
			//var specifiedServiceFeeApp_specialFlag = true;
			//当收费类型为D/X/F/E时暂时不做区分是否为行李或则一般附加服务，这里全部都将适用于置为空
			//这个地方可能还存在一店暂时先把为d时适用于全部置空
			//specifiedServiceFeeApp_specialFlag = false ;//如果不为d，则进入其他的校验，按照其他的进行
			//当是否收费为D时  --行李适用范围必须为空
			//更新'行李适用范围'组件
			updatebaggageTravelApplication(editScope, data, globalEditStatus);
			//更新’或/和‘组件
			updateSpecSevFeeAndOrIndicator(editScope, data, globalEditStatus);
			//更新‘是否可退’组件
			updateIndicatorReissueRefund(editScope, data, globalEditStatus);
			var freeBaggageAllowancePiecesFlag = false; //因为免费行李件件数控件只有在serviceType=='A'是才能显示
			//当是否收费为D/O时行李件数必修为空,行李类型必须为A,行李子代码必须为0DF
			if (serviceType == 'A') {
				if (noChargeNotAvailable == 'D' || noChargeNotAvailable == 'O') {
					freeBaggageAllowancePiecesFlag = false;
				} else {
					freeBaggageAllowancePiecesFlag = true;
				}
			}
			//行李件数置为空//费用//里程//适用于//里程兑换标//或/和
			var noticeNameFlagList = [{ "name": "freeBaggageAllowancePieces", "flag": freeBaggageAllowancePiecesFlag, "descr": "免费行李" }, { "name": "list170VOAndlist201VO", "flag": in_flag, "descr": "金额" }, { "name": "specifiedServiceFeeMileage", "flag": in_flag, "descr": "里程费" }, { "name": "specifiedServiceFeeApp", "flag": in_flag, "descr": "适用于" }, { "name": "specSevFeeAndOrIndicator", "flag": in_flag, "descr": "或/和" }, { "name": "mileageExchangeIndicator", "flag": in_flag, "descr": "里程积分兑换标识" }];
			sendNoticeToForceDirctive4SingleArr(editScope, "false", noticeNameFlagList);
			/*{"name":"specifiedServiceFeeApp","flag":in_flag}*/
			//这个地方是只有当适用于不为hcp，并且为收费时才应该显示
			/*var specifiedServiceFeeApp = data.specifiedServiceFeeApp ;
	  var flag2 = true ;
	  if(_.contains(['H','C','P'],specifiedServiceFeeApp)){
	  	flag2 = false;
	  }else{
	  	if(noChargeNotAvailable==''){
	  		flag2 = true;
	  	}else{
	  		flag2 = false ;
	  	}
	  }
	  sendNoticeToForceDirctive4Single(editScope, "false", "mileageExchangeIndicator", flag2) ;*/
			//更新里程积分兑换标识
			updateMileageExchangeIndicator(editScope, data, globalEditStatus);
		},
		changeSpecifiedServiceFeeApp: function changeSpecifiedServiceFeeApp(editScope, data, globalEditStatus) {
			/**当改变适用于的时候*/
			var serviceType = data.serviceType || '';
			var noChargeNotAvailable = data.noChargeNotAvailable || '';
			var ssfa = data.specifiedServiceFeeApp || '';
			var in_flag = true;
			//因为只有行李服务适用于才会有[H,C,P]，所以这里不需要判断serviceType是否为C，P
			if (ssfa == 'H' || ssfa == 'C' || ssfa == 'P') {
				in_flag = false;
			} else {
				if (noChargeNotAvailable == '') {
					//如果不为收费这下面的置空
					in_flag = true;
				} else {
					//免费的时候需要清空填写的信息
					in_flag = false; //隐藏 适用于，里程，金额
				}
			}
			//console.info('serviceType : ['+serviceType+'] , ssfa : ['+ssfa+']  , in_flag : ['+in_flag+']' ) ;
			//$scope.FormEditStatusServcie.noChargeNotAvailable =in_flag;
			//170，201显示或隐藏
			//editScope.$broadcast('singleChangeByFlagNotice','list170VOAndlist201VO',in_flag+'','false') ;
			sendNoticeToForceDirctive4Single(editScope, "false", "list170VOAndlist201VO", in_flag);
			//当适用于改变的时候要更新 ‘里程积分兑换标识’状态
			updateMileageExchangeIndicator(editScope, data, globalEditStatus);
			//更新‘或/者’字段
			updateSpecSevFeeAndOrIndicator(editScope, data, globalEditStatus);
			//更新‘里程费’字段
			updateSpecifiedServiceFeeMileage(editScope, data, globalEditStatus);
		},
		changeGeoSpecSectPortJourney: function changeGeoSpecSectPortJourney(editScope, data, globalEditStatus) {
			/*var geoSpecSectPortJourney = data.geoSpecSectPortJourney || '' ;
	  var noticeName = 'geoSpecLoc1AndType' ;
	  var showFlag = true;
	  if(geoSpecSectPortJourney==''){
	  	showFlag = false;
	  }
	  sendNoticeToForceDirctive4Single(editScope,'false',noticeName,showFlag+'') ;*/
		},
		changeDiscount: function changeDiscount(editScope, data, globalEditStatus) {
			/*当改变折扣时*/
			//更新‘或/和’是否可编辑状态
			updateSpecSevFeeAndOrIndicator(editScope, data, globalEditStatus);
			//更新‘里程费’是否可编辑状态
			updateSpecifiedServiceFeeMileage(editScope, data, globalEditStatus);
			//更新'里程兑换标识'
			updateMileageExchangeIndicator(editScope, data, globalEditStatus);
		},
		changeSpecSevFeeAndOrIndicator: function changeSpecSevFeeAndOrIndicator(editScope, data, globalEditStatus) {
			/*当改变‘或/和’时*/
			//更新'里程兑换标识'
			updateMileageExchangeIndicator(editScope, data, globalEditStatus);
		},
		changeMileageExchangeIndicator: function changeMileageExchangeIndicator(editScope, data, globalEditStatus) {
			/*当改变‘里程兑换标识’时*/
			//更新‘里程费’是否可编辑状态
			updateSpecifiedServiceFeeMileage(editScope, data, globalEditStatus);
		}
	};

	//}) ;

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//define(function(require, exports, module) {
	var _ = __webpack_require__(74);
	var util = {};
	//将查询的s7数据转换为‘FormData’
	util.convertS7ToFormData = function (s7, formData) {
		for (var p in formData) {
			var flag = s7.hasOwnProperty(p);
			if (flag) {
				var tmpStr = s7[p];
				formData[p] = tmpStr;
			}
		}
		//2.填充部分特殊数据
		formData.sel1.showStr = s7.basicInfoVo.serviceGroupDescription;
		formData.sel2.showStr = s7.basicInfoVo.subGroupDescription;
		formData.sel3.showStr = "[" + s7.basicInfoVo.subCode + "]" + s7.basicInfoVo.commercialName;
		formData.sel1.value = s7.basicInfoVo.serviceGroup;
		formData.sel2.value = s7.basicInfoVo.subGroup;
		formData.sel3.value = s7.basicInfoVo.subCode;
	};

	//提交表单时将formData转换为s7
	util.convertFormDataToS7 = function (formData) {
		var s7 = {};
		angular.extend(s7, formData);
		util.initTravelDate(s7);
		util.initDayOfWeek(s7);
		//处理部分特殊数据
		//删除后台不存在的属性字段
		delete s7.sel1;
		delete s7.sel2;
		delete s7.sel3;
		delete s7.travelStartDate;
		delete s7.travelEndDate;
		delete s7.dayOfWeekShow;

		return s7;
	};

	util.initTravelDate = function (s7) {
		var arr1 = util.getDateArr(s7.travelStartDate);
		var arr2 = util.getDateArr(s7.travelEndDate);
		s7.firstTravelYear = arr1[0];
		s7.firstTravelMonth = arr1[1];
		s7.firstTravelDay = arr1[2];
		//
		s7.lastTravelYear = arr2[0];
		s7.lastTravelMonth = arr2[1];
		s7.lastTravelDay = arr2[2];
	};

	util.initDayOfWeek = function (s7) {
		var dayOfWeekShow = s7.dayOfWeekShow;
		var str = "";
		var index = 1;
		for (var t in dayOfWeekShow) {
			var value = dayOfWeekShow[t];
			if (value) {
				str += index;
			}
			index++;
		}
		s7.dayOfWeek = str;
	};

	//检查金额是否不为空
	var checkMemonyIsNotNull = function checkMemonyIsNotNull(data) {
		var list170 = data['list170VO'];
		var list201 = data['list201VO'];
		if (list170.length == 0 && list201.length == 0) {
			return false;
		}
		return true;
	};

	//判断金额是否为空
	var testFreeIsNull = function testFreeIsNull(data) {
		var list170 = data['list170VO'];
		var list201 = data['list201VO'];
		if (list170.length > 0 || list201.length > 0) {
			return false;
		}
		return true;
	};

	//检查区域1字段是否为空
	var checkLoc1IsNull = function checkLoc1IsNull(formData) {
		var geoSpecLoc1Type = formData['geoSpecLoc1Type'] || '';
		var geoSpecLoc1 = formData['geoSpecLoc1'];
		var list178Loc1 = formData['list178Loc1'];
		if ((geoSpecLoc1Type == '' || geoSpecLoc1 == '') && list178Loc1.length == 0) {
			return true;
		}
		return false;
	};
	//检查区域1字段是否为空
	var checkLoc2IsNull = function checkLoc2IsNull(formData) {
		var geoSpecLoc2Type = formData['geoSpecLoc2Type'] || '';
		var geoSpecLoc2 = formData['geoSpecLoc2'];
		var list178Loc2 = formData['list178Loc2'];
		if ((geoSpecLoc2Type == '' || geoSpecLoc2 == '') && list178Loc2.length == 0) {
			return true;
		}
		return false;
	};

	//检查区域1字段是否为空
	var checkLoc3IsNull = function checkLoc3IsNull(formData) {
		var geoSpecLoc3Type = formData['geoSpecLoc3Type'] || '';
		var geoSpecLoc3 = formData['geoSpecLoc3'];
		var list178Loc3 = formData['list178Loc3'];
		if ((geoSpecLoc3Type == '' || geoSpecLoc3 == '') && list178Loc3.length == 0) {
			return true;
		}
		return false;
	};

	//校验交单数据是否可以提交
	util.validFormData = function (formData, orgFormData) {
		var serviceType = formData['serviceType'];
		//第一个校验
		//其他校验
		//1.表格数据校验[删除表格中的非法数据:eg:第一个字段为空的假数据]
		util.delInValidList(formData);
		util.dealOtherData(formData);
		//如果适用于为h，c，p
		var hcpFlag = _.contains(['H', 'C', 'P'], formData['specifiedServiceFeeApp']);
		//console.info("--------------------> " +hcpFlag + "   , " + formData['specifiedServiceFeeApp'] )  ;
		/**1.当收费为收费时,如果适用于不为H,C,P时，金额字段必填，否则金额或则里程费两个不能同时为空*/
		if (formData['noChargeNotAvailable'] == '' && !hcpFlag) {
			var freeIsNullFlag = testFreeIsNull(formData);
			if (formData['specSevFeeAndOrIndicator'] == 'A') {
				//或、和字段值为A时
				if (freeIsNullFlag) {
					$.showTuiErrorDialog('您选择的支付方式为金额和里程，请填写金额!');
					return false;
				}
			} else {
				//
				if (formData['specifiedServiceFeeMileage'].length == 0 && freeIsNullFlag) {
					//如果里程费为空
					$.showTuiErrorDialog('请填写金额或里程费!');
					return false;
				}
			}
		}

		var loc1IsNullFlag = checkLoc1IsNull(formData);
		var loc2IsNullFlag = checkLoc2IsNull(formData);
		var loc3IsNullFlag = checkLoc3IsNull(formData);
		if (formData['geoSpecFromToWithin'] != '') {
			//如果不为不限区域则区域必填
			if (loc1IsNullFlag) {
				$.showTuiErrorDialog('【区域限制】选择的不是“不限区域”，【区域1】必填！');
				return false;
			}
		}
		if (formData['geoSpecFromToWithin'] == 'W') {
			if (!loc2IsNullFlag || !loc3IsNullFlag) {
				$.showTuiErrorDialog('【区域限制】选择了“区域1内部”，【区域2】和【经过区域】不能有值！');
				return false;
			}
		}

		//当‘区域/部分/全程’
		var geoSpecSectPortJourney = formData['geoSpecSectPortJourney'] || '';
		//区域限制
		var geoSpecFromToWithin = formData['geoSpecFromToWithin'] || '';
		//经停类型
		var geoSpecStopConnDes = formData['geoSpecStopConnDes'] || '';
		if (geoSpecSectPortJourney == '') {
			if (!loc1IsNullFlag) {
				$.showTuiErrorDialog('【Sector/Portion/Journey】为空，【区域1】必须为空!');
				return false;
			}
		} else if (geoSpecSectPortJourney == 'P') {
			//loc1必须有值
			var astr = '';
			var flag2 = loc2IsNullFlag && geoSpecFromToWithin != 'W' && geoSpecStopConnDes != 'T';
			if (loc1IsNullFlag && flag2) {
				astr = '【sector/portion/journey】选择了portion，【区域1】必填，且：【区域2】有值，或者【区域限制】选择“区域1内部”，或者【经停类型】字段填“T”!';
				$.showTuiErrorDialog(astr);
				return false;
			} else if (loc1IsNullFlag) {
				astr = '【Sector/Portion/Journey】选择了Portion，【区域1】必填!';
				$.showTuiErrorDialog(astr);
				return false;
			} else if (flag2) {
				astr = '【Sector/Portion/Journey】选择了Portion，【区域2】必填，或者【区域限制】选择“区域1内部”，或者【经停类型】字段填“T”!';
				$.showTuiErrorDialog(astr);
				return false;
			}
		} else if (geoSpecSectPortJourney == 'J') {
			if (loc1IsNullFlag || loc2IsNullFlag) {
				$.showTuiErrorDialog('【Sector/Portion/Journey】选择了Journey，【区域1】和【区域2】必填!');
				return false;
			}
		}
		//里程如果最大值没有填写则置为最大值5个9
		if (formData.mileageMaximum == '') {
			formData.mileageMaximum = '99999';
		}
		return true;
	};

	//处理表单其他数据
	util.dealOtherData = function (formData) {
		var serviceType = formData.serviceType;
		if (serviceType == 'A') {
			formData.firstExcessOccurrence = "";
			formData.lastExcessOccurrence = "";
		}
		/*if(serviceType=='C'||serviceType=='P'){
	 	if(formData.firstExcessOccurrence.length>0){
	 		if(formData.lastExcessOccurrence == ""){//若后者不填写，则后者默认等于前者
	 			formData.lastExcessOccurrence = formData.firstExcessOccurrence ;
	 		}
	 	}
	 }*/
	};

	util.strNotNull = function (str) {
		var tmp = str || "";
		tmp = $.trim(tmp + "");
		var flag = false;
		if (tmp.length > 0) {
			flag = true;
		}
		return flag;
	};

	/**
	 * <pre>
	 * 	删除表格中无效数据
	 * </pre>
	 * @param {Object} formData
	 */
	util.delInValidList = function (formData) {
		//170表格
		var t170 = [];
		angular.forEach(formData.list170VO, function (m) {
			if (util.strNotNull(m.specFeeAmount)) {
				//如果存在的话
				t170.push(m);
			}
		});
		//list198VO


		/*var t198 = [] ;
	 angular.forEach(formData.list198VO,function(m){
	 	if(util.strNotNull(m.mktOp)){
	 		t198.push(m) ;
	 	}
	 }) ;
	 formData.list198VO = t198 ;*/

		//list198UpgradeVO
		var t198up = [];
		var serviceGroup = formData.basicInfoVo.serviceGroup;
		var serviceGroupIsUpOrBDUPFlag = false;
		if (serviceGroup == 'UP' || serviceGroup == 'BDUP') {
			serviceGroupIsUpOrBDUPFlag = true;
		}
		angular.forEach(formData.list198UpgradeVO, function (m) {
			if (util.strNotNull(m.rbd1)) {
				//判断是否为升舱，如果不是升舱则需要把前两个字段置为空
				if (!serviceGroupIsUpOrBDUPFlag) {
					//如果为false
					m.mktOp = "";
					m.cxr = "";
				}
				t198up.push(m);
			}
		});
		formData.list198UpgradeVO = t198up;

		//list183VO
		var t183 = [];
		angular.forEach(formData.list183VO, function (m) {
			var flag = false;
			for (var p in m) {
				var v = m[p];
				if (util.strNotNull(v)) {
					flag = true;
					break;
				}
			}
			if (flag) {
				t183.push(m);
			}
		});
		formData.list183VO = t183;
		//list186VO
		var t186 = [];
		angular.forEach(formData.list186VO, function (m) {
			if (util.strNotNull(m.fltNo1)) {
				t186.push(m);
			}
		});
		formData.list186VO = t186;
		//list178Loc1
		var tloc1 = [];
		angular.forEach(formData.list178Loc1, function (m) {
			if (util.strNotNull(m.geoLocType)) {
				tloc1.push(m);
			}
		});
		formData.list178Loc1 = tloc1;
		//list178Loc2
		var tloc2 = [];
		angular.forEach(formData.list178Loc2, function (m) {
			if (util.strNotNull(m.geoLocType)) {
				tloc2.push(m);
			}
		});
		formData.list178Loc2 = tloc2;
		//list178Loc3
		var tloc3 = [];
		angular.forEach(formData.list178Loc3, function (m) {
			if (util.strNotNull(m.geoLocType.length)) {
				tloc3.push(m);
			}
		});
		formData.list178Loc3 = tloc3;
		//行李件数表格处理
		var t196 = [];
		angular.forEach(formData.list196VO, function (m) {
			if (util.strNotNull(m.count) && util.strNotNull(m.code)) {
				t196.push(m);
			}
		});
		formData.list196VO = t196;
		//171表格无效数据删除
		var t171 = [];
		angular.forEach(formData.list171VO, function (m) {
			if (util.strNotNull(m.carrier)) {
				t171.push(m);
			}
		});
		formData.list171VO = t171;
		//172表格删除无效数据
		var t172 = [];
		angular.forEach(formData.list172VO, function (m) {
			if (util.strNotNull(m.accountCode)) {
				t172.push(m);
			}
		});
		formData.list172VO = t172;
		//173-1表格删除无效数据
		var t173_1 = [];
		angular.forEach(formData.list173TicketVO, function (m) {
			if (util.strNotNull(m.ticketDesignator)) {
				t173_1.push(m);
			}
		});
		formData.list173TicketVO = t173_1;
		//173-2表格删除无效数据
		var t173_2 = [];
		angular.forEach(formData.list173TktVO, function (m) {
			if (m.ticketDesignator.length > 0) {
				t173_2.push(m);
			}
		});
		formData.list173TktVO = t173_2;
		//165
		var t165 = [];
		angular.forEach(formData.list165VO, function (m) {
			if (m.equipmentCode.length > 0) {
				//如果存在的话
				t165.push(m);
			}
		});
		formData.list165VO = t165;
	};

	util.getDate = function (str) {
		var strs = str.split('-');
		var year = strs[0];
		var month = strs[1];
		var day = strs[2];
		return new Date(year, month - 1, day);
	};

	util.getDateArr = function (str) {
		var arr = [];
		var year = '';
		var month = '';
		var day = '';
		if (str.length > 0) {
			var infos = str.split('-');
			if (infos.length == 3) {
				arr.push(infos[0]);
				arr.push(infos[1]);
				arr.push(infos[2]);
			}
		}
		return arr;
	};

	module.exports = util;
	//});

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(61))(24);

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function (require, exports, module) {
	var controllers = __webpack_require__(134);
	//var util = require('../util/S7FormDataUtil') ;
	var S7FormDataUtil = __webpack_require__(212);
	var _ = __webpack_require__(74);
	var util = __webpack_require__(70);

	//当提交的时候将页面上所有字段的$dirty全部置为true
	function changeInputStatus4Submit(data, myForm) {
		var keys1 = _.keys(data);
		var keys2 = _.keys(myForm);
		_.each(keys2, function (item) {
			if (_.contains(keys1, item)) {
				myForm[item].$setDirty(true);
			}
		});
	}
	//保存表格数据到后台
	//headerController
	controllers.controller('HeaderCtrl', ['$scope', 'FormData', 'HttpOperService', '$log', function ($scope, FormData, HttpOperService, $log) {
		$scope.contextPath = FormData.contextPath;
		$scope.data = FormData;
		var action = $.trim($("#action").val());
		var headerTipStr = "新建服务费用";
		if (action == "add") {
			headerTipStr = "新建服务费用";
		} else {
			//表示为修改页面跳转过来的
			headerTipStr = "更新服务费用";
		}
		$scope.headerTipStr = headerTipStr;
		//提交表单数据
		$scope.submitForm = function (saveOrSaveAndPublish) {
			var action = $scope.data.action;
			var sel3ShowStr = $scope.data.sel3.showStr;
			var flag = validator.form();
			var ngFlag = $scope.myForm.$valid;
			//$log.info('flag : ' + flag) ;
			//$log.info('ngFlag : '  + ngFlag) ;
			if (action == 'add' && sel3ShowStr == '') {
				$.showTuiErrorDialog('请选择服务到最后一级！');
			} else {
				changeInputStatus4Submit($scope.data, $scope.myForm);
				if (flag && ngFlag) {
					saveFormData(saveOrSaveAndPublish, $scope.data);
				}
			}
		};

		$scope.backPage = function () {
			var contextPath = $.trim($("#contextPath").val());
			window.location.href = contextPath + '/oc/toQueryS7UI.action';
		};
		/**
	 * <pre>
	 * 	功能描述:保存表单数据
	 * </pre>
	 * @param {Object} operType  ['save','saveAndPublish']  点击‘保存’,‘保存并发布’
	 */
		function saveFormData(operType, formData) {
			var tokenId = $("#tokenId").val();
			var flag = false;
			var s7 = S7FormDataUtil.convertFormDataToS7(formData);
			flag = S7FormDataUtil.validFormData(s7, formData);
			//flag = false;//本地测试禁止表单提交
			if (flag) {
				//如果校验通过的话则提交表单数据到后台
				$.showTuiConfirmDialog('保存?', function () {
					//特殊出来日期，生效日期和结束日期
					if (s7.firstMaintenanceDate.length > 0) {
						s7.firstMaintenanceDate = s7.firstMaintenanceDate + ":00";
					}
					if (s7.lastMaintenanceDate.length > 0) {
						s7.lastMaintenanceDate = s7.lastMaintenanceDate + ":59";
					}
					var url = "";
					if (operType == 'save') {
						if (formData.action == "add" || formData.action == "copy") {
							//新增数据的话
							url = formData.contextPath + "/s7/addS7.action";
						} else if (formData.action == "update") {
							//更新数据的话
							url = formData.contextPath + "/s7/updateS7.action";
						}
					} else if (operType == 'saveAndPublish') {
						url = formData.contextPath + "/s7/saveAndPublishS7.action";
					}
					var config = { "tokenId": tokenId };
					util.showLoading();
					var promise = HttpOperService.postDate(url, s7, config);
					promise.then(function (data) {
						util.hideLoading();
						if (data.flag == 'true') {
							$.showTuiSuccessDialog('保存成功！', function () {
								window.location.href = formData.contextPath + '/oc/toQueryS7UI.action';
							});
						} else if (data.timeMsg != undefined && data.timeMsg != '') {
							$.showTuiErrorDialog(data.timeMsg);
						} else {
							$.showTuiErrorDialog('保存数据出错！');
						}
					}, function (error) {
						util.hideLoading();
						$.showTuiErrorDialog('保存数据出错！');
					});
				});
			}
		}
	}]);
	//}) ;

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _BasicInfoControllerBusi = __webpack_require__(209);

	//define(function (require, exports, module) {
	var controllers = __webpack_require__(134);

	//页面第一个部分/////////选择附加服务部分/////////////////////////////////////////
	//select级联controller
	controllers.controller('BasicInfoCtrl', ['$scope', 'HttpOperService', 'FormData', 'DEFAULT_SERVICETYPE', 'FormEditStatusServcie', function ($scope, HttpOperService, FormData, DEFAULT_SERVICETYPE, FormEditStatusServcie) {
		//chooseInput的输入数据
		$scope.chooseInputData = {
			"choose1": "",
			"choose2": "",
			"choose3": ""
		};
		$scope.data = FormData;
		//显示在 ‘选择附加服务’输入框中的 文字描述
		$scope.showChooseFunc = function () {
			return (0, _BasicInfoControllerBusi.getShowChooseFuncStr)(FormData);
		};
		//当新旧版页面切换时
		$scope.chageVersionOper = function (flag) {
			var action = FormData.action;
			//只有新增页面才支持
			if (action === 'add') {
				if ($scope.newVersionFlag != flag) {
					$scope.newVersionFlag = flag;
				}
			}
		};

		//初始化新版服务选择框(新版)
		//console.info('页面部分数据其他处理.......') ;
		var selectize = (0, _BasicInfoControllerBusi.initNewVersionServcieChoose)(function (id) {
			if (id && id.length > 0) {
				var curItem = $scope.serviceChooseMap.get(id);
				var serviceGroup = curItem.attributesGroup;
				var subGroup = curItem.attributesSubgroup;
				var subCode = curItem.serviceSubCode;
				var serviceGroupDescription = curItem.serviceGroupDescription;
				var subGroupDescription = curItem.subGroupDescription;
				var commercialName = curItem.commercialName;
				var carrCode = curItem.carrCode;
				var serviceType = curItem.serviceType;
				//'['+serviceSubCode+']'+commercialName ;
				var data = $scope.data;
				var orgData = $scope.orgData;
				var chooseItem = curItem;
				var rootScope = $scope.$parent;
				var operOption = { data: data, orgData: orgData, chooseItem: chooseItem, FormEditStatusServcie: FormEditStatusServcie, rootScope: rootScope };
				$scope.$apply(function () {
					//当改版serviceType后
					//1.步骤
					FormData.sel1.value = serviceGroup; //serviceGroup
					FormData.sel1.showStr = serviceGroupDescription;
					FormData.sel2.value = subGroup; //subGroup
					FormData.sel2.showStr = subGroupDescription;
					FormData.sel3.value = subCode;
					FormData.sel3.showStr = "[" + subCode + "]" + commercialName;
					//2.步骤
					(0, _BasicInfoControllerBusi.dealData4NewServiceType)(operOption);
					//第四步:查询数据为后面显示准备
				});
				var textTableNo163 = curItem.subCodeTableNo163 || '';
				var oldTextTableNo163 = FormData.sel3.textTableNo163 || '';
				//if(oldTextTableNo163!=textTableNo163){//如果上次和这次不相同才需要重新渲染第四列
				textTableNo163 = textTableNo163 * 1;
				var url = FormData.contextPath + "/s7/query4ClickService.action";
				var queryParam = { "subCodeTableNo163": textTableNo163 + "",
					"carrCode": carrCode,
					"serviceType": serviceType,
					"serviceAndSubCode": subCode };
				var promise = HttpOperService.postDate(url, queryParam, {});
				promise.then(function (retData) {
					$scope.lastGroupList2 = retData.tb163List;
					$scope.data.sel4 = retData.tb163List;
					$scope.data.sequenceNumber = retData.maxSequenceNumber * 1 + 10;
				}, function (err) {
					alert("查询出错!");
				});
				//}
			} else {
				//当删除的时候，也会触发选中事件
				$scope.$apply(function () {
					FormData.sel1.value = ""; //serviceGroup
					FormData.sel1.showStr = "";
					FormData.sel2.value = ""; //subGroup
					FormData.sel2.showStr = "";
					FormData.sel3.value = "";
					FormData.sel3.showStr = "";
				});
			}
		});
		window.selectize = selectize;

		//choose第一个框中li点击事件
		$scope.subGroupQuery = function (showStr, serviceGroup) {
			var contextPath = $scope.contextPath;
			FormData.sel1.showStr = showStr;
			FormData.sel1.value = serviceGroup;
			//把第二个选项框以前保留的信息清空
			FormData.sel2.showStr = "";
			FormData.sel2.value = "";
			//把第三个选项框以前保留的信息清空
			var initServiceType = DEFAULT_SERVICETYPE;
			var lastGroupList = $scope.lastGroupList;
			var lastGroupList2 = $scope.lastGroupList2;
			var clearOption = { FormData: FormData, lastGroupList: lastGroupList, lastGroupList2: lastGroupList2, initServiceType: initServiceType };
			(0, _BasicInfoControllerBusi.clearChoose3Info)(clearOption);

			var url = contextPath + "/s5/queryS5SubGroupByGroup.action";
			var carrier = $scope.data.carrCode;
			var jqeryData = {}; //post方式提交
			var jueryParam = { carrCode: carrier, serviceGroup: serviceGroup }; //地址问号形式
			var promise = HttpOperService.postDate(url, jqeryData, jueryParam);
			promise.then(function (retData) {
				$scope.subGroupList = retData;
			}, function (err) {
				alert("查询出错!");
			});
		};
		//第二个li点击事件
		$scope.s5Query = function (showStr, subGroup) {
			var contextPath = $scope.contextPath;
			FormData.sel2.showStr = showStr;
			FormData.sel2.value = subGroup;
			//把第三个选项框以前保留的信息清空
			var initServiceType = DEFAULT_SERVICETYPE;
			var lastGroupList = $scope.lastGroupList;
			var lastGroupList2 = $scope.lastGroupList2;
			var clearOption = { FormData: FormData, lastGroupList: lastGroupList, lastGroupList2: lastGroupList2, initServiceType: initServiceType };
			(0, _BasicInfoControllerBusi.clearChoose3Info)(clearOption);
			var url = contextPath + "/s5/queryS5BySubGroup.action";
			var carrier = $scope.data.carrCode;
			var serviceGroup = FormData.sel1.value;
			var jqeryData = {}; //post方式提交
			var jueryParam = { carrier: carrier, serviceGroup: serviceGroup, subGroup: subGroup }; //地址问号形式
			var promise = HttpOperService.postDate(url, jqeryData, jueryParam);
			promise.then(function (retData) {
				$scope.lastGroupList = retData;
			}, function (err) {
				alert("查询出错!");
			});
		};

		//第三个li点击事件
		$scope.lastChooseClick = function (l) {
			//l.attributesGroup与上面的serviceGroup一样
			//这个必须在dealData4newServcieType前面执行(下面sel3的赋值)
			//1.步骤
			var commercialName = l.commercialName;
			var serviceSubCode = l.serviceSubCode;
			$scope.data.sel3.showStr = '[' + serviceSubCode + ']' + commercialName;
			$scope.data.sel3.value = serviceSubCode;
			//2.步骤
			var data = $scope.data;
			var orgData = $scope.orgData;
			var chooseItem = l;
			var rootScope = $scope.$parent;
			var operOption = { data: data, orgData: orgData, chooseItem: chooseItem, FormEditStatusServcie: FormEditStatusServcie, rootScope: rootScope };
			(0, _BasicInfoControllerBusi.dealData4NewServiceType)(operOption);
			//填充basicInfo信息end
			//第四步:查询数据为后面显示准备
			var textTableNo163 = l.subCodeTableNo163 || '';
			var oldTextTableNo163 = FormData.sel3.textTableNo163 || '';

			if (oldTextTableNo163 != textTableNo163) {
				//如果上次和这次不相同才需要重新渲染第四列
				textTableNo163 = textTableNo163 * 1;
				var url = FormData.contextPath + "/s7/query4ClickService.action";
				var queryParam = { "subCodeTableNo163": textTableNo163 + "",
					"carrCode": l.carrCode,
					"serviceType": l.serviceType,
					"serviceAndSubCode": l.serviceSubCode };
				var promise = HttpOperService.postDate(url, queryParam, {});
				promise.then(function (retData) {
					$scope.lastGroupList2 = retData.tb163List;
					$scope.data.sel4 = retData.tb163List;
					$scope.data.sequenceNumber = retData.maxSequenceNumber * 1 + 10;
				}, function (err) {
					alert("查询出错!");
				});
			}
		};
	}]);

	// ng-show = "lastGroupList2.length>0"

	//}) ;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function (require, exports, module) {
	var controllers = __webpack_require__(134);
	var jsonDate = __webpack_require__(124);
	var commonUtil = __webpack_require__(123);
	var jsonDataHelper = __webpack_require__(122);
	var _ = __webpack_require__(74);
	var validHelper = __webpack_require__(211);

	var _checkHaseErrorInfo = function _checkHaseErrorInfo(inputEl) {
		if (inputEl.hasClass('error')) {
			return true;
		}
		return false;
	};

	var _delayValidateElement = function _delayValidateElement(inputEl) {
		if (_checkHaseErrorInfo(inputEl)) {
			setTimeout(function () {
				validator.element(inputEl);
			}, 100);
		}
	};

	//页面第二个部分///////费用确定部分////////////////////////////////////////////////////////
	controllers.controller('ChargeConfirmCtrl', ['$scope', 'FormData', 'FormEditStatusServcie', function ($scope, FormData, FormEditStatusServcie) {
		$scope.data = FormData;
		//当选择免费或则收费时触发的事件
		//行李重量单位集合
		$scope.weightUnitList = jsonDate.weightUnitList;
		//SPEC_SERVICE_FEE_COL_SUB//包含/扣除
		$scope.specServiceFeeColSubList = jsonDate.specServiceFeeColSubList;
		//净价/销售价
		$scope.specServiceFeeNetSellList = jsonDate.specServiceFeeNetSellList;
		$scope.baggageTravelApplicationList = jsonDate.baggageTravelApplicationList;

		//当是否收费改变时触发的函数
		$scope.changeNoChargeNotAvailable = function () {
			var editScope = $scope.$parent;
			var data = $scope.data;
			var globalEditStatus = FormEditStatusServcie;
			var noChargeNotAvailable = data.noChargeNotAvailable;
			var serviceType = data.serviceType;
			//1.赋默认值
			//1.1--‘行李适用范围组件’
			if (noChargeNotAvailable == 'D') {
				data.baggageTravelApplication = '';
			}
			//1.2--‘是否可退组件’
			if (noChargeNotAvailable == '') {
				data.indicatorReissueRefund = 'N';
			} else if (_.contains(['X', 'F', 'E'], noChargeNotAvailable)) {
				data.indicatorReissueRefund = '';
			}
			//当为免费的时候清空170的子表复用号
			if (noChargeNotAvailable != '') {
				data.reuseList170VO = '';
				$(":input[name=reuseList170VO]").val('').attr('placeholder', '');
			}
			//当为免费的时候‘里程兑换标识’隐藏
			if (noChargeNotAvailable != '') {
				data.mileageExchangeIndicator = '';
			}
			//2.更新将被影响控件的编辑状态以及显隐
			validHelper.changeNoChargeNotAvailable(editScope, data, globalEditStatus);
		};

		//适用于改变时
		$scope.changeSpecifiedServiceFeeApp = function () {
			var globalEditStatus = FormEditStatusServcie;
			var editScope = $scope.$parent;
			var data = $scope.data;
			var noChargeNotAvailable = data.noChargeNotAvailable || '';
			var ssfa = data.specifiedServiceFeeApp || '';
			//当hcp时 170和201都会被清空、否则不会改变170和201表的状态
			if (ssfa == 'H' || ssfa == 'C' || ssfa == 'P') {
				//则将会隐藏170以及201所以需要将可能存在的子表号清空
				data.reuseList170VO = '';
				$(":input[name=reuseList170VO]").val('').attr('placeholder', '');
				//里程积分兑换标识必须为空
				data.mileageExchangeIndicator = '';
				//里程费为空
				data.specifiedServiceFeeMileage = '';
				//或/和字段为空
				data.specSevFeeAndOrIndicator = '';
			}
			validHelper.changeSpecifiedServiceFeeApp(editScope, data, globalEditStatus);
		};

		//当改变使用时间限制类型的时候
		$scope.changeUseDateLimitTye = function (type) {
			type = type || '';
			var statusDes = $scope.data.statusDes;
			var canEditFlag = commonUtil.getEditFlagByStatus(statusDes);
			if (canEditFlag) {
				var oldType = $scope.data.useDateLimitTye;
				if (oldType == type) return;
				if (type == '') {
					//如果为时间段
					$scope.data.useDateLimitTye = '';
					//将期限数据清空
					$scope.data.effectivePeriodType = '';
					$scope.data.effectivePeriodNumber = '';
					$scope.data.effectivePeriodUnit = '';
				} else if (type == '1') {
					//如果为期限
					$scope.data.useDateLimitTye = '1';
					//将时间段数据清空
					$scope.data.firstUseDate = '';
					$scope.data.lastUseDate = '';
				}
			}
		};

		//-------------区域对应的表格显示隐藏结束--------//
		$scope.changeEffectivePeriodType = function () {
			var input1 = $(':input[name=effectivePeriodNumber]');
			if ($scope.data.effectivePeriodType == '') {
				$scope.data.effectivePeriodNumber = '';
				$scope.data.effectivePeriodUnit = '';
				_delayValidateElement(input1);
			} else {
				$scope.data.effectivePeriodUnit = 'D';
			}
		};

		//table内部选择，全额或折扣
		$scope.clickDiscount2 = function (l) {
			var type = l.discountType;
			if (type == '1') {
				//全额
				l.discountNum = '';
			} else {
				l.onePriceNum = '';
			}
		};
		//金额选择全额或则折扣时
		$scope.clickDiscount = function (dt) {
			//整个编辑状态为3的时候是不能编辑的
			var pageEditFlag = commonUtil.getEditFlagByStatus(FormData['statusDes']);
			if (!pageEditFlag) return;
			//当点击时可以触发展开表格
			$scope.data.discountOrNot = dt;
			if (dt == '1') {
				//全额
				$scope.data.list201VO = [];
			} else {
				//折扣
				//第三列一定要已选中
				$scope.data.list170VO = [];
				//将复用170数据清空
				$scope.data.reuseList170VO = '';
				$(":input[name='reuseList170VO']").val('');
				$scope.data.list201VO = []; //数据初始化
				//1.判断套餐/非套餐
				//2.套餐:显示每一条,非套餐的话总的显示一条
				var serviceGroup = $scope.data.sel1.value; //BD
				if (serviceGroup != null && serviceGroup.length > 2 && serviceGroup.indexOf('BD') === 0) {
					//说明是套餐
					var tmpArr = []; //[1]页面显示的字符串,[2]折扣类型,[3]一口价,[4]一口价单位,[5]折扣数
					for (var i = 0; i < $scope.data.sel4.length; i++) {
						var l = $scope.data.sel4[i];
						var obj = { "subCode": l.subCode, "commercialName": l.commercialName, "discountType": '1', "onePriceNum": '', "discountNum": '' };
						tmpArr.push(obj);
					}
					$scope.data.list201VO = tmpArr;
				} else {
					//说明是非套餐
					$scope.data.list201VO = []; //数据初始化
					//显示str $scope.data.sel3.showStr
					var subCode = $scope.data.sel3.value;
					var index = 2 + subCode.length; //'['+subCode+']'
					var sel3ShowStr = $scope.data.sel3.showStr;
					var commercialName = sel3ShowStr.substring(index);
					//[1]页面显示的字符串,[2]折扣类型,[3]一口价,[4]一口价单位,[5]折扣数
					var obj = { "subCode": subCode, "commercialName": commercialName, "discountType": '1', "onePriceNum": '', "discountNum": '' };
					$scope.data.list201VO = [obj];
				}
				//和/或--里程积分--里程兑换标识
				//当选择折扣时要更新这三个字段都必须为空且不可改变
				$scope.data.specSevFeeAndOrIndicator = "";
				$scope.data.specifiedServiceFeeMileage = "";
				$scope.data.mileageExchangeIndicator = "";
			}
			//更新组件的状态
			validHelper.changeDiscount($scope.$parent, $scope.data, FormEditStatusServcie);
		};

		//当点击‘或/和’时
		$scope.clickSpecSevFeeAndOrIndicator = function (type) {
			if (type == 'A') {
				//当本字段的值为A--1.里程兑换标识必须为空。2.折扣表标识值必须为0
				$scope.data.mileageExchangeIndicator = '';
			}
			validHelper.changeSpecSevFeeAndOrIndicator($scope.$parent, $scope.data, FormEditStatusServcie);
		};
		//当点击‘里程兑换标识’
		$scope.clickMileageExchangeIndicator = function (type) {
			if (type == '1' || type == '2') {
				$scope.data.specifiedServiceFeeMileage = '';
			}
			validHelper.changeMileageExchangeIndicator($scope.$parent, $scope.data, FormEditStatusServcie);
		};
	}]);
	//}) ;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//define(function (require, exports, module) {
	var controllers = __webpack_require__(134);
	var jsonDate = __webpack_require__(124);
	var validHelper = __webpack_require__(211);
	var _checkHaseErrorInfo = function _checkHaseErrorInfo(inputEl) {
		if (inputEl.hasClass('error')) {
			return true;
		}
		return false;
	};
	var _delayValidateElement = function _delayValidateElement(inputEl) {
		if (_checkHaseErrorInfo(inputEl)) {
			setTimeout(function () {
				validator.element(inputEl);
			}, 100);
		}
	};
	//页面第三部分/////////规则详细部分/////////////////////////////////////////////////////////
	controllers.controller('RuleDetailCtrl', ['$scope', 'FormData', 'FormEditStatusServcie', function ($scope, FormData, FormEditStatusServcie) {
		$scope.data = FormData;
		//$scope.NEW_ADD_STR = NEW_ADD_STR ;
		$scope.noCharge_notAvailableList = jsonDate.noCharge_notAvailableList;
		//舱位list集合
		$scope.cabinList = jsonDate.cabinList;
		//区域集合
		$scope.geoLocTypeList = jsonDate.geoLocTypeList;
		//退/改
		$scope.indicatorReissueRefundList = jsonDate.indicatorReissueRefundList;
		//退款形式
		$scope.formOfRefundList = jsonDate.formOfRefundList;
		$scope.geoSpecExceptionStopUnitList = jsonDate.geoSpecExceptionStopUnitList;
		$scope.timeApplicationList = jsonDate.timeApplicationList;

		$scope.getUpGradeTableTile = function () {
			var sel1Value = FormData.sel1.value;
			var tmpStr = "";
			if (sel1Value == "SA" || sel1Value == "BDSA") {
				tmpStr = "座位属性表";
			} else if (sel1Value == "UP" || sel1Value == "BDUP") {
				tmpStr = "升舱属性表";
			}
			return tmpStr;
		};

		var list = ["SA", "BDSA", "UP", "BDUP"];
		$scope.showUpGradeTableFlag = function () {
			var flag = false;
			var index = list.indexOf(FormData.sel1.value);
			if (index != -1) {
				flag = true;
			}
			if (flag) {
				//如果为true，并且serviceType为M，或F时显示
				if ($scope.data.serviceType == 'M' || $scope.data.serviceType == 'F') {
					flag = true;
				} else {
					flag = false;
				}
			}
			return flag;
		};

		var list2 = ['UP', 'BDUP'];
		$scope.showUpGradeServiceFlag = function () {
			//升舱到的服务等级
			var flag = false;
			var index = list2.indexOf(FormData.sel1.value);
			if (index != -1) {
				flag = true;
			}
			if (flag) {
				//如果为true，并且serviceType为M，或F时显示
				if ($scope.data.serviceType == 'M' || $scope.data.serviceType == 'F') {
					flag = true;
				} else {
					flag = false;
				}
			}
			return flag;
		};

		//upGradeTable td input size //如果是座位属性表长度为10，订座属性表长度为3
		$scope.getUpGradeInputSize = function () {
			var sel1Value = FormData.sel1.value;
			var len = 5;
			if (sel1Value == "SA" || sel1Value == "BDSA") {
				len = 10;
			} else if (sel1Value == "UP" || sel1Value == "BDUP") {
				len = 5;
			}
			return len;
		};
		//data.list178Loc1开始
		//区域1 select改变
		$scope.selectChangeGeoSpecLoc1 = function () {
			$scope.data.geoSpecLoc1 = "";
			//var inputElement = $(":input[name='geoSpecLoc1']") ;
			//_delayValidateElement(inputElement) ;
		};
		//区域2 select改变
		$scope.selectChangeGeoSpecLoc2 = function () {
			$scope.data.geoSpecLoc2 = "";
			//var inputElement = $(":input[name='geoSpecLoc2']") ;
			//_delayValidateElement(inputElement) ;
		};
		//区域3 select改变
		$scope.selectChangeGeoSpecLoc3 = function () {
			$scope.data.geoSpecLoc3 = "";
			//var inputElement = $(":input[name='geoSpecLoc3']") ;
			//_delayValidateElement(inputElement) ;
		};

		//当区域、部分、全程select发生变化的时候
		$scope.changeGeoSpecSectPortJourney = function () {
			var editScope = $scope.$parent;
			var data = $scope.data;
			var globalEditStatus = FormEditStatusServcie;
			validHelper.changeGeoSpecSectPortJourney(editScope, data, globalEditStatus);
		};
	}]);
	//}) ;

/***/ },
/* 218 */
/***/ function(module, exports) {

	"use strict";

	//define(function(require, exports, module){ 
	var app = angular.module('app.filter', []);
	//过滤choose1
	app.filter("serviceGroupFilter", function () {
			var myFunc = function myFunc(data, inputStr) {
					inputStr = inputStr || "";
					var retData = [];
					if (inputStr.length > 0) {
							inputStr = inputStr.toLowerCase();
							angular.forEach(data, function (e) {
									if (e.serviceGroupDescription.toLowerCase().indexOf(inputStr) != -1) {
											retData.push(e);
									}
							});
					} else {
							retData = data;
					}
					return retData;
			};
			return myFunc;
	});

	//subGroupDescription
	app.filter("subGroupFilter", function () {
			var myFunc = function myFunc(data, inputStr) {
					inputStr = inputStr || "";
					var retData = [];
					if (inputStr.length > 0) {
							inputStr = inputStr.toLowerCase();
							angular.forEach(data, function (e) {
									if (e.subGroupDescription.toLowerCase().indexOf(inputStr) != -1) {
											retData.push(e);
									}
							});
					} else {
							retData = data;
					}
					return retData;
			};
			return myFunc;
	});
	//lastGroupList
	app.filter("lastGroupFilter", function () {
			var myFunc = function myFunc(data, inputStr) {
					inputStr = inputStr || "";
					var retData = [];
					if (inputStr.length > 0) {
							inputStr = inputStr.toLowerCase();
							angular.forEach(data, function (e) {
									var tmpStr = "[" + e.serviceSubCode + "]" + e.commercialName;
									if (tmpStr.toLowerCase().indexOf(inputStr) != -1) {
											retData.push(e);
									}
							});
					} else {
							retData = data;
					}
					return retData;
			};
			return myFunc;
	});

	//}) ;

/***/ }
/******/ ]);