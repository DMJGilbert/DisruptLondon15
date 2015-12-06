'use strict';

angular.module('myApp.signupview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signupview', {
    templateUrl: 'signupview/signupview.html',
    controller: 'SignUpCtrl'
  });
}])

.controller('SignUpCtrl', function($scope) {
    
});
