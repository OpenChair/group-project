angular.module('openChairApp')
.controller('businessProfileCtrl', function($scope, business) {
  console.log(business);
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
           lat: 48,
           lng: 4,
           zoom: 4
       },

       defaults: {
           scrollWheelZoom: false
       }
    });
});
