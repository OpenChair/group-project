angular.module('openChairApp').service('userService', function($http, constants) {

  this.getUser = function(id) {
    return $http({
      method: 'GET',
      url: '/user/' + id
    }).then(function(response) {
      return response.data;
    });
  };

this.updateUser = function(id, user) {
    return $http({
      method: 'PUT',
      url: '/user/' + id,
      data: user
   }).then(function(response) {
      return response.data;
    });
  };
this.addFavorites = function(id, data){
  return $http({
    method:'PUT',
    url:'userFavorites/'+id,
    data:data
  }).then(function(res){
    return res.data;
  });
};

});
