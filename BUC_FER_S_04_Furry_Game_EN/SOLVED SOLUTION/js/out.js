/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Coin = __webpack_require__(/*! ./coin */ \"./js/coin.js\");\nvar Furry = __webpack_require__(/*! ./furry */ \"./js/furry.js\");\n\nvar Game = function Game(board, furry, coin) {\n    this.board = board;\n    this.furry = furry;\n    this.coin = coin;\n    this.score = 0;\n    this.pace = 250;\n    var self = this;\n\n    this.index = function (x, y) {\n        return x + y * 10;\n    };\n\n    this.showFurry = function () {\n        self.hideVisibleFurry();\n        if (!self.gameOver()) {\n            this.board[this.index(self.furry.x, self.furry.y)].classList.add('furry');\n        }\n    };\n\n    this.showCoin = function () {\n        this.board[this.index(self.coin.x, self.coin.y)].classList.add('coin');\n    };\n\n    this.startGame = function () {\n        console.log(self.pace);\n        if (this.idSetInterval) {\n            clearInterval(this.idSetInterval);\n        }\n        this.idSetInterval = setInterval(function () {\n            self.moveFurry();\n            self.showFurry();\n        }, self.pace);\n    };\n\n    this.moveFurry = function () {\n        switch (this.furry.direction) {\n            case \"right\":\n                this.furry.x += 1;\n                break;\n            case \"left\":\n                this.furry.x -= 1;\n                break;\n            case \"up\":\n                this.furry.y -= 1;\n                break;\n            case \"down\":\n                this.furry.y += 1;\n                break;\n        }\n        self.checkCoinCollision();\n    };\n\n    this.hideVisibleFurry = function () {\n        var previousFurry = document.querySelector('.furry');\n        if (previousFurry) {\n            previousFurry.classList.remove(\"furry\");\n        }\n    };\n\n    this.changeDirectionFurry = function (event) {\n        switch (event.which) {\n            case 37:\n                this.furry.direction = \"left\";\n                break;\n            case 38:\n                this.furry.direction = \"up\";\n                break;\n            case 39:\n                this.furry.direction = \"right\";\n                break;\n            case 40:\n                this.furry.direction = \"down\";\n                break;\n        }\n    };\n\n    this.checkCoinCollision = function () {\n        if (self.furry.x === self.coin.x && self.furry.y === self.coin.y) {\n            document.querySelector('.coin').classList.remove('coin');\n            self.score += 1;\n            document.querySelector('#score strong').innerText = self.score;\n            if (self.pace > 50 && self.score % 5 === 0) {\n                self.startGame(self.pace -= 50);\n            }\n            self.coin = new Coin();\n            self.showCoin();\n        }\n    };\n\n    this.gameOver = function () {\n        if (self.furry.x < 0 || self.furry.x > 9 || self.furry.y < 0 || self.furry.y > 9) {\n            self.hideVisibleFurry();\n            clearTimeout(self.idSetInterval);\n            alert(\"Your score is: \" + self.score);\n            return true;\n        }\n        return false;\n    };\n};\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    var board = this.querySelectorAll('#board div');\n    var _Game = new Game(board, new Furry(0, 0, 'right'), new Coin());\n    _Game.showFurry();\n    _Game.showCoin();\n    _Game.startGame();\n    this.addEventListener(\"keydown\", function (event) {\n        _Game.changeDirectionFurry(event);\n    });\n});\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

/***/ "./js/coin.js":
/*!********************!*\
  !*** ./js/coin.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Coin = function Coin() {\n    this.x = Math.floor(Math.random() * 10);\n    this.y = Math.floor(Math.random() * 10);\n};\n\nmodule.exports = Coin;\n\n//# sourceURL=webpack:///./js/coin.js?");

/***/ }),

/***/ "./js/furry.js":
/*!*********************!*\
  !*** ./js/furry.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Furry = function Furry(x, y, direction) {\n    this.x = x;\n    this.y = y;\n    this.direction = direction;\n};\n\nmodule.exports = Furry;\n\n//# sourceURL=webpack:///./js/furry.js?");

/***/ })

/******/ });