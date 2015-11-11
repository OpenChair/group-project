angular.module('openChairApp').controller('businessDashCtrl', function($scope, businessService, loginService, $location, business, appointments) {
	// loginService.getBusinessName().then(function(res) {
	//   if (!res.data._id) {
	//     // $location.path('#/home');
	//   }
	// });
	$scope.business =  business;

	$scope.editHours = function(hours) {
		businessService.editBusiness(business._id, hours).then(function(res){
			if(res)alert('update completed');
		});
	};
});
