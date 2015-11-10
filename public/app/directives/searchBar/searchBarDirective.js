angular.module('openChairApp').directive('searchBar', function() {
  return {
    restrict: 'EA',
      templateUrl:'App/directives/searchBar/searchBarTemplate.html',
      controller: 'searchBarCtrl'
  };
  
  var searchCriteria = {
    type: '',
    date: '',
    time: '',
    text:
  };
  console.log(searchCriteria);
});
