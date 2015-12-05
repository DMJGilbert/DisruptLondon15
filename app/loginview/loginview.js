'use strict';

angular.module('myApp.loginview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/loginview', {
    templateUrl: 'loginview/loginview.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', function($scope) {
	$scope.do_login = function() {
		alert("text");
		login_with_username($scope.login,$scope.password,function(username) {
			alert(username);
		});
	};
	
});
