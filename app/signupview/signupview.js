'use strict';

angular.module('myApp.signupview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signupview', {
    templateUrl: 'signupview/signupview.html',
    controller: 'SignUpCtrl'
  });
}])

.controller('SignUpCtrl', function($scope, $location) {
	
	$scope.do_hackathon_mode = function() {
		$scope.login = "CrazyDude";
		$scope.password = "*************";
		$scope.phoneNumber = "+447955585777";
		$scope.actCode = "4563";
	};
	
    $scope.do_registration = function() {
    	register_with_twilio($scope.login,$scope.phoneNumber,$scope.password, function() {
    		USERNAME = $scope.login;
    		$scope.$apply(function (){
				$location.path("/");
			})
    	});
    };
});
