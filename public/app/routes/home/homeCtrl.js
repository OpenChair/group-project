angular.module('openChairApp')

.controller('homeCtrl', function($scope, businessService){
  
  businessService.getBusinesses().then(function(response) {
      $scope.businesses = response;
  });
});

  
  
  
