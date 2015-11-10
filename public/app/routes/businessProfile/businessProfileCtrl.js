angular.module('openChairApp')
.controller('businessProfileCtrl', function($scope, business, loginService, $location) {
  // loginService.getBusinessName().then(function(res) {
  //   if (!res.data._id) {
  //     $location.path('#/home');
  //   }
  // });

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
              focus: false,
              draggable: false,
              getMessageScope: function () { return $scope; },
              message: "<map-card-directive></map-card-directive>",
              icon: {}
                    }
                },

       defaults: {
           scrollWheelZoom: false
       }
    });

});
