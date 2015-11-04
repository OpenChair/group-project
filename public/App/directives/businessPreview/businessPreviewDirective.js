angular.module('openChairApp')
.directive('businessPreview', function() {
	return {
    restrict: 'EA',
		templateUrl:'App/directives/businessPreview/businessPreview.html',
    controller: 'businessPreviewCtrl'
	};
});
