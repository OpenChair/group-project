angular.module('openChairApp')

.controller('searchCtrl', function($scope, businessService, searchCriteria){

  businessService.getBusinesses().then(function(response) {
    $scope.businesses = response;
  });

});
