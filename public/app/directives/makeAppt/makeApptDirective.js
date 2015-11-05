angular.module('openChairApp')
.directive('makeAppt', function() {
	return {
    restrict: 'EA',
		templateUrl:'App/directives/makeAppt/makeAppt.html',
    controller: 'makeApptCtrl'
	};
});
