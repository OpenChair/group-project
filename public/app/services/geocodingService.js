angular.module('openChairApp').service('geocodingService', function($http) {
  this.geocode = function(address) {
    var urlAddress = "address=" + address.street + ', ';
    if (address.aptSuite) {
      urlAddress += address.aptSuite + ', ';
    }
    urlAddress += address.city + ', ' + address.state + ', ' + address.zip;
    urlAddress = urlAddress.split(' ').join('+');

    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?' + urlAddress
    }).then(function(response) {
      return response.data.results[0].geometry.location;
    });
  };
});
