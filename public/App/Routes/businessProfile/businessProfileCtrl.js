angular.module('openChairApp')
.controller('businessProfileCtrl', function($scope, business) {
  console.log(business);
  $scope.bProfile = business;

  $scope.collapsibleElements = [{
        isActive: "active",
        icon: 'mdi-action-face-unlock',
        title: 'Select Service',
        content: ''
    },{
        isActive: "",
        icon: 'mdi-action-event',
        title: 'Select Date',
        content: ''
    },{
        isActive: "",
        icon: 'mdi-action-query-builder',
        title: 'Select Time',
        content: ''
    }
  ];


});
