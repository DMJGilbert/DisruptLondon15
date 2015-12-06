'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.mapview',
  'myApp.loginview',
  'myApp.signupview',
  'myApp.emergency'
]);

app.run(function ($rootScope) {
	$rootScope.messages = [];
	$rootScope.broadcaster = {};

	socket.on('message', function (obj) {
		if (obj.final === 1) return;
		if (document.getElementById("container")) {
			$rootScope.broadcaster[obj.username] = obj;
		}
	});

	socket.on('message', socket_received);
	socket.on('users', users_connected);

	function socket_received(obj) {
		if (obj.final === 1) {
			new_received(obj.message);
		} else {
			editable_received(obj.message);
		}
	}

	function new_received(text) {
		$rootScope.$apply(function () {
			$rootScope.messages.unshift({
				message: text,
				time: currentDate()
			});
			if ($rootScope.messages.length > 1) {
				$rootScope.messages[1].final = 1;
			}
		})
	}

	function editable_received(text) {
		if ($rootScope.messages.length == 0) {
			new_received(text);
		} else {
			$rootScope.$apply(function () {
				$rootScope.messages[0].message = emoji.replace_colons(text);
				$rootScope.messages[0].time = currentDate();
			})
		}
	}

	function currentDate() {
		var d = new Date();
		return (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()) + '  (' + d.getMilliseconds() + ' milliseconds )';
	}

})

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/signupview'
	});
}]);


app.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter, {
						'event': event
					});
				});

				event.preventDefault();
			}
		});
	};
});
