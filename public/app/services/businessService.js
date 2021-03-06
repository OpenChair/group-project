angular.module('openChairApp').service('businessService', function($http, constants) {
  var searchCriteria = {
    lat: 0,
    lon: 0
  };

  this.getSearchCriteria = function() {
    return searchCriteria;
  };

  this.setSearchCriteria = function(sC) {
    searchCriteria = sC;
  };

  this.getBusinesses = function() {
    return $http({
      method: 'GET',
      url: '/businesses'
    }).then(function(response) {
      return response.data;
    });
  };
  this.getFilterdBusinesses = function(radius, lat, lon) {
    return $http({
      method: 'GET',
      url: '/businesses/' + radius + '/' + lat + '/' + lon
    }).then(function(response) {
      return response.data;
    });
  };

  this.getBusiness = function(id) {
    return $http({
      method: 'GET',
      url: '/businesses/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.addBusiness = function(business) {
    return $http({
      method: 'POST',
      url: '/businesses',
      data: business
    }).then(function(response) {
      return response.data;
    });
  };
  this.editBusiness = function(id, business) {
    return $http({
      method: 'PUT',
      url: '/businesses/' + id,
      data: business
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteBusiness = function(id) {
    return $http({
      method: 'DELETE',
      url: '/businesses/' + id
    }).then(function(response) {
      return response.data;
    });
  };
});
