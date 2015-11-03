angular.module('openChairApp').service('businessService', function($http) {

  this.getBusinesses = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:7200/businesses'
    }).then(function(response) {
      return response.data;
    });
  };
  this.getFilterdBusinesses = function(filters) {
    return $http({
      method: 'GET',
      url: 'http://localhost:7200/businesses/?',
    }).then(function(response) {
      return response.data;
    });
  };

  this.getBusiness = function(id) {
    return $http({
      method: 'GET',
      url: 'http://localhost:7200/businesses/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.addBusiness = function(business) {
    return $http({
      method: 'POST',
      url: 'http://localhost:7200/businesses',
      data: business
    }).then(function(response) {
      return response.data;
    });
  };
  this.editBusiness = function(id, business) {
    return $http({
      method: 'PUT',
      url: 'http://localhost:7200/businesses/' + id,
      data: business
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteBusiness = function(id) {
    return $http({
      method: 'DELETE',
      url: 'http://localhost:7200/businesses/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  // this.editBusinessService = function(id, business) {
  //   return $http({
  //     method: 'PUT',
  //     url: 'http://localhost:7200/businesses/' + id,
  //     data: business
  //   }).then(function(response) {
  //     return response.data;
  //   });
  // };
  // this.editBusinessUsers = function(id, business) {
  //   return $http({
  //     method: 'PUT',
  //     url: 'http://localhost:7200/businesses/' + id,
  //     data: business
  //   }).then(function(response) {
  //     return response.data;
  //   });
  // };

});
