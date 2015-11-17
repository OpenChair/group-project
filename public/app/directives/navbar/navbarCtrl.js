angular.module('openChairApp')
  .controller('navbarCtrl', function(loginService, $scope, $location, geocodingService) {

    // Check for currently loged in
    loginService.getUserName().then(function(res) {
      console.log(res);
      if (res.data.businessName) {
        $scope.customerName = res.data.businessName;
        $scope.business = res.data;
      } else {
        $scope.customerName = 'Welcome, ' + res.data.name.first;
        $scope.user = res.data;
        console.log('Current User', res);
      }
    }, function(err) {
      console.log(err);
    });
    loginService.getBusinessName().then(function(res) {
      console.log(res);
      if (res.data.businessName) {
        $scope.customerName = res.data.businessName;
        $scope.business = res.data;
      } else {
        $scope.customerName = 'Welcome, ' + res.data.name.first;
        $scope.user = res.data;
        console.log('Current User', res);
      }
    }, function(err) {
      console.log(err);
    });

    // Register new business
    $scope.blankPictures = [{
      link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
      caption: ""
    }, {
      link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
      caption: ""
    }, {
      link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
      caption: ""
    }, {
      link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
      caption: ""
    }];

    $scope.userBlankPicture = 'http://www.flowjo.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';

    $scope.submitNewBusiness = function(business) {
      var geocode = geocodingService.geocode(business.address).then(function(response) {
        business.location = [response.lng, response.lat];
        business.pictures = $scope.blankPictures;
        loginService.newBusinessService(business).then(function(res) {
          console.log('new biz: ', res.data);
        }, function(err) {
          console.log('biz create err: ', err);
        });
      });
    };
    $scope.submitNewUser = function(user) {
      var geocode = geocodingService.geocode(user.address).then(function(response) {
        user.location = [response.lng, response.lat];
        user.photo = $scope.userBlankPicture;
        loginService.newUserService(user).then(function(res) {
          console.log('new user: ', res.data);
        }, function(err) {
          console.log('user create err: ', err);
        });
      });
    };

    // Login Users and Businesses
    $scope.loginUserSubmit = function(user) {
      loginService.loginUserSubmit(user).then(function(res) {
        $scope.customerName = 'Welcome, ' + res.data.name.first;
        $scope.user = res.data;
      }, function(err) {
        if (err.status > 300) {
          alert('Invalid Login: Please try again');
        }
      });

    };
    $scope.loginBusinessSubmit = function(login) {
    loginService.loginBusinessSubmit(login).then(function(res) {
        $scope.customerName = res.data.businessName;
        $scope.business = res.data;
      }, function(err) {
        if (err.status > 300) {
          alert('Invalid Login: Please try again');
        }
      });
    };
  });
