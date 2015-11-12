var app = angular.module('openChairApp')
app.controller('searchBarCtrl', function($scope, businessService, loginService) {
  
  loginService.getUserName().then(function(response) {
    $scope.user = response.data;
  });
  
  var currentTime = new Date();
  $scope.currentTime = currentTime;
  $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  //$scope.disable = [false, 1, 7];
  $scope.today = 'Today';
  $scope.clear = 'Clear';
  $scope.close = 'Close';
  var days = 15;
  //$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
  //$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
  $scope.onStart = function () {
//      console.log('onStart');
  };
  $scope.onRender = function () {
//      console.log('onRender');
  };
  $scope.onOpen = function () {
//      console.log('onOpen');
  };
  $scope.onClose = function () {
//      console.log('onClose');
  };
  $scope.onSet = function () {
//      console.log('onSet');
  };
  $scope.onStop = function () {
//      console.log('onStop');
  };
  
  var getUserLocation = function() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          $scope.lat = pos.coords.latitude;
          $scope.lon = pos.coords.longitude;
          console.log(pos);
        },
        function(error){
          $scope.lat = $scope.user.location[0];
          $scope.lon = $scope.user.location[1];  
          console.log( "Something went wrong: ", error );
        },
        {
          timeout: (5 * 1000),
          maximumAge: (1000 * 60 * 15),
          enableHighAccuracy: true
        }
      );
    };
  };
  $scope.radius = 30;
  getUserLocation();
  $scope.apptQuery = function(searchCriteria, radius, lat, lon) {
    businessService.getFilterdBusinesses(searchCriteria, radius, lat, lon).then(function(response) {
      console.log(response);
    } );
      
  }
  
});
