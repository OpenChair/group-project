var openChairApp = angular.module('openChairApp');
openChairApp.controller('navbarCtrl', function(loginService, $scope, $location){
<<<<<<< HEAD
		
  
=======

>>>>>>> fd973e690a4591ff6804dfc4538cd9d7c9b43238
	$scope.submitNewUser=function(user){
		console.log(user);
		loginService.newUserService(user);
	};

	$scope.loginUserSubmit=function(login){

		loginService.loginUserSubmit(login).then(function(res){
		loginService.getUserName().then(function(res){
				if(res){
					$scope.customerName='Welcome, ' + res.data.name;



				}
			});

		},function(err){
				console.log(err);
				if(err.status>300){
					alert('bad data guys!!!!');
				}
			});

	};

	$scope.submitNewBusiness=function(business){
		console.log(business);
		loginService.newBusinessService(business);
	};

	$scope.loginBusinessSubmit=function(login){

		loginService.loginBusinessSubmit(login).then(function(res){
		loginService.getBusinessName().then(function(res){
				if(res){
					$scope.businessName='Welcome, ' + res.data.name;



				}
			});

		},function(err){
				console.log(err);
				if(err.status>300){
					alert('bad data guys!!!!');
				}
			});

	};

});
