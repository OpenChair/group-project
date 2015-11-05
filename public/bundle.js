angular.module('openChairApp', ['ui.router', 'ui.materialize', 'ui.calendar'])

.constant("constants",
{
  "baseURL": "http://localhost:7200/"
})

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
      controller: 'userCtrl',
      resolve: {
        user: ["userService", "$stateParams", function (userService, $stateParams) {
          return userService.getUser($stateParams.id);
        }],
        appointments: ["appointmentsService", "$stateParams", function (appointmentsService, $stateParams) {
          return appointmentsService.getAppointments($stateParams.id);
        }]
      }
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

// angular.module('openChairApp').sevice('appointmentLengthFilter', function() {
//   this.lengthFilter = function(length) {
//     var tempLength = length % 4;
//     if (tempLength < 1) {
//       if (tempLength) {
//
//       }
//     }
//   };
// });

angular.module('openChairApp')

.service('appointmentsService', ["$http", "constants", function($http, constants) {
  this.makeAppointment = function(appointment) {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'appointment',
      data: appointment
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointments = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'appointments'
    }).then(function(response) {
      return response.data;
    });
  };
  this.editAppointment = function(id, appointment) {
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'appointment/' + id,
      data: appointment
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteAppointment = function(id) {
    return $http({
      method: 'DELETE',
      url: constants.baseURL + 'appointment/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointment = function(id) {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'appointment/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointmentsById = function(id, type) {
    console.log(id);
    return $http({
      method: 'GET',
      url: constants.baseURL + 'appointments/' + type + '/' + id
    }).then(function(response) {
      console.log(response);
      return response.data;

    });
  };
}]);

angular.module('openChairApp').service('businessService', ["$http", "constants", function($http, constants) {

  this.getBusinesses = function() {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'businesses'
    }).then(function(response) {
      return response.data;
    });
  };
  this.getFilterdBusinesses = function(filters) {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'businesses/?',
    }).then(function(response) {
      return response.data;
    });
  };

  this.getBusiness = function(id) {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'businesses/' + id
    });
  };
  this.addBusiness = function(business) {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'businesses',
      data: business
    }).then(function(response) {
      return response.data;
    });
  };
  this.editBusiness = function(id, business) {
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'businesses/' + id,
      data: business
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteBusiness = function(id) {
    return $http({
      method: 'DELETE',
      url: constants.baseURL + 'businesses/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  // this.editBusinessService = function(id, business) {
  //   return $http({
  //     method: 'PUT',
  //     url: constants.baseURL + 'businesses/' + id,
  //     data: business
  //   }).then(function(response) {
  //     return response.data;
  //   });
  // };
  // this.editBusinessUsers = function(id, business) {
  //   return $http({
  //     method: 'PUT',
  //     url: constants.baseURL + 'businesses/' + id,
  //     data: business
  //   }).then(function(response) {
  //     return response.data;
  //   });
  // };

}]);

angular.module('openChairApp').service('loginService', ["$http", "$q", "constants", function($http, $q, constants){

	this.newUserService=function(user){
		return $http({
			method:'POST',
			url: constants.baseURL + 'user',
			data:user
		}).then(function(err, res){
			if(err){ return err;}
			else{return res;}
		});
	};

	this.loginUserSubmit=function(user){
		return $http({
			method:"POST",
			url: constants.baseURL + 'login',
			data:user
		}).then(function(res){
			console.log(res);
			return res;
		});
	};
	this.getUserName=function(){
		var deferred=$q.defer();
		$http({
			method:"GET",
			url: constants.baseURL + 'user'
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
			url: constants.baseURL + 'business',
			data:business
		}).then(function(err, res){
			if(err){ return err;}
			else{return res;}
		});
	};

	this.loginBusinessSubmit=function(business){
		return $http({
			method:"POST",
			url: constants.baseURL + 'loginBusiness',
			data:business
		}).then(function(res,err){
			return res;
		});
	};
	this.getBusinessName=function(){
		var deferred=$q.defer();
		$http({
			method:"GET",
			url: constants.baseURL + 'business'
		}).then(function(res){
			var businessName=res;
			deferred.resolve(businessName);
		},function(err){
			deferred.reject(err);
		});
		return deferred.promise;
	};

}]);

angular.module('openChairApp').service('userService', ["$http", "constants", function($http, constants) {

  this.getUser = function(id) {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'user/' + id
    }).then(function(response) {
      return response.data;
    });
  };

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
	loginService.getUserName().then(function(res){
				if(res){
					$scope.customerName='Welcome, ' + res.data.name.first;
					console.log($scope.customerName)



				}
			});
	$scope.submitNewUser=function(user){
		console.log(user);
		loginService.newUserService(user);
	};

	$scope.loginUserSubmit=function(user){
		loginService.loginUserSubmit(user).then(function(res){
		loginService.getUserName().then(function(res){
				if(res){
					$scope.customerName='Welcome, ' + res.data.name.first;
					console.log($scope.customerName)



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
//      console.log('onStart');
  };
  $scope.onRender = function () {
//      console.log('onRender');
  };
  $scope.onOpen = function () {
//      console.log('onOpen');
  };
  $scope.onClose = function () {
//      console.log('onClose');
  };
  $scope.onSet = function () {
//      console.log('onSet');
  };
  $scope.onStop = function () {
//      console.log('onStop');
  };

}]);

angular.module('openChairApp').directive('searchBar', function() {
	return {
    restrict: 'EA',
		templateUrl:'App/directives/searchBar/searchBarTemplate.html',
		controller: 'searchBarCtrl'
	};
});

angular.module('openChairApp').controller('businessDashCtrl', ["$scope", function($scope) {

}]);

angular.module('openChairApp')
.controller('businessProfileCtrl', ["$scope", "business", function($scope, business) {
  console.log(business);
  $scope.bProfile = business;
}]);

var app=angular.module('openChairApp');
 app.controller('businessScheduleCtrl', ["$scope", "$compile", "$timeout", "uiCalendarConfig", function($scope, $compile, $timeout, uiCalendarConfig) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    // $scope.events = 
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      $timeout(function() {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      });
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    $scope.changeLang = function() {

        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}])

angular.module('openChairApp')

.controller('homeCtrl', ["$scope", "businessService", function($scope, businessService){

  businessService.getBusinesses().then(function(response) {
      $scope.businesses = response;
  });
  
}]);

angular.module('openChairApp')

.controller('searchCtrl', ["$scope", "businessService", function($scope, businessService){

  businessService.getBusinesses().then(function(response) {
    $scope.businesses = response;
  });

}]);

angular.module('openChairApp')

.controller('userCtrl', ["$scope", "user", "appointments", function($scope, user, appointments){
  $scope.user = user;
  $scope.appointments = appointments;

}]);
