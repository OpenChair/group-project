angular.module('openChairApp', ['ui.router', 'ui.materialize'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'app/routes/home/homeTmpl.html',
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
    templateUrl: 'app/businessProfile/businessProfileTmpl.html',
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
    url:'businessDash/businessDash/:id',
    templateUrl: 'app/routes/businessDash/businessDash.html',
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
