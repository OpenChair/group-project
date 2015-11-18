angular.module('openChairApp', ['ui.router', 'ui.materialize', 'ui.calendar', 'leaflet-directive', 'scDateTime'])

.value("scDateTimeConfig", {
  defaultTheme: 'material',
  autosave: false,
  defaultMode: "date",
  defaultDate: new Date(), //should be date object!!
  displayMode: "full",
  defaultOrientation: false,
  displayTwentyfour: false,
  compact: false
})

.constant("constants",
{
  "baseURL": "http://localhost:7200/"
})

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');


  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'app/routes/home/homeTmpl.html',
    controller: 'homeCtrl',
    resolve: {
      businesses: ["businessService", function (businessService) {
        return businessService.getBusinesses();
      }]
    }
  })
  .state('search', {
    url: '/search',
    templateUrl: 'app/routes/search/searchTmpl.html',
    controller: 'searchCtrl',
    resolve: {
      businesses: ["businessService", function (businessService) {
        return businessService.getBusinesses();
      }],
      searchCriteria: ["businessService", function(businessService) {
        return businessService.getSearchCriteria();
      }]
    }
  })
  .state('businessProfile', {
    url: '/search/:businessID',
    templateUrl: 'app/routes/businessProfile/businessProfileTmpl.html',
    controller: 'businessProfileCtrl',
    resolve: {
      business: ["businessService", "$stateParams", function (businessService, $stateParams) {
        return businessService.getBusiness($stateParams.businessID);
      }],
      appointments: ["appointmentsService", "$stateParams", function (appointmentsService, $stateParams) {
        return appointmentsService.getAppointments($stateParams.businessID);
      }]
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
          return appointmentsService.getAppointmentsById($stateParams.id, "user");
        }]
      }
    })
  .state('businessSchedule', {
    url: '/business/:id',
    templateUrl: 'app/routes/businessSchedule/businessScheduleTmpl.html',
    controller: 'businessScheduleCtrl',
    resolve: {
      business: ["businessService", "$stateParams", function (businessService, $stateParams) {
        return businessService.getBusiness($stateParams.id);
      }],
      appointments: ["appointmentsService", "$stateParams", function (appointmentsService, $stateParams) {
        return appointmentsService.getAppointments($stateParams.id);
      }]
    }
  })
  .state('businessDash',{
    url:'/businessDash/:id',
    templateUrl: 'app/routes/businessDash/businessDashTmpl.html',
    controller: 'businessDashCtrl',
    resolve: {
      business: ["businessService", "$stateParams", function (businessService, $stateParams) {
        return businessService.getBusiness($stateParams.id);
      }],
      appointments: ["appointmentsService", "$stateParams", function (appointmentsService, $stateParams) {
        return appointmentsService.getAppointments($stateParams.id);
      }]
    }
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
      url: '/appointment',
      data: appointment
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointments = function() {
    return $http({
      method: 'GET',
      url: '/appointments'
    }).then(function(response) {
      return response.data;
    });
  };
  this.editAppointment = function(id, appointment) {

    return $http({
      method: 'PUT',
      url: '/appointment/' + id,
      data: appointment
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteAppointment = function(id) {
    return $http({
      method: 'DELETE',
      url: '/appointment/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointment = function(id) {
    return $http({
      method: 'GET',
      url: '/appointment/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointmentsById = function(id, type) {
    return $http({
      method: 'GET',
      url: '/appointments/' + type + '/' + id
    }).then(function(response) {
      return response.data;

    });
  };
}]);

angular.module('openChairApp').service('businessService', ["$http", "constants", function($http, constants) {
  var searchCriteria = {
    lat: 0,
    lon: 0
  };

  this.getSearchCriteria = function() {
    return searchCriteria;
  };

  this.setSearchCriteria = function(sC) {
    searchCriteria = sC;
  };

  this.getBusinesses = function() {
    return $http({
      method: 'GET',
      url: '/businesses'
    }).then(function(response) {
      return response.data;
    });
  };
  this.getFilterdBusinesses = function(radius, lat, lon) {
    return $http({
      method: 'GET',
      url: '/businesses/' + radius + '/' + lat + '/' + lon
    }).then(function(response) {
      return response.data;
    });
  };

  this.getBusiness = function(id) {
    return $http({
      method: 'GET',
      url: '/businesses/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.addBusiness = function(business) {
    return $http({
      method: 'POST',
      url: '/businesses',
      data: business
    }).then(function(response) {
      return response.data;
    });
  };
  this.editBusiness = function(id, business) {
    return $http({
      method: 'PUT',
      url: '/businesses/' + id,
      data: business
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteBusiness = function(id) {
    return $http({
      method: 'DELETE',
      url: '/businesses/' + id
    }).then(function(response) {
      return response.data;
    });
  };
}]);

angular.module("openChairApp").service("emailService", ["$http", function($http) {
  var chairKeyYo = "6i_BJSX_9Ke6UFeq0VXlMA";
  this.verificationEmail = function(email, appointment, business){
		return $http({
			method: 'POST',
			url: 'https://mandrillapp.com/api/1.0/messages/send.json',
			data: {
        'key':  chairKeyYo,
				'message': {
          'html': '<h1>Thank you for securing your appointment on Open Chair!</h1><br><h2>Here is your appointment information: ' + business.businessName + ' on ' + appointment.start + '</h2>',
          'subject': 'Open Chair Appointment',
          'from_name': "Open Chair",
					'from_email': 'openchairverify@gmail.com',
					'to': [
							{
							'type': 'to',
              "email": email
							}
						],
					'autotext': null
				}
			}
		});
  };
}]);

angular.module('openChairApp').service('geocodingService', ["$http", function($http) {
  this.geocode = function(address) {
    var urlAddress = "address=" + address.street + ', ';
    if (address.aptSuite) {
      urlAddress += address.aptSuite + ', ';
    }
    urlAddress += address.city + ', ' + address.state + ', ' + address.zip;
    urlAddress = urlAddress.split(' ').join('+');

    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?' + urlAddress
    }).then(function(response) {
      return response.data.results[0].geometry.location;
    });
  };
}]);

angular.module('openChairApp').service('loginService', ["$http", "$q", function($http, $q){

	this.newUserService=function(user){
		return $http({
			method:'POST',
			url:'/user',
			data:user
		}).then(function(err, res){
			if(err){ return err;}
			else{return res;}
		});
	};

	this.loginUserSubmit=function(user){
		return $http({
			method:"POST",
			url:'/login',
			data:user
		}).then(function(res){
			console.log(res);
			return res;
		});
	};
	this.getUserName=function(){
		return $http({
			method:"GET",
			url:'/user'
		});
	};
	this.newBusinessService=function(business){

		return $http({
			method:'POST',
			url:'/business',
			data:business
		});
	};

	this.loginBusinessSubmit=function(business){
		return $http({
			method:"POST",
			url:'/loginBusiness',
			data: business
		}).then(function(res){
			console.log(res);
			return res;
		});
	};

	this.getBusinessName=function(){
		var deferred=$q.defer();
		$http({
			method:"GET",
			url:'/business'
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
      url: '/user/' + id
    }).then(function(response) {
      return response.data;
    });
  };

this.updateUser = function(id, user) {
    return $http({
      method: 'PUT',
      url: '/user/' + id,
      data: user
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
      templateUrl:'app/directives/businessPreview/businessPreview.html',
      controller: 'businessPreviewCtrl'
	};
});

angular.module("openChairApp").controller("footerCtrl", ["$scope", function($scope) {
  
}]);

angular.module('openChairApp')
.directive('footerDir', function() {
	return {
    restrict: 'EA',
		templateUrl:'app/directives/footer/footer.html',
		controller: 'footerCtrl'
	};
});

angular.module('openChairApp')
.controller('makeApptCtrl', ["$scope", function($scope) {
  
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

angular.module('openChairApp')
.directive('makeAppt', function() {
	return {
    restrict: 'EA',
      templateUrl:'App/directives/makeAppt/makeAppt.html',
      controller: 'makeApptCtrl'
	};
  
});

angular.module('openChairApp').controller('mapCardCtrl', ["$scope", function($scope) {
  
  $scope.bProfile.businessName = "something";
    
}]);
angular.module('openChairApp').directive('mapCardDirective', function() {
  return {
    restrict: 'EA',
      templateUrl:'app/directives/mapCard/mapCardTmpl.html',
      controller: ["$scope", function($scope) {
      
      }]
	};
});
angular.module('openChairApp').directive('navTemplate', function(){
	return{
		templateUrl:'app/directives/navbar/navTemplate.html'
	};
});

angular.module('openChairApp')
  .controller('navbarCtrl', ["loginService", "$scope", "$location", "geocodingService", function(loginService, $scope, $location, geocodingService) {

    // Check for currently loged in
    loginService.getUserName().then(function(res) {
      console.log(res);
      if (res.data.businessName) {
        $scope.customerName = res.data.businessName;
        $scope.business = res.data;
      } else {
        $scope.customerName = 'Welcome, ' + res.data.name.first;
        $scope.user = res.data;
        console.log('Current User', res);
      }
    }, function(err) {
      console.log(err);
    });
    loginService.getBusinessName().then(function(res) {
      console.log(res);
      if (res.data.businessName) {
        $scope.customerName = res.data.businessName;
        $scope.business = res.data;
      } else {
        $scope.customerName = 'Welcome, ' + res.data.name.first;
        $scope.user = res.data;
        console.log('Current User', res);
      }
    }, function(err) {
      console.log(err);
    });

    // Register new business
    $scope.blankPictures = [{
      link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
      caption: ""
    }, {
      link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
      caption: ""
    }, {
      link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
      caption: ""
    }, {
      link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
      caption: ""
    }];

    $scope.userBlankPicture = 'http://www.flowjo.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';

    $scope.submitNewBusiness = function(business) {
      var geocode = geocodingService.geocode(business.address).then(function(response) {
        business.location = [response.lng, response.lat];
        business.pictures = $scope.blankPictures;
        loginService.newBusinessService(business).then(function(res) {
          console.log('new biz: ', res.data);
        }, function(err) {
          console.log('biz create err: ', err);
        });
      });
    };
    $scope.submitNewUser = function(user) {
      var geocode = geocodingService.geocode(user.address).then(function(response) {
        user.location = [response.lng, response.lat];
        user.photo = $scope.userBlankPicture;
        loginService.newUserService(user).then(function(res) {
          console.log('new user: ', res.data);
        }, function(err) {
          console.log('user create err: ', err);
        });
      });
    };

    // Login Users and Businesses
    $scope.loginUserSubmit = function(user) {
      loginService.loginUserSubmit(user).then(function(res) {
        $scope.customerName = 'Welcome, ' + res.data.name.first;
        $scope.user = res.data;
      }, function(err) {
        if (err.status > 300) {
          alert('Invalid Login: Please try again');
        }
      });

    };
    $scope.loginBusinessSubmit = function(login) {
    loginService.loginBusinessSubmit(login).then(function(res) {
        $scope.customerName = res.data.businessName;
        $scope.business = res.data;
      }, function(err) {
        if (err.status > 300) {
          alert('Invalid Login: Please try again');
        }
      });
    };
  }]);

angular.module('openChairApp').controller('searchBarCtrl', ["$scope", "businessService", "loginService", "$location", "$rootScope", function($scope, businessService, loginService, $location, $rootScope) {

  loginService.getUserName().then(function(response) {
    $scope.user = response.data;
  });

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


  var getUserLocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          $scope.lat = pos.coords.longitude;
          $scope.lon = pos.coords.latitude;
        },
        function(error){
          $scope.lat = $scope.user.location[1];
          $scope.lon = $scope.user.location[0];
        },
        {
          timeout: (5 * 1000),
          maximumAge: (1000 * 60 * 15),
          enableHighAccuracy: true
        }
      );
    }
  };
  getUserLocation();
  $scope.apptQuery = function(searchCriteria) {
    $rootScope.searchCriteria = searchCriteria;
    $location.path('/search');
  };


}]);

angular.module('openChairApp').directive('searchBar', function() {
  return {
    restrict: 'EA',
      templateUrl:'app/directives/searchBar/searchBarTemplate.html',
      controller: 'searchBarCtrl'
  };

//  console.log(searchCriteria);
});

angular.module('openChairApp').controller('businessDashCtrl', ["$scope", "businessService", "loginService", "$location", "business", "appointments", function($scope, businessService, loginService, $location, business, appointments) {
  // loginService.getBusinessName().then(function(res) {
  //   if (!res.data._id) {
  //     // $location.path('#/home');
  //   }
  // });
  $scope.business = business;

  $scope.profilePic = $scope.business.pictures.splice(0, 1);

  $scope.tempInfo = business;
  delete $scope.tempInfo._id;
  delete $scope.tempInfo.__v;
  $scope.tempSchedule = business;
  delete $scope.tempSchedule._id;
  delete $scope.tempSchedule.__v;

  $scope.editHours = function(hours) {
    businessService.editBusiness(business._id, hours).then(function(res) {
      if (res) {
        alert('update completed');
        $scope.business = business;

        $scope.profilePic = $scope.business.pictures.splice(0, 1);

        $scope.tempInfo = business;
        delete $scope.tempInfo._id;
        delete $scope.tempInfo.__v;
        $scope.tempSchedule = business;
        delete $scope.tempSchedule._id;
        delete $scope.tempSchedule.__v;
      }
    });
  };
  $scope.addService = function(service) {
    $scope.business.services.push(service);
    console.log(service);

    businessService.editBusiness($scope.business._id, $scope.business).then(function (response) {
      $scope.business = response;
    });
  };
  $scope.deleteService = function(index) {

    businessService.editBusiness($scope.business._id, $scope.business).then(function(response) {
      $scope.business = response;
    });
  };

	$scope.editPictures = function(picArray, profilePic) {
		picArray.unshift(profilePic[0]);
		for (var i = 0; i < picArray.length; i++) {
			if (!picArray[i].link) {
				picArray[i].link = 'http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg';
			}
		}
		businessService.editBusiness($scope.business._id, {pictures: picArray}).then(function(response) {
      $scope.business = response;
			$scope.profilePic = $scope.business.pictures.splice(0, 1);
    });
	};

  $(document).ready(function() {
    $('.tooltipped').tooltip({
      delay: 50
    });
  });

  $(function() {

    $('#closeModal').click(function() {
      $('#areYouSure').modal('hide');
    });
  });
}]);

angular.module('openChairApp')

.controller('businessProfileCtrl', ["$scope", "userService", "business", "loginService", "$location", "appointmentsService", "emailService", function($scope, userService, business, loginService, $location, appointmentsService, emailService) {
  var uId;
  loginService.getUserName().then(function(res) {
    uId=res.data;
    if (res.data) {
      $scope.appointment = {
        user: res.data._id,
        business: business._id,
        start: new Date()
      };
    }
  //   if (!res.data._id) {
  //     $location.path('#/home');
  //   }
  });
  $scope.pushService = "";

  $scope.submitAppt = function(appointment, date, time) {
    // appointmentService.addAppointmentById(appointment);
    appointment.start = new Date(date + ', ' + time);
    appointment.end = moment(appointment.start).add(appointment.end, 'm');
    appointmentsService.makeAppointment(appointment);

  };

  $scope.selectService = function(service) {
    $scope.appointment.title = service.name;
    $scope.appointment.price = service.price;
    $scope.appointment.end = service.duration;
  };
  $scope.addToFavorites=function(){
    if(uId.favorites>0){
      for(var i =0;i<uId.favorites; i++){
        if(uId.favorites[i]===$scope.bProfile._id){
          console.log('already added');
        }
        else{
          uId.favorites.push($scope.bProfile._id);
          console.log('added to favorites');
        }
      console.log(uId);
      }
    }
    else{
      uId.favorites.push($scope.bProfile._id);
      alert('added to favorites');
    }

    userService.updateUser(uId._id, uId).then(function(res){
      uId=res.favorites;
    });
  };

  $scope.sendVerification = function(appointment, date, time) {
    loginService.getUserName().then(function(res) {
      if (res.data) {
        $scope.verifyemail = res.data.email;
      }
      console.log($scope.verifyemail);
      appointment.start = new Date(date + ', ' + time);
      emailService.verificationEmail($scope.verifyemail, appointment, business);
      console.log(appointment.start);
    });

  };

  $scope.bProfile = business;
  $scope.profilePic = $scope.bProfile.pictures.splice(0, 1);

  // NEED TO ADD MINIPICTURES TO SCHEMA
  $scope.pictures = business.miniPictures;

  angular.extend(
    $scope, {
       center: {
           lat: $scope.bProfile.location[0],
           lng: $scope.bProfile.location[1],
           zoom: 16
       },
       markers: {
            m1: {
              lat: $scope.bProfile.location[0],
              lng: $scope.bProfile.location[1],
              focus: false,
              draggable: false,
              getMessageScope: function () { return $scope; },
              message: "<map-card-directive></map-card-directive>",
              icon: {}
                    }
                },

       defaults: {
           scrollWheelZoom: false
       }
    });

  // JQUERY
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  $('[data-click]').on('click', function (e) {
      $( $(this).data('click') ).trigger('click');
  });
  $('#closeDaModal').on('click', function() {
     $('#verifyModal').modal('hide');
  });

}]);

angular.module('openChairApp').controller('businessScheduleCtrl', ["$scope", "$compile", "$timeout", "uiCalendarConfig", "loginService", "$location", "businessService", "appointmentsService", function($scope, $compile, $timeout, uiCalendarConfig, loginService, $location, businessService, appointmentsService ) {
  // loginService.getBusinessName().then(function(res) {
  //   if (!res.data._id) {
  //     $location.path('#/home');
  //   }
  // });
 var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var arrd=[];
    appointmentsService.getAppointmentsById('56411a9f3955d2bc64c1db78', 'business').then(function(res){
      for(var i=0;i<res.length;i++){
        var obj = {
          title:res[i].title,
          start:res[i].start,
          end:res[i].end,
          id:res[i]._id
        };
        arrd.push(obj);
      }
    });
    /* event source that contains custom events on the scope */
    $scope.events = arrd;
    /* event source that calls a function on every view switch */

    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');

    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
       $scope.ap={
         start:event.start._d,
         end:event.end._d,
       };
       appointmentsService.editAppointment(event.id, $scope.ap);

    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
       $scope.ap={
         start:event.start._d,
         end:event.end._d,
       };
       appointmentsService.editAppointment(event.id, $scope.ap);

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
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
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
        height: 750,
        slotMinutes:15,
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


    /* event sources array*/
    $scope.eventSources = [$scope.events];

}]);

angular.module('openChairApp')

.controller('homeCtrl', ["$scope", "businessService", function($scope, businessService){

  businessService.getBusinesses().then(function(response) {
      $scope.businesses = response;
  });
}]);

angular.module('openChairApp')

.controller('searchCtrl', ["$scope", "businessService", "$rootScope", function($scope, businessService, $rootScope) {

      if ($rootScope.searchCriteria) {
        $scope.searchCriteria = $rootScope.searchCriteria;
      } else {
        $scope.searchCriteria = {
          type: '',
          text: ''
        };
      }

      $scope.filtered = '';

      $scope.radius = 30;
      $scope.getUserLocation = function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(pos) {
              $scope.lat = pos.coords.longitude;
              $scope.lon = pos.coords.latitude;
            },
            function(error) {
              $scope.lat = $scope.user.location[1];
              $scope.lon = $scope.user.location[0];
            }, {
              timeout: (5 * 1000),
              maximumAge: (1000 * 60 * 15),
              enableHighAccuracy: true
            }
          );
        }
      };

      $scope.radius = 30;
      if ($scope.lat) {
        businessService.getFilterdBusinesses($scope.radius, $scope.lat, $scope.lon).then(function(response) {
          console.log(response);
          $scope.businesses = response;

        });
      } else {
        businessService.getBusinesses().then(function(response) {
          $scope.businesses = response;
        });
      }
    }]);

angular.module('openChairApp')

.controller('userCtrl', ["$scope", "user", "appointments", "loginService", "$location", "appointmentsService", "userService", function($scope, user, appointments, loginService, $location, appointmentsService, userService){
  // loginService.getUserName().then(function(res) {
  //   if (!res.data._id) {
  //     $location.path('#/home');
  //   }
  // });
  $scope.user = user;

  $scope.appointments = appointments;
  $scope.getAppointments = function(){
    appointmentsService.getAppointmentsById($scope.user._id, 'user').then(function(response) {
      $scope.appointments = response;
    });
  };

  $scope.deleteAppointment = function(id) {
   appointmentsService.deleteAppointment(id).then(function() {
       $scope.getAppointments();
   });
 };

  $scope.removeFromFavorites=function(b){
          
    for(var i=0;i<$scope.user.favorites.length; i++){
      if($scope.user.favorites[i]._id===b._id){
        user.favorites.splice(i,1)
        alert('removed')
        userService.updateUser(user._id,user)
        
      }
    }
  }

 $scope.updateUser = function(user){
   userService.updateUser($scope.user._id, user).then(function(response) {
     userService.getUser(user._id).then(function(response) {
       $scope.user = response;
     });
   });
 };
}]);
