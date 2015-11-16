angular.module('openChairApp').controller('navbarCtrl', function(loginService, $scope, $location, geocodingService) {
      $scope.blankPictures = [
        {
            link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
            caption: ""
        },
        {
            link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
            caption: ""
        },
        {
            link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
            caption: ""
        },
        {
            link: "http://www.freelargeimages.com/wp-content/uploads/2014/12/Black_background.jpg",
            caption: ""
        }
    ];

      loginService.getUserName().then(function(res) {
        if (res.data.businessName) $scope.customerName = res.data.businessName;
        else {
          $scope.customerName = 'Welcome, ' + res.data.name.first;
          $scope.user = res.data;
        }
      });
      loginService.getBusinessName().then(function(res) {
        $scope.customerName = res.data.businessName;
        $scope.business = res.data;
      });
      $scope.submitNewUser = function(user) {
        var geocode = geocodingService.geocode(user.address).then(function(response) {
          user.location = [response.lng, response.lat];
          loginService.newUserService(user);
        });
      };
      $scope.loginUserSubmit = function(user) {
        loginService.loginUserSubmit(user).then(function(res) {
          // loginService.getUserName().then(function(res) {
          $scope.customerName = 'Welcome, ' + res.data.name.first;
          $scope.user = res.data;

          // });

        }, function(err) {
          if (err.status > 300) {
            alert('bad data guys!!!!');
            $scope.user = err;
          }
        });

      };

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
      $scope.loginBusinessSubmit = function(login) {

        loginService.loginBusinessSubmit(login).then(function(res) {
          console.log('hi', res);
          $scope.customerName = res.data.businessName;
          $scope.business = res.data;
        }, function(err) {
          if (err.status > 300) {
            alert('bad data guys!!!!');
            $scope.business = err;
          }
        });
      };
    });
