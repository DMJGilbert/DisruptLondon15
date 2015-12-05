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
				basemap: 'gray',
				center: [-0.0222079, 51.5443536],
				zoom: 15,
				sliderStyle: 'small'
			}
		};
		$scope.mapLoaded = function (map) {

			var text = new esri.symbol.TextSymbol("test").setColor(
				new dojo.Color([10, 10, 10])).setAlign(esri.symbol.TextSymbol.ALIGN_START).setFont(
				new esri.symbol.Font(((map.getZoom() * map.getZoom()) * .05) + "pt").setFamily('arial').setWeight(esri.symbol.Font.WEIGHT_BOLD));

			var graphic = esri.Graphic(new esri.geometry.Point(-0.0222079, 51.5443536), text);
			map.graphics.add(graphic)
			init();

		}

	});
