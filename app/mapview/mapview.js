'use strict';

angular.module('myApp.mapview', ['ngRoute', 'esri.map'])
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/mapview', {
		templateUrl: 'mapview/mapview.html',
		controller: 'SimpleMapCtrl'
	});
}]).controller('SimpleMapCtrl', function ($scope) {
	$scope.map = {
		options: {
			basemap: 'topo',
			center: [-122.45, 37.75],
			zoom: 13,
			sliderStyle: 'small'
		}
	};
});
