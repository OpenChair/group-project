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
                        focus: true,
                        draggable: false,
                        message: "Hello",
                        icon: {}
                    }
                },

       defaults: {
           scrollWheelZoom: false
       }
    });


$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
      


});
