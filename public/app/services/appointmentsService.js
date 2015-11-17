angular.module('openChairApp')

.service('appointmentsService', function($http, constants) {
  this.makeAppointment = function(appointment) {
    return $http({
      method: 'POST',
      url: '/appointment',
      data: appointment
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointments = function() {
    return $http({
      method: 'GET',
      url: '/appointments'
    }).then(function(response) {
      return response.data;
    });
  };
  this.editAppointment = function(id, appointment) {

    return $http({
      method: 'PUT',
      url: '/appointment/' + id,
      data: appointment
    }).then(function(response) {
      return response.data;
    });
  };
  this.deleteAppointment = function(id) {
    return $http({
      method: 'DELETE',
      url: '/appointment/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointment = function(id) {
    return $http({
      method: 'GET',
      url: '/appointment/' + id
    }).then(function(response) {
      return response.data;
    });
  };
  this.getAppointmentsById = function(id, type) {
    return $http({
      method: 'GET',
      url: '/appointments/' + type + '/' + id
    }).then(function(response) {
      return response.data;

    });
  };
});
