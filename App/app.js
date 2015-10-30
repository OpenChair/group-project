angular.module('openChairApp', ['ui.router', 'ui.materialize'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: './routes/home/HomeTmpl.html',
    controllers: 'homeCtrl'
  })
  .state('search', {
    url: '/search',
    templateUrl: './routes/search/searchTmpl.html',
    controllers: 'searchCtrl'
  })
  .state('businessProfile', {
      url: '/search/business/:id',
      templateUrl: './routes/business/businessTmpl.html',
      controllers: 'businessProfileCtrl'
  })
  .state('userProfile', {
      url: '/user/:id',
      templateUrl: './routes/user/userTmpl.html',
      controllers: 'userCtrl'
  })

})
