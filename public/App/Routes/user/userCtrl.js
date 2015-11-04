angular.module('openChairApp')

.controller('userCtrl', function($scope, businessService, appointmentsService){
  $scope.user = {
    _id: "563a3eef2a9334c01ae5f176",
    name: {
      first: 'bob',
      last: 'bobby'
    },
    displayName: "bobbity",
    email: "bibity@bobbity.boo",
    phone: 1234567890,
    address: {
      street: '1234s12345e,12345678 UT 876543'
    }
  };

  businessService.getBusinesses().then(function(response) {
    $scope.businesses = response;
  });
  
  appointmentsService.getAppointmentsById(
    $scope.user._id, 'user').then(function(response) {
    $scope.appointments = response;
    console.log("Controller" + $scope.appointments);
  });

});
