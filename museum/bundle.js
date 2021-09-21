/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_ProgressBar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/ProgressBar.js */ \"./src/js/ProgressBar.js\");\n/* harmony import */ var _js_ProgressBar_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_ProgressBar_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_TicketCalc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/TicketCalc.js */ \"./src/js/TicketCalc.js\");\n/* harmony import */ var _js_TicketCalc_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_TicketCalc_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_TitleAnimation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/TitleAnimation.js */ \"./src/js/TitleAnimation.js\");\n/* harmony import */ var _js_TitleAnimation_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_TitleAnimation_js__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://empty_project/./src/index.js?");

/***/ }),

/***/ "./src/js/ProgressBar.js":
/*!*******************************!*\
  !*** ./src/js/ProgressBar.js ***!
  \*******************************/
/***/ (() => {

eval("const progress = document.querySelector('.video-wrapper__tool-bar');\r\n progress.addEventListener('input', inputProgressBar);\r\n\r\nfunction inputProgressBar(event) {\r\n  const value = event.target.value;\r\n  event.target.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`\r\n };\r\n\n\n//# sourceURL=webpack://empty_project/./src/js/ProgressBar.js?");

/***/ }),

/***/ "./src/js/TicketCalc.js":
/*!******************************!*\
  !*** ./src/js/TicketCalc.js ***!
  \******************************/
/***/ (() => {

eval("const buyTickets = document.querySelector('.buy-ticket');\r\nconst permanentExh = document.getElementById('permanent-exhibition');\r\nconst temporaryExh = document.getElementById('temporary-exhibition');\r\nconst combinedExh = document.getElementById('combined-admission');\r\nconst basicAmount = document.getElementById('ticket-form__amount-number_basic');\r\nconst seniorAmount = document.getElementById('ticket-form__amount-number_senior');\r\nconst calculation = document.getElementById('ticket-form__calculation');\r\nlet ticketCost = permanentExh.value;\r\n\r\nbuyTickets.addEventListener('click', function(event) {\r\n  if (permanentExh.checked) {ticketCost = permanentExh.value};\r\n  if (temporaryExh.checked) {ticketCost = temporaryExh.value};\r\n  if (combinedExh.checked)  {ticketCost = combinedExh.value};\r\n  calculation.value = ticketCost * 1.2 * +basicAmount.value + ticketCost * +seniorAmount.value;\r\n  if (calculation.value >= 1000 ) {calculation.style.width = '90px'}\r\n  else {calculation.style.width = '70px'}\r\n  })\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://empty_project/./src/js/TicketCalc.js?");

/***/ }),

/***/ "./src/js/TitleAnimation.js":
/*!**********************************!*\
  !*** ./src/js/TitleAnimation.js ***!
  \**********************************/
/***/ (() => {

eval("const observer = new IntersectionObserver(entries => {\r\n  entries.forEach(entry => {\r\n     if (entry.isIntersecting) {\r\n      entry.target.classList.add('section_visible');\r\n     }\r\n   });\r\n });\r\n observer.observe(document.querySelector('.title'));\r\n observer.observe(document.querySelector('.virtual-tour .title'));\r\n observer.observe(document.querySelector('.video-journey .title'));\r\n observer.observe(document.querySelector('.picture-explore .title'));\r\n observer.observe(document.querySelector('.buy-ticket .title'));\r\n observer.observe(document.querySelector('.contacts .title'));\r\n\n\n//# sourceURL=webpack://empty_project/./src/js/TitleAnimation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;