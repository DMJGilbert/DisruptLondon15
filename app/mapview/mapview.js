'use strict';

angular.module('myApp.mapview', ['ngRoute', 'esri.map'])
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/mapview', {
		templateUrl: 'mapview/mapview.html',
		controller: 'SimpleMapCtrl'
	});
}]).controller('SimpleMapCtrl', function ($scope) {

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(location){
      $scope.$apply(function(){
        //var pt = new Point(location.coords.longitude, location.coords.latitude);
        //  $scope.map.centerAndZoom(pt, 12);
      });
    });
  }
    
    $scope.map = {
		options: {
			basemap: 'oceans',
			center: [-122.45, 37.75],
			zoom: 13,
			sliderStyle: 'small'
		}
	};
    
});
