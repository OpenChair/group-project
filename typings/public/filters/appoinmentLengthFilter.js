angular.module('openChairApp').sevice('appointmentLengthFilter', function() {
  this.lengthFilter = function(length) {
    var tempLength = length % 4;
    if (tempLength < 1) {
      if (tempLength) {

      }
    }
  };
});
