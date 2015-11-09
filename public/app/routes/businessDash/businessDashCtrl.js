angular.module('openChairApp').controller('businessDashCtrl', function($scope, businessService, loginService) {
	var id;

			loginService.getBusinessName().then(function (res) {
				if (res) {
					console.log(res);
					$scope.businessName =  res.data.name;
				}
			});
		
	$scope.editHours=function(hours){
		alert('hello');
		
		businessService.editHours(id, hours).then(function(res){
			
			if(res)alert('update completed')
		})
	}
});
