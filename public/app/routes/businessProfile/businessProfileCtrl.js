angular.module('openChairApp')
.controller('businessProfileCtrl', function($scope, business, loginService, $location) {
  loginService.getBusinessName().then(function(res) {
    if (!res) {
      $location.path('#/home');
    }
  });

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
       markers: {
                    m1: {
                        lat: $scope.bProfile.location[0],
                        lng: $scope.bProfile.location[1],
                        focus: true,
                        draggable: false,
                        message: "Hi there!",
                        icon: {}
                    }
                },

       defaults: {
           scrollWheelZoom: false
       }
    });

});
