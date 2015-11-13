angular.module('openChairApp').controller('businessDashCtrl', function ($scope, businessService, loginService, $location, business, appointments) {
  // loginService.getBusinessName().then(function(res) {
  //   if (!res.data._id) {
  //     // $location.path('#/home');
  //   }
  // });
  $scope.business = business;

  $scope.profilePic = $scope.business.pictures.splice(0, 1);


  $scope.editHours = function (hours) {
    businessService.editBusiness(business._id, hours).then(function (res) {
      if (res) alert('update completed');
    });
  };

  $scope.deleteService = function (index) {
    $scope.business.services.splice(index, 1);
    businessService.editBusiness($scope.business._id, $scope.business).then(function (response) {
      $scope.business = response;
    });
  };

  $scope.editPictures = function (picArray, profilePic) {
    picArray.unshift(profilePic[0]);
    for (var i = 0; i < picArray.length; i++) {
      if (!picArray[i].link) {
        picArray[i].link = 'http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg';
      }
    }
    businessService.editBusiness($scope.business._id, { pictures: picArray }).then(function (response) {
      $scope.business = response;

    });
  };


  $scope.updateBusiness = function (business) {
    businessService.updateBusiness($scope.business._id, business).then(function (response) {
      businessService.getBusiness(business._id).then(function (response) {
        $scope.business = response;
      })
    })
  };



  $(document).ready(function () {
    $('.tooltipped').tooltip({ delay: 50 });

    $scope.profilePic = $scope.business.pictures.splice(0, 1);
  })

  $(document).ready(function () {
    $('.tooltipped').tooltip({
      delay: 50
    });

  });

  $(function () {

    $('#closeModal').click(function () {
      $('#areYouSure').modal('hide');

    });

  });


});