angular.module('openChairApp')

.service('appointmentsService', function($http) {
  this.makeAppointment = function(appointment) {
    return $http({
      method: 'POST',
      url: 'http://localhost:7200/appointment',
      data: appointment
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointments = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:7200/appointments'
    }).then(function(response) {
      return response.data;
    });
  };
  this.editAppointment = function(id, appointment) {
    return $http({
      method: 'PUT',
      url: 'http://localhost:7200/appointment/' + id,
      data: appointment
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteAppointment = function(id) {
    return $http({
      method: 'DELETE',
      url: 'http://localhost:7200/appointment/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointment = function(id) {
    return $http({
      method: 'GET',
      url: 'http://localhost:7200/appointment/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointmentsById = function(id, type) {
    return $http({
      method: 'GET',
      url: 'http://localhost:7200/appointments/' + type + '/' + id
    }).then(function(response) {
      return response.data;
    });
  };
});
