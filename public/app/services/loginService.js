angular.module('openChairApp').service('loginService', function($http, $q){

	this.newUserService=function(user){
		return $http({
			method:'POST',
			url:'/user',
			data:user
		}).then(function(err, res){
			if(err){ return err;}
			else{return res;}
		});
	};

	this.loginUserSubmit=function(user){
		return $http({
			method:"POST",
			url:'/login',
			data:user
		}).then(function(res){
			console.log(res);
			return res;
		});
	};
	this.getUserName=function(){
		return $http({
			method:"GET",
			url:'/user'
		});
	};
	this.newBusinessService=function(business){

		return $http({
			method:'POST',
			url:'/business',
			data:business
		});
	};

	this.loginBusinessSubmit=function(business){
		return $http({
			method:"POST",
			url:'/loginBusiness',
			data: business
		}).then(function(res){
			console.log(res);
			return res;
		});
	};

	this.getBusinessName=function(){
		var deferred=$q.defer();
		$http({
			method:"GET",
			url:'/business'
		}).then(function(res){
			var businessName=res;
			deferred.resolve(businessName);
		},function(err){
			deferred.reject(err);
		});
		return deferred.promise;
	};

});
