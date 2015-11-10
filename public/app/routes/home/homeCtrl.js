angular.module('openChairApp')

.controller('homeCtrl', function($scope, businessService){
  
  businessService.getBusinesses().then(function(response) {
      $scope.businesses = response;
  });
  
//  angular.extend($scope, {
//        center: {
////            lat: 40.202992,
////            lng: -111.628415,
//          zoom: 20,
//          autoDiscover: true
//        },
//      
//        defaults: {
//            scrollWheelZoom: false
//        },   
//        };
    });

  
  
  
});
