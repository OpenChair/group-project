angular.module('openChairApp', ['ui.router', 'ui.materialize'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'App/Routes/Home/HomeTmpl.html',
    controllers: 'HomeCtrl'
  })
  .state('search', {
    url: '/search',
    templateUrl: 'App/Routes/search/searchTmpl.html',
    controllers: 'searchCtrl'
  })
  .state('user', {
    url: '/user',
    templateUrl: 'App/Routes/user/userTmpl.html',
    controllers: 'userCtrl'
  })


})
