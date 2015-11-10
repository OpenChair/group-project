angular.module('openChairApp')
.directive('footerDir', function() {
	return {
    restrict: 'EA',
		templateUrl:'App/directives/footer/footer.html',
		controller: 'footerCtrl'
	};
});
