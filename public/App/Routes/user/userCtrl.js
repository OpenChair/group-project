angular.module('openChairApp')

.controller('userCtrl', function($scope, userService, appointmentsService){

  userService.getUser("563957383955920e3064202c").then(function(response) {
    $scope.user = response;
    console.log(response);
    appointmentsService.getAppointmentsById($scope.user._id, 'user').then(function(response) {
      $scope.appointments = response;
      console.log($scope.appointments);
    });
  });
});
