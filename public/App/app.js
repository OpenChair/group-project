angular.module('openChairApp', ['ui.router', 'ui.materialize'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'app/routes/home/homeTmpl.html',
    controller: 'homeCtrl'
  })
  .state('search', {
    url: '/search',
    templateUrl: 'app/routes/search/searchTmpl.html',
    controller: 'searchCtrl'
  })
  .state('user', {
    url: '/user',
    templateUrl: 'app/routes/user/userTmpl.html',
    controller: 'userCtrl'
  })
  .state('userProfile', {
      url: '/user/:id',
      templateUrl: 'app/routes/user/userTmpl.html',
      controller: 'userCtrl'
  })
  .state('businessDash',{
    url:'businessDash/businessDash/:id',
    templateUrl: 'app/routes/businessDash/businessDash.html',
    controller: 'businessDashCtrl'
  });
});
