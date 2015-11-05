angular.module('openChairApp')

.controller('userCtrl', function($scope, userService, appointmentsService, user, appointments){
  $scope.user = user;
  $scope.appointments = appointments;

});
