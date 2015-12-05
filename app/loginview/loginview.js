'use strict';

angular.module('myApp.loginview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/loginview', {
    templateUrl: 'loginview/loginview.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', [function() {
	$scope.login = function() {
		login($scope.login,$scope.password,function(username) {
			alert(username);
		});
	};
	
}]);
