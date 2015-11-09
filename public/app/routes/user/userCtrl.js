angular.module('openChairApp')

.controller('userCtrl', function($scope, user, appointments){
  $scope.user = 
  $scope.appointments = appointments;

});
