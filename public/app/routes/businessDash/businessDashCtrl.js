angular.module('openChairApp').controller('businessDashCtrl', function($scope, businessService, loginService, $location) {
	loginService.getBusinessName().then(function(res) {
	  if (!res) {
	    $location.path('#/home');
	  }
	});

	$scope.editHours=function(hours){
		businessService.editHours(hours).then(function(res){
			if(res)alert('update completed');
		});
	};
});
