'use strict';

angular.module('myApp.mapview', ['ngRoute', 'esri.map'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/mapview', {
			templateUrl: 'mapview/mapview.html',
			controller: 'SimpleMapCtrl'
		});
}]).controller('SimpleMapCtrl', function ($scope) {
		var esriMap;


		$scope.map = {
			options: {
				basemap: 'gray',
				center: [-0.0222079, 51.5443536],
				zoom: 15,
				sliderStyle: 'small'
			}
		};
		$scope.mapLoaded = function (map) {
			esriMap = map;

			var text = new esri.symbol.TextSymbol("test").setColor(
				new dojo.Color([10, 10, 10])).setAlign(esri.symbol.TextSymbol.ALIGN_START).setFont(
				new esri.symbol.Font(((map.getZoom() * map.getZoom()) * .05) + "pt").setFamily('arial').setWeight(esri.symbol.Font.WEIGHT_BOLD));

			generateDiv(map);

			map.on('extent-change', changeHandler);

			//var graphic = esri.Graphic(point, text);
			//map.graphics.add(graphic)
		}

		function changeHandler(evt) {
			generateDiv(esriMap);
		}

		function generateDiv(map) {

					var point = new esri.geometry.Point(-0.0222079, 51.5443536);
					var screenPoint = map.toScreen(point);

					var screen_point = map.position;
					var final_x = screenPoint.x + screen_point.x;
					var final_y = screenPoint.y + screen_point.y;

					var html = '<div style="position: absolute; top: '+final_y+'px; left: '+final_x+'px; z-index:10000000;" id="dick"/><span>Dick</span></div>';
					document.getElementById("container").innerHTML = html;
					init();
		}

	});