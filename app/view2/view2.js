'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/view2', {
		templateUrl: 'view2/view2.html',
		controller: 'View2Ctrl'
	});
}])

.controller('View2Ctrl', function ($scope) {
	$scope.messages = [];
	$scope.users_count = 0;

	$scope.global_text_change = function (text) {
		var object = {
			message: $scope.text
		};
		broadcast(object);
	};
	$scope.global_text_save = function () {
		broadcast({
			final: 1
		});
		$scope.text = "";
	};

	socket.on('message', socket_received);
	socket.on('users', users_connected);

	function socket_received(obj) {
		if (obj.final === 1) {
			new_received(obj.message);
		} else {
			editable_received(obj.message);
		}
	}

	function users_connected(count) {
		$scope.$apply(function () {
			$scope.users_count = count;
		});
	}

	function new_received(text) {
		$scope.$apply(function () {
			$scope.messages.unshift({
				message: text,
				time: currentDate()
			});
			if ($scope.messages.length > 1) {
				$scope.messages[1].final = 1;
			}
			if ($scope.messages.length > 10) {
				$scope.messages.pop();
			}

		})
	}

	function editable_received(text) {
		if ($scope.messages.length == 0) {
			new_received(text);
		} else {
			$scope.$apply(function () {
				$scope.messages[0].message = emoji.replace_colons(text);
				$scope.messages[0].time = currentDate();

			})
		}
	}

	function currentDate() {
		var d = new Date();
		return (d.getHours()<10?'0'+d.getHours():d.getHours())+':'+ ( d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes() )+':'+ (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds() )+ '  (' + d.getMilliseconds() + ' milliseconds )';
	}
});
