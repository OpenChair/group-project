angular.module('openChairApp').controller('businessDashCtrl', function($scope, businessService, loginService, $location, business, appointments) {
  // loginService.getBusinessName().then(function(res) {
  //   if (!res.data._id) {
  //     // $location.path('#/home');
  //   }
  // });
  $scope.business = business;

  $scope.profilePic = $scope.business.pictures.splice(0, 1);

  $scope.tempInfo = business;
  delete $scope.tempInfo._id;
  delete $scope.tempInfo.__v;
  $scope.tempSchedule = business;
  delete $scope.tempSchedule._id;
  delete $scope.tempSchedule.__v;

  $scope.editHours = function(hours) {
    $scope.business.pictures.unshift($scope.profilePic[0]);
		for (var i = 0; i < $scope.business.pictures.length; i++) {
			if (!$scope.business.pictures[i].link) {
				$scope.business.pictures[i].link = 'http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg';
			}
		}
    businessService.editBusiness(business._id, hours).then(function(res) {
      if (res) {
        alert('update completed');
        $scope.business = res;

        $scope.profilePic = $scope.business.pictures.splice(0, 1);

        $scope.tempInfo = res;
        delete $scope.tempInfo._id;
        delete $scope.tempInfo.__v;
        $scope.tempSchedule = res;
        delete $scope.tempSchedule._id;
        delete $scope.tempSchedule.__v;
        console.log($scope.tempInfo);
        console.log(res);
      }
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
