angular.module('openChairApp')

.controller('userCtrl', function($scope){
  $scope.user = {
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

});
