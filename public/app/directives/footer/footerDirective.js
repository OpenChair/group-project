angular.module('openChairApp')
.directive('footerDir', function() {
	return {
    restrict: 'EA',
		templateUrl:'app/directives/footer/footer.html',
		controller: 'footerCtrl'
	};
});
