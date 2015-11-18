angular.module('openChairApp').directive('searchBar', function() {
  return {
    restrict: 'EA',
      templateUrl:'app/directives/searchBar/searchBarTemplate.html',
      controller: 'searchBarCtrl'
  };

//  console.log(searchCriteria);
});
