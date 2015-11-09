angular.module('openChairApp').controller('businessDashCtrl', function($scope, businessService, loginService, $location) {
	// loginService.getBusinessName().then(function(res) {
	//   if (!res.data._id) {
	//     $location.path('#/home');
	//   } else {
	// 		console.log(res);
	// 		$scope.businessName =  res.data.name;
	// 	}
	// });

	$scope.editHours=function(hours){
		businessService.editHours(hours).then(function(res){
			if(res)alert('update completed');
		});
	};
});
