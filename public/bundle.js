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

	__webpack_require__(1)('./app.js');


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./app.js": 2,
		"./directives/navbar/navTemplate.js": 3,
		"./directives/navbar/navbarCtrl.js": 4,
		"./routes/businessDash/businessDashCtrl.js": 5,
		"./routes/businessProfile/businessProfileCtrl.js": 6,
		"./routes/businessSchedule/businessScheduleCtrl.js": 7,
		"./routes/home/HomeCtrl.js": 8,
		"./routes/search/searchCtrl.js": 9,
		"./routes/user/userCtrl.js": 10,
		"./services/appointmentsService.js": 11,
		"./services/businessService.js": 12,
		"./services/loginService.js": 13
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	}
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'."); }());
	}
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	var openChairApp=angular.module('openChairApp');
	openChairApp.directive('navTemplate', function(){
		return{
			templateUrl:'app/directives/navbar/navTemplate.html'
		};
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	var openChairApp = angular.module('openChairApp');
	openChairApp.controller('navbarCtrl', function(loginService, $scope, $location){

		$scope.submitNewUser=function(user){
			console.log(user);
			loginService.newUserService(user);
		};

		$scope.loginUserSubmit=function(login){

			loginService.loginUserSubmit(login).then(function(res){
			loginService.getUserName().then(function(res){
					if(res){
						$scope.customerName='Welcome, ' + res.data.name;



					}
				});

			},function(err){
					console.log(err);
					if(err.status>300){
						alert('bad data guys!!!!');
					}
				});

		};

		$scope.submitNewBusiness=function(business){
			console.log(business);
			loginService.newBusinessService(business);
		};

		$scope.loginBusinessSubmit=function(login){

			loginService.loginBusinessSubmit(login).then(function(res){
			loginService.getBusinessName().then(function(res){
					if(res){
						$scope.businessName='Welcome, ' + res.data.name;



					}
				});

			},function(err){
					console.log(err);
					if(err.status>300){
						alert('bad data guys!!!!');
					}
				});

		};

	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	angular.module('openChairApp').controller('businessDashCtrl', function($scope) {

	});


/***/ },
/* 6 */
/***/ function(module, exports) {



/***/ },
/* 7 */
/***/ function(module, exports) {



/***/ },
/* 8 */
/***/ function(module, exports) {

	angular.module('openChairApp')

	.controller('homeCtrl', function($scope){


	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	//$scope.disable = [false, 1, 7];
	$scope.today = 'Today';
	$scope.clear = 'Clear';
	$scope.close = 'Close';
	var days = 15;
	//$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
	//$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
	$scope.onStart = function () {
	    console.log('onStart');
	};
	$scope.onRender = function () {
	    console.log('onRender');
	};
	$scope.onOpen = function () {
	    console.log('onOpen');
	};
	$scope.onClose = function () {
	    console.log('onClose');
	};
	$scope.onSet = function () {
	    console.log('onSet');
	};
	$scope.onStop = function () {
	    console.log('onStop');
	};


	});



/***/ },
/* 9 */
/***/ function(module, exports) {

	angular.module('openChairApp')

	.controller('searchCtrl', function($scope, businessService){

	  businessService.getBusinesses().then(function(response) {
	    $scope.businesses = response;
	  });

	});


/***/ },
/* 10 */
/***/ function(module, exports) {

	angular.module('openChairApp')

	.controller('userCtrl', function($scope){


	});


/***/ },
/* 11 */
/***/ function(module, exports) {

	angular.module('openChairApp')

	.service('appointmentsService', function($http) {
	  this.makeAppointment = function(appointment) {
	    return $http({
	      method: 'POST',
	      url: 'http://localhost:7200/appointment',
	      data: appointment
	    }).then(function(response) {
	      return response.data;
	    });
	  };
	  this.getAppointments = function() {
	    return $http({
	      method: 'GET',
	      url: 'http://localhost:7200/appointments'
	    }).then(function(response) {
	      return response.data;
	    });
	  };
	  this.editAppointment = function(id, appointment) {
	    return $http({
	      method: 'PUT',
	      url: 'http://localhost:7200/appointment/' + id,
	      data: appointment
	    }).then(function(response) {
	      return response.data;
	    });
	  };
	  this.deleteAppointment = function(id) {
	    return $http({
	      method: 'DELETE',
	      url: 'http://localhost:7200/appointment/' + id
	    }).then(function(response) {
	      return response.data;
	    });
	  };
	  this.getAppointment = function(id) {
	    return $http({
	      method: 'GET',
	      url: 'http://localhost:7200/appointment/' + id
	    }).then(function(response) {
	      return response.data;
	    });
	  };
	  this.getAppointmentsById = function(id, type) {
	    return $http({
	      method: 'GET',
	      url: 'http://localhost:7200/appointment/' + type + '/' + id
	    }).then(function(response) {
	      return response.data;
	    });
	  };
	});


/***/ },
/* 12 */
/***/ function(module, exports) {

	angular.module('openChairApp').service('businessService', function($http) {

	  this.getBusinesses = function() {
	    return $http({
	      method: 'GET',
	      url: 'http://localhost:7200/businesses'
	    }).then(function(response) {
	      return response.data;
	    });
	  };
	  this.getFilterdBusinesses = function(filters) {
	    return $http({
	      method: 'GET',
	      url: 'http://localhost:7200/businesses/?',
	    }).then(function(response) {
	      return response.data;
	    });
	  };

	  this.getBusiness = function(id) {
	    return $http({
	      method: 'GET',
	      url: 'http://localhost:7200/businesses/' + id
	    }).then(function(response) {
	      return response.data;
	    });
	  };
	  this.addBusiness = function(business) {
	    return $http({
	      method: 'POST',
	      url: 'http://localhost:7200/businesses',
	      data: business
	    }).then(function(response) {
	      return response.data;
	    });
	  };
	  this.editBusiness = function(id, business) {
	    return $http({
	      method: 'PUT',
	      url: 'http://localhost:7200/businesses/' + id,
	      data: business
	    }).then(function(response) {
	      return response.data;
	    });
	  };
	  this.deleteBusiness = function(id) {
	    return $http({
	      method: 'DELETE',
	      url: 'http://localhost:7200/businesses/' + id
	    }).then(function(response) {
	      return response.data;
	    });
	  };

	  // this.editBusinessService = function(id, business) {
	  //   return $http({
	  //     method: 'PUT',
	  //     url: 'http://localhost:7200/businesses/' + id,
	  //     data: business
	  //   }).then(function(response) {
	  //     return response.data;
	  //   });
	  // };
	  // this.editBusinessUsers = function(id, business) {
	  //   return $http({
	  //     method: 'PUT',
	  //     url: 'http://localhost:7200/businesses/' + id,
	  //     data: business
	  //   }).then(function(response) {
	  //     return response.data;
	  //   });
	  // };

	});


/***/ },
/* 13 */
/***/ function(module, exports) {

	angular.module('openChairApp').service('loginService', function($http,$q){

		this.newUserService=function(user){

			$http({
				method:'POST',
				url:'http://localhost:7200/user',
				data:user
			}).then(function(err, res){
				if(err){ return err;}
				else{return res;}
			});
		};

		this.loginUserSubmit=function(user){
			return $http({
				method:"POST",
				url:'http://localhost:7200/login',
				data:user
			}).then(function(res,err){
				return res;
			});
		};
		this.getUserName=function(){
			var deferred=$q.defer();
			$http({
				method:"GET",
				url:'http://localhost:7200/user'
			}).then(function(res){
				var userName=res;
				deferred.resolve(userName);
			},function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		};
		this.newBusinessService=function(business){

			$http({
				method:'POST',
				url:'http://localhost:7200/business',
				data:business
			}).then(function(err, res){
				if(err){ return err;}
				else{return res;}
			});
		};

		this.loginBusinessSubmit=function(business){
			return $http({
				method:"POST",
				url:'http://localhost:7200/loginBusiness',
				data:business
			}).then(function(res,err){
				return res;
			});
		};
		this.getBusinessName=function(){
			var deferred=$q.defer();
			$http({
				method:"GET",
				url:'http://localhost:7200/business'
			}).then(function(res){
				var businessName=res;
				deferred.resolve(businessName);
			},function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		};

	});


/***/ }
/******/ ]);
