angular.module('openChairApp').controller('businessDashCtrl', function($scope, businessService, loginService, $location, business, appointments) {
  // loginService.getBusinessName().then(function(res) {
  //   if (!res.data._id) {
  //     // $location.path('#/home');
  //   }
  // });
  $scope.business = business;

  $scope.profilePic = $scope.business.pictures.splice(0, 1);


  $scope.editHours = function(hours) {
    businessService.editBusiness(business._id, hours).then(function(res) {
      if (res) alert('update completed');
    });
  };
  $scope.addService = function(service) {
    $scope.business.services.push(service);
    console.log(service);

    businessService.editBusiness($scope.business._id, $scope.business).then(function (response) {
      $scope.business = response;
    });
  };
  $scope.deleteService = function(index) {

    businessService.editBusiness($scope.business._id, $scope.business).then(function(response) {
      $scope.business = response;
    });
  };

	$scope.editPictures = function(picArray, profilePic) {
		picArray.unshift(profilePic[0]);
		for (var i = 0; i < picArray.length; i++) {
			if (!picArray[i].link) {
				picArray[i].link = 'http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg';
			}
		}
		businessService.editBusiness($scope.business._id, {pictures: picArray}).then(function(response) {
      $scope.business = response;
			$scope.profilePic = $scope.business.pictures.splice(0, 1);
    });
	};

  $(document).ready(function() {
    $('.tooltipped').tooltip({
      delay: 50
    });
  });

  $(function() {

    $('#closeModal').click(function() {
      $('#areYouSure').modal('hide');
    });
  });
});
