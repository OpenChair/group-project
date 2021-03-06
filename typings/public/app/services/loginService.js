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
			console.log(res)
			return res;
		});
	};
	this.getUserName=function(){
		var deferred=$q.defer();
		$http({
			method:"GET",
			url:'/user'
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
			url:'/business',
			data:business
		})
		// .then(function(res, err){
		// 	if(err){ return err;}
		// 	else{return res;}
		// });
	};

	this.loginBusinessSubmit=function(business){
		return $http({
			method:"POST",
			url:'/loginBusiness',
			data:business
		}).then(function(res,err){
			console.log(res);
			return res;
		});
	};
	
	this.getBusinessName=function(){
		var deferred=$q.defer();
		$http({
			method:"GET",
			url:'/business'
		}).then(function(res,err){
			var businessName=res;
			deferred.resolve(businessName);
		},function(err){
			deferred.reject(err);
		});
		return deferred.promise;
	};

});