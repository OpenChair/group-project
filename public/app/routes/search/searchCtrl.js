angular.module('openChairApp')

.controller('searchCtrl', function($scope, businessService, searchCriteria){
  businessService.getBusinesses().then(function(response) {
  businessService.getFilterdBusinesses(searchCriteria.radius, searchCriteria.lat, searchCriteria.lon).then(function(response) {
    $scope.businesses = response;
  });
  });
});

  .controller('searchCtrl', function($scope, businessService, searchCriteria) {
    businessService.getBusinesses().then(function(response) {
      businessService.getFilterdBusinesses(searchCriteria.radius, searchCriteria.lat, searchCriteria.lon).then(function(response) {
        $scope.businesses = response;
      });
    });
  });
