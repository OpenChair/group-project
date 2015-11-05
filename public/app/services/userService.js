angular.module('openChairApp').service('userService', function($http, constants) {

  this.getUser = function(id) {
    return $http({
      method: 'GET',
      url: constants.baseURL + 'user/' + id
    }).then(function(response) {
      return response.data;
    });
  };

});
