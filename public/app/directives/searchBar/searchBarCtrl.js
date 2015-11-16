angular.module('openChairApp').controller('searchBarCtrl', function($scope, businessService, loginService, $location, $rootScope) {

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
          $scope.lat = pos.coords.longitude;
          $scope.lon = pos.coords.latitude;
        },
        function(error){
          $scope.lat = $scope.user.location[1];
          $scope.lon = $scope.user.location[0];
        },
        {
          timeout: (5 * 1000),
          maximumAge: (1000 * 60 * 15),
          enableHighAccuracy: true
        }
      );
    }
  };
  getUserLocation();
  $scope.apptQuery = function(searchCriteria) {
    $rootScope.searchCriteria = searchCriteria;
    $location.path('/search');
  };


});
