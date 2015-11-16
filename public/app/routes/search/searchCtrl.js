angular.module('openChairApp')

  .controller('searchCtrl', function($scope, businessService, $rootScope) {

    if ($rootScope.searchCriteria) {
      $scope.searchCriteria = $rootScope.searchCriteria;
    } else {
      $scope.searchCriteria = {
        type: '',
        text: ''
      };
    }

    $scope.radius = 30;
    $scope.getUserLocation = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(pos) {
            $scope.lat = pos.coords.longitude;
            $scope.lon = pos.coords.latitude;
          },
          function(error){
            $scope.lat = $scope.user.location[1];
            $scope.lon = $scope.user.location[0];
          },
          {
            timeout: (5 * 1000),
            maximumAge: (1000 * 60 * 15),
            enableHighAccuracy: true
          }
        );
      }
    };

    businessService.getBusinesses().then(function(response) {
      $scope.businesses = response;
      // businessService.getFilterdBusinesses(searchCriteria.radius, searchCriteria.lat, searchCriteria.lon).then(function(response) {
      //   $scope.businesses = response;
      // });
    });
  });
