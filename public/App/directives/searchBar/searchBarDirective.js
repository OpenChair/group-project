angular.module('openChairApp').directive('searchBar', function() {
	return {
    restrict: 'EA',
		templateUrl:'App/directives/searchBar/searchBarTemplate.html',
		controller: 'searchBarCtrl'
	}
})
