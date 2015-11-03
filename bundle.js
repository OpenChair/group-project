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
/***/ function(module, exports) {

	angular.module('openChairApp', ['ui.router', 'ui.materialize'])

	.config(function($stateProvider, $urlRouterProvider) {

	  $urlRouterProvider.otherwise('/home');

	  $stateProvider
	  .state('home', {
	    url: '/home',
	    templateUrl: 'app/routes/home/HomeTmpl.html',
	    controller: 'homeCtrl'
	    // resolve: {
	    //   businesses: function (businessService) {
	    //     return businessService.getBusinesses();
	    //   }
	    // }
	  })
	  .state('search', {
	    url: '/search',
	    templateUrl: 'app/routes/search/searchTmpl.html',
	    controller: 'searchCtrl'
	    // resolve: {
	    //   businesses: function (businessService) {
	    //     return businessService.getBusinesses();
	    //   }
	    // }
	  })
	  .state('businessProfile', {
	    url: '/search/:id',
	    templateUrl: 'app/routes/businessProfile/businessProfileTmpl.html',
	    controller: 'businessProfileCtrl'
	    // resolve: {
	    //   business: function (businessService, $route) {
	    //     return businessService.getBusiness($route.current.params.id);
	    //   },
	    //   reviews: function (apiService) {
	    //     return apiService.getReview();
	    //   },
	    //   appointments: function (appointmentsService, $route) {
	    //     return appointmentsService.getAppointments($route.current.params.id);
	    //   }
	    // }
	  })
	  .state('userProfile', {
	      url: '/user/:id',
	      templateUrl: 'app/routes/user/userTmpl.html',
	      controller: 'userCtrl'
	      // resolve: {
	      //   user: function (userService, $route) {
	      //     return userService.getUser($route.current.params.id);
	      //   },
	      //   appointments: function (appointmentsService, $route) {
	      //     return appointmentsService.getAppointments($route.current.params.id);
	      //   }
	      // }
	    })
	    .state('businessSchedule', {
	      url: '/business/:id',
	      templateUrl: 'app/routes/businessSchedule/businessScheduleTmpl.html',
	      controller: 'businessScheduleCtrl'
	      // resolve: {
	      //   business: function (businessService, $route) {
	      //     return businessService.getBusiness($route.current.params.id);
	      //   },
	      //   appointments: function (appointmentsService, $route) {
	      //     return appointmentsService.getAppointments($route.current.params.id);
	      //   }
	      // }
	    })
	  .state('businessDash',{
	    url:'/businessdash',
	    templateUrl: 'app/routes/businessDash/businessDashTmpl.html',
	    controller: 'businessDashCtrl'
	    // resolve: {
	    //   business: function (businessService, $route) {
	    //     return businessService.getBusiness($route.current.params.id);
	    //   },
	    //   appointments: function (appointmentsService, $route) {
	    //     return appointmentsService.getAppointments($route.current.params.id);
	    //   }
	    // }
	  });
	});


/***/ }
/******/ ]);