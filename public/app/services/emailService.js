angular.module("openChairApp").service("emailService", function($http) {
  var chairKeyYo = "6i_BJSX_9Ke6UFeq0VXlMA";
  this.verificationEmail = function(email, name){
		return $http({
			method: 'POST',
			url: 'https://mandrillapp.com/api/1.0/messages/send.json',
			data: {
				'key':  chairKeyYo,
				'message': {
					'from_email': 'openchairverify@gmail.com',
					'to': [
							{
							'email': email,
							'name': name,
							'type': 'to'
							}
						],
					'autotext': 'true',
					'subject': 'Open Chair Appointment',
					'html': '<h1>Thank you for securing your appointment on Open Chair!</h1><br> <h2>Here is your appointment information:</h2>'
				}
			}
		});
  };
});
