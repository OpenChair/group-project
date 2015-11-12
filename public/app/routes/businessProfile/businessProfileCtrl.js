angular.module('openChairApp')
.controller('businessProfileCtrl', function($scope, business, loginService, $location, appointmentsService) {
  loginService.getUserName().then(function(res) {
    if (res.data) {
      $scope.appointment = {
        user: res.data._id,
        business: business._id,
        start: new Date()
      };
    }
  //   if (!res.data._id) {
  //     $location.path('#/home');
  //   }
  });

  $scope.pushService = "";

  $scope.submitAppt = function(appointment, date, time) {
    // appointmentService.addAppointmentById(appointment);
    appointment.start = new Date(date + ', ' + time);
    appointment.end = moment(appointment.start).add(appointment.end, 'm');
    appointmentsService.makeAppointment(appointment);
    console.log(appointment);
  };

  $scope.selectService = function(service) {
    $scope.appointment.title = service.name;
    $scope.appointment.price = service.price;
    $scope.appointment.end = service.duration;
  };

  $scope.bProfile = business;
  $scope.profilePic = $scope.bProfile.pictures.splice(0, 1);

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
              focus: false,
              draggable: false,
              getMessageScope: function () { return $scope; },
              message: "<map-card-directive></map-card-directive>",
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
