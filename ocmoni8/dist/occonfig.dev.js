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
	var main = __webpack_require__(100);
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

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(60);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	//require('jq_autocomplete_lib') ;
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(101);
	//require('ng_imgcrop_lib') ;
	__webpack_require__(103);
	__webpack_require__(104);
	__webpack_require__(105);
	__webpack_require__(106);
	var app = angular.module('app', ['pasvaz.bindonce', 'ngMessages', 'app.service', 'app.directive', 'app.controller']);
	module.exports = {
		init: function init() {
			angular.element(document).ready(function () {
				angular.bootstrap(document, ['app']);
			});
		}
	};

/***/ },

/***/ 101:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(102);

/***/ },

/***/ 102:
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

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(74);
	var util = __webpack_require__(70);
	var app = angular.module("app.directive", []);

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
	app.directive('subCodeRemoteValidate', ['HttpOperService', function (HttpOperService) {
	    return {
	        restrict: "A",
	        scope: true,
	        require: "?ngModel",
	        link: function link(scope, ele, attrs, ctrl) {
	            if (!ctrl) return;
	            ctrl.$parsers.push(function (viewValue) {
	                if (viewValue != '' && viewValue.length == 3) {
	                    var url = scope.data.contextPath + "/occonfig/checkSubCodeExist.action";
	                    var param = { "carrCode": scope.data.carrCode, "serviceType": scope.data.serviceType, "subCode": viewValue };
	                    var promise = HttpOperService.post4JSONData(url, param);
	                    promise.then(function (retData) {
	                        if (retData.flag == 'true') {
	                            if (retData.existFlag == 'true') {
	                                ctrl.$setValidity('subCodeRemoteValidate', true);
	                            } else {
	                                ctrl.$setValidity('subCodeRemoteValidate', false);
	                            }
	                        } else {
	                            ctrl.$setValidity('subCodeRemoteValidate', false);
	                        }
	                    });
	                }
	                ctrl.$setValidity('subCodeRemoteValidate', true);
	                return viewValue;
	            });
	        }
	    };
	}]);

/***/ },

/***/ 104:
/***/ function(module, exports) {

	'use strict';

	var app = angular.module('app.service', []);
	app.factory('FormData', function () {
		return {
			"carrCode": "",
			"sel1": { "showStr": "", "value": "" },
			"sel2": { "showStr": "", "value": "" },
			"sel3": { "showStr": "", "value": "", "textTableNo163": "", "serviceGroup": "", "serviceType": "" },
			"sel4": [],
			"serviceType": "F"
		};
	});

/***/ },

/***/ 105:
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

