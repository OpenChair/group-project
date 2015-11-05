angular.module('openChairApp', ['ui.router', 'ui.materialize', 'ui.calendar'])

.constant("constants",
{
  "baseURL": "http://localhost:7200/"
})

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
    url: '/search/:businessID',
    templateUrl: 'app/routes/businessProfile/businessProfileTmpl.html',
    controller: 'businessProfileCtrl',
    resolve: {
      business: function (businessService, $stateParams) {
        return businessService.getBusiness($stateParams.businessID).then(function (res) {
          return res.data;
        });
      }
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
        user: function (userService, $route) {
          return userService.getUser($route.current.params.id);
        },
        appointments: function (appointmentsService, $route) {
          return appointmentsService.getAppointments($route.current.params.id);
        }
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
});
