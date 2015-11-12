angular.module('openChairApp').controller('businessDashCtrl', function($scope, businessService, loginService, $location, business, appointments) {
	// loginService.getBusinessName().then(function(res) {
	//   if (!res.data._id) {
	//     // $location.path('#/home');
	//   }
	// });
	$scope.business =  business;
	console.log(business);
	$scope.editHours = function(hours) {
		businessService.editBusiness(business._id, hours).then(function(res){
			if(res)alert('update completed');
		});
	};
	
$scope.deleteService = function(index) {	
	$scope.business.services.splice(index, 1);
   businessService.editBusiness($scope.business._id, $scope.business).then(function(response) {
      $scope.business = response;
   });
 };
 
 
 $(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
  });
 
 $(function(){
 
 $('#closeModal').click(function() {
    $('#areYouSure').modal('hide');
});
 });
});


