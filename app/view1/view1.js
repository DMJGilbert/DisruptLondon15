'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope,$location) {
	$scope.hide_i_can_help=1;
    $scope.messages = [];
    $scope.users_count = 0;
    var help_user = null;
    
	$scope.global_text_change = function(text) {
		var object = {message:$scope.text};
		broadcast(object);
	};
	$scope.global_text_save = function() {
		broadcast({final:1});
		$scope.text = "";
	};

	socket.on('message', socket_received);
    socket.on('users', users_connected);
    
	function socket_received(obj) {
		if(obj.emergency===1) {
			user_in_emergency(obj.username);
		} else {
			if (obj.final === 1) {
				new_received(obj.message);
			} else {
				editable_received(obj.message);
			}
		}
	}

	function user_in_emergency(username) {
		$scope.$apply(function() {
			$scope.hide_i_can_help = 0;
		})
		
		help_user = username;
	}
		var hasBeenExecuted  = false;
	$scope.switch_to_help_mode = function() {
		if(hasBeenExecuted)
			return;
		hasBeenExecuted = true;
		$location.path("emergency");
	}
    
    function users_connected(count) {
		$scope.$apply(function () {
			$scope.users_count = count;
		});
	}
    
	function new_received(text) {
		$scope.$apply(function() {
			$scope.messages.unshift({message:text, time: currentDate()});
			if($scope.messages.length>1) {
				$scope.messages[1].final = 1;
			}
		})
	}
	function editable_received(text) {
		if($scope.messages.length==0) {
			new_received(text);
		}
		else 
		{
			$scope.$apply(function() {
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
