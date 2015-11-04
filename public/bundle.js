angular.module('openChairApp', ['ui.router', 'ui.materialize'])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

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
    url: '/search/:businessID',
    templateUrl: 'app/routes/businessProfile/businessProfileTmpl.html',
    controller: 'businessProfileCtrl',
    resolve: {
      business: ["businessService", "$stateParams", function (businessService, $stateParams) {
        return businessService.getBusiness($stateParams.businessID).then(function (res) {
          return res.data;
        });
      }]
      // reviews: function (apiService) {
      //   return apiService.getReview();
      // },
      // appointments: function (appointmentsService, $route) {
      //   return appointmentsService.getAppointments($route.current.params.id);
      // }
    }
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
}]);

angular.module('openChairApp')

.service('appointmentsService', ["$http", function($http) {
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
}]);

angular.module('openChairApp').service('businessService', ["$http", function($http) {

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

}]);

angular.module('openChairApp').service('loginService', ["$http", "$q", function($http, $q){

	this.newUserService=function(user){
		return $http({
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

		return $http({
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

}]);

angular.module('openChairApp')

.controller('homeCtrl', ["$scope", function($scope){

  $(document).ready(function(){
      $('.parallax').parallax();
    });
  
}]);

angular.module('openChairApp').controller('businessDashCtrl', ["$scope", function($scope) {

}]);

angular.module('openChairApp')
.controller('businessProfileCtrl', ["$scope", "business", function($scope, business) {
  $scope.bProfile = business;
}]);


angular.module('openChairApp')

.controller('searchCtrl', ["$scope", "businessService", function($scope, businessService){

  businessService.getBusinesses().then(function(response) {
    $scope.businesses = response;
  });

}]);

angular.module('openChairApp')

.controller('userCtrl', ["$scope", function($scope){


}]);

angular.module('openChairApp')
.controller('businessPreviewCtrl', ["$scope", function($scope) {

}]);

angular.module('openChairApp')
.directive('businessPreview', function() {
	return {
    restrict: 'EA',
		templateUrl:'App/directives/businessPreview/businessPreview.html',
    controller: 'businessPreviewCtrl'
	};
});

var openChairApp=angular.module('openChairApp');
openChairApp.directive('navTemplate', function(){
	return{
		templateUrl:'app/directives/navbar/navTemplate.html'
	};
});

var openChairApp = angular.module('openChairApp');
openChairApp.controller('navbarCtrl', ["loginService", "$scope", "$location", function(loginService, $scope, $location){

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

}]);

angular.module('openChairApp').controller('searchBarCtrl', ["$scope", function($scope) {

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

}]);

angular.module('openChairApp').directive('searchBar', function() {
	return {
    restrict: 'EA',
		templateUrl:'App/directives/searchBar/searchBarTemplate.html',
		controller: 'searchBarCtrl'
	};
});
