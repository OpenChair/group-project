angular.module('openChairApp')
.controller('businessProfileCtrl', function($scope, business) {
  console.log(business);
  $scope.bProfile = business;
});
