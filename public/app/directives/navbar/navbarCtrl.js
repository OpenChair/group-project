angular.module('openChairApp').controller('navbarCtrl', function(loginService, $scope, $location, geocodingService) {
  loginService.getUserName().then(function(res) {
    $scope.customerName = 'Welcome, ' + res.data.name.first;
    $scope.user = res.data;
  });
  $scope.submitNewUser = function(user) {
    var geocode = geocodingService.geocode(user.address).then(function(response) {
      user.location = [response.lat, response.lng];
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
      business.location = [response.lat, response.lng];
      loginService.newBusinessService(business).then(function(res) {
        console.log('new biz: ', res.data);
      }, function(err) {
        console.log('biz create err: ', err);
      });
    });
  };
  $scope.loginBusinessSubmit = function(login) {
    loginService.loginBusinessSubmit(login).then(function(res) {
      console.log('hi', res)
      loginService.getBusinessName().then(function(res) {
        $scope.businessName = 'Welcome, ' + res.data.name;
        $scope.business = res.data;
      });
    }, function(err) {
      if (err.status > 300) {
        alert('bad data guys!!!!');
      }
    });
  };
});
