angular.module('openChairApp')

.controller('businessProfileCtrl', function($scope, userService, business, loginService, $location, appointmentsService, emailService) {
  var uId;
  loginService.getUserName().then(function(res) {
    uId=res.data;
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

  (function() {
		var s = document.createElement("script");
		s.async = true;
		s.onload = s.onreadystatechange = function(){
			getYelpWidget($scope.bProfile.yelpReviews,"30%","black","y","y","2");
			};
		s.src='http://chrisawren.com/widgets/yelp/yelpv2.js';
		var x = document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);
		})();

  $scope.submitAppt = function(appointment, date, time) {
    // appointmentService.addAppointmentById(appointment);
    appointment.start = new Date(date + ', ' + time);
    appointment.end = moment(appointment.start).add(appointment.end, 'm');
    appointmentsService.makeAppointment(appointment);

  };

  $scope.selectService = function(service) {
    $scope.appointment.title = service.name;
    $scope.appointment.price = service.price;
    $scope.appointment.end = service.duration;
  };
  $scope.addToFavorites=function(){
    if(uId.favorites>0){
      for(var i =0;i<uId.favorites; i++){
        if(uId.favorites[i]===$scope.bProfile._id){
          console.log('already added');
        }
        else{
          uId.favorites.push($scope.bProfile._id);
          console.log('added to favorites');
        }
      console.log(uId);
      }
    }
    else{
      uId.favorites.push($scope.bProfile._id);
      alert('added to favorites');
    }

    userService.updateUser(uId._id, uId).then(function(res){
      uId=res.favorites;
    });
  };

  $scope.sendVerification = function(appointment, date, time) {
    loginService.getUserName().then(function(res) {
      if (res.data) {
        $scope.verifyemail = res.data.email;
      }
      console.log($scope.verifyemail);
      appointment.start = new Date(date + ', ' + time);
      emailService.verificationEmail($scope.verifyemail, appointment, business);
      console.log(appointment.start);
    });

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

  // JQUERY
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  $('[data-click]').on('click', function (e) {
      $( $(this).data('click') ).trigger('click');
  });
  $('#closeDaModal').on('click', function() {
     $('#verifyModal').modal('hide');
  });

});
