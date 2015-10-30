angular.module('openChairApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: "./routes/home/HomeTmpl.html",
    controllers: 'homeCtrl'
  })

})
