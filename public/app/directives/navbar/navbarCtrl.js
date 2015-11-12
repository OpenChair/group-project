angular.module('openChairApp').controller('navbarCtrl', function(loginService, $scope, $location, geocodingService) {
  loginService.getUserName().then(function(res) {
    $scope.customerName = 'Welcome, ' + res.data.name.first;
    $scope.user = res.data;
  },function(err){
    loginService.getBusinessName().then(function(res){
      $scope.customerName=res.data.businessName;
    });
  });


  $scope.submitNewUser = function(user) {
    var geocode = geocodingService.geocode(user.address).then(function(response) {
      user.location = [response.lng, response.lat];
      loginService.newUserService(user);
    });
  };
  $scope.loginUserSubmit = function(user) {
    loginService.loginUserSubmit(user).then(function(res) {
      loginService.getUserName().then(function(res) {
        $scope.customerName = 'Welcome, ' + res.data.name.first;
        $scope.user = res.data;
      });

    }, function(err) {
      if (err.status > 300) {
        alert('bad data guys!!!!');
      }
    });

  };

  $scope.submitNewBusiness = function(business) {
    console.log(business);
    var geocode = geocodingService.geocode(business.address).then(function(response) {
      business.location = [response.lng, response.lat];
      loginService.newBusinessService(business).then(function(res) {
        console.log('new biz: ', res.data);
      }, function(err) {
        console.log('biz create err: ', err);
      });
    });
  };
  $scope.loginBusinessSubmit = function(login) {

    loginService.loginBusinessSubmit(login).then(function(res) {
      console.log('hi', res);
      $scope.customerName=res.data.businessName

    }, function(err) {
      if (err.status > 300) {
        alert('bad data guys!!!!');
      }
    });
  };
});
