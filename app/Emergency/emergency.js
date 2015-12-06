'use strict';

angular.module('myApp.emergency', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/emergency', {
    templateUrl: 'emergency/emergency.html',
    controller: 'EmergencyCtrl'
  });
}])

.controller('EmergencyCtrl', function($scope) {
    
});
