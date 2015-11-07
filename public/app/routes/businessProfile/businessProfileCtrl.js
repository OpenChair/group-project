angular.module('openChairApp')
.controller('businessProfileCtrl', function($scope, business) {

  $scope.bProfile = business;

  // NEED TO ADD MINIPICTURES TO SCHEMA
  $scope.pictures = business.miniPictures;

  angular.extend(
    $scope, {
       center: {
           lat: $scope.bProfile.location[0],
           lng: $scope.bProfile.location[1],
           zoom: 16
       },

       defaults: {
           scrollWheelZoom: false
       }
    });
});
