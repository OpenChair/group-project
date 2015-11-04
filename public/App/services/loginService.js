angular.module('openChairApp').service('loginService', function($http, $q, constants){

	this.newUserService=function(user){
		return $http({
			method:'POST',
			url: constants.baseURL + 'user',
			data:user
		}).then(function(err, res){
			if(err){ return err;}
			else{return res;}
		});
	};

	this.loginUserSubmit=function(user){
		return $http({
			method:"POST",
			url: constants.baseURL + 'login',
			data:user
		}).then(function(res){
			console.log(res);
			return res;
		});
	};
	this.getUserName=function(){
		var deferred=$q.defer();
		$http({
			method:"GET",
			url: constants.baseURL + 'user'
		}).then(function(res){
			var userName=res;
			deferred.resolve(userName);
		},function(err){
			deferred.reject(err);
		});
		return deferred.promise;
	};
	this.newBusinessService=function(business){

		return $http({
			method:'POST',
			url: constants.baseURL + 'business',
			data:business
		}).then(function(err, res){
			if(err){ return err;}
			else{return res;}
		});
	};

	this.loginBusinessSubmit=function(business){
		return $http({
			method:"POST",
			url: constants.baseURL + 'loginBusiness',
			data:business
		}).then(function(res,err){
			return res;
		});
	};
	this.getBusinessName=function(){
		var deferred=$q.defer();
		$http({
			method:"GET",
			url: constants.baseURL + 'business'
		}).then(function(res){
			var businessName=res;
			deferred.resolve(businessName);
		},function(err){
			deferred.reject(err);
		});
		return deferred.promise;
	};

});
