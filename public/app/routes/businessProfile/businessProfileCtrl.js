angular.module('openChairApp')
.controller('businessProfileCtrl', function($scope, business, loginService, $location) {
  loginService.getUserName().then(function(res) {

    if (res) {
      $scope.user = res.data;
      $scope.appointment = {
        user: $scope.user._id,
        business: business._id,
        date: new Date()
      };
    }
  //   if (!res.data._id) {
  //     $location.path('#/home');
  //   }
  });

  $scope.pushService = "";

  $scope.submitAppt = function(appointment) {
    // appointmentService.addAppointmentById(appointment);
    console.log(appointment);
  };

  $scope.selectService = function(service) {
    $scope.appointment.title = service.name;
    $scope.appointment.price = service.price;
    $scope.appointment.end = service.duration;
  };
  $scope.selectDate = function(date) {
    $scope.appointment.start = date;
  };

  $scope.bProfile = business;

  // NEED TO ADD MINIPICTURES TO SCHEMA
  $scope.pictures = business.miniPictures;

  angular.extend(
    $scope, {
       center: {
           lat: $scope.bProfile.location[0],
           lng: $scope.bProfile.location[1],
           zoom: 16
       },
       markers: {
                    m1: {
                        lat: $scope.bProfile.location[0],
                        lng: $scope.bProfile.location[1],
                        focus: true,
                        draggable: false,
                        message: "Hello",
                        icon: {}
                    }
                },

       defaults: {
           scrollWheelZoom: false
       }
    });


$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });



});
