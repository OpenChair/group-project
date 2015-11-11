angular.module('openChairApp')
.directive('businessPreview', function() {
	return {
    restrict: 'EA',
      templateUrl:'app/directives/businessPreview/businessPreview.html',
      controller: 'businessPreviewCtrl'
	};
});
