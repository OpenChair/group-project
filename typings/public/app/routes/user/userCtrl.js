angular.module('openChairApp')

.controller('userCtrl', function($scope, user, appointments){
  $scope.user = user;
  $scope.appointments = appointments;

});
