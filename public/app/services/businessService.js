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
      url: constants.baseURL + 'businesses'
    }).then(function(response) {
      return response.data;
    });
  };
  this.getFilterdBusinesses = function(searchCriteria, radius, lat, lon) {
    return $http({
      method: 'GET',
      url: '/businesses/' + radius + '/' + lat + '/' + lon + '?type=' + searchCriteria.type + '&text=' + searchCriteria.text
    }).then(function(response) {
      return response.data;
    });
  };

  this.getBusiness = function(id) {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'businesses/' + idd
    }).then(function(response) {
      return response.data;
    });
  };
  this.addBusiness = function(business) {
    return $http({
      method: 'POST',
      url: constants.baseURL + 'businesses',
      data: business
    }).then(function(response) {
      return response.data;
    });
  };
  this.editBusiness = function(id, business) {
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'businesses/' + id,
      data: business
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteBusiness = function(id) {
    return $http({
      method: 'DELETE',
      url: constants.baseURL + 'businesses/' + id
    }).then(function(response) {
      return response.data;
    });
  };

  
  this.updateBusiness = function(id, business) {
  console.log(business);
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'business/' + id,
      data: business 
   }).then(function(response) {
      return response.data;
    });
  };
  
  




  // this.editBusinessService = function(id, business) {
  //   return $http({
  //     method: 'PUT',
  //     url: constants.baseURL + 'businesses/' + id,
  //     data: business
  //   }).then(function(response) {
  //     return response.data;
  //   });
  // };
  // this.editBusinessUsers = function(id, business) {
  //   return $http({
  //     method: 'PUT',
  //     url: constants.baseURL + 'businesses/' + id,
  //     data: business
  //   }).then(function(response) {
  //     return response.data;
  //   });
  // };

});
