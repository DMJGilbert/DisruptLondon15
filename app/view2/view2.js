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
	$scope.helpers = [];
	$scope.users_count = 0;
	$scope.help_pop_up_hide = 1;
	var inEmergencyMode = false;

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
		$("#global_text").focus();
	};

	$scope.requestCall = function () {
		$.ajax({
			type: "GET",
			url: "/api/call",
			data: {},
			cache: false,
			success: function (data) {
				if (callback)
					callback(data);
			}
		});
	}

	$scope.switch_to_emergency = function () {
		if (!inEmergencyMode) {
			inEmergencyMode = true;
			console.log("emergency");
			var d = document.getElementById("live-textcast-subheader");
			d.className = "live-textcast-subheader super-red";
			var dd = document.getElementById("live-textcast-header");
			dd.className = "live-textcast-header super-dark-red";
			var htmlsnippet = "Switch to Standard Mode <img src=\"img/forward-arrow.png\" class=\"forward\"/>"
			document.getElementById("emergency-switch").innerHTML = htmlsnippet;

			broadcast({
				message: $scope.text,
				emergency: 1
			});
		} else {
			inEmergencyMode = false;
			var d = document.getElementById("live-textcast-subheader");
			d.className = "live-textcast-subheader  ng-scope";
			var dd = document.getElementById("live-textcast-header");
			dd.className = "live-textcast-header  ng-scope";
			var htmlsnippet = "<img src=\"img/warning.png\" /> Switch to Standard Mode <img src=\"img/forward-arrow.png\" class=\"forward\"/>"
			document.getElementById("emergency-switch").innerHTML = htmlsnippet;
		}
	};

	$scope.get_help_button = function () {
		alert("get help");
	}

	socket.on('message', socket_received);
	socket.on('users', users_connected);
	socket.on('help', help_received);

	function socket_received(obj) {
		if (obj.emergency === 1) {

		} else {
			if (obj.final === 1) {
				new_received(obj.message);
			} else {
				editable_received(obj.message);
			}
		}

	}

	function help_received(obj) {

		console.log(obj);
		$scope.$apply(function () {
			$scope.help_pop_up_hide = 0;
			$scope.helpers.push(obj);
		});
	}

    $scope.close = function(){
        $scope.help_pop_up_hide = 1;
    };
    
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
		return (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()) + '  (' + d.getMilliseconds() + ' milliseconds )';
	}

});
