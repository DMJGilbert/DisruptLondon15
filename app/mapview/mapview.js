'use strict';

angular.module('myApp.mapview', ['ngRoute', 'esri.map'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/mapview', {
			templateUrl: 'mapview/mapview.html',
			controller: 'SimpleMapCtrl'
		});
}]).controller('SimpleMapCtrl', function ($scope) {
		var esriMap;
        var broadcaster = [];
        var longitude;
        var latitude;
        var lastMessage;


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
			initCircles();

			//var graphic = esri.Graphic(point, text);
			//map.graphics.add(graphic)
		}
        
        socket.on('message', socket_received);
        function socket_received(obj) {
            // TODO push new broadcaster if they appear
            if(!broadcaster.lenght) {
                broadcaster.push(obj);
            }
            generateDiv(esriMap, obj.lon, obj.lat, obj.message);
        }

		function changeHandler(evt) {
            broadcaster.forEach(function(obj) {
                generateDiv(esriMap, obj.lon, obj.lat, obj.message);
            });
		}

    
    		function generateDiv(map, lon, lat, message) {
                if(lon){
					var point = new esri.geometry.Point(lon, lat);
					var screenPoint = map.toScreen(point);

					var screen_point = map.position;
					var final_x = screenPoint.x + screen_point.x;
					var final_y = screenPoint.y + screen_point.y;

					var html = '<h3 id="broadcasterCircle" class="roundText" style="position: absolute; top: '+final_y+'px; left: '+final_x+'px; z-index:10000000;"> '+message.substring(message.length>16 ? message.length-16 : 0, message.length)+'</h3>';
                    
					document.getElementById("container").innerHTML = html;
                    $('#broadcasterCircle').show().arctext({radius: 15});
                }

		}

	});