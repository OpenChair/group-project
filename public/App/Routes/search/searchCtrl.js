angular.module('openChairApp')

.controller('searchCtrl', function($scope, businessService){

  businessService.getBusinesses().then(function(response) {
    $scope.businesses = response;
  });

});
