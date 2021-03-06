angular.module('openChairApp')

.controller('userCtrl', function($scope, user, appointments, loginService, $location, appointmentsService, userService){
  // loginService.getUserName().then(function(res) {
  //   if (!res.data._id) {
  //     $location.path('#/home');
  //   }
  // });
  $scope.user = user;

  $scope.appointments = appointments;
  $scope.getAppointments = function(){
    appointmentsService.getAppointmentsById($scope.user._id, 'user').then(function(response) {
      $scope.appointments = response;
    });
  };

  $scope.deleteAppointment = function(id) {
   appointmentsService.deleteAppointment(id).then(function() {
       $scope.getAppointments();
   });
 };

  $scope.removeFromFavorites=function(b){
          
    for(var i=0;i<$scope.user.favorites.length; i++){
      if($scope.user.favorites[i]._id===b._id){
        user.favorites.splice(i,1)
        alert('removed')
        userService.updateUser(user._id,user)
        
      }
    }
  }

 $scope.updateUser = function(user){
   userService.updateUser($scope.user._id, user).then(function(response) {
     userService.getUser(user._id).then(function(response) {
       $scope.user = response;
     });
   });
 };
});
