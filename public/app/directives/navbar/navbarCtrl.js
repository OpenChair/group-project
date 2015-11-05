var openChairApp = angular.module('openChairApp');
openChairApp.controller('navbarCtrl', function (loginService, $scope, $location) {
	loginService.getUserName().then(function (res) {
		if (res) {
			$scope.customerName = 'Welcome, ' + res.data.name.first;
			console.log($scope.customerName)
		}
	});
	$scope.submitNewUser = function (user) {
		console.log(user);
		loginService.newUserService(user);
	};
	$scope.loginUserSubmit = function (user) {
		loginService.loginUserSubmit(user).then(function (res) {
			loginService.getUserName().then(function (res) {
				if (res) {
					$scope.customerName = 'Welcome, ' + res.data.name.first;
					console.log($scope.customerName)
				}
			});

		}, function (err) {
			console.log(err);
			if (err.status > 300) {
				alert('bad data guys!!!!');
			}
		});

	};

	$scope.submitNewBusiness = function (business) {
		console.log(business);
		loginService.newBusinessService(business).then(function (res) {
			console.log('new biz: ', res.data);
		}, function (err) {
			console.log('biz create err: ', err);
		});
	};
	$scope.loginBusinessSubmit = function (login) {
		loginService.loginBusinessSubmit(login).then(function (res) {
			console.log("login complete", res);
			loginService.getBusinessName().then(function (res) {
				if (res) {
					console.log(res)
					$scope.businessName = 'Welcome, ' + res.data.name;
				}
			});
		}, function (err) {
			console.log(err);
			if (err.status > 300) {alert('bad data guys!!!!');}
		});
	};
});