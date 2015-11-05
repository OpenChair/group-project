angular.module('openChairApp')

.controller('homeCtrl', function($scope, businessService){
  
  angular.extend($scope, {
        center: {
            lat: 48,
            lng: 4,
            zoom: 4
        },
      
        defaults: {
            scrollWheelZoom: false
        }
    });

  businessService.getBusinesses().then(function(response) {
      $scope.businesses = response;
  });
  
  
});
