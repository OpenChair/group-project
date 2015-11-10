var app = angular.module('openChairApp');
app.controller('businessScheduleCtrl', function($scope, $compile, $timeout, uiCalendarConfig, loginService, $location, businessService, appointmentsService ) {
  // loginService.getBusinessName().then(function(res) {
  //   if (!res.data._id) {
  //     $location.path('#/home');
  //   }
  // });
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();



  /* event source that contains custom events on the scope */
  $scope.events =[]

  var appointments
    appointmentsService.getAppointments("56411a9f3955d2bc64c1db78","business").then(function(res){
       appointments=res
     console.log(res)
    })

  /* alert on eventClick */
  $scope.alertOnEventClick = function(date, jsEvent, view) {
    $scope.alertMessage = (date.title + ' was clicked ');
  };
  /* alert on Drop */
  $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
    $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
  };
  /* alert on Resize */
  $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
    $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
  };
  /* add and removes an event source of choice */
  $scope.addRemoveEventSource = function(sources, source) {
    var canAdd = 0;
    angular.forEach(sources, function(value, key) {
      if (sources[key] === source) {
        sources.splice(key, 1);
        canAdd = 1;
      }
    });
    if (canAdd === 0) {
      sources.push(source);
    }
  };
  /* add custom event*/
  $scope.addEvent = function() {
    $scope.events.push({
      user:appointments.user,
      startTime:appointments.startTime,
      timePeriod:appointments.timePeriod,
      service:appointments.service,
      price:appointments.price

    });
  };
  /* remove event */
  $scope.remove = function(index) {
    $scope.events.splice(index, 1);
  };
  /* Change View */
  $scope.changeView = function(view, calendar) {
    uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
  };
  /* Change View */
  $scope.renderCalender = function(calendar) {
    $timeout(function() {
      if (uiCalendarConfig.calendars[calendar]) {
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    });
  };
  /* Render Tooltip */
  $scope.eventRender = function(event, element, view) {
    element.attr({
      'tooltip': event.title,
      'tooltip-append-to-body': true
    });
    $compile(element)($scope);
  };
  /* config object */
  $scope.uiConfig = {
    calendar: {
      height: 450,
      editable: true,
      header: {
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      eventClick: $scope.alertOnEventClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventRender: $scope.eventRender
    }
  };


  /* event sources array*/
  $scope.eventSources = [$scope.events];
  
});
