angular.module('openChairApp').controller('businessDashCtrl', function($scope, businessService) {
	$scope.editHours=function(hours){
		businessService.editHours(hours).then(function(res){
			if(res)alert('update completed')
		})
	}
});
