'use strict';

angular.module('myApp.signupview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signupview', {
    templateUrl: 'signupview/signupview.html',
    controller: 'SignUpCtrl'
  });
}])

.controller('SignUpCtrl', function($scope, $location) {
    $scope.do_registration = function() {
    		
    	register_with_twilio($scope.login,$scope.phoneNumber,$scope.password, function() {
    		USERNAME = $scope.login;
    		$location.path("/#/view2");
    	});
    };
});
