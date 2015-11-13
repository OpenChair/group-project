angular.module('openChairApp').service('userService', function($http, constants) {

  this.getUser = function(id) {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'user/' + id
    }).then(function(response) {
      return response.data;
    });
  };

this.updateUser = function(id, user) {
  console.log(user);
    return $http({
      method: 'PUT',
      url: constants.baseURL + 'user/' + id,
      data: user
   }).then(function(response) {
      return response.data;
    });
  };



});
