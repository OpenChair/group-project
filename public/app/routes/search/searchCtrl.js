angular.module('openChairApp')

.controller('searchCtrl', function($scope, businessService, searchCriteria){

  $scope.searchCriteria = searchCriteria;

  businessService.getBusinesses().then(function(response) {
    $scope.businesses = response;
  });

});