/***/ 106:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var app = angular.module('app.controller', []);
	var _ = __webpack_require__(74);
	var util = __webpack_require__(70);
	var growlConfig = { info: { type: 'info', offset: { from: 'top', amount: 110 } },
		danger: { type: 'danger', offset: { from: 'top', amount: 110 } },
		success: { type: 'success', offset: { from: 'top', amount: 110 } } };

	app.controller('EditController', ['$scope', 'FormData', 'HttpOperService', function ($scope, FormData, HttpOperService) {
		$scope.data = FormData;
		var carrCode = $("#carrCode").val();
		var contextPath = $("#contextPath").val();
		FormData.carrCode = carrCode;
		FormData.contextPath = contextPath;
		$scope.serviceGroupList = [];
		//$scope.subGroupList = [];
		$scope.serviceDetailList = []; //当修改时需要改变checkFlag
		$scope.initServiceDetailList = []; //保存初始数据
		$scope.data.action = "";
		$scope.data.oldSubCode = ""; //更新时带过来的原来的subcode
		//$scope.myImage="";
		//$scope.myCroppedImage="";
		$scope.hrefTitle = "自定义";
		$scope.showHideTableFlag = false;
		$scope.checkIsTrue = function (obj) {
			if (obj != null && (obj == true || obj == 'true')) {
				return true;
			}
			return false;
		};

		/*$scope.changeGroupSelect = function(){
	 	//alert(item);
	 //		alert($scope.data.group.serviceGroupDescription)
	 	//alert($scope.serviceGroupListInfo[item])
	 	//data.groupDesc = item.serviceGroupDescription;
	 	angular.forEach($scope.serviceGroupListInfo,function(l){
	 		if(l.serviceGroup==$scope.data.group){
	 			$scope.data.groupDesc = l.serviceGroupDescription;
	 			alert(l.serviceGroupDescription);
	 		}
	 	}) ;
	 }*/

		//$scope.groupTableShowStatus=;
		//	$scope.subGroupTable = {"showStatus":"false"};
		var url = $scope.data.contextPath + "/occonfig/initConfigUI.action";
		var promise = HttpOperService.post4JSONData(url, $scope.data, { "carrCode": carrCode });
		promise.then(function (retData) {

			//$scope.serviceGroupListInfo = retData.serviceGroupList;
			$scope.serviceGroupList = retData.serviceGroupList;
			//$scope.subGroupListInfo = retData.subGroupList;
			$scope.serviceDetailList = retData.serviceDetailList;
			$scope.initServiceDetailList = retData.serviceDetailList;
		}, function (err) {});

		$scope.serviceTypeList = [{ "name": "运价相关服务", "value": "F" }, { "name": "商品相关服务", "value": "M" }, { "name": "规则相关服务", "value": "R" }, { "name": "客票相关服务", "value": "T" }, { "name": "逾重行李服务", "value": "C" }, { "name": "预付费行李服务", "value": "P" }];

		$scope.rficList = [{ "name": "航空运输", "value": "A" }, { "name": "地面交通/非航空服务", "value": "B" }, { "name": "行李", "value": "C" }, { "name": "财务保障", "value": "D" }, { "name": "机场服务", "value": "E" }, { "name": "商品", "value": "F" }, { "name": "机上服务", "value": "G" }, { "name": "其他", "value": "I" }];

		$scope.subCodeOccurenceList = [{ "value": "1" }, { "value": "2" }, { "value": "3" }, { "value": "4" }, { "value": "5" }, { "value": "6" }, { "value": "7" }, { "value": "8" }, { "value": "9" }];
		//choose第一个框中li点击事件
		$scope.subGroupQuery = function (showStr, serviceGroup) {
			var contextPath = $scope.data.contextPath;
			FormData.sel1.showStr = showStr;
			//serviceGroup = serviceGroup.split(",#,")[0];
			FormData.sel1.value = serviceGroup;
			//把第二个选项框以前保留的信息清空
			FormData.sel2.showStr = "";
			FormData.sel2.value = "";
			//把第三个选项框以前保留的信息清空
			FormData.sel3.showStr = "";
			FormData.sel3.value = "";
			FormData.sel3.serviceGroup = "";
			FormData.sel3.textTableNo163 = "";
			$scope.lastGroupList = [];
			$scope.lastGroupList2 = [];
			//清空formData信息
			//FormData.serviceAndSubCode = "" ;
			FormData.serviceType = "F"; //DEFAULT_SERVICETYPE
			//FormData.noChargeNotAvailable = "" ;//设置为默认
			var url = contextPath + "/s5/queryS5ByGroup.action";
			var carrier = $scope.data.carrCode;
			var jqeryData = {}; //post方式提交
			var jueryParam = { carrCode: carrier, serviceGroup: serviceGroup }; //地址问号形式
			var promise = HttpOperService.post4JSONData(url, jqeryData, jueryParam);
			promise.then(function (retData) {
				$scope.subGroupList = retData.subGroupList;
				//$scope.lastGroupList = retData.s5List;
			}, function (err) {
				alert("查询出错!");
			});
			//$scope.data.basicInfoVo.serviceGroup= "";
			//$scope.data.basicInfoVo.subGroup= "" ;
			//$scope.data.basicInfoVo.subCode= "" ;
			$scope.data.sel4 = [];
		};

		//第二个li点击事件
		$scope.s5Query = function (showStr, subGroup) {
			var contextPath = $scope.data.contextPath;
			FormData.sel2.showStr = showStr;
			FormData.sel2.value = subGroup;
			//清空第三个选项框
			FormData.sel3.showStr = "";
			FormData.sel3.value = "";
			FormData.sel3.serviceGroup = "";
			FormData.sel3.textTableNo163 = "";
			$scope.lastGroupList = [];
			FormData.serviceAndSubCode = "";
			FormData.serviceType = "F"; //DEFAULT_SERVICETYPE
			$scope.lastGroupList2 = [];

			//FormData.noChargeNotAvailable = "" ;//设置为默认
			var url = contextPath + "/s5/queryS5BySubGroup.action";
			var carrier = $scope.data.carrCode;
			var serviceGroup = FormData.sel1.value;
			var jqeryData = {}; //post方式提交
			var jueryParam = { carrier: carrier, serviceGroup: serviceGroup, subGroup: subGroup }; //地址问号形式
			var promise = HttpOperService.post4JSONData(url, jqeryData, jueryParam);
			promise.then(function (retData) {
				$scope.lastGroupList = retData;
			}, function (err) {
				alert("查询出错!");
			});
			//$scope.data.basicInfoVo.serviceGroup= "" ;
			//$scope.data.basicInfoVo.subGroup= "" ;
			//$scope.data.basicInfoVo.subCode= "" ;
			$scope.data.sel4 = [];
		};

		//第三个li点击事件
		$scope.lastChooseClick = function (l) {
			//l.attributesGroup与上面的serviceGroup一样
			var serviceGroup = l.attributesGroup;
			var serviceType = l.serviceType;
			var pageNeedNewRunderFlag = true;
			//下面的这段暂时注释掉，以后可能需要根据点击要判断当前页面是否需要重置数据
			//点击本次li前的数据
			//var oldServiceGroup = $scope.data.sel3.serviceGroup ;
			//var oldServiceType = FormData.serviceType ;
			/*if(oldServiceGroup==serviceGroup){//表示之前点击过第三个li并且一直保持在第三个li上面
	  	if(oldServiceType==serviceType){//表示serviceGroup和serviceType都没有变，则页面不需要重新渲染
	  		pageNeedNewRunderFlag = false;
	  	}
	  }*/

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
				var promise = HttpOperService.post4JSONData(url, queryParam, {});
				promise.then(function (retData) {
					$scope.lastGroupList2 = retData.tb163List;
					$scope.data.sel4 = retData.tb163List;
					//$scope.data.sequenceNumber = retData.maxSequenceNumber*1+10 ;
				}, function (err) {
					alert("查询出错!");
				});
			}
		};

		//显示模态框
		$scope.showModal = function () {
			initData();
			$scope.data.action = "add";
			$('#subCodeModal').modal('show');
		};

		//保存
		$scope.submitPage = function () {
			var serverURL = contextPath + "/occonfig/insertData.action";
			if (showServiceList()) {
				$scope.data.serviceDetailList = $scope.serviceDetailList;
			} else {
				$scope.data.serviceDetailList = $scope.initServiceDetailList;
			}

			$.showTuiConfirmDialog('保存?', function () {
				var ngFlag = validate();
				console.info("ngFlag:" + ngFlag);
				if (ngFlag) {
					var promise = HttpOperService.post4JSONData(serverURL, $scope.data);
					promise.then(function (retData) {
						if (retData.flag == true || retData.flag == 'true') {
							console.info("保存成功");
							$.bootstrapGrowl("保存成功，即将返回查询页面!", growlConfig.success);
							setTimeout(function () {
								$('#subCodeModal').modal('hide');
								window.location.href = contextPath + '/occonfig/toConfigUI.action';
							}, 1500);
						} else {
							console.info("保存出错");
							if (retData.errMsg != undefined && retData.errMsg != "") {
								$.bootstrapGrowl(retData.errMsg, growlConfig.danger);
							} else {
								$.bootstrapGrowl('保存出错', growlConfig.danger);
							}
						}
					}, function (err) {
						$.bootstrapGrowl('网络异常', growlConfig.danger);
						console.info("网络异常：" + err);
					});
				} else {
					console.info("校验未通过");
					$.bootstrapGrowl('校验未通过，请检查填写信息', growlConfig.danger);
				}
			});
		};

		//套餐服务详细列表
		$scope.showServiceDetail = function () {
			return showServiceList();
		};

		var showServiceList = function showServiceList() {
			var selfGroupStr = $scope.data.selfGroupCode;
			var basicInfo = $scope.data.basicInfoBySubCode;
			var groupStr = "";
			var subCode = $scope.data.subCode;
			var subCodeTableNo163 = $scope.data.subCodeTableNo163;
			if (basicInfo != undefined) {
				groupStr = basicInfo.serviceGroup;
			}
			if (groupStr != undefined && groupStr.match("^BD|^bd") || selfGroupStr != undefined && selfGroupStr.match("^BD|^bd") || subCodeTableNo163 != undefined && subCodeTableNo163 != "" && subCodeTableNo163 != "0" && subCode != undefined && subCode != "" && subCode == $scope.data.oldSubCode) {
				return true;
			}
			return false;
		};
		//点击编辑图标动作
		$scope.editS5 = function (l) {
			initData();
			$scope.data.records5Id = l.id;
			$scope.data.subCode = l.serviceSubCode;
			$scope.data.serviceType = l.serviceType;
			$scope.data.subCodeTableNo163 = l.subCodeTableNo163;
			$scope.data.carrCode = carrCode;

			$scope.data.basicInfoBySubCode.serviceGroupDescription = l.serviceGroupDescription;
			$scope.data.basicInfoBySubCode.subGroupDescription = l.subGroupDescription;
			$scope.data.basicInfoBySubCode.commercialName = l.commercialName;
			$scope.showDescFlag = true;
			$scope.data.oldSubCode = l.serviceSubCode;
			$scope.data.action = "update";
			var serverURL = contextPath + "/occonfig/prepareUpdate.action";
			var promise = HttpOperService.post4JSONData(serverURL, $scope.data);
			promise.then(function (retData) {
				if (retData.flag == true || retData.flag == 'true') {
					if (retData.resultVo.serviceDetailList != undefined && retData.resultVo.serviceDetailList != null) {
						$scope.serviceDetailList = retData.resultVo.serviceDetailList;
					}
					$('#subCodeModal').modal('show');
				} else {
					if (retData.errorMsg != undefined && retData.errorMsg != "") {
						console.info(retData.errorMsg);
						$.bootstrapGrowl(retData.errorMsg, growlConfig.info);
					} else {
						$.bootstrapGrowl("获取信息出错！", growlConfig.danger);
						console.info("获取信息出错！");
					}
				}
			}, function (err) {
				$.bootstrapGrowl("网络异常！", growlConfig.danger);
				console.info("网络异常：" + err);
			});
		};
		//删除操作
		$scope.deleteS5 = function (l) {
			$.showTuiConfirmDialog('删除?', function () {
				var serverURL = contextPath + "/occonfig/deleteConfig.action";
				var promise = HttpOperService.post4JSONData(serverURL, l);
				promise.then(function (retData) {
					if (retData.flag == true || retData.flag == 'true') {
						//console.info("删除成功");
						$.bootstrapGrowl("删除成功", growlConfig.success);
						setTimeout(function () {
							window.location.href = contextPath + '/occonfig/toConfigUI.action';
						}, 1500);
					} else {
						//console.info("删除失败");
						if (retData.errorMsg != undefined && "" != retData.errorMsg) {
							$.bootstrapGrowl(retData.errorMsg, growlConfig.danger);
						} else {
							$.bootstrapGrowl("删除失败", growlConfig.danger);
						}
					}
				}, function (err) {
					console.info("网络异常：" + err);
					$.bootstrapGrowl("网络异常", growlConfig.danger);
				});
			});
		};

		//页面SUBCODE校验
		$scope.checkSubCode = function () {
			validateSubCode();
			var subCode = $scope.data.subCode;
			if (subCode != undefined && subCode != $scope.data.oldSubCode && subCode.length == 3) {
				var serverURL = contextPath + "/occonfig/queryInfoBySubCode.action";
				var promise = HttpOperService.post4JSONData(serverURL, $scope.data); //,{"carrCode":carrCode}
				promise.then(function (retData) {
					if (retData.flag == true || retData.flag == 'true') {
						$scope.data.basicInfoBySubCode = retData.basicInfo;
						$scope.data.errMsgBySubCode = "";
						$scope.showDescFlag = true;
					} else {
						$scope.data.errMsgBySubCode = retData.errMsg;
						$scope.showDescFlag = false;
						console.info(retData.errMsg);
					}
				}, function (err) {
					$scope.showDescFlag = false;
					console.info("网络异常：" + err);
				});
			}
		};
		//页面自定义SUBCODE校验
		$scope.checkSelfSubCode = function () {
			validateSelfSubCode();

			var selfSubCode = $scope.data.selfSubCode;
			if (selfSubCode != undefined && selfSubCode.length == 3 && $scope.data.errMsgSelfSubCode == "") {
				var serverURL = contextPath + "/occonfig/checkSubCodeExist.action";
				var param = { "carrCode": $scope.data.carrCode, "serviceType": $scope.data.serviceType, "selfSubCode": selfSubCode };
				var promise = HttpOperService.post4JSONData(serverURL, param);
				promise.then(function (retData) {
					if (retData.flag == 'true') {
						if (retData.existFlag != 'true') {
							$scope.data.errMsgSelfSubCode = "SUBCODE已存在，请更改输入。";
						} else {
							$scope.data.errMsgSelfSubCode = "";
						}
					} else {
						$scope.data.errMsgSelfSubCode = "SUBCODE校验失败。";
					}
				});
			}
		};
		//页面自定义GROUP校验
		$scope.checkSelfGroupCode = function () {
			validateSelfGroupCode();
		};
		//页面自定义GROUP描述检验
		$scope.checkSelfGroupDesc = function () {
			validateSelfGroupDesc();
		};
		//页面自定义SUBGROUP校验
		$scope.checkSelfSubGroupCode = function () {
			validateSelfSubGroupCode();
		};
		//页面自定义SUBGROUP描述校验
		$scope.checkSelfSubGroupDesc = function () {
			validateSelfSubGroupDesc();
		};

		//页面商业名称校验
		$scope.checkCommercialName = function () {
			validateCommercialName();
		};
		//页面RFIC校验
		$scope.checkRfic = function () {
			validateRfic();
		};

		//显示隐藏表格
		$scope.showHideTable = function () {
			var showTbBtnTip = "自定义";
			var hideTbBtnTip = "取消自定义";
			$scope.data.errMsgBySubCode = "";
			$scope.showHideTableFlag = !$scope.showHideTableFlag;
			if ($scope.showHideTableFlag) {
				$scope.hrefTitle = hideTbBtnTip;
				$scope.showDescFlag = false;
				$scope.data.subCode = "";
			} else {
				$scope.hrefTitle = showTbBtnTip;
				$scope.data.selfSubCode = "";
				$scope.data.selfGroupCode = "";
				$scope.data.selfGroupDesc = "";
				$scope.data.selfSubGroupCode = "";
				$scope.data.selfSubGroupDesc = "";
			}
			initErrMsg();
		};
		//服务类型改变事件
		$scope.serviceTypeChange = function () {
			if (!$scope.showHideTableFlag) {
				validateSubCode();
				var subCode = $scope.data.subCode;
				if (subCode != undefined && subCode.length == 3) {
					var serverURL = contextPath + "/occonfig/queryInfoBySubCode.action";
					var promise = HttpOperService.post4JSONData(serverURL, $scope.data); //,{"carrCode":carrCode}
					promise.then(function (retData) {
						if (retData.flag == true || retData.flag == 'true') {
							$scope.data.basicInfoBySubCode = retData.basicInfo;
							$scope.data.errMsgBySubCode = "";
							$scope.showDescFlag = true;
						} else {
							$scope.data.errMsgBySubCode = retData.errMsg;
							$scope.showDescFlag = false;
							console.info(retData.errMsg);
						}
					}, function (err) {
						$scope.showDescFlag = false;
						console.info("网络异常：" + err);
					});
				}
			}
		};

		var validate = function validate() {

			if ($scope.showHideTableFlag) {
				validateSelfSubCode();
				validateSelfGroupCode();
				validateSelfGroupDesc();
				validateSelfSubGroupCode();
				validateCommercialName();
				validateRfic();
				if ($scope.data.errMsgSelfSubCode == "" && $scope.data.errMsgSelfGroupCode == "" && $scope.data.errMsgSelfGroupDesc == "" && $scope.data.errMsgSelfSubGroupCode == "" && $scope.data.errMsgCommercialName == "" && $scope.data.errMsgRfic == "") {
					return true;
				} else {
					return false;
				}
			} else {
				validateSubCode();
				if ($scope.data.errMsgBySubCode == undefined || $scope.data.errMsgBySubCode == "") {
					return true;
				} else {
					return false;
				}
			}
		};
		var validateSubCode = function validateSubCode() {
			var subCode = $scope.data.subCode;
			var err = "";
			if (subCode != undefined && subCode != "") {
				if (!util.isThreecode2(subCode)) {
					err = "请输入正确的SUBCODE。";
					$scope.showDescFlag = false;
				}
			} else {
				err = "必填字段。";
				$scope.showDescFlag = false;
			}
			$scope.data.errMsgBySubCode = err;
		};
		var validateSelfSubCode = function validateSelfSubCode() {
			var selfSubCode = $scope.data.selfSubCode;
			var errMsg = "";
			if (selfSubCode != undefined && selfSubCode != "") {
				if (!util.isThreecode2(selfSubCode)) {
					errMsg = "请输入正确的SUBCODE。";
				}
			} else {
				errMsg = "必填字段。";
			}

			$scope.data.errMsgSelfSubCode = errMsg;
		};
		var validateSelfGroupCode = function validateSelfGroupCode() {
			var selfGroupCode = $scope.data.selfGroupCode;
			var errMsg = "";
			if (selfGroupCode != undefined && selfGroupCode != "") {
				if (!util.islettersOrNumber(selfGroupCode)) {
					errMsg = "请输入正确的GROUP。";
				}
			} else {
				errMsg = "必填字段。";
			}
			$scope.data.errMsgSelfGroupCode = errMsg;
		};
		var validateSelfGroupDesc = function validateSelfGroupDesc() {
			var selfGroupDesc = $scope.data.selfGroupDesc;
			var errMsg = "";
			if (selfGroupDesc == undefined || selfGroupDesc == "") {
				errMsg = "必填字段。";
			} else {
				if (!islettersOrNumberOrChar(selfGroupDesc)) {
					errMsg = "请输入正确的描述。";
				}
			}
			$scope.data.errMsgSelfGroupDesc = errMsg;
		};
		var validateSelfSubGroupCode = function validateSelfSubGroupCode() {
			var selfSubGroupCode = $scope.data.selfSubGroupCode;
			var errMsg = "";
			if (selfSubGroupCode != undefined && selfSubGroupCode != "") {
				if (!util.islettersOrNumber(selfSubGroupCode)) {
					errMsg = "请输入正确的SUBGROUP。";
				}
			}
			$scope.data.errMsgSelfSubGroupCode = errMsg;
		};
		var validateSelfSubGroupDesc = function validateSelfSubGroupDesc() {
			var selfSubGroupDesc = $scope.data.selfSubGroupDesc;
			var errMsg = "";
			if (selfSubGroupDesc != undefined && selfSubGroupDesc != "") {
				if (!islettersOrNumberOrChar(selfSubGroupDesc)) {
					errMsg = "请输入正确的描述。";
				}
			}
			$scope.data.errMsgSelfSubGroupDesc = errMsg;
		};

		var validateCommercialName = function validateCommercialName() {
			var commercialName = $scope.data.commercialName;
			var errMsg = "";
			if (commercialName != undefined && commercialName != "") {
				if (!islettersOrNumberOrChar(commercialName)) {
					errMsg = "请输入正确的CommercialName。";
				}
			}
			$scope.data.errMsgCommercialName = errMsg;
		};
		var validateRfic = function validateRfic() {
			var rfic = $scope.data.rfic;
			var errMsg = "";
			if (rfic == undefined || rfic == "") {
				errMsg = "请选择RFIC。";
			}
			$scope.data.errMsgRfic = errMsg;
		};
		var initErrMsg = function initErrMsg() {
			$scope.data.errMsgBySubCode = "";
			$scope.data.errMsgSelfSubCode = "";
			$scope.data.errMsgSelfGroupCode = "";
			$scope.data.errMsgSelfGroupDesc = "";
			$scope.data.errMsgSelfSubGroupCode = "";
			$scope.data.errMsgCommercialName = "";
			$scope.data.errMsgRfic = "";
		};
		var initData = function initData() {
			$scope.serviceDetailList = $scope.initServiceDetailList;
			$scope.data.action = "";
			$scope.data.records5Id = "";
			$scope.data.subCode = "";
			$scope.showHideTableFlag = false;
			$scope.showDescFlag = false;
			$scope.hrefTitle = "自定义";
			$scope.data.selfSubCode = "";
			$scope.data.selfGroupCode = "";
			$scope.data.selfGroupDesc = "";
			$scope.data.selfSubGroupCode = "";
			$scope.data.selfSubGroupDesc = "";
			$scope.data.commercialName = "";
			$scope.data.serviceType = "F";
			$scope.data.rfic = "";
			$scope.data.subCodeTableNo163 = "";
			$scope.data.errMsgBySubCode = "";
			$scope.data.basicInfoBySubCode = "";
			$scope.data.oldSubCode = "";
			$scope.data.basicInfoBySubCode = [];
			initErrMsg();
		};
		var islettersOrNumberOrChar = function islettersOrNumberOrChar(value) {
			return (/^[\w\s,\.;:]{0,}$/i.test(value)
			);
		};
	}]);

/***/ }

/******/ });