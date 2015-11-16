angular.module("openChairApp").service("emailService", function($http) {
  var chairKeyYo = "6i_BJSX_9Ke6UFeq0VXlMA";
  this.verificationEmail = function(email, appointment, business){
		return $http({
			method: 'POST',
			url: 'https://mandrillapp.com/api/1.0/messages/send.json',
			data: {
        'key':  chairKeyYo,
				'message': {
          'html': '<h1>Thank you for securing your appointment on Open Chair!</h1><br><h2>Here is your appointment information: ' + business.businessName + ' on ' + appointment.start + '</h2>',
          'subject': 'Open Chair Appointment',
          'from_name': "Open Chair",
					'from_email': 'openchairverify@gmail.com',
					'to': [
							{
							'type': 'to',
              "email": email
							}
						],
					'autotext': null
				}
			}
		});
  };
});
