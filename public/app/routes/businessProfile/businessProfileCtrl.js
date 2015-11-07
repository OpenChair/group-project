angular.module('openChairApp')
.controller('businessProfileCtrl', function($scope, business) {
  $scope.bProfile = business;

  $scope.collapsibleElements = [{
        isActive: "active",
        icon: 'mdi-action-face-unlock',
        title: 'Select Service',
        content: business.services
    },{
        isActive: "",
        icon: 'mdi-action-event',
        title: 'Select Date',
        content: [' ']
    },{
        isActive: "",
        icon: 'mdi-action-query-builder',
        title: 'Select Time',
        content: [' ']
    }
  ];

  angular.extend(
    $scope, {
       center: {
           lat: $scope.bProfile.location[0],
           lng: $scope.bProfile.location[1],
           zoom: 16
       },

       defaults: {
           scrollWheelZoom: false
       }
    });
});
