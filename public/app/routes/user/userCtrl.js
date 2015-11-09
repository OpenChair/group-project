angular.module('openChairApp')

.controller('userCtrl', function($scope, user, appointments, loginService, $location){
  // loginService.getUserName().then(function(res) {
  //   if (!res.data._id) {
  //     $location.path('#/home');
  //   }
  // });
  $scope.user = user;
  $scope.appointments = appointments;
});
