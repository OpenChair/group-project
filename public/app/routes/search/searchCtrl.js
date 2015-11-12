angular.module('openChairApp')

.controller('searchCtrl', function($scope, businessService, searchCriteria){

  $scope.searchCriteria = searchCriteria;

  console.log($scope.searchCriteria);

  businessService.getFilterdBusinesses(searchCriteria.radius, searchCriteria.lat, searchCriteria.lon).then(function(response) {
    $scope.businesses = response;
  });

});
