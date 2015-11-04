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
    console.log(id)
    return $http({
      method: 'GET',
      url: '/appointments/' + type + '/' + id
    }).then(function(response) {
      console.log(response)
      return response.data;
      
    });
  };
});
